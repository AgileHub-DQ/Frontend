import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../../css/TimeLinePage/TimelineBoard.css';
import { useAuth } from '../../context/AuthContext.js'; 

function TimelineBoard({ moveToTimelineTitle , projectKey}) {
  const { authToken } = useAuth(); 

  const [timelineTitle, setTimelineTitle] = useState([]);
  const [timelineStartDate, setTimelineStartDate] = useState([]);
  const [timelineEndDate, setTimelineEndDate] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [timelineStatus, setTimelineStatus] = useState([]);
  const [highlightedTitle, setHighlightedTitle] = useState(null);

  const timelineRef = useRef(null);
  const issueRef = useRef(null);

  useEffect(() => {
    timeline();
  }, []);

  useEffect(() => {
    if (timelineStartDate.length > 0) {
      scrollToCurrentMonth();
    }
  }, [timelineStartDate]);

  useEffect(() => {
    if (moveToTimelineTitle) {
      console.log(`Scrolling to title: ${moveToTimelineTitle}`);
      scrollToTitle(moveToTimelineTitle);
    }
  }, [moveToTimelineTitle]);

  const scrollToCurrentMonth = () => {
    if (timelineRef.current) {
      const currentMonth = new Date().getMonth();
      const monthWidth = timelineRef.current.querySelector('.month-header').offsetWidth;
      const targetScrollLeft = currentMonth * monthWidth;
      animateScroll(0, targetScrollLeft, 1000); // 1월부터 현재 월까지 스크롤, 1초 애니메이션
    }
  };

  const animateScroll = (start, end, duration) => {
    if (!timelineRef.current) return; // timelineRef가 유효한지 확인

    const startTime = performance.now();

    const scroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const scrollPosition = start + (end - start) * progress;
      if (timelineRef.current) {
        timelineRef.current.scrollLeft = scrollPosition;
      }

      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  };

  const scrollToTitle = (title) => {
    const index = timelineTitle.indexOf(title);
    if (index !== -1) {
      const targetRow = issueRef.current.querySelectorAll('tr')[index];
      if (targetRow) {
        targetRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const rowHeight = targetRow.offsetHeight;
        const containerHeight = timelineRef.current.clientHeight;
        timelineRef.current.scrollTop = targetRow.offsetTop - containerHeight / 2 + rowHeight / 2;
        setHighlightedTitle(title);
        setTimeout(() => setHighlightedTitle(null), 2000); 
      }
    }
  };

  const timeline = async () => {
    try {
      const response = await axios.get(`https://api.agilehub.store/projects/${projectKey}/epics/stats`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      const result = response.data.result || [];
      const statuses = result.map((item) => item.issue?.status || '');
      const statistics = result.map((item) => item.statistic || {});
      const titles = result.map((item) => item.issue?.title || 'No Title');
      const startDates = result.map((item) => item.issue?.startDate || '');
      const endDates = result.map((item) => item.issue?.endDate || '');

      setTimelineStatus(statuses);
      setStatistics(statistics);
      setTimelineTitle(titles);
      setTimelineStartDate(startDates);
      setTimelineEndDate(endDates);
    } catch (error) {
      console.error('API 요청 실패:', error);
    }
  };

  const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  const getDayPosition = (date) => {
    if (!date) return 0;
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth();
    return month * 100 + (day / 31) * 100;
  };

  const syncScroll = (sourceRef, targetRef) => {
    if (!sourceRef.current || !targetRef.current) return;
    const { scrollTop } = sourceRef.current;
    targetRef.current.scrollTop = scrollTop;
  };

  return (
    <div className="timeline-container">
      <div className="issue-column" ref={issueRef} onScroll={() => syncScroll(issueRef, timelineRef)}>
        <table className="fixed-table">
          <thead>
            <tr>
              <th className="th-issue">issue</th>
            </tr>
          </thead>
          <tbody>
            {timelineTitle.map((title, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'gray-row' : 'white-row'}
                style={highlightedTitle === title ? { border: '2px solid yellow' } : {}}
              >
                <td>
                  <div className="boxandtitle">
                    <div className="color-box"></div>
                    <div className="issueTitles">{title}</div>
                    {timelineStatus[index] === 'DONE' && <span className="status-badge">완료됨</span>}
                  </div>
                  <div className="progressbaranddone">
                    <div className="progress-box">
                      <div
                        className="progress-bar-done"
                        style={{
                          width: `${(statistics[index]?.statusDone / statistics[index]?.storiesCount) * 100}%`,
                          left: '0%',
                        }}
                      ></div>
                      <div
                        className="progress-bar-progress"
                        style={{
                          width: `${(statistics[index]?.statusProgress / statistics[index]?.storiesCount) * 100}%`,
                          left: `${(statistics[index]?.statusDone / statistics[index]?.storiesCount) * 100}%`,
                        }}
                      ></div>
                      <div
                        className="progress-bar"
                        style={{
                          width: `${(statistics[index]?.statusDo / statistics[index]?.storiesCount) * 100}%`,
                          left: `${((statistics[index]?.statusDone + statistics[index]?.statusProgress) / statistics[index]?.storiesCount) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="timeline-board" ref={timelineRef} onScroll={() => syncScroll(timelineRef, issueRef)}>
        <table className="fixed-table">
          <thead>
            <tr>
              {months.map((month, index) => (
                <th key={index} className="month-header">
                  {month}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timelineTitle.map((title, index) => (
              <tr key={index} className={index % 2 === 0 ? 'gray-row' : 'white-row'}>
                {months.map((month, monthIndex) => (
                  <td key={monthIndex} className="timeline-cell">
                    {timelineStartDate[index] &&
                      timelineEndDate[index] &&
                      getDayPosition(timelineStartDate[index]) >= monthIndex * 100 &&
                      getDayPosition(timelineStartDate[index]) < (monthIndex + 1) * 100 && (
                        <div
                          className="task-bar"
                          style={{
                            left: `${getDayPosition(timelineStartDate[index]) % 100}%`,
                            width: `${(getDayPosition(timelineEndDate[index]) - getDayPosition(timelineStartDate[index])) % 100}%`,
                          }}
                        ></div>
                      )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TimelineBoard;
