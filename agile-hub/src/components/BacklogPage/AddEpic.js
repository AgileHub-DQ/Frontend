// AddEpic.js
import React, { useState } from 'react';
import Modal from '../modal/Modal.js'; // EpicModal 컴포넌트를 불러옴
import ShowEpic from './ShowEpic.js'; // ShowEpic 컴포넌트를 불러옴

function AddEpic() {
    const [showModal, setShowModal] = useState(false);
    const [epicInfo, setEpicInfo] = useState({
        info1: '',
        info2: ''
    });

    const handleToggleModal = () => {
        setShowModal(!showModal); // showModal 상태를 토글합니다.
    };

    const handleEpicSubmit = (epicInfo) => {
        setEpicInfo(epicInfo); // 입력된 에픽 정보를 상태에 저장합니다.
    };

    return (
        <div className='addEpic'>
            <button className="button" onClick={handleToggleModal}>
                <span className="button__text">에픽 생성하기</span>
            </button>
            {showModal && <Modal onClose={handleToggleModal} onSubmit={handleEpicSubmit} />} {/* showModal 상태에 따라 EpicModal 컴포넌트를 렌더링합니다. */}
            <ShowEpic epicInfo={epicInfo} /> {/* 입력된 에픽 정보를 ShowEpic 컴포넌트로 전달합니다. */}
        </div>
    );
}

export default AddEpic;
