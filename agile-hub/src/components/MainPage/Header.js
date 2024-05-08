import React from "react";
import { useNavigate } from "react-router-dom";
import LogoImage from "../../assets/logo.png";

function Header() {
    const navigate = useNavigate();

    const headerStyle = {
        display: 'flex',            
        justifyContent: 'space-between', 
        alignItems: 'center',        
        padding: '1rem 2rem',        
        backgroundColor: '#f0f0f0',  
        border: 'solid 1px #ccc'    
    }

    return (
        <div style={headerStyle}>
            <img src={LogoImage} alt="AgileHub Logo" style={{ maxWidth: '150px' }} />
            <button 
                style={{ padding: '0.5rem 1rem', backgroundColor: 'blue', color: 'white', borderRadius: '20px' }}
                onClick={() => navigate('/login')}  
            />
        </div>
    );
}

export default Header;
