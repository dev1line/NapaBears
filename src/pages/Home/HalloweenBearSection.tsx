import { Col, Container, Row } from 'styled-bootstrap-grid';
import {
  BearImageContainer,
  OrangeText,
  HalloweenBearContainer,
  StyledCol,
  TextContainer,
  BearImage,
} from './components/BearStyled';
import Bear1 from 'assets/v2/halloween_bear_1.png';
import Bear2 from 'assets/v2/halloween_bear_2.png';
import Bear3 from 'assets/v2/halloween_bear_3.png';
import Bear4 from 'assets/v2/halloween_bear_4.png';

import { Typography } from 'components/Typography';

const HalloweenBearSection = () => {
  return (
    <HalloweenBearContainer>
      <Container>
        <Row justifyContent="between" alignItems="center">
          <StyledCol xs={24} lg={11} xl={9}>
            <BearImageContainer>
              <BearImage alt="bear" src={Bear1} />
              <BearImage alt="bear" src={Bear2} />
              <BearImage alt="bear" src={Bear3} />
              <BearImage alt="bear" src={Bear4} />
            </BearImageContainer>
          </StyledCol>
          <Col xs={24} lg={13} xl={14}>
            <TextContainer>
              <Typography fontSize={48} lineHeight={56} fontWeight="bold">
                NAPA BEARS
              </Typography>
              <Typography mt={15} mb={36}>
                October 10th, 2021
              </Typography>
              <Typography align="justify" mb={19}>
                <OrangeText>NapaBears</OrangeText> is the genesis collection of the Napa World project. It originated as
                a DAO project with the purpose of buying tokens from the popular Bears Deluxe NFT project. The
                collection stealth launched on the Ethereum blockchain on October 10th, 2021 and sold out after 2 days
                with a mint price of 0.05 ETH/token.
              </Typography>
              <Typography align="justify">
                As the genesis project, NapaBears has the most utility of any current, planned, or future collection.
                NapaBears can be staked to earn $NAPAS, which are valued against a vault of fractionalized NFT assets.
                $NAPAS can be used to mint upcoming Napa World collections, along with other utilities we're planning to
                launch soon.
              </Typography>
            </TextContainer>
          </Col>
        </Row>
      </Container>
    </HalloweenBearContainer>
  );
};

export default HalloweenBearSection;
