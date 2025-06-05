import React from 'react';
import { useNavigate } from 'react-router-dom';
import checkmarkIcon from '../../assets/images/icons/topcoat_checkmark.svg';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Success Icon Container */}
      <div style={{
        position: 'absolute',
        top: '170px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Outer Circle */}
        <div style={{
          width: '164px',
          height: '164px',
          flexShrink: 0,
          borderRadius: '200px',
          background: '#E0FFE5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '50px'
        }}>
          {/* Inner Circle */}
          <div style={{
            width: '100px',
            height: '100px',
            flexShrink: 0,
            borderRadius: '100px',
            background: '#4CD964',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {/* Checkmark Icon */}
            <img 
              src={checkmarkIcon}
              alt="Success"
              style={{
                width: '42px',
                height: '42px',
                flexShrink: 0
              }}
            />
          </div>
        </div>

        {/* Congratulations Text Container */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '130px'
        }}>
          <div style={{
            color: '#27214D',
            textAlign: 'center',
            fontFamily: 'Avenir',
            fontSize: '25px',
            fontStyle: 'normal',
            fontWeight: 550,
            lineHeight: '24px',
            letterSpacing: '-0.3px'
          }}>
            Congratulations!!!
          </div>
          <div style={{
            width: '350px',
            color: '#27214D',
            textAlign: 'center',
            fontFamily: 'Avenir',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 450,
            lineHeight: '30px',
            letterSpacing: '-0.2px'
          }}>
            <div>Your order have been taken and</div>
            <div>is being attended to</div>
          </div>
        </div>

        {/* Continue Shopping Button */}
        <button
          onClick={handleContinueShopping}
          className="interactive-btn"
          style={{
            display: 'inline-flex',
            padding: '16px 32px',
            alignItems: 'center',
            gap: '10px',
            borderRadius: '10px',
            border: '1px solid #1DA1FA',
            background: 'transparent',
            cursor: 'pointer',
            color: '#1DA1FA',
            textAlign: 'center',
            fontFamily: 'SF Pro Display',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '24px',
            letterSpacing: '-0.16px',
            transition: 'all 0.2s ease'
          }}
        >
          Continue shopping
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess; 