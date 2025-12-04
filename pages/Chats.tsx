import React, { useState, useRef, useEffect } from 'react';
import { Mic, StopCircle } from 'lucide-react';

interface Message {
  type: 'sent' | 'received';
  content: string;
  time: string;
  isVoice?: boolean;
  duration?: string;
}

interface Contact {
  id: number;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline';
  lastMessage: string;
}

interface MessagesState {
  [key: number]: Message[];
}

const Chat: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<number>(0);
  const [messages, setMessages] = useState<MessagesState>({
    0: [
      { type: 'received', content: 'Good morning! I just finished my morning exercises.', time: '9:15 AM' },
      { type: 'sent', content: 'That\'s wonderful, Mom! How are you feeling today?', time: '9:18 AM' },
      { type: 'received', content: 'Feeling great! The weather is lovely today.', time: '9:20 AM' },
      { type: 'sent', content: 'I\'m glad to hear that. Did you take your medication?', time: '9:22 AM' },
      { type: 'received', content: 'Yes, I did! Sarah reminded me this morning.', time: '9:25 AM' }
    ],
    1: [
      { type: 'received', content: 'Hi, just wanted to update you on your mother\'s progress.', time: 'Yesterday' },
      { type: 'sent', content: 'Thank you! How did she do today?', time: 'Yesterday' },
      { type: 'received', content: 'She did wonderfully! Completed all her exercises and was in great spirits.', time: 'Yesterday' }
    ]
  });
  const [inputValue, setInputValue] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const contacts: Contact[] = [
    {
      id: 0,
      name: 'Margaret Johnson',
      role: 'Your Mother',
      avatar: 'MJ',
      status: 'online',
      lastMessage: 'Yes, I did! Sarah reminded me this morning.'
    },
    {
      id: 1,
      name: 'Sarah Williams',
      role: 'Care Assistant',
      avatar: 'SW',
      status: 'online',
      lastMessage: 'She did wonderfully! Completed all...'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedContact]);

  const handleSendMessage = (): void => {
    if (inputValue.trim() === '') return;

    const newMessage: Message = {
      type: 'sent',
      content: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => ({
      ...prev,
      [selectedContact]: [...(prev[selectedContact] || []), newMessage]
    }));
    setInputValue('');

    // Simulate response after a delay
    if (selectedContact === 0) {
      setTimeout(() => {
        const responses = [
          "That's nice to hear, dear! 💕",
          "I'm so happy you're checking on me!",
          "Thank you for caring! 😊",
          "I love you too!",
          "That makes me smile!"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const responseMessage: Message = {
          type: 'received',
          content: randomResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => ({
          ...prev,
          [selectedContact]: [...(prev[selectedContact] || []), responseMessage]
        }));
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Send voice message
        const duration = `${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, '0')}`;
        const voiceMessage: Message = {
          type: 'sent',
          content: audioUrl,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isVoice: true,
          duration: duration
        };

        setMessages(prev => ({
          ...prev,
          [selectedContact]: [...(prev[selectedContact] || []), voiceMessage]
        }));

        // Clean up
        stream.getTracks().forEach(track => track.stop());
        setRecordingTime(0);
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Start timer
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please grant permission to record audio.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [isRecording]);

  const selectedContactData = contacts[selectedContact];

  return (
    <div className="flex h-[calc(100vh-12rem)] max-h-[800px] bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      {/* Contacts List */}
      <div className="w-80 border-r border-slate-200 flex flex-col h-full">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-semibold text-slate-800">Contacts</h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`flex items-center p-4 cursor-pointer transition-colors border-b border-slate-100 hover:bg-slate-50 ${
                selectedContact === contact.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : ''
              }`}
              onClick={() => setSelectedContact(contact.id)}
            >
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-sm">
                {contact.avatar}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <h4 className="font-medium text-slate-800 truncate">{contact.name}</h4>
                <p className="text-sm text-slate-500 truncate">{contact.lastMessage}</p>
              </div>
              <div className={`w-2.5 h-2.5 rounded-full ${contact.status === 'online' ? 'bg-green-500' : 'bg-slate-300'}`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col h-full min-h-0">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-sm">
              {selectedContactData.avatar}
            </div>
            <div className="ml-3">
              <h4 className="font-semibold text-slate-800">{selectedContactData.name}</h4>
              <p className="text-xs text-slate-500">
                {selectedContactData.status === 'online' ? '● Online' : '○ Offline'}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
              📞 Call
            </button>
            <button className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
              📹 Video
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50 min-h-0">
          {/* Date separator */}
          <div className="text-center my-6">
            <span className="bg-white text-slate-500 text-xs px-4 py-1.5 rounded-full border border-slate-200">
              Today
            </span>
          </div>
          
          {(messages[selectedContact] || []).map((message, index) => (
            <div 
              key={index} 
              className={`flex flex-col mb-4 ${message.type === 'sent' ? 'items-end' : 'items-start'}`}
            >
              <div 
                className={`max-w-md px-4 py-2.5 rounded-2xl ${
                  message.type === 'sent' 
                    ? 'bg-indigo-600 text-white rounded-tr-sm' 
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-sm'
                }`}
              >
                {message.isVoice ? (
                  <div className="flex items-center gap-3">
                    <Mic className="w-4 h-4" />
                    <audio controls className="h-8">
                      <source src={message.content} type="audio/webm" />
                    </audio>
                    <span className="text-xs">{message.duration}</span>
                  </div>
                ) : (
                  message.content
                )}
              </div>
              <span className="text-xs text-slate-400 mt-1 px-1">
                {message.time}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {selectedContact === 0 && (
          <div className="px-6 py-3 bg-white border-t border-slate-200 flex-shrink-0">
            <div className="flex gap-2 flex-wrap">
              {['I love you! ❤️', 'How are you feeling?', 'Did you eat today?', 'Talk soon!'].map((reply, index) => (
                <button 
                  key={index}
                  className="px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 transition-colors"
                  onClick={() => setInputValue(reply)}
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-200 flex-shrink-0">
          {isRecording ? (
            <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 flex-1">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-600 font-medium">Recording...</span>
                <span className="text-slate-600 text-sm ml-2">
                  {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
                </span>
              </div>
              <button
                onClick={stopRecording}
                className="p-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <StopCircle className="w-5 h-5" />
                <span className="font-medium">Stop</span>
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={startRecording}
                className="p-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                title="Record voice message"
              >
                <Mic className="w-5 h-5 text-slate-600" />
              </button>
              <input
                type="text"
                className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder={`Message ${selectedContactData.name.split(' ')[0]}...`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button 
                className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
