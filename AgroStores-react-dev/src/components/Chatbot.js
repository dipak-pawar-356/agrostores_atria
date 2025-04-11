import { useState, useEffect, useRef } from "react";
import { sendMessageToGemini } from "../services/chatService";
import "./Chatbot.css";

const botIcon = "https://www.potatonewstoday.com/wp-content/uploads/2020/08/Smart-Farmer-logo.jpg";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatRef = useRef(null);

  useEffect(() => {
    if (open) {
      setMessages([
        {
          sender: "bot",
          text: "👋 Hello! I’m your Agri Assistant. Are you a Farmer, Vendor, or Nursery Owner?",
        },
      ]);
    }
  }, [open]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => setOpen(!open);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const botReply = await sendMessageToGemini(input);
    setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <>
      <button className="chatbot-button" onClick={toggleChat}>
        <img src={botIcon} alt="Chatbot" className="chatbot-icon" />
      </button>

      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            Agri Chatbot
            <button
              onClick={toggleChat}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              ✖
            </button>
          </div>

          <div className="chatbot-messages" ref={chatRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button onClick={handleSubmit}>➤</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;