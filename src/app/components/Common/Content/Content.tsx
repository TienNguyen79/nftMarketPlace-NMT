import React from 'react';
import './content.scss';
interface TProps {
  children: React.ReactNode;
  className?: string;
}

const Content: React.FC<TProps> = ({ children, className = '' }) => {
  return <p className={`content ${className}`}>{children}</p>;
};

export default Content;
