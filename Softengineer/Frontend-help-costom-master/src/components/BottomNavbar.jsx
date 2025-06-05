import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, User, History } from 'lucide-react';
import scanIcon from '../assets/images/UI/scan.svg';
import cartIcon from '../assets/images/icons/Cart.svg';
import useQuantityStore from '../store/quantityStore';

const BottomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(null);
  const [clickedButton, setClickedButton] = useState(null);
  const cartItems = useQuantityStore(state => state.cartItems);

  const hasItems = cartItems.length > 0;

  // 定义公共文本样式
  const textStyle = {
    fontFamily: 'Urbanist, sans-serif',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '125%',
    letterSpacing: '0.24px'
  };

  const handleClick = (path) => {
    setActiveButton(path);
    setClickedButton(path);
    setTimeout(() => {
      setActiveButton(null);
      navigate(path);
    }, 200);
  };

  const isActive = (path) => {
    return location.pathname === path || clickedButton === path;
  };
  
  return (
    <div style={{
      position: 'fixed',
      bottom: '0',
      left: 0,
      right: 0,
      height: '82px',
      backgroundColor: '#FFFFFF',
      borderRadius: '30px 30px 0 0',
      boxShadow: '0px -5px 15px rgba(0, 0, 0, 0.1), 0px -2px 6px rgba(0, 0, 0, 0.05)'
    }}>
      <style>
        {`
          .nav-button {
            transition: transform 0.2s;
          }
          .nav-button:active {
            transform: scale(0.95);
          }
          .scan-button:active {
            transform: translateX(-50%) scale(0.95) !important;
            background: #1B91E0 !important;
          }
        `}
      </style>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '52px',
        padding: '0 25px',
        marginTop: '8px',
        position: 'relative'
      }}>
        {/* 左侧导航项容器 */}
        <div style={{
          display: 'flex',
          gap: '25px'
        }}>
          {/* Home */}
          <div 
            onClick={() => handleClick('/')}
            className={`nav-button ${activeButton === '/' ? 'active' : ''}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              width: '50px'
            }}
          >
            <div style={{
              marginBottom: '4px'
            }}>
              <Home 
                size={24} 
                color={isActive('/') ? "#000000" : "#A2A2A2"}
                fill="none"
              />
            </div>
            <span style={{
              ...textStyle,
              color: isActive('/') ? "#000000" : "#A2A2A2",
              fontWeight: isActive('/') ? "700" : "400"
            }}>Home</span>
          </div>
          
          {/* Cart */}
          <div 
            onClick={() => handleClick('/cart')}
            className={`nav-button ${activeButton === '/cart' ? 'active' : ''}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              width: '50px',
              position: 'relative'
            }}
          >
            <div style={{
              marginBottom: '4px',
              position: 'relative'
            }}>
              <img 
                src={cartIcon} 
                alt="Cart"
                style={{
                  width: '24px',
                  height: '24px',
                  filter: isActive('/cart') ? "brightness(0)" : 
                         hasItems ? "none" : 
                         "brightness(0) saturate(100%) invert(64%) sepia(9%) saturate(11%) hue-rotate(321deg) brightness(92%) contrast(87%)"
                }}
              />
              {hasItems && !isActive('/cart') && (
                <div style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#FF8A00',
                  border: '1px solid #FFFFFF'
                }} />
              )}
            </div>
            <span style={{
              ...textStyle,
              color: isActive('/cart') ? "#000000" : "#A2A2A2",
              fontWeight: isActive('/cart') ? "700" : "400"
            }}>Cart</span>
          </div>
        </div>

        {/* Center Button - Custom Scan */}
        <div 
          onClick={() => handleClick('/scan')}
          className="scan-button"
          style={{
            width: '65px',
            height: '65px',
            borderRadius: '100px',
            border: '2px solid #FFF',
            background: '#1DA1FA',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: '50%',
            bottom: '10px',
            transform: 'translateX(-50%)',
            cursor: 'pointer',
            zIndex: 2,
            transition: 'all 0.2s ease'
          }}>
          <img src={scanIcon} alt="Scan" style={{ width: '28px', height: '28px' }} />
        </div>

        {/* 右侧导航项容器 */}
        <div style={{
          display: 'flex',
          gap: '25px'
        }}>
          {/* Profile */}
          <div 
            onClick={() => handleClick('/member')}
            className={`nav-button ${activeButton === '/member' ? 'active' : ''}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              width: '50px'
            }}
          >
            <div style={{
              marginBottom: '4px'
            }}>
              <User 
                size={24} 
                color={isActive('/member') ? "#000000" : "#A2A2A2"}
                fill="none"
              />
            </div>
            <span style={{
              ...textStyle,
              color: isActive('/member') ? "#000000" : "#A2A2A2",
              fontWeight: isActive('/member') ? "700" : "400"
            }}>Profile</span>
          </div>
          
          {/* History */}
          <div 
            onClick={() => handleClick('/history')}
            className={`nav-button ${activeButton === '/history' ? 'active' : ''}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              width: '50px'
            }}
          >
            <div style={{
              marginBottom: '4px'
            }}>
              <History 
                size={24} 
                color={isActive('/history') ? "#000000" : "#A2A2A2"}
                fill="none"
              />
            </div>
            <span style={{
              ...textStyle,
              color: isActive('/history') ? "#000000" : "#A2A2A2",
              fontWeight: isActive('/history') ? "700" : "400"
            }}>History</span>
          </div>
        </div>
      </div>
      {/* 底部白色区域 */}
      <div style={{
        height: '22px',
        backgroundColor: '#FFFFFF',
        borderRadius: '0'
      }} />
    </div>
  );
};

export default BottomNavbar; 