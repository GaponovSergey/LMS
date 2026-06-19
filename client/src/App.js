import './App.css';
import React, {useEffect, useRef} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/pages/Main';
import Course from './components/pages/Course';
import TryRedactor from './components/pages/Main/TryRedactor';
import Footer from './components/Footer';



export default function App() {

  console.log('fetch app');

  return (
    <BrowserRouter>
    <Header />    
    <Routes>
      <Route path="/courses/:courseId" element={<Course />} />
      <Route path="/" element={<Main />} />
      <Route path="/tryRedactor" element={<TryRedactor />} />
    </Routes>
    <Footer />
    </BrowserRouter>

  );
}

 
