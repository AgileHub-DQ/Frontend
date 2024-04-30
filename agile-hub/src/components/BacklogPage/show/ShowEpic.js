// ShowEpic.js
import React from 'react';
import '../../../css/BacklogPage/ShowEpic.css';
import CreateStoryButton from '../button/CreateStoryButton.js';

function ShowEpic({ epicInfo }) {
    // epicInfo가 없거나 비어 있는 경우를 처리합니다.
    console.log(epicInfo.title);
    if (!epicInfo || !epicInfo.info1) {
        return (
            <div className='showEpic'>
                <p>에픽 정보를 불러올 수 없습니다.</p>
            </div>

        );
    }

    return (
        <div className='showEpic' style={{ border: '1px solid black', padding: '10px' }}>
            <p>에픽: {epicInfo.info1}</p>
            <CreateStoryButton/>
        </div>
    );
}

export default ShowEpic;
