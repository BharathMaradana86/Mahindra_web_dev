import './fonts.css'
import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { FeaturesProvider } from './FeaturesContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FeaturesProvider>
        <App />
      </FeaturesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
