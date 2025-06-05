import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import googleIcon from '../../assets/images/icons/Google.svg';
import useUserStore from '../../store/userStore';
import BackArrow from '../../components/BackArrow';

const Login = () => {
  const navigate = useNavigate();
  const login = useUserStore(state => state.login);
  const loginWithGoogle = useUserStore(state => state.loginWithGoogle);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert('请输入邮箱和密码');
      return;
    }
  
    try {
      const result = await login(email.trim(), password.trim());
      
      if (result.success) {
        // 登录成功，数据已经保存到 userStore 和 localStorage
        console.log('登录成功，用户信息:', result.user);
        
        // 重定向到 member 页面
        navigate('/member');
      } else {
        alert(result.error || '登录失败');
      }
    } catch (error) {
      console.error('登录错误:', error);
      alert('登录失败，请稍后重试');
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${response.access_token}` },
        });
        
        if (userInfoResponse.ok) {
          const userInfo = await userInfoResponse.json();
          loginWithGoogle(userInfo);
          navigate('/member');
        }
      } catch (error) {
        console.error('Error fetching Google user info:', error);
      }
    },
    onError: () => {
      console.error('Google Login Failed');
    }
  });

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      backgroundColor: '#FBFBFD',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* Back Arrow */}
      <div style={{
        position: 'absolute',
        top: '60px',
        left: '40px',
        cursor: 'pointer',
        zIndex: 10
      }} onClick={handleBack}>
        <BackArrow />
      </div>

      {/* Content Container */}
      <div style={{
        width: '100%',
        maxWidth: '300px',
        marginTop: '140px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}>
        {/* Welcome Title */}
        <h1 style={{
          margin: 0,
          padding: 0,
          color: '#000',
          fontFamily: 'SF Pro Display',
          fontSize: '44px',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: '32px',
          letterSpacing: '0px',
          textAlign: 'left',
          whiteSpace: 'nowrap',
          marginBottom: '20px'
        }}>Welcome!</h1>
        
        {/* Store Name */}
        <div style={{
          width: '100%',
          color: '#000',
          fontFamily: 'SF Pro Display',
          fontSize: '24px',
          fontStyle: 'normal',
          fontWeight: 300,
          lineHeight: '32px',
          letterSpacing: '0.5px',
          wordSpacing: '2px',
          textAlign: 'left',
          whiteSpace: 'nowrap',
          marginBottom: '40px'
        }}>
          Eat Chicken AI-Powered Store
        </div>

        {/* Email Input */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '65px',
          marginBottom: '20px'
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

        {/* Password Input */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '65px',
          marginBottom: '40px'
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
          {/* Eye Icon */}
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

        {/* Login Button */}
        <div 
          onClick={handleLogin}
          className="interactive-btn"
          style={{
            width: '100%',
            height: '55.484px',
            borderRadius: '8px',
            background: '#1DA1FA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
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
            Login
          </span>
        </div>

        {/* Sign up with Google Button */}
        <div 
          onClick={handleGoogleLogin}
          className="interactive-btn"
          style={{
            display: 'flex',
            width: '100%',
            padding: '16px 32px',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            borderRadius: '10px',
            border: '1px solid #1DA1FA',
            boxSizing: 'border-box',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}>
          <img 
            src={googleIcon} 
            alt="Google"
            style={{
              width: '24px',
              height: '24px'
            }}
          />
          <span style={{
            color: '#1DA1FA',
            textAlign: 'center',
            fontFamily: 'SF Pro Display',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '24px',
            letterSpacing: '-0.16px'
          }}>
            Sign up with Google
          </span>
        </div>

        {/* Or Sign up text */}
        <div 
          onClick={handleSignUpClick}
          style={{
            width: '76px',
            height: '39px',
            flexShrink: 0,
            marginTop: '20px',
            color: '#5B86E5',
            fontFamily: 'SF Pro Display',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '32px',
            letterSpacing: '0px',
            cursor: 'pointer',
            margin: '20px auto 0',
            textAlign: 'center'
          }}>
          or Sign up
        </div>
      </div>
    </div>
  );
};

export default Login; 