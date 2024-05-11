import React from "react";
import "../../css/MainPage/Main2.css"

function Main2() {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',    
        alignItems: 'center',       
        padding: '10%',
        backgroundColor: '#f0f0f0',
        height: '35vh', 
    };

    const headerStyle = {
        width: '100%',             
        textAlign: 'center',     
        fontSize: '3rem',       
        fontWeight: 'bold',        
        marginBottom: '40px'       
    };

    const horizontalContainerStyle = {
        display: 'flex',
        flexDirection: 'row',     
        justifyContent: 'center',  
        alignItems: 'flex-start',  
        overflowX: 'auto',        
        width: '100%'             
    };

    const sectionStyle = {
        width: '30%',             
        margin: '0 20px',          
        textAlign: 'left', 
        padding: '30px'      
    };

    const titleStyle = {
        fontSize: '2rem',      
        fontWeight: 'bold',        
        marginBottom: '20px'     
    };

    const bodyStyle = {
        fontSize: '0.8rem',       
        lineHeight: '1.6'         
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>애자일 프로젝트 관리를 위해<br/>AgileHub를 사용해야 하는 이유</div>
            <div style={horizontalContainerStyle}>
                <div className="sectionStyle" style={sectionStyle}>
                    <div style={titleStyle}>어떤 환경에서든 AgileHub와 함께!</div>
                    <div style={bodyStyle}>
                    AgileHub는 단순한 프로젝트 관리 도구이며 여러분의 작업 방식을 혁신적으로 변화시킵니다.<br/>
                    AgileHub의 유연성과 편리성을 통해, 모든 프로젝트와 과제를 더욱 효과적이고 효율적으로 관리할 수 있습니다.<br/>
                    여러분이 직장에서, 교육 기관에서, 심지어 일상 생활에서도 Agile 방법론을 적용할 수 있게 해줍니다.<br/>
                    지금 AgileHub를 사용해보세요, 그리고 어디서든 Agile의 진정한 힘을 경험하세요!<br/>
                    </div>
                </div>
                <div className="sectionStyle" style={sectionStyle}>
                    <div style={titleStyle}>애자일을 원하는 모든 이를 위한 최적의 선택!</div>
                    <div style={bodyStyle}>
                    AgileHub는 애자일 프로젝트 관리의 복잡함을 해소합니다.<br/>
                    애자일 방법론을 도입하고자 하는 모든 개인과 팀에게 최적화된 솔루션을 제공합니다.<br/>
                    사용자 친화적인 인터페이스와 깔끔한 디자인으로, 애자일 초보자부터 전문가까지 누구나 손쉽게 접근하고 활용할 수 있습니다.<br/>
                    AgileHub는 프로젝트 관리를 더욱 효율적이고 생산적으로 만들어, 여러분의 작업 방식을 혁신적으로 변화시킵니다.<br/>
                    </div>
                </div>
                <div className="sectionStyle" style={sectionStyle}>
                    <div style={titleStyle}>프로젝트 관리의 혁신, 간편하고 명확하게!</div>
                    <div style={bodyStyle}>
                    AgileHub를 통해 프로젝트 관리의 복잡함을 해결하고, 파편화된 정보를 한눈에 명확하게 정리하세요.<br/>
                    우리의 직관적인 플랫폼은 모든 데이터를 시각적으로 표현하여 프로젝트의 진행 상황을 쉽게 파악할 수 있습니다.<br/>
                    또한, 멘션 기능을 활용하여 팀원들과의 소통을 한층 더 편리하게 만들어 줍니다.<br/>
                    이 모든 기능이 결합되어, 여러분의 프로젝트 관리 방식을 단순화시키고, 팀의 협업을 더욱 강화시킵니다.<br/>
                    AgileHub와 함께라면, 효율적인 의사소통과 데이터 관리로 프로젝트 성공률을 높일 수 있습니다.<br/>
                    지금 바로 AgileHub를 사용해보세요, 프로젝트 관리의 새로운 지평을 경험할 준비가 되셨나요?<br/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main2;
