import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import { getProjectPass } from './utils/api/clientApi';

const root = document.getElementById('root');
root && ReactDOM.createRoot(root).render(<App />);

console.log(getProjectPass);
