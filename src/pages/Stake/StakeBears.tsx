import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Typography } from './Typography';
import { useWallet } from 'hooks/useWallet';
import { getContractBear } from 'utils/getContract';
import axios from 'axios';

export const StakeBears = ({
  balance,
  tokensOfOwner,
  stakedBear,
  handleClaimRewards,
  totalRewards,
  isApprovedForAll,
  selectStaked,
  handleSelectStaked,
  selectUnStaked,
  handleSelectUnStaked,
  handleStake,
  handleUnstake,
  handleApprove,
}: any) => {
  const { active, connector, account, library, deactivate } = useWallet();

  const handleDisconnect = async () => {
    await deactivate();
  };

  const [bearForUnstake, setBearForUnstake] = useState([] as any);
  const [bearForStake, setBearForStake] = useState([] as any);

  useEffect(() => {
    const getBlockchainData = async () => {
      if (connector && library) {
        try {
          const { contract: bearContract } = await getContractBear(connector);
          if (stakedBear.length) {
            let results: any[] = await Promise.all(
              stakedBear.map(async (item: any): Promise<any> => {
                const img = await bearContract.methods.tokenURI(item).call();
                const removeIPFSTextImg = img.substring(7, img.length);
                const imgUrl = await axios.get(`https://gateway.pinata.cloud/ipfs/${removeIPFSTextImg}`);
                const img2nd = imgUrl?.data?.image;
                const removeIPFSTextImg2nd = img2nd.substring(7, img2nd.length);
                return {
                  img: `https://gateway.pinata.cloud/ipfs/${removeIPFSTextImg2nd}`,
                  id: item,
                };
              })
            );
            setBearForUnstake(results);
          }
          if (tokensOfOwner.length) {
            let results: any[] = await Promise.all(
              tokensOfOwner.map(async (item: any): Promise<any> => {
                const img = await bearContract.methods.tokenURI(item).call();
                const removeIPFSTextImg = img.substring(7, img.length);
                const imgUrl = await axios.get(`https://gateway.pinata.cloud/ipfs/${removeIPFSTextImg}`);
                const img2nd = imgUrl?.data?.image;
                const removeIPFSTextImg2nd = img2nd.substring(7, img2nd.length);
                return {
                  img: `https://gateway.pinata.cloud/ipfs/${removeIPFSTextImg2nd}`,
                  id: item,
                };
              })
            );
            setBearForStake(results);
          }
        } catch (err: any) {
          console.log(err);
        }
      }
    };
    getBlockchainData();
  }, [connector, account, active, library, stakedBear, tokensOfOwner]);

  return (
    <>
      <TitleContainer>
        <Typography fontSize={48} strong margin="10px 0 30px " lineHeight="45px">
          Stake NapaBears
        </Typography>
        <Typography fontSize={18} margin="10px 0 ">
          2 $NAPAS/day per staked bear
        </Typography>
        <Typography fontSize={18} margin="10px 0 ">
          Earn an additional 7 $NAPAS when staking for 1 week, deposited at the end of 7 days
        </Typography>
        {!isApprovedForAll && <Button onClick={handleApprove}>Approve Bear Staking</Button>}
      </TitleContainer>

      <StakeBearsContainer>
        <AccountBalance>
          <TitleAccountBalance fontSize={30} color="#B4C4FB" strong>
            Account Balance <Button onClick={handleDisconnect}>Disconnect</Button>
          </TitleAccountBalance>
          <Typography strong fontSize={36} lineHeight="40px">
            {Number(balance).toFixed(2)} $NAPAS
          </Typography>
        </AccountBalance>
        <ClaimRewards>
          <TitleAccountBalance fontSize={30} color="#B4C4FB" strong>
            Rewards{' '}
            <Button
              onClick={handleClaimRewards}
              disabled={Number(totalRewards) === 0 || !isApprovedForAll || stakedBear.length === 0}
            >
              Claim
            </Button>
          </TitleAccountBalance>
          <ClaimRewardAmount strong fontSize={36} lineHeight="40px">
            {Number(totalRewards || 0).toFixed(2)} $NAPAS
          </ClaimRewardAmount>
        </ClaimRewards>
        <UnstakeBear>
          <TitleUnstaked fontSize={30} color="#B4C4FB" strong lineHeight="33px">
            {stakedBear.length} Staked Bears{' '}
            <Button
              disabled={selectUnStaked.length === 0 || !isApprovedForAll || stakedBear.length === 0}
              onClick={() => handleUnstake(selectUnStaked)}
            >
              Unstake
            </Button>
            <Button disabled={!isApprovedForAll || stakedBear.length === 0} onClick={() => handleUnstake(stakedBear)}>
              Unstake All
            </Button>
          </TitleUnstaked>
          <UnstakeContainer>
            {bearForUnstake.map((item: any) => (
              <BearImg
                key={item.id}
                onClick={() => handleSelectUnStaked(item.id)}
                className={selectUnStaked.includes(item.id) ? 'selected' : ''}
              >
                <img src={item.img} alt="" />
                <Typography strong>{item.id}</Typography>
              </BearImg>
            ))}
          </UnstakeContainer>
        </UnstakeBear>
        <StakeBear>
          <TitleStaked fontSize={30} color="#B4C4FB" strong lineHeight="33px">
            {tokensOfOwner.length} Unstaked Bears{' '}
            <Button
              disabled={selectStaked.length === 0 || !isApprovedForAll || tokensOfOwner.length === 0}
              onClick={() => handleStake(selectStaked)}
            >
              Stake
            </Button>{' '}
            <Button
              disabled={!isApprovedForAll || tokensOfOwner.length === 0}
              onClick={() => handleStake(tokensOfOwner)}
            >
              Stake All
            </Button>
          </TitleStaked>
          <UnstakeContainer>
            {bearForStake.map((item: any) => (
              <BearImg
                key={item.id}
                onClick={() => handleSelectStaked(item.id)}
                className={selectStaked.includes(item.id) ? 'selected' : ''}
              >
                <img src={item.img} alt="" />
                <Typography strong>{item.id}</Typography>
              </BearImg>
            ))}
          </UnstakeContainer>
        </StakeBear>
      </StakeBearsContainer>
    </>
  );
};

const TitleContainer = styled.div`
  margin: 200px auto 0;
  text-align: center;
  p {
    text-align: center;
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
  padding: 10px 20px;
  margin: 10px 0;
  ${buttonBase}

  ${(props) => props.disabled && disabledStyles}
`;

const StakeBearsContainer = styled.div`
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
    }
  }
`;

const TitleAccountBalance = styled(Typography)`
  margin-bottom: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  line-height: 33px;
  button {
    margin-left: 15px;
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
const AccountBalance = styled.div`
  background: #0f6e80;
  width: 49%;
  border-radius: 20px;
  padding: 20px 45px 45px;
  margin: 10px 0;
  @media (max-width: 1200px) {
    flex: 0 0 100%;
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

const ClaimRewardAmount = styled(Typography)`
  margin-top: 20px;
`;

const StakeBear = styled.div`
  background: #0f6e80;
  width: 49%;
  border-radius: 20px;
  padding: 20px 45px 45px;
  margin: 10px 0;
  flex: 0 0 100%;
  @media (max-width: 560px) {
    padding: 20px 10px 45px;
  }
`;
const UnstakeBear = styled.div`
  background: #0f6e80;
  width: 49%;
  border-radius: 20px;
  padding: 20px 45px 45px;
  margin: 10px 0;
  flex: 0 0 100%;
  @media (max-width: 560px) {
    padding: 20px 10px 45px;
  }
`;

const UnstakeContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  @media (max-width: 560px) {
    justify-content: space-around;
  }
`;

const TitleUnstaked = styled(Typography)`
  margin-bottom: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  button {
    margin-left: 15px;
    margin-bottom: 5px;
  }
  @media (max-width: 560px) {
    display: block;
    text-align: center;
    button {
      margin: 20px auto 10px;
      display: block;
    }
  }
`;

const TitleStaked = styled(Typography)`
  margin-bottom: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  button {
    margin-left: 15px;
    margin-bottom: 5px;
  }

  @media (max-width: 560px) {
    display: block;
    text-align: center;
    button {
      margin: 20px auto 10px;
      display: block;
    }
  }
`;

const BearImg = styled.div`
  background: #122257;
  width: 95px;
  height: 113px;
  padding: 5px 0;
  border-radius: 10px;
  margin: 20px 8px;
  cursor: pointer;
  img {
    width: 85px;
    border-radius: 10px;
  }
  &.selected {
    background: #098d60;
  }
  p {
    text-align: center;
  }
`;
