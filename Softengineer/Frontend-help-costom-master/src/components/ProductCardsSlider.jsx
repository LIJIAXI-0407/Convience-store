import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import candyImage from '../assets/images/products/Candy.png';
import cripsImage from '../assets/images/products/Crips.png';
import honeyImage from '../assets/images/products/Honey.png';
import cokaImage from '../assets/images/products/coke.png';

const ProductCardsSlider = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const products = [
    {
      id: 1,
      title: 'Strawberry\nCandy',
      image: candyImage,
      backgroundColor: 'rgba(255, 223, 214, 0.65)',
      originalPrice: '$9.99',
      currentPrice: '$0.99',
      description1: 'A good sweety for child and girls',
      description2: 'Strawberry with milk by germany',
      route: '/product-modal'
    },
    {
      id: 2,
      title: 'Potato\nCrips',
      image: cripsImage,
      backgroundColor: '#FEE998',
      originalPrice: '￥13.99',
      currentPrice: '$3.99',
      description1: 'A famous American Brand',
      description2: 'Potato chips by lays',
      route: '/potato-crips-modal'
    },
    {
      id: 3,
      title: 'Moon\nHoney',
      image: honeyImage,
      backgroundColor: '#D6EFFF',
      originalPrice: '$15.99',
      currentPrice: '$6.99',
      description1: 'A good sweety for child and girls',
      description2: 'Strawberry with milk by germany',
      route: '/moon-honey-modal'
    },
    {
      id: 4,
      title: 'Coka\nCola',
      image: cokaImage,
      backgroundColor: '#FFE5E5',
      originalPrice: '$3.99',
      currentPrice: '$2.99',
      description1: 'The world-famous soft drink',
      description2: 'Refreshing taste loved globally',
      route: '/coka-cola-modal'
    }
  ];

  // 自动翻页功能
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === products.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 每5秒切换一次

    return () => clearInterval(interval);
  }, [products.length]);

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '529px',
      overflow: 'visible'
    }}>
      <div 
        ref={sliderRef}
        style={{
          display: 'flex',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(${-currentIndex * 100}%)`,
          width: '100%',
          height: '100%',
          position: 'relative'
        }}
      >
        {products.map((product, index) => {
          const isActive = index === currentIndex;
          const isPrev = index === currentIndex - 1;
          const isNext = index === currentIndex + 1;
          
          return (
            <div
              key={product.id}
              style={{
                flex: '0 0 100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                userSelect: 'none',
                position: 'relative',
                transform: `scale(${isActive ? 1 : 0.9}) translateY(${
                  isActive ? '0' : (isPrev ? '20px' : (isNext ? '20px' : '40px'))
                })`,
                opacity: isActive ? 1 : (isPrev || isNext ? 0.7 : 0),
                transition: 'all 0.5s ease-in-out',
                zIndex: isActive ? 3 : (isPrev || isNext ? 2 : 1)
              }}
            >
              <div 
                style={{
                  position: 'relative',
                  width: '309px',
                  height: '529px',
                  backgroundColor: product.backgroundColor,
                  borderRadius: '30px',
                  overflow: 'hidden',
                  boxShadow: isActive 
                    ? '0px 8px 24px rgba(0, 0, 0, 0.12), 0px 4px 12px rgba(0, 0, 0, 0.08)'
                    : '0px 4px 12px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.04)',
                  cursor: 'pointer',
                  transform: `translateX(${isPrev ? '25%' : (isNext ? '-25%' : '0')}) 
                             rotate(${isActive ? '0deg' : (isPrev ? '-5deg' : (isNext ? '5deg' : '0deg'))})`,
                }}
                onClick={() => handleCardClick(product.route)}
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
                  height: product.title.includes('Moon') ? '100%' : '504.397px',
                  left: '12px',
                  top: product.title.includes('Moon') ? '45%' : (product.title.includes('Crips') ? '-20px' : '-10px'),
                  transform: product.title.includes('Moon') ? 'translateY(-50%)' : 'none',
                  zIndex: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <img 
                    src={product.image}
                    alt={product.title}
                    style={{
                      width: product.title.includes('Strawberry') ? '70%' : (product.title.includes('Crips') ? '60%' : '50%'),
                      height: product.title.includes('Strawberry') ? '70%' : (product.title.includes('Crips') ? '60%' : '50%'),
                      objectFit: 'contain',
                      transform: product.title.includes('Crips') ? 'rotate(-15deg)' : (product.title.includes('Strawberry') ? 'rotate(-8deg)' : 'rotate(15deg)'),
                      borderRadius: '138.628px',
                      userSelect: 'none',
                      pointerEvents: 'none'
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
                    textAlign: 'center',
                    whiteSpace: 'pre-line',
                    userSelect: 'none'
                  }}>
                    {product.title}
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
                    color: '#333',
                    userSelect: 'none'
                  }}>
                    {product.originalPrice}
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
                    color: '#FF4D6D',
                    userSelect: 'none'
                  }}>
                    {product.currentPrice}
                  </span>
                </div>

                {/* 滑动指示器 - 移动到卡片上 */}
                <div style={{
                  position: 'absolute',
                  bottom: '15px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '6px',
                  zIndex: 5,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  backdropFilter: 'blur(4px)'
                }}>
                  {products.map((_, idx) => (
                    <div
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation(); // 防止触发卡片的点击事件
                        setCurrentIndex(idx);
                      }}
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: currentIndex === idx ? '#FF4D6D' : '#D9D9D9',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        transform: currentIndex === idx ? 'scale(1.2)' : 'scale(1)',
                        boxShadow: currentIndex === idx ? '0 0 4px rgba(255, 77, 109, 0.4)' : 'none'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductCardsSlider; 