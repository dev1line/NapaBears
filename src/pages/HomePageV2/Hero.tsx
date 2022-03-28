import { FC, useEffect, useState } from 'react';
import { Col, Container, Row } from 'styled-bootstrap-grid';
import BearAvatar from 'assets/images/bear/bear.gif';
import Mummybear from 'assets/images/bear/Mummybear-1.png';
import { getContractBear, getContractStake, getContractStakeOld, getContractBerriesToken } from 'utils/getContract';
import { BERRIES_STAKING_CONTRACT } from 'utils/constants';

import StakeModal from './StakeModal';
import UnStakeModal from './UnStakeModal';

import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useWallet } from 'hooks/useWallet';
import { WalletConnect } from 'components/WalletConnect';
import { AccountInfo } from 'components/AccountInfo';

const Hero: FC = () => {
  const { active, account, connector, library } = useWallet();
  // const { active, connector, library } = useWallet();
  // const account = '0xdddd34f88b475dae9fef76af218b00cca0d7a06a';
  const [data, setData] = useState({
    totalRewards: 0,
    balance: 0,
    stakedBear: [],
    totalBears: 0,
    totalCount: 0,
    tokensOfOwner: [],
    allStakedBear: 0,
    isApprovedForAll: false,
    stakedBearOld: [],
  });
  const [open, setOpen] = useState({
    stakeModal: false,
    unStakeModal: false,
  });

  const [loading, setLoading] = useState('');
  const refetch = async (message?: string) => {
    if (!library) return;
    try {
      const { contract: stakeContract } = await getContractStake(connector);
      const stakedBear = await stakeContract.methods.depositsOf(account).call();
      const { contract: stakeContractOld } = await getContractStakeOld(connector);

      const stakedBearOld = await stakeContractOld.methods.depositsOf(account).call();

      const rewards = await stakeContract.methods.calculateRewards(account, stakedBear || []).call();
      const totalRewardETH =
        rewards.length > 0 &&
        rewards.reduce((prev: any, curr: any) => {
          return prev + Number(library.utils.fromWei(curr, 'ether'));
        }, 0);

      const { contract: BerriesTokenContract } = await getContractBerriesToken(connector);
      const balance = await BerriesTokenContract.methods.balanceOf(account).call();

      const { contract: bearContract } = await getContractBear(connector);
      const totalBears = await bearContract.methods.totalBears().call();
      const totalCount = await bearContract.methods.totalCount().call();
      const tokensOfOwner = await bearContract.methods.tokensOfOwner(account).call();
      const allStakedBear = await bearContract.methods.balanceOf(BERRIES_STAKING_CONTRACT).call();
      const isApprovedForAll = await bearContract.methods.isApprovedForAll(account, BERRIES_STAKING_CONTRACT).call();

      setData({
        totalRewards: totalRewardETH,
        balance: Number(library.utils.fromWei(balance, 'ether')),
        stakedBear,
        totalBears,
        totalCount,
        tokensOfOwner,
        allStakedBear,
        isApprovedForAll,
        stakedBearOld,
      });
      setLoading('');
      message && toast.success(message);
    } catch (err: any) {
      console.log(err);
      // toast.warning('Error connecting to network');
    }
  };
  useEffect(() => {
    const getBlockchainData = async () => {
      if (connector && library) {
        try {
          setLoading('Loading');
          const { contract: stakeContract } = await getContractStake(connector);
          const { contract: stakeContractOld } = await getContractStakeOld(connector);

          const stakedBearOld = await stakeContractOld.methods.depositsOf(account).call();

          const stakedBear = await stakeContract.methods.depositsOf(account).call();

          const { contract: BerriesTokenContract } = await getContractBerriesToken(connector);
          const balance = await BerriesTokenContract.methods.balanceOf(account).call();

          const { contract: bearContract } = await getContractBear(connector);
          const totalBears = await bearContract.methods.totalBears().call();
          const totalCount = await bearContract.methods.totalCount().call();
          const tokensOfOwner = await bearContract.methods.tokensOfOwner(account).call();
          const rewards = await stakeContract.methods.calculateRewards(account, stakedBear || []).call();
          const totalRewardETH =
            rewards.length > 0 &&
            rewards.reduce((prev: any, curr: any) => {
              return prev + Number(library.utils.fromWei(curr, 'ether'));
            }, 0);

          const allStakedBear = await bearContract.methods.balanceOf(BERRIES_STAKING_CONTRACT).call();
          const isApprovedForAll = await bearContract.methods
            .isApprovedForAll(account, BERRIES_STAKING_CONTRACT)
            .call();

          setData({
            totalRewards: totalRewardETH,
            balance: Number(library.utils.fromWei(balance, 'ether')),
            stakedBear,
            totalBears,
            totalCount,
            tokensOfOwner,
            allStakedBear,
            isApprovedForAll,
            stakedBearOld,
          });
          setLoading('');
        } catch (err: any) {
          console.log(err);
          setLoading('');
        }
      }
    };
    getBlockchainData();
  }, [connector, account, active, library]);

  const handleStake = async (bears: string[]) => {
    try {
      const { contract: stakeContract } = await getContractStake(connector);
      await stakeContract.methods
        .deposit(bears)
        .send({
          from: account,
        })
        .on('transactionHash', async () => {
          setLoading('Staking');
          toggleOpen('stakeModal');
        })
        .on('receipt', async () => {
          setTimeout(() => refetch('Stake success'), 500);
        });
    } catch (err) {
      console.log('err', err);
      setLoading('');
    }
  };

  const handleApprove = async () => {
    try {
      const { contract: bearContract } = await getContractBear(connector);
      const isApprovedForAll = await bearContract.methods.isApprovedForAll(account, BERRIES_STAKING_CONTRACT).call();

      if (isApprovedForAll) {
        toast.warn('Already Approved');
        await refetch(undefined);
        return;
      }

      await bearContract.methods
        .setApprovalForAll(BERRIES_STAKING_CONTRACT, true)
        .send({
          from: account,
        })
        .on('transactionHash', async () => {
          setLoading('Approving');
        })
        .on('receipt', async () => {
          refetch('Approve success!');
        });
    } catch (err: any) {
      console.log({ err });
      if (err.message.includes('execution reverted')) {
        toast.error(err.message.substr(0, err.message.indexOf('{')) || err.message);
      } else {
        toast.error(err.message);
      }
    }
  };

  const handleClaimRewards = async () => {
    try {
      const { contract: stakeContract } = await getContractStake(connector);
      await stakeContract.methods
        .claimRewards(data.stakedBear)
        .send({
          from: account,
        })
        .on('transactionHash', async () => {
          setLoading('Claiming reward');
        })
        .on('receipt', async () => {
          refetch('Claim rewards success!');
        });
    } catch (err: any) {
      setLoading('');
      if (err.message.includes('execution reverted')) {
        toast.error(err.message.substr(0, err.message.indexOf('{')) || err.message);
      } else {
        toast.error(err.message);
      }
    }
  };

  const handleUnstake = async (bears: string[]) => {
    try {
      const { contract: stakeContract } = await getContractStake(connector);
      await stakeContract.methods
        .withdraw(bears)
        .send({
          from: account,
        })
        .on('transactionHash', async () => {
          setLoading('Unstaking');
          toggleOpen('unStakeModal');
        })
        .on('receipt', async () => {
          refetch('Unstake success!');
        });
    } catch (err) {
      setLoading('');
    }
  };

  const handleUnstakeOld = async (bears: string[]) => {
    try {
      const { contract: stakeContractOld } = await getContractStakeOld(connector);
      await stakeContractOld.methods
        .withdraw(bears)
        .send({
          from: account,
        })
        .on('transactionHash', async () => {
          setLoading('Unstaking');
          toggleOpen('unStakeModal');
        })
        .on('receipt', async () => {
          refetch('Unstake success!');
        });
    } catch (err) {
      setLoading('');
    }
  };

  const toggleOpen = (key: 'stakeModal' | 'unStakeModal') => {
    setOpen((old) => ({ ...old, [key]: !old[key] }));
  };

  const {
    totalRewards,
    balance,
    stakedBear,
    totalCount,
    tokensOfOwner,
    allStakedBear,
    isApprovedForAll,
    stakedBearOld,
  } = data;

  return (
    <>
      <HeroWrapper>
        <AccountInfo />

        {loading !== '' && (
          <Loading>
            <LoadingContent>{loading} ...</LoadingContent>
          </Loading>
        )}
        <StyledContainer className="relative">
          <Row justifyContent="end">
            <Col xs={24} md={20} lg={15}>
              <Navbar>
                <ButtonBuyOnOpenSea>
                  {' '}
                  <a href="https://testnets.opensea.io/collection/allnapabears" target="blank">
                    Buy on Opensea
                  </a>
                </ButtonBuyOnOpenSea>
                <BearCircle src={BearAvatar} />
              </Navbar>
            </Col>
          </Row>
          <Row justifyContent="start">
            <Col xs={24}>
              <StakeTypo>Stake Your</StakeTypo>
            </Col>
          </Row>
          <Row justifyContent="end">
            <Col xs={24}>
              <HalloBearTypo>Napa Bear</HalloBearTypo>
            </Col>
          </Row>
          <Text>1.5x until Wednesday nov 10 for all previous $NAPAS stakers</Text>

          <Hide if={!active}>
            <Row justifyContent="start">
              <Col xs={24} lg={10}>
                <Card>
                  <p>Account Balance</p>
                  <div>{Number(balance).toFixed(2)} $NAPAS</div>
                </Card>
              </Col>
              <Col xs={24} lg={10}>
                <Card>
                  <p>Unstaked Bears</p>
                  <div>{tokensOfOwner.length} BEARS</div>
                </Card>
              </Col>
            </Row>

            <StyledRow justifyContent="start">
              <Col xs={24} lg={10}>
                <Card>
                  <p> {stakedBear.length} Staked Bears</p>
                  <div>
                    <StakeBearTypo>{Number(totalRewards || 0).toFixed(2)} $NAPAS</StakeBearTypo>{' '}
                    <ClaimButton
                      onClick={handleClaimRewards}
                      disabled={Number(totalRewards) === 0 || !isApprovedForAll || stakedBear.length === 0}
                    >
                      Claim
                    </ClaimButton>
                  </div>
                </Card>
              </Col>
              <Col xs={24} lg={10}>
                <Card>
                  <p>PERCENTAGE STAKED</p>
                  <div>{((allStakedBear / totalCount) * 100 || 0).toFixed(2)} % </div>
                </Card>
              </Col>
            </StyledRow>

            <WrapButton>
              <Col xs={24} md={14}>
                {isApprovedForAll ? (
                  <StakeButton disabled={stakedBear.length === 0} onClick={() => toggleOpen('unStakeModal')}>
                    UNSTAKE
                  </StakeButton>
                ) : (
                  <StakeButton onClick={handleApprove}>
                    Approve <BlueTypo>Staking</BlueTypo>
                  </StakeButton>
                )}
              </Col>
              <Col xs={24} md={14}>
                <StakeButton
                  onClick={() => toggleOpen('stakeModal')}
                  disabled={tokensOfOwner.length === 0 || !isApprovedForAll}
                >
                  <BlueTypo>
                    <u>STAKE YOUR BEARS</u>
                  </BlueTypo>
                </StakeButton>
              </Col>
            </WrapButton>
          </Hide>

          <Hide if={active}>
            <Row justifyContent="center">
              <WalletConnect />
            </Row>
          </Hide>

          <BearImage alt="bear" src={Mummybear} />
        </StyledContainer>
      </HeroWrapper>
      {/* {stakedBearOld.length > 0 && ( */}
      <UnstakeContainer>
        <Hide if={!active}>
          <UnstakeTitle>Unstake bears from $sweetz</UnstakeTitle>
          <UnstakeCard>
            <p> {stakedBearOld}BEARS Unstaking</p>
            <div>
              <UnStakingButton onClick={() => handleUnstakeOld(stakedBearOld)} disabled={stakedBearOld.length === 0}>
                UNSTAKE
              </UnStakingButton>
            </div>
          </UnstakeCard>
        </Hide>
      </UnstakeContainer>

      {/* )} */}

      {open.stakeModal && (
        <StakeModal handleStake={handleStake} data={tokensOfOwner} onClose={() => toggleOpen('stakeModal')} />
      )}
      {open.unStakeModal && (
        <UnStakeModal handleUnstake={handleUnstake} data={stakedBear} onClose={() => toggleOpen('unStakeModal')} />
      )}
    </>
  );
};

