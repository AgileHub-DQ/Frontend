import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function IssueComment() {
  const location = useLocation();
  const { projectKey: key, issueId } = location.state;
  const [commentText, setCommentText] = useState('');

  const postComment = async () => {
    if (!commentText.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }

    if (!key || !issueId) {
      console.error('프로젝트 키 또는 이슈 ID가 제공되지 않았습니다.');
      // 사용자에게 오류 메시지를 표시하고, 적절한 페이지로 리다이렉션합니다.
      // 예: navigate('/errorPage'); 또는 상태를 기본값으로 설정합니다.
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
