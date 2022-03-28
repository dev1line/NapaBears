import { Typography } from 'components/Typography';
import React from 'react';
import { Col, Container, Row } from 'styled-bootstrap-grid';
import { DiscordButton, FooterContainer } from './components/FooterStyled';

const FooterSection = () => {
  return (
    <FooterContainer>
      <Container>
        <Row justifyContent="end" alignItems="center">
          <Col xs={24} lg={12}>
            <Typography mb={32} fontSize={48} lineHeight={56} fontWeight="bold">
              Grab a Bear and Save <br /> the Metaverse
            </Typography>
            <DiscordButton target="_blank" rel="noopener noreferrer" href="/">
              Join Discord Community
            </DiscordButton>
          </Col>
        </Row>
      </Container>
    </FooterContainer>
  );
};

export default FooterSection;
