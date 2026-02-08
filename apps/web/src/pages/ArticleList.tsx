
import React from 'react';
import { Link } from 'react-router-dom';
import { useArticles } from '../hooks/useArticles';
import Loader from '../components/common/Loader';
import './ArticleList.scss';

const ArticleList: React.FC = () => {
  const { articles, loading, error, refetch } = useArticles();

  if (loading) return <Loader />;
  if (error) return <p>Ошибка при загрузке статей: {error.message}</p>;

  return (
    <div className="article-list-container">
      <div className="header">
        <h1>Статьи</h1>
        <Link to="/articles/create" className="create-article-btn">Написать статью</Link>
      </div>
      <button onClick={refetch} className="refetch-btn">Обновить список</button>
      <div className="articles">
        {articles.map(article => (
          <div key={article.id} className="article-card">
            <h2>{article.title}</h2>
            <p>{article.content.substring(0, 100)}...</p>
            <Link to={`/articles/${article.id}`}>Читать далее</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
