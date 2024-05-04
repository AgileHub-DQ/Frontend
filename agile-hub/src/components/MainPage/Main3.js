import React from "react";

function Main3() {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',    // 세로 방향으로 요소들을 정렬
        alignItems: 'center',       // 센터 정렬
        padding: '20px',
        backgroundColor: '#f0f0f0',
        height: '100%'
    };

    const descriptionStyle = {
        fontSize: '3rem',         // 설명 텍스트 폰트 사이즈
        fontWeight: 'normal',       // 폰트 두께
        textAlign: 'center',        // 중앙 정렬
        marginBottom: '20px',       // 아래 컨텐츠와의 간격
        width: '80%'                // 너비 설정
    };

    const cardsContainerStyle = {
        display: 'flex',
        justifyContent: 'space-around', // 카드들 사이에 균등한 간격
        alignItems: 'center',
        width: '100%'                 // 컨테이너 너비 100%
    };

    const cardStyle = {
        width: '30%', // 각 카드의 너비
        backgroundColor: '#fff', // 배경 색
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // 그림자 효과
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    };

    const imagePlaceholderStyle = {
        width: '100%', // 이미지 플레이스홀더 너비
        height: '200px', // 이미지 플레이스홀더 높이
        backgroundColor: '#ddd', // 플레이스홀더 색
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px'
    };

    const titleStyle = {
        fontSize: '1.5rem', // 타이틀 폰트 사이즈
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
                <div style={cardStyle}>
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
