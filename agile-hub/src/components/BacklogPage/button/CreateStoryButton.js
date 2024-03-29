import React, { useState } from 'react';
import StoryModal from '../modal/StoryModal.js';
import ShowStory from '../show/ShowStory.js';

function CreateStoryButton() {
    const [showModal, setShowModal] = useState(false);
    const [storyList, setStoryList] = useState([]);

    const handleToggleModal = () => {
        setShowModal(!showModal);
    };

    const handleStorySubmit = (newStoryInfo) => {
        setStoryList([...storyList, newStoryInfo]);
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
