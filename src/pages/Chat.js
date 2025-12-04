import React, { useState, useRef, useEffect } from 'react';

function Chat() {
  const [selectedContact, setSelectedContact] = useState(0);
  const [messages, setMessages] = useState({
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
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const contacts = [
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

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newMessage = {
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
        const responseMessage = {
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

  const selectedContactData = contacts[selectedContact];

  return (
    <div className="chat-page">
      {/* Page Header */}
      <div className="page-header">
        <h1>Contact Elderly</h1>
        <p>Stay connected with your loved ones and care team</p>
      </div>

      <div className="contact-chat-container">
        {/* Contacts List */}
        <div className="contacts-list">
          <div className="contacts-header">
            <h3>Contacts</h3>
          </div>
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`contact-item ${selectedContact === contact.id ? 'active' : ''}`}
              onClick={() => setSelectedContact(contact.id)}
            >
              <div className="contact-avatar">{contact.avatar}</div>
              <div className="contact-info">
                <h4>{contact.name}</h4>
                <p>{contact.lastMessage}</p>
              </div>
              <div className={`contact-status ${contact.status}`}></div>
            </div>
          ))}
        </div>

        {/* Chat Area */}
        <div className="chat-area">
          {/* Chat Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="contact-avatar">{selectedContactData.avatar}</div>
              <div style={{ marginLeft: '12px' }}>
                <h4>{selectedContactData.name}</h4>
                <p>{selectedContactData.status === 'online' ? '● Online' : '○ Offline'}</p>
              </div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
              <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                📞 Call
              </button>
              <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                📹 Video
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {/* Date separator */}
            <div style={{ 
              textAlign: 'center', 
              margin: '20px 0',
              color: '#6c757d',
              fontSize: '13px'
            }}>
              <span style={{ 
                background: '#f8f9fa', 
                padding: '5px 15px', 
                borderRadius: '15px' 
              }}>
                Today
              </span>
            </div>
            
            {(messages[selectedContact] || []).map((message, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: message.type === 'sent' ? 'flex-end' : 'flex-start' }}>
                <div className={`message ${message.type === 'sent' ? 'user' : 'bot'}`}>
                  {message.content}
                </div>
                <span style={{ fontSize: '11px', color: '#6c757d', marginTop: '4px', padding: '0 5px' }}>
                  {message.time}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {selectedContact === 0 && (
            <div className="quick-actions" style={{ borderTop: '1px solid #dee2e6' }}>
              {['I love you! ❤️', 'How are you feeling?', 'Did you eat today?', 'Talk soon!'].map((reply, index) => (
                <button 
                  key={index}
                  className="quick-action-btn"
                  onClick={() => setInputValue(reply)}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="chat-input-container">
            <input
              type="text"
              className="chat-input"
              placeholder={`Message ${selectedContactData.name.split(' ')[0]}...`}
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
    </div>
  );
}

export default Chat;
