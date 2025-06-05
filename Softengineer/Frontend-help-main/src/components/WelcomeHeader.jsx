import React from 'react';
import './WelcomeHeader.css';

const WelcomeHeader = () => {
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="welcome-header">
      <div className="welcome-title">Welcome, Jack.</div>
      <div className="welcome-date">{dateString}</div>
    </div>
  );
};

export default WelcomeHeader; 