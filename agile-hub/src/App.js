// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import MainPage from './pages/MainPage.js'; // 메인 페이지 컴포넌트
import LoginPage from './pages/LoginPage.js'; // 로그인 페이지 컴포넌트
import BacklogPage from './pages/BacklogPage.js'; // 백로그 페이지 컴포넌트
import CreateProject from './pages/CreateProject.js'; // 프로젝트 생성 페이지 
import MyPage from './pages/MyPage.js'; //마이페이지 
import IssuePage from './pages/Issue.js'; //이슈페이지
import CheckIssue from './pages/CheckIssue.js'; 
import TimelinePage from "./pages/TimelinePage.js"; 
import CreateSprintModal from "./components/BacklogPage/modal/CreateSprintModal.js";
import SprintPage from './pages/SprintPage.js'; //스프린트 페이지
import IssueComment from './pages/IssueComment.js';
import SingleIssue from './pages/SingleIssue.js'; 
import DraggableList from './pages/DraggableList.js';
import SprintAllList from './components/SprintPage/SprintAllList.js';

function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/draggablelist" element={<DraggableList />} />
          <Route path="/" element={<MainPage />} />
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
        </Routes>
      </Router>
    </div>
  );
  
}

export default App;
