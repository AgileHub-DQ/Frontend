import React from "react";

function Main1() {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '30px',
        height: '30vh',
        // backgroundColor: '#f0f0f0',
        fontSize: '16px', 
        color: '#333', 
        alignItems: 'center', 
        backgroundColor: 'red',
    };

    const textStyle = {
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '20px'
    };

    const titleStyle = {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '20px' // 제목과 본문 사이의 간격
    };

    const bodyStyle = {
        fontSize: '1rem' // 본문 폰트 사이즈
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

    return (
        <div style={containerStyle}>
            <div style={textStyle}>
                <div style={titleStyle}>
                    AgileHub와 함께하면 어떤 변화도 문제가 되지 않아요<br/>
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