export default Hero;

const LoadingContent = styled.div`
  padding: 30px;
  border: 1px solid white;
  width: 300px;
  border-radius: 10px;
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  top: 15vw;
  background: white;
  color: black;
`;
const Loading = styled.div`
  width: 100vw;
  height: 200vh;
  position: fixed;
  font-size: 30px;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 1999;
  backdrop-filter: blur(7px);
`;

const buttonStyles = `
  font-style: normal;
  font-weight: normal;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  &:hover {
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    filter: brightness(0.8);
  }
`;

const disabledStyles = `
    cursor: not-allowed !important;
    box-shadow: unset !important;
    background: #949494;
    color:#7a7a7a;
    & > * {
    color:#7a7a7a !important;
    }
    
    &:hover {
      background: #949494;
      box-shadow: none !important;
      filter: none !important;
    }
`;

const HeroWrapper = styled.div`
  position: relative;
  background-color: #5a189a;
`;

const StyledContainer = styled(Container)`
  position: relative;
  min-height: 100vh;
  padding-top: 82px;
`;

const Navbar = styled.div`
  position: relative;
  width: 100%;
  max-width: 523px;
  @media (max-width: 992px) {
    max-width: 523px;
  }
  @media (max-width: 450px) {
    max-width: '100%';
  }
`;

