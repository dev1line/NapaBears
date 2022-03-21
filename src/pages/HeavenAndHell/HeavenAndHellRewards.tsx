import React from 'react';
import styled, { css } from 'styled-components';
import { useWallet } from 'hooks/useWallet';
import { Typography } from '../Stake/Typography';
import { Container } from 'styled-bootstrap-grid';

const HeavenAndHellRewards = ({ handleClaimAngelRewards, angelRewards, paused }: any) => {
  const { library } = useWallet();

  return (
    <Container>
      <ClaimRewards>
        <TitleClaimRewards fontSize={30} color="#B4C4FB" strong>
          Heaven Rewards{' '}
          <Button disabled={Number(angelRewards) === 0 || paused} onClick={handleClaimAngelRewards}>
            Claim
          </Button>
        </TitleClaimRewards>
        <ClaimRewardAmount strong fontSize={36} lineHeight="40px">
          {Number(library?.utils?.fromWei('' + angelRewards, 'ether') || 0).toFixed(2)} $BERRIES
        </ClaimRewardAmount>
      </ClaimRewards>
    </Container>
  );
};

const buttonBase = css`
  font-style: normal;
  font-weight: normal;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    filter: brightness(0.8);
  }
`;

const disabledStyles = `
    cursor: not-allowed !important;
    box-shadow: unset !important;
    color:#FFFFFF80;
    & > * {
        color:#FFFFFF80 !important;
    }
    &:hover {
        background-color: #e31d78;
        box-shadow: none !important;
        filter: none !important;
      }
`;

const Button = styled.button`
  background-color: #e31d78;
  border-color: #e31d78;
  border-radius: 20px;
  color: white;
  width: auto;
  font-size: 18px;
  font-family: Roboto;
  font-weight: bold;
  cursor: pointer;
  padding: 13px;
  min-width: 90px;
  ${buttonBase}

  ${(props) => props.disabled && disabledStyles}
`;

const ClaimRewards = styled.div`
  background: #1e3580;
  width: 100%;
  border-radius: 20px;
  padding: 20px 45px 45px;
  margin: 100px auto;
  text-align: center;
  @media (max-width: 1200px) {
    flex: 0 0 100%;
  }
`;

const TitleClaimRewards = styled(Typography)`
  margin-bottom: 0;
  display: flex;
  /* justify-content: flex-start; */
  align-items: center;
  width: 100%;
  line-height: 33px;
  justify-content: center;
  button {
    margin-left: 10px;
    margin-bottom: 5px;
  }
  @media (max-width: 560px) {
    display: block;
    text-align: center;
    button {
      margin: 10px auto;
      display: block;
    }
  }
`;

const ClaimRewardAmount = styled(Typography)`
  margin-top: 20px;
  text-align: center;
`;

export default HeavenAndHellRewards;
