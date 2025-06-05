import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Plus, Minus } from 'lucide-react';
import closeIcon from '../../assets/images/icons/close.svg';
import useQuantityStore from '../../store/quantityStore';

const BigHambergPriceModal = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const addToCart = useQuantityStore(state => state.addToCart);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      navigate('/');
    }
  };

  const handleCloseClick = () => {
    navigate('/');
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      productName: 'Big Hamberg',
      price: 15.00,
      quantity: quantity
    });
    navigate('/');
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
            justifyContent: 'space-between'
          }}>
            <span>Big Hamberg</span>
            <span>$15.00</span>
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
            Sales 4000+
          </span>
        </div>

        {/* Introduce Section */}
        <div style={{
          marginLeft: '35px',
          marginTop: '12px',
          textAlign: 'left'
        }}>
          <h3 style={{
            fontFamily: 'SF Pro Display, sans-serif',
            fontSize: '24px',
            fontWeight: '500',
            margin: 0,
            textAlign: 'left'
          }}>
            Introduce
          </h3>
          <div style={{
            marginTop: '10px',
            width: '314.063px'
          }}>
            <p style={{
              color: '#222222',
              fontFamily: 'Rokkitt',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 100,
              lineHeight: '20px',
              letterSpacing: '0.2px',
              margin: 0,
              opacity: 1,
              maxWidth: '314.063px'
            }}>
              A hearty and delicious Big Hamberg, perfect for a filling meal.
            </p>
          </div>
        </div>

        {/* Quantity Controls */}
        <div style={{
          position: 'absolute',
          left: '35px',
          bottom: '45px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <button
            onClick={handleDecrement}
            style={{
              width: '37px',
              height: '37px',
              flexShrink: 0,
              borderRadius: '6px',
              background: 'transparent',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Minus size={16} color="#1A0101" />
          </button>
          <div style={{
            width: '37px',
            height: '37px',
            flexShrink: 0,
            borderRadius: '6px',
            background: '#1A0101',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{
              fontFamily: 'SF Pro Display, sans-serif',
              fontSize: '16px',
              fontWeight: '500',
              color: '#FFFFFF'
            }}>
              {quantity}
            </span>
          </div>
          <button
            onClick={handleIncrement}
            style={{
              width: '37px',
              height: '37px',
              flexShrink: 0,
              borderRadius: '6px',
              background: 'transparent',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Plus size={16} color="#1A0101" />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          className="interactive-btn"
          style={{
            position: 'absolute',
            right: '42px',
            bottom: '45px',
            width: '172px',
            height: '37px',
            flexShrink: 0,
            borderRadius: '10px',
            background: '#1DA1FA',
            color: '#fff',
            fontFamily: 'SF Pro Display, sans-serif',
            fontSize: '16px',
            fontWeight: '500',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
            ':hover': {
              backgroundColor: '#0e86e4'
            }
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BigHambergPriceModal; 