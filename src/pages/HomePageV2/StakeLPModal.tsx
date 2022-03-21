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
            <BlueTypo>Stake</BlueTypo>
          </Button>
        </ButtonWrap>
      </ModalWrap>

      <Backdrop />
    </>
  );
};

const StyledInput = styled.input`
  border: unset;
  width: 80%;
  margin: 20px auto;
  height: 70px;
  border-radius: 30px;
  font-size: 40px;

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
  background: #d7adff;
  overflow: hidden;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 22px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  @media (max-width: 500px) {
    min-width: unset;
    width: 100%;
    height: 100vh;
    border-radius: 0;
  }
`;

const Title = styled.div`
  font-size: 42px;
  margin: 14px 38px;
  color: #ff6d00;
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
  width: 40px;
  height: 40px;

  &::before,
  &::after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 40px;
    width: 5px;
    background-color: #ff6d00;
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
  all: unset;
  height: 61px;
  margin: 10px 38px;
  background: #9d4edd;
  border-radius: 30px;
  font-size: 40px;
  line-height: 47px;
  letter-spacing: 0.15em;
  color: #ff9e00;
  max-width: 530px;
  font-style: normal;
  font-weight: normal;
  text-align: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    filter: brightness(0.8);
  }

  @media (max-width: 992px) {
    max-width: unset;
    font-size: 35px;
  }
  ${(props) => props.disabled && disabledStyles}
`;

const BlueTypo = styled.span`
  color: #41ff01;
`;
