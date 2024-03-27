// ShowStory.js
import React from 'react';
//import AddStory from './AddStory.js';

function ShowStory({ storyinfo }) {
    // epicInfo가 없거나 비어 있는 경우를 처리합니다.
    if (!storyinfo || !storyinfo.info1) {
        return (
            <div className='showEpic'>
                <p>에픽 정보를 불러올 수 없습니다.</p>
            </div>

        );
    }

    // 입력된 정보를 사용하여 작업을 수행합니다.
    return (
        <div>
            <p>스토리 이름1: {storyinfo.info1}</p>
            {/* 원하는 추가적인 UI 요소나 기능을 여기에 추가하세요 */}
        </div>
    );
}

export default ShowStory;
