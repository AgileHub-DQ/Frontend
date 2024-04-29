// SprintPage.js
import { useLocation } from 'react-router-dom';
import '../css/SprintPage/SprintPage.css';
import Menubar from '../components/Menubar.js';
import DashBoard from '../components/SprintPage/DashBoard.js';
import Component from '../components/SprintPage/Component.js';

function SprintPage() {
  const location = useLocation();
  const sprintData = location.state?.sprintData;
  const sprintId = sprintData?.sprintId;
  const projectKey = location.state?.projectKey; // projectKey 가져오기


  return (
    <div className='sprint_container'>
      <Menubar/>
      <Component sprintData={sprintData} />
      <DashBoard projectKey={projectKey} sprintId={sprintId}/>
    </div>
  );
}

export default SprintPage;