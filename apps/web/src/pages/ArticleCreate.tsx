
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateArticle } from '../hooks/useArticles';
import './ArticleCreate.scss';

const ArticleCreate: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const { createArticle, loading, error } = useCreateArticle();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const newArticle = await createArticle(formData);
      navigate(`/articles/${newArticle.id}`);
    } catch (err) {
      console.error('Failed to create article');
    }
  };

  return (
    <div className="article-create-container">
      <h1>Новая статья</h1>
      <form onSubmit={handleSubmit} className="article-form">
        <div className="form-group">
          <label htmlFor="title">Заголовок</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Содержание</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Публикация...' : 'Опубликовать'}
        </button>
        {error && <p className="error-message">Ошибка при создании статьи: {error.message}</p>}
      </form>
    </div>
  );
};

export default ArticleCreate;
