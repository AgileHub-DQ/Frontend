import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../css/modal/Modal.css';
import { useAuth } from '../../context/AuthContext.js';

const Modal = ({ isVisible, details, onClose, projectKey, onEdit }) => {
  const { authToken } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const issueId = details.result.issue.issueId || '';
  console.log(issueId);

  const [imageURL, setImageURL] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [issueTitle, setIssueTitle] = useState(details.result.issue.title);
  const type = details.result.issue.type;
  const [status, setStatus] = useState(details.result.issue.status);
  const [content, setContent]= useState(details.result.issue.content.text || '');
  const [files, setFiles] = useState('');
  const [startDate, setStartDate] = useState(details.result.issue.startDate || '');
  const [endDate, setEndDate] = useState(details.result.issue.endDate || '');

  const [assigneeId, setAssigneeId] = useState(''); // 5 image error 

  useEffect(() => {
    const savedLoginId = localStorage.getItem('loginId');
    if (savedLoginId) {
      setAssigneeId(savedLoginId);
    }
  }, []);
  
  const [parentId, setParentId] = useState(details.result.parentIssue ? details.result.parentIssue.issueId || 1 : 1);
  const [epicList, setEpicList] = useState([]);
  const [storyList, setStoryList] = useState([]);
  const [label, setLabel] = useState(details.result.issue.label || ''); // label

  const handleBoxClick = (selectedLabel) => {
    setLabel(selectedLabel); // 선택된 라벨 상태 업데이트
  };

  const [color, setColor] = useState(() => { // 타입에 맞게 색상 변경
    switch (details.result.issue.type) {
      case 'TASK':
        return '#FB55B3';
      case 'STORY':
        return '#00FF75';
    }
  });

  const getBoxStyle = (boxLabel) => ({
    cursor: 'pointer',
    padding: '3px',
    borderRadius: '5px',
    border: label === boxLabel ? '2px solid blue' : 'none' 
  });


  useEffect(() => {
    if (details.result.issue.content.imagesURLs && details.result.issue.content.imagesURLs.length > 0) {
      setImageURL(details.result.issue.content.imagesURLs[0]);
    }
  }, [details]);



  

  const handleFileChange = (e) => { // 단일 파일
    setFiles(e.target.files);
  };

  const handleDelete = async () => { // 이슈 삭제
    try {
      //const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyjvOybkO2drCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTc4MDQ1MjUiLCJpYXQiOjE3MTU1MjM2MjcsImV4cCI6MTcxNjczMzIyN30.7W2ZV5RmSGhf_GjV-xTeYtC7ZPF-QcIpIj5QksTTfxXt8U5NdpWM-WejbW6Exl8u-qU2jGrotz0oTtty51etYw';
      const endpoint = `https://api.agilehub.store/projects/${projectKey}/issues/${issueId}`;
      await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      alert('삭제되었습니다.');
      onEdit();
      onClose();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const handleEditSubmit = async (e) => { // 이슈 수정
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
    formData.append('label', label);

    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }

    try {
      //const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyjvOybkO2drCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTc4MDQ1MjUiLCJpYXQiOjE3MTU1MjM2MjcsImV4cCI6MTcxNjczMzIyN30.7W2ZV5RmSGhf_GjV-xTeYtC7ZPF-QcIpIj5QksTTfxXt8U5NdpWM-WejbW6Exl8u-qU2jGrotz0oTtty51etYw';
      const endpoint = `https://api.agilehub.store/projects/${projectKey}/issues/${issueId}`;
      const response = await axios.put(endpoint, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setIsModalOpen(false);
      alert("수정되었습니다.");
      onEdit();
      onClose();
    } catch (error) {
      console.error('Failed to edit:', error);
    }
  };

  const fetchIssues = async () => { // 상위항목 -> 에픽, 스토리 목록 출력
    try {
      //const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyjvOybkO2drCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTc4MDQ1MjUiLCJpYXQiOjE3MTU1MjM2MjcsImV4cCI6MTcxNjczMzIyN30.7W2ZV5RmSGhf_GjV-xTeYtC7ZPF-QcIpIj5QksTTfxXt8U5NdpWM-WejbW6Exl8u-qU2jGrotz0oTtty51etYw';
      const epicResponse = await axios.get(`https://api.agilehub.store/projects/${projectKey}/epics`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      const storyResponse = await axios.get(`https://api.agilehub.store/projects/${projectKey}/stories`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      setEpicList(epicResponse.data.result);
      setStoryList(storyResponse.data.result);
    } catch (error) {
      console.error('API request failed:', error);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  if (!isVisible) return null;

  const handleAddComment = () => { // 댓글
    navigate('/issueComment', { state: { projectKey: projectKey, issueId: issueId } });
  };

  const progressIssue = () => {
    if(!details || details.result.childIssues.length === 0) return null;
    const totalIssues = details.result.childIssues.length; // 하위 이슈 개수
    const completedIssues = details.result.childIssues.filter(issue => issue.status === "DONE").length; // done 이슈 개수
    return Math.floor((completedIssues / totalIssues) * 100); // 정수형으로 반환
  }

  const donePercentage = progressIssue();

  return (
    <div className="modalContainer">
      <form className="form" onSubmit={handleEditSubmit}>
        <div className='폼로우'>
          <div className='form-row'>
            <div className='colorBox' style={{backgroundColor: color}}/>
            <input
              type="text"
              className="form-input"
              placeholder="Issue Title"
              value={issueTitle}
              onChange={(e) => setIssueTitle(e.target.value)}
            />
            <select
              className='form-select-status'
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
              defaultValue={type}
            >
              <option value={type}>{type}</option>
            </select>
            <p className="form-label">상위 항목</p>
            <select className="form-select-type2" value={parentId} onChange={(e) => setParentId(e.target.value)}>
              {type === 'STORY' ? (
                epicList.map(epic => (
                  <option key={epic.id} value={epic.id}>{epic.title}</option>
                ))
              ) : (
                storyList.map(story => (
                  <option key={story.id} value={story.id}>{story.title}</option>
                ))
              )}
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
            <div className='imageContainer'>
              {imageURL && (
                <img src={imageURL}/>
              )}
            </div>
          </div>
          <p className='form-label-2'>하위 이슈 목록</p>
            {details.result.childIssues.length > 0 && ( 
              <div style={{ width: '90%', margin: '0 auto', backgroundColor: '#D9D9D9', borderRadius: '10px' }}>
                <div style={{
                    width: `${donePercentage}%`,
                    height: '13px',
                    backgroundColor: '#20845A',
                    borderRadius: '10px',
                    textAlign: 'center',
                    color: 'white',
                    lineHeight: '13px',
                    marginBottom: '5px',
                  }}>
                  <div className='donePercentage'>{donePercentage}% 완료</div>
                </div>
              </div>
            )}
            <div className="scrollContainer">
              {details.result.childIssues.map((childIssue, index) => (
                <div key={index} className="issueItem">
                  <div className="issueContent">
                      <span className="issueKey">{childIssue.key}</span>
                      <span className="issueTitle">{childIssue.title}</span>
                    <div className="issueStatus" style={childIssue.status === 'DONE' ? { backgroundColor: 'green', color: 'white', borderRadius: '10px'} : {}}>
                      {childIssue.status === 'DONE' ? "완료됨" : childIssue.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='allButton'>
          <button className="editButton" onClick={handleEditSubmit}>수정하기</button>
          <button className="deleteButton"onClick={handleDelete}>삭제하기</button>
          <button className="commentButton"onClick={handleAddComment}>댓글 달기</button>
          <button className="closeButton"onClick={onClose}>닫기</button>
          </div>
          <p className='form-label-assignee'>담당자: {details.result.issue.assignee.name}</p>
        </div>
      </form>
    </div>
  );
};

export default Modal;






