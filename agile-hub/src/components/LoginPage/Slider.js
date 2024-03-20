import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // 슬라이더 스타일 import

const Slider = () => {
  return (
    <Carousel autoPlay interval={2000} infiniteLoop>
      <div>
        <img src="https://via.placeholder.com/600x400" alt="slide1" />
        <p className="legend">어떤 환경에서든 AgileHub와 함께!</p>
      </div>
      <div>
        <img src="https://via.placeholder.com/600x400" alt="slide2" />
        <p className="legend">애자일을 원하는 모든 이를 위한 최적의 선택!</p>
      </div>
      <div>
        <img src="https://via.placeholder.com/600x400" alt="slide3" />
        <p className="legend">프로젝트 관리의 혁신, 간편하고 명확하게!</p>
      </div>
    </Carousel>
  );
};

export default Slider;



/* 
import React, { useState, useEffect } from 'react';

const Slider = () => {
  const trainCompartment = ['1 칸', '2 칸', '3 칸']; // 이미지 = 칸
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % trainCompartment.length);
    }, 3000); // 3초마다 슬라이드 변경

    return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 인터벌 제거
  }, [trainCompartment.length]); // trainCompartment.length를 의존성 배열에 추가

  return (
    <div className='slider'>
      <div className='slider-show'>
        {trainCompartment.map((item, index) => (
          <div
            className='compartment'
            key={index}
            style={{
              transform: `translateX(${index * -1100}px)`, // 슬라이드 이동 위치 계산
              transition: 'transform 0.4s ease-in-out', // 슬라이드 효과
              opacity: index === currentIndex ? 1 : 0, // 현재 슬라이드만 표시되도록 opacity 설정
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;

*/