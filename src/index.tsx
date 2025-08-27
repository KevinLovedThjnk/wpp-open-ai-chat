import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// For standalone development
if (typeof document !== 'undefined' && document.getElementById('root')) {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// For WPP Open System JS integration
export default App;
