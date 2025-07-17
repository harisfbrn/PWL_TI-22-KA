import React from 'react';

function MessageBubble({ sender, text, sentiment }) {
  const isUser = sender === 'user';

  return (
    <div className={`message-row ${isUser ? 'user' : 'bot'}`}>
      <div className={`bubble ${isUser ? 'user-bubble' : 'bot-bubble'}`}>
        <div>{text}</div>
        {!isUser && sentiment && (
          <div className="sentiment">
            <small>Sentimen: {sentiment}</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;
