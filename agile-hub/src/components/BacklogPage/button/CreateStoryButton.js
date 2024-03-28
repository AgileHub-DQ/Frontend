import React, { useState } from 'react';
import StoryModal from '../modal/StoryModal.js';
import ShowStory from '../show/ShowStory.js';

function CreateStoryButton() {
    const [showModal, setShowModal] = useState(false);
    const [storyInfo, setStoryInfo] = useState({
        info1: ''
    });

    const handleToggleModal = () => {
        setShowModal(!showModal); // showModal 상태를 토글합니다.
    };

    const handleStorySubmit = (storyInfo) => {
        setStoryInfo(storyInfo); // 입력된 에픽 정보를 상태에 저장합니다.
    };

    return (
        <div className='addStory'>
            <button className="button" onClick={handleToggleModal}>
                <span className="button__text">스토리 생성하기</span>
            </button>
            {showModal && <StoryModal onClose={handleToggleModal} onSubmit={handleStorySubmit} />} {/* showModal 상태에 따라 EpicModal 컴포넌트를 렌더링합니다. */}
            <ShowStory storyInfo={storyInfo} /> {/* 입력된 에픽 정보를 ShowEpic 컴포넌트로 전달합니다. */}
        </div>
    );
}

export default CreateStoryButton;
