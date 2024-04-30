import React from 'react';

const Modal = ({ isVisible, details, onClose }) => {
  if (!isVisible) return null;

  
  return (
    <div className="modal">
      <button onClick={onClose}>Close</button>
      <h2>Issue Details</h2>
      {details && (
        <div>
          <p>Title: {details.result.issue.title}</p>
          <p>Type: {details.type}</p>
          {/* 추가적으로 필요한 다른 상세 정보를 출력합니다. */}
        </div>
      )}
    </div>
  );
};

export default Modal;
