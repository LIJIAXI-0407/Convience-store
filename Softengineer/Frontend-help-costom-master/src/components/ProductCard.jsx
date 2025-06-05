import React from 'react';
import { useNavigate } from 'react-router-dom';
import candyImage from '../assets/images/products/Candy.png';

const ProductCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/product-modal');
  };

  return (
    <div 
      style={{
        position: 'absolute',
        top: '180px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '309px',
        height: '529px',
        backgroundColor: 'rgba(255, 223, 214, 0.65)',
        borderRadius: '30px',
        overflow: 'hidden',
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.08), 0px 4px 8px rgba(0, 0, 0, 0.06)',
        cursor: 'pointer'
      }}
      onClick={handleClick}
    >
      {/* 拱形装饰 */}
      <div style={{
        position: 'absolute',
        left: '65px',
        bottom: '0',
        width: '180px',
        height: '300px',
        backgroundColor: 'rgba(255, 254, 252, 0.74)',
        borderRadius: '90px 90px 0 0',
        boxShadow: 'inset 0px 2px 10px rgba(0, 0, 0, 0.05)',
        zIndex: 1
      }} />

      {/* 产品图片 */}
      <div style={{
        position: 'absolute',
        width: '284.254px',
        height: '504.397px',
        left: '12px',
        top: '12px',
        zIndex: 2
      }}>
        <img 
          src={candyImage} 
          alt="Strawberry Candy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transform: 'rotate(0.969deg)',
            borderRadius: '138.628px'
          }}
        />
      </div>

      {/* 标题 */}
      <div style={{
        position: 'absolute',
        top: '27px',
        left: '0',
        width: '100%',
        height: '80px',
        zIndex: 3,
        display: 'flex',
        justifyContent: 'center'
      }}>
        <h2 style={{
          fontFamily: 'SF Pro Display',
          fontSize: '32px',
          fontWeight: '700',
          margin: 0,
          lineHeight: '40px',
          textAlign: 'center'
        }}>
          Strawberry<br />
          Candy
        </h2>
      </div>

      {/* 原价 */}
      <div style={{
        position: 'absolute',
        left: '0',
        right: '0',
        bottom: '110px',
        height: '42px',
        zIndex: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <span style={{
          fontFamily: 'SF Pro Display',
          fontSize: '24px',
          fontWeight: '500',
          textDecoration: 'line-through',
          color: '#333'
        }}>
          $9.99
        </span>
      </div>

      {/* 现价 */}
      <div style={{
        position: 'absolute',
        left: '0',
        right: '0',
        bottom: '68px',
        height: '40px',
        zIndex: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <span style={{
          fontFamily: 'SF Pro Display',
          fontSize: '32px',
          fontWeight: '700',
          color: '#FF4D6D'
        }}>
          $0.99
        </span>
      </div>

      {/* 描述文字 */}
      <div style={{
        position: 'absolute',
        left: '75px',
        bottom: '20px',
        width: '158px',
        height: '35px',
        zIndex: 4
      }}>
        <p style={{
          fontFamily: 'SF Pro Display',
          fontSize: '10px',
          fontStyle: 'italic',
          margin: 0,
          color: '#666',
          textAlign: 'center'
        }}>
          A good sweety for child and girls
        </p>
        <p style={{
          fontFamily: 'SF Pro Display',
          fontSize: '10px',
          fontStyle: 'italic',
          margin: '4px 0 0 0',
          color: '#666',
          textAlign: 'center'
        }}>
          Strawberry with milk by germany
        </p>
      </div>
    </div>
  );
};

export default ProductCard; 