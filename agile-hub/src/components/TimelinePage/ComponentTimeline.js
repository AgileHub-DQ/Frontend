import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/TimeLinePage/ComponentTimeline.css';
import { FaSearch } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext.js'; 

function ComponentTimeline({ onTitleClick,  projectKey, projectName}) {
  console.log("componentTimeline projectName: "+ projectName);
  // const projectKey = 'P1';
  const { authToken } = useAuth(); 

  const [timelineTitle, setTimelineTitle] = useState([]);
  const [filteredTitles, setFilteredTitles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statistics, setStatistics] = useState([]);
  const [timelineStatus, setTimelineStatus] = useState([]);

  useEffect(() => {
    searchBox();
  }, []);

  useEffect(() => {
    filterTitles(searchTerm);
  }, [searchTerm, timelineTitle]);

  const searchBox = async () => {
    try {
      //const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTU1NzM5OTcsImV4cCI6MTcxNjc4MzU5N30.1PRhxReTmFd2UV4CI5tCrDCNq7Re2p9PNslzwfwy0d8ZZbpuxOuKd1FTwjoTkRIwtYmL2V1gzxaDhchatjKhzA';
      const response = await axios.get(`https://api.agilehub.store/projects/${projectKey}/epics/stats`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      const result = response.data.result || [];
      const statuses = result.map((item) => item.issue?.status || '');
      const statistics = result.map((item) => item.statistic || {});
      const titles = result.map((item) => item.issue?.title || 'No Title');

      setTimelineStatus(statuses);
      setStatistics(statistics);
      setTimelineTitle(titles);

      console.log('statuses:' + JSON.stringify(statuses));
      console.log('statistics:' + JSON.stringify(statistics));
      console.log('titles:' + JSON.stringify(titles));
    } catch (error) {
      console.error('API 요청 실패:', error);
    }
  };

  const filterTitles = (searchTerm) => {
    if (!searchTerm) {
      setFilteredTitles([]);
    } else {
      const filtered = timelineTitle.filter((title) =>
        title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTitles(filtered);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="barentirecontainer">
      <div className="barcontainer">
      <div className="project">프로젝트/<span style={{ color: 'black' }}>[{projectName}]</span></div>
        <div className="timeline_text">타임라인</div>
      </div>
      <div className="bar2container">
        <div className="search-container">
          <input
            type="text"
            id="search"
            className="search"
            placeholder="검색..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FaSearch className="search-icon" />
        </div>
        <div className="status-container">
          <div className="status-label">상태 범주</div>
          {/* 상태 필터링 로직 추가 가능 */}
        </div>
        <div className="type-label">에픽</div>
        {/* 에픽 필터링 로직 추가 가능 */}
      </div>
      {searchTerm && (
        <div style={styles.resultsContainer}>
          {filteredTitles.map((title, index) => (
            <div key={index} style={styles.resultItem} onClick={() => onTitleClick(title)}>
              {title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  resultsContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    width: '350px',
    marginTop: '100px',
    marginLeft: '10px',
    zIndex: 1000,
    border: '1px solid #ddd',
    padding: '10px'
  },
  resultItem: {
    padding: '10px',
    cursor: 'pointer',
    borderBottom: '1px solid #ddd'
  }
};

export default ComponentTimeline;
