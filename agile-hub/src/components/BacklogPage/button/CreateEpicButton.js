import React, { useState } from 'react';
import '../../../css/BacklogPage/CreateEpicButton.css';
import EpicModal from '../modal/EpicModal.js';
import ShowEpic from '../show/ShowEpic.js';

function CreateEpicButton({projectKey}) {
    const [showModal, setShowModal] = useState(false);
    const [epicList, setEpicList] = useState([]);

    console.log("CreateEpicButton: "+projectKey);
    const handleToggleModal = () => {
        setShowModal(!showModal);
    };

    const handleEpicSubmit = (newEpicData) => {
        // 새로운 에픽 정보를 에픽 목록에 추가
        setEpicList([...epicList, newEpicData]);
        // 모달 닫기
        setShowModal(false);
    };

    return (
        <div className='addEpic'>
            {showModal && <EpicModal onClose={handleToggleModal} onSubmit={handleEpicSubmit} projectKey={projectKey} />}
            {epicList.map((epicData, index) => (
                <ShowEpic key={index} epicData={epicData} projectKey={projectKey} />
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
