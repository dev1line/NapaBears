import React from 'react';
import styled from 'styled-components';
import scrollImg from 'assets/images/scroll.png';
const Scroll = ({ executeScroll }: any) => {
  return (
    <Container>
      <img src={scrollImg} alt="scroll-img" className="vert-move" onClick={executeScroll} />
      {/* Scroll */}
    </Container>
  );
};
const Container = styled.div`
  padding-top: 50px;
  text-align: center;
  cursor: pointer;
  img.vert-move {
    -webkit-animation: mover 0.7s infinite alternate;
    animation: mover 0.7s infinite alternate;
  }
  @-webkit-keyframes mover {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-10px);
    }
  }
  @keyframes mover {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-10px);
    }
  }
`;

export default Scroll;
