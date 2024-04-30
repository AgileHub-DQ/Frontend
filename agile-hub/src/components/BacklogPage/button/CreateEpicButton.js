import React, { useState } from 'react';
import '../../../css/BacklogPage/CreateEpicButton.css';
import EpicModal from '../modal/EpicModal.js';
import ShowEpic from '../show/ShowEpic.js';

function CreateEpicButton() {
    const [showModal, setShowModal] = useState(false);
    const [epicList, setEpicList] = useState([]);

    const handleToggleModal = () => {
        setShowModal(!showModal);
    };

    const handleEpicSubmit = (newEpicInfo) => {
        // 새로운 에픽 정보를 에픽 목록에 추가
        setEpicList([...epicList, newEpicInfo]);
        // 모달 닫기
        setShowModal(false);
    };

    return (
        <div className='addEpic'>

            {showModal && <EpicModal onClose={handleToggleModal} onSubmit={handleEpicSubmit} />} 
            {epicList.map((epicInfo, index) => (
                <ShowEpic key={index} epicInfo={epicInfo} />
            ))}
            <div className='epic_button_container'>
                <button className="epic_button" onClick={handleToggleModal}>
                    <span className="epic_button__text">에픽 생성하기</span>
                </button>
            </div>
        </div>
    );
}

export default CreateEpicButton;


// import React, { useState } from 'react';
// import '../../../css/BacklogPage/CreateEpicButton.css';
// import EpicModal from '../modal/EpicModal.js';
// // import Issue from '../../../pages/Issue.js'; // Issue 컴포넌트 경로에 맞게 수정

// function CreateEpicButton() {
//     const [showIssue, setShowIssue] = useState(false); // 이슈 컴포넌트 표시 여부 상태 추가

//     const handleToggleIssue = () => {
//         setShowIssue(!showIssue);
//     };

//     return (
//         <div className='addEpic'>
//             {showIssue && <EpicModal onClose={handleToggleIssue} />} {/* 이슈 컴포넌트 표시 */}
//             <div className='epic_button_container'>
//                 <button className="epic_button" onClick={handleToggleIssue}>
//                     <span className="epic_button__text">에픽 생성하기</span>
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default CreateEpicButton;