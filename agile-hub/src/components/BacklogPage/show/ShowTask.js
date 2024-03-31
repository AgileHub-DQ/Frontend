// ShowTask.js
import React from 'react';

function ShowTask({ taskInfo }) {
    if (!taskInfo || !taskInfo.info1) {
        return (
            <div className='showTask'>
                <p>태스크 정보를 불러올 수 없습니다.</p>
            </div>

        );
    }

    return (
        <div className='showTask' style={{ border: '1px solid black', padding: '3px', margin: '5px 0'}}>
            <p>태스크: {taskInfo.info1}</p>
        </div>
    );
}

export default ShowTask;