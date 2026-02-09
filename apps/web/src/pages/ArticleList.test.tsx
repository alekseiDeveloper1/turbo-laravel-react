
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ArticleList from './ArticleList';
import { useArticles } from '../hooks/useArticles';

jest.mock('../hooks/useArticles');

const mockUseArticles = useArticles as jest.Mock;

describe('ArticleList', () => {
  it('should render loading state initially', () => {
    mockUseArticles.mockReturnValue({ articles: [], loading: true, error: null });

    render(
      <MemoryRouter>
        <ArticleList />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render error message if fetching fails', () => {
    mockUseArticles.mockReturnValue({ articles: [], loading: false, error: new Error('Failed to fetch') });

    render(
      <MemoryRouter>
        <ArticleList />
      </MemoryRouter>
    );

    expect(screen.getByText(/Ошибка при загрузке статей/)).toBeInTheDocument();
  });

  it('should render a list of articles', async () => {
    const articles = [
      { id: 1, title: 'Test Article 1', content: 'Content 1' },
      { id: 2, title: 'Test Article 2', content: 'Content 2' },
    ];
    mockUseArticles.mockReturnValue({ articles, loading: false, error: null });

    render(
      <MemoryRouter>
        <ArticleList />
      </MemoryRouter>
    );

    await waitFor(() => {
        expect(screen.getByText('Test Article 1')).toBeInTheDocument();
        expect(screen.getByText('Test Article 2')).toBeInTheDocument();
    });
  });
});
