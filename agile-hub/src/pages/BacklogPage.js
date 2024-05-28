// BacklogPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/BacklogPage/BacklogPage.css';
import Menubar from '../components/Menubar.js';
import PlanSprint from '../components/BacklogPage/PlanSprint.js';
import AddBacklog from '../components/BacklogPage/AddBacklog.js';

function BacklogPage() {
  const location = useLocation();
  const [projectKey, setProjectKey] = useState('');
  const [sprintId, setSprintId] = useState('');
  const [sprintData, setSprintData] = useState({});
  const [loginId, setLoginId] = useState('');

  useEffect(() => {
    if (location.state) {
      const { projectKey, sprintId, sprintData } = location.state;
      const loginId = location.state?.loginId;

      setProjectKey(projectKey || '');
      setSprintId(sprintId || '');
      setSprintData(sprintData || {});
      setLoginId(loginId || '');
    }
  }, [location.state]);

  return (
    <div className='backlog_container'>
      <Menubar projectKey={projectKey} sprintId={sprintId} sprintData={sprintData} />
      <PlanSprint projectKey={projectKey} sprintId={sprintId} sprintData={sprintData} loginId={loginId} />
      <AddBacklog projectKey={projectKey} sprintId={sprintId} sprintData={sprintData} loginId={loginId} />
    </div>
  );
}

export default BacklogPage;
