// SprintPage.js
import { useLocation } from 'react-router-dom';
import '../css/SprintPage/SprintPage.css';
import Menubar from '../components/Menubar.js';
import DashBoard from '../components/SprintPage/DashBoard.js';
import Component from '../components/SprintPage/Component.js';
import Issue from './Issue.js';

function SprintPage() {
  const location = useLocation();
  const sprintData = location.state?.sprintData;


  return (
    <div className='sprint_container'>
      <Menubar/>
      <Component sprintData={sprintData} />
      <DashBoard/>
      <Issue/>
    </div>
  );
}

export default SprintPage;