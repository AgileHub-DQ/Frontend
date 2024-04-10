import React from 'react';

function Task({ text, draggable, onDragStart, onDragEnd }) {

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', text); 
    onDragStart(); 
  };

  const handleDragEnd = () => {
    onDragEnd(); 
  };

  return (
    <div className="task" draggable={draggable} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <h3>{text}</h3>
      <p>This is a description for {text}.</p>
    </div>
  );
}

export default Task;

