
import React from 'react';
import { Comment } from '../../../types';
import './CommentList.scss';

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (comments.length === 0) {
    return <p>Комментариев пока нет.</p>;
  }

  return (
    <div className="comment-list">
      {comments.map(comment => (
        <div key={comment.id} className="comment-item">
          <strong>{comment.author_name}</strong>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
