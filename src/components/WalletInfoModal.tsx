import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { useWallet } from 'hooks/useWallet';
import { getAvatar } from 'utils/getAvatar';
import { useMemo } from 'react';
import { walletconnect, walletlink } from 'utils/connector';

interface WalletInfoModalProps {
  visible?: boolean;
  onClose: () => void;
}

const body = document.querySelector('body') as HTMLElement;

export default function WalletInfoModal(props: WalletInfoModalProps) {
  const { visible, onClose } = props;
  const { account, connector, deactivate } = useWallet();

  const handleDisconnect = async () => {
    await deactivate();
    onClose();
  };

  const walletType = useMemo(() => {
    if (connector === walletconnect) return 'WalletConnect';
    if (connector === walletlink) return 'Coinbase Wallet';
    return 'Meta mask';
  }, [connector]);

  if (!visible) {
    return null;
  }

  return ReactDOM.createPortal(
    <Portal>
      <Backdrop />
      <Container>
        <CloseButton onClick={onClose} />
        <Typo> Connected with {walletType}</Typo>
        <AccountRow>
          <ImageContainer>
            <img src={getAvatar(account || '')} alt="account" />
          </ImageContainer>
          <Account>
            {account?.slice(0, 8)}...{account?.slice(38, 42)}
          </Account>
        </AccountRow>
        <DisconnectButton onClick={handleDisconnect}>Disconnect</DisconnectButton>
      </Container>
    </Portal>,
    body
  );
}

const Account = styled.span`
  cursor: pointer;
  font-size: 24px;
`;

const Typo = styled.p`
  font-size: 22px;
`;

const DisconnectButton = styled.button`
  border: none;
  outline: none;
  background-color: #ff3f34;
  width: 120px;
  height: 40px;
  border-radius: 30px;
  padding: 10px 24px;
  display: flex;
  font-size: 18px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  margin: 0 auto;
  margin-top: 15px;
  @media (max-width: 600px) {
    width: 280px;
    padding: 12px 16px;
    right: -16px;
    p {
      font-size: 12px;
    }
  }
`;

const AccountRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 10px 0;
`;

const ImageContainer = styled.div`
  padding-top: 3px;
  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 8px;
  }
`;

const Portal = styled.div`
  position: fixed;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  z-index: 1999;
  backdrop-filter: blur(4px);
`;

const Backdrop = styled.div`
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  z-index: 1;
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  /* border: 4px solid #2e1a05; */
  width: 360px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 20px 22px;
  border-radius: 8px;

  @media (max-width: 600px) {
    width: 320px;
    padding: 24px;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 16px;
  right: 24px;
  width: 20px;
  height: 20px;
  cursor: pointer;

  &:before,
  &:after {
    content: '';
    border-top: 6px solid #2e1a05;
    height: 6px;
    border-radius: 8px;
    width: 28px;
    position: absolute;
  }

  &:before {
    transform: rotate(-45deg) translate(-10px, 10px);
  }

  &:after {
    transform: rotate(45deg) translate(10px, 10px);
  }
`;
