import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Quagga from 'quagga';
import BackArrow from '../../components/BackArrow';
import useQuantityStore from '../../store/quantityStore';
import API_CONFIG from '../../api/config';

const Scan = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef(null);
  const addToCart = useQuantityStore(state => state.addToCart);

  useEffect(() => {
    // 启动扫描器
    if (!scanning) {
      setError('');
      console.log('Starting scanner...');

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Camera access not supported');
        console.error('Camera access not supported');
        return;
      }

      Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: scannerRef.current,
          constraints: {
            facingMode: "environment",
            width: 400,
            height: 300,
          },
        },
        decoder: {
          readers: ["ean_reader", "ean_8_reader", "code_128_reader", "code_39_reader", "upc_reader"],
          debug: {
            drawBoundingBox: true,
            showPattern: true,
          }
        }
      }, (err) => {
        if (err) {
          console.error('Quagga initialization failed:', err);
          setError('Failed to start scanner: ' + err.message);
          return;
        }
        console.log('Quagga initialized successfully');
        setScanning(true);

        // 10秒后添加商品并跳转
        setTimeout(() => {
          // 停止扫描
          Quagga.stop();
          // 添加商品到购物车
          addToCart({
            productName: 'Soda',
            price: 10,
            quantity: 1
          });
          // 跳转到购物车页面
          navigate('/cart');
        }, 10000);
      });
    }

    // 清理函数
    return () => {
      if (scanning) {
        console.log('Cleaning up scanner...');
        Quagga.stop();
      }
    };
  }, [scanning, navigate, addToCart]);

  const handleBack = () => {
    if (scanning) {
      Quagga.stop();
    }
    navigate('/');
  };

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      background: '#FBFBFD',
      position: 'fixed',
      top: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          paddingTop: '40px',
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
            margin: 0
          }}>Scan Barcode</h1>
        </div>
      </div>

      {/* Scanner Container */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div
          ref={scannerRef}
          style={{
            width: '100%',
            maxWidth: '400px',
            height: '300px',
            overflow: 'hidden',
            borderRadius: '20px',
            position: 'relative',
            background: '#000'
          }}
        >
          {/* Scanning Animation Line */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              width: '100%',
              height: '2px',
              background: 'linear-gradient(to right, transparent, #1DA1FA 20%, #1DA1FA 80%, transparent)',
              animation: 'scan 2s linear infinite',
              zIndex: 1
            }}
          />
        </div>

        {/* Add animation keyframes */}
        <style>
          {`
            @keyframes scan {
              0% {
                top: 0;
              }
              50% {
                top: calc(100% - 2px);
              }
              100% {
                top: 0;
              }
            }
          `}
        </style>

        {error && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            background: '#fff',
            borderRadius: '10px',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
            color: 'red'
          }}>
            <p style={{
              margin: 0,
              fontFamily: 'SF Pro Display',
              fontSize: '16px'
            }}>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scan;