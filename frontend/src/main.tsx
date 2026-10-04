import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import WebApp from '@twa-dev/sdk';
import App from './App';
import './styles/App.css';

WebApp.ready();
WebApp.expand();
WebApp.setHeaderColor('#90EE90');
WebApp.setBackgroundColor('#90EE90');

// Manifest URL — ye TonConnect ko batata hai ki aap kaun ho
const manifestUrl = 'https://ton-fun.vercel.app/tonconnect-manifest.json';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TonConnectUIProvider>
  </React.StrictMode>
);
