import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
import { Patient } from '../types';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatBotProps {
  patient: Patient;
}

export const ChatBot: React.FC<ChatBotProps> = ({ patient }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const generatePatientContext = () => {
    const recentHistory = patient.history.slice(-7);
    const currentMetrics = patient.history[0];
    
    const contextParts = [
      `Patient Information:`,
      `- Name: ${patient.name}`,
      `- Age: ${patient.age}`,
      `- Condition: ${patient.condition}`,
      `- Role: ${patient.role}`,
      ``,
      `Current Metrics (Today):`,
      `- Reaction Time: ${currentMetrics.reactionTime}ms`,
      `- Memory Score: ${currentMetrics.memoryScore}/100`,
      `- Error Count: ${currentMetrics.errorCount}`,
      `- Mood Score: ${currentMetrics.moodScore}/5`,
      ``,
      `Recent Activity History (Last 7 days):`,
      ...recentHistory.map(day => `  ${day.date}: Reaction ${day.reactionTime}ms, Memory ${day.memoryScore}, Errors ${day.errorCount}, Mood ${day.moodScore}`),
      ``,
      `Recent Activities Today:`,
      patient.todayActivities?.map(activity => `- ${activity.type}: ${activity.description} at ${activity.time}`).join('\n') || 'No activities recorded',
      ``,
      `Active Alerts:`,
      patient.alerts?.map(alert => `- ${alert.severity}: ${alert.message}`).join('\n') || 'No active alerts'
    ];
    
    return contextParts.join('\n');
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
      
      const systemPromptParts = [
        `You are a compassionate and knowledgeable AI assistant helping caregivers monitor elderly patients. You have access to the patient's cognitive performance data, activities, and health alerts.`,
        ``,
        generatePatientContext(),
        ``,
        `Your role is to:`,
        `1. Answer questions about the patient's health, activities, and cognitive performance`,
        `2. Provide insights based on the data trends`,
        `3. Offer supportive and actionable recommendations`,
        `4. Explain medical or cognitive metrics in simple terms`,
        `5. Alert caregivers to concerning patterns`,
        ``,
        `Keep responses concise, caring, and professional. If you notice concerning trends in the data, mention them. Always prioritize patient safety and wellbeing.`
      ];
      
      const systemPrompt = systemPromptParts.join('\n');

      const conversationHistory = messages.map(msg => 
        `${msg.role === 'user' ? 'Caregiver' : 'Assistant'}: ${msg.content}`
      ).join('\n');

      const fullPromptParts = [
        systemPrompt,
        ``,
        `Previous conversation:`,
        conversationHistory,
        ``,
        `Caregiver: ${userMessage.content}`,
        ``,
        `Assistant:`
      ];
      
      const fullPrompt = fullPromptParts.join('\n');

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text || "I'm sorry, I couldn't generate a response. Please try again.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please check your internet connection and try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content: `Hello! I'm here to help you monitor ${patient.name}'s health and wellbeing. You can ask me about their current status, recent activities, cognitive performance trends, or any concerns you might have. How can I assist you today?`,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  };

  return (
    <>
      {/* Chat Bubble Button */}
      {!isOpen && (
        <button
          onClick={handleOpenChat}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
          aria-label="Open AI Assistant"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
          </div>
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Ask about {patient.name}
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-40 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-2 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">AI Care Assistant</h3>
                <p className="text-indigo-200 text-xs">Monitoring {patient.name}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                    message.role === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-slate-800 border border-slate-200'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3 h-3 text-indigo-600" />
                      <span className="text-xs font-medium text-indigo-600">AI Assistant</span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <span className={`text-xs mt-1 block ${
                    message.role === 'user' ? 'text-indigo-200' : 'text-slate-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-800 border border-slate-200 rounded-2xl px-4 py-3 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                  <span className="text-sm text-slate-500">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200 bg-white">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about patient's status..."
                className="flex-1 px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
