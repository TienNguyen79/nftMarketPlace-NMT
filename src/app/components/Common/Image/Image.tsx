import React from 'react';
import './image.scss';
const Image = ({ link = '/avarta.png', className = '' }) => {
  return (
    <div className={`${className}`}>
      <img src={link} alt="t" className="image"></img>
    </div>
  );
};

export default Image;
