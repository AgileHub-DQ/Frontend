// TimelinePage.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Menubar from '../components/Menubar.js';
import ComponentTimeline from '../components/TimelinePage/ComponentTimeline.js';
import TimelineBoard from '../components/TimelinePage/TimelineBoard.js';
function TimelinePage() {
  const location = useLocation();
  const projectKey = location.state?.projectKey;
  const projectName = location.state?.projectName;
  console.log('timelinepage projectKey and projectNamecheck: ' + projectKey + projectName);

  const [selectedTitle, setSelectedTitle] = useState('');
  return (
    <div>
      <Menubar projectKey={projectKey} />
      <ComponentTimeline onTitleClick={setSelectedTitle} projectKey={projectKey} projectName={projectName} />
      <TimelineBoard moveToTimelineTitle={selectedTitle} projectKey={projectKey} />
    </div>
  );
}

export default TimelinePage;
