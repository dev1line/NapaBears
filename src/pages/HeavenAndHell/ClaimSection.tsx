import { useState } from 'react';
import { Typography, TypographySpan } from 'components/Typography';
import { Col, Container, Row } from 'styled-bootstrap-grid';
import styled from 'styled-components';
import BearSelectModal from './BearSelectModal';

const TypoProps = { color: '#040813', fontSize: 24, fontWeight: 'bold', lineHeight: 28 };

const ClaimSection = ({ balance, tokensOfOwner, availBears, handleRoll }: any) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const calculateEntry = () => {
    const divided = Math.floor(balance / 50);
    if (divided > availBears.length) return availBears.length;
    return divided;
  };

  return (
    <Container>
      <CardOuter>
        <CardInner>
          <Row justifyContent="center" alignItems="center">
            <>
              <Col xs={24} lg={13}>
                <Typography {...TypoProps}>$NAPAS Balance: ${Number(balance).toFixed(2)}</Typography>
                <Typography mt={15} mb={15} {...TypoProps}>
                  Total NapaBears: {tokensOfOwner.length}&nbsp;
                  <TypographySpan {...TypoProps} fontWeight="normal">
                    (Available: {availBears.length}, Rolled: {tokensOfOwner.length - availBears.length})
                  </TypographySpan>
                </Typography>
                <Typography {...TypoProps}>Available Entry: {calculateEntry()} </Typography>
              </Col>
              <Col xs={24} lg={11}>
                <Row justifyContent="end">
                  <ButtonBase onClick={toggleOpen} disabled={calculateEntry() === 0}>
                    Roll Bears
                  </ButtonBase>
                </Row>
              </Col>
            </>
          </Row>
        </CardInner>
      </CardOuter>
      {open && <BearSelectModal handleRoll={handleRoll} onClose={toggleOpen} bears={availBears} />}
    </Container>
  );
};

export default ClaimSection;

const CardOuter = styled.div`
  margin-top: 125px;
  background: #dee3e7;
  border-radius: 20px;
  width: 100%;
  padding: 14px 17px;
`;

const CardInner = styled.div`
  width: 100%;
  border: 5px solid #bbc4cb;
  border-radius: 20px;
  padding: 19px 25px;
`;

const disabledStyles = `
cursor: not-allowed !important;
box-shadow: unset !important;
color:#FFFFFF80;
& > * {
color:#FFFFFF80 !important;
}

&:hover {
  box-shadow: none !important;
  filter: none !important;
}
`;

const ButtonBase = styled.button`
  all: unset;
  background: #098d60;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;
  color: #ffffff;
  text-align: center;
  height: 100%;
  padding: 50px 85px;
  &:hover {
    filter: brightness(120%);
  }
  &:active {
    transform: scale(0.8);
    transition: all 0.5s;
  }

  @media (max-width: 1280px) {
    padding: 32px 45px;
    margin-top: 32px;
  }
  @media (max-width: 768px) {
    padding: 22px 35px;
  }
  @media (max-width: 640px) {
    padding: 18px 35px;
    width: 100%;
  }
  ${(props) => props.disabled && disabledStyles}
`;
