import React from 'react';
import '../../css/SprintPage/Component.css';
import { useAuth } from '../../context/AuthContext.js';

function Component({ sprintData }) {

  // 현재 날짜를 구하고, 진행률을 계산하는 함수
  const calculateProgress = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    const totalDuration = end - start;
    const elapsedDuration = today - start;
    return Math.min((elapsedDuration / totalDuration) * 100, 100);
  };

  const progress = calculateProgress(sprintData.startDate, sprintData.endDate);

  return (
    <div className="bar">
      {sprintData && (
        <div>
          <div className='sprintbarcontainer'>
            <div className='sprint_title'>스프린트 이름 / 스프린트 목표</div>
            <div className='sprint_description'>[{sprintData.title}] / {sprintData.description}</div>
          </div>
          <div className="dateContainer">
            <div>{sprintData.startDate}</div>
            <div className='dateBar'>
              <div className='progress' style={{ width: `${progress}%` }} />
            </div>
            <div>{sprintData.endDate}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Component;
