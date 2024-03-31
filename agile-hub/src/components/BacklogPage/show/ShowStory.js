// ShowStory.js
import React from 'react';
import CreateTaskButton from '../button/CreateTaskButton.js';

function ShowStory({ storyInfo }) {
    if (!storyInfo || !storyInfo.info1) {
        return (
            <div className='showStory'>
                <p>스토리 정보를 불러올 수 없습니다.</p>
            </div>

        );
    }

    return (
        <div className='showStory' style={{ border: '1px solid black', padding: '10px' }}>
            <p>스토리: {storyInfo.info1}</p>
            <div>
                <CreateTaskButton />
            </div>
        </div>
    );
    
}

export default ShowStory;
