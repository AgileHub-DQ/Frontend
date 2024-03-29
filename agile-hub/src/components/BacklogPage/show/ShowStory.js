// ShowStory.js
import React from 'react';
import CreateTaskButton from '../button/CreateTaskButton.js';

function ShowStory({ storyInfo }) {
    // epicInfo가 없거나 비어 있는 경우를 처리합니다.
    if (!storyInfo || !storyInfo.info1) {
        return (
            <div className='showStory'>
                {/* <p>스토리 정보를 불러올 수 없습니다.</p> */}
            </div>

        );
    }

    // 입력된 정보를 사용하여 작업을 수행합니다.
    return (
        <div className='showStory' style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ marginRight: '10px' }}>스토리 이름1: {storyInfo.info1}</p>
            <CreateTaskButton />
            {/* 원하는 추가적인 UI 요소나 기능을 여기에 추가하세요 */}
        </div>
    );
}

export default ShowStory;
