
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ArticleList from './pages/ArticleList';
import ArticleDetail from './pages/ArticleDetail';
import ArticleCreate from './pages/ArticleCreate';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <header>
        <h1><a href="/">Article</a></h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/articles" />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/create" element={<ArticleCreate />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
