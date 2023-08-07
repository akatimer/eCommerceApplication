import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Header from './components/header/Header';

const root = document.getElementById('root');
root && ReactDOM.createRoot(root).render(<Header />);
