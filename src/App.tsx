import React, { useState } from 'react';
import { useWPPAI } from './hooks/use-wpp-ai';
import { WPP_AI_MODELS } from './config/wpp-config';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  model?: string;
}

function App() {
  const [selectedModel, setSelectedModel] = useState<string>(WPP_AI_MODELS[0].id);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  
  const { state, sendMessage, checkHealth, getUserInfo } = useWPPAI();

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    if (!state.isConnected) {
      alert('Please ensure you are running within the Open OS environment to use AI services.');
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');

    try {
      const response = await sendMessage(currentMessage, selectedModel);
      
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response.response,
        isUser: false,
        timestamp: new Date(),
        model: selectedModel
      };
      
      setChatHistory(prev => [...prev, aiResponse]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: `Error: ${error instanceof Error ? error.message : 'Failed to get response'}`,
        isUser: false,
        timestamp: new Date(),
        model: selectedModel
      };
      setChatHistory(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🤖 WPP Open AI Chat</h1>
        <p>AI-powered chat running within the Open OS platform</p>
      </header>

      <div className="chat-container">
        {/* Open OS Status Panel */}
        <div className="connection-panel">
          <h3>🔗 Open OS Integration Status</h3>
          
          {state.isLoading ? (
            <div className="connection-status">
              <div className="status-loading">
                ⏳ Connecting to WPP Open...
              </div>
            </div>
          ) : state.isConnected ? (
            <div className="connection-status">
              <div className="status-success">
                ✅ Connected to WPP Open via Open OS
              </div>
              <div className="connection-actions">
                <button onClick={checkHealth} className="action-button">
                  🔍 Health Check
                </button>
                <button onClick={getUserInfo} className="action-button">
                  👤 User Info
                </button>
              </div>
            </div>
          ) : (
            <div className="connection-status">
              <div className="status-info">
                ℹ️ {state.error || 'Checking Open OS environment...'}
              </div>
              <div className="openos-instructions">
                <p><strong>To use AI services:</strong></p>
                <ol>
                  <li>Launch this app from within the Open OS platform</li>
                  <li>Ensure you are properly authenticated</li>
                  <li>The app will automatically connect using your Open OS context</li>
                </ol>
                <p><em>Note: Running locally will show this message. This is expected behavior.</em></p>
              </div>
            </div>
          )}

          {state.healthStatus && (
            <div className="health-info">
              <strong>Health Status:</strong>
              <pre className="json-display">
                {JSON.stringify(state.healthStatus, null, 2)}
              </pre>
            </div>
          )}

          {state.userInfo && (
            <div className="user-info">
              <strong>User Info:</strong>
              <pre className="json-display">
                {JSON.stringify(state.userInfo, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Model Selection */}
        <div className="model-selection">
          <label htmlFor="model-select">Select AI Model:</label>
          <select
            id="model-select"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="model-dropdown"
            disabled={!state.isConnected}
          >
            {WPP_AI_MODELS.map(model => (
              <option key={model.id} value={model.id}>
                {model.name} - {model.description}
              </option>
            ))}
          </select>
        </div>

        {/* Chat Messages */}
        <div className="chat-messages">
          {chatHistory.length === 0 ? (
            <div className="empty-chat">
              <p>
                {state.isConnected 
                  ? 'No messages yet. Start a conversation with AI!' 
                  : 'Launch this app from Open OS to start chatting with AI models!'
                }
              </p>
            </div>
          ) : (
            chatHistory.map(message => (
              <div
                key={message.id}
                className={`message ${message.isUser ? 'user-message' : 'ai-message'}`}
              >
                <div className="message-header">
                  <span className="message-sender">
                    {message.isUser ? 'You' : `AI (${message.model})`}
                  </span>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <div className="message-text">{message.text}</div>
              </div>
            ))
          )}
          {state.isLoading && (
            <div className="message ai-message">
              <div className="message-header">
                <span className="message-sender">AI (thinking...)</span>
              </div>
              <div className="message-text">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="chat-input-container">
          <div className="input-wrapper">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                state.isConnected 
                  ? "Type your message here... (Press Enter to send)"
                  : "Launch from Open OS to start chatting"
              }
              className="chat-input"
              rows={3}
              disabled={!state.isConnected}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || !state.isConnected || state.isLoading}
              className="send-button"
            >
              {state.isLoading ? '⏳' : '📤'}
            </button>
          </div>
        </div>

        {/* Chat Actions */}
        <div className="chat-actions">
          <button 
            onClick={clearChat} 
            className="clear-button"
            disabled={!state.isConnected}
          >
            🗑️ Clear Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
