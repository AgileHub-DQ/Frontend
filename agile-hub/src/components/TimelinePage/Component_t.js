// Component.js
import '../../css/TimeLinePage/Component_t.css';
import { FaSearch } from 'react-icons/fa'; // FaSearch 아이콘을 import
function Component_t() {

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
    <select id="status" className='status'>
    <option value="default">상태 범주</option>
      <option value="preparing">Preparing</option>
      <option value="in-progress">In Progress</option>
      <option value="complete">Complete</option>
    </select>
    <select id="type" className='type'>
    <option value="default">타입</option>
        <option value="epic">Epic</option>
        <option value="story">Story</option>
        <option value="task">Task</option>
    </select>
    </div>

    </div>
  );
}

export default Component_t;