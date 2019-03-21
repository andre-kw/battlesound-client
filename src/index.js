import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import { AppProvider } from './components/AppContext';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>, 
  document.getElementById('root')
);
