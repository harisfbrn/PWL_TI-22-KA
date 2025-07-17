import React from 'react';
import ChatList from '../src/components/ChatList';
import ChatWindow from '../src/components/ChatWindow';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <ChatList />
      <ChatWindow />
    </div>
  );
}

export default App;
