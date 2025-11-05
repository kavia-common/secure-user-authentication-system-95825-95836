import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// Attach dev probe utilities for quick API checks in the browser console during development.
import './services/devProbe';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
