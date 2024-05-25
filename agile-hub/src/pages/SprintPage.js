// SprintPage.js
import { useLocation } from 'react-router-dom';
import '../css/SprintPage/SprintPage.css';
import Menubar from '../components/Menubar.js';
import DashBoard from '../components/SprintPage/DashBoard.js';
import Component from '../components/SprintPage/Component.js';

function SprintPage({ }) {

  const location = useLocation();
  const sprintData = location.state?.sprintData;
  const sprintId = sprintData?.sprintId;
  const projectKey = location.state?.projectKey; 
  const projectName = location.state?.projectName; 
  const issues = location.state?.issues;

  console.log("SprintPage projectKey and sprintId and sprintData and projectName and issues check: "+ projectKey + sprintId + JSON.stringify(sprintData) + projectName + JSON.stringify(issues[0]));
  // console.log(JSON.stringify(sprintData) + sprintId + projectKey);


  return (
    <div className='sprint_container'>
      <Menubar sprintData={sprintData} projectKey={projectKey} sprintId={sprintId} projectName={projectName}/>
      <Component sprintData={sprintData} />
      <DashBoard projectKey={projectKey} sprintId={sprintId} issues={issues}/>
    </div>
  );
}

export default SprintPage;