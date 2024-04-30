// AddBacklog.js
import React from 'react';
import '../../css/BacklogPage/AddBacklog.css';
import CreateEpicButton from './button/CreateEpicButton.js'; // epic 추가하는 컴포넌트

function AddBacklog({projectKey}) {

  return (
    <div className='addBacklog'>
        <CreateEpicButton projectKey={projectKey}/>
    </div>
  );
}

export default AddBacklog;
