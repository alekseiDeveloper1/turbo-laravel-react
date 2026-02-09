
import React from 'react';
import './Loader.scss';

const Loader: React.FC = () => {
  return (
    <div className="loader-container" data-testid="loader">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
