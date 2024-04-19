import React from 'react';
import './table.scss';

type Tprops = {
  children: React.ReactNode;
};
const Table: React.FC<Tprops> = ({ children }) => {
  return <div>{children}</div>;
};

export default Table;
