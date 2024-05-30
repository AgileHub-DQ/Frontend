function Header() {
  const container = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100px',
    display: 'flex', // flexbox를 사용하여 요소들을 가로로 정렬합니다.
    alignItems: 'center', // 수직 중앙 정렬
    width: '100%', // 전체 너비 사용
    height: '100px', // 컨테이너 높이 설정
    color: 'var(--kakao-logo, #000)',
    fontFamily: 'Abhaya Libre ExtraBold',
    fontSize: '1.875rem',
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 'normal',
    paddingLeft: '5%',
  };

  return <div style={container}>마이페이지</div>;
}

export default Header;