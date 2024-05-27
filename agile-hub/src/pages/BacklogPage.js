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
  const [issues, setIssues] = useState([]); 

  useEffect(() => {
    if (location.state) {
      const { projectKey, sprintId, sprintData, issues } = location.state;
      
      const loginId = location.state?.loginId;
      console.log("backlog page loginId: "+ loginId);

      setProjectKey(projectKey || '');
      setSprintId(sprintId || '');
      setSprintData(sprintData || {});
      setLoginId(loginId || '');
      setIssues(issues || []);
      
      console.log('projectKey:', projectKey);
      console.log('sprintId:', sprintId);
      console.log('sprintData:', JSON.stringify(sprintData));
      console.log("BacklogPage projectKey and sprintId and sprintData check:", projectKey, sprintId, JSON.stringify(sprintData));
      console.log('issues:', JSON.stringify(issues));
    }
  }, [location.state]);

  // const onUpdateSprintId = (newSprintId) => {
  //   setSprintId(newSprintId);
  //   console.log('Updated sprintId:', newSprintId);
  // };



  return (
    <div className='backlog_container'>
      <Menubar projectKey={projectKey} sprintId={sprintId} sprintData={sprintData} />
      <PlanSprint projectKey={projectKey} sprintId={sprintId} sprintData={sprintData} loginId={loginId} setParentIssues={setIssues} />
      <AddBacklog projectKey={projectKey} sprintId={sprintId} sprintData={sprintData} loginId={loginId} />
    </div>
  );
}

export default BacklogPage;
