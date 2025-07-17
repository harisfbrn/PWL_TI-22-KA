import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MessageBubble from './MessageBubble';

function ChatWindow() {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState('');

  const fetchMessages = async () => {
    const res = await axios.get('http://localhost:5000/api/messages');
    setChat(res.data);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const res = await axios.post('http://localhost:5000/api/message', {
      message: input
    });
    setChat(prev => [...prev, res.data]);
    setInput('');
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>Bot Pak RT</h3>
        <span className="online-status">Online</span>
      </div>

      <div className="chat-body">
        {chat.map((entry, i) => (
          <React.Fragment key={i}>
            <MessageBubble sender="user" text={entry.user} />
            <MessageBubble
              sender="bot"
              text={entry.bot}
              sentiment={entry.sentiment}
            />
          </React.Fragment>
        ))}
      </div>

      <div className="chat-input">
        <input
          placeholder="Type a message here"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>send</button>
      </div>
    </div>
  );
}



export default ChatWindow;
