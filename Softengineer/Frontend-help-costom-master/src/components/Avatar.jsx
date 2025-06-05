import React from 'react';
import defaultAvatar from '../assets/images/products/36a72f4c829b633102f8160676faeee66542eaca.png';
import useUserStore from '../store/userStore';

const Avatar = () => {
  const currentUser = useUserStore(state => state.currentUser);
  const avatarSrc = currentUser?.avatar || defaultAvatar;

  return (
    <div style={{
      width: '45.958px',
      height: '45.184px',
      flexShrink: 0,
      borderRadius: '39.966px',
      background: 'linear-gradient(314deg, #6D7BF7 4.42%, #62E3EC 101.53%)',
      transform: 'rotate(0.24deg)',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      boxShadow: '0px 2px 4px rgba(98, 227, 236, 0.3), 0px 4px 8px rgba(109, 123, 247, 0.3)'
    }}>
      <img 
        src={avatarSrc} 
        alt="Avatar"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'scale(1.16)'
        }}
      />
    </div>
  );
};

export default Avatar; 