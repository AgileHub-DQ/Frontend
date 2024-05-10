function Header() { 
    const container = { 
        display: 'flex', 
        alignItems: 'center', 
        width: '100%', 
        height: '100px', 
        color: 'var(--kakao-logo, #000)', 
        fontFamily: "Abhaya Libre ExtraBold", 
        fontSize: '1.875rem', 
        fontStyle: 'normal', 
        fontWeight: '800', 
        lineHeight: 'normal', 
        paddingLeft: '5%', 
    }

    return (
        <div style={container}>
            마이페이지
        </div>
    )
}

export default Header;