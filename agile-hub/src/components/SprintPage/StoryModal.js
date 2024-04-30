import React, { useState } from 'react';
import '../../css/modal/Modal.css'; // 모달 스타일을 위한 CSS 파일

const Modal = ({ isVisible, details, onClose }) => {

  if (!isVisible) return null;



  return(
<div className="modalContainer">
<div className='폼로우'>
    {/* <div className='colorBox' style={{backgroundColor: color}}></div> */}
    {/* <input
        type="text"
        className="form-input"
        placeholder="Issue Title"
        value={issueTitle}
        onChange={(e) => setIssueTitle(e.target.value)}
    /> */}
    <div className='issueTitle'>{details.result.issue.title}</div>
    <select className='issueStatus' defaultValue={details.result.issue.status}>
        <option value="DO">DO</option>
        <option value="PROGRESS">PROGRESS</option>
        <option value="DONE">DONE</option>
    </select>
    <div>{details.result.issue.type}</div>
    <div>{details.result.issue.startDate}</div>
    <div>{details.result.issue.endDate}</div>
    <div>{details.result.issue.assignee.name}</div>
    <div>...</div>
    <button onClick={onClose}>닫기</button>
    <button>수정하기</button>

</div>
{/* <div>{details.result.issue.title}</div> */}


</div>
  )
};


export default Modal;
