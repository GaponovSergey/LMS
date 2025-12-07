import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/pages/Main';
import Course from './components/pages/Course';

function App() {
  return (
    <BrowserRouter>
    <Header />    
    <Routes>
      <Route path="/courses/:courseId" element={<Course />} />
      <Route path="/" element={<Main />} />
    </Routes>
    <footer></footer>
    </BrowserRouter>

  );
}

export default App;
