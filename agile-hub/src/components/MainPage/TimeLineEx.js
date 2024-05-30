import React, { useEffect, useRef } from 'react';
import '../../css/TimeLinePage/TimelineBoard.css';

const data = [
  { task: 'AT-5 요구사항 설계', status: '완료됨', startDate: '2022-01-10', endDate: '2022-01-20' },
  { task: 'AT-18 1차 디자인', status: '완료됨', startDate: '2022-01-15', endDate: '2022-01-25' },
  { task: 'AT-24 2차 디자인', status: '완료됨', startDate: '2022-01-10', endDate: '2022-02-05' },
  { task: 'AT-27 개발전에 필요한 작업들 준비', status: '완료됨', startDate: '2022-01-25', endDate: '2022-02-10' },
  { task: 'AT-36 api 명세서 작성', status: '완료됨', startDate: '2022-02-01', endDate: '2022-02-15' },
  { task: 'AT-44 깃허브 레포', status: '완료됨', startDate: '2022-02-10', endDate: '2022-02-20' },
  { task: 'AT-47 인프라 아키텍처 설계', status: '완료됨', startDate: '2022-02-15', endDate: '2022-02-28' },
  { task: 'AT-50 3차 디자인', status: '완료됨', startDate: '2022-03-01', endDate: '2022-03-10' },
  { task: 'AT-59 ppt', status: '완료됨', startDate: '2022-03-05', endDate: '2022-03-15' },
  { task: 'AT-66 인프라 구축', status: '완료됨', startDate: '2022-03-10', endDate: '2022-03-25' },
  { task: 'AT-73 CI/CD 파이프라인 구축', status: '완료됨', startDate: '2022-03-15', endDate: '2022-04-01' },
  { task: 'AT-90 테스트', status: '완료됨', startDate: '2022-02-15', endDate: '2022-04-10' },
];

const dayWidth = 20; // Calculate one day as 20px

const getBarStyle = (startDate, endDate, index) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date('2022-01-01');
  const offset = ((start - today) / (1000 * 60 * 60 * 24)) * dayWidth;
  const width = ((end - start) / (1000 * 60 * 60 * 24)) * dayWidth;

  return {
    marginLeft: `${offset}px`,
    width: `${width}px`,
    top: `${index * 53}px`,
    backgroundColor: '#6495ED', // Unified color
    position: 'absolute',
  };
};

const renderMonthLabels = () => {
  const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const today = new Date('2022-01-01');
  return months.map((month, index) => {
    const offset = ((new Date(`2022-${index + 1}-01`) - today) / (1000 * 60 * 60 * 24)) * dayWidth;
    const backgroundColor = index % 2 === 0 ? '#f4f4f4' : '#e0e0e0'; // Alternating colors
    return (
      <div key={index} className="timeline-month" style={{ left: `${offset}px`, backgroundColor }}>
        {month}
      </div>
    );
  });
};

const renderDeadlineLine = () => {
  const today = new Date('2022-01-01');
  const deadline = new Date('2022-02-15'); // Set current date as February 15
  const offset = ((deadline - today) / (1000 * 60 * 60 * 24)) * dayWidth;
  return <div className="timeline-deadline" style={{ left: `${offset}px` }}></div>;
};

const renderOrangeLine = () => {
  const today = new Date('2022-01-01');
  const orangeDate = new Date('2022-02-10'); // Set as February 10
  const offset = ((orangeDate - today) / (1000 * 60 * 60 * 24)) * dayWidth;
  return <div className="timeline-orange-line" style={{ left: `${offset}px` }}></div>;
};

const TimeLineEx = () => {
  const timelineRef = useRef(null);

  useEffect(() => {
    const scrollToFebruary = () => {
      if (timelineRef.current) {
        const februaryHeader = timelineRef.current.querySelector('.timeline-month:nth-child(2)');
        if (februaryHeader) {
          februaryHeader.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }
      }
    };

    scrollToFebruary();
  }, []);

  return (
    <div className="timeline-container" style={{ marginTop: '40px' }}>
      <div className="timeline-issue">
        <table>
          <thead>
            <tr>
              <th>Issue</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f4f4f4', height: '53px' }}>
                <td style={{ width: '200px', height: '53px' }}>
                  <div>{item.task}</div>
                  <div className="status-text">{item.status}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="timeline-board" ref={timelineRef}>
        <div className="timeline-months">{renderMonthLabels()}</div>
        <div className="timeline-grid">
          {renderDeadlineLine()}
          {renderOrangeLine()}
          {data.map((item, index) => (
            <div key={index} className="timeline-bar" style={getBarStyle(item.startDate, item.endDate, index)}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeLineEx;
