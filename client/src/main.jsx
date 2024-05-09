import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

// Use createRoot from 'react-dom/client'
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <PrimeReactProvider>

      <App />

    </PrimeReactProvider>
  </BrowserRouter>
);
