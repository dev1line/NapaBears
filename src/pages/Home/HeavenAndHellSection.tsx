import { Col, Container, Row } from 'styled-bootstrap-grid';
import {
  BearImageContainer,
  BearImage,
  HalloweenBearContainer,
  StyledCol,
  TextContainer,
} from './components/BearStyled';
import Bear1 from 'assets/v2/heaven_bear_1.png';
import Bear2 from 'assets/v2/heaven_bear_2.png';
import Bear3 from 'assets/v2/heaven_bear_3.png';
import Bear4 from 'assets/v2/heaven_bear_4.png';
import { Typography } from 'components/Typography';

const HeavenAndHellSection = () => {
  return (
    <HalloweenBearContainer>
      <Container>
        <Row justifyContent="between" alignItems="center">
          <StyledCol xs={24} lg={11} xl={9}>
            <BearImageContainer>
              <BearImage src={Bear1} />
              <BearImage src={Bear2} />
              <BearImage src={Bear3} />
              <BearImage src={Bear4} />
            </BearImageContainer>
          </StyledCol>
          <Col xs={24} lg={13} xl={14}>
            <TextContainer>
              <Typography fontSize={48} lineHeight={56} fontWeight="bold">
                HEAVEN AND HELL
              </Typography>
              <Typography mt={15} mb={36}>
                November 11th - 15th, 2021
              </Typography>
              <Typography align="justify" mb={19}>
                All throughout October the Halloween Bears haunted the metaverse, terrifying anyone and anything they
                set their eyes on. In the ensuing chaos, an evil coven of Witches has taken over! Luckily, a valiant
                force of Angels have stepped up to fend them off. Will you be #blessed enough to mint an Angel and save
                the Metaverse?!
              </Typography>
            </TextContainer>
          </Col>
        </Row>
      </Container>
    </HalloweenBearContainer>
  );
};

export default HeavenAndHellSection;
