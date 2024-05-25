import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../css/IssueComment.css'; 
import { useAuth } from "../../src/context/AuthContext"; 

function IssueComment() {
  const { authToken } = useAuth(); 
  const location = useLocation();
  const { projectKey: projectKey, issueId } = location.state;
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectKey || !issueId) {
      console.error('프로젝트 키 또는 이슈 ID가 제공되지 않았습니다.');
      setLoading(false);
      return;
    }
    fetchComments();
  }, [projectKey, issueId]);

  const fetchComments = async () => {
    try {
      //const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTU1NzM5OTcsImV4cCI6MTcxNjc4MzU5N30.1PRhxReTmFd2UV4CI5tCrDCNq7Re2p9PNslzwfwy0d8ZZbpuxOuKd1FTwjoTkRIwtYmL2V1gzxaDhchatjKhzA';
      const response = await axios.get(`https://api.agilehub.store/projects/${projectKey}/issues/${issueId}/comments`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
            
        }
      });

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
      //const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTU1NzM5OTcsImV4cCI6MTcxNjc4MzU5N30.1PRhxReTmFd2UV4CI5tCrDCNq7Re2p9PNslzwfwy0d8ZZbpuxOuKd1FTwjoTkRIwtYmL2V1gzxaDhchatjKhzA';
      await axios.post(`https://api.agilehub.store/projects/${projectKey}/issues/${issueId}/comments`, {
        content: commentText
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'  
        }
      });
      fetchComments();
      setCommentText('');
    } catch (error) {
      console.error('댓글을 추가하는 데 실패했습니다.', error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      //const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTU1NzM5OTcsImV4cCI6MTcxNjc4MzU5N30.1PRhxReTmFd2UV4CI5tCrDCNq7Re2p9PNslzwfwy0d8ZZbpuxOuKd1FTwjoTkRIwtYmL2V1gzxaDhchatjKhzA';
      await axios.delete(`https://api.agilehub.store/projects/${projectKey}/issues/${issueId}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`  
        }
      });
      alert("댓글을 삭제하였습니다.");
      fetchComments();
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
      //const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTU1NzM5OTcsImV4cCI6MTcxNjc4MzU5N30.1PRhxReTmFd2UV4CI5tCrDCNq7Re2p9PNslzwfwy0d8ZZbpuxOuKd1FTwjoTkRIwtYmL2V1gzxaDhchatjKhzA';
      await axios.put(`https://api.agilehub.store/projects/${projectKey}/issues/${issueId}/comments/${commentId}`, {
        content: commentText
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'   
        }
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
    <div className="issueCommentsContainer">
      <div className='title-container'>
      <h2 className="title-comments">COMMENTS</h2>
      </div>
      <div className="comments-section">
        {comments.map(comment => (
          <div key={comment.id} className="comment-card">
            <div className="comment-header">
              <strong>ID:</strong> {comment.id} | <strong>Writer:</strong> {comment.writerName}
            </div>
            <div className="comment-body">
              {editingCommentId === comment.id ? (
                <textarea
                  className="edit-textarea"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Edit your comment"
                />
              ) : (
                <pre>{comment.content ? comment.content : '(No content)'}</pre>
              )}
            </div>
            <div className="comment-actions">
              {editingCommentId === comment.id ? (
                <button className="save-btn" onClick={() => saveEditedComment(comment.id)}>Save</button>
              ) : (
                <button className="edit-btn" onClick={() => editComment(comment.id)}>Edit</button>
              )}
              <button className="delete-btn" onClick={() => deleteComment(comment.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="comment-input-section">
        <textarea
          className="new-comment-textarea"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Enter your comment"
        />
        <button className="add-comment-btn" onClick={postComment}>Add Comment</button>
      </div>
    </div>
  );
}

export default IssueComment;