import styled from 'styled-components';
import Hero from './Hero';
// import StakeLP from './StakeLP';
// import StakeBerries from './StakeBerries';

import { useEagerConnect, useInactiveListener } from 'hooks/web3hook';

interface StakePageProps {}

export default function StakePage(props: StakePageProps) {
  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager);

  return (
    <Container>
      <Hero />
    </Container>
  );
}

const Container = styled.div`
  margin-top: 200px;
  background-color: #040813;
  color: white;
  font-family: 'Roboto Mono';
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;
