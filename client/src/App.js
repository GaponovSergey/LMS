import './App.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';

function App() {
  return (
    <BrowserRouter>
    <Header />    
    <Routes>
      <Route path="/" />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
