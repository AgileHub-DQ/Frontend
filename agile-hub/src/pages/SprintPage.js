// SprintPage.js
import '../css/SprintPage/SprintPage.css';
import Menubar from '../components/Menubar.js';
import DashBoard from '../components/SprintPage/DashBoard.js';
import Component from '../components/SprintPage/Component.js';
import Issue from './Issue.js';

function SprintPage() {

  return (
    <div className='sprint_container'>
      <Menubar/>
      <Component/>
      <DashBoard/>
      <Issue/>
    </div>
  );
}

export default SprintPage;