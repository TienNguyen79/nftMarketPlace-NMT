import React from 'react';
import './textbold.scss';
interface TProps {
  children: React.ReactNode;
  className?: string;
}

const TextBold: React.FC<TProps> = ({ children, className = '' }) => {
  return <h2 className={`textBold ${className}`}>{children}</h2>;
};

export default TextBold;
