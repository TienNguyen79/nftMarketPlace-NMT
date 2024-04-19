import React from 'react';
import './layoutOption.scss';
interface TProps {
  children: React.ReactNode;
}
const LayoutOption: React.FC<TProps> = ({ children }) => {
  return <div className="layoutOtion">{children}</div>;
};

export default LayoutOption;
