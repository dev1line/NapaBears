import React from 'react';
import { Container } from 'styled-bootstrap-grid';
import { Typography } from 'components/Typography';
import styled from 'styled-components';

import Schedule from 'assets/v2/schedule.svg';
import Dice from 'assets/v2/dice.svg';
import Badge from 'assets/v2/badge.svg';

const InfoSection = () => {
  return (
    <InfoSectionContainer>
      <Container>
        <div>
          <Typography fontSize={64} fontWeight="bold" lineHeight={75}>
            Heaven or Hell
          </Typography>
          <Typography mt={17} fontSize={24} lineHeight={28}>
            All throughout October, the Halloween Bears haunted the Metaverse, terrifying anyone and anything they set
            their eyes on. In the ensuing chaos, an evil coven of Witch Bears have taken over! Luckily, a valiant force
            of Angel Bears have stepped up to fend them off. Will you be #blessed enough to mint an Angel and save the
            Metaverse?!
          </Typography>
        </div>
        <Typography mt={37} />
        <ItemWraper>
          <img src={Schedule} alt="schedule" />
          <Typography fontSize={24} lineHeight={28}>
            Date & Time : Nov 11th - 15th, 2021(Evening EST)
          </Typography>
        </ItemWraper>
        <ItemWraper>
          <img src={Badge} alt="schedule" />
          <Typography fontSize={24} lineHeight={28}>
            Entry Price: 50 $BERRIES per roll/mint (one roll per Halloween Bear you own)
          </Typography>
        </ItemWraper>
        <ItemWraper>
          <img src={Dice} alt="schedule" />
          <Typography fontSize={24} lineHeight={28}>
            Chances: 10% Angels, 80% Witches, 10% Empty
          </Typography>
        </ItemWraper>
      </Container>
    </InfoSectionContainer>
  );
};

export default InfoSection;

const InfoSectionContainer = styled.div`
  margin-top: 55px;
`;

const ItemWraper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 28px;
  & > img {
    margin-right: 17px;
  }
`;
