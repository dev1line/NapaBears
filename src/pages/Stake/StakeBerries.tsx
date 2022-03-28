import { FC, useEffect, useState } from 'react';
import {
  getContractBerriesToken,
  getContractStake,
  getContractSingleStaking,
  getContractStakeOld,
} from 'utils/getContract';
import { APPROVE_AMOUNT, BERRIES_SINGLE_STAKING_CONTRACT } from 'utils/constants';

import StakeLPModal from './StakeLPModal';
import UnStakeLPModal from './UnStakeLPModal';

import { toast } from 'react-toastify';
import { useWallet } from 'hooks/useWallet';
import styled, { css } from 'styled-components';

import { Typography } from './Typography';
import LockImg from 'assets/v2/lock.png';

export const StakeBerries: FC = () => {
  const { active, account, connector, library } = useWallet();
  const [data, setData] = useState({
    totalRewards: 0,
    balance: 0,
    stakedBear: [],
    stakedBearOld: [],
    allowance: '0',
    totalStakedBalance: 0,
    totalStakeBerries: 0,
    totalStakedAll: '0',
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
      const { contract: singleStakingContract } = await getContractSingleStaking(connector);
      const { contract: BerriesTokenContract } = await getContractBerriesToken(connector);

      const allowance = await BerriesTokenContract.methods.allowance(account, BERRIES_SINGLE_STAKING_CONTRACT).call();
      const stakedBearOld = await stakeContractOld.methods.depositsOf(account).call();

      const stakedBear = await stakeContract.methods.depositsOf(account).call();
      const totalStakedBalance = await BerriesTokenContract.methods.balanceOf(BERRIES_SINGLE_STAKING_CONTRACT).call();
      const balance = await BerriesTokenContract.methods.balanceOf(account).call();
      const totalStakeBerries = await singleStakingContract.methods.balanceOf(account).call();
      const rewards = await singleStakingContract.methods.earned(account).call();

      const stakedEvents = await singleStakingContract.getPastEvents('Staked', {
        fromBlock: 0,
        toBlock: 'latest',
      });
      const withdrawEvents = await singleStakingContract.getPastEvents('Withdrawn', {
        fromBlock: 0,
        toBlock: 'latest',
      });
      const totalStaked = stakedEvents.reduce(
        (prev: any, curr: any) => prev + +library.utils.fromWei(curr.returnValues.amount, 'ether'),
        0
      );
      const totalWithdraw = withdrawEvents.reduce(
        (prev: any, curr: any) => prev + +library.utils.fromWei(curr.returnValues.amount, 'ether'),
        0
      );

      const totalStakedAll = (totalStaked - totalWithdraw).toFixed(2);

      setData({
        ...data,
        totalStakedBalance,
        totalRewards: rewards,
        balance: Number(library.utils.fromWei(balance, 'ether')),
        stakedBear,
        stakedBearOld,
        allowance,
        totalStakeBerries,
        totalStakedAll,
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
          const { contract: singleStakingContract } = await getContractSingleStaking(connector);
          const { contract: BerriesTokenContract } = await getContractBerriesToken(connector);

          const allowance = await BerriesTokenContract.methods
            .allowance(account, BERRIES_SINGLE_STAKING_CONTRACT)
            .call();
          console.log(allowance);
          const stakedBearOld = await stakeContractOld.methods.depositsOf(account).call();

          const stakedBear = await stakeContract.methods.depositsOf(account).call();
          const totalStakedBalance = await BerriesTokenContract.methods
            .balanceOf(BERRIES_SINGLE_STAKING_CONTRACT)
            .call();
          const balance = await BerriesTokenContract.methods.balanceOf(account).call();
          const totalStakeBerries = await singleStakingContract.methods.balanceOf(account).call();
          const rewards = await singleStakingContract.methods.earned(account).call();

          const stakedEvents = await singleStakingContract.getPastEvents('Staked', {
            fromBlock: 0,
            toBlock: 'latest',
          });
          const withdrawEvents = await singleStakingContract.getPastEvents('Withdrawn', {
            fromBlock: 0,
            toBlock: 'latest',
          });
          const totalStaked = stakedEvents.reduce(
            (prev: any, curr: any) => prev + +library.utils.fromWei(curr.returnValues.amount, 'ether'),
            0
          );
          const totalWithdraw = withdrawEvents.reduce(
            (prev: any, curr: any) => prev + +library.utils.fromWei(curr.returnValues.amount, 'ether'),
            0
          );

          const totalStakedAll = (totalStaked - totalWithdraw).toFixed(2);

          setData({
            ...data,
            totalStakedBalance,
            totalRewards: rewards,
            balance: Number(library.utils.fromWei(balance, 'ether')),
            stakedBear,
            stakedBearOld,
            allowance,
            totalStakeBerries,
            totalStakedAll,
          });
          setLoading('');
        } catch (err: any) {
          setLoading('');
        }
      }
    };
    getBlockchainData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connector, account, active, library]);

  const handleStake = async (stakedAmount: number | undefined) => {
    try {
      const { contract: singleStakingContract } = await getContractSingleStaking(connector);
      await singleStakingContract.methods
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
      setLoading('');
    }
  };

  const handleApprove = async () => {
    try {
      const { contract: BerriesTokenContract } = await getContractBerriesToken(connector);
      const allowance = await BerriesTokenContract.methods.allowance(account, BERRIES_SINGLE_STAKING_CONTRACT).call();
      if (!allowance) {
        toast.warn('Already Approved');
        await refetch(undefined);
        return;
      }

      await BerriesTokenContract.methods
        .approve(BERRIES_SINGLE_STAKING_CONTRACT, APPROVE_AMOUNT)
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
    const { contract: singleStakingContract } = await getContractSingleStaking(connector);
    try {
      await singleStakingContract.methods
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
    if (unStakeAmount > totalStakeBerries) {
      toast.error('Invalid amount');
      return;
    }
    try {
      const amountSend = type === 'all' ? unStakeAmount : library?.utils?.toWei('' + unStakeAmount, 'ether') || 0;
      const { contract: singleStakingContract } = await getContractSingleStaking(connector);
      await singleStakingContract.methods
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

  const { totalRewards, balance, allowance, totalStakeBerries, totalStakedAll } = data;
  return (
    <>
      {loading !== '' && (
        <Loading>
          <LoadingContent>{loading} ...</LoadingContent>
        </Loading>
      )}
      <TitleContainer>
        <Typography fontSize={48} strong lineHeight="50px">
          Stake your NAPAS{' '}
        </Typography>
        <Typography fontSize={18}>Stake your $NAPAS and earn more $NAPAS (Total Pool = 3,000 $NAPAS/day)</Typography>
        {+allowance === 0 && <Button onClick={handleApprove}>Approve $NAPAS Staking</Button>}
      </TitleContainer>
      <StakeBerriesContainer>
        <AccountBalance>
          <TitleAccountBalance fontSize={30} color="#B4C4FB" strong lineHeight="33px">
            Total Staked
          </TitleAccountBalance>
          <AmountStaked strong fontSize={36} lineHeight="40px">
            {totalStakedAll} $NAPAS
          </AmountStaked>
          <LockImage src={LockImg} alt="lockimg" />
        </AccountBalance>
        <ClaimRewards>
          <TitleClaimRewards fontSize={30} color="#B4C4FB" strong lineHeight="33px">
            Rewards{' '}
            <Button onClick={handleClaimRewards} disabled={Number(totalRewards) === 0}>
              Claim
            </Button>
          </TitleClaimRewards>
          <ClaimRewardAmount strong fontSize={36} lineHeight="40px">
            {Number(library?.utils?.fromWei('' + totalRewards, 'ether') || 0).toFixed(2)} $NAPAS
          </ClaimRewardAmount>
        </ClaimRewards>
        <UnStake>
          <TitleUnStake fontSize={30} color="#B4C4FB" strong lineHeight="33px">
            $NAPAS Staked
            <Button
              onClick={() => {
                toggleOpen('unStakeModal');
              }}
              disabled={Number(totalStakeBerries) === 0}
            >
              Withdraw
            </Button>
            <Button onClick={() => handleUnstake(totalStakeBerries, 'all')} disabled={Number(totalStakeBerries) === 0}>
              Withdraw All
            </Button>
          </TitleUnStake>
          <Typography fontSize={35} strong margin="10px 0 0" lineHeight="40px">
            {Number(library?.utils?.fromWei('' + totalStakeBerries, 'ether') || 0).toFixed(2)} $NAPAS
          </Typography>
        </UnStake>
        <Stake>
          <TitleStake fontSize={30} color="#B4C4FB" strong lineHeight="33px">
            $NAPAS Balance
            <Button onClick={() => toggleOpen('stakeModal')} disabled={+allowance === 0 || Number(balance) === 0}>
              Stake
            </Button>{' '}
            <Button onClick={() => handleStake(balance)} disabled={+allowance === 0 || Number(balance) === 0}>
              Stake All
            </Button>
          </TitleStake>
          <Typography fontSize={35} strong margin="10px 0 0" lineHeight="40px">
            {Number(balance).toFixed(2)} $NAPAS
          </Typography>
        </Stake>
      </StakeBerriesContainer>
      {open.stakeModal && (
        <StakeLPModal handleStake={handleStake} onClose={() => toggleOpen('stakeModal')} name="$NAPAS" />
      )}
      {open.unStakeModal && (
        <UnStakeLPModal handleUnstake={handleUnstake} onClose={() => toggleOpen('unStakeModal')} name="$NAPAS" />
      )}
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

const StakeBerriesContainer = styled.div`
  margin: 50px auto 150px;
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
  @media (max-width: 560px) {
    button {
      margin-top: 20px;
    }
  }
`;

const TitleClaimRewards = styled(Typography)`
  margin-bottom: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  button {
    margin-left: 15px;
    margin-bottom: 5px;
  }
`;

const TitleUnStake = styled(Typography)`
  margin-bottom: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  button {
    margin-left: 15px;
    margin-bottom: 5px;
  }
`;

const TitleStake = styled(Typography)`
  margin-bottom: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  button {
    margin-left: 15px;
    margin-bottom: 5px;
  }
`;

const ClaimRewardAmount = styled(Typography)`
  margin-top: 20px;
`;

const UnStake = styled.div`
  background: #0f6e80;
  width: 49%;
  border-radius: 20px;
  padding: 20px 45px 45px;
  margin: 10px 0;
  @media (max-width: 1200px) {
    flex: 0 0 100%;
  }
  @media (max-width: 560px) {
    button {
      margin-top: 20px;
    }
  }
`;

const Stake = styled.div`
  background: #0f6e80;
  width: 49%;
  border-radius: 20px;
  padding: 20px 45px 45px;
  margin: 10px 0;
  @media (max-width: 1200px) {
    flex: 0 0 100%;
  }
  @media (max-width: 560px) {
    button {
      margin-top: 20px;
    }
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
