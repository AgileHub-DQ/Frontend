import React, { useState } from 'react';
import '../../../css/BacklogPage/CreateTaskButton.css';
import TaskModal from '../modal/TaskModal.js';
import ShowTask from '../show/ShowTask.js';

function CreateTaskButton({projectKey}) {
    const [showModal, setShowModal] = useState(false);
    const [taskList, setTaskList] = useState([]);

    const handleToggleModal = () => {
        setShowModal(!showModal);
    };

    const handleTaskSubmit = (newTaskInfo) => {
        // 새로운 태스크 정보를 태스크 목록에 추가
        setTaskList([...taskList, newTaskInfo]);
        // 모달을 닫기
        setShowModal(false);
    };

    return (
        <div className='addTask'>
            {showModal && <TaskModal onClose={handleToggleModal} onSubmit={handleTaskSubmit} projectKey={projectKey}/>}
            {taskList.map((taskData, index) => (
                <ShowTask key={index} taskData={taskData} projectKey={projectKey} />
            ))}
            <div className='task_button_container'>
                <button className="task_button" onClick={handleToggleModal}>
                    <span className="task_button__text">태스크 생성하기</span>
                </button>
            </div>
        </div>
    );
}

export default CreateTaskButton;
