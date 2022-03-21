import styled from 'styled-components';

export const ThreeDot = styled.div`
  position: relative;
  margin: 100px auto;
  width: 14px;
  height: 14px;
  background: #e31d78;
  border-radius: 50%;
  &::after,
  &::before {
    content: '';
    width: 14px;
    height: 14px;
    background: #e31d78;
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
