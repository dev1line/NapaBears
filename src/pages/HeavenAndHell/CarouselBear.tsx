import React from 'react';
import styled, { keyframes } from 'styled-components';
import BearSlideImage from 'assets/v2/bear_slide.svg';
import HNH from 'assets/v2/global.jpg';

const CarouselBear = () => {
  return (
    <>
      <HeavenAndHellImage src={HNH} />

      <SlideMain>
        <Mover />
      </SlideMain>
    </>
  );
};

export default CarouselBear;

const HeavenAndHellImage = styled.img`
  width: 100%;
  object-fit: cover;
  /* max-height: 800px; */
`;

const SlideMain = styled.div`
  margin-top: -7px;
  height: 240px;
  width: 100%;
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  & > div {
    height: 240px;
    width: 2880px;
    background: url(${BearSlideImage});
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    transform: translate3d(0, 0, 0);
  }
`;

const moveSlideshow = keyframes`
 100% { 
    transform: translateX(-40%);  
  }
`;

const Mover = styled.div`
  animation: ${moveSlideshow} 12s linear infinite;
`;
