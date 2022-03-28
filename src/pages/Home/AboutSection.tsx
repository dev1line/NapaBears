import React from 'react';
import { Container } from 'styled-bootstrap-grid';
import { AboutContainer, Box, Content, Headline } from './components/AboutStyled';

const AboutSection = () => {
  return (
    <AboutContainer>
      <Container>
        <Box>
          <Headline>About Napa World</Headline>
          <Content>
            "Napa World is an umbrella DAO project containing multiple NFT collections themed around bears, holidays,
            seasons, and other unique events. Our genesis project, NapaBears, contains 10,000 uniquely-generated NFTs,
            which can be staked to earn $NAPAS!
          </Content>
        </Box>
        <Box>
          <Headline>Current Collections</Headline>
          <Content>
            Each collection of NFTs within the Napa World project contains fully unique, randomly-generated art and
            novel utilities that tie into the Bear Metaverse.
          </Content>
        </Box>
      </Container>
    </AboutContainer>
  );
};

export default AboutSection;
