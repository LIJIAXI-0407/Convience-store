import React from 'react';
import { Plus, Minus } from 'lucide-react';

const CartItem = ({ productName, price, quantity, onIncrement, onDecrement }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: '35px',
      marginLeft: '16px',
      marginRight: '10px',
      width: 'calc(100% - 26px)',
      position: 'relative'
    }}>
      {/* Product Name and Price */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        flex: '1',
        marginRight: '10px'
      }}>
        <div style={{
          color: '#000',
          fontFamily: 'SF Pro Display',
          fontSize: '18px',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: '32px',
          width: '120px'  // 固定宽度
        }}>
          {productName}
        </div>
        
        <div style={{
          color: '#000',
          fontFamily: 'SF Pro Display',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: '32px',
          width: '60px',  // 固定宽度
          textAlign: 'left'
        }}>
          ${price}
        </div>
      </div>

      {/* Quantity Adjustment */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '2px',
        marginLeft: 'auto'
      }}>
        <button
          onClick={onDecrement}
          style={{
            width: '32px',
            height: '32px',
            flexShrink: 0,
            borderRadius: '6px',
            background: 'transparent',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <Minus size={16} color="#1A0101" />
        </button>
        <div style={{
          width: '32px',
          height: '32px',
          flexShrink: 0,
          borderRadius: '6px',
          background: '#1A0101',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{
            color: '#FFFFFF',
            fontFamily: 'SF Pro Display',
            fontSize: '16px',
            fontWeight: 500
          }}>
            {quantity}
          </span>
        </div>
        <button
          onClick={onIncrement}
          style={{
            width: '32px',
            height: '32px',
            flexShrink: 0,
            borderRadius: '6px',
            background: 'transparent',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <Plus size={16} color="#1A0101" />
        </button>
      </div>
    </div>
  );
};

export default CartItem; 