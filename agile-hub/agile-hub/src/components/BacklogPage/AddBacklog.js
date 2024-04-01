// AddBacklog.js
import React from 'react';
import '../../css/BacklogPage/AddBacklog.css';
import CreateEpicButton from './button/CreateEpicButton.js'; // epic 추가하는 컴포넌트

function AddBacklog() {

  return (
    <div className='addBacklog'>
        <CreateEpicButton/>
    </div>
  );
}

export default AddBacklog;
