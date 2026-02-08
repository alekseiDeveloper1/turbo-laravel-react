
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from '../components/common/Loader';
import ErrorBoundary from '../components/common/ErrorBoundary';

const ArticleList = lazy(() => import('../pages/ArticleList'));
const ArticleDetail = lazy(() => import('../pages/ArticleDetail'));
const ArticleCreate = lazy(() => import('../pages/ArticleCreate'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <ArticleList />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/articles/create',
    element: <ArticleCreate />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/articles/:id',
    element: <ArticleDetail />,
    errorElement: <ErrorBoundary />,
  },
]);

const AppRouter = () => (
  <Suspense fallback={<Loader />}>
    <RouterProvider router={router} />
  </Suspense>
);

export default AppRouter;
