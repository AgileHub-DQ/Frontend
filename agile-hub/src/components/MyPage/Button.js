import React from 'react';

// 버튼 스타일을 정의하는 객체
const buttonStyle = {
  backgroundColor: 'blue',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  ':hover': {
    backgroundColor: 'darkblue'
  }
};

const Button = ({ onClick, children }) => (
  <button onClick={onClick} style={buttonStyle}>
    {children}
  </button>
);

export default Button;
