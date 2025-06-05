import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import closeIcon from '../../assets/images/icons/close.svg';
import GoldStar from '../../assets/images/icons/Gold_Star.svg';
import QRCode from '../../assets/images/products/QR_codesvg.png';

const FootballPriceModal = () => {
  const navigate = useNavigate();

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      navigate('/member');
    }
  };

  const handleCloseClick = () => {
    navigate('/member');
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'flex-end',
        zIndex: 1000
      }}
      onClick={handleBackdropClick}
    >
      <div 
        style={{
          width: '393px',
          height: '370px',
          backgroundColor: '#FBFBFD',
          borderRadius: '25px 25px 0 0',
          margin: '0 auto',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <div
          onClick={handleCloseClick}
          style={{
            position: 'absolute',
            top: '-17.5px',
            right: '27px',
            width: '35px',
            height: '35px',
            borderRadius: '50%',
            backgroundColor: '#1DA1FA',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            boxShadow: '0px 2px 4px rgba(29, 161, 250, 0.3)',
            overflow: 'hidden'
          }}
        >
          <img 
            src={closeIcon} 
            alt="Close" 
            style={{
              width: '45px',
              height: '45px',
              margin: '-5px',
              filter: 'contrast(150%) brightness(900%)',
              transform: 'scale(1.2)',
              opacity: 0.9
            }}
          />
        </div>

        {/* Product Title */}
        <div style={{
          marginLeft: '35px',
          marginRight: '33px',
          marginTop: '30px',
          textAlign: 'left'
        }}>
          <h2 style={{
            fontFamily: 'SF Pro Display, sans-serif',
            fontSize: '24px',
            fontWeight: '600',
            margin: 0,
            textAlign: 'left',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>Football</span>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: '8px'
            }}>
              <img 
                src={GoldStar} 
                alt="Star"
                style={{
                  width: '28px',
                  height: '28px'
                }}
              />
              <span style={{
                fontSize: '24px',
                fontWeight: 600,
              }}>
                ×1000
              </span>
            </div>
          </h2>
        </div>

        {/* Sales Info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: '35px',
          marginTop: '10px'
        }}>
          <Star size={16} color="#A2A2A2" fill="#A2A2A2" style={{ marginRight: '5px' }} />
          <span style={{
            fontFamily: 'SF Pro Display, sans-serif',
            fontSize: '15px',
            fontStyle: 'italic',
            color: '#A2A2A2'
          }}>
            Sales 2455+
          </span>
        </div>

        {/* Activity Statement Title */}
        <div style={{
          marginLeft: '35px',
          marginTop: '12px',
          textAlign: 'left'
        }}>
          <h3 style={{
            fontFamily: 'SF Pro Display, sans-serif',
            fontSize: '20px',
            fontWeight: '500',
            margin: 0,
            textAlign: 'left',
            color: '#666666'
          }}>
            Activity Statement
          </h3>
        </div>

        {/* QR Code */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '10px'
        }}>
          <img 
            src={QRCode}
            alt="QR Code"
            style={{
              width: '200px',
              height: '200px'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FootballPriceModal; 