// Component.js
import { useState } from 'react';
import '../../css/TimeLinePage/Component_t.css';
import { FaSearch } from 'react-icons/fa';
function Component_t() {
  // const [showOptions, setShowOptions] = useState(false); 


  // const toggleOptions = () => {
  //   setShowOptions(!showOptions);
  // };


  // const handleOptionChange = (e) => {

  //   console.log('Checkbox changed:', e.target.name, e.target.checked);
  // };


  return (
    <div className='bar'> 
    <div className='barcontainer'>
      <div className='project'>프로젝트/[프로젝트 이름]</div>
      <div className='timeline_text'>타임라인</div>
    </div>
      <div className='bar2container'>    
        <div className="search-container">
          <input type="text" id="search" className="search" placeholder="검색..." />
          <FaSearch className="search-icon" />
        </div>
        <div className='status-container'>
        <div className="status-label">상태 범주</div>
          {/* {showOptions && (
            <fieldset className='fieldset' onClick={handleOptionChange}>
              <div>
                <input type="checkbox" id="preparing" name="preparing"/>
                <label htmlFor="preparing">Preparing</label>
              </div>
              <div>
                <input type="checkbox" id="in-progress" name="in-progress" />
                <label htmlFor="in-progress">In Progress</label>
              </div>
              <div>
                <input type="checkbox" id="complete" name="complete" />
                <label htmlFor="complete">Complete</label>
              </div>
            </fieldset> */}
        </div>
      <div className="type-label">에픽</div>
    {/* <select id="type" className='type'>
    <option value="default">타입</option>
        <option value="epic">Epic</option>
        <option value="story">Story</option>
        <option value="task">Task</option>
    </select> */}
    </div>
    </div>
  );
}

export default Component_t;