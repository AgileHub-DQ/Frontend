import React, { useState } from 'react';
import axios from 'axios';
// import { useLocation, useNavigate } from 'react-router-dom';
import '../css/Issue.css';

function Issue({projectKey, sprintId, onIssuesUpdated}) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [issueTitle, setIssueTitle] = useState('');
  const [type, setType] = useState('STORY'); // 상위에픽이 무엇인지에 대한 코드로 수정되어야 함
  const [status, setStatus] = useState('DO');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(''); 
  const [imageURLInput, setImageURLInput] = useState(''); // 입력된 이미지 URL을 임시 저장할 상태
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [assigneeId, setAssigneeId] = useState('1');
  const [parentId, setParentId] = useState('1');
  const [color, setColor] = useState('#00FF75'); // 초기 색상

  const handleFileChange = (e) => {
    setFiles(e.target.files); 
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
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', issueTitle);
    formData.append('type', type); // 상위에픽이 무엇인지에 대한 코드로 수정되어야 함
    formData.append('status', status);
    formData.append('content', content);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('assigneeId', assigneeId);
    formData.append('parentId', parentId);
    formData.append('sprintId',sprintId);

    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }

    try {
      const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTQyODMzNTYsImV4cCI6MTcxNTQ5Mjk1Nn0.PGInkoWYOAY_GsY_vO462E0dOcn-yHvlqPaa6P4SSttUtj7fW48q9DvkjSuT1I-VUxmZ04knuVK6JIZffVzyXg';
      const endpoint = `/projects/${projectKey}/issues`;
      console.log("endpoint:"+endpoint);
      const response = await axios.post(endpoint, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });


      console.log(response.data);
      setIssueTitle('');
      setType('STORY');
      setStatus('DO');
      setContent('');
      setFiles('');
      setStartDate('');
      setEndDate('');
      setAssigneeId('2');
      setParentId('1');
      setIsModalOpen(false); 
      onIssuesUpdated();
      // 폼 입력을 마치면 폼은 초기화 되고 폼은 닫힘
    
    } catch (error) {
      console.error('떼잉~~ 실패!!', error);
      console.log(error.response)
    }
  };

return (
  isModalOpen && (
<div className="modalContainer">
  <form className="form" onSubmit={handleSubmit}>
  <div className='form-row'>
    <div className='colorBox' style={{backgroundColor: color}}></div>
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
    <div className='box1'>계획</div>
    <div className='box2'>디자인</div>
    <div className='box3'>개발</div>
    <div className='box4'>테스트</div>
    <div className='box5'>피드백</div>
</div>
<div className='form-row-4'>
    <p className="form-label">타입</p>
    {/* 에픽 목록 보여주는 코드로 변경되어야함 */}
    <select
      className="form-select-type"
      value={type}
      onChange={handleTypeChange}
    >
      <option value="STORY">STORY</option>
      <option value="TASK">TASK</option>
    </select>
</div>
<div className='form-row-10'>
    <p className="form-label">상위 항목</p>
    <select
      className="form-select-type">
      {/* 여기에 에픽 목록 출력 */}
      <option>EPIC1</option>
      <option>EPIC2</option>
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
    {/* 파일 삭제 코드 있어야 함 */}
</div>
<div className='form-row-6'>
  <button className='addUnderIssue'>하위 이슈 추가</button>
</div>
  <div className='form-row-7'>
    <button className="form-button" type="submit">이슈 생성</button>
  </div> 
  </form>
</div>
)
);
}

export default Issue;
