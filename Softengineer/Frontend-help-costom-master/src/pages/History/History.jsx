import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackArrow from '../../components/BackArrow';
import Avatar from '../../components/Avatar';
import HistoryItem from '../../components/HistoryItem/HistoryItem';
import useHistoryStore from '../../store/historyStore';
import useUserStore from '../../store/userStore';

const History = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const historyItems = useHistoryStore(state => state.historyItems);
  const currentUser = useUserStore(state => state.currentUser);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleBack = () => {
    navigate('/');
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  // Filter history items based on search text
  const filteredItems = historyItems.filter(item =>
    item.productName.toLowerCase().includes(searchText.toLowerCase())
  );

  // If not logged in, don't render the component
  if (!currentUser) {
    return null;
  }

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#FBFBFD'
    }}>
      <div style={{
        width: '310px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header Section */}
        <div style={{ 
          padding: '20px 0',
          background: '#FBFBFD',
          position: 'relative',
          flexShrink: 0
        }}>
          {/* Back Arrow and Title */}
          <div style={{ 
            paddingTop: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '20px'
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
            }}>Order History</h1>
          </div>

          {/* Avatar */}
          <div style={{
            position: 'absolute',
            top: '60px',
            right: '0'
          }}>
            <Avatar />
          </div>
        </div>

        {/* Search Box Container */}
        <div style={{
          marginBottom: '15px',
          flexShrink: 0
        }}>
          <div style={{
            position: 'relative',
            width: '240px'
          }}>
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={handleSearch}
              style={{
                width: '100%',
                height: '50px',
                borderRadius: '15px',
                border: '1px solid #D6D6D6',
                background: '#FFF',
                boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)',
                padding: '0 45px 0 25px',
                fontSize: '16px',
                fontFamily: 'SF Pro Display',
                outline: 'none'
              }}
            />
            {/* Search Icon */}
            <div style={{
              position: 'absolute',
              right: '-50px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none'
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.361 18.2168L14.601 13.2662C15.8249 11.8113 16.4954 9.98069 16.4954 8.07499C16.4954 3.62251 12.8729 0 8.42045 0C3.96797 0 0.345459 3.62251 0.345459 8.07499C0.345459 12.5275 3.96797 16.15 8.42045 16.15C10.092 16.15 11.6849 15.6458 13.0467 14.6888L17.8429 19.677C18.0434 19.8852 18.3113 20 18.602 20C18.8789 20 19.1376 19.8957 19.3322 19.7061C19.7428 19.3014 19.7658 18.6277 19.361 18.2168ZM8.42045 2.10652C11.7115 2.10652 14.3889 4.78391 14.3889 8.07499C14.3889 11.3661 11.7115 14.0435 8.42045 14.0435C5.12937 14.0435 2.45198 11.3661 2.45198 8.07499C2.45198 4.78391 5.12937 2.10652 8.42045 2.10652Z" fill="#A2A2A2"/>
              </svg>
            </div>
          </div>
        </div>

        {/* History Items Container */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          paddingBottom: '20px'
        }}>
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <HistoryItem
                key={item.id}
                productName={item.productName}
                quantity={item.quantity}
                price={item.price}
                date={item.date}
              />
            ))
          ) : (
            <div style={{
              textAlign: 'center',
              marginTop: '50px',
              color: '#A2A2A2',
              fontFamily: 'SF Pro Display',
              fontSize: '16px'
            }}>
              {searchText ? 'No matching orders found' : 'No order history yet'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History; 