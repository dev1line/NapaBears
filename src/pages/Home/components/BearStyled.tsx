import { Col } from 'styled-bootstrap-grid';
import styled from 'styled-components';

export const HalloweenBearContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const HallweenBearText = styled.img`
  @media (max-width: 1280px) {
    width: 100%;
  }
`;

export const BearImage = styled.img`
  width: 217px;
  height: 216px;
  @media (max-width: 550px) {
    width: 170px;
    height: 169px;
  }
`;

export const BearImageContainer = styled.div`
  display: grid;
  grid-template-columns: 217px 216px;
  column-gap: 12px;
  row-gap: 14px;
  @media (max-width: 550px) {
    grid-template-columns: 170px 169px;
  }
`;

export const TextContainer = styled.div`
  @media (max-width: 1024px) {
    text-align: center;
    & > * {
      text-align: center;
    }
  }
`;

export const OrangeText = styled.span`
  color: #f56200;
`;

export const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1024px) {
    margin-bottom: 32px;
  }
`;
