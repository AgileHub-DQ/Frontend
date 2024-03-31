import React, { useState } from 'react';
import '../../../css/BacklogPage/CreateStoryButton.css';
import StoryModal from '../modal/StoryModal.js';
import ShowStory from '../show/ShowStory.js';

function CreateStoryButton() {
    const [showModal, setShowModal] = useState(false);
    const [storyList, setStoryList] = useState([]);

    const handleToggleModal = () => {
        setShowModal(!showModal);
    };

    const handleStorySubmit = (newStoryInfo) => {
    // 새로운 스토리 정보를 스토리 목록에 추가
        setStoryList([...storyList, newStoryInfo]);
    // 모달을 닫기
        setShowModal(false);
    };

    return (
        <div className='addStory'>
            <button className="story_button" onClick={handleToggleModal}>
                <span className="story_button__text">스토리 생성하기</span>
            </button>
            {showModal && <StoryModal onClose={handleToggleModal} onSubmit={handleStorySubmit} />} 
            {storyList.map((storyInfo, index) => (
                <ShowStory key={index} storyInfo={storyInfo} />
            ))}
        </div>
    );
}

export default CreateStoryButton;
