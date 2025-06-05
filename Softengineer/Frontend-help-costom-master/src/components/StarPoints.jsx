import React from 'react';
import starIcon from '../assets/images/icons/star.svg';

const StarPoints = ({ points }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <span style={{
        width: '59.036px',
        height: '27px',
        flexShrink: 0,
        color: '#000',
        fontFamily: 'SF Pro Display',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: '32px',
        letterSpacing: '0px'
      }}>
        {points}
      </span>
      <img 
        src={starIcon} 
        alt="Star Points"
        style={{
          width: '19.679px',
          height: '19px',
          flexShrink: 0
        }}
      />
    </div>
  );
};

export default StarPoints; 