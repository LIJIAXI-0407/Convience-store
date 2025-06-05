import React from "react";
import arrowLeftIcon from "../assets/images/icons/arrow-left-large.svg";

const BackArrow = () => {
  return (
    <div style={{ 
      display: 'flex',
      alignItems: 'center'
    }}>
      <img src={arrowLeftIcon} style={{ 
        width: '36px', 
        height: '34px',
        verticalAlign: 'middle'
      }} />
    </div>
  );
};

export default BackArrow; 