
import { renderHook, waitFor } from '@testing-library/react';
import { useArticles } from './useArticles';
import { getArticles } from '../services/api';

jest.mock('../services/api', () => ({
  getArticles: jest.fn(),
}));

const mockGetArticles = getArticles as jest.Mock;

describe('useArticles', () => {
  beforeEach(() => {
    mockGetArticles.mockReset();
  });

  it('should fetch and set articles', async () => {
    const articles = [{ id: 1, title: 'Test Article', content: 'Content' }];
    mockGetArticles.mockResolvedValue(articles);

    const { result } = renderHook(() => useArticles());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.articles).toEqual(articles);
    expect(result.current.error).toBeNull();
  });

  it('should handle loading state correctly', () => {
    const neverResolves = new Promise(() => {});
    mockGetArticles.mockReturnValue(neverResolves);
    
    const { result } = renderHook(() => useArticles());

    expect(result.current.loading).toBe(true);
  });

  it('should handle errors', async () => {
    const error = new Error('Failed to fetch');
    mockGetArticles.mockRejectedValue(error);

    const { result } = renderHook(() => useArticles());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toEqual(error);
    expect(result.current.articles).toEqual([]);
  });
});
