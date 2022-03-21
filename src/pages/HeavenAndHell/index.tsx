import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import CarouselBear from './CarouselBear';
import CheckBearSection from './CheckBearSection';
import ClaimSection from './ClaimSection';
import ClaimStakedBearSection from './ClaimStakedBearSection';
import InfoSection from './InfoSection';
import HeavenAndHellRewards from './HeavenAndHellRewards';

import { WalletConnect } from './WalletConnect';

import { useWallet } from 'hooks/useWallet';
import {
  getContractAngel,
  getContractBear,
  getContractBerriesToken,
  getContractRoll,
  getContractStake,
} from 'utils/getContract';
import { APPROVE_AMOUNT, ROLL_CONTRACT } from 'utils/constants';
import { toast } from 'react-toastify';

const HeavenAndHellPage: FC = () => {
  const [data, setData] = useState({
    allowance: 0,
    balance: 0,
    stakedBear: [] as any,
    tokensOfOwner: [] as any,
    availBears: [] as any,
    availStakedBears: [] as any,
    angelRewards: 0,
    tokenOfOwnersHeaven: [] as any,
    paused: false,
  });
  const { active, account, connector, library } = useWallet();
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [loading, setLoading] = useState('');

  const refetch = async (message?: string) => {
    if (!library) return;
    try {
      const { contract: BerriesTokenContract } = await getContractBerriesToken(connector);
      const { contract: rollContract } = await getContractRoll(connector);

      const allowance = await BerriesTokenContract.methods.allowance(account, ROLL_CONTRACT).call();
      const balance = await BerriesTokenContract.methods.balanceOf(account).call();
      const { contract: stakeContract } = await getContractStake(connector);
      const stakedBear = await stakeContract.methods.depositsOf(account).call();
      const { contract: bearContract } = await getContractBear(connector);
      const tokensOfOwner = await bearContract.methods.tokensOfOwner(account).call();

      let availBears: any[] = await Promise.all(
        tokensOfOwner.map(async (item: any): Promise<any> => {
          const isAvailable = await rollContract.methods.rollUsed(item).call();
          if (!isAvailable) return item;
        })
      );
      const availBearsFilter = availBears.filter((item) => item);
      let availStakedBears: any[] = await Promise.all(
        stakedBear.map(async (item: any): Promise<any> => {
          const isAvailable = await rollContract.methods.rollUsed(item).call();
          if (!isAvailable) return item;
        })
      );
      const availBearsStakedFilter = availStakedBears.filter((item) => item);

      const { contract: angelRewardsContract } = await getContractAngel(connector);
      let angelRewards = 0;
      try {
        angelRewards = await angelRewardsContract.methods.calculateRewards(account).call();
      } catch (err) {
        console.log(err);
      }

      const tokenOfOwnersHeaven = await rollContract.methods.tokensOfOwner(account).call();
      const paused = await angelRewardsContract.methods.paused().call();
      setData({
        allowance,
        balance: Number(library.utils.fromWei(balance, 'ether')),
        stakedBear,
        tokensOfOwner,
        availBears: availBearsFilter,
        availStakedBears: availBearsStakedFilter,
        angelRewards,
        tokenOfOwnersHeaven,
        paused,
      });
      setLoading('');
      message && toast.success(message);
    } catch (err: any) {
      setLoading('');
      console.log(err);
    }
  };
  useEffect(() => {
    const getBlockchainData = async () => {
      if (connector && library) {
        try {
          setLoading('Loading');

          const { contract: BerriesTokenContract } = await getContractBerriesToken(connector);
          const { contract: rollContract } = await getContractRoll(connector);

          const allowance = await BerriesTokenContract.methods.allowance(account, ROLL_CONTRACT).call();
          const balance = await BerriesTokenContract.methods.balanceOf(account).call();
          const { contract: stakeContract } = await getContractStake(connector);
          const stakedBear = await stakeContract.methods.depositsOf(account).call();
          const { contract: bearContract } = await getContractBear(connector);
          const tokensOfOwner = await bearContract.methods.tokensOfOwner(account).call();

          let availBears: any[] = await Promise.all(
            tokensOfOwner.map(async (item: any): Promise<any> => {
              const isAvailable = await rollContract.methods.rollUsed(item).call();
              if (!isAvailable) return item;
            })
          );
          const availBearsFilter = availBears.filter((item) => item);
          let availStakedBears: any[] = await Promise.all(
            stakedBear.map(async (item: any): Promise<any> => {
              const isAvailable = await rollContract.methods.rollUsed(item).call();
              if (!isAvailable) return item;
            })
          );
          const availBearsStakedFilter = availStakedBears.filter((item) => item);

          const { contract: angelRewardsContract } = await getContractAngel(connector);
          let angelRewards = 0;
          try {
            angelRewards = await angelRewardsContract.methods.calculateRewards(account).call();
          } catch (err) {
            console.log(err);
          }
          const tokenOfOwnersHeaven = await rollContract.methods.tokensOfOwner(account).call();
          const paused = await angelRewardsContract.methods.paused().call();

          setData({
            allowance,
            balance: Number(library.utils.fromWei(balance, 'ether')),
            stakedBear,
            tokensOfOwner,
            availBears: availBearsFilter,
            availStakedBears: availBearsStakedFilter,
            angelRewards,
            tokenOfOwnersHeaven,
            paused,
          });
          setLoading('');
        } catch (err: any) {
          console.log(err);
        }
      }
    };
    getBlockchainData();
  }, [connector, account, active, library]);

  const handleApprove = async () => {
    try {
      const { contract: BerriesTokenContract } = await getContractBerriesToken(connector);
      const allowance = await BerriesTokenContract.methods.allowance(account, ROLL_CONTRACT).call();
      if (!allowance) {
        toast.warn('Already Approved');
        await refetch(undefined);
        return;
      }

      await BerriesTokenContract.methods
        .approve(ROLL_CONTRACT, APPROVE_AMOUNT)
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
      setLoading('');
      if (err.message.includes('execution reverted')) {
        toast.error(err.message.substr(0, err.message.indexOf('{')) || err.message);
      } else {
        toast.error(err.message);
      }
    }
  };

  const handleRoll = async (tokenId: string) => {
    try {
      const { contract: rollContract } = await getContractRoll(connector);

      await rollContract.methods
        .mintBear('50000000000000000000', tokenId)
        .send({
          from: account,
        })
        .on('transactionHash', async () => {
          setLoading('Rolling');
        })
        .on('receipt', async (result: any) => {
          const newTokenOfOwnersHeaven = await rollContract.methods.tokensOfOwner(account).call();
          const rolledToken = newTokenOfOwnersHeaven.filter((x: any) => !data.tokenOfOwnersHeaven.includes(x));
          if (rolledToken.length === 0) refetch('You won nothing!');
          if (+rolledToken[0] > 1000) refetch('You won Hell!');
          if (+rolledToken[0] <= 1000) refetch('You won Heaven!');
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

  const handleRollStakedBears = async (tokenId: string) => {
    try {
      const { contract: rollContract } = await getContractRoll(connector);

      await rollContract.methods
        .mintBearStaked('50000000000000000000', tokenId)
        .send({
          from: account,
        })
        .on('transactionHash', async () => {
          setLoading('Rolling');
        })
        .on('receipt', async (result: any) => {
          const newTokenOfOwnersHeaven = await rollContract.methods.tokensOfOwner(account).call();
          const rolledToken = newTokenOfOwnersHeaven.filter((x: any) => !data.tokenOfOwnersHeaven.includes(x));
          if (rolledToken.length === 0) refetch('You won nothing!');
          if (+rolledToken[0] > 1000) refetch('You won Hell!');
          if (+rolledToken[0] <= 1000) refetch('You won Heaven!');
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

  const handleClaimAngelRewards = async (tokenId: string) => {
    try {
      const { contract: angelRewardsContract } = await getContractAngel(connector);

      await angelRewardsContract.methods
        .claimRewards()
        .send({
          from: account,
        })
        .on('transactionHash', async () => {
          setLoading('Claiming');
        })
        .on('receipt', async (result: any) => {
          console.log({ result });

          refetch('Claim success!');
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

  const handleCheckRoll = async (tokenId: string) => {
    try {
      const { contract: rollContract } = await getContractRoll(connector);
      const isAvailable = await rollContract.methods.rollUsed(tokenId).call();
      setIsValid(!isAvailable);
    } catch (err: any) {
      setLoading('');
      if (err.message.includes('execution reverted')) {
        toast.error(err.message.substr(0, err.message.indexOf('{')) || err.message);
      } else {
        toast.error(err.message);
      }
    }
  };

  const { allowance, balance, stakedBear, tokensOfOwner, availBears, availStakedBears, angelRewards, paused } = data;

  return (
    <>
      {loading !== '' && (
        <Loading>
          <LoadingContent>{loading} ...</LoadingContent>
        </Loading>
      )}

      <HeavenAndHellContainer>
        <CarouselBear />
        <InfoSection />
        {active && +allowance !== 0 ? (
          <>
            <ClaimSection
              balance={balance}
              tokensOfOwner={tokensOfOwner}
              availBears={availBears}
              handleRoll={handleRoll}
            />
            <ClaimStakedBearSection
              balance={balance}
              stakedBear={stakedBear}
              availStakedBears={availStakedBears}
              handleRoll={handleRollStakedBears}
            />
          </>
        ) : (
          <WalletConnectWrap>
            <WalletConnect allowance={allowance} handleApprove={handleApprove} />
          </WalletConnectWrap>
        )}{' '}
        {active && (
          <>
            <HeavenAndHellRewards
              angelRewards={angelRewards}
              handleClaimAngelRewards={handleClaimAngelRewards}
              paused={paused}
            />
            <CheckBearSection isValid={isValid} handleCheckRoll={handleCheckRoll} />
          </>
        )}
      </HeavenAndHellContainer>
    </>
  );
};

export default HeavenAndHellPage;

const WalletConnectWrap = styled.div`
  width: 100%;
  text-align: center;
  .connect-btn {
    height: 80px;
    width: 300px;
    margin: 100px 0;
  }
`;

const HeavenAndHellContainer = styled.div`
  min-height: 100vh;
  margin-top: 113px;
  padding-top: 67px;
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
