import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../css/BacklogPage/ShowStory.css';
import CreateTaskButton from '../button/CreateTaskButton.js';
import ShowTask from './ShowTask.js';
import { useAuth } from '../../../context/AuthContext.js';

function ShowStory({ projectKey, issueId, sprintId }) {
    console.log("showstory issueId: "+issueId);
    const { authToken } = useAuth();
    const [stories, setStories] = useState([]);
    const [tasks, setTasks] = useState({});
    const [sprintAssignments, setSprintAssignments] = useState({});

    useEffect(() => {
        console.log("useEffect 들어옴!!");
        fetchStories();
    }, [issueId]);




    const fetchStories = async () => {
        try {
            console.log("fetchStories에서 issueId: "+issueId);
            const response = await axios.get(`https://api.agilehub.store/projects/${projectKey}/epics/${issueId}/stories`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data.result);
            setStories(response.data.result);
            response.data.result.forEach(story => {
                fetchTasks(story.id);
            });
        } catch (error) {
            console.error('API request failed:', error);
        }
    };

    const fetchTasks = async (storyId) => {
        try {
            const response = await axios.get(`https://api.agilehub.store/projects/${projectKey}/stories/${storyId}/tasks`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });

            setTasks(prevTasks => ({
                ...prevTasks,
                [storyId]: response.data.result
            }));
        } catch (error) {
            console.error('Fetching tasks failed:', error);
        }
    };

    const assignToSprint = async (storyId) => {
        try {
            const response = await axios.post(`https://api.agilehub.store/projects/${projectKey}/sprints/${sprintId}/issue`, {
                issueId: storyId
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });

            setSprintAssignments(prev => ({
                ...prev,
                [storyId]: true
            }));

            alert("할당되었습니다.")
            console.log('Assigned to sprint:', response);
        } catch (error) {
            console.error('Assigning to sprint failed:', error);
        }
    };

    const removeFromSprint = async (storyId) => {
        try {
            const response = await axios.delete(`https://api.agilehub.store/projects/${projectKey}/sprints/${sprintId}/issue`, {
                data: {
                    issueId: storyId
                },
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });

            setSprintAssignments(prev => ({
                ...prev,
                [storyId]: false
            }));

            alert("취소되었습니다.")
            console.log('Removed from sprint:', response);
        } catch (error) {
            console.error('Removing from sprint failed:', error);
        }
    };

    if (stories.length === 0) {
        return null;
    }

    const onDeleteTask = () => {
        fetchTasks();
    }

    const deleteIssue = async (storyId) => {

        const isConfirmed = window.confirm('정말로 삭제하시겠습니까?');
        if (isConfirmed) {
            try {
                await axios.delete(`https://api.agilehub.store/projects/${projectKey}/issues/${storyId}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                fetchStories();

            } catch (error) {
                console.error('이슈 삭제에 실패했습니다:', error);

            }
        }

    };


    return (
        <div className='showStory' style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            marginBottom: '10px'
        }}>
            {stories.map((story) => (
                <div key={story.id}>
                    <div className='storyContainer'>
                        <div>
                            <div className='storytitle' style={{ marginLeft: '10px', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>

                                <div>

                                    <div style={{
                                        border: '1px solid #ddd',
                                        borderRadius: '10px',
                                        padding: '5px',
                                        backgroundColor: '#fff',
                                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            padding: '15px',
                                            borderRadius: '8px',
                                            backgroundColor: '#fff',
                                            borderRadius: '10px',

                                        }}>

                                            <div style={{ flex: 1 }}>
                                                <strong>{story.title}</strong>
                                            </div>

                                            <div style={{ flex: 1 }}>

                                                <span className="storyType" style={{ marginLeft: '80px' }}>
                                                    {story.type}
                                                </span>
                                                <span className="storyStatus" style={{ marginLeft: '30px' }}>
                                                    {story.status}
                                                </span>
                                            </div>
                                            <div className='buttonContainer' style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                <button style={{
                                                    backgroundColor: 'rgb(62 140 249)',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '7px',
                                                    padding: '10px 20px',
                                                    cursor: 'pointer',
                                                    boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
                                                    transition: 'all 0.15s ease'
                                                }} onClick={() => assignToSprint(story.id)}>할당하기</button>
                                                <button style={{
                                                    marginLeft: '10px',
                                                    backgroundColor: '#aa5cea',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '7px',
                                                    padding: '10px 20px',
                                                    cursor: 'pointer',
                                                    boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
                                                    transition: 'all 0.15s ease'
                                                }} onClick={() => removeFromSprint(story.id)}>취소하기</button>
                                                <button style={{
                                                    marginLeft: '10px',
                                                    backgroundColor: 'rgb(255 119 112)',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '7px',
                                                    padding: '10px 20px',
                                                    cursor: 'pointer',
                                                    boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
                                                    transition: 'all 0.15s ease'
                                                }} onClick={() => deleteIssue(story.id)}>삭제하기</button>
                                            </div>

                                        </div>
                                        <div className='taskcontainer'>
                                            {tasks[story.id] && tasks[story.id].length > 0 && (
                                                <ShowTask projectKey={projectKey} tasks={tasks[story.id]} storyId={story.id} onDeleteTask={onDeleteTask} sprintId={sprintId} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <CreateTaskButton projectKey={projectKey} storyId={story.id} onTaskCreated={() => fetchTasks(story.id)} />
                </div>
            ))}
        </div>
    );
}

export default ShowStory;