const ButtonBuyOnOpenSea = styled.button`
  all: unset;
  background: #9d4edd;
  border-radius: 30px;
  width: 100%;
  height: 61px;
  text-align: center;
  a {
    letter-spacing: 0.15em;
    line-height: 47px;
    font-size: 40px;
    color: #ff9e00;
    font-style: normal;
    font-weight: normal;
    text-decoration: none;
  }
  ${buttonStyles}
  @media (max-width: 768px) {
    text-align: left;
    padding-left: 20px;
    a {
      font-size: 35px;
    }
  }
  @media (max-width: 450px) {
    height: 51px;
    a {
      font-size: 27px;
    }
  }
`;

const BearCircle = styled.img`
  width: 183px;
  height: 183px;
  background: url(.png);
  border-radius: 50%;
  position: absolute;
  right: -130px;
  top: 50%;
  transform: translateY(-50%);
  @media (max-width: 992px) {
    right: -50px;
    width: 130px;
    height: 130px;
  }
  @media (max-width: 768px) {
    right: -20px;
  }
  @media (max-width: 450px) {
    width: 100px;
    height: 100px;
  }
`;

const StakeTypo = styled.h2`
  font-style: normal;
  font-weight: normal;
  font-size: 99px;
  line-height: 116px;
  color: #eadbbe;
  @media (max-width: 992px) {
    font-size: 10vw;
  }
`;

