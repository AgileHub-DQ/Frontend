// AddStory.js
import React, { useState } from 'react';
import StoryModal from '../modal/StoryModal.js'; // StoryModal 컴포넌트를 불러옴
import ShowStory from './ShowStory.js'; // ShowStory 컴포넌트를 불러옴

function AddStory() {
    const [showModal, setShowModal] = useState(false);
    const [storyInfo, setStoryInfo] = useState({
        info1: '',
    });

    const handleCreateStory = () => {
        setShowModal(true); // 모달을 보이도록 설정합니다.
    };

    const handleCloseModal = () => {
        setShowModal(false); // 모달을 숨깁니다.
    };

    const handleSubmitModal = (storyInfo) => {
        // 여기서는 입력된 정보를 처리하거나 전송하는 작업을 수행할 수 있습니다.
        console.log('입력된 스토리 정보:', storyInfo);
        setStoryInfo(storyInfo);
        handleCloseModal(); // 모달을 닫습니다.
    };

    return (
        <div>
            {/* 스토리 생성하기 버튼 */}
            <button onClick={handleCreateStory}>스토리 생성하기</button>

            {/* 모달 */}
            {showModal && <StoryModal onClose={handleCloseModal} onSubmit={handleSubmitModal} />}
            <ShowStory storyInfo={storyInfo} /> {/* 입력된 스토리 정보를 ShowStory 컴포넌트로 전달합니다. */}
        </div>
    );
}

export default AddStory;
