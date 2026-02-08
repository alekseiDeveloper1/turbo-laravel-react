
import React, { useState } from 'react';
import { useCreateComment } from '../../../hooks/useComments';
import { Comment } from '../../../types';
import './CommentForm.scss';

interface CommentFormProps {
  articleId: number;
  onCommentCreated: (comment: Comment) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ articleId, onCommentCreated }) => {
  const [formData, setFormData] = useState({
    author_name: '',
    content: ''
  });
  const { createComment, loading, error } = useCreateComment();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const newComment = await createComment({ article_id: articleId, ...formData });
      onCommentCreated(newComment);
      setFormData({ author_name: '', content: '' });
    } catch (err) {
      console.error("Failed to submit comment");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <div className="form-group">
        <input
          type="text"
          name="author_name"
          placeholder="Ваше имя"
          value={formData.author_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <textarea
          name="content"
          placeholder="Ваш комментарий"
          value={formData.content}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Отправка...' : 'Отправить'}
      </button>
      {error && <p className="error-message">Ошибка: {error.message}</p>}
    </form>
  );
};

export default CommentForm;