const HalloBearTypo = styled.h1`
  text-align: right;
  font-style: normal;
  font-weight: normal;
  font-size: 140px;
  line-height: 164px;
  color: #ff6d00;
  white-space: nowrap;
  text-shadow: -2px 4px 4px rgba(0, 0, 0, 0.35);
  @media (max-width: 992px) {
    font-size: 15vw;
    line-height: 15vw;
    margin-bottom: 24px;
    text-align: left;
  }
`;

const StyledRow = styled(Row)`
  margin-top: 67px;
  @media (max-width: 992px) {
    margin-top: 0;
  }
`;

const Card = styled.div`
  width: 100%;
  height: 140px;

  background: #9d4edd;
  border-radius: 30px;
  padding-top: 12px;

  & > p {
    font-style: normal;
    font-weight: normal;
    font-size: 35px;
    line-height: 41px;
    letter-spacing: 0.15em;
    text-align: center;
    color: rgba(255, 255, 255, 0.55);
  }
  & > div {
    font-style: normal;
    font-weight: normal;
    text-align: center;
    font-size: 45px;
    line-height: 53px;
    letter-spacing: 0.15em;
    color: #ff9e00;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 992px) {
    margin-bottom: 32px;
    & > p {
      font-size: 30px;
    }
    & > div {
      font-size: 40px;
      flex-direction: column;
    }
  }
`;

