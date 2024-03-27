// AddBacklog.js
import React from 'react';
//import '../../css/BacklogPage/AddBacklog.css';
import AddEpic from '../BacklogPage/AddEpic.js'; // epic 추가하는 컴포넌트

function AddBacklog() {

  return (
    <div className='addBacklog'>
        <AddEpic/>
    </div>
  );
}

export default AddBacklog;