// TimelinePage.js
import Menubar from '../components/Menubar.js';
import ComponentTimeline from '../components/TimelinePage/ComponentTimeline.js';
import TimelineBoard from '../components/TimelinePage/TimelineBoard.js';
function TimelinePage() {

  return (
    <div>
        <Menubar/>
        <ComponentTimeline/>
        <TimelineBoard/>
    </div>
  );
}

export default TimelinePage;