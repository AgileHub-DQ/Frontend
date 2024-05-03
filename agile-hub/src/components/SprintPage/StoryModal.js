import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../css/modal/Modal.css';


const Modal = ({ isVisible, details, onClose, projectKey, onEdit  }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const issueId = details.result.issue.issueId || '';
  console.log(issueId);
  const [imageURL, setImageURL] = useState('');
  useEffect(() => {
    if (details.result.issue.content.imagesURLs && details.result.issue.content.imagesURLs.length > 0) {
      setImageURL(details.result.issue.content.imagesURLs[0]);
    }
  }, [details]);

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [issueTitle, setIssueTitle] = useState(details.result.issue.title);
  const type = details.result.issue.type;
  const [status, setStatus] = useState(details.result.issue.status);
  const [content, setContent]= useState(details.result.issue.content.text || '');
  const [files, setFiles] = useState('');
  const [imageURLInput, setImageURLInput] = useState('');
  const [startDate, setStartDate] = useState(details.result.issue.startDate || '');
  const [endDate, setEndDate] = useState(details.result.issue.endDate || '');
  const [assigneeId, setAssigneeId] = useState('1');
  const [parentId, setParentId] = useState(details.result.parentIssue ? details.result.parentIssue.issueId || 1 : 1);


  const [color, setColor] = useState(() => {
    switch (details.result.issue.type) {
      case 'TASK':
        return '#FB55B3';
      case 'STORY':
        return '#00FF75';
    }
  });

  const [epicList, setEpicList] = useState([]);
  const [storyList, setStoryList] = useState([]);


  const handleFileChange = (e) => {
    setFiles(e.target.files);
    setImageURL(''); 
  };

  const handleDelete = async () => { // 이슈 삭제
    try {
      const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTQyODMzNTYsImV4cCI6MTcxNTQ5Mjk1Nn0.PGInkoWYOAY_GsY_vO462E0dOcn-yHvlqPaa6P4SSttUtj7fW48q9DvkjSuT1I-VUxmZ04knuVK6JIZffVzyXg';
      const endpoint = `/projects/${projectKey}/issues/${issueId}`;
      await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      alert('삭제되었습니다.');
      onEdit();
      onClose();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const handleEditSubmit = async (e) => {
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
      const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTQyODMzNTYsImV4cCI6MTcxNTQ5Mjk1Nn0.PGInkoWYOAY_GsY_vO462E0dOcn-yHvlqPaa6P4SSttUtj7fW48q9DvkjSuT1I-VUxmZ04knuVK6JIZffVzyXg';
      const endpoint = `/projects/${projectKey}/issues/${issueId}`;
      const response = await axios.put(endpoint, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setIssueTitle('');
      setStatus('');
      setContent('');
      setFiles('');
      setStartDate('');
      setEndDate('');
      setAssigneeId('');
      setParentId('');
      setIsModalOpen(false);
      alert("수정되었습니다.");
      onEdit();
      onClose();
    } catch (error) {
      console.error('Failed to edit:', error);
    }
  };

  const fetchIssues = async () => {
    try {
      const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTQyODMzNTYsImV4cCI6MTcxNTQ5Mjk1Nn0.PGInkoWYOAY_GsY_vO462E0dOcn-yHvlqPaa6P4SSttUtj7fW48q9DvkjSuT1I-VUxmZ04knuVK6JIZffVzyXg';
      const epicResponse = await axios.get(`/projects/${projectKey}/epics`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      const storyResponse = await axios.get(`/projects/${projectKey}/stories`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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

  const handleAddComment = () => {
    navigate('/issueComment', { state: { projectKey: projectKey, issueId: issueId } });
  };

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
            <div className='box1'>계획</div>
            <div className='box2'>디자인</div>
            <div className='box3'>개발</div>
            <div className='box4'>테스트</div>
            <div className='box5'>피드백</div>
          </div>
          <div className='form-row-4'>
            <p className="form-label">타입</p>
            <select
              className="form-select-type"
              defaultValue={type}
            >
              <option value={type}>{type}</option>
            </select>
          </div>
          <div className='form-row-10'>
            <p className="form-label">상위 항목</p>
            <select className="form-select-type" value={parentId} onChange={(e) => setParentId(e.target.value)}>
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
                <img src={imageURL} alt="Uploaded Image" />
              )}
            </div>
          </div>
          <div className='form-row-5'>
          <p className='form-label'>하위 이슈 목록</p>
          <ul>
          {details.result.childIssues.map((childIssue, index) => (
  <li key={index}>{childIssue.title}</li>
))}
  </ul>
          </div>
          <button onClick={onClose}>닫기</button>
          <button onClick={handleEditSubmit}>수정하기</button>
          <button onClick={handleDelete}>삭제하기</button>
          <button onClick={handleAddComment}>댓글 달기</button>
          <p className='form-label'>담당자: {details.result.issue.assignee.name}</p>
        </div>
      </form>
    </div>
  );
};

export default Modal;