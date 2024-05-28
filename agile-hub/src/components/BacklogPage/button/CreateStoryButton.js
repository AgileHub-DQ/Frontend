import React, { useState } from 'react';
import '../../../css/BacklogPage/CreateStoryButton.css';
import StoryModal from '../modal/StoryModal.js';
import ShowStory from '../show/ShowStory.js';

function CreateStoryButton({projectKey}) {
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
            {showModal && <StoryModal onClose={handleToggleModal} onSubmit={handleStorySubmit} projectKey={projectKey} />} 
            {storyList.map((storyData, index) => (
                <ShowStory key={index} storyData={storyData} projectKey={projectKey}/>
            ))}
            <div className='story_button_container'>
                <button className="story_button" onClick={handleToggleModal}>
                    <span className="story_button__text">스토리 생성하기</span>
                </button>
            </div>
        </div>
    );
}


export default CreateStoryButton;