const WrapButton = styled(Row)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 35px;
  padding-bottom: 40px;
  max-width: 961px;
  & > *:nth-child(2) {
    margin-top: 15px;
  }
`;

const StakeButton = styled.button`
  all: unset;
  height: 61px;
  width: 100%;

  background: #9d4edd;
  border-radius: 30px;
  font-size: 40px;
  line-height: 47px;
  letter-spacing: 0.15em;
  color: #ff9e00;
  max-width: 530px;
  @media (max-width: 992px) {
    max-width: unset;
    font-size: 35px;
  }
  @media (max-width: 450px) {
    max-width: unset;
    font-size: 24px;
  }

  ${(props) => props.disabled && disabledStyles}

  ${buttonStyles}
`;

const BlueTypo = styled.span`
  color: #41ff01;
`;

const BearImage = styled.img`
  width: 100%;
  max-width: 476px;
  height: auto;
  object-fit: cover;
  position: absolute;
  bottom: 0;
  right: -210px;
  filter: drop-shadow(-10px 4px 4px rgba(77, 40, 107, 0.4));
  @media (max-width: 992px) {
    display: none;
  }
`;

const Hide = styled.div<{ if: boolean }>`
  display: ${(props) => (props.if ? 'none' : 'block')};
`;

const ClaimButton = styled.button`
  all: unset;
  width: 146px;
  height: 45px;
  background: #41ff01;
  border-radius: 30px;

  margin-left: 8px;
  font-size: 30px;
  line-height: 35px;
  letter-spacing: 0.25em;
  color: #ffffff;
  @media (max-width: 1270px) {
    font-size: 25px;
    width: 126px;
  }
  ${buttonStyles}

  ${(props) => props.disabled && disabledStyles}
`;

const UnStakingButton = styled.button<{ onClick?: any }>`
  all: unset;
  width: 230px;
  height: 45px;
  background: #41ff01;
  border-radius: 30px;

  margin-left: 8px;
  font-size: 30px;
  line-height: 35px;
  letter-spacing: 0.25em;
  color: #ffffff;
  @media (max-width: 1270px) {
    font-size: 25px;
    width: 126px;
  }
  ${buttonStyles}

  ${(props) => props.disabled && disabledStyles}
`;

const StakeBearTypo = styled.span`
  font-size: 30px !important;
  white-space: nowrap;
  @media (max-width: 1270px) {
    font-size: 25px;
  }
`;
const Text = styled.p`
  font-size: 24px;
  margin: 20px auto 40px;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 20px553;
  }
`;

const UnstakeContainer = styled(Container)`
  position: relative;
  padding-bottom: 50px;
  /* background-color: #5a189a; */
`;
const UnstakeTitle = styled(Text)`
  font-size: 50px;
  margin-top: 50px;
`;
const UnstakeCard = styled(Card)`
  width: 450px;
  margin: 50px auto 0;
`;
