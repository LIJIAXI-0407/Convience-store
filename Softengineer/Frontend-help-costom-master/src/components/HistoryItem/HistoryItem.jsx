import React from 'react';

const HistoryItem = ({ productName, quantity, price, date }) => {
  return (
    <div style={{
      width: '270px',
      height: '80px',
      flexShrink: 0,
      borderRadius: '10px',
      background: '#FFF',
      marginTop: '10px',
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: '12px 15px',
      position: 'relative',
      boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '4px'
      }}>
        <div style={{
          color: '#000',
          fontFamily: 'SF Pro Display',
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '20px'
        }}>
          {productName}
        </div>
        <div style={{
          color: '#000',
          fontFamily: 'SF Pro Display',
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '20px',
          textAlign: 'right'
        }}>
          ${price.toFixed(2)}
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '2px'
      }}>
        <div style={{
          color: '#000',
          fontFamily: 'SF Pro Display',
          fontSize: '12px',
          fontWeight: 300,
          lineHeight: '16px'
        }}>
          Qty: {quantity}
        </div>
        <div style={{
          color: '#A2A2A2',
          fontFamily: 'SF Pro Display',
          fontSize: '12px',
          fontStyle: 'italic',
          fontWeight: 300,
          lineHeight: '16px'
        }}>
          Date: {date}
        </div>
      </div>

      <div style={{
        color: '#1DA1FA',
        fontFamily: 'SF Pro Display',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '16px',
        marginTop: '6px'
      }}>
        Bought
      </div>
    </div>
  );
};

export default HistoryItem; 