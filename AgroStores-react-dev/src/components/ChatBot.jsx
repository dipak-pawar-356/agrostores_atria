// import React, { useState } from 'react';
import { useState } from 'react';
import '../styles/components/chatbot.css'; 
import { sendMessageToGemini } from '../services/chatService';

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    const botResponse = await sendMessageToGemini(input);
    const botMessage = { sender: 'bot', text: botResponse };
    setMessages((prev) => [...prev, botMessage]);
    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>{msg.text}</div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about crops, nurseries, or vendors..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatBot;