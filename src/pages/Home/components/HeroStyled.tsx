import styled, { css } from 'styled-components';
import HeroBackground from 'assets/v2/hero_background.svg';

export const HeroContainer = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  background: url(${HeroBackground}) center no-repeat;
  background-size: cover;
  display: flex;
  align-items: flex-end;
`;

export const MetaBearText = styled.img`
  position: absolute;
  left: 50%;
  top: 63%;
  transform: translate(-50%, -50%);
  @media (max-width: 1280px) {
    width: 80%;
  }
  @media (max-width: 768px) {
    width: 95%;
  }
`;

export const BearImageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1280px;
  margin: 0px auto;
`;

export const BearImage = styled.img<{ bottom?: number; xsHidden?: boolean }>`
  position: relative;
  ${(p) =>
    p.bottom &&
    css`
      bottom: ${p.bottom}px;
    `}
  @media (max-width: 1140px) {
    height: 186px;
  }
  @media (max-width: 723px) {
    height: 136px;
    bottom: 0px;
  }
  @media (max-width: 530px) {
    height: 146px;
    display: ${(p) => (p.xsHidden ? 'none' : 'block')};
  }
`;
