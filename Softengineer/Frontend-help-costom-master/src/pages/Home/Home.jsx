import React, { useState, useRef } from "react"; 
import { useNavigate } from "react-router-dom";
import BottomNavbar from "../../components/BottomNavbar";
import BackArrow from "../../components/BackArrow";
import ProductCardsSlider from "../../components/ProductCardsSlider";
import aiAssistant from "../../assets/images/UI/18. Hello Chat Bot.png";
import storeIllustration from "../../assets/images/UI/Illustration STORE.png";
import topPickIcon from "../../assets/images/icons/TOP PICK.svg";
import bubbleTeaIcon from "../../assets/images/icons/asian-food-bubble-milk-tea-taiwanese-tapioka-boba-56.svg";
import burgerIcon from "../../assets/images/icons/fast-food-double-burger-6.svg";
import comingSoonIcon from "../../assets/images/icons/cooming soon.svg";
import threeInOneImage from "../../assets/images/products/3in1.jpg";
import yogurtImage from "../../assets/images/products/Yogurt.jpg";
import latteImage from "../../assets/images/products/LATTE.jpg";
import pastaImage from "../../assets/images/products/pasta.jpg";
import hambergImage from "../../assets/images/products/Hamberg.jpg";
import takoImage from "../../assets/images/products/TAKO.jpg";
import iceCreamBanner from "../../assets/images/products/ICE CREAM BANNER.png";
import orangeJuiceImage from "../../assets/images/products/Orange Juice.png";
import smoothImage from "../../assets/images/products/Smooth.png";

// 定义浮动动画的样式
const floatingAnimation = {
  '@keyframes floating': {
    '0%': {
      transform: 'translate(0, 0)',
    },
    '25%': {
      transform: 'translate(5px, 5px)',
    },
    '50%': {
      transform: 'translate(0, 10px)',
    },
    '75%': {
      transform: 'translate(-5px, 5px)',
    },
    '100%': {
      transform: 'translate(0, 0)',
    },
  },
};

