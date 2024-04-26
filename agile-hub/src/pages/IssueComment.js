import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function IssueComment() {
  const location = useLocation();
  const { key, issueId } = location.state; // 이전 페이지에서 받은 state
  const [commentText, setCommentText] = useState('');

  const postComment = async () => {
    if (!commentText.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post(`/api/projects/${key}/issues/${issueId}/comments`, {
        content: commentText
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      // 댓글 추가 후의 처리를 여기에 작성 (예: 폼 초기화, 상태 업데이트)
    } catch (error) {
      console.error('댓글을 추가하는 데 실패했습니다.', error);
      // 오류 처리
    }
  };

  return (
    <div className="container">
      <p>IssueComment입니다.</p>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="댓글을 입력하세요"
      />
      <button onClick={postComment}>댓글 추가</button>
    </div>
  );
}

export default IssueComment;
