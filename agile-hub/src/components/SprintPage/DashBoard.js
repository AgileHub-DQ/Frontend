import React from 'react';
import '../../css/SprintPage/DashBoard.css';
import Task from './Task';

export default function DashBoard() {
  const tasks = [
    { id: '1', text: 'Task 1' },
    { id: '2', text: 'Task 2' },
    { id: '3', text: 'Task 3' },
    { id: '4', text: 'Task 4' },
    { id: '5', text: 'Task 5' },
    { id: '6', text: 'Task 6' },
  ];

  // 드롭 영역에 해당하는 함수
  const handleDrop = (e) => {
    e.preventDefault(); // 기본 동작 방지
    const text = e.dataTransfer.getData('text/plain'); // 드래그한 데이터 가져오기
    // 여기서 드롭한 요소를 처리하거나 이동시킵니다.
  };

  // 드래그 영역에 해당하는 함수
  const handleDragOver = (e) => {
    e.preventDefault(); // 기본 동작 방지
  };

  return (
    <div className="kanban-board" onDrop={handleDrop} onDragOver={handleDragOver}>
      <div className="column">
        <div className='textdiv'>
          <div className="status-indicator preparing"></div>
          <h2>Preparing</h2>
        </div>
        <div className="plusbox">
          <div className="rectangle33"></div>
          <div className="image62"></div>
        </div>
        {tasks.slice(0, 2).map(task => (
          <Task key={task.id} text={task.text} draggable={true} />
        ))}
      </div>
      <div className="column">
        <div className='textdiv'>
          <div className="status-indicator in-progress"></div>
          <h2>In Progress</h2>
        </div>
        <div className="plusbox">
          <div className="rectangle33"></div>
          <div className="image62"></div>
        </div>
        {tasks.slice(2, 4).map(task => (
          <Task key={task.id} text={task.text} draggable={true} />
        ))}
      </div>
      <div className="column">
        <div className='textdiv'>
          <div className="status-indicator complete"></div>
          <h2>Complete</h2>
        </div>
        <div className="plusbox">
          <div className="rectangle33"></div>
          <div className="image62"></div>
        </div>
        {tasks.slice(4, 6).map(task => (
          <Task key={task.id} text={task.text} draggable={true} />
        ))}
      </div>
    </div>
  );
}
