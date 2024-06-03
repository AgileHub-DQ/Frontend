import React, { useState } from 'react';
import '../../css/SprintPage/PlusBox.css';
import Issue from '../../pages/Issue.js';

function PlusBox({ projectKey, sprintId, test, onRendering }) {
  const [addIssue, setAddIssue] = useState(false); 

  const handleAddIssue = () => {
    setAddIssue(!addIssue); 
  };

  return (
    <div>
        {addIssue && <Issue projectKey={projectKey} sprintId={sprintId} onIssuesUpdated={test} onRendering={onRendering} />} 
        <div className="plusbox" onClick={handleAddIssue}>
          <div className="rectangle33"></div>
          <div className="image62"></div>
        </div>
      </div>         
  );
}

export default PlusBox;
