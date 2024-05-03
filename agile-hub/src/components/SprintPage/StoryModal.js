import React, { useState,useEffect } from 'react';
import axios from 'axios';
import '../../css/modal/Modal.css'; 
import ShowImage from './ShowImage';

const Modal = ({ isVisible, details, onClose, projectKey }) => {
  console.log(details.result.issue.content);
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    if (details.result.issue.content.imagesURLs && details.result.issue.content.imagesURLs.length > 0) {
      setImageURL(details.result.issue.content.imagesURLs[0]);
      // console.log("imageURL:", details.result.issue.content.imagesURLs[0]);
      // console.log("imageURL2:", imageURL);
    }
  }, [details]);

  // console.log(details);
  const issueId = details.result.issue.issueId;
  console.log("클릭한 아이디는: "+issueId);

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [issueTitle, setIssueTitle] = useState(details.result.issue.title);
  const [type, setType] = useState(details.result.issue.type); // 상위에픽이 무엇인지에 대한 코드로 수정되어야 함
  const [status, setStatus] = useState(details.result.issue.status);
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(''); 
  const [imageURLInput, setImageURLInput] = useState(''); 
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [parentId, setParentId] = useState(details.result.parentIssue.issueId ? details.result.parentIssue.issueId : null);

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


  const handleEditSubmit = async (e) => {
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
    // formData.append('sprintId',sprintId);

    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }

    try {
      const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTQyODMzNTYsImV4cCI6MTcxNTQ5Mjk1Nn0.PGInkoWYOAY_GsY_vO462E0dOcn-yHvlqPaa6P4SSttUtj7fW48q9DvkjSuT1I-VUxmZ04knuVK6JIZffVzyXg';
      const endpoint = `/projects/${projectKey}/issues/${issueId}`;
      // console.log("endpoint:"+endpoint);
      const response = await axios.put(endpoint, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      // console.log(response.data);
      setIssueTitle('');
      setType('');
      setStatus('');
      setContent('');
      setFiles('');
      setStartDate('');
      setEndDate('');
      setAssigneeId('');
      setParentId('');
      setIsModalOpen(false); 
      onClose();
      // 폼 입력을 마치면 폼은 초기화 되고 폼은 닫힘
    
    } catch (error) {
      console.error('떼잉~~ 실패!!', error);
      console.log(error.response)
    }
  };

  const fetchIssues = async () => {
    try {
      const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTQyODMzNTYsImV4cCI6MTcxNTQ5Mjk1Nn0.PGInkoWYOAY_GsY_vO462E0dOcn-yHvlqPaa6P4SSttUtj7fW48q9DvkjSuT1I-VUxmZ04knuVK6JIZffVzyXg';  // 액세스 토큰
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
      
      // console.log("epicList: ", epicResponse.data.result);
      // console.log("storyList: ", storyResponse.data.result);
    } catch (error) {
      console.error('API request failed:', error);
    }
  };
  
  useEffect(() => {
    fetchIssues();
  }, []);


  if (!isVisible) return null;




  return(
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
  
    <select className='form-select-status' defaultValue={details.result.issue.status}>
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
      value={details.result.issue.startDate}
      onChange={(e) => setStartDate(e.target.value)}
    />
    <p>~</p>
    <input
      type="date"
      className="form-date"
      value={details.result.issue.endDate}
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
      defaultValue={details.result.issue.content.text}
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


{imageURL && (
  <button onClick={ShowImage}>show image</button>
)}

{/* 
    {imageURL && (
          <div className="image-container">
            <button onClick={showImage}>show image </button>
            <img src={imageURL} alt="Uploaded File" />
          </div>
        )} */}
    {/* 파일 삭제 코드 있어야 함 */}
</div>

    <div>{details.result.issue.assignee.name}</div>
    <div>...</div>


    <button onClick={onClose}>닫기</button>
    <button onClick={handleEditSubmit}>수정하기</button>
</div>
</form>
</div>
  )
};


export default Modal;
