import React from 'react';
import '../footer.scss';
import { Link } from 'react-router-dom';
interface Tprops {
  children: React.ReactNode;
  to?: string;
  className?: string;
}
const Content: React.FC<Tprops> = ({ children, to = '', className = '' }) => {
  if (to) {
    return (
      <Link to={to} className="content-foot">
        {children}
      </Link>
    );
  }
  return <p className={`content-foot ${className}`}>{children}</p>;
};

export default Content;
