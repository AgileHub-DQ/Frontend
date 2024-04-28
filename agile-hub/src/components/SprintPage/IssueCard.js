import React from 'react';

function IssueCard({ issue }) {
  return (
    <div className="issue-card">
      <h3>{issue.title}</h3>
      <p>Type: {issue.type}</p>
      <p>Status: {issue.status}</p>
      {/* 이슈의 다른 정보를 표시합니다. */}
    </div>
  );
}

export default IssueCard;
