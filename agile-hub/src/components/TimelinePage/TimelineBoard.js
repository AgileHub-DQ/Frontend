import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../../css/TimeLinePage/TimelineBoard.css';

function TimelineBoard() {
    const [timelineTitle, setTimelineTitle] = useState([]);
    const [timelineStartDate, setTimelineStartDate] = useState([]);
    const [timelineEndDate, setTimelineEndDate] = useState([]);
    const [statistics, setStatistics] = useState([]);
    const [timelineStatus, setTimelineStatus] = useState([]);

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

    const scrollToCurrentMonth = () => {
        if (timelineRef.current) {
            const currentMonth = new Date().getMonth();
            const monthWidth = timelineRef.current.querySelector(".month-header").offsetWidth;
            const targetScrollLeft = currentMonth * monthWidth;
            animateScroll(0, targetScrollLeft, 1000); // 1월부터 현재 월까지 스크롤, 1초 애니메이션
        }
    };

    const animateScroll = (start, end, duration) => {
        const startTime = performance.now();

        const scroll = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const scrollPosition = start + (end - start) * progress;
            timelineRef.current.scrollLeft = scrollPosition;

            if (progress < 1) {
                requestAnimationFrame(scroll);
            }
        };

        requestAnimationFrame(scroll);
    };

    const timeline = async () => {
        try {
            const projectKey = 'p1';
            const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTU1NzM5OTcsImV4cCI6MTcxNjc4MzU5N30.1PRhxReTmFd2UV4CI5tCrDCNq7Re2p9PNslzwfwy0d8ZZbpuxOuKd1FTwjoTkRIwtYmL2V1gzxaDhchatjKhzA';
            const response = await axios.get(`/projects/${projectKey}/epics/stats`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            const result = response.data.result || [];
            const statuses = result.map(item => item.issue?.status || '')
            const statistics = result.map(item => item.statistic || {});
            const titles = result.map(item => item.issue?.title || 'No Title');
            const startDates = result.map(item => item.issue?.startDate || '');
            const endDates = result.map(item => item.issue?.endDate || '');

            setTimelineStatus(statuses);
            setStatistics(statistics);
            setTimelineTitle(titles);
            setTimelineStartDate(startDates);
            setTimelineEndDate(endDates);
            
        } catch (error) {
            console.error('API 요청 실패:', error);
        }
    };

    const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

    const getDayPosition = (date) => {
        if (!date) return 0;
        const day = new Date(date).getDate();
        const month = new Date(date).getMonth();
        return (month * 100) + ((day / 31) * 100);
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
                            <tr key={index} className={index % 2 === 0 ? 'gray-row' : 'white-row'}>
                                <td>
                                    <div className="boxandtitle">
                                        <div className="color-box"></div>
                                        <div className="issueTitles">{title}</div>
                                        {timelineStatus[index] === 'DONE' && <span className="status-badge">완료됨</span>}
                                    </div>
                                    <div className='progressbaranddone'>
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
                                <th key={index} className="month-header">{month}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {timelineTitle.map((title, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'gray-row' : 'white-row'}>
                                {months.map((month, monthIndex) => (
                                    <td key={monthIndex} className="timeline-cell">
                                        {timelineStartDate[index] && timelineEndDate[index] && getDayPosition(timelineStartDate[index]) >= (monthIndex * 100) && getDayPosition(timelineStartDate[index]) < ((monthIndex + 1) * 100) &&
                                            <div
                                                className="task-bar"
                                                style={{
                                                    left: `${(getDayPosition(timelineStartDate[index]) % 100)}%`,
                                                    width: `${(getDayPosition(timelineEndDate[index]) - getDayPosition(timelineStartDate[index])) % 100}%`
                                                }}
                                            ></div>
                                        }
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
