import { FC, useCallback, useState } from 'react';
import styled from 'styled-components';

interface StakeModalProps {
  onClose: () => void;
  handleUnstake: (value: string[]) => void;
  data: string[];
}

const UnStakeModal: FC<StakeModalProps> = ({ onClose, handleUnstake, data }) => {
  const [checked, setChecked] = useState<string[]>([]);

  const handleChecked = useCallback(
    (e: any) => {
      const value = e.target.value;
      const index = checked.findIndex((x) => x === value);
      if (index !== -1) {
        const nChecked = [...checked];
        nChecked.splice(index, 1);
        setChecked(nChecked);
        return;
      }
      setChecked([...checked, value]);
    },
    [checked]
  );

  const unStakeAll = () => {
    handleUnstake(data);
  };

  const unStakeBear = () => {
    handleUnstake(checked);
  };

  return (
    <>
      <ModalWrap>
        <Title>UnStake Your Bears</Title>
        <CloseModalButton onClick={onClose} />
        <CheckBoxList>
          {data.map((token, i) => (
            <label key={token} className="checkbox">
              <input onChange={handleChecked} value={token} className="checkbox-input" type="checkbox" />
              <span className="checkbox-checkmark-box">
                <span className="checkbox-checkmark"></span>
              </span>
              BEAR #{token}
            </label>
          ))}
        </CheckBoxList>

        <ButtonWrap>
          <Button disabled={checked.length === 0} onClick={unStakeBear}>
            <BlueTypo>UNSTAKE</BlueTypo>
          </Button>
          <Button onClick={unStakeAll}>UnStake all</Button>
        </ButtonWrap>
      </ModalWrap>

      <Backdrop />
    </>
  );
};

export default UnStakeModal;

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

const CheckBoxList = styled.div`
  overflow: auto;
  margin-top: 20px;
  padding: 0 38px;
  max-height: 450px;
  background: transparent;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #d7adff;
  }

  &::-webkit-scrollbar {
    width: 6px;
    background-color: #d7adff;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #000000;
  }
  & > * {
    margin-top: 15px;
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
