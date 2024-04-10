import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/Issue.css';

function Issue() {
  const [issueTitle, setIssueTitle] = useState('');
  const [type, setType] = useState('EPIC');
  const [status, setStatus] = useState('DO');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(''); 
  const [imageURLInput, setImageURLInput] = useState(''); // 입력된 이미지 URL을 임시 저장할 상태
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [assigneeId, setAssigneeId] = useState('1');
  const [parentId, setParentId] = useState('1');
  const [projectKey, setProjectKey] = useState('');
  const navigate = useNavigate(); 

  const location = useLocation(); 

  const handleFileChange = (e) => {
    setFiles(e.target.files); 
  };

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
      const endpoint = `/api/projects/${projectKey}/issues`;
      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('떼잉~~ 실패!!', error);
    }
  };

  useEffect(() => {
    if (location.state && location.state.key) {
      setProjectKey(location.state.key); 
    }
  }, [location]);

  // const navigateToCheck = (projectKey) => { 
  //   navigate(`/CheckIssue`, { state: { key: projectKey } }); 
  // }

return (
<div className="container">
  <form onSubmit={handleSubmit}>
  <div className='form-row'>
    {/* <p className="form-label">이슈제목</p> */}
    <input
        type="text"
        className="form-input"
        placeholder="Issue Title"
        value={issueTitle}
        onChange={(e) => setIssueTitle(e.target.value)}
    />
        <select
      className="form-select"
      value={type}
      onChange={(e) => setType(e.target.value)}
    >
      <option value="EPIC">EPIC</option>
      <option value="STORY">STORY</option>
      <option value="TASK">TASK</option>
    </select>
</div>
<div className='form-row'>
    {/* <p className="form-label">이슈타입</p> */}

</div>
<div className='form-row'>
    <p className="form-label">이슈상태</p>
    <select
      className="form-select"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value="DO">DO</option>
      <option value="PROGRESS">PROGRESS</option>
      <option value="DONE">DONE</option>
    </select>
</div>
<div className='form-row'>
    <p className="form-label">내용</p>
    <textarea
      className="form-textarea"
      placeholder="Content Text"
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
    </div>
<div className='form-row'>
    <p className="form-label">이미지 파일</p>
    <input
      type="file"
      className="form-file"
      multiple 
      onChange={handleFileChange}
    />
</div>
<div className='form-row'>
    <p className="form-label">시작날짜</p>
    <input
      type="date"
      className="form-date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
    />
    </div>
<div className='form-row'>
    <p className="form-label">마감날짜</p>
    <input
      type="date"
      className="form-date"
      value={endDate}
      min={startDate}
      onChange={(e) => setEndDate(e.target.value)}
    />
</div>
    <button className="form-button" type="submit">이슈 생성</button>
  </form>
  {/* <button onClick={() => navigateToCheck(projectKey)}>이슈 전체 조회</button> */}
</div>
);
}

export default Issue;
