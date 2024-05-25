// TimelinePage.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Menubar from '../components/Menubar.js';
import ComponentTimeline from '../components/TimelinePage/ComponentTimeline.js';
import TimelineBoard from '../components/TimelinePage/TimelineBoard.js';
function TimelinePage() {
  const location = useLocation();
  const projectKey = location.state?.projectKey;
  console.log("timelinepage projectKey check: "+ projectKey);

  const [selectedTitle, setSelectedTitle] = useState('');
  return (
    <div>
        <Menubar />
        <ComponentTimeline onTitleClick={setSelectedTitle}  projectKey={projectKey} />
      <TimelineBoard moveToTimelineTitle={selectedTitle} projectKey={projectKey} />
    </div>
  );
}

export default TimelinePage;