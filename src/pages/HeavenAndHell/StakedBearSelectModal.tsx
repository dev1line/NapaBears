import axios from 'axios';
import { useWallet } from 'hooks/useWallet';
import { Typography } from 'pages/Stake/Typography';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getContractBear } from 'utils/getContract';

interface RollModalProps {
  onClose: () => void;
  handleRoll: (value: any) => void;
  name?: string;
  bears: any;
}

const StakedBearSelectModal: FC<RollModalProps> = ({ onClose, handleRoll, name, bears }) => {
  const [selectRoll, setSelectRoll] = useState<string[]>([]);
  const handleSelectRoll = (id: string) => {
    if (selectRoll.includes(id)) setSelectRoll(selectRoll.filter((item) => item !== id));
    else setSelectRoll([id]);
  };
  const rollBear = () => {
    handleRoll(selectRoll[0]);
    onClose();
  };
  const [bearsList, setBearsList] = useState([] as any);
  const { active, connector, account, library } = useWallet();

  useEffect(() => {
    const getBlockchainData = async () => {
      if (connector && library) {
        try {
          const { contract: bearContract } = await getContractBear(connector);

          if (bears.length) {
            let results: any[] = await Promise.all(
              bears.map(async (item: any): Promise<any> => {
                const img = await bearContract.methods.tokenURI(item).call();
                const removeIPFSTextImg = img.substring(7, img.length);
                const imgUrl = await axios.get(`https://cloudflare-ipfs.com/ipfs/${removeIPFSTextImg}`);
                const img2nd = imgUrl?.data?.image;
                const removeIPFSTextImg2nd = img2nd.substring(7, img2nd.length);
                return {
                  img: `https://cloudflare-ipfs.com/ipfs/${removeIPFSTextImg2nd}`,
                  id: item,
                };
              })
            );
            setBearsList(results);
          }
        } catch (err: any) {
          console.log(err);
        }
      }
    };
    getBlockchainData();
  }, [connector, account, active, library, bears]);

  return (
    <>
      <ModalWrap>
        <Title>Roll Your Staked Bears</Title>
        <CloseModalButton onClick={onClose} />
        <UnstakeContainer>
          {bearsList.map((item: any) => (
            <BearImg
              key={item.id}
              onClick={() => handleSelectRoll(item.id)}
              className={selectRoll.includes(item.id) ? 'selected' : ''}
            >
              <img src={item.img} alt="" />
              <Typography strong>{item.id}</Typography>
            </BearImg>
          ))}
        </UnstakeContainer>
        <ButtonWrap>
          <Button disabled={selectRoll.length === 0} onClick={rollBear}>
            Roll
          </Button>
        </ButtonWrap>
      </ModalWrap>

      <Backdrop />
    </>
  );
};

const BearImg = styled.div`
  background: #122257;
  width: 95px;
  height: 113px;
  padding: 5px 0;
  border-radius: 10px;
  margin: 20px 8px;
  cursor: pointer;
  text-align: center;
  img {
    width: 85px;
    border-radius: 10px;
  }
  &.selected {
    background: #e31d78;
  }
  p {
    text-align: center;
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

export default StakedBearSelectModal;

const ModalWrap = styled.div`
  max-width: 530px;
  min-width: 500px;
  position: fixed;
  background-color: #1e3580;
  color: white;
  padding: 40px;
  border-radius: 8px;
  overflow: hidden;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  @media (max-width: 500px) {
    min-width: unset;
    width: 100%;
    height: 100vh;
    border-radius: 0;
  }
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 14px 38px;
  color: white;
  text-align: center;
  @media (max-width: 500px) {
    font-size: 35px;
  }
`;

const CloseModalButton = styled.button`
  all: unset;
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 0;
  width: 33px;
  height: 33px;

  &::before,
  &::after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 33px;
    width: 5px;
    background-color: #e31d78;
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 200vh;
  position: fixed;
  font-size: 30px;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  z-index: 100;
  backdrop-filter: blur(7px);
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

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  outline: none;
  background-color: #e31d78;
  width: 300px;
  height: 50px;
  border-radius: 20px;
  padding: 10px 24px;
  display: flex;
  font-size: 18px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  margin: 0 auto;
  margin-top: 15px;
  /* ${(props) => props.disabled && disabledStyles} */
`;
