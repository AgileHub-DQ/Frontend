// import React from 'react';

// const buttonStyle = {
//   backgroundColor: 'blue',
//   color: 'white',
//   padding: '10px 20px',
//   border: 'none',
//   borderRadius: '5px',
//   cursor: 'pointer',
//   fontSize: '16px',
//   fontWeight: 'bold',
//   ':hover': {
//     backgroundColor: 'darkblue'
//   }
// };

// const Button = ({ onClick, children }) => (
//   <button onClick={onClick} style={buttonStyle}>
//     {children}
//   </button>
// );

// export default Button;
import React from 'react';

const buttonStyle = {
  backgroundColor: 'blue',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 'bold',
  whiteSpace: 'nowrap', 
  display: 'inline-block',  // Prevent text from breaking into multiple lines
  margin: '0 5px',  // Add margin to left and right
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