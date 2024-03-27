// EpicModal.js
import React, { useState } from 'react';
import '../../css/modal/EpicModal.css'; // 모달에 대한 CSS 파일

function Modal({ onClose, onSubmit }) {
    const [epicInfo, setEpicInfo] = useState({
        info1: '',
        info2: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEpicInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(epicInfo); // 입력된 값 전달
        onClose(); // 모달을 닫습니다.
    };

    const handleCloseModal = () => {
        onClose(); // onClose prop으로 전달된 함수를 호출하여 모달을 닫습니다.
    };

    return (
        <div className="modal-content">
            <div className="modal-header">
                <span className="close" onClick={handleCloseModal}>&times;</span>
                <h2>에픽 생성 모달창</h2>
            </div>
            <div className="modal-body">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="info1">에픽 이름: </label>
                        <input type="text" id="info1" name="info1" value={epicInfo.info1} onChange={handleChange} />
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

export default Modal;
