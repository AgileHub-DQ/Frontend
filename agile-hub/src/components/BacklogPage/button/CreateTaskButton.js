import React, { useState } from 'react';
import TaskModal from '../modal/TaskModal.js';
import ShowTask from '../show/ShowTask.js';

function CreateTaskButton() {
    const [showModal, setShowModal] = useState(false);
    const [taskInfo, setTaskInfo] = useState({
        info1: ''
    });

    const handleToggleModal = () => {
        setShowModal(!showModal);
    };

    const handleTaskSubmit = (taskInfo) => {
        setTaskInfo(taskInfo);
    };

    return (
        <div className='addTask'>
            <button className="button" onClick={handleToggleModal}>
                <span className="button__text">태스크 생성하기</span>
            </button>
            {showModal && <TaskModal onClose={handleToggleModal} onSubmit={handleTaskSubmit} />} {/* showModal 상태에 따라 EpicModal 컴포넌트를 렌더링합니다. */}
            <ShowTask taskInfo={taskInfo} /> {/* 입력된 에픽 정보를 ShowEpic 컴포넌트로 전달합니다. */}
        </div>
    );
}

export default CreateTaskButton;