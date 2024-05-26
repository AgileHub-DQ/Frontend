import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logoIcon from '../assets/logoWhite.png';
import projectIcon from '../assets/ProjectIcon.png';
import membersIcon from '../assets/MembersIcon.png';
import backlogIcon from '../assets/BacklogIcon.png';
import sprintIcon from '../assets/SprintIcon.png';
import myPageIcon from '../assets/MyPageIcon.png';
import timelineIcon from '../assets/TimelineIcon.png';
import { useAuth } from '../context/AuthContext.js';

function Menubar({ loginId }) {
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [projectKey, setProjectKey] = useState('');
  const [sprintId, setSprintId] = useState('');
  const [sprintData, setSprintData] = useState({});
  const [projectName, setProjectName] = useState('');
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    // localStorage에서 저장된 값을 불러오기
    const savedProjectKey = localStorage.getItem('projectKey');
    const savedSprintId = localStorage.getItem('sprintId');
    const savedSprintData = localStorage.getItem('sprintData');
    const savedProjectName = localStorage.getItem('projectName');
    const savedIssues = localStorage.getItem('sprintIssues');

    if (savedProjectKey && savedSprintId && savedSprintData && savedProjectName) {
      setProjectKey(savedProjectKey);
      setSprintId(savedSprintId);
      setSprintData(JSON.parse(savedSprintData));
      setProjectName(savedProjectName);
    }

    if (savedIssues) {
      setIssues(JSON.parse(savedIssues));
    }

    if (location.state) {
      const { projectKey, sprintId, sprintData, projectName, issues } = location.state;
      setProjectKey(projectKey || savedProjectKey || '');
      setSprintId(sprintId || savedSprintId || '');
      setSprintData(sprintData || JSON.parse(savedSprintData) || {});
      setProjectName(projectName || savedProjectName || '');
      setIssues(issues || JSON.parse(savedIssues) || []);

      // localStorage에 상태 저장
      if (projectKey) localStorage.setItem('projectKey', projectKey);
      if (sprintId) localStorage.setItem('sprintId', sprintId);
      if (sprintData) localStorage.setItem('sprintData', JSON.stringify(sprintData));
      if (projectName) localStorage.setItem('projectName', projectName);
      if (issues) localStorage.setItem('sprintIssues', JSON.stringify(issues));

      console.log('projectKey:', projectKey);
      console.log('sprintId:', sprintId);
      console.log('sprintData:', JSON.stringify(sprintData));
      console.log('projectName:', projectName);
      console.log(
        'Menubar projectKey and sprintId and sprintData and projectName check:',
        projectKey,
        sprintId,
        JSON.stringify(sprintData),
        projectName,
      );
    }
  }, [location.state]);

  console.log(
    'Menubar projectKey and sprintId and sprintData and projectName check: ' +
      projectKey +
      sprintId +
      JSON.stringify(sprintData) +
      projectName,
  );

  const menubarStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '20%',
    minWidth: '300px',
    height: '100vh',
    float: 'left',
    backgroundColor: '#2E4BBA',
  };

  const menuItemStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '10px 0',
    marginTop: '1.5rem',
  };

  const imageStyle = {
    width: '50px',
    height: 'auto',
    marginRight: '10px',
  };

  const logoStyle = {
    width: '15rem',
    height: 'auto',
    marginBottom: '20px',
    marginTop: '2rem',
  };

  const textStyle = {
    color: 'white',
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: '0.875rem',
    marginLeft: '1rem',
  };

  return (
    <div style={menubarStyle}>
      <img src={logoIcon} alt="Logo" style={logoStyle} />
      <div>
        <div
          style={menuItemStyle}
          onClick={() => navigate('/createProject', { state: { projectKey, sprintData, sprintId } })}
        >
          <img src={projectIcon} alt="Projects" style={imageStyle} />
          <span style={textStyle}>프로젝트</span>
        </div>
        <div
          style={menuItemStyle}
          onClick={() => navigate('/memberManage', { state: { projectKey, sprintData, sprintId } })}
        >
          <img src={membersIcon} alt="Members" style={imageStyle} />
          <span style={textStyle}>멤버</span>
        </div>
        <div
          style={menuItemStyle}
          onClick={() => navigate('/backlog', { state: { projectKey, sprintData, sprintId, loginId } })}
        >
          <img src={backlogIcon} alt="Backlog" style={imageStyle} />
          <span style={textStyle}>백로그</span>
        </div>
        <div
          style={menuItemStyle}
          onClick={() => navigate('/sprint', { state: { projectKey, sprintData, sprintId, issues, loginId } })}
        >
          <img src={sprintIcon} alt="Sprint" style={imageStyle} />
          <span style={textStyle}>스프린트</span>
        </div>
        <div
          style={menuItemStyle}
          onClick={() => navigate('/timeline', { state: { projectKey, sprintData, sprintId, projectName, issues } })}
        >
          <img src={timelineIcon} alt="Timeline" style={imageStyle} />
          <span style={textStyle}>타임라인</span>
        </div>
        <div style={menuItemStyle} onClick={() => navigate('/myPage', { state: { projectKey, sprintData, sprintId } })}>
          <img src={myPageIcon} alt="My Page" style={imageStyle} />
          <span style={textStyle}>마이페이지</span>
        </div>
      </div>
    </div>
  );
}

export default Menubar;
