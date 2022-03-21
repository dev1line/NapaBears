import { useState } from 'react';
import { Col, Container, Row } from 'styled-bootstrap-grid';
import BearGIF from 'assets/v2/bear.gif';
import styled from 'styled-components';
import { Typography, TypographySpan } from 'components/Typography';

const CheckBearSection = ({ handleCheckRoll, isValid }: any) => {
  const [id, setId] = useState<any>('');

  return (
    <CheckBearContainer>
      <Container>
        <Row justifyContent="center" alignItems="center">
          <ImageCol className="f-center" xs={24} lg={10} xl={8}>
            <img src={BearGIF} alt="bear" width="378" height="378" />
          </ImageCol>
          <Col xs={24} lg={14} xl={16}>
            <Typography fontSize={48} lineHeight={56} fontWeight="bold">
              Check your Bears here!
            </Typography>
            <Typography mt={15} fontSize={24} lineHeight={28}>
              Every Bear can only be rolled once. Enter the
              <TypographySpan fontSize={24} lineHeight={28} color="#e31d78">
                &nbsp;Token ID&nbsp;
              </TypographySpan>
              to check whether this Bear has been rolled in this event.
              <TypographySpan fontSize={24} lineHeight={28} color="#e31d78">
                &nbsp;*The Token ID&nbsp;
              </TypographySpan>
              can be found under the details tab of the OpenSea page.
            </Typography>
            <FormWrapper>
              <Input value={id} onChange={(e) => setId(e.target.value)} type="text" />
              <Button onClick={() => handleCheckRoll(id)}>Check</Button>
            </FormWrapper>

            {isValid && (
              <Typography mt={25} fontSize={24} lineHeight={28} color="#11CE5D">
                Congrats, this bear is available to roll.
              </Typography>
            )}
            {isValid === false && (
              <Typography mt={25} fontSize={24} lineHeight={28} color="#DC1B1B">
                Sorry, this bear has been rolled.
              </Typography>
            )}
          </Col>
        </Row>
      </Container>
    </CheckBearContainer>
  );
};

export default CheckBearSection;

const CheckBearContainer = styled.div`
  margin-top: 113px;
  margin-bottom: 102px;
`;

const ImageCol = styled(Col)`
  display: flex;
  justify-content: center;
  @media (max-width: 1024px) {
    margin-bottom: 32px;
  }
  & > img {
    border-radius: 40px;
  }
`;

const Input = styled.input`
  width: 123px;
  height: 62px;
  font-size: 24px;
  padding-left: 12px;
  margin-right: 48px;
`;

const FormWrapper = styled.div`
  margin-top: 22px;
  display: flex;
`;

const Button = styled.button`
  all: unset;
  background: #e31d78;
  border-radius: 20px;
  cursor: pointer;
  font-size: 24px;
  line-height: 28px;
  color: #ffffff;
  text-align: center;
  width: 116px;
  height: 62px;
  &:hover {
    filter: brightness(120%);
  }
  &:active {
    transform: scale(0.8);
    transition: all 0.5s;
  }
`;
