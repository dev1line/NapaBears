import styled from 'styled-components';

export const ThreeDot = styled.div`
  position: relative;
  margin: 100px auto;
  width: 14px;
  height: 14px;
  background-color: #098d60;
  border-color: #9aff4f;
  border-radius: 50%;
  &::after,
  &::before {
    content: '';
    width: 14px;
    height: 14px;
    background-color: #098d60;
    border-color: #9aff4f;
    border-radius: 50%;
    display: block;
    left: 0;
    position: absolute;
  }

  &::after {
    top: 25px;
  }
  &::before {
    top: -25px;
  }
`;
