// import React, { useEffect, useRef } from 'react';
import '../../css/TimeLinePage/TimelineBoard.css';

function TimelineBoard() {
    // 샘플 데이터
    const data = [
        { task: "AT-5 요구사항 설계", status: "완료", startDate: "2022-01-10", endDate: "2022-01-12" },
        { task: "AT-18 1차 디자인", status: "완료", startDate: "2022-01-15", endDate: "2022-01-18" },
        { task: "AT-24 2차 디자인", status: "완료", startDate: "2022-01-20", endDate: "2022-01-23" },
        { task: "AT-27 개발전에 필요한 작업들 준비", status: "완료", startDate: "2022-01-25", endDate: "2022-01-28" },
        { task: "AT-36 api 명세서 작성", status: "완료", startDate: "2022-01-30", endDate: "2022-02-02" },
        ];

        return (
            <div className='timeline-container'>
                <div className="timeline-issue">
                    <table>
                        <thead>
                            <tr>
                                <th>Issue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "gray" : "white" }}>
                                    <td style={{ width: "200px", height: "53px" }}>{item.task}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='timeline-board'>
                    {/* 작업 위치를 여기에 추가합니다. */}
                </div>
            </div>
        );
    }     
    
    export default TimelineBoard;