import React, { useState } from 'react';
import '../../../css/BacklogPage/CreateEpicButton.css';
import Issue from '../../../pages/Issue.js'; // Issue 컴포넌트 경로에 맞게 수정
import EpicModal from '../modal/EpicModal.js';
function CreateEpicButton({projectKey}) {
    const [showIssue, setShowIssue] = useState(false); // 이슈 컴포넌트 표시 여부 상태 추가

    const handleToggleIssue = () => {
        setShowIssue(!showIssue);
    };

    return (
        <div className='addEpic'>
            {showIssue && <EpicModal/>}
            {/* {showIssue && <Issue projectKey={projectKey}/>} */}
            <div className='epic_button_container'>
                <button className="epic_button" onClick={handleToggleIssue}>
                    <span className="epic_button__text">에픽 생성하기</span>
                </button>
            </div>
        </div>
    );
}

export default CreateEpicButton;
