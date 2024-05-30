// BacklogPage.js
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/BacklogPage/BacklogPage.css';
import Menubar from '../components/Menubar.js';
import PlanSprint from '../components/BacklogPage/PlanSprint.js';
import AddBacklog from '../components/BacklogPage/AddBacklog.js';

function BacklogPage() {
  const location = useLocation();
  const [projectKey, setProjectKey] = useState('');
  const [sprintId, setSprintId] = useState('');
  const [sprintData, setSprintData] = useState({});
  const renderingSprintRef = useRef(null);
  // const [loginId, setLoginId] = useState('');

  useEffect(() => {
    if (location.state) {
      const { projectKey, sprintId, sprintData } = location.state;
      // const loginId = location.state?.loginId;

      setProjectKey(projectKey || '');
      setSprintId(sprintId || '');
      setSprintData(sprintData || {});
      // setLoginId(loginId || '');
    }
  }, [location.state]);

  const renderingSprint = () => {
    if (renderingSprintRef.current) {
      renderingSprintRef.current.test();
    }
  };
  


  return (
    <div className='backlog_container'>
      <Menubar projectKey={projectKey} sprintId={sprintId} sprintData={sprintData} />
      <PlanSprint projectKey={projectKey} sprintId={sprintId} sprintData={sprintData} renderingSprint={renderingSprint}  />
      <AddBacklog projectKey={projectKey} sprintId={sprintId} sprintData={sprintData} renderingSprint={renderingSprint} />
    </div>
  );
}

export default BacklogPage;
