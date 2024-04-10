import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

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
        <p>이슈제목</p>
        <input
          type="text"
          placeholder="Issue Title"
          value={issueTitle}
          onChange={(e) => setIssueTitle(e.target.value)}
        />

        <p>이슈타입</p>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="EPIC">EPIC</option>
          <option value="STORY">STORY</option>
          <option value="TASK">TASK</option>
        </select>

        <p>이슈상태</p>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="DO">DO</option>
          <option value="PROGRESS">PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>

        <p>내용</p>
        <textarea
          placeholder="Content Text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <p>이미지 파일</p>
        <input
          type="file"
          multiple 
          onChange={handleFileChange}
        />

        <p>시작날짜</p>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <p>마감날짜</p>
        <input
          type="date"
          value={endDate}
          min={startDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <p/>
        <button type="submit">이슈 생성</button>
      </form>
      {/* <button onClick={() => navigateToCheck(projectKey)}>이슈 전체 조회</button> */}
    </div>
  );
}

export default Issue;
