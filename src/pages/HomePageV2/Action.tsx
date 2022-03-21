/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { getContractNoWallet, getContract } from 'utils/getContract';

// import useWallet from 'hooks/useWallet';
// import { toast } from 'react-toastify';

// import { Typography } from './Typography';

const Action = ({ refProp, setBid, bidValue }: any) => {
  return null;
  //   const [data, setData] = useState({
  //     isStart: false,
  //     isEnded: false,
  //     minimumBidIncrement: 0,
  //     unitPriceStepSize: 0,
  //     minimumQuantity: 0,
  //     maximumQuantity: 0,
  //     minimumUnitPrice: 0,
  //     bidPrice: '0',
  //     bidAmount: '0',
  //     _allowWithdrawals: false,
  //   });
  //   const [, setBidData] = useState({
  //     amount: 0,
  //     total: 0,
  //   });
  //   const [amount, setAmount] = useState('');
  //   const [price, setPrice] = useState('');
  //   const [loadingClaim, setLoadingClaim] = useState(false);
  //   const [loadingBid, setLoadingBid] = useState(false);

  //   const { connect, active, account, connector, library } = useWallet();

  //   const handleConnectWallet = async (): Promise<any> => {
  //     await connect();
  //   };

  //   const handleClaimRefund = async () => {
  //     if (!_allowWithdrawals) {
  //       toast.error('Withdrawals are not allowed right now.');
  //     } else if (!isEnded) {
  //       toast.error('Auction is not ended.');
  //     } else {
  //       const { contract } = await getContract(connector);
  //       try {
  //         await contract.methods
  //           .claimRefund()
  //           .send({
  //             from: account,
  //           })
  //           .on('receipt', async () => {
  //             toast.success('Claim refund success');
  //             setLoadingClaim(false);
  //           })
  //           .on('transactionHash', async () => {
  //             setLoadingClaim(true);
  //           });
  //       } catch (err: any) {
  //         setLoadingClaim(false);
  //       }
  //     }
  //   };

  //   const placeBid = async () => {
  //     if (!loadingBid) {
  //       if (active) {
  //         if (!amount && !price) {
  //           toast.error('Please input amount and price');
  //         } else if (Number(amount) < minimumQuantity || Number(amount) > maximumQuantity) {
  //           toast.error('Amount must be between ' + minimumQuantity + ' and ' + maximumQuantity);
  //         } else if (library?.utils?.fromWei(bidPrice, 'ether') > price) {
  //           toast.error(`Unit price can't be lowered.`);
  //         } else if (
  //           Number(amount) * Number(library?.utils?.toWei(price, 'ether')) - Number(bidPrice) * Number(bidAmount) <=
  //           0
  //         ) {
  //           toast.error(`Total value can't be lowered.`);
  //         } else {
  //           const { contract } = await getContract(connector);
  //           try {
  //             await contract.methods
  //               .placeBid(amount, library?.utils?.toWei(price, 'ether'))
  //               .send({
  //                 from: account,
  //                 value: Math.abs(
  //                   Number(amount) * Number(library?.utils?.toWei(price, 'ether')) - Number(bidPrice) * Number(bidAmount)
  //                 ),
  //               })
  //               .on('receipt', async () => {
  //                 setLoadingBid(false);
  //                 setBidData({
  //                   total: Number(amount) * Number(price),
  //                   amount: Number(amount),
  //                 });
  //                 setBid(bidValue + 1);
  //                 toast.success(`Place bid success`);
  //                 refetchData();
  //               })
  //               .on('transactionHash', async () => {
  //                 setLoadingBid(true);
  //               });
  //           } catch (err: any) {
  //             setLoadingBid(false);
  //             if (err.message.includes('execution reverted')) {
  //               toast.error(err.message.substr(0, err.message.indexOf('{')) || err.message);
  //             } else {
  //               toast.error(err.message);
  //             }
  //             console.log(err);
  //           }
  //         }
  //       } else {
  //         handleConnectWallet();
  //       }
  //     }
  //   };

  //   const refetchData = async () => {
  //     try {
  //       const { contract } = await getContractNoWallet();
  //       const status = await contract.methods.currentAuctionStatus().call();
  //       const minimumBidIncrement = await contract.methods.minimumBidIncrement().call();
  //       const unitPriceStepSize = await contract.methods.unitPriceStepSize().call();
  //       const minimumQuantity = await contract.methods.minimumQuantity().call();
  //       const maximumQuantity = await contract.methods.maximumQuantity().call();
  //       const minimumUnitPrice = await contract.methods.minimumUnitPrice().call();
  //       const bid = await contract.methods.getBid(account || '0xbC6dCC38142F564d9515C5792005BCBEA84b058c').call();
  //       const bidPrice = bid?.unitPrice;
  //       const bidAmount = bid?.quantity;
  //       const _allowWithdrawals = await contract.methods.getAllowWithdrawals().call();
  //       setData({
  //         isStart: status.started,
  //         isEnded: status.ended,
  //         minimumBidIncrement,
  //         unitPriceStepSize,
  //         minimumQuantity,
  //         maximumQuantity,
  //         minimumUnitPrice,
  //         bidPrice,
  //         bidAmount,
  //         _allowWithdrawals,
  //       });
  //       setBidData({
  //         amount: bidAmount,
  //         total: Number(bidAmount) * Number(library?.utils?.fromWei(bidPrice, 'ether')) || 0,
  //       });
  //     } catch (err: any) {
  //       console.log(err);
  //       // toast.warning('Error connecting to network');
  //     }
  //   };

  //   useEffect(() => {
  //     const getBlockchainData = async () => {
  //       try {
  //         const { contract } = await getContractNoWallet();
  //         const balance = await library?.eth.getBalance('0x24655ba880D34b86F6a2A09aBa5874bc94Af5c94');
  //         const status = await contract.methods.currentAuctionStatus().call();
  //         const minimumBidIncrement = await contract.methods.minimumBidIncrement().call();
  //         const unitPriceStepSize = await contract.methods.unitPriceStepSize().call();
  //         const minimumQuantity = await contract.methods.minimumQuantity().call();
  //         const maximumQuantity = await contract.methods.maximumQuantity().call();
  //         const minimumUnitPrice = await contract.methods.minimumUnitPrice().call();
  //         const bid = await contract.methods.getBid(account || '0xbC6dCC38142F564d9515C5792005BCBEA84b058c').call();
  //         const bidPrice = bid?.unitPrice;
  //         const bidAmount = bid?.quantity;
  //         const _allowWithdrawals = await contract.methods.getAllowWithdrawals().call();
  //         setData({
  //           isStart: status.started,
  //           isEnded: status.ended,
  //           minimumBidIncrement,
  //           unitPriceStepSize,
  //           minimumQuantity,
  //           maximumQuantity,
  //           minimumUnitPrice,
  //           bidPrice,
  //           bidAmount,
  //           _allowWithdrawals,
  //         });
  //         setBidData({
  //           amount: bidAmount,
  //           total: Number(bidAmount) * Number(library?.utils?.fromWei(bidPrice, 'ether')) || 0,
  //         });
  //       } catch (err: any) {
  //         console.log(err);
  //         // toast.warning('Error connecting to network');
  //       }
  //     };
  //     getBlockchainData();
  //   }, [connector, account, active, library?.utils, setBid, library?.eth]);

  //   const { isStart, isEnded, bidPrice, bidAmount, minimumQuantity, maximumQuantity, _allowWithdrawals } = data;
  //   return (
  //     <Container ref={refProp}>
  //       <CardContainer>
  //         <Card>
  //           <CardTitle>
  //             <BigText>Account Balance</BigText>
  //           </CardTitle>
  //           <BigText>
  //             <NumberText>0</NumberText>$SWEETZ
  //           </BigText>
  //         </Card>
  //         <Card>
  //           <CardTitle>
  //             <BigText>{account && active ? account.slice(0, 12) : 'Not Connected'}</BigText>
  //           </CardTitle>
  //           <PrimaryButton onClick={handleConnectWallet}>{!active ? 'Connect' : 'Disconnect'}</PrimaryButton>
  //         </Card>
  //         <Card>
  //           <NormalText fontSize={20}>0 staked bears</NormalText>
  //           <BigText>
  //             <NumberText>0</NumberText>$SWEETZ <ActionButton>Claim</ActionButton>
  //           </BigText>
  //           <BigText mt="25px">Earning 0 $SWEETZ / Day</BigText>
  //           <SmallText mt="10px">Earn 10 $SWEETZ / Bear / Day</SmallText>
  //           <SmallText mt="20px" color="#d97707">
  //             NOTE: Any unclaimed $SWEETZ rewards will be soon airdropped to your wallet.
  //           </SmallText>
  //         </Card>
  //         <Card>
  //           <CardTitle>
  //             <BigText>Staking liquidity rewards</BigText>
  //           </CardTitle>
  //           <NormalText mt="15px">Step 1: Approve the contract to enable staking.</NormalText>
  //           <NormalText mt="15px">Step 2: Once complete, stake your tokens.</NormalText>
  //           <ActionButton>Approve</ActionButton>
  //         </Card>
  //         <Card w="1100px">
  //           <NormalText fontSize={20}>No mutants to stake</NormalText>
  //           <PrimaryButton mt="20px">Buy on Opensea</PrimaryButton>
  //         </Card>
  //       </CardContainer>
  //     </Container>
  //   );
  // };

  // const Container = styled.div`
  //   text-align: center;
  //   max-width: 1100px;
  //   margin: 0 auto 50px;
  // `;
  // const CardContainer = styled.div`
  //   display: flex;
  //   flex-wrap: wrap;
  //   justify-content: space-between;
  // `;
  // const Card = styled.div<{ w?: string }>`
  //   background-color: #dfccf8;
  //   padding: 25px;
  //   border-radius: 12px;
  //   width: ${(p) => (p.w ? p.w : '540px')};
  //   margin-top: 25px;
  //   p {
  //     color: #4b5563;
  //     text-align: center;
  //   }
  // `;
  // const BigText = styled(Typography)<{ mt?: string }>`
  //   font-size: 24px;
  //   font-weight: bold;
  //   margin-top: ${(p) => (p.mt ? p.mt : '0')};
  // `;

  // const SmallText = styled(Typography)<{ mt?: string; color?: string }>`
  //   font-size: 14px;
  //   font-weight: bold;
  //   margin-top: ${(p) => (p.mt ? p.mt : '0')};
  //   color: ${(p) => (p.color ? p.color + '!important' : 'inherit')};
  // `;

  // const NormalText = styled(Typography)<{ mt?: string }>`
  //   font-weight: bold;
  //   margin-top: ${(p) => (p.mt ? p.mt : '0')};
  // `;

  // const NumberText = styled.span`
  //   font-size: 24px;
  //   font-weight: bold;
  //   color: black;
  //   font-family: inherit;
  //   margin-right: 5px;
  // `;

  // const CardTitle = styled.div`
  //   margin-bottom: 30px;
  // `;

  // const PrimaryButton = styled.button<{ mt?: string }>`
  //   color: #e5e7ea;
  //   background-color: #4b5563;
  //   padding: 5px 28px 10px;
  //   border: 1px solid #4b5563;
  //   border-radius: 5px;
  //   box-shadow: none;
  //   font-size: 16px;
  //   font-weight: bold;
  //   cursor: pointer;
  //   margin-top: ${(p) => (p.mt ? p.mt : '0')};
  // `;

  // const ActionButton = styled.button`
  //   color: #fbbf24;
  //   background-color: #171e2e;
  //   padding: 5px 28px 10px;
  //   border: 1px solid #171e2e;
  //   border-radius: 5px;
  //   box-shadow: none;
  //   font-size: 16px;
  //   font-weight: bold;
  //   cursor: pointer;
  //   margin-top: 30px;
  // `;
};
export default Action;
