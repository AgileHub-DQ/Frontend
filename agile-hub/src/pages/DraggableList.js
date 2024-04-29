import React, { useState } from 'react';

function DraggableList() {
  const [tasks, setTasks] = useState({
    todo: ['a', 'b', 'c'],
    doing: ['e'],
    complete: ['f']
  });

  const [currentCategory, setCurrentCategory] = useState(null);

  const onDragStart = (e, item, category) => {
    e.dataTransfer.setData("text/plain", item);
    setCurrentCategory(category);
  };

  const onDrop = (e, category) => {
    const item = e.dataTransfer.getData("text/plain");
    
    // 만약 드롭된 카테고리가 현재 아이템이 속한 카테고리와 같다면 드롭 이벤트를 무시
    if (category === currentCategory) {
      return;
    }
  
    const newTasks = { ...tasks };
  
    // 아이템을 현재 카테고리에서 제거
    Object.keys(newTasks).forEach((key) => {
      newTasks[key] = newTasks[key].filter((i) => i !== item);
    });
  
    // 아이템을 새 카테고리에 추가
    newTasks[category].push(item);
  
    setTasks(newTasks);
  };
  

  const onDragOver = (e) => {
    e.preventDefault(); // 드롭을 가능하게 하는 기본 이벤트 방지
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div 
        style={{ width: '50%' }}
        onDrop={(e) => onDrop(e, 'todo')}
        onDragOver={onDragOver}
      >
        <h2>To Do</h2>
        {tasks.todo.map((item) => (
          <div 
            key={item}
            draggable 
            onDragStart={(e) => onDragStart(e, item)}
            style={{ margin: '8px', padding: '8px', backgroundColor: '#f9caca' }}
          >
            {item}
          </div>
        ))}
      </div>
      <div 
        style={{ width: '50%' }}
        onDrop={(e) => onDrop(e, 'doing')}
        onDragOver={onDragOver}
      >
        <h2>Doing</h2>
        {tasks.doing.map((item) => (
          <div 
            key={item}
            draggable 
            onDragStart={(e) => onDragStart(e, item)}
            style={{ margin: '8px', padding: '8px', backgroundColor: '#f9caca' }}
          >
            {item}
          </div>
        ))}
        </div>
        <div 
  style={{ width: '50%' }}
  onDrop={(e) => onDrop(e, 'complete')}
  onDragOver={onDragOver}
>
  <h2>Complete</h2>
  {tasks.complete.map((item) => (
    <div 
      key={item}
      draggable 
      onDragStart={(e) => onDragStart(e, item)}
      style={{ margin: '8px', padding: '8px', backgroundColor: '#f9caca' }}
    >
      {item}
    </div>
  ))}
</div>

    </div>
  );
}

export default DraggableList;
