import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/BacklogPage/AddBacklog.css';
import ShowEpic from './show/ShowEpic.js';
import CreateEpicButton from './button/CreateEpicButton.js';
import { useAuth } from '../../context/AuthContext.js';
import {  useLocation } from 'react-router-dom';

function AddBacklog() {
    const { authToken } = useAuth();
    const location = useLocation();
    const [projectKey, setProjectKey] = useState('');
    const [sprintId, setSprintId] = useState('');
    const [sprintData, setSprintData] = useState({});
    const [epics, setEpics] = useState([]);

    useEffect(() => {
        if (location.state) {
            const { projectKey, sprintId, sprintData } = location.state;

            setProjectKey(projectKey || '');
            setSprintId(sprintId || '');
            setSprintData(sprintData || {});
        }
    }, [location.state]);

    const epicIssue = async () => {
        try {
            const endpoint = `https://api.agilehub.store/projects/${projectKey}/epics`;

            const response = await axios.get(endpoint, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            setEpics(response.data.result || []);
        } catch (error) {
            console.error('Failed to fetch issues:', error);
        }
    };

    useEffect(() => {
        if (projectKey) {
            epicIssue();
        }
    }, [projectKey]);

    const onEpicDeleted = () => {
        epicIssue();  // 에픽 삭제 후 에픽 목록 다시 가져오기
    };

    return (
        <div className='addBacklog'>
            {epics.length === 0 ? (
                <CreateEpicButton projectKey={projectKey} onEpicSubmit={epicIssue} />
            ) : (
                epics.map(epic => (
                    <div key={epic.id} className='epic-section'>
                        <ShowEpic epicData={epic} projectKey={projectKey} sprintId={sprintId} onEpicDeleted={onEpicDeleted} />
                        <CreateEpicButton projectKey={projectKey} onEpicSubmit={epicIssue} />
                    </div>
                ))
            )}
        </div>
    );
}

export default AddBacklog;