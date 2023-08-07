import React from 'react';
import '../styles/index.css';
import Header from './header/Header';
import Main from './main/MainSection';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
};

export default App;
