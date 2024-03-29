// BacklogPage.js
import React from 'react';
import '../css/BacklogPage/BacklogPage.css';
import Menubar from '../components/BacklogPage/Menubar.js';
import PlanSprint from '../components/BacklogPage/PlanSprint.js';
import AddBacklog from '../components/BacklogPage/AddBacklog.js';

function BacklogPage() {

  return (
    <div className='backlog_container'>
      <Menubar/>
      <PlanSprint/>
      <AddBacklog/>
    </div>
  );
}

export default BacklogPage;