const Home = () => {
  const navigate = useNavigate();
  const [isShaking, setIsShaking] = useState(true);
  const [showText, setShowText] = useState(false);
  const [enlargedImageUrl, setEnlargedImageUrl] = useState(null);
  const topPickRef = useRef(null);
  const drinksRef = useRef(null);
  const goFoodRef = useRef(null);
  const upcomingRef = useRef(null);

  const handleBack = () => {
    // Clear any stored login data
    localStorage.removeItem('userToken'); // Remove authentication token
    localStorage.removeItem('userData'); // Remove user data if stored
    sessionStorage.clear(); // Clear session storage
    
    // Navigate to login page
    navigate('/login', { replace: true });
  };

  const handleAIClick = () => {
    navigate('/ai-chat');
  };

  const handleStoreClick = () => {
    if (!showText) {
      setIsShaking(false);
      setShowText(true);
    } else {
      setIsShaking(true);
      setShowText(false);
    }
  };

  const handleEnlargeImage = (imageUrl) => {
    setEnlargedImageUrl(imageUrl);
  };

  const handleCloseEnlarged = () => {
    setEnlargedImageUrl(null);
  };

  const handleNavigation = (ref) => {
    // Calculate the target scroll position considering the fixed bottom navbar
    const element = ref.current;
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.scrollY;
      const bottomNavbarHeight = 80; // Approximate height of the fixed bottom navbar
      // Scroll slightly above the element to account for the bottom navbar
      const scrollToPosition = absoluteElementTop - window.innerHeight + bottomNavbarHeight + 20; // 20px buffer

      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div style={{
      width: '100%', 
      height: '100vh',
      overflowX: 'hidden',
      overflowY: 'auto',
      backgroundColor: '#fff',
      paddingBottom: '80px',
      paddingLeft: '30px',
      paddingRight: '20px'
    }}>
      <style>
        {`
          @keyframes floating {
            0% { transform: translate(0, 0); }
            25% { transform: translate(5px, 5px); }
            50% { transform: translate(0, 10px); }
            75% { transform: translate(-5px, 5px); }
            100% { transform: translate(0, 0); }
          }
          .floating-ai {
            animation: floating 3s ease-in-out infinite;
          }

          @keyframes shake {
            0% { transform: rotate(0deg); }
            25% { transform: rotate(-0.3deg); }
            50% { transform: rotate(0deg); }
            75% { transform: rotate(0.3deg); }
            100% { transform: rotate(0deg); }
          }
          .shake-store {
            animation: shake 1s ease-in-out infinite;
            transform-origin: center center;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .shake-store:hover {
            transform: scale(1.02);
          }

          @keyframes expandCircle {
            0% {
              clip-path: circle(0% at 50% 50%);
              opacity: 0;
            }
            100% {
              clip-path: circle(100% at 50% 50%);
              opacity: 1;
            }
          }

          .store-text-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            pointer-events: none;
          }

          .store-text {
            position: relative;
            color: #C93;
            font-family: Degular, sans-serif;
            font-size: 24px;
            font-style: normal;
            font-weight: 700;
            line-height: 100%;
            text-align: center;
            opacity: 0;
            background: rgba(255, 255, 255, 0.85);
            padding: 12px 20px;
            border-radius: 15px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            max-width: 80%;
          }

          .store-text.show {
            animation: expandCircle 0.5s ease-out forwards;
          }

          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.03); }
            100% { transform: scale(1); }
          }
          .pulse-store {
            animation: pulse 1.5s ease-in-out infinite;
          }

          * {
            max-width: 100vw;
            box-sizing: border-box;
          }
        `}
      </style>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '40px 20px 20px 20px',
        backgroundColor: '#fff'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <div onClick={handleBack} style={{ cursor: 'pointer' }}>
            <BackArrow />
          </div>
          <h1 style={{ 
            fontFamily: 'SF Pro Display, sans-serif',
            fontSize: '28px',
            fontWeight: '800',
            margin: 0,
            lineHeight: '30px'
          }}>Welcome</h1>
        </div>
        
        <img 
          src={aiAssistant} 
          alt="AI Assistant"
          onClick={handleAIClick}
          style={{
            width: '70px',
            height: '70px',
            cursor: 'pointer'
          }}
        />
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '5px'
      }}>
        <div style={{ 
          position: 'relative',
          width: '285px',
          height: '285px',
          marginBottom: '15px'
        }}>
          {/* 灰色渐变圆形装饰 */}
          <div style={{
            position: 'absolute',
            left: '50%',
            bottom: '-10px',
            width: '300px',
            height: '300px',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle, rgba(225, 220, 225, 0.3) 0%, rgba(190, 185, 190, 0.15) 100%)',
            borderRadius: '50%',
            zIndex: 1,
            filter: 'blur(8px)'
          }} />
          
          <img 
            src={storeIllustration}
            alt="Store Illustration"
            className={isShaking ? "shake-store pulse-store" : ""}
            onClick={handleStoreClick}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              position: 'relative',
              zIndex: 2
            }}
          />
          <div className="store-text-container" style={{ zIndex: 3 }}>
            <div className={`store-text ${showText ? 'show' : ''}`}>
              Eat Chicken AI-powered store
            </div>
          </div>
        </div>

        {/* 四个图标 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px',
          marginBottom: '40px',
          width: '328px',
          padding: '0 10px'
        }}>
          {/* Top Pick 图标 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}>
            <img 
              src={topPickIcon}
              alt="Top Pick"
              style={{
                width: '32px',
                height: '32px',
                cursor: 'pointer'
              }}
              onClick={() => handleNavigation(topPickRef)}
            />
            <span style={{
              fontFamily: 'SF Pro Display',
              fontSize: '14px',
              color: '#666',
              whiteSpace: 'nowrap'
            }}>Top-Pick</span>
          </div>

          {/* Drinks 图标 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}>
            <img 
              src={bubbleTeaIcon}
              alt="Drinks"
              style={{
                width: '32px',
                height: '32px',
                cursor: 'pointer'
              }}
              onClick={() => handleNavigation(drinksRef)}
            />
            <span style={{
              fontFamily: 'SF Pro Display',
              fontSize: '14px',
              color: '#666',
              whiteSpace: 'nowrap'
            }}>Drinks</span>
          </div>

          {/* Go Food 图标 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}>
            <img 
              src={burgerIcon}
              alt="Go Food"
              style={{
                width: '32px',
                height: '32px',
                cursor: 'pointer'
              }}
              onClick={() => handleNavigation(goFoodRef)}
            />
            <span style={{
              fontFamily: 'SF Pro Display',
              fontSize: '14px',
              color: '#666',
              whiteSpace: 'nowrap'
            }}>Go Food</span>
          </div>

          {/* Upcoming 图标 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}>
            <img 
              src={comingSoonIcon}
              alt="Upcoming"
              style={{
                width: '32px',
                height: '32px',
                cursor: 'pointer'
              }}
              onClick={() => handleNavigation(upcomingRef)}
            />
            <span style={{
              fontFamily: 'SF Pro Display',
              fontSize: '14px',
              color: '#666',
              whiteSpace: 'nowrap'
            }}>Upcoming</span>
          </div>
        </div>

        {/* ProductCardsSlider (Top-Pick Content) */}
        <div ref={topPickRef} style={{ 
          marginBottom: '30px'
        }}>
          <ProductCardsSlider />
        </div>
        
        {/* Drinks Section Header */}
        <div style={{
          color: '#000',
          fontFamily: 'SF Pro Display, sans-serif',
          fontSize: '28px',
          fontStyle: 'normal',
          fontWeight: '700',
          lineHeight: '32px',
          letterSpacing: '0px',
          textAlign: 'left',
          marginBottom: '20px',
          paddingLeft: '10px',
          width: '100%'
        }}>
          Drinks
        </div>

        {/* Drinks Content */}
        <div ref={drinksRef} style={{
          marginLeft: '35px',
          marginBottom: '40px',
          display: 'flex',
          gap: '15px',
          overflowX: 'auto',
          flexWrap: 'nowrap',
          paddingRight: '35px', // Add padding to see the last card clearly when scrolling
          /* Hide scrollbar for Chrome, Safari and Opera */
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          /* Hide scrollbar for IE, Edge and Firefox */
          msOverflowStyle: 'none',  /* IE and Edge */
          scrollbarWidth: 'none'  /* Firefox */
        }}>
          <div style={{
            border: '1px solid #E5E5E5',
            borderRadius: '12px',
            padding: '8px',
            backgroundColor: '#fff',
            flexShrink: 0
          }}>
            <div style={{
              width: '130px',
              height: '130px',
              backgroundColor: '#F5F5F5',
              borderRadius: '10px',
              marginBottom: '8px',
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer'
            }}>
              <img 
                src={threeInOneImage}
                alt="3 in 1 Coffee"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '10px'
                }}
                onClick={() => navigate('/cafe-beverage-modal')}
              />
            </div>

            <div style={{
              width: '130px',
              fontFamily: 'SF Pro Display, sans-serif',
              fontSize: '14px',
              lineHeight: '1.2',
              color: '#000',
              textAlign: 'left'
            }}>
              <div style={{ marginBottom: '2px' }}>Buy 2，Free 1</div>
              <div style={{ marginBottom: '4px' }}>Cafe Beverage</div>
              <div style={{ 
                color: '#1DA1FA',
                fontWeight: '300',
                fontSize: '16px'
              }}>
                $13
              </div>
            </div>
          </div>

          <div style={{
            border: '1px solid #E5E5E5',
            borderRadius: '12px',
            padding: '8px',
            backgroundColor: '#fff',
            flexShrink: 0
          }}>
            <div style={{
              width: '130px',
              height: '130px',
              backgroundColor: '#F5F5F5',
              borderRadius: '10px',
              marginBottom: '8px',
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer'
            }}>
              <img 
                src={yogurtImage}
                alt="Pink Yogurt"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/yogurt-modal')}
              />
            </div>

            <div style={{
              width: '130px',
              fontFamily: 'SF Pro Display, sans-serif',
              fontSize: '14px',
              lineHeight: '1.2',
              color: '#000',
              textAlign: 'left'
            }}>
              <div style={{ marginBottom: '2px' }}>Pink Yogurt </div>
              <div style={{ marginBottom: '4px' }}>Milk Beverage</div>
              <div style={{ 
                color: '#1DA1FA',
                fontWeight: '300',
                fontSize: '16px'
              }}>
                $8
              </div>
            </div>
          </div>

          <div style={{
            border: '1px solid #E5E5E5',
            borderRadius: '12px',
            padding: '8px',
            backgroundColor: '#fff',
            flexShrink: 0
          }}>
            <div style={{
              width: '130px',
              height: '130px',
              backgroundColor: '#F5F5F5',
              borderRadius: '10px',
              marginBottom: '8px',
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img 
                src={latteImage}
                alt="Iced Latte"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/iced-latte-modal')}
              />
            </div>

            <div style={{
              width: '130px',
              fontFamily: 'SF Pro Display, sans-serif',
              fontSize: '14px',
              lineHeight: '1.2',
              color: '#000',
              textAlign: 'left'
            }}>
              <div style={{ marginBottom: '2px' }}>Iced Latte</div>
              <div style={{ marginBottom: '4px' }}>Coffee Beverage</div>
              <div style={{ 
                color: '#1DA1FA',
                fontWeight: '300',
                fontSize: '16px'
              }}>
                $9
              </div>
            </div>
          </div>
        </div>

        {/* Go Food Section Header */}
        <div style={{
          color: '#000',
          fontFamily: 'SF Pro Display, sans-serif',
          fontSize: '28px',
          fontStyle: 'normal',
          fontWeight: '700',
          lineHeight: '32px',
          letterSpacing: '0px',
          textAlign: 'left',
          marginBottom: '20px',
          paddingLeft: '-5px',
          marginLeft: '-210px'
        }}>
          Go Food
        </div>

        {/* Go Food Content */}
        <div ref={goFoodRef} style={{
          marginLeft: '35px',
          marginBottom: '40px',
          display: 'flex',
          gap: '15px',
          overflowX: 'auto',
          flexWrap: 'nowrap',
          paddingRight: '35px', // Add padding to see the last card clearly when scrolling
          /* Hide scrollbar for Chrome, Safari and Opera */
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          /* Hide scrollbar for IE, Edge and Firefox */
          msOverflowStyle: 'none',  /* IE and Edge */
          scrollbarWidth: 'none'  /* Firefox */
        }}>
          {/* 第一个方块和文字 - Pasta */}
          <div style={{
            border: '1px solid #E5E5E5',
            borderRadius: '12px',
            padding: '8px',
            backgroundColor: '#fff',
            flexShrink: 0
          }}>
            <div style={{
              width: '130px',
              height: '130px',
              backgroundColor: '#F5F5F5',
              borderRadius: '10px',
              marginBottom: '8px',
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img 
                src={pastaImage}
                alt="Pasta"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/delicious-pasta-modal')}
              />
            </div>

            <div style={{
              width: '130px',
              fontFamily: 'SF Pro Display, sans-serif',
              fontSize: '14px',
              lineHeight: '1.2',
              color: '#000',
              textAlign: 'left'
            }}>
              <div style={{ marginBottom: '2px' }}>Delicious Pasta</div>
              <div style={{ marginBottom: '4px' }}>Italian Food</div>
              <div style={{ 
                color: '#1DA1FA',
                fontWeight: '300',
                fontSize: '16px'
              }}>
                $12
              </div>
            </div>
          </div>

          {/* 第二个方块和文字 - Hamberg */}
          <div style={{
            border: '1px solid #E5E5E5',
            borderRadius: '12px',
            padding: '8px',
            backgroundColor: '#fff',
            flexShrink: 0
          }}>
            <div style={{
              width: '130px',
              height: '130px',
              backgroundColor: '#F5F5F5',
              borderRadius: '10px',
              marginBottom: '8px',
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img 
                src={hambergImage}
                alt="Hamberg"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/big-hamberg-modal')}
              />
            </div>

            <div style={{
              width: '130px',
              fontFamily: 'SF Pro Display, sans-serif',
              fontSize: '14px',
              lineHeight: '1.2',
              color: '#000',
              textAlign: 'left'
            }}>
              <div style={{ marginBottom: '2px' }}>Big Hamberg</div>
              <div style={{ marginBottom: '4px' }}>Fast Food</div>
              <div style={{ 
                color: '#1DA1FA',
                fontWeight: '300',
                fontSize: '16px'
              }}>
                $15
              </div>
            </div>
          </div>

          {/* 第三个方块和文字 - Tako */}
          <div style={{
            border: '1px solid #E5E5E5',
            borderRadius: '12px',
            padding: '8px',
            backgroundColor: '#fff',
            flexShrink: 0
          }}>
            <div style={{
              width: '130px',
              height: '130px',
              backgroundColor: '#F5F5F5',
              borderRadius: '10px',
              marginBottom: '8px',
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img 
                src={takoImage}
                alt="Tako Yaki"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/tako-yaki-modal')}
              />
            </div>

            <div style={{
              width: '130px',
              fontFamily: 'SF Pro Display, sans-serif',
              fontSize: '14px',
              lineHeight: '1.2',
              color: '#000',
              textAlign: 'left'
            }}>
              <div style={{ marginBottom: '2px' }}>Tako Yaki</div>
              <div style={{ marginBottom: '4px' }}>Japanese Food</div>
              <div style={{ 
                color: '#1DA1FA',
                fontWeight: '300',
                fontSize: '16px'
              }}>
                $10
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Section Header */}
        <div style={{
          color: '#000',
          fontFamily: 'SF Pro Display, sans-serif',
          fontSize: '26px',
          fontStyle: 'normal',
          fontWeight: '600',
          lineHeight: '30px',
          letterSpacing: '0px',
          textAlign: 'left',
          marginTop: '10px',
          marginBottom: '20px',
          paddingLeft: '0px',
          marginLeft: '-210px'
        }}>
          Upcoming
        </div>

        {/* Upcoming Content - Contains the three rectangular banners */}
        <div ref={upcomingRef} style={{
          marginLeft: '0px',
          marginBottom: '60px',
        }}>
          {/* 第一个矩形方框 - ICE CREAM BANNER */}
          <div style={{
            width: '380px',
            height: '125px',
            borderRadius: '10px',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: '5px',
            cursor: 'pointer'
          }} onClick={() => handleEnlargeImage(iceCreamBanner)}>
            <img 
              src={iceCreamBanner}
              alt="Ice Cream Banner"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '10px'
              }}
            />
          </div>

          {/* 第二个矩形方框 - Orange Juice */}
          <div style={{
            width: '380px',
            height: '125px',
            borderRadius: '10px',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: '5px',
            cursor: 'pointer'
          }} onClick={() => handleEnlargeImage(orangeJuiceImage)}>
            <img 
              src={orangeJuiceImage}
              alt="Orange Juice Banner"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '10px'
              }}
            />
          </div>

          {/* 第三个矩形方框 - Smooth */}
          <div style={{
            width: '380px',
            height: '125px',
            borderRadius: '10px',
            overflow: 'hidden',
            position: 'relative',
            cursor: 'pointer'
          }} onClick={() => handleEnlargeImage(smoothImage)}>
            <img 
              src={smoothImage}
              alt="Smooth Banner"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '10px'
              }}
            />
          </div>
        </div>
      </div>

      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: '#fff',
        height: '80px'
      }}>
        <BottomNavbar />
      </div>

      {enlargedImageUrl && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000,
            cursor: 'pointer'
          }}
          onClick={handleCloseEnlarged}
        >
          <img 
            src={enlargedImageUrl}
            alt="Enlarged Advertisement"
            style={{
              maxWidth: '95%',
              maxHeight: '95%',
              objectFit: 'contain',
              borderRadius: '10px'
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
