import { useEffect, useState } from 'react';
import BearGIF from 'assets/v2/bear.gif';
import { Typography } from './Typography';
import styled from 'styled-components';
import { WalletConnect } from './WalletConnect';
import { StakeBears } from './StakeBears';
import { StakeLP } from './StakeLP';
import { StakeBerries } from './StakeBerries';
import {
  getContractBear,
  getContractStake,
  getContractStakeOld,
  getContractBerriesToken,
  getContractNoWallet,
} from 'utils/getContract';
import { BERRIES_STAKING_CONTRACT, STAKE_CONTRACT } from 'utils/constants';
import { useWallet } from 'hooks/useWallet';
import { toast } from 'react-toastify';

const Hero = () => {
  const { active, account, connector, library } = useWallet();
  // const { active, connector, library } = useWallet();
  // const account = '0xd827745b4cc5d206a3116049ac4fbc3616939d79';
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
    percentageMigrate: 0,
  });
  const [, setOpen] = useState({
    stakeModal: false,
    unStakeModal: false,
  });

  const [selectStaked, setSelectStaked] = useState<string[]>([]);
  const handleSelectStaked = (id: string) => {
    if (selectStaked.includes(id)) setSelectStaked(selectStaked.filter((item) => item !== id));
    else setSelectStaked([...selectStaked, id]);
  };

  const [selectUnStaked, setSelectUnStaked] = useState<string[]>([]);
  const handleSelectUnStaked = (id: string) => {
    if (selectUnStaked.includes(id)) setSelectUnStaked(selectUnStaked.filter((item) => item !== id));
    else setSelectUnStaked([...selectUnStaked, id]);
  };

  const [loading, setLoading] = useState('');
  const refetch = async (message?: string) => {
    if (!library) return;
    try {
      setLoading('Loading');
      const { contract: stakeContract } = await getContractStake(connector);
      const { contract: stakeContractOld } = await getContractStakeOld(connector);

      const stakedBearOld = await stakeContractOld.methods.depositsOf(account).call();

      const stakedBear = await stakeContract.methods.depositsOf(account).call();
      const { contract: BerriesTokenContract } = await getContractBerriesToken(connector);
      const balance = await BerriesTokenContract.methods.balanceOf(account).call();

      const { contract: bearContract } = await getContractBear(connector);
      const e = await bearContract.methods.balanceOf(STAKE_CONTRACT).call();
      const t = await bearContract.methods.balanceOf(BERRIES_STAKING_CONTRACT).call();
      const percentageMigrate = parseInt(t) / (parseInt(t) + parseInt(e));
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
        percentageMigrate,
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
          const e = await bearContract.methods.balanceOf(STAKE_CONTRACT).call();
          const t = await bearContract.methods.balanceOf(BERRIES_STAKING_CONTRACT).call();
          const percentageMigrate = parseInt(t) / (parseInt(t) + parseInt(e));
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
            percentageMigrate,
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

  useEffect(() => {
    const getDataNoWallet = async () => {
      try {
        const { contract: contractNoWallet } = await getContractNoWallet();
        const allStakedBear = await contractNoWallet.methods.balanceOf(BERRIES_STAKING_CONTRACT).call();
        const totalCount = await contractNoWallet.methods.totalCount().call();
        setData({
          ...data,
          totalCount,
          allStakedBear,
        });
      } catch (err) {
        console.log(err);
      }
    };
    getDataNoWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStake = async (bears: string[]) => {
    console.log({ bears });
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
          setSelectStaked([]);
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
          setSelectUnStaked([]);
          refetch('Unstake success!');
        });
    } catch (err) {
      setLoading('');
    }
  };

  // const handleUnstakeOld = async (bears: string[]) => {
  //   try {
  //     const { contract: stakeContractOld } = await getContractStakeOld(connector);
  //     await stakeContractOld.methods
  //       .withdraw(bears)
  //       .send({
  //         from: account,
  //       })
  //       .on('transactionHash', async () => {
  //         setLoading('Unstaking');
  //         toggleOpen('unStakeModal');
  //       })
  //       .on('receipt', async () => {
  //         refetch('Unstake success!');
  //       });
  //   } catch (err) {
  //     setLoading('');
  //   }
  // };

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
    // stakedBearOld,
    // percentageMigrate,
  } = data;
  return (
    <>
      {loading !== '' && (
        <Loading>
          <LoadingContent>{loading} ...</LoadingContent>
        </Loading>
      )}
      <Container>
        <div>
          <img src={BearGIF} alt="bear" width="378" height="378" />
        </div>
        <Introduction>
          <LargeText fontSize={48}>
            STAKE YOUR <span>BEARS</span>
          </LargeText>
          <LargeText fontSize={48}>
            TO EARN <span>$BERRIES</span>
          </LargeText>
          <Typography fontSize={18}>
            $BERRIES our your ticket to the MetaBears ecosystem. Use them to mint future NFT collections, enter raffles,
            participate in community games, join future whitelists, and much more. Stake your Halloween Bears to start
            earning today!"
          </Typography>
          <WalletConnect />
        </Introduction>
      </Container>
      {/* {active && (
        <MigrationContainer>
          <MigrationPercent>
            <div>{(percentageMigrate * 100).toFixed(2)}%</div>
          </MigrationPercent>
          <MigrationAction>
            <Title fontSize={30} color="#e31d78" strong>
              Staking Migration
            </Title>
            <Typography fontSize={18} color="#000">
              Due to recent changes, we've migrated from the $SWEETS contract. Please unstake your bears and migrate to
              the new $BERRIES contract.
            </Typography>
            <Typography fontSize={18} color="#000" strong margin="10px 0 0 0">
              You have {stakedBearOld.length} bears available to unstake
            </Typography>
            <Button onClick={() => handleUnstakeOld(stakedBearOld)} disabled={stakedBearOld.length === 0}>
              Unstake now
            </Button>
          </MigrationAction>
        </MigrationContainer>
      )} */}

      <TotalStakeContainer>
        <TotalStakeRow>
          <PercentageStakeText fontSize={36} color="#e31d78" strong>
            {(allStakedBear / totalCount) * 100 || 0}% Total Staked Bears
          </PercentageStakeText>
          <CountStake fontSize={36} color="#e31d78" strong>
            {allStakedBear}/{totalCount}
          </CountStake>
        </TotalStakeRow>

        <Percentage>
          <StakedPercentage percentage={(allStakedBear / totalCount) * 100} />
        </Percentage>
      </TotalStakeContainer>
      {active ? (
        <>
          <StakeBears
            totalRewards={totalRewards}
            isApprovedForAll={isApprovedForAll}
            balance={balance}
            stakedBear={stakedBear}
            tokensOfOwner={tokensOfOwner}
            handleClaimRewards={handleClaimRewards}
            handleSelectStaked={handleSelectStaked}
            selectStaked={selectStaked}
            handleSelectUnStaked={handleSelectUnStaked}
            selectUnStaked={selectUnStaked}
            handleStake={handleStake}
            handleUnstake={handleUnstake}
            handleApprove={handleApprove}
          />
          <StakeLP />
          <StakeBerries />
        </>
      ) : (
        <Empty />
      )}
    </>
  );
};

