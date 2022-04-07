import React from 'react';
import './App.css';
import Table from './components/Table';
import ContextComponent from './context/ContextComponent';
import Header from './components/Header';

function App() {
  return (
    <ContextComponent>
      <Header />
      <Table />
    </ContextComponent>
  );
}

export default App;
