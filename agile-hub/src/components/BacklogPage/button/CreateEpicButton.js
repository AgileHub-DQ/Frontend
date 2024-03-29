import React, { useState } from 'react';
import EpicModal from '../modal/EpicModal.js';
import ShowEpic from '../show/ShowEpic.js';

function CreateEpicButton() {
    const [showModal, setShowModal] = useState(false);
    const [epicList, setEpicList] = useState([]);

    const handleToggleModal = () => {
        setShowModal(!showModal); // showModal 상태를 토글합니다.
    };

    const handleEpicSubmit = (newEpicInfo) => {
        // 새로운 에픽 정보를 에픽 목록에 추가합니다.
        setEpicList([...epicList, newEpicInfo]);
        // 모달을 닫습니다.
        setShowModal(false);
    };

    return (
        <div className='addEpic'>
            <button className="button" onClick={handleToggleModal}>
                <span className="button__text">에픽 생성하기</span>
            </button>
            {showModal && <EpicModal onClose={handleToggleModal} onSubmit={handleEpicSubmit} />} {/* showModal 상태에 따라 EpicModal 컴포넌트를 렌더링합니다. */}
            {/* 저장된 에픽 목록을 모두 ShowEpic 컴포넌트로 전달합니다. */}
            {epicList.map((epicInfo, index) => (
                <ShowEpic key={index} epicInfo={epicInfo} />
            ))}
        </div>
    );
}

export default CreateEpicButton;
