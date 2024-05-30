// PlanSprint.js
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../css/BacklogPage/PlanSprint.css';
import { useAuth } from '../../context/AuthContext.js';

const PlanSprint = forwardRef(({ projectKey, sprintData }, ref) => {
  const { authToken } = useAuth();
  const [issues, setIssues] = useState([]);
  const [count, setCount] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (projectKey) {
      test();
    }
  }, [projectKey]);

  useImperativeHandle(ref, () => ({
    test() {
      fetchSprints();
    }
  }));

  const fetchSprints = async () => {
    try {
      const response = await axios.get(`https://api.agilehub.store/projects/${projectKey}/sprints`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      console.log("API response:", response.data); // API 응답 확인

      const sprints = response.data.result;
      if (sprints.length === 0) {
        console.error('No sprints found');
        return;
      }

      const latestSprint = sprints[sprints.length - 1];
      const sprintIssues = latestSprint.issues;
      const issueCount = latestSprint.issueCount;

      setIssues(sprintIssues);
      setCount(issueCount);

    } catch (error) {
      console.error('API request failed:', error);
    }
  };

  const handleCreateSprint = () => {
    navigate('/sprint', { state: { sprintData, projectKey, issues } });
  };

  return (
    <div className='plansprint'>
      <div className='plansprint_container'>
        {issues.length === 0 && (
          <>
            <p className='plansprint_content'>스프린트 계획하기</p>
            <p className='plansprint_content'>이 스프린트의 작업을 계획하려면 백로그 섹션에서 이슈를 끌어다 놓거나 새 이슈를 생성하세요.<br />
              준비가 되면 스프린트 시작을(를) 선택하세요.</p>
          </>
        )}
        <h3 className='issueCount'>({count}개 이슈)</h3>
        {issues.length > 0 && (
          <div className='issues-list'>
            <ul>
              {issues.map(issue => (
                <li key={issue.id} className='issue-item'>
                  <div className='issue-icon'></div>
                  <div className='issue-key'>{issue.key}</div>
                  <div className='issue-title'>{issue.title}</div>
                  <div className='issue-type'>{issue.type}</div>
                  <div className='issue-status'>{issue.status}</div>
                  <div className='issue-avatar'>
                    <img src={issue.assigneeDto.profileImageURL} alt='Profile' className='profile-image' />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button className='create-sprint-button' onClick={handleCreateSprint}>스프린트 시작</button>
    </div>
  );
});

export default PlanSprint;
