import styled from 'styled-components';

export const FooterContainer = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
`;

export const CollapseContainer = styled.div`
  margin-top: 43px;
  width: 100%;
  & > * {
    margin-bottom: 29px;
  }
`;

export const BearImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 24px;
  margin-bottom: 25px;
  & > * {
    margin-right: 31px;
  }
  @media (max-width: 768px) {
    & > * {
      margin-right: 12px;
    }
  }
`;

export const BearImageWrapper = styled.div`
  text-align: center;
  width: fit-content;
  margin-bottom: 12px;
`;
