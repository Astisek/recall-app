import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@/core/containers/App';
import './content/i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
