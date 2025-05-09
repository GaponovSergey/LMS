import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Main from './components/pages/main';

function App() {
  return (
    <BrowserRouter>
    <Header />    
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
