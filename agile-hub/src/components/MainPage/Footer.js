import React from "react";
import LogoImage from "../../assets/logo.png";

function Footer() {
    const footerStyle = {
        display: 'flex',             
        justifyContent: 'space-between',
        alignItems: 'center',       
        padding: '1rem 2rem',       
        backgroundColor: '#EEF5FF', 
        border: 'solid 1px #ccc',   
        height: '10rem'   
    }

    const logoStyle = {
        width: '300px',         
        height: 'auto'              
    }

    const LogoTextStyle = {
        color: 'var(--kakao-logo, #000)',
        fontFamily: 'Abril Fatface', 
        fontSize: '3.125rem',
        fontStyle: 'normal',
        fontWeight: '800',
        lineHeight: 'normal',
        marginRight: '0.5rem'       
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
