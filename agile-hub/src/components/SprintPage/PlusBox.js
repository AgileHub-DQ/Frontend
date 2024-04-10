import React, { useState } from 'react';
import '../../css/SprintPage/PlusBox.css';
// import Issue from '../../pages/Issue.js';
// import StoryModal from '../BacklogPage/modal/StoryModal.js'; // StoryModal 컴포넌트 import

function PlusBox() {
    // const [showIssue, setShowIssue] = useState(false); // 이슈 컴포넌트 표시 여부 상태 추가

    // const handleToggleIssue = () => {
    //     setShowIssue(!showIssue);
    // };

  return (
    <>
      {/* <div className="plusbox" onClick={handleToggleIssue}> */}
      <div className="plusbox">
        <div className="rectangle33"></div>
        <div className="image62"></div>
      </div>
      {/* {showIssue && <Issue />}  */}
    </>
  );
}

export default PlusBox;
