import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/TimeLinePage/ComponentTimeline.css';
import { FaSearch } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext.js';

function ComponentTimeline({ onTitleClick, projectKey, projectName }) {
  console.log("componentTimeline projectName: " + projectName);
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
        <div className="project">프로젝트/[<span style={{ color: 'black' }}>{projectName}</span>]</div>
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
        {/* <div className="status-container">
          <div className="status-label">상태 범주</div>

        </div>
        <div className="type-label">에픽</div> */}

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
