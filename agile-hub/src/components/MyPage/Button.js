<<<<<<< HEAD
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

=======
import React from 'react';

// 버튼 스타일을 정의하는 객체
>>>>>>> d5a98b5 (feat: button 컴포넌트 추가)
const buttonStyle = {
  backgroundColor: 'blue',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
<<<<<<< HEAD
  fontSize: '14px',
  fontWeight: 'bold',
  whiteSpace: 'nowrap', 
  display: 'inline-block',  // Prevent text from breaking into multiple lines
  margin: '0 5px',  // Add margin to left and right
=======
  fontSize: '16px',
  fontWeight: 'bold',
>>>>>>> d5a98b5 (feat: button 컴포넌트 추가)
  ':hover': {
    backgroundColor: 'darkblue'
  }
};

const Button = ({ onClick, children }) => (
  <button onClick={onClick} style={buttonStyle}>
    {children}
  </button>
);

<<<<<<< HEAD
export default Button;
=======
export default Button;
>>>>>>> d5a98b5 (feat: button 컴포넌트 추가)
