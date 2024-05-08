import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Menubar from '../Menubar.js';
import DashBoard from '../SprintPage/DashBoard.js';
import Component from '../SprintPage/Component.js';

function UserMainPage() {  
    const navigate = useNavigate();
    const location = useLocation();
    const sprintData = location.state?.sprintData;
    const sprintId = sprintData?.sprintId;
    const projectKey = location.state?.projectKey;

    return (
        <div className='sprint_container'>
            <Menubar/>
            <button className="createProjectButton" onClick={() => navigate('/createProject')}>
                <span>
                    프로젝트 생성하러 가기
                </span>
            </button>
            <style>
                {`
                    .createProjectButton {
                        border: 2px solid #24b4fb;
                        background-color: #24b4fb;
                        border-radius: 0.9em;
                        padding: 0.8em 1.2em;
                        transition: all ease-in-out 0.2s;
                        font-size: 30px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: #fff;
                        font-weight: 600;
                        cursor: pointer;
                        width: 30rem;
                        height: 5rem;
                    }

                    .createProjectButton:hover {
                        background-color: #0071e2;
                    }
                `}
            </style>
        </div>
    );
}

export default UserMainPage;
