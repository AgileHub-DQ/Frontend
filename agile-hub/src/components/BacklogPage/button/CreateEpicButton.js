import React, { useState } from 'react';
import '../../../css/BacklogPage/CreateEpicButton.css';
import EpicModal from '../modal/EpicModal.js';

function CreateEpicButton({projectKey, onEpicSubmit, loginId}) {
    const [showModal, setShowModal] = useState(false);
    const [epicList, setEpicList] = useState([]);

    const handleToggleModal = () => {
        setShowModal(!showModal);
    };

    const handleEpicSubmit = (newEpicData) => {
        setEpicList((prevEpicList) => [...prevEpicList, newEpicData]);
        onEpicSubmit(newEpicData); // 새로운 에픽을 상위 컴포넌트로 전달
        setShowModal(false);
    };

    return (
        <div className='addEpic'>
            {showModal && <EpicModal onClose={handleToggleModal} onSubmit={handleEpicSubmit} projectKey={projectKey} loginId={loginId}/>}
            <div className='epic_button_container'>
                <button className="epic_button" onClick={handleToggleModal}>
                    <span className="epic_button__text">에픽 생성하기</span>
                </button>
            </div>
        </div>
    );
}

export default CreateEpicButton;
