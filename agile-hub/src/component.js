import React from 'react';
import './component.css'; // CSS 파일을 import합니다.

export default function Component() {
    return (
        <div className="kanban-board">
            <div className="column">
                <div className='textdiv'>
                    <div className="status-indicator preparing"></div>
                    <h2>Preparing</h2> 
                </div>
                <div className="plusbox">
                        <div className="rectangle33"></div>
                        <div className="image62"></div>
                </div>
                <div className="task">
                    <h3>Task 1</h3>
                    <p>This is a description for task 1.</p>
                </div>
                <div className="task">
                    <h3>Task 2</h3>
                    <p>This is a description for task 2.</p>
                </div>
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
                <div className="task">
                    <h3>Task 3</h3>
                    <p>This is a description for task 3.</p>
                </div>
                <div className="task">
                    <h3>Task 4</h3>
                    <p>This is a description for task 4.</p>
                </div>
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
                <div className="task">
                    <h3>Task 5</h3>
                    <p>This is a description for task 5.</p>
                </div>
                <div className="task">
                    <h3>Task 6</h3>
                    <p>This is a description for task 6.</p>
                </div>
            </div>
        </div>
    );
}
