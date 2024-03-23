import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import MainPage from './components/MainPage/MainPage.js'; // 로그인 페이지 컴포넌트
import LoginPage from './components/LoginPage/LoginPage.js'; // 로그인 페이지 컴포넌트
import CreateProject from './pages/CreateProject.js'; // 프로젝트 생성 페이지 

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/createProject" element={<CreateProject />} />
        </Routes>
      </Router>
    </div>
  );
  
}

export default App;
