import React from 'react';
import './textmono.scss';
interface TProps {
  children: React.ReactNode;
  className?: string;
}

const TextMono: React.FC<TProps> = ({ children, className = '' }) => {
  return <h2 className={`textMono ${className}`}>{children}</h2>;
};

export default TextMono;
