
import { useState, useEffect, useCallback } from 'react';
import {createComment, getArticle} from '../services/api';
import { Comment } from '../types';

export const useComments = (articleId: number) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      const data = (await getArticle(articleId)).comments;
      setComments(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [articleId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const addComment = (comment: Comment) => {
    if (!comment) {
      console.error("Бэкенд прислал пустой ответ!");
      return;
    }
    setComments(prevComments => [comment, ...prevComments]);
  };

  return { comments, loading, error, refetch: fetchComments, addComment };
};

export const useCreateComment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const createCommentRequest = async (data: { articleId: number; author_name: string; content: string }) => {
    try {
      setLoading(true);
      return await createComment(data);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createComment: createCommentRequest, loading, error };
};
