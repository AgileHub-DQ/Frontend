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