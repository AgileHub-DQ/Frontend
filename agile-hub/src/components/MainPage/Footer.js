import React from "react";
import LogoImage from "../../assets/logo.png";

function Footer() {
    const footerStyle = {
        display: 'flex',             // Flexbox layout 사용
        justifyContent: 'space-between', // 양쪽에 자식 요소 배치
        alignItems: 'center',        // 가로 선상에 요소들을 중앙 정렬
        padding: '1rem 2rem',        // 상하 1rem, 좌우 2rem 패딩
        backgroundColor: '#EEF5FF',  // 배경색
        border: 'solid 1px #ccc',    // 테두리
        height: '5rem'               // 높이 설정
    }

    const logoStyle = {
        maxWidth: '150px',           // 로고 최대 너비 제한
        height: 'auto'               // 높이 자동 조절
    }

    const LogoTextStyle = {
        color: 'var(--kakao-logo, #000)',
        fontFamily: 'Abril Fatface', 
        fontSize: '3.125rem',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 'normal',
        marginRight: '0.5rem'       // 오른쪽 마진 추가
    }

    const nameTextStyle = { 
        color: 'var(--kakao-logo, #000)',
        fontFamily: 'Abhaya Libre SemiBold',
        fontSize: '1.25rem',
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 'normal'
    }

    return (
        <div style={footerStyle}>
            <img src={LogoImage} alt="AgileHub Logo" style={logoStyle}/>
            <div style={{ display: 'flex', alignItems: 'center' }}> 
                <span style={LogoTextStyle}>Dynamic-QD</span>
                <span style={nameTextStyle}>김민상 최재영 신승혜 주원희</span>
            </div>
        </div>
    );
}

export default Footer;
