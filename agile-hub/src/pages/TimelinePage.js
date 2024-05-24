// TimelinePage.js
import React, { useState } from 'react';
import Menubar from '../components/Menubar.js';
import ComponentTimeline from '../components/TimelinePage/ComponentTimeline.js';
import TimelineBoard from '../components/TimelinePage/TimelineBoard.js';
function TimelinePage() {
  const [selectedTitle, setSelectedTitle] = useState('');
  return (
    <div>
        <Menubar/>
        <ComponentTimeline onTitleClick={setSelectedTitle} />
      <TimelineBoard moveToTimelineTitle={selectedTitle} />
    </div>
  );
}

export default TimelinePage;