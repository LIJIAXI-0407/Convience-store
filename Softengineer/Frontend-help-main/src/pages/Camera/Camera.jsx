import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './Camera.css';

const Camera = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let stream = null;

    const createProduct = async () => {
      try {
        const response = await fetch('http://localhost/sale/public/api/admin/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product_name: 'Scanned Product',
            bar_code: '8850999220000',  // 指定的条形码
            price: 0,
            stock: 50
          })
        });

        if (!response.ok) {
          throw new Error('Failed to create product');
        }

        // 返回产品页面，并传递创建成功的标志
        navigate('/product', { 
          state: { 
            fromCamera: true,
            productCreated: true
          }
        });
      } catch (error) {
        console.error('Error creating product:', error);
        navigate('/product', { 
          state: { 
            fromCamera: true,
            error: 'Failed to create product'
          }
        });
      }
    };

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: 640,
            height: 480,
            facingMode: 'environment'
          } 
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        setScanning(true);
        
        const interval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prev + 1;
          });
        }, 100);

        // 10秒后停止摄像头并创建商品
        setTimeout(async () => {
          if (stream) {
            stream.getTracks().forEach(track => track.stop());
          }
          setScanning(false);
          await createProduct();
        }, 10000);

      } catch (err) {
        console.error('Error accessing camera:', err);
        setError('无法访问摄像头。请确保已授予摄像头访问权限。');
        
        setTimeout(() => {
          navigate('/product');
        }, 3000);
      }
    };

    if (location.state?.returnToProduct) {
      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [navigate, location.state]);

  if (error) {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <div className="camera-container">
          <div className="error-message">
            {error}
            <div className="error-submessage">
              正在返回产品页面...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="camera-container">
        <div className="camera-view">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="camera-video"
          />
          {scanning && (
            <div className="scanning-overlay">
              <div className="scanning-line" style={{ top: `${progress}%` }}></div>
              <div className="scanning-text">
                Scanning... {progress}%
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Camera; 