const PercentageStakeText = styled(Typography)`
  line-height: 35px;
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;
const CountStake = styled(Typography)`
  line-height: normal;
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Empty = styled.div`
  height: 300px;
`;

// const disabledStyles = `
//     cursor: not-allowed !important;
//     box-shadow: unset !important;
//     color:#FFFFFF80;
//     & > * {
//         color:#FFFFFF80 !important;
//     }
//     &:hover {
//         background-color: #098d60;
//         box-shadow: none !important;
//         filter: none !important;
//       }
// `;

// const buttonBase = css`
//   font-style: normal;
//   font-weight: normal;
//   text-align: center;
//   cursor: pointer;
//   transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
//   &:hover {
//     box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
//     filter: brightness(0.8);
//   }
// `;

const Container = styled.div`
  display: flex;
  margin: 20px auto 100px;
  @media (max-width: 978px) {
    display: block;
    text-align: center;
  }
`;

const LargeText = styled(Typography)`
  margin: 40px 0 30px;
  span {
    color: #098d60;
    font-weight: bold;
    font-family: 'Roboto';
  }
  @media (max-width: 550px) {
    font-size: 38px;
  }
`;

const Introduction = styled.div`
  max-width: 480px;
  margin-left: 50px;
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const TotalStakeRow = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 550px) {
    flex-wrap: wrap;
    flex-direction: column-reverse;
  }
`;

const Percentage = styled.div`
  width: 100%;
  height: 40px;
  background: #0f6e80;
  border-radius: 20px;
  margin-top: 30px;
  position: relative;
  cursor: pointer;
`;

const StakedPercentage = styled.div<{ percentage: number }>`
  width: ${({ percentage }) => percentage}%;
  height: 40px;
  background: #098d60;
  border-radius: 20px;
`;

const TotalStakeContainer = styled.div`
  margin: 0 auto;
  width: 1200px;
  text-align: center;
  @media (max-width: 1280px) {
    width: 80%;
  }
`;

// const MigrationContainer = styled.div`
//   background: white;
//   margin: 0 auto 150px;
//   width: 1200px;
//   border-radius: 20px;
//   display: flex;
//   padding: 45px 95px;
//   align-items: center;
//   flex: 0 0 100%;
//   border: 5px solid #e31d78;
//   @media (max-width: 1280px) {
//     width: 80%;
//   }
//   @media (max-width: 768px) {
//     justify-content: center;
//     flex-wrap: wrap;
//     padding: 15px;
//     text-align: center;
//   }
// `;

// const MigrationPercent = styled.div`
//   div {
//     width: 180px;
//     height: 180px;
//     border-radius: 50%;
//     font-size: 48px;
//     background-color: #098d60;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }
// `;
// const MigrationAction = styled.div`
//   margin-left: 30px;
//   text-align: left;
// `;

// const Title = styled(Typography)`
//   margin-bottom: 10px;
//   line-height: 40px;
// `;

// const Button = styled.button`
//   background-color: #098d60;
//   border-color: #098d60;
//   border-radius: 20px;
//   color: white;
//   width: auto;
//   font-size: 18px;
//   font-family: Roboto;
//   font-weight: bold;
//   cursor: pointer;
//   padding: 10px 20px;
//   margin: 10px 0;
//   ${buttonBase}

//   ${(props) => props.disabled && disabledStyles}
// `;

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

export default Hero;
