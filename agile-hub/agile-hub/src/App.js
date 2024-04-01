// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import MainPage from './pages/MainPage.js'; // 메인 페이지 컴포넌트
import LoginPage from './pages/LoginPage.js'; // 로그인 페이지 컴포넌트
import BacklogPage from './pages/BacklogPage.js'; // 백로그 페이지 컴포넌트
import CreateProject from './pages/CreateProject.js'; // 프로젝트 생성 페이지 
import MyPage from './pages/MyPage.js'; 
import Test from './pages/Test.js';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/backlog" element={<BacklogPage />} />
          <Route path="/createProject" element={<CreateProject />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Router>
    </div>
  );
  
}

export default App;
