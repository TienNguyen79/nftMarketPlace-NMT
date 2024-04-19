import React from 'react';
import './title.scss';
interface Tprops {
  children: React.ReactNode;
  className?: string;
}
const Title: React.FC<Tprops> = ({ children, className = '' }) => {
  return <h1 className={`title ${className}`}>{children}</h1>;
};

export default Title;
