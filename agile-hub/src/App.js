import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import MainPage from './components/MainPage/MainPage.js'; // 로그인 페이지 컴포넌트
import LoginPage from './components/LoginPage/LoginPage.js'; // 로그인 페이지 컴포넌트
import CreateProject from './pages/CreateProject.js'; // 프로젝트 생성 페이지 
import MyPage from './pages/MyPage.js'; //마이페이지 
import IssuePage from './pages/Issue.js'; //이슈페이지
import CheckIssue from './pages/CheckIssue.js'; 

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/createProject" element={<CreateProject />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/issue" element={<IssuePage />} />
          <Route path="/CheckIssue" element={<CheckIssue />} />
        </Routes>
      </Router>
    </div>
  );
  
}

export default App;
