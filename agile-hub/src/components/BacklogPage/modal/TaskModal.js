import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext.js';

function TaskModal({ onClose, onSubmit, projectKey }) {
    const { authToken } = useAuth();
    const [issueTitle, setIssueTitle] = useState('');
    const [type, setType] = useState('TASK');
    const [status, setStatus] = useState('DO');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [assigneeId, setAssigneeId] = useState('');

    useEffect(() => {
        const savedLoginId = localStorage.getItem('loginId');
        if (savedLoginId) {
            setAssigneeId(savedLoginId);
        }
    }, []);

    const [parentId, setParentId] = useState('');
    const [color, setColor] = useState('#FB55B3');
    const [storyList, setStoryList] = useState([]);
    const [label, setLabel] = useState(''); // label

    const handleBoxClick = (selectedLabel) => {
        setLabel(selectedLabel); // 선택된 라벨 상태 업데이트
    };

    const getBoxStyle = (boxLabel) => ({
        cursor: 'pointer',
        padding: '3px',
        borderRadius: '5px',
        border: label === boxLabel ? '2px solid blue' : 'none'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', issueTitle);
        formData.append('type', type);
        formData.append('status', status);
        formData.append('content', content);
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);
        formData.append('assigneeId', assigneeId);
        formData.append('parentId', parentId);

        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }
        }

        try {
            const endpoint = `https://api.agilehub.store/projects/${projectKey}/issues`;
            console.log("endpoint:" + endpoint);
            const response = await axios.post(endpoint, formData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            onSubmit(response.data); // 입력된 값 전달
            onClose(); // 모달 닫기
        } catch (error) {
            console.error('task modal error!!', error);
            console.log(error.response);
        }
    };

    const handleTypeChange = (e) => {
        const selectedType = e.target.value;
        setType(selectedType);
        // 선택한 값에 따라 색상 변경
        switch (selectedType) {
            case 'EPIC':
                setColor('#FF7041');
                break;
            case 'STORY':
                setColor('#00FF75');
                break;
            case 'TASK':
                setColor('#FB55B3');
                break;
            default:
                setColor('#95ADF6');
        }
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleCloseModal = () => {
        onClose(); // onClose prop으로 전달된 함수를 호출하여 모달 닫기
    };

    console.log("TaskModal: " + projectKey);

    const fetchIssues = async () => { // 스토리 목록 출력하기 위한 코드
        try {
            const response = await axios.get(`https://api.agilehub.store/projects/${projectKey}/stories`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });
            setStoryList(response.data.result);
        } catch (error) {
            console.error('API request failed:', error);
        }
    };

    useEffect(() => {
        fetchIssues();
    }, []);

    return (
        <div className="modal-content">
            <div className="modal-header">
                <span className="close" onClick={handleCloseModal}>&times;</span>
            </div>
            <div className="modal-body">
                <form onSubmit={handleSubmit}>
                    <div className='form-row'>
                        <div className='colorBox' style={{ backgroundColor: color }}></div>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Issue Title"
                            value={issueTitle}
                            onChange={(e) => setIssueTitle(e.target.value)}
                        />
                        <select
                            className="form-select-status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="DO">DO</option>
                            <option value="PROGRESS">PROGRESS</option>
                            <option value="DONE">DONE</option>
                        </select>
                    </div>
                    <div className='form-row-2'>
                        <p className="form-label">기간</p>
                        <input
                            type="date"
                            className="form-date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <p>~</p>
                        <input
                            type="date"
                            className="form-date"
                            value={endDate}
                            min={startDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <p className="form-label-tag">단계</p>
                    <div className='form-row-3'>
                        <div className="box1" style={getBoxStyle('PLAN')} onClick={() => handleBoxClick('PLAN')}>계획</div>
                        <div className="box2" style={getBoxStyle('DESIGN')} onClick={() => handleBoxClick('DESIGN')}>디자인</div>
                        <div className="box3" style={getBoxStyle('DEVELOP')} onClick={() => handleBoxClick('DEVELOP')}>개발</div>
                        <div className="box4" style={getBoxStyle('TEST')} onClick={() => handleBoxClick('TEST')}>테스트</div>
                        <div className="box5" style={getBoxStyle('FEEDBACK')} onClick={() => handleBoxClick('FEEDBACK')}>피드백</div>
                    </div>
                    <div className='form-row-4'>
                        <p className="form-label">타입</p>
                        <select
                            className="form-select-type"
                            value={type}
                            onChange={handleTypeChange}
                        >
                            <option value="TASK">TASK</option>
                        </select>
                    </div>
                    <div className='form-row-10'>
                        <p className="form-label">상위 항목</p>
                        <select
                            className="form-select-type"
                            value={parentId}
                            onChange={(e) => setParentId(e.target.value)}
                        >
                            {Array.isArray(storyList) && storyList.map(story => (
                                <option key={story.id} value={story.id}>{story.title}</option>
                            ))}
                        </select>
                    </div>
                    <p className="form-label-d">설명</p>
                    <textarea
                        className="form-textarea"
                        placeholder="설명 입력"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <div className='form-row-5'>
                        <p className="form-label">이미지 파일</p>
                        <input
                            type="file"
                            className="form-file"
                            multiple
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className='form-row-7'>
                        <button className="createIssueButton" type="submit">이슈 생성</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TaskModal;
