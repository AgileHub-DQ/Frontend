import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Issue() {
  const [issueTitle, setIssueTitle] = useState('');
  const [type, setType] = useState('EPIC');
  const [status, setStatus] = useState('DO');
  const [contentText, setContentText] = useState('');
  const [imageURL, setImageURL] = useState(''); // 단일 이미지 URL 상태
  const [imageURLInput, setImageURLInput] = useState(''); // 입력된 이미지 URL을 임시 저장할 상태
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [assigneeId, setAssigneeId] = useState('1');
  const [parentId, setParentId] = useState('1');
  const [projectKey, setProjectKey] = useState('');

  const location = useLocation(); 

  // 이미지 URL 추가 핸들러
  const handleAddImageURL = (e) => {
    e.preventDefault(); // 폼 제출을 방지
    if (imageURLInput) {
      setImageURL([...imageURL, imageURLInput]); // 상태에 URL 추가
      setImageURLInput(''); // 입력 필드 초기화
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

      // 필수 필드 검증
    if (!issueTitle || !type || !status) {
        alert('이슈 제목, 이슈 타입, 이슈 상태는 필수로 입력해야 합니다.');
        return; 
    }

    const issueData = {
      title: issueTitle,
      type,
      status,
      content: {
        text: contentText,
        imageURLs: imageURL ? [imageURL] : []
      },
      startDate,
      endDate,
      assigneeId,
      parentId
    };

    try {
        const endpoint = `/api/projects/${projectKey}/issues`;
        const response = await axios.post(endpoint, issueData, {
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
      setProjectKey(location.state.key); // 넘겨받은 projectKey 값을 상태에 설정합니다.
    }
  }, [location]);

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
          value={contentText}
          onChange={(e) => setContentText(e.target.value)}
        />

        <p>이미지 URL</p>
        <input
          type="text"
          placeholder="Image URL"
          value={imageURLInput}
          onChange={(e) => setImageURLInput(e.target.value)}
        />
        <button onClick={handleAddImageURL}>이미지 추가</button>

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
    </div>
  );
}

export default Issue;
