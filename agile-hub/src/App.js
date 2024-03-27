// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import MainPage from './pages/MainPage.js'; // 메인 페이지 컴포넌트
import LoginPage from './pages/LoginPage.js'; // 로그인 페이지 컴포넌트
import BacklogPage from './pages/BacklogPage.js'; // 백로그 페이지 컴포넌트

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/backlog" element={<BacklogPage />} />
        </Routes>
      </Router>
    </div>
  );
  
}

export default App;
