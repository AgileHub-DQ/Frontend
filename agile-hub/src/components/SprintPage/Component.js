// Component.js
import '../../css/SprintPage/Component.css';
function Component({sprintData}) {

  return (
    <div className="bar">
    {sprintData && (
                <div>
                  <div className='sprintbarcontainer'>
                    <div className='sprint_title'>스프린트 이름 / 스프린트 목표</div>
                    <div className='sprint_description'>[{sprintData.title}] / {sprintData.description}</div>
                    {/* <div className='sprint_text'>스프린트</div> */}
                    </div>
                  <div className="dateContainer">
                    <div>{sprintData.startDate}</div>
                    <div className='dateBar'/>
                    <div>{sprintData.endDate}</div>
                  </div>
                  {/* <button className='sprint_finish'>스프린트 완료</button> */}
                </div>
            )}
    </div>
  );
}

export default Component;