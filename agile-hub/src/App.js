//import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
//import axios from 'axios';
import MainPage from './components/MainPage/MainPage.jsx'; // 로그인 페이지 컴포넌트
import LoginPage from './components/LoginPage/LoginPage.jsx'; // 로그인 페이지 컴포넌트

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
  
}

export default App;
