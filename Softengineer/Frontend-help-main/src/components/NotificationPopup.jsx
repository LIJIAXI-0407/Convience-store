import React from 'react';
import './NotificationPopup.css';

const NotificationPopup = () => {
  return (
    <div className="notification-popup">
      <div className="notification-item">
        <span className="red-dot"></span>
        <p className="notification-text">Coca-Cola inventory is below 5. Please restock promptly</p>
      </div>
    </div>
  );
};

export default NotificationPopup; 