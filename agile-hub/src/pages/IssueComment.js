// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';

// function IssueComment() {
//   const location = useLocation();
//   const { projectKey: key, issueId } = location.state;
//   const [comments, setComments] = useState([]);
//   const [commentText, setCommentText] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!key || !issueId) {
//       console.error('프로젝트 키 또는 이슈 ID가 제공되지 않았습니다.');
//       setLoading(false);
//       return;
//     }
//     fetchComments();
//   }, [key, issueId]);

//   const fetchComments = async () => {
//     try {
//       const response = await axios.get(`/api/projects/${key}/issues/${issueId}/comments`);
//       if (response.data.isSuccess && Array.isArray(response.data.result)) {
//         setComments(response.data.result);
//       } else {
//         console.error('데이터 형식이 올바르지 않습니다:', response.data);
//         setComments([]);
//       }
//     } catch (error) {
//       console.error('댓글을 불러오는 데 실패했습니다.', error);
//       setComments([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const postComment = async () => {
//     if (!commentText.trim()) {
//       alert('댓글을 입력해주세요.');
//       return;
//     }
//     try {
//       const response = await axios.post(`/api/projects/${key}/issues/${issueId}/comments`, {
//         content: commentText
//       });
//       fetchComments();
//       setCommentText('');
//     } catch (error) {
//       console.error('댓글을 추가하는 데 실패했습니다.', error);
//     }
//   };

//   const deleteComment = async (commentId) => {
//     try {
//       await axios.delete(`/api/projects/${key}/issues/${issueId}/comments/${commentId}`);
//       fetchComments(); // 댓글 목록을 다시 불러옴
//     } catch (error) {
//       console.error('댓글 삭제 실패:', error);
//     }
//   };

//   if (loading) {
//     return <div>Loading comments...</div>;
//   }

//   return (
//     <div className="container">
//       <h2>IssueComment입니다.</h2>
//       {comments.map(comment => (
//         <div key={comment.id}>
//            <div><strong>ID:</strong> {comment.id}</div>
//            <br/>
//           <div><strong>writerName:</strong>{comment.writerName}</div>
//           <br/>
//           <div><strong>Comment:</strong></div>
//           <br/>
//           <pre>{comment.content ? comment.content : '(No content)'}</pre>
//            <br/>
//           <button onClick={() => deleteComment(comment.id)}>댓글 삭제</button>
//         </div>
//       ))}
//       <textarea
//         value={commentText}
//         onChange={(e) => setCommentText(e.target.value)}
//         placeholder="댓글을 입력하세요"
//       />
//       <button onClick={postComment}>댓글 추가</button>
//     </div>
//   );
// }

// export default IssueComment;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function IssueComment() {
  const location = useLocation();
  const { projectKey: key, issueId } = location.state;
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null); // 추가
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!key || !issueId) {
      console.error('프로젝트 키 또는 이슈 ID가 제공되지 않았습니다.');
      setLoading(false);
      return;
    }
    fetchComments();
  }, [key, issueId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/projects/${key}/issues/${issueId}/comments`);
      if (response.data.isSuccess && Array.isArray(response.data.result)) {
        setComments(response.data.result);
      } else {
        console.error('데이터 형식이 올바르지 않습니다:', response.data);
        setComments([]);
      }
    } catch (error) {
      console.error('댓글을 불러오는 데 실패했습니다.', error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const postComment = async () => {
    if (!commentText.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }
    try {
      const response = await axios.post(`/api/projects/${key}/issues/${issueId}/comments`, {
        content: commentText
      });
      fetchComments();
      setCommentText('');
    } catch (error) {
      console.error('댓글을 추가하는 데 실패했습니다.', error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/projects/${key}/issues/${issueId}/comments/${commentId}`);
      fetchComments(); // 댓글 목록을 다시 불러옴
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
    }
  };

  const editComment = (commentId) => {
    setEditingCommentId(commentId);
    const commentToEdit = comments.find(comment => comment.id === commentId);
    if (commentToEdit) {
      setCommentText(commentToEdit.content);
    }
  };

  const saveEditedComment = async (commentId) => {
    try {
      await axios.put(`/api/projects/${key}/issues/${issueId}/comments/${commentId}`, {
        content: commentText
      });
      fetchComments();
      setEditingCommentId(null);
      setCommentText('');
    } catch (error) {
      console.error('댓글 수정에 실패했습니다.', error);
    }
  };

  if (loading) {
    return <div>Loading comments...</div>;
  }

  return (
    <div className="container">
      <h2>IssueComment입니다.</h2>
      {comments.map(comment => (
        <div key={comment.id}>
          <div><strong>ID:</strong> {comment.id}</div>
          <br/>
          <div><strong>writerName:</strong>{comment.writerName}</div>
          <br/>
          <div><strong>Comment:</strong></div>
          <br/>
          {editingCommentId === comment.id ? (
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="댓글을 수정하세요"
            />
          ) : (
            <pre>{comment.content ? comment.content : '(No content)'}</pre>
          )}
          <br/>
          {editingCommentId === comment.id ? (
            <button onClick={() => saveEditedComment(comment.id)}>댓글 수정 완료</button>
          ) : (
            <button onClick={() => editComment(comment.id)}>댓글 수정</button>
          )}
          <button onClick={() => deleteComment(comment.id)}>댓글 삭제</button>
        </div>
      ))}
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
