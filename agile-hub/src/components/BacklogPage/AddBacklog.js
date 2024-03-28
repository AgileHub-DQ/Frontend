// AddBacklog.js
import React from 'react';
import CreateEpicButton from './button/CreateEpicButton.js'; // epic 추가하는 컴포넌트
//import CreateStoryButton from './button/CreateStoryButton.js';

function AddBacklog() {

  return (
    <div className='addBacklog'>
        <CreateEpicButton/>
    </div>
  );
}

export default AddBacklog;
