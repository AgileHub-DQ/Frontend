import React from 'react';

function Task({ text, draggable, onDragStart, onDragEnd }) {
  // 드래그 이벤트 핸들러
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', text); // 드래그할 데이터 설정
    onDragStart(); // 드래그 시작 시 호출되는 콜백 함수
  };

  const handleDragEnd = () => {
    onDragEnd(); // 드래그 종료 시 호출되는 콜백 함수
  };

  return (
    <div className="task" draggable={draggable} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <h3>{text}</h3>
      <p>This is a description for {text}.</p>
    </div>
  );
}

export default Task;

