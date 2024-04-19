import React from 'react';
import './suspenseFallbback.scss';
const SuspenseFallback = () => {
  return (
    <div className="box-loading">
      <img className="loading-img" src="/loadingP2.gif" alt="loading"></img>
    </div>
  );
};

export default SuspenseFallback;
