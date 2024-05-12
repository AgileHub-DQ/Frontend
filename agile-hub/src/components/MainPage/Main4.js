import React from "react";
import AgileCircle from "../../assets/AgileCircle.png"; 
import PlanArrow from "../../assets/PlanArrow.png"; 
import DesignArrow from "../../assets/DesignArrow.png"; 
import DevArrow from "../../assets/DevArrow.png"; 
import TestArrow from "../../assets/TestArrow.png"; 
import FeedbackArrow from "../../assets/FeedbackArrow.png"; 

function Main4() {
    const container = { 
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center', 
        background: '#F0F0F0', 
        height: '80vh'
    }

    const leftContain = { 
        width: '50%', 
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center', 
    }

    const rightContain = { 
        width: '50%', 
        justifyContent: 'center', 
        alignItems: 'center', 
    }

    return (
        <div style={container}>
            <div className='leftContain' style={leftContain}>
                <img src={AgileCircle} alt="Agile cycle with planning, design, development, testing, and feedback"/>
            </div>
            <div className='rightContain' style={rightContain}>
                <div>
                    <img src={PlanArrow} alt="Planning stage of the agile cycle, essential for defining project scope and objectives"/>
                    <p>프로젝트의 범위와 목표 설정이 명확하며 AgileHub를 통하여 목표달성을 촉진시키며, 목표한 계획을 세울 수 있게 도와줍니다.</p>
                </div>
                <div>
                    <img src={DesignArrow} alt="Design stage of the agile cycle, where ideas are visualized and plans are detailed"/>
                    <p>디자인 아이디어를 구체화하고픈, 실시간으로 프로젝트 변화에 디자인 강화의 보다 효율적인 접근방안을 집행합니다.</p>
                </div>
                <div>
                    <img src={DevArrow} alt="Development stage of the agile cycle, involving coding and building the project"/>
                    <p>개발 프로세스는 지속적으로 관리할 수 있으며, 집행 상황을 실시간으로 모니터링하여 유연한 코드 조정함으로써 프로젝트의 발전을 촉진합니다.</p>
                </div>
                <div>
                    <img src={TestArrow} alt="Testing stage of the agile cycle, crucial for quality assurance"/>
                    <p>테스트 결과의 관리와 고유한 테스트 과정이 제작조로 이어져서, 발견된 문제들도 신속하게 해결할 수 있게 합니다.</p>
                </div>
                <div>
                    <img src={FeedbackArrow} alt="Feedback stage of the agile cycle, for refining and improving the project"/>
                    <p>피드백 수집 및 관리 도구를 활용하여 사용자와 클라이언트로부터 소중한 의견을 계속 수렴할 수 있어 프로젝트를 지속적으로 개선할 수 있게 합니다.</p>
                </div>
            </div>
        </div>
    );
}

export default Main4;
