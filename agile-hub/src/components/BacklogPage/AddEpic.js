// AddEpic.js
import React from 'react';
import '../../css/BacklogPage/AddEpic.css';
function AddEpic() {

  return (
    <div className='addEpic'>
        <button type="button" class="button">
            <span class="button__text">Epic생성하기</span>
            <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
        </button>
    </div>
  );
}

export default AddEpic;