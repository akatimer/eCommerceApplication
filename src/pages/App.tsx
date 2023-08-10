import React from 'react';
import '../styles/index.css';
import Header from '../components/Header/Header';
import LogIn from '../components/LogIn/LogIn';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <LogIn />
    </div>
  );
};

export default App;
