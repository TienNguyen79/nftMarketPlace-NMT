import React from 'react';
import './gap.scss';
interface TProps {
  children: React.ReactNode;
  className?: string;
}
const Gap: React.FC<TProps> = ({ children, className }) => {
  return <div className={`gap ${className}`}>{children}</div>;
};

export default Gap;
