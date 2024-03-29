// TaskModal.js
import React, { useState } from 'react';

function TaskModal({ onClose, onSubmit }) {
    const [taskInfo, setTaskInfo] = useState({
        info1: '',
        info2: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(taskInfo); 
        onClose(); 
    };

    const handleCloseModal = () => {
        onClose(); 
    };

    return (
        <div>
            <div>
                <span onClick={handleCloseModal}>&times;</span>
                <h2>태스크 생성 모달창</h2>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="info1">태스크 이름: </label>
                        <input type="text" id="info1" name="info1" value={taskInfo.info1} onChange={handleChange} />
                    </div>
                    <button type="submit">완료</button>
                </form>
            </div>
            <div>
                <h3>footer</h3>
            </div>
        </div>
    );
}

export default TaskModal;