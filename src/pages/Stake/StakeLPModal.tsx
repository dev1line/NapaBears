import { FC, useState } from 'react';
import styled from 'styled-components';

interface StakeModalProps {
  onClose: () => void;
  handleStake: (value: any) => void;
  name?: string;
}

const StakeLPModal: FC<StakeModalProps> = ({ onClose, handleStake, name }) => {
  const [stakedAmount, setStakedAmount] = useState('');

  const stakeBear = () => {
    handleStake(stakedAmount);
  };

  return (
    <>
      <ModalWrap>
        <Title>Stake Your {name || 'LP Token'}</Title>
        <CloseModalButton onClick={onClose} />

        <ButtonWrap>
          <StyledInput
            placeholder="Amount"
            value={stakedAmount}
            type="number"
            onChange={(e: any) => {
              setStakedAmount(e.target.value);
            }}
          />
          <Button disabled={!stakedAmount} onClick={stakeBear}>
            Stake
          </Button>
        </ButtonWrap>
      </ModalWrap>

      <Backdrop />
    </>
  );
};

const StyledInput = styled.input`
  border: unset;
  width: 300px;
  margin: 20px auto;
  height: 50px;
  border-radius: 30px;
  font-size: 20px;

  border-color: none;
  text-align: center;
  &:focus {
    border: unset;
  }
  &:active {
    border: unset;
  }
`;

export default StakeLPModal;

const ModalWrap = styled.div`
  max-width: 530px;
  min-width: 500px;
  position: fixed;
  background-color: #0f6e80;
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
    background-color: #098d60;
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
  background-color: #098d60;
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
