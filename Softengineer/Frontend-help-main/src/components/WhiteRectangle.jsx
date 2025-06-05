import React from 'react';
import './WhiteRectangle.css';

const WhiteRectangle = ({ title, children }) => {
  return (
    <div className="dashboard-rectangle">
      {title && <div className="recent-order-title">{title}</div>}
      {children}
    </div>
  );
};

export default WhiteRectangle; 