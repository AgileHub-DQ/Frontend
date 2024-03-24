// Slider.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import '../../css/LoginPage/Slider.css'; // 슬라이더 텍스트 css, 슬라이더 css보다 위에 import 해주어야 함
import 'react-responsive-carousel/lib/styles/carousel.min.css'; //슬라이더 css

const Slider = () => {
  return (
    <Carousel autoPlay interval={2000} infiniteLoop showIndicators showArrows>
      <div>
        <img src="https://via.placeholder.com/600x550" alt="slide1" />
        <p className="legend">어떤 환경에서든 AgileHub와 함께!</p>
      </div>
      <div>
        <img src="https://via.placeholder.com/600x550" alt="slide2" />
        <p className="legend">애자일을 원하는 모든 이를 위한 최적의 선택!</p>
      </div>
      <div>
        <img src="https://via.placeholder.com/600x550" alt="slide3" />
        <p className="legend">프로젝트 관리의 혁신, 간편하고 명확하게!</p>
      </div>
    </Carousel>
  );
};

export default Slider;