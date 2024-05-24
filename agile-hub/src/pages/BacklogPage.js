// BacklogPage.js
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useLocation, json } from 'react-router-dom';
import '../css/BacklogPage/BacklogPage.css';
import Menubar from '../components/Menubar.js';
import PlanSprint from '../components/BacklogPage/PlanSprint.js';
import AddBacklog from '../components/BacklogPage/AddBacklog.js';

function BacklogPage({projectKey, sprintId, sprintData}) {
  console.log("BacklogPage projectKey and sprintId and sprintData check: "+ projectKey + sprintId + JSON.stringify(sprintData));
  // const location = useLocation();
  // const [projectKey, setProjectKey] = useState('');
  // const [sprintId, setSprintId] = useState('');

//   useEffect(() => {
//     // location.state에서 projectKey 가져오기
//     const projectKey = location.state?.key;
//     const sprintId = location.state?.sprintId;
//     setProjectKey(projectKey);
//     setSprintId(sprintId);
//     console.log('projectKey:', projectKey);
//     console.log('sprintId:', sprintId);
// }, [location.state]);

// const projectKey = 'P1';
// const sprintId = 83;

  return (
    <div className='backlog_container'>
      <Menubar projectKey={projectKey} sprintId={sprintId} sprintData={sprintData}/>
      <PlanSprint projectKey={projectKey} sprintId={sprintId} sprintData={sprintData}/>
      <AddBacklog projectKey={projectKey} sprintId={sprintId}/>
    </div>
  );
}

export default BacklogPage;