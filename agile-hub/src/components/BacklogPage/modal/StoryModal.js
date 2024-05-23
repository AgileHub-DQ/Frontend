// StoryModal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StoryModal({ onClose, onSubmit, projectKey }) {
    const [response, setResponse] = useState(null);
    const [issueTitle, setIssueTitle] = useState('');
    const [type, setType] = useState('STORY'); 
    const [status, setStatus] = useState('DO');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState(''); 
    const [imageURLInput, setImageURLInput] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [assigneeId, setAssigneeId] = useState('1');
    const [parentId, setParentId] = useState('');
    console.log(parentId);
    const [color, setColor] = useState('#00FF75'); 
    const [epicList, setEpicList] = useState([]);
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
        formData.append('label', label);
        // formData.append('sprintId',sprintId);

        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
              formData.append('files', files[i]);
            }
          }
        
          try {
            const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTU1NzM5OTcsImV4cCI6MTcxNjc4MzU5N30.1PRhxReTmFd2UV4CI5tCrDCNq7Re2p9PNslzwfwy0d8ZZbpuxOuKd1FTwjoTkRIwtYmL2V1gzxaDhchatjKhzA';
            const endpoint = `/projects/${projectKey}/issues`;
            console.log("endpoint:"+endpoint);
            const response = await axios.post(endpoint, formData, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data'
              }
            });

        console.log(response.data);
        onSubmit(response.data); 
        onClose();
    }catch (error) {
        console.error('story modal error!!', error);
        console.log(error.response)
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
        onClose(); 
    };

    console.log("StoryModal: "+projectKey);

    const fetchIssues = async () => { //에픽 목록 출력하기 위한 코드
        try {
          const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTU1NzM5OTcsImV4cCI6MTcxNjc4MzU5N30.1PRhxReTmFd2UV4CI5tCrDCNq7Re2p9PNslzwfwy0d8ZZbpuxOuKd1FTwjoTkRIwtYmL2V1gzxaDhchatjKhzA';  // 액세스 토큰
          const response = await axios.get(`/projects/${projectKey}/epics`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          });
          setEpicList(response.data.result); 
          
          console.log("epicList: "+epicList);
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
                    {/* <div>
                        <label htmlFor="info1">에픽 이름: </label>
                        <input type="text" id="info1" name="info1" value={epicInfo.info1} onChange={handleChange} />
                    </div> */}
                    
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
       <option value="STORY">STORY</option>
       {/* <option value="TASK">TASK</option> */}

    </select>
</div>
<div className='form-row-10'>

{/* <p className="form-label">상위 항목</p>
                        <select 
                            className="form-select-type"
                            value={parentId}
                            onChange={(e) => setParentId(e.target.value)}
                        >
                            {Array.isArray(epicList) && epicList.map(epic => (
                                <option key={epic.id} >{epic.title}</option>
                            ))}
                        </select> */}





                        <p className="form-label">상위 항목</p>
            <select className="form-select-type2" value={parentId} onChange={(e) => setParentId(e.target.value)}>

                {Array.isArray(epicList) && epicList.map(epic => (
    <option key={epic.id} value={epic.id} >{epic.title}</option>
))}

            </select>






    {/* <p className="form-label">상위 항목</p>
    <select className="form-select-type">
    {Array.isArray(epicList) && epicList.map(epic => (
    <option key={epic.id}>{epic.title}</option>
))}
    </select> */}
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
            {/* <div className="modal-footer">
                <h3>footer</h3>
            </div> */}
        </div>
    );
}

export default StoryModal;