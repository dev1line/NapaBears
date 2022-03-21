import { FC } from 'react';
import { Container } from 'styled-bootstrap-grid';
import styled from 'styled-components';
import WhatBerriesSection from './WhatBerriesSection';
import UtilitySection from './UtilitySection';
import TokenomicSection from './TokenomicSection';
import LiquidSection from './LiquidSection';

const BerriesPage: FC = () => {
  return (
    <BerriesContainer>
      <Container>
        <WhatBerriesSection />
        <UtilitySection />
        <TokenomicSection />
        <LiquidSection />
      </Container>
    </BerriesContainer>
  );
};

export default BerriesPage;

const BerriesContainer = styled.div`
  padding-top: 120px;
  padding-bottom: 120px;
  min-height: 100vh;
`;
