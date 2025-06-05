import React, { useCallback } from 'react';

const AvatarUploadModal = ({ isOpen, onClose, onAvatarChange }) => {
  if (!isOpen) return null;

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/svg+xml')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onAvatarChange(e.target.result);
        onClose();
      };
      reader.readAsDataURL(file);
    }
  }, [onAvatarChange, onClose]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onAvatarChange(e.target.result);
        onClose();
      };
      reader.readAsDataURL(file);
    }
  }, [onAvatarChange, onClose]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        width: '330px',
        height: '280px',
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px'
      }}>
        {/* Inner Container with Dashed Border */}
        <div 
          style={{
            position: 'absolute',
            top: '5px',
            left: '5px',
            right: '5px',
            bottom: '5px',
            border: '1px dashed #EAECF0',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px'
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
            id="avatar-upload"
          />
          <label htmlFor="avatar-upload" style={{ cursor: 'pointer' }}>
            {/* Upload Icon */}
            <div style={{
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              marginLeft: 'auto',
              marginRight: '110px'
            }}>
              <svg width="30" height="30" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.66663 13.8333L9.99996 10.5M9.99996 10.5L13.3333 13.8333M9.99996 10.5V18M16.6666 14.4524C17.6845 13.6117 18.3333 12.3399 18.3333 10.9167C18.3333 8.38536 16.2813 6.33333 13.75 6.33333C13.5679 6.33333 13.3975 6.23833 13.3051 6.08145C12.2183 4.23736 10.212 3 7.91663 3C4.46485 3 1.66663 5.79822 1.66663 9.25C1.66663 10.9718 2.36283 12.5309 3.48908 13.6613" stroke="#475467" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Upload Text Container */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              gap: '4px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <span style={{
                  color: '#6941C6',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 600,
                  lineHeight: '20px'
                }}>
                  Click to upload
                </span>
                <span style={{
                  color: '#475467',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '20px'
                }}>
                  or drag and drop
                </span>
              </div>

              {/* File Type Text */}
              <div style={{
                color: '#475467',
                fontFamily: 'Inter',
                fontSize: '12px',
                fontWeight: 400,
                lineHeight: '18px',
                textAlign: 'center'
              }}>
                SVG, PNG, JPG or GIF (max. 800×400px)
              </div>
            </div>
          </label>
        </div>

        {/* Close Button */}
        <div 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '2px',
            right: '2px',
            display: 'flex',
            width: '40px',
            height: '40px',
            padding: '8px',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0,
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            ':hover': {
              backgroundColor: '#F9FAFB'
            }
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AvatarUploadModal; 