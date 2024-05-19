import React from 'react';
import Button from '../MyPage/Button';

function Member() {

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem'
  };

  const titleStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const container = { 
    marginRight: '10%', 
    marginLeft: '23%', 
    background: 'skyblue'
  }

  return (
    <div style={container}>
            <div style={headerStyle}>
        <div style={titleStyle}>
            <h1>멤버</h1>
            <p style={{ marginLeft: '1rem', color: '#888' }}>프로젝트 멤버 수</p>
        </div>
        <div>
            <Button>멤버 초대</Button>
        </div>
    </div>
    </div>
  );
}

export default Member;
