import React, { useState } from 'react';
import TaskModal from '../modal/TaskModal.js';
import ShowTask from '../show/ShowTask.js';

function CreateTaskButton() {
    const [showModal, setShowModal] = useState(false);
    const [taskList, setTaskList] = useState([]);

    const handleToggleModal = () => {
        setShowModal(!showModal); // showModal 상태를 토글합니다.
    };

    const handleTaskSubmit = (newTaskInfo) => {
        // 새로운 태스크 정보를 태스크 목록에 추가합니다.
        setTaskList([...taskList, newTaskInfo]);
        // 모달을 닫습니다.
        setShowModal(false);
    };

    return (
        <div className='addTask'>
            <button className="button" onClick={handleToggleModal}>
                <span className="button__text">태스크 생성하기</span>
            </button>
            {showModal && <TaskModal onClose={handleToggleModal} onSubmit={handleTaskSubmit} />} {/* showModal 상태에 따라 TaskModal 컴포넌트를 렌더링합니다. */}
            {/* 저장된 태스크 목록을 모두 ShowTask 컴포넌트로 전달합니다. */}
            {taskList.map((taskInfo, index) => (
                <ShowTask key={index} taskInfo={taskInfo} />
            ))}
        </div>
    );
}

export default CreateTaskButton;
