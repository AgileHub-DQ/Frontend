import React from "react";

function Main3() {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',    
        alignItems: 'center',      
        padding: '40px',
        backgroundColor: '#ffffff',
        height: '35vh',
    };

    const descriptionStyle = {
        fontSize: '3rem',        
        fontWeight: 'normal',    
        textAlign: 'center',      
        marginBottom: '20px',      
        width: '80%'             
    };

    const cardsContainerStyle = {
        display: 'flex',
        justifyContent: 'space-around', 
        alignItems: 'center',
        width: '100%'                 
    };

    const cardStyle = {
        width: '30%', 
        backgroundColor: '#fff', 
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    };

    const imagePlaceholderStyle = {
        width: '100%',
        height: '200px', 
        backgroundColor: '#ddd',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px'
    };

    const titleStyle = {
        fontSize: '1.5rem', 
        fontWeight: 'bold',
        marginBottom: '10px'
    };

    const bodyStyle = {
        textAlign: 'center',
        fontSize: '1rem'
    };

    return (
        <div style={containerStyle}>
            <div style={descriptionStyle}>많이 사용하는 프로젝트 및 프로세스에 손쉽게 사용할 수 있는 템플릿이 준비되어 있습니다</div>
            <div style={cardsContainerStyle}>
                <div style={cardStyle} className="cardHoverEffect">
                    <div style={titleStyle}>프로젝트 보고서</div>
                    <div style={imagePlaceholderStyle}>이미지 자리</div>
                    <div style={bodyStyle}>
                        프로젝트의 상태를 한눈에 파악하세요. 그들의 완료율과 얼마나 무엇이진
                        도구가 판단할 수 있도록 돕고 하세요.
                    </div>
                </div>
                <div style={cardStyle}>
                    <div style={titleStyle}>간단 보드</div>
                    <div style={imagePlaceholderStyle}>이미지 자리</div>
                    <div style={bodyStyle}>
                        간단 보드로 일정표를 시작하세요 각 작업의 단계와 진행 상태를
                        빠르게 확인하세요.
                    </div>
                </div>
                <div style={cardStyle}>
                    <div style={titleStyle}>진행률 차트</div>
                    <div style={imagePlaceholderStyle}>이미지 자리</div>
                    <div style={bodyStyle}>
                        차트는 상황 연결을 시작합니다. 프로젝트의 실시간 상황보다는 어떤 상황에서
                        프로젝트의 본질을 개선할 수 있습니다.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main3;
