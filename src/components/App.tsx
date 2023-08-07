import React from 'react';
import '../styles/index.css';
import Header from './home-page/header/Header';
import Main from './home-page/main/MainSection';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
};

export default App;
