import React, { useEffect, useState } from "react";
import "../../css/MainPage/Main1.css"

function Main1() {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '30px',
        height: '100vh',
        fontSize: '16px', 
        color: '#333', 
        alignItems: 'center', 
    };

    const textStyle = {
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '20px'
    };

    const [isHighlighted, setIsHighlighted] = useState(false);

    const titleStyle = {
        fontSize: '3.5rem',
        fontWeight: isHighlighted ? '900' : 'bold',
        marginBottom: '20px',
        color: isHighlighted ? '#1F2CFF' : '#000',  
    };

    const bodyStyle = {
        fontSize: '2rem',
        fontWeight: isHighlighted ? 'bold' : 'normal', 
    };

    const imagePlaceholderStyle = {
        width: '35%',
        height: '80%',
        backgroundColor: '#ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        color: 'white',
        borderRadius: '8px'
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {  
                setIsHighlighted(true);
            } else {
                setIsHighlighted(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div style={containerStyle}>
            <div style={textStyle}>
                <div style={titleStyle} className="typing1">
                    AgileHub와 함께하면 어떤 변화도 문제가 되지 않아요<br/>
                </div>
                <div style={titleStyle} className="typing2">
                    유연한 프로젝트 관리를 직접 경험해보세요!
                </div>
                <div style={bodyStyle}>
                    AgileHub의 최신 기능을 활용하면 우선순위 변화에도 즉시 대응할 수 있어요<br/>
                    어떤 상황에서도 프로젝트의 목표와 팀의 생산성을 최대한 높일 수 있습니다<br/>
                    변화하는 요구사항에 빠르게 대응하여 성공을 거두세요!<br/>
                </div>
            </div>
            <div style={imagePlaceholderStyle}>
                이미지 자리
            </div>
        </div>
    );
}

export default Main1;