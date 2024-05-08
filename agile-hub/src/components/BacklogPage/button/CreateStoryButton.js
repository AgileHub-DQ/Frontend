import React, { useState } from 'react';
import '../../../css/BacklogPage/CreateStoryButton.css';
import StoryModal from '../modal/StoryModal.js';
import ShowStory from '../show/ShowStory.js';

function CreateStoryButton({projectKey}) {
    const [showModal, setShowModal] = useState(false);
    const [storyList, setStoryList] = useState([]);

    console.log("CreateStoryButton: "+projectKey);
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
            {showModal && <StoryModal onClose={handleToggleModal} onSubmit={handleStorySubmit} projectKey={projectKey} />} 
            {storyList.map((storyData, index) => (
                <ShowStory key={index} storyData={storyData} projectKey={projectKey} />
            ))}
            <div className='story_button_container'>
                <button className="story_button" onClick={handleToggleModal}>
                    <span className="story_button__text">스토리 생성하기</span>
                </button>
            </div>
        </div>
    );
}
            {/* {storyList.map((storyInfo, index) => (
                <ShowStory key={index} storyInfo={storyInfo} />
            ))}
            <div className='story_button_container'>
                <button className="story_button" onClick={handleToggleModal}>
                    <span className="story_button__text">스토리 생성하기</span>
                </button>
            </div> */}
//         </div>
//     );
// }

export default CreateStoryButton;