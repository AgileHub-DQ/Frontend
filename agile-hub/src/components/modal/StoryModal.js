// StoryModal.js
import React, { useState } from 'react';
import ShowStory from '../BacklogPage/ShowStory.js';

function StoryModal({ onClose, onSubmit }) {
    const [storyInfo, setStoryInfo] = useState({
        info1: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStoryInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(storyInfo); // 입력된 값 전달
        onClose(); // 모달을 닫습니다.
    };

    const handleCloseModal = () => {
        onClose(); // onClose prop으로 전달된 함수를 호출하여 모달을 닫습니다.
    };

    return (
        <div className="modal-content">
            <div className="modal-header">
                <span className="close" onClick={handleCloseModal}>&times;</span>
                <h2>스토리 생성 모달창</h2>
            </div>
            <div className="modal-body">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="info1">스토리 이름: </label>
                        <input type="text" id="info1" name="info1" value={storyInfo.info1} onChange={handleChange} />
                    </div>
                    <button type="submit">완료</button>
                </form>
            </div>
            <div className="modal-footer">
                <h3>footer</h3>
            </div>
        </div>
    );
}

export default StoryModal;
