// StoryModal.js
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
        onSubmit(taskInfo); // 입력된 값 전달
        onClose(); // 모달을 닫습니다.
    };

    const handleCloseModal = () => {
        onClose(); // onClose prop으로 전달된 함수를 호출하여 모달을 닫습니다.
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
