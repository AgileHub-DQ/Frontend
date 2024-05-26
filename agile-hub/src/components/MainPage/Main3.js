// import React from 'react';
// import Main3Project from '../../assets/Main3Project.png';
// import Main3Sprint from '../../assets/Main3Sprint.png';
// import Main3TimeLine from '../../assets/Main3TimeLine.png';

// function Main3() {
//   const containerStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: '40px',
//     backgroundColor: '#ffffff',
//     height: '55vh',
//   };

//   const descriptionStyle = {
//     fontSize: '3rem',
//     fontWeight: 'normal',
//     textAlign: 'center',
//     marginBottom: '20px',
//     width: '80%',
//   };

//   const cardsContainerStyle = {
//     display: 'flex',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     width: '100%',
//   };

//   const cardStyle = {
//     width: '30%',
//     backgroundColor: '#fff',
//     boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//     padding: '20px',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   };

//   const imagePlaceholderStyle = {
//     width: '100%',
//     height: '30%',
//     backgroundColor: '#ddd',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: '20px',
//   };

//   const titleStyle = {
//     fontSize: '1.5rem',
//     fontWeight: 'bold',
//     marginBottom: '10px',
//   };

//   const bodyStyle = {
//     textAlign: 'center',
//     fontSize: '1.5rem',
//     fontWeight: 'bold',
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={descriptionStyle}>
//         많이 사용하는 프로젝트 및 프로세스에 손쉽게 사용할 수 있는 템플릿이 준비되어 있습니다
//       </div>
//       <div style={cardsContainerStyle}>
//         <div style={cardStyle} className="cardHoverEffect">
//           <div style={titleStyle}>프로젝트 관리</div>
//           <div style={imagePlaceholderStyle}>
//             <img style={{ width: '100%', height: '100%' }} src={Main3Project} />
//           </div>
//           <div style={bodyStyle}>프로젝트의 상태를 한눈에 파악하세요. 작업 현황이 실시간으로 업데이트되어요.</div>
//         </div>
//         <div style={cardStyle}>
//           <div style={titleStyle}>스프린트 관리</div>
//           <div style={imagePlaceholderStyle}>
//             <img style={{ width: '100%', height: '100%' }} src={Main3Sprint} />
//           </div>
//           <div style={bodyStyle}>에픽, 스토리, 테스크를 즉시 생성하고 관리할 수 있어요.</div>
//         </div>
//         <div style={cardStyle}>
//           <div style={titleStyle}>타임라인 관리</div>
//           <div style={imagePlaceholderStyle}>
//             <img style={{ width: '100%', height: '100%' }} src={Main3TimeLine} />
//           </div>
//           <div style={bodyStyle}>작업의 전체적인 진행들을 한 눈에 파악할 수 있어요.</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Main3;
import React from 'react';
import Main3Project from '../../assets/Main3Project.png';
import Main3Sprint from '../../assets/Main3Sprint.png';
import Main3TimeLine from '../../assets/Main3TimeLine.png';

function Main3() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    backgroundColor: '#ffffff',
    height: '55vh',
  };

  const descriptionStyle = {
    fontSize: '3rem',
    fontWeight: 'normal',
    textAlign: 'center',
    marginBottom: '20px',
    width: '80%',
  };

  const cardsContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  };

  const cardStyle = {
    width: '30%',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'transform 0.3s', // 추가: 트랜지션 효과
  };

  const cardHoverEffect = {
    transform: 'scale(1.05)', // 추가: 호버 시 커지는 효과
  };

  const imagePlaceholderStyle = {
    width: '100%',
    height: '30%',
    backgroundColor: '#ddd',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const bodyStyle = {
    textAlign: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <div style={descriptionStyle}>
        많이 사용하는 프로젝트 및 프로세스에 손쉽게 사용할 수 있는 템플릿이 준비되어 있습니다
      </div>
      <div style={cardsContainerStyle}>
        <div
          style={cardStyle}
          className="cardHoverEffect"
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <div style={titleStyle}>프로젝트 관리</div>
          <div style={imagePlaceholderStyle}>
            <img style={{ width: '100%', height: '100%' }} src={Main3Project} />
          </div>
          <div style={bodyStyle}>프로젝트의 상태를 한눈에 파악하세요. 작업 현황이 실시간으로 업데이트되어요.</div>
        </div>
        <div
          style={cardStyle}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <div style={titleStyle}>스프린트 관리</div>
          <div style={imagePlaceholderStyle}>
            <img style={{ width: '100%', height: '100%' }} src={Main3Sprint} />
          </div>
          <div style={bodyStyle}>에픽, 스토리, 테스크를 즉시 생성하고 관리할 수 있어요.</div>
        </div>
        <div
          style={cardStyle}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <div style={titleStyle}>타임라인 관리</div>
          <div style={imagePlaceholderStyle}>
            <img style={{ width: '100%', height: '100%' }} src={Main3TimeLine} />
          </div>
          <div style={bodyStyle}>작업의 전체적인 진행들을 한 눈에 파악할 수 있어요.</div>
        </div>
      </div>
    </div>
  );
}

export default Main3;
