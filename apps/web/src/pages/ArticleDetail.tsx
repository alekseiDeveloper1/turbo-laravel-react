
import React from 'react';
import { useParams } from 'react-router-dom';
import { useArticle } from '../hooks/useArticles';
import { useComments } from '../hooks/useComments';
import Loader from '../components/common/Loader';
import CommentList from '../components/features/CommentList';
import CommentForm from '../components/features/CommentForm';
import './ArticleDetail.scss';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const articleId = parseInt(id || '0', 10);

  const { article, loading: articleLoading, error: articleError } = useArticle(articleId);
  const { comments, loading: commentsLoading, error: commentsError, addComment } = useComments(articleId);

  if (articleLoading) return <Loader />;
  if (articleError) return <p>Ошибка при загрузке статьи: {articleError.message}</p>;
  if (!article) return <p>Статья не найдена.</p>;

  return (
    <div className="article-detail-container">
      <div className="article-content">
        <h1>{article.title}</h1>
        <p>{article.content}</p>
      </div>
      <div className="comments-section">
        <h2>Комментарии</h2>
        <CommentForm articleId={articleId} onCommentCreated={addComment} />
        {commentsLoading ? (
          <Loader />
        ) : commentsError ? (
          <p>Ошибка при загрузке комментариев: {commentsError.message}</p>
        ) : (
          <CommentList comments={comments} />
        )}
      </div>
    </div>
  );
};

export default ArticleDetail;
