import React, { useState } from 'react';
import StoryModal from '../modal/StoryModal.js';
import ShowStory from '../show/ShowStory.js';

function CreateStoryButton() {
    const [showModal, setShowModal] = useState(false);
    const [storyList, setStoryList] = useState([]);

    const handleToggleModal = () => {
        setShowModal(!showModal); // showModal 상태를 토글합니다.
    };

    const handleStorySubmit = (newStoryInfo) => {
        // 새로운 스토리 정보를 스토리 목록에 추가합니다.
        setStoryList([...storyList, newStoryInfo]);
        // 모달을 닫습니다.
        setShowModal(false);
    };

    return (
        <div className='addStory'>
            <button className="button" onClick={handleToggleModal}>
                <span className="button__text">스토리 생성하기</span>
            </button>
            {showModal && <StoryModal onClose={handleToggleModal} onSubmit={handleStorySubmit} />} {/* showModal 상태에 따라 StoryModal 컴포넌트를 렌더링합니다. */}
            {/* 저장된 스토리 목록을 모두 ShowStory 컴포넌트로 전달합니다. */}
            {storyList.map((storyInfo, index) => (
                <ShowStory key={index} storyInfo={storyInfo} />
            ))}
        </div>
    );
}

export default CreateStoryButton;
