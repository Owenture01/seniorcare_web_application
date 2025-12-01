import React, { useState, useRef, useEffect } from 'react';

function AIChatbot() {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Hello! I'm your AI Cognitive Analysis Assistant. I can help you understand Margaret's cognitive performance, provide insights, and answer questions about her progress. What would you like to know?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Sample AI responses based on keywords
  const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('memory') || lowerMessage.includes('remember')) {
      return "Based on the recent assessments, Margaret's **memory performance** has shown excellent improvement:\n\n• **Current Score:** 87% (up from 78% last month)\n• **Trend:** Consistently improving over 8 weeks\n• **Strongest area:** Short-term recall exercises\n• **Recommendation:** Continue with the current memory games, especially the Memory Match exercises which she enjoys and performs well in.";
    }
    
    if (lowerMessage.includes('attention') || lowerMessage.includes('focus')) {
      return "Margaret's **attention and focus** metrics show positive trends:\n\n• **Current Score:** 82%\n• **Improvement:** +7% from previous month\n• **Session duration:** Able to maintain focus for 15-20 minutes consistently\n• **Best time of day:** Morning sessions (9-11 AM) show highest attention scores\n• **Recommendation:** Schedule cognitive exercises during morning hours for optimal engagement.";
    }
    
    if (lowerMessage.includes('concern') || lowerMessage.includes('worry') || lowerMessage.includes('problem')) {
      return "I've analyzed Margaret's recent data and here are some observations:\n\n**Areas of Strength:**\n• Language skills remain excellent (88%)\n• Memory shows consistent improvement\n• Daily engagement is high\n\n**Areas to Monitor:**\n• Processing speed (75%) is slightly below average - consider adding speed-based exercises\n• Evening sessions show slightly lower scores - fatigue may be a factor\n\n**Overall Assessment:** No significant concerns. Margaret's cognitive health is stable with positive trends across most domains.";
    }
    
    if (lowerMessage.includes('progress') || lowerMessage.includes('improve') || lowerMessage.includes('trend')) {
      return "Here's a summary of Margaret's **cognitive progress**:\n\n📈 **8-Week Trend Analysis:**\n• Overall improvement: +5%\n• Most improved: Memory (+9%)\n• Consistent performer: Language (maintaining 86-88%)\n• Growth area: Problem Solving (+8%)\n\n**Weekly Engagement:**\n• Average games per day: 6\n• Total sessions this month: 42\n• Completion rate: 95%\n\nThe data suggests Margaret is highly engaged and making steady progress across all cognitive domains.";
    }
    
    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('advice')) {
      return "Based on my analysis, here are **personalized recommendations** for Margaret:\n\n**1. Exercise Timing:**\nSchedule sessions between 9-11 AM when attention scores are highest.\n\n**2. Focus Areas:**\n• Add 2-3 speed-based puzzles per day to improve processing speed\n• Continue Memory Match games (her favorite and most effective)\n\n**3. Rest Periods:**\nLimit sessions to 20 minutes with 10-minute breaks to prevent fatigue.\n\n**4. Social Engagement:**\nThe chat feature shows positive impact on mood - encourage daily conversations.\n\n**5. Weekly Goals:**\n• Maintain current 6 games/day average\n• Target 80% score in processing speed exercises";
    }
    
    if (lowerMessage.includes('compare') || lowerMessage.includes('average') || lowerMessage.includes('other')) {
      return "**Comparative Analysis:**\n\nMargaret's performance compared to similar age group (75-80 years):\n\n• **Overall Score:** 85% (Above Average)\n• **Memory:** Top 20% of peer group\n• **Language:** Top 15% of peer group\n• **Attention:** Above Average\n• **Processing Speed:** Average\n\n**Percentile Ranking:** 78th percentile overall\n\nMargaret is performing exceptionally well compared to her peers, particularly in memory and language domains.";
    }
    
    if (lowerMessage.includes('alert') || lowerMessage.includes('warning') || lowerMessage.includes('notification')) {
      return "**Current Alert Status: ✅ All Clear**\n\nNo active alerts for Margaret. Here's what I monitor:\n\n**Automatic Alerts (none triggered):**\n• Sudden score drops (>15% in 24 hours)\n• Missed consecutive sessions (>2 days)\n• Unusual patterns in responses\n• Significant mood changes\n\n**Last Week Summary:**\n• No concerning patterns detected\n• All scheduled sessions completed\n• Consistent performance maintained\n\nI'll immediately notify you if any concerning patterns emerge.";
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! 👋 I'm here to help you understand Margaret's cognitive health. Here are some things I can help with:\n\n• **Performance Analysis:** Ask about memory, attention, or any cognitive domain\n• **Progress Tracking:** How Margaret is improving over time\n• **Recommendations:** Personalized suggestions for better outcomes\n• **Comparisons:** How she performs compared to her peer group\n• **Alerts:** Any concerns I've detected\n\nWhat would you like to know?";
    }
    
    // Default response
    return "I understand you're asking about Margaret's cognitive health. Here's a quick overview:\n\n**Current Status:**\n• Overall Score: 85% (Good)\n• Trend: Improving\n• Last Active: 10 minutes ago\n• Today's Sessions: 3 completed\n\nWould you like me to provide more details about:\n• Specific cognitive domains (memory, attention, etc.)\n• Progress trends and patterns\n• Recommendations for improvement\n• Comparison with peer group\n\nJust ask, and I'll provide detailed insights!";
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage = { type: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = { type: 'bot', content: getAIResponse(inputValue) };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    "How is Margaret's memory?",
    "Show progress trends",
    "Any concerns?",
    "Give recommendations",
    "Compare to average"
  ];

  const handleQuickAction = (action) => {
    setInputValue(action);
  };

  return (
    <div className="ai-chatbot">
      {/* Page Header */}
      <div className="page-header">
        <h1>AI Cognitive Analysis</h1>
        <p>Get insights and answers about cognitive performance</p>
      </div>

      <div className="chatbot-container">
        {/* Chat Header */}
        <div className="chatbot-header">
          <h2>🤖 AI Analysis Assistant</h2>
          <p>Ask me anything about Margaret's cognitive health</p>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          {quickActions.map((action, index) => (
            <button 
              key={index} 
              className="quick-action-btn"
              onClick={() => handleQuickAction(action)}
            >
              {action}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              {message.content.split('\n').map((line, i) => (
                <span key={i}>
                  {line.split('**').map((part, j) => 
                    j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                  )}
                  {i < message.content.split('\n').length - 1 && <br />}
                </span>
              ))}
            </div>
          ))}
          {isTyping && (
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            placeholder="Ask about cognitive performance..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="chat-send-btn" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIChatbot;
