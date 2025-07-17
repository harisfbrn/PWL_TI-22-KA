import React from 'react';


const users = [
  { name: 'Bot Pak RT', time: '17:46', initial: 'P', color: '#535ADF', active: true },];

function ChatList() {
  return (
    <div className="chat-list">
      {users.map((user, index) => (
        <div
          key={index}
          className={`chat-user ${user.active ? 'active' : ''}`}
        >
          <div className="user-avatar" style={{ backgroundColor: user.color }}>
            {user.initial}
          </div>
          <div className="user-details">
            <div className="user-header">
              <span className="user-name">{user.name}</span>
              <span className="user-time">{user.time}</span>
            </div>
            <p className="user-snippet">Bot pak RT silahkan Tanya .....</p>
          </div>
          {user.active && <div className="active-bar" />}
        </div>
      ))}
    </div>
  );
}

export default ChatList;
