import React, { useState } from 'react';
import '../../css/modal/Modal.css'; // 모달 스타일을 위한 CSS 파일

const Modal = ({ isVisible, details, onClose }) => {
  if (!isVisible) return null;

  return(
<div className="modalContainer">

<div>{details.result.issue.title}</div>


</div>
  )
};


export default Modal;
