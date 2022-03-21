import { useWallet } from 'hooks/useWallet';
import { FC, useState } from 'react';
import styled, { css } from 'styled-components';

export const WalletConnect: FC = () => {
  const [open, setOpen] = useState(false);
  const { connect } = useWallet();

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleConnect = async (key: 'injected' | 'walletconnect' | 'walletlink') => {
    await connect(key);
    setOpen(false);
  };

  return (
    <DropDownContainer>
      <ConnectButton onClick={toggleOpen}>Connect Wallet</ConnectButton>
      <WalletPopup open={open}>
        <CloseButton onClick={toggleOpen} />
        <Button onClick={() => handleConnect('injected')}>Metamask</Button>
        <Button onClick={() => handleConnect('walletconnect')}>Walletconnect</Button>
        <Button onClick={() => handleConnect('walletlink')}>Coinbase Wallet</Button>
      </WalletPopup>
    </DropDownContainer>
  );
};

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

const DropDownContainer = styled.div`
  min-width: 400px;
`;

const WalletPopup = styled.div<{ open: boolean }>`
  max-width: 530px;
  min-width: 500px;
  position: fixed;
  padding: 55px;
  background: #d7adff;
  overflow: hidden;
  z-index: -1;
  visibility: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 22px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 500px) {
    min-width: unset;
    width: 100%;
    height: 100vh;
    border-radius: 0;
  }

  ${(p) =>
    p.open &&
    css`
      z-index: 10;
      visibility: visible;
    `}
`;

const ConnectButton = styled.button`
  all: unset;
  height: 100px;
  width: 100%;
  background: #9d4edd;
  border-radius: 30px;
  font-size: 40px;
  line-height: 47px;
  letter-spacing: 0.15em;
  color: #41ff01;
  max-width: 530px;
  margin-top: 15%;
  @media (max-width: 992px) {
    max-width: unset;
    font-size: 35px;
    height: 70px;
    margin: 15% 15px 0px 15px;
  }
  @media (max-width: 450px) {
    max-width: unset;
    font-size: 24px;
  }
  ${buttonBase}
`;

const Button = styled.button`
  all: unset;
  height: 100px;
  width: 100%;
  background: #9d4edd;
  border-radius: 30px;
  font-size: 40px;
  line-height: 47px;
  letter-spacing: 0.15em;
  color: #41ff01;
  max-width: 530px;
  ${buttonBase}
  width: 100%;
  margin-top: 20px;
`;

const CloseButton = styled.button`
  all: unset;
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 15px;
  width: 28px;
  height: 28px;
  transition: all 0.2s;
  &:hover {
    filter: brightness(0.8);
  }
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 13px;
    top: 0;
    height: 28px;
    width: 4px;
    background-color: #ff6d00;
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
`;
