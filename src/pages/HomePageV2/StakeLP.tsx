import { FC, useEffect, useState } from 'react';
import { Col, Container, Row } from 'styled-bootstrap-grid';
import { getContractLPToken, getContractStake, getContractStakeLP, getContractStakeOld } from 'utils/getContract';
import { APPROVE_AMOUNT, LP_STAKING_CONTRACT } from 'utils/constants';

import StakeLPModal from './StakeLPModal';
import UnStakeLPModal from './UnStakeLPModal';

import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useWallet } from 'hooks/useWallet';

const StakeLP: FC = () => {
  const { active, account, connector, library } = useWallet();
  const [data, setData] = useState({
    totalRewards: 0,
    balance: 0,
    stakedBear: [],
    stakedBearOld: [],
    allowance: '0',
    totalStakedBalance: 0,
    totalStakedUni: 0,
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
      const { contract: stakeContractOld } = await getContractStakeOld(connector);
      const { contract: stakeContractLP } = await getContractStakeLP(connector);
      const { contract: LPTokenContract } = await getContractLPToken(connector);

      const allowance = await LPTokenContract.methods.allowance(account, LP_STAKING_CONTRACT).call();
      const stakedBearOld = await stakeContractOld.methods.depositsOf(account).call();

      const stakedBear = await stakeContract.methods.depositsOf(account).call();
      const totalStakedBalance = await LPTokenContract.methods.balanceOf(LP_STAKING_CONTRACT).call();
      const balance = await LPTokenContract.methods.balanceOf(account).call();
      const totalStakedUni = await stakeContractLP.methods.balanceOf(account).call();
      const rewards = await stakeContractLP.methods.earned(account).call();
      setData({
        totalStakedBalance,
        totalRewards: rewards,
        balance: Number(library.utils.fromWei(balance, 'ether')),
        stakedBear,
        stakedBearOld,
        allowance,
        totalStakedUni,
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
          const { contract: stakeContractLP } = await getContractStakeLP(connector);
          const { contract: LPTokenContract } = await getContractLPToken(connector);

          const allowance = await LPTokenContract.methods.allowance(account, LP_STAKING_CONTRACT).call();
          const stakedBearOld = await stakeContractOld.methods.depositsOf(account).call();

          const stakedBear = await stakeContract.methods.depositsOf(account).call();
          const totalStakedBalance = await LPTokenContract.methods.balanceOf(LP_STAKING_CONTRACT).call();
          const balance = await LPTokenContract.methods.balanceOf(account).call();
          const totalStakedUni = await stakeContractLP.methods.balanceOf(account).call();
          const rewards = await stakeContractLP.methods.earned(account).call();
          setData({
            totalStakedBalance,
            totalRewards: rewards,
            balance: Number(library.utils.fromWei(balance, 'ether')),
            stakedBear,
            stakedBearOld,
            allowance,
            totalStakedUni,
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

  const handleStake = async (stakedAmount: number | undefined) => {
    try {
      const { contract: stakeContractLP } = await getContractStakeLP(connector);
      await stakeContractLP.methods
        .stake(library?.utils?.toWei('' + stakedAmount, 'ether') || 0)
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
      const { contract: LPTokenContract } = await getContractLPToken(connector);
      const allowance = await LPTokenContract.methods.allowance(account, LP_STAKING_CONTRACT).call();
      if (!allowance) {
        toast.warn('Already Approved');
        await refetch(undefined);
        return;
      }

      await LPTokenContract.methods
        .approve(LP_STAKING_CONTRACT, APPROVE_AMOUNT)
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
    const { contract: stakeContractLP } = await getContractStakeLP(connector);

    try {
      await stakeContractLP.methods
        .getReward()
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

  const handleUnstake = async (unStakeAmount: number, type?: string) => {
    if (unStakeAmount > totalStakedUni) {
      toast.error('Invalid amount');
      return;
    }
    try {
      const amountSend = type === 'all' ? unStakeAmount : library?.utils?.toWei('' + unStakeAmount, 'ether') || 0;
      const { contract: stakeContractLP } = await getContractStakeLP(connector);
      await stakeContractLP.methods
        .withdraw(amountSend)
        .send({
          from: account,
        })
        .on('transactionHash', async () => {
          setLoading('Withdrawing');
          toggleOpen('unStakeModal');
        })
        .on('receipt', async () => {
          refetch('Withdraw success!');
        });
    } catch (err) {
      setLoading('');
    }
  };

  const toggleOpen = (key: 'stakeModal' | 'unStakeModal') => {
    setOpen((old) => ({ ...old, [key]: !old[key] }));
  };

  const { totalRewards, balance, allowance, totalStakedBalance, totalStakedUni } = data;
  return (
    <>
      <HeroWrapper>
        {loading !== '' && (
          <Loading>
            <LoadingContent>{loading} ...</LoadingContent>
          </Loading>
        )}
        <StyledContainer className="relative">
          <Row justifyContent="center">
            <Col xs={24}>
              <StakeTypo>Stake Your LP TOKEN</StakeTypo>
            </Col>
          </Row>

          <Hide if={!active}>
            <Row justifyContent="center">
              <Col xs={24} lg={10}>
                <Card>
                  <p> CURRENT REWARDS </p>
                  <div>
                    <StakeBearTypo>
                      {Number(library?.utils?.fromWei('' + totalRewards, 'ether') || 0).toFixed(2)} $NAPAS
                    </StakeBearTypo>{' '}
                    <ClaimButton onClick={handleClaimRewards} disabled={Number(totalRewards) === 0}>
                      Claim
                    </ClaimButton>
                  </div>
                </Card>
              </Col>
              <Col xs={24} lg={10}>
                <Card>
                  <p>Account Balance</p>
                  <div>{Number(balance).toFixed(2)} LP TOKEN</div>
                </Card>
              </Col>
            </Row>

            <Row justifyContent="center" style={{ marginTop: 20 }}>
              <Col xs={24} lg={10}>
                <Card>
                  <p>
                    {' '}
                    {Number(library?.utils?.fromWei('' + totalStakedUni, 'ether') || 0).toFixed(2)} LP TOKEN Staked{' '}
                  </p>
                  <div>
                    <StakeBearTypo></StakeBearTypo>{' '}
                    <UnstakeButtonGroup>
                      <UnstakedButton
                        onClick={() => {
                          toggleOpen('unStakeModal');
                        }}
                        disabled={Number(totalStakedUni) === 0}
                      >
                        WITHDRAW
                      </UnstakedButton>
                      <UnstakedAllButton
                        onClick={() => handleUnstake(totalStakedUni, 'all')}
                        disabled={Number(totalStakedUni) === 0}
                      >
                        WITHDRAW ALL
                      </UnstakedAllButton>
                    </UnstakeButtonGroup>
                  </div>
                </Card>
              </Col>
              <Col xs={24} lg={10}>
                <Card>
                  <p>Total Staked</p>
                  <div>
                    {Number(library?.utils?.fromWei('' + totalStakedBalance, 'ether') || 0).toFixed(2)} LP TOKEN
                  </div>
                </Card>
              </Col>
            </Row>

            <WrapButton>
              <>
                <Col xs={24} md={14}>
                  <StakeButton
                    onClick={() => toggleOpen('stakeModal')}
                    disabled={+allowance === 0 || Number(balance) === 0}
                  >
                    <BlueTypo>STAKE LP</BlueTypo>
                  </StakeButton>
                </Col>

                <Col xs={24} md={14}>
                  <StakeButton
                    onClick={() => handleStake(balance)}
                    disabled={+allowance === 0 || Number(balance) === 0}
                  >
                    STAKE ALL LP
                  </StakeButton>
                </Col>
              </>

              <Col xs={24} md={14}>
                {+allowance === 0 && (
                  <StakeButton onClick={handleApprove}>
                    Approve LP <BlueTypo>Staking</BlueTypo>
                  </StakeButton>
                )}
              </Col>
            </WrapButton>
          </Hide>
        </StyledContainer>
      </HeroWrapper>
      {open.stakeModal && <StakeLPModal handleStake={handleStake} onClose={() => toggleOpen('stakeModal')} />}
      {open.unStakeModal && <UnStakeLPModal handleUnstake={handleUnstake} onClose={() => toggleOpen('unStakeModal')} />}
    </>
  );
};

export default StakeLP;

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
  min-height: 85vh;
  padding-top: 82px;
  .ant-row {
    margin-top: 10px;
  }
`;

const StakeTypo = styled.h2`
  font-style: normal;
  font-weight: normal;
  font-size: 99px;
  line-height: 116px;
  color: #eadbbe;
  text-align: center;
  margin-bottom: 60px;
  @media (max-width: 992px) {
    font-size: 10vw;
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

  div {
    text-align: center;
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
  margin-top: 15px;
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

const UnstakedButton = styled.button<{ onClick?: any }>`
  all: unset;
  width: 140px;
  height: 45px;
  background: #41ff01;
  border-radius: 30px;

  margin-left: 8px;
  font-size: 20px;
  line-height: 35px;
  letter-spacing: 0.25em;
  color: #ffffff;
  @media (max-width: 768px) {
    font-size: 20px;
    width: 150px;
  }

  ${buttonStyles}

  ${(props) => props.disabled && disabledStyles}
`;

const UnstakedAllButton = styled.button`
  all: unset;
  width: 200px;
  height: 45px;
  background: #ff9e00;
  border-radius: 30px;

  margin-left: 8px;
  font-size: 20px;
  line-height: 35px;
  letter-spacing: 0.25em;
  color: #ffffff;
  @media (max-width: 768px) {
    font-size: 20px;
    width: 230px;
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

const UnstakeButtonGroup = styled.div`
  @media (max-width: 768px) {
    display: flex;
  }
`;
