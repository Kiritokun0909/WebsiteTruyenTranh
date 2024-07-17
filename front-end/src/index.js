import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Turn on strict mode will make app fetch api twice once call
  <React.StrictMode>  
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);