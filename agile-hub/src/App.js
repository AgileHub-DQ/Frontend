import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage.js';
import LoginPage from './pages/LoginPage.js';
import BacklogPage from './pages/BacklogPage.js';
import CreateProject from './pages/CreateProject.js';
import MyPage from './pages/MyPage.js';
import IssuePage from './pages/Issue.js';
import CheckIssue from './pages/CheckIssue.js';
import TimelinePage from './pages/TimelinePage.js';
import CreateSprintModal from './components/BacklogPage/modal/CreateSprintModal.js';
import SprintPage from './pages/SprintPage.js';
import IssueComment from './pages/IssueComment.js';
import SingleIssue from './pages/SingleIssue.js';
import DraggableList from './pages/DraggableList.js';
import SprintAllList from './components/SprintPage/SprintAllList.js';
import UserMainPage from './components/MainPage/userMainPage.js';
import MemberManage from './pages/MemberManage.js';
import { useAuth } from './context/AuthContext';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/draggablelist" element={<DraggableList />} />
        <Route path="/" element={<RootPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/backlog" element={<BacklogPage />} />
        <Route path="/createProject" element={<CreateProject />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/issue" element={<IssuePage />} />
        <Route path="/checkIssue" element={<CheckIssue />} />
        <Route path="/sprint" element={<SprintPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/createSprintModal" element={<CreateSprintModal />} />
        <Route path="/issueComment" element={<IssueComment />} />
        <Route path="/singleIssue" element={<SingleIssue />} />
        <Route path="/sprintAllList" element={<SprintAllList />} />
        <Route path="/userMainPage" element={<UserMainPage />} />
        <Route path="/memberManage" element={<MemberManage />} />
      </Routes>
    </Router>
  );
};

const RootPage = () => {
  const { authToken, setAuthToken } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 accessToken을 추출합니다.
    const token = new URLSearchParams(location.search).get('accessToken');
    if (token) {
      localStorage.setItem('authToken', token);
      setAuthToken(token);
      navigate('/'); // URL 정리
    }
  }, [location.search, setAuthToken, navigate]);

  useEffect(() => {
    if (authToken) {
      console.log('로그인 성공');
      setIsLoggedIn(true);
    } else {
      console.log('로그인 실패');
      setIsLoggedIn(false);
    }
    console.log('현재 로그인 상태:', isLoggedIn);
  }, [authToken]);

  console.log('현재 authToken:', authToken);

  return (
    isLoggedIn ? <UserMainPage /> : <MainPage />
  );
};

export default App;
