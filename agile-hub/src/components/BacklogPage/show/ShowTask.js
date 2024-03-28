// TaskStory.js
import React from 'react';

function TaskStory({ taskInfo }) {
    // epicInfo가 없거나 비어 있는 경우를 처리합니다.
    if (!taskInfo || !taskInfo.info1) {
        return (
            <div className='taskStory'>
                <p>태스크 정보를 불러올 수 없습니다.</p>
            </div>

        );
    }

    // 입력된 정보를 사용하여 작업을 수행합니다.
    return (
        <div className='taskStory'>
            <p>태스크 이름1: {taskInfo.info1}</p>
        </div>
    );
}

export default TaskStory;
