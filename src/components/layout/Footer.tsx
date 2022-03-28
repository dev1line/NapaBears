import { FC } from 'react';
import styled from 'styled-components';
// import MetaBearText from 'assets/v2/metabear_text.svg';
import { Col, Container, Row } from 'styled-bootstrap-grid';
import Twitter from 'assets/v2/twitter.svg';
import Etherscan from 'assets/v2/etherscan.svg';
import Opensea from 'assets/v2/opensea.svg';
import Discord from 'assets/v2/discord.svg';
import { Link } from 'react-router-dom';

const FooterComponent: FC = () => {
  return (
    <Footer>
      <Container>
        <Row alignItems="start" justifyContent="between">
          <Col alignSelf="center" xs={24} md={12} lg={8}>
            {/* <MetaBearLogo src={MetaBearText} /> */}
          </Col>
          <Col xs={24} md={12} lg={8}>
            <HeadLine>CONTENT</HeadLine>
            {/* <Typo>$NAPAS</Typo> */}
            <Typo>
              <Link to="/stake">Stake & Earn $NAPAS</Link>
            </Typo>
            <Typo>
              <Link to="/heaven-n-hell">Roll Event</Link>
            </Typo>
            <Typo>
              <a href="/napas" target="_blank" rel="noopener noreferrer">
                $NAPAS Detail
              </a>
            </Typo>
          </Col>
          <Col xs={24} md={24} lg={6}>
            <HeadLine>LINKS</HeadLine>
            <Row>
              <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/">
                <SocialImg src={Discord} />
              </a>
              <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/">
                <SocialImg src={Twitter} />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://rinkeby.etherscan.io/address/0x2b2758787De93EF68aDd99590405e1380470Ec66"
              >
                <SocialImg src={Etherscan} />
              </a>
              <a target="_blank" rel="noopener noreferrer" href="https://testnets.opensea.io/collection/allnapabears">
                <SocialImg src={Opensea} />
              </a>
            </Row>
          </Col>
        </Row>
        <Diviver />

        <PolicyContainer>
          <PolicyTypo>Terms and conditions</PolicyTypo>
          <PolicyTypo>Privacy</PolicyTypo>
          <PolicyTypo>© 2022 Napa World</PolicyTypo>
        </PolicyContainer>
      </Container>
    </Footer>
  );
};

export default FooterComponent;

const Footer = styled.footer`
  padding-top: 50px;
  padding-bottom: 50px;
`;

// const MetaBearLogo = styled.img`
//   width: 293px;
//   height: 40px;
// `;

const HeadLine = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 32px;
  text-transform: uppercase;
  margin-bottom: 10px;
  color: #098d60;
  @media (max-width: 1024px) {
    margin-top: 32px;
  }
`;

const Typo = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 32px;
  color: #ffffff;
  a {
    color: #ffffff;
    text-decoration: none;
  }
`;

const Diviver = styled.div`
  margin-top: 32px;
  margin-bottom: 42px;
  width: 100%;
  height: 1px;

  background: #ffffff;
  mix-blend-mode: normal;
  opacity: 0.2;
`;

const SocialImg = styled.img`
  all: unset;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 15px;
`;

const PolicyContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 1024px) {
    justify-content: space-around;
  }
`;

const PolicyTypo = styled.a`
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 32px;
  margin-left: 61px;
  color: #ffffff;
  @media (max-width: 1024px) {
    margin-left: 0;
  }
`;
