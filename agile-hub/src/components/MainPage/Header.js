import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoImage from '../../assets/logo.png';
import Button from '../MyPage/Button';

function Header() {
  const navigate = useNavigate();

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#f0f0f0',
    border: 'solid 1px #ccc',
  };

  return (
    <div style={headerStyle}>
      <img src={LogoImage} alt="AgileHub Logo" style={{ width: '300px' }} />
      <Button
        style={{ padding: '0.5rem 1rem', backgroundColor: 'blue', color: 'white', borderRadius: '20px' }}
        onClick={() => navigate('/login')}
      >
        Sign In
      </Button>
    </div>
  );
}

export default Header;
