import React, { useCallback, useState } from 'react';
import { Container } from 'styled-bootstrap-grid';
import {
  BearImageContainer,
  BearImageWrapper,
  CollapseContainer,
  FooterContainer,
} from './components/DevolopmentStyled';
import { Typography } from 'components/Typography';
import Collapse from './components/Collapse';

import DaoBear1 from 'assets/v2/dao_bear_1.png';
import DaoBear2 from 'assets/v2/dao_bear_2.png';
import DaoBear3 from 'assets/v2/dao_bear_3.png';
import DaoBear4 from 'assets/v2/dao_bear_4.png';
import DaoBear5 from 'assets/v2/dao_bear_5.png';
import DaoBear6 from 'assets/v2/dao_bear_6.png';
import DaoBear7 from 'assets/v2/dao_bear_7.png';

import MultiDaoBear1 from 'assets/v2/multi_dao_bear_1.png';
import MultiDaoBear2 from 'assets/v2/multi_dao_bear_2.png';
import MultiDaoBear3 from 'assets/v2/multi_dao_bear_3.png';
import MultiDaoBear4 from 'assets/v2/multi_dao_bear_4.png';
import MultiDaoBear5 from 'assets/v2/multi_dao_bear_5.png';
import MultiDaoBear6 from 'assets/v2/multi_dao_bear_6.png';

import FutureBuy1 from 'assets/v2/future_buy_1.png';
import FutureBuy2 from 'assets/v2/future_buy_2.png';

const DevolopmentSection = () => {
  const [actives, setActives] = useState<number[]>([]);

  const toggleOpen = useCallback(
    (index: number) => {
      if (actives.includes(index)) {
        return setActives((old) => old.filter((x) => x !== index));
      }

      return setActives([...actives, index]);
    },
    [actives]
  );

  return (
    <FooterContainer>
      <Container>
        {/* <div>
          <Typography mt={24} align="center" fontSize={48} lineHeight={56} fontWeight="bold">
            Christmas Bears
          </Typography>
          <Typography mt={8} mb={11} align="center">
            Release date: TBD
          </Typography>
          <Typography align="center">Coming Soon!</Typography>
        </div> */}

        <div>
          <Typography mt={242} align="center" fontSize={48} lineHeight={56} fontWeight="bold">
            Project Development
          </Typography>

          <CollapseContainer>
            <Collapse
              title="DAO Buys of Bears Deluxe"
              state="Completed"
              open={actives.includes(0)}
              toggleOpen={() => toggleOpen(0)}
            >
              <Typography>
                The DAO purchased 40 Bears Deluxe, which were fractionalized to create the $NAPAS token.
              </Typography>
              <BearImageContainer>
                <BearImageWrapper>
                  <img src={DaoBear1} alt="DaoBear1" />
                </BearImageWrapper>
                <BearImageWrapper>
                  <img src={DaoBear2} alt="DaoBear2" />
                </BearImageWrapper>
                <BearImageWrapper>
                  <img src={DaoBear3} alt="DaoBear3" />
                </BearImageWrapper>
                <BearImageWrapper>
                  <img src={DaoBear4} alt="DaoBear4" />
                </BearImageWrapper>
                <BearImageWrapper>
                  <img src={DaoBear5} alt="DaoBear5" />
                </BearImageWrapper>
                <BearImageWrapper>
                  <img src={DaoBear6} alt="DaoBear6" />
                </BearImageWrapper>
                <BearImageWrapper>
                  <img src={DaoBear7} alt="DaoBear7" />
                </BearImageWrapper>
              </BearImageContainer>
            </Collapse>

            <Collapse
              title="Multi-signature DAO Wallet"
              state="Completed"
              open={actives.includes(1)}
              toggleOpen={() => toggleOpen(1)}
            >
              <Typography align="justify">
                To achieve a fully decentralized project, we implemented a multi-signature wallet that contains the
                DAO's assets. 6 signers comprising members of the development team, moderation team, and community were
                selected. At least 4/6 members must sign off on any transaction for it to be executed.
              </Typography>
              <BearImageContainer>
                <BearImageWrapper>
                  <img src={MultiDaoBear1} alt="MultiDaoBear1" />
                  <Typography align="center" mt={11}>
                    Polar Bear
                  </Typography>
                </BearImageWrapper>

                <BearImageWrapper>
                  <img src={MultiDaoBear2} alt="MultiDaoBear2" />
                  <Typography align="center" mt={11}>
                    Spooky Bear
                  </Typography>
                </BearImageWrapper>

                <BearImageWrapper>
                  <img src={MultiDaoBear3} alt="MultiDaoBear3" />
                  <Typography align="center" mt={11}>
                    NFT Nato
                  </Typography>
                </BearImageWrapper>

                <BearImageWrapper>
                  <img src={MultiDaoBear4} alt="MultiDaoBear4" />
                  <Typography align="center" mt={11}>
                    BobbyBooshay
                  </Typography>
                </BearImageWrapper>

                <BearImageWrapper>
                  <img src={MultiDaoBear5} alt="MultiDaoBear5" />
                  <Typography align="center" mt={11}>
                    Idolator
                  </Typography>
                </BearImageWrapper>

                <BearImageWrapper>
                  <img src={MultiDaoBear6} alt="MultiDaoBear6" />
                  <Typography align="center" mt={11}>
                    Spooky Mama Bear
                  </Typography>
                </BearImageWrapper>
              </BearImageContainer>
            </Collapse>

            <Collapse
              title="Staking Contract and & UI "
              state="Completed"
              open={actives.includes(3)}
              toggleOpen={() => toggleOpen(3)}
            >
              <Typography align="justify">
                The $NAPAS staking contract and website UI were deployed on 11-1-2021. Stake your bears to earn $NAPAS!
              </Typography>
            </Collapse>

            <Collapse
              title="Future Bluechip Buys"
              state="Ongoing"
              open={actives.includes(4)}
              toggleOpen={() => toggleOpen(4)}
            >
              <Typography>
                Apart from Bears Deluxe, the DAO has purchased a CyberKong and Kaiju King. Future buys will be voted on
                by the DAO as funds permit.
              </Typography>
              <BearImageContainer>
                <img src={FutureBuy1} alt="FutureBuy1" />
                <img src={FutureBuy2} alt="FutureBuy2" />
              </BearImageContainer>
            </Collapse>

            <Collapse
              title="Post-Staking Utility"
              state="Ongoing"
              open={actives.includes(5)}
              toggleOpen={() => toggleOpen(5)}
            >
              <Typography align="justify">
                We're constantly thinking of new and innovative ways to utilize $NAPAS. From minting future NFT
                collections to entering raffles and community games, the sky is the limit. Utilities can be proposed and
                voted on by the DAO.
              </Typography>
            </Collapse>
          </CollapseContainer>
        </div>
      </Container>
    </FooterContainer>
  );
};

export default DevolopmentSection;
