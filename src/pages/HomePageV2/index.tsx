import { useRef } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Hero from './Hero';
import StakeLP from './StakeLP';
import StakeBerries from './StakeBerries';

import { useEagerConnect, useInactiveListener } from 'hooks/web3hook';

interface HomePageV2Props {}

export default function HomePageV2(props: HomePageV2Props) {
  const myRef = useRef(null);
  const executeScroll = () => (myRef as any).current.scrollIntoView();

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager);

  return (
    <Container>
      <Hero />
      <StakeLP />
      <StakeBerries />

      <Header executeScroll={executeScroll} />

    </Container>
  );
}

const Container = styled.div`
  background-color: #6e3b9e;
  color: white;
  font-family: 'Roboto Mono';
  min-height: 87vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;
