import React from 'react';
import './textRanking.scss';
type Tprops = {
  children: React.ReactNode;
  clasName?: string;
};
const TextRanking: React.FC<Tprops> = ({ children, clasName = '' }) => {
  return <h4 className={`TextRanking ${clasName}`}>{children}</h4>;
};

export default TextRanking;
