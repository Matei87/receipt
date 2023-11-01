import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap';
import { ReceiptProvider } from './Context/context';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReceiptProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReceiptProvider>
  </React.StrictMode>
);
