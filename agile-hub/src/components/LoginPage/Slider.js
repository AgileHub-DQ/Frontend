import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // 슬라이더 스타일 import

const Slider = () => {
  return (
    <Carousel autoPlay interval={3000} infiniteLoop>
      <div>
        <img src="https://via.placeholder.com/600x400" alt="slide1" />
        <p className="legend">Slide 1</p>
      </div>
      <div>
        <img src="https://via.placeholder.com/600x400" alt="slide2" />
        <p className="legend">Slide 2</p>
      </div>
      <div>
        <img src="https://via.placeholder.com/600x400" alt="slide3" />
        <p className="legend">Slide 3</p>
      </div>
    </Carousel>
  );
};

export default Slider;
