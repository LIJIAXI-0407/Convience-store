import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavbar from '../../components/BottomNavbar';
import Avatar from '../../components/Avatar';
import CatBg from '../../assets/images/UI/Cat.png';
import GoldStar from '../../assets/images/icons/Gold_Star.svg';
import OrangeJuice from '../../assets/images/UI/Orange Juice.jpg';
import Doll from '../../assets/images/UI/Doll.jpg';
import Football from '../../assets/images/UI/Football.jpg';
import PinIcon from '../../assets/images/icons/pin-angle.svg';
import useUserStore from '../../store/userStore';

const Member = () => {
  const navigate = useNavigate();
  const currentUser = useUserStore(state => state.currentUser);
  const [isShaking, setIsShaking] = useState(false);
  const [helloText, setHelloText] = useState('');
  const [nameText, setNameText] = useState('');
  const [showCard, setShowCard] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  // Typewriter effect for Hello
  useEffect(() => {
    const text = 'Hello,';
    let currentIndex = 0;
    
    const intervalId = setInterval(() => {
      if (currentIndex <= text.length) {
        setHelloText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
        // Start username animation after Hello is complete
        startNameAnimation();
      }
    }, 100); // Speed of typing

    return () => clearInterval(intervalId);
  }, []);

  // Typewriter effect for username
  const startNameAnimation = () => {
    if (!currentUser?.username) return;
    
    const text = currentUser.username;
    let currentIndex = 0;
    
    const intervalId = setInterval(() => {
      if (currentIndex <= text.length) {
        setNameText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 100); // Speed of typing

    return () => clearInterval(intervalId);
  };

  // Handle long press for card shake
  let pressTimer = null;
  const startPress = () => {
    pressTimer = setTimeout(() => {
      setIsShaking(true);
    }, 500);
  };

  const endPress = () => {
    clearTimeout(pressTimer);
    setIsShaking(false);
  };

  // Add fade-in sequence
  useEffect(() => {
    const timers = [
      setTimeout(() => setShowCard(true), 1200), // After name animation
      setTimeout(() => setShowProducts(true), 1500), // After card
      setTimeout(() => setShowDescription(true), 1800) // After products
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  if (!currentUser) return null;

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      position: 'relative',
      overflow: 'hidden',
      padding: '0 25px'
    }}>
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }

          @keyframes shake {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-1deg); }
            50% { transform: rotate(0deg); }
            75% { transform: rotate(1deg); }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .cursor {
            display: inline-block;
            width: 2px;
            height: 1em;
            background-color: #000;
            margin-left: 2px;
            animation: blink 0.7s infinite;
          }

          .shake {
            animation: shake 0.15s infinite;
          }

          .fade-in {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeIn 0.8s ease-out forwards;
          }
        `}
      </style>

      <div style={{
        position: 'relative',
        paddingTop: '60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: '60px',
        paddingLeft: '10px',
        maxWidth: '325px'
      }}>
        {/* Hello Text and Name */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{
            width: '120px',
            display: 'flex',
            alignItems: 'flex-start',
            marginLeft: '0'
          }}>
            <span style={{
              color: '#000',
              fontFamily: 'SF Pro Display',
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: 300,
              lineHeight: 'normal',
              whiteSpace: 'nowrap'
            }}>
              {helloText}
              {helloText.length < 6 && <span className="cursor" />}
            </span>
          </div>
          <div style={{
            width: '120px',
            height: '35px',
            flexShrink: 0,
            marginLeft: '0'
          }}>
            <span style={{
              color: '#000',
              fontFamily: 'SF Pro Display',
              fontSize: '28px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '32px',
              letterSpacing: '0px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: 'block',
              maxWidth: '120px'
            }}>
              {nameText}
              {nameText !== currentUser.username && <span className="cursor" />}
            </span>
          </div>
        </div>

        <Avatar />
      </div>

      {/* Member Card */}
      <div 
        onTouchStart={startPress}
        onTouchEnd={endPress}
        onMouseDown={startPress}
        onMouseUp={endPress}
        onMouseLeave={endPress}
        className={`${isShaking ? 'shake' : ''} ${showCard ? 'fade-in' : ''}`}
        style={{
          width: '325px',
          height: '210px',
          flexShrink: 0,
          borderRadius: '15px',
          border: '1px solid rgba(0, 0, 0, 0.11)',
          backgroundImage: `url(${CatBg})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundColor: '#4B7BF5',
          marginTop: '24px',
          marginLeft: '5px',
          position: 'relative',
          cursor: 'pointer',
          opacity: showCard ? 1 : 0
        }}
      >
        {/* Reward Text */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '15px'
        }}>
          <span style={{
            color: '#FFFEFE',
            fontFamily: 'SF Pro Display',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: '32px'
          }}>
            REWARD
          </span>
        </div>

        {/* Points Display with Star */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '20px',
          display: 'flex',
          alignItems: 'flex-end'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'baseline'
          }}>
            <span style={{
              color: '#FFFAFA',
              fontFamily: 'SF Pro Display',
              fontSize: '24px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '32px'
            }}>
              {(currentUser?.reword || 0)}
            </span>
            <span style={{
              color: '#FFFAFA',
              fontFamily: 'SF Pro Display',
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '32px',
              marginLeft: '2px'
            }}>
              / 1000
            </span>
          </div>
          <img 
            src={GoldStar} 
            alt="Gold Star"
            style={{
              width: '30px',
              height: '30px',
              marginLeft: '8px',
              transform: 'translateY(-6px)'
            }}
          />
        </div>
      </div>

      {/* Product Squares */}
      <div 
        className={showProducts ? 'fade-in' : ''}
        style={{
          display: 'flex',
          gap: '12px',
          marginTop: '24px',
          marginLeft: '5px',
          opacity: showProducts ? 1 : 0
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div 
            onClick={() => navigate('/member/orange-juice-modal')}
            style={{
              width: '100px',
              height: '100px',
              flexShrink: 0,
              borderRadius: '10px',
              background: `url(${OrangeJuice}) lightgray 50% / cover no-repeat`,
              cursor: 'pointer'
            }}
          />
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px',
            marginTop: '8px' 
          }}>
            <img 
              src={PinIcon} 
              alt="pin"
              style={{
                width: '12px',
                height: '12px',
                flexShrink: 0
              }}
            />
            <span style={{
              color: '#9D9D9D',
              fontFamily: 'SF Pro Display',
              fontSize: '8px',
              fontStyle: 'italic',
              fontWeight: 200,
              lineHeight: '125%',
              letterSpacing: '0.16px'
            }}>
              Orange Juice
            </span>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0px',
            marginTop: '4px',
            marginLeft: '-4px'
          }}>
            <img 
              src={GoldStar} 
              alt="Gold Star"
              style={{
                width: '19.679px',
                height: '19px',
                flexShrink: 0,
                marginLeft: '4px'
              }}
            />
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
              ×100
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div 
            onClick={() => navigate('/member/strawberry-doll-modal')}
            style={{
              width: '100px',
              height: '100px',
              flexShrink: 0,
              borderRadius: '10px',
              background: `url(${Doll}) lightgray 50% / cover no-repeat`,
              cursor: 'pointer'
            }}
          />
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px',
            marginTop: '8px' 
          }}>
            <img 
              src={PinIcon} 
              alt="pin"
              style={{
                width: '12px',
                height: '12px',
                flexShrink: 0
              }}
            />
            <span style={{
              color: '#9D9D9D',
              fontFamily: 'SF Pro Display',
              fontSize: '8px',
              fontStyle: 'italic',
              fontWeight: 200,
              lineHeight: '125%',
              letterSpacing: '0.16px'
            }}>
              Strawberry Doll
            </span>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0px',
            marginTop: '4px',
            marginLeft: '-4px'
          }}>
            <img 
              src={GoldStar} 
              alt="Gold Star"
              style={{
                width: '19.679px',
                height: '19px',
                flexShrink: 0,
                marginLeft: '4px'
              }}
            />
            <span style={{
              width: '59.036px',
              height: '27px',
              flexShrink: 0,
              color: '#000',
              fontFamily: 'SF Pro Display',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '32px',
              letterSpacing: '0px'
            }}>
              ×500
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div 
            onClick={() => navigate('/member/football-modal')}
            style={{
              width: '100px',
              height: '100px',
              flexShrink: 0,
              borderRadius: '10px',
              background: `url(${Football}) lightgray 50% / cover no-repeat`,
              cursor: 'pointer'
            }}
          />
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px',
            marginTop: '8px' 
          }}>
            <img 
              src={PinIcon} 
              alt="pin"
              style={{
                width: '12px',
                height: '12px',
                flexShrink: 0
              }}
            />
            <span style={{
              color: '#9D9D9D',
              fontFamily: 'SF Pro Display',
              fontSize: '8px',
              fontStyle: 'italic',
              fontWeight: 200,
              lineHeight: '125%',
              letterSpacing: '0.16px'
            }}>
              Football
            </span>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0px',
            marginTop: '4px',
            marginLeft: '-4px'
          }}>
            <img 
              src={GoldStar} 
              alt="Gold Star"
              style={{
                width: '19.679px',
                height: '19px',
                flexShrink: 0,
                marginLeft: '4px'
              }}
            />
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
              ×1000
            </span>
          </div>
        </div>
      </div>

      {/* Points Program Description */}
      <div 
        className={showDescription ? 'fade-in' : ''}
        style={{
          width: '325px',
          height: 'auto',
          flexShrink: 0,
          color: '#9D9D9D',
          fontFamily: 'SF Pro Display',
          fontSize: '11px',
          fontStyle: 'normal',
          fontWeight: 300,
          lineHeight: '12px',
          letterSpacing: '0.2px',
          marginTop: '12px',
          marginLeft: '5px',
          textAlign: 'left',
          paddingRight: '10px',
          opacity: showDescription ? 1 : 0
        }}
      >
        <div style={{ marginBottom: '4px' }}>Dear User:</div>
        <div style={{ marginBottom: '4px' }}>To express our gratitude for your continued support and trust, we are launching a points reward program.</div>
        <div style={{ marginBottom: '2px' }}>How to Earn Points</div>
        <div style={{ marginBottom: '4px' }}>Spending Reward: Earn 1 point for every 1 yuan spent</div>
        <div style={{ marginBottom: '2px' }}>Important Notes</div>
        <div style={{ marginBottom: '2px' }}>Points are non-transferable and can only be used by the account holder</div>
        <div style={{ marginBottom: '2px' }}>Our company reserves the right of final interpretation</div>
        <div>If you have any questions, please contact customer service: 400-123-345</div>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNavbar />
    </div>
  );
};

export default Member; 