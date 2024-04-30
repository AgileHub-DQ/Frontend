// BacklogPage.js
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/BacklogPage/BacklogPage.css';
import Menubar from '../components/Menubar.js';
import PlanSprint from '../components/BacklogPage/PlanSprint.js';
import AddBacklog from '../components/BacklogPage/AddBacklog.js';

function BacklogPage() {
  const location = useLocation();
  const [projectKey, setProjectKey] = useState('');

  useEffect(() => {
    // location.state에서 projectKey 가져오기
    const projectKey = location.state?.key;
    setProjectKey(projectKey);
    console.log('projectKey:', projectKey);
}, [location.state]);

  return (
    <div className='backlog_container'>
      <Menubar/>
      <PlanSprint projectKey={projectKey}/>
      <AddBacklog projectKey={projectKey}/>
    </div>
  );
}

export default BacklogPage;