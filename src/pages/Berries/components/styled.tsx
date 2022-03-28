import styled, { css } from 'styled-components';

export const Box = styled.div<{ mt?: number; mb?: number }>`
  ${(p) =>
    p.mt &&
    css`
      margin-top: ${p.mt}px;
    `}
  ${(p) =>
    p.mb &&
    css`
      margin-bottom: ${p.mb}px;
    `}
`;

export const SupplyCard = styled.div`
  border: 5px solid #ffffff;
  padding: 39px 34px 33px 23px;
  @media (max-width: 1280px) {
    margin-top: 22px;
  }
`;
