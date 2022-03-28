import styled, { css } from 'styled-components';
import { Typography } from './Typography';
import LockImg from 'assets/v2/lock.png';
import { FC, useEffect, useState } from 'react';
import { getContractLPToken, getContractStake, getContractStakeLP, getContractStakeOld } from 'utils/getContract';
import { APPROVE_AMOUNT, LP_STAKING_CONTRACT } from 'utils/constants';
import StakeLPModal from './StakeLPModal';
import UnStakeLPModal from './UnStakeLPModal';
import { toast } from 'react-toastify';
import { useWallet } from 'hooks/useWallet';
import Web3 from 'web3';
export const StakeLP: FC = () => {
  const { active, account, connector, library } = useWallet();
  //   const { active, connector, library } = useWallet();
  //   const account = '0x5b702F067C7d29470F20922a1c861588Cbaa86a4';
  const [data, setData] = useState({
    totalRewards: 0,
    balance: Web3.utils.toBN(0),
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
        balance,
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
          console.log(
            "Number(library.utils.fromWei(balance, 'ether'))",
            Number(library.utils.fromWei(balance, 'ether')),
            Web3.utils.fromWei(balance, 'ether'),
            balance
          );
          setData({
            totalStakedBalance,
            totalRewards: rewards,
            balance,
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

  const handleStake = async (stakedAmount: any | undefined) => {
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
      {loading !== '' && (
        <Loading>
          <LoadingContent>{loading} ...</LoadingContent>
        </Loading>
      )}
      <TitleContainer>
        <StakeBerriesText fontSize={48} strong lineHeight="50px">
          Stake $NAPAS-ETH
        </StakeBerriesText>
        <Typography fontSize={18}>Stake LP tokens and earn more $NAPAS (Total Pool = 15,000 $NAPAS/day)</Typography>
        {+allowance === 0 && <Button onClick={handleApprove}>Approve LP Staking</Button>}
      </TitleContainer>
      <StakeLPContainer>
        <AccountBalance>
          <TitleAccountBalance fontSize={30} color="#B4C4FB" strong align="center">
            Total Staked
          </TitleAccountBalance>
          <AmountStaked strong fontSize={36} lineHeight="40px">
            {Number(library?.utils?.fromWei('' + totalStakedBalance, 'ether') || 0).toFixed(2)} LP Tokens
          </AmountStaked>
          <LockImage src={LockImg} alt="lockimg" />
        </AccountBalance>
        <ClaimRewards>
          <TitleClaimRewards fontSize={30} color="#B4C4FB" strong>
            Rewards{' '}
            <Button onClick={handleClaimRewards} disabled={Number(totalRewards) === 0}>
              Claim
            </Button>
          </TitleClaimRewards>
          <ClaimRewardAmount strong fontSize={36} lineHeight="40px">
            {Number(library?.utils?.fromWei('' + totalRewards, 'ether') || 0).toFixed(2)} $NAPAS
          </ClaimRewardAmount>
        </ClaimRewards>
        <UnstakeBear>
          <TitleClaimRewards fontSize={30} color="#B4C4FB" strong>
            LP Token Staked
            <Button
              onClick={() => {
                toggleOpen('unStakeModal');
              }}
              disabled={Number(totalStakedUni) === 0}
            >
              Withdraw
            </Button>{' '}
            <WithdrawAllButton
              onClick={() => handleUnstake(totalStakedUni, 'all')}
              disabled={Number(totalStakedUni) === 0}
            >
              Withdraw all
            </WithdrawAllButton>
          </TitleClaimRewards>
          <Typography fontSize={35} strong margin="10px 0 0" lineHeight="40px">
            {Number(library?.utils?.fromWei('' + totalStakedUni, 'ether') || 0).toFixed(2)} LP Token
          </Typography>
        </UnstakeBear>
        <StakeBear>
          <TitleClaimRewards fontSize={30} color="#B4C4FB" strong>
            LP Token Balance
            <Button onClick={() => toggleOpen('stakeModal')} disabled={+allowance === 0 || Number(balance) === 0}>
              Stake
            </Button>
            <Button
              onClick={() => handleStake(Web3.utils.fromWei(balance, 'ether'))}
              disabled={+allowance === 0 || Number(balance) === 0}
            >
              Stake All
            </Button>
          </TitleClaimRewards>
          <Typography fontSize={35} strong margin="10px 0 0" lineHeight="40px">
            {Number(Web3.utils.fromWei(balance, 'ether')).toFixed(2)} LP Token
          </Typography>
        </StakeBear>
      </StakeLPContainer>
      {open.stakeModal && <StakeLPModal handleStake={handleStake} onClose={() => toggleOpen('stakeModal')} />}
      {open.unStakeModal && <UnStakeLPModal handleUnstake={handleUnstake} onClose={() => toggleOpen('unStakeModal')} />}
    </>
  );
};

const TitleContainer = styled.div`
  margin: 200px auto 0;
  text-align: center;
  p {
    text-align: center;
    margin: 30px 0;
  }
  button {
    font-size: 36px;
    padding: 10px 30px;
    line-height: 40px;
    font-weight: bold;
  }
  @media (max-width: 560px) {
    width: 80%;
  }
`;

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
        background-color: #098d60;
        box-shadow: none !important;
        filter: none !important;
      }
`;

const Button = styled.button`
  background-color: #098d60;
  border-color: #098d60;
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

const WithdrawAllButton = styled.button`
  background-color: #098d60;
  border-color: #098d60;
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
  display:block;

  ${(props) => props.disabled && disabledStyles}
`;

const StakeLPContainer = styled.div`
  margin: 50px auto 20px;
  width: 1200px;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  gap: 2%;
  @media (max-width: 1280px) {
    width: 80%;
  }
  @media (max-width: 560px) {
    p {
      text-align: center;
      display: block;
    }
  }
`;
const AmountStaked = styled(Typography)`
  margin-top: 35px;
  @media (max-width: 560px) {
    line-height: 35px;
  }
`;

const TitleAccountBalance = styled(Typography)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;
const AccountBalance = styled.div`
  background: #0f6e80;
  width: 49%;
  border-radius: 20px;
  padding: 40px 45px 45px;
  margin: 10px 0;
  position: relative;
  @media (max-width: 1200px) {
    flex: 0 0 100%;
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

const ClaimRewards = styled.div`
  background: #0f6e80;
  width: 49%;
  border-radius: 20px;
  padding: 20px 45px 45px;
  margin: 10px 0;
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
`;

const UnstakeBear = styled.div`
  background: #0f6e80;
  width: 49%;
  border-radius: 20px;
  padding: 20px 45px 45px;
  margin: 10px 0;
  @media (max-width: 1200px) {
    flex: 0 0 100%;
  }
`;

const StakeBear = styled.div`
  background: #0f6e80;
  width: 49%;
  border-radius: 20px;
  padding: 20px 45px 45px;
  margin: 10px 0;
  @media (max-width: 1200px) {
    flex: 0 0 100%;
  }
`;

const LockImage = styled.img`
  width: 74px;
  height: 92px;
  position: absolute;
  top: 35px;
  right: 15%;
  @media (max-width: 768px) {
    display: none;
  }
`;

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

const StakeBerriesText = styled(Typography)`
  @media (max-width) {
    line-height: 50px;
  }
`;
