import React from 'react';
import { useNavigate , useLocation} from "react-router-dom";
import logoIcon from "../assets/logoWhite.png";
import projectIcon from "../assets/ProjectIcon.png";
import membersIcon from "../assets/MembersIcon.png";
import backlogIcon from "../assets/BacklogIcon.png";
import sprintIcon from "../assets/SprintIcon.png";
import myPageIcon from "../assets/MyPageIcon.png";

function Menubar({ projectKey, sprintId, sprintData }) {
  const navigate = useNavigate();
  
  console.log("Menubar projectKey and sprintId and sprintData check: "+ projectKey + sprintId + JSON.stringify(sprintData));

  const menubarStyle = {
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center', 
    width: '20%', 
    minWidth: '300px', 
    height: '100vh',
    float: 'left',
    backgroundColor: '#2E4BBA'
  };

  const menuItemStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center', 
    margin: '10px 0', 
    marginTop: '1.5rem'
  };

  const imageStyle = {
    width: '50px',
    height: 'auto',
    marginRight: '10px' 
  };

  const logoStyle = {
    width: '15rem', 
    height: 'auto',
    marginBottom: '20px', 
    marginTop: '2rem'
  };

  const textStyle = { 
    color: 'white', 
    fontFamily: 'Inter', 
    fontWeight: '700', 
    fontSize: '0.875rem', 
    marginLeft: '1rem'
  }

  return (
    <div style={menubarStyle}>
      <img src={logoIcon} alt="Logo" style={logoStyle}/>
      <div>
        <div style={menuItemStyle} onClick={() => navigate('/myPage')} >
          <img src={projectIcon} alt="Projects" style={imageStyle}/>
          <span style={textStyle}>프로젝트</span>
        </div>
        <div style={menuItemStyle} onClick={() => navigate('/memberManage')} >
          <img src={membersIcon} alt="Members" style={imageStyle}/>
          <span style={textStyle}>멤버</span>
        </div>
        <div style={menuItemStyle} onClick={() => navigate('/backlog', { state: { projectKey, sprintData, sprintId } })}>
          <img src={backlogIcon} alt="Backlog" style={imageStyle}/>
          <span style={textStyle}>백로그</span>
        </div>
        <div style={menuItemStyle} onClick={() => navigate('/sprint', { state: { projectKey, sprintData, sprintId } })}>
          <img src={sprintIcon} alt="Sprint" style={imageStyle}/>
          <span style={textStyle}>스프린트</span>
        </div>
        <div style={menuItemStyle} onClick={() => navigate('/timeline')} >
          {/* <img src={timelineIcon} alt="Timeline" style={imageStyle}/> */}
          <span style={textStyle}>타임라인</span>
        </div>
        <div style={menuItemStyle} onClick={() => navigate('/myPage')} >
          <img src={myPageIcon} alt="My Page" style={imageStyle}/>
          <span style={textStyle}>마이페이지</span>
        </div>
      </div>
    </div>
  );
}

export default Menubar;
