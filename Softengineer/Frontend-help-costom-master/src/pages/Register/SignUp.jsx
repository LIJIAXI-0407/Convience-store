import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackArrow from '../../components/BackArrow';
import avatarImage from '../../assets/images/products/36a72f4c829b633102f8160676faeee66542eaca.png';
import AvatarUploadModal from '../../components/Modal/AvatarUploadModal';
import useUserStore from '../../store/userStore';

const SignUp = () => {
  const navigate = useNavigate();
  const addUser = useUserStore(state => state.addUser);
  const updateUserAvatar = useUserStore(state => state.updateUserAvatar);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);
  const [isCareerFocused, setIsCareerFocused] = useState(false);
  const [isBirthdayFocused, setIsBirthdayFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatar, setAvatar] = useState(avatarImage);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [career, setCareer] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleBack = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    if (username.trim() && email.trim() && password === confirmPassword) {
      const newUser = {
        username,
        email,
        password,
        career,
        birthday,
        avatar
      };
      addUser(newUser);
      navigate('/member');
    }
  };

  const handleAvatarClick = () => {
    setIsModalOpen(true);
  };

  const handleAvatarChange = (newAvatar) => {
    setAvatar(newAvatar);
    updateUserAvatar(newAvatar);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#FBFBFD',
      overflowY: 'auto',
      overflowX: 'hidden'
    }}>
      <AvatarUploadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onAvatarChange={handleAvatarChange}
      />
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '60px'
      }}>
        {/* Title Bar with Back Arrow */}
        <div style={{
          width: '100%',
          paddingLeft: '133px',
          paddingRight: '43px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '40px'
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
          }}>Sign up</h1>
        </div>

        {/* Avatar Container */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '40px',
          position: 'relative'
        }}>
          {/* Avatar Background */}
          <div style={{
            width: '112.024px',
            height: '113.531px',
            transform: 'rotate(0.24deg)',
            flexShrink: 0,
            borderRadius: '39.966px',
            background: 'linear-gradient(314deg, #FFCEE1 4.42%, #F96795 101.53%)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Avatar Image */}
            <img 
              src={avatar} 
              alt="Avatar"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 1
              }}
            />
          </div>
          
          {/* Plus Icon - Positioned outside the overflow:hidden container */}
          <div 
            onClick={handleAvatarClick}
            style={{
              position: 'absolute',
              right: 'calc(50% - 56px)',
              bottom: '-5px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#1DA1FA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
            <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 1V11M1 6H11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Input Fields Container */}
        <div style={{
          width: '100%',
          maxWidth: '300px',
          display: 'flex',
          flexDirection: 'column',
          gap: '22px'
        }}>
          {/* Email Input */}
          <div style={{
            position: 'relative',
            width: '300px',
            height: '50px'
          }}>
            <label style={{
              position: 'absolute',
              top: 0,
              left: 0,
              display: (isEmailFocused || email) ? 'none' : 'block',
              color: '#9D9D9D',
              fontFamily: 'SF Pro Display',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '65px',
              letterSpacing: '1.28px'
            }}>
              Email
            </label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '24px',
                border: 'none',
                borderBottom: '1px solid #9D9D9D',
                background: 'transparent',
                outline: 'none',
                padding: '0',
                fontFamily: 'SF Pro Display',
                fontSize: '18px',
                color: '#000'
              }}
            />
          </div>

          {/* Username Input */}
          <div style={{
            position: 'relative',
            width: '300px',
            height: '50px'
          }}>
            <label style={{
              position: 'absolute',
              top: 0,
              left: 0,
              display: (isUsernameFocused || username) ? 'none' : 'block',
              color: '#9D9D9D',
              fontFamily: 'SF Pro Display',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '65px',
              letterSpacing: '1.28px'
            }}>
              Username
            </label>
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setIsUsernameFocused(true)}
              onBlur={() => setIsUsernameFocused(false)}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '24px',
                border: 'none',
                borderBottom: '1px solid #9D9D9D',
                background: 'transparent',
                outline: 'none',
                padding: '0',
                fontFamily: 'SF Pro Display',
                fontSize: '18px',
                color: '#000'
              }}
            />
          </div>

          {/* Password Input */}
          <div style={{
            position: 'relative',
            width: '300px',
            height: '50px'
          }}>
            <label style={{
              position: 'absolute',
              top: 0,
              left: 0,
              display: (isPasswordFocused || password) ? 'none' : 'block',
              color: '#9D9D9D',
              fontFamily: 'SF Pro Display',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '65px',
              letterSpacing: '1.28px'
            }}>
              Password
            </label>
            <input 
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '24px',
                border: 'none',
                borderBottom: '1px solid #9D9D9D',
                background: 'transparent',
                outline: 'none',
                padding: '0',
                fontFamily: 'SF Pro Display',
                fontSize: '18px',
                color: '#000'
              }}
            />
            {/* Eye Icon for Password */}
            <div 
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '0',
                bottom: '4px',
                cursor: 'pointer',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {showPassword ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="#9D9D9D"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6.5C15.79 6.5 19.17 8.63 20.82 12C19.17 15.37 15.79 17.5 12 17.5C8.21 17.5 4.83 15.37 3.18 12C4.83 8.63 8.21 6.5 12 6.5ZM12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 9.5C13.38 9.5 14.5 10.62 14.5 12C14.5 13.38 13.38 14.5 12 14.5C10.62 14.5 9.5 13.38 9.5 12C9.5 10.62 10.62 9.5 12 9.5ZM12 7.5C9.52 7.5 7.5 9.52 7.5 12C7.5 14.48 9.52 16.5 12 16.5C14.48 16.5 16.5 14.48 16.5 12C16.5 9.52 14.48 7.5 12 7.5Z" fill="#9D9D9D"/>
                  <path d="M2 2L22 22" stroke="#9D9D9D" strokeWidth="2"/>
                </svg>
              )}
            </div>
          </div>

          {/* Confirm Password Input */}
          <div style={{
            position: 'relative',
            width: '300px',
            height: '50px'
          }}>
            <label style={{
              position: 'absolute',
              top: 0,
              left: 0,
              display: (isConfirmPasswordFocused || confirmPassword) ? 'none' : 'block',
              color: '#9D9D9D',
              fontFamily: 'SF Pro Display',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '65px',
              letterSpacing: '1.28px'
            }}>
              Confirm Password
            </label>
            <input 
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => setIsConfirmPasswordFocused(true)}
              onBlur={() => setIsConfirmPasswordFocused(false)}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '24px',
                border: 'none',
                borderBottom: '1px solid #9D9D9D',
                background: 'transparent',
                outline: 'none',
                padding: '0',
                fontFamily: 'SF Pro Display',
                fontSize: '18px',
                color: '#000'
              }}
            />
            {/* Eye Icon for Confirm Password */}
            <div 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                position: 'absolute',
                right: '0',
                bottom: '4px',
                cursor: 'pointer',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {showConfirmPassword ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="#9D9D9D"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6.5C15.79 6.5 19.17 8.63 20.82 12C19.17 15.37 15.79 17.5 12 17.5C8.21 17.5 4.83 15.37 3.18 12C4.83 8.63 8.21 6.5 12 6.5ZM12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 9.5C13.38 9.5 14.5 10.62 14.5 12C14.5 13.38 13.38 14.5 12 14.5C10.62 14.5 9.5 13.38 9.5 12C9.5 10.62 10.62 9.5 12 9.5ZM12 7.5C9.52 7.5 7.5 9.52 7.5 12C7.5 14.48 9.52 16.5 12 16.5C14.48 16.5 16.5 14.48 16.5 12C16.5 9.52 14.48 7.5 12 7.5Z" fill="#9D9D9D"/>
                  <path d="M2 2L22 22" stroke="#9D9D9D" strokeWidth="2"/>
                </svg>
              )}
            </div>
          </div>

          {/* Career Input */}
          <div style={{
            position: 'relative',
            width: '300px',
            height: '50px'
          }}>
            <label style={{
              position: 'absolute',
              top: 0,
              left: 0,
              display: (isCareerFocused || career) ? 'none' : 'block',
              color: '#9D9D9D',
              fontFamily: 'SF Pro Display',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '65px',
              letterSpacing: '1.28px'
            }}>
              Career
            </label>
            <input 
              type="text"
              value={career}
              onChange={(e) => setCareer(e.target.value)}
              onFocus={() => setIsCareerFocused(true)}
              onBlur={() => setIsCareerFocused(false)}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '24px',
                border: 'none',
                borderBottom: '1px solid #9D9D9D',
                background: 'transparent',
                outline: 'none',
                padding: '0',
                fontFamily: 'SF Pro Display',
                fontSize: '18px',
                color: '#000'
              }}
            />
          </div>

          {/* Birthday Input */}
          <div style={{
            position: 'relative',
            width: '300px',
            height: '50px'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '31px',
              display: 'flex',
              alignItems: 'flex-start',
              paddingTop: '14px'
            }}>
              <span style={{
                display: (isBirthdayFocused || birthday) ? 'none' : 'block',
                color: '#9D9D9D',
                fontFamily: 'SF Pro Display',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 400,
                letterSpacing: '1.28px'
              }}>
                Birthday
              </span>
            </div>
            <div style={{
              position: 'relative',
              width: '100%',
              height: '24px',
              marginTop: '25px'
            }}>
              <input 
                type="date"
                value={birthday}
                onChange={(e) => {
                  setBirthday(e.target.value);
                }}
                onFocus={() => setIsBirthdayFocused(true)}
                onBlur={() => setIsBirthdayFocused(false)}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderBottom: '1px solid #9D9D9D',
                  background: 'transparent',
                  outline: 'none',
                  padding: 0,
                  fontFamily: 'SF Pro Display',
                  fontSize: '18px',
                  color: 'transparent',
                  cursor: 'pointer',
                  zIndex: 2,
                  '-webkit-appearance': 'none',
                  '-moz-appearance': 'none',
                  '::-webkit-calendar-picker-indicator': {
                    filter: 'invert(80%) sepia(0%) saturate(100%) hue-rotate(137deg) brightness(91%) contrast(91%)'
                  }
                }}
                className="date-input"
              />
              <style>
                {`
                  .date-input::-webkit-calendar-picker-indicator {
                    filter: invert(80%) sepia(0%) saturate(100%) hue-rotate(137deg) brightness(91%) contrast(91%);
                  }
                  .date-input::-webkit-inner-spin-button { 
                    display: none;
                  }
                  .date-input::-webkit-clear-button {
                    display: none;
                  }
                `}
              </style>
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderBottom: '1px solid #9D9D9D',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                fontFamily: 'SF Pro Display',
                fontSize: '18px',
                color: '#000',
                zIndex: 1
              }}>
                {birthday ? (() => {
                  const date = new Date(birthday);
                  const day = String(date.getDate()).padStart(2, '0');
                  const month = String(date.getMonth() + 1).padStart(2, '0');
                  const year = String(date.getFullYear()).slice(-2);
                  return `${day}/${month}/${year}`;
                })() : ''}
              </div>
            </div>
          </div>

          {/* Sign up Button */}
          <button 
            onClick={handleSignUp}
            style={{
              width: '300px',
              height: '55.484px',
              flexShrink: 0,
              borderRadius: '8px',
              background: '#1DA1FA',
              border: 'none',
              cursor: 'pointer',
              marginTop: '15px',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <span style={{
              color: '#FFFEFE',
              fontFamily: 'SF Pro Display',
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '32px',
              letterSpacing: '0px'
            }}>
              Sign up
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp; 