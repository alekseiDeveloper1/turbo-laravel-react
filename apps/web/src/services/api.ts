
const API_BASE_URL = 'http://127.0.0.1:8080/';

const request = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// --- Articles API ---

export const getArticles = () => {
  return request(`${API_BASE_URL}/posts`);
};

export const getArticle = (id: number) => {
  return request(`${API_BASE_URL}/posts/${id}`);
};

export const createArticle = (data: { title: string; content: string; }) => {
  return request(`${API_BASE_URL}/posts`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// --- Comments API ---

export const getComments = (articleId: number) => {
  return request(`${API_BASE_URL}/comments?postId=${articleId}`);
};

export const createComment = (data: { author_name: string; content: string }) => {
  return request(`${API_BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
