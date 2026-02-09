
const API_BASE_URL = 'http://127.0.0.1:8080/api';

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

    return (await response.json());
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// --- Articles API ---

export const getArticles = async () => {
  return (await request(`${API_BASE_URL}/articles`)).data;
};

export const getArticle = async (id: number) => {
  return (await request(`${API_BASE_URL}/articles/${id}`)).data;
};

export const createArticle = (data: { title: string; content: string; }) => {
  return request(`${API_BASE_URL}/articles`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// --- Comments API ---

export const createComment = async ( data: {articleId: number, author_name: string; content: string }) => {
  return await request(`${API_BASE_URL}/articles/${data.articleId}/comments`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
