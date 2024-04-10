// Task.js
import React from 'react';

function Task({ text, draggable }) {
    // 드래그 이벤트 핸들러
    const handleDragStart = (e) => {
      e.dataTransfer.setData('text/plain', text); // 드래그할 데이터 설정
    };
  
    return (
      <div className="task" draggable={draggable} onDragStart={handleDragStart}>
        <h3>{text}</h3>
        <p>This is a description for {text}.</p>
      </div>
    );
  }

export default Task;
