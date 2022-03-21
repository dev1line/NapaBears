import { useWallet } from 'hooks/useWallet';
import { FC, useState } from 'react';
import styled from 'styled-components';

import { getAvatar } from 'utils/getAvatar';
import WalletInfoModal from './WalletInfoModal';

export const AccountInfo: FC = () => {
  const { account } = useWallet();
  const [showInfo, setShowInfo] = useState(false);

  const toggleShow = () => {
    setShowInfo(!showInfo);
  };

  if (!account) return null;

  return (
    <>
      <AccountInfoContainer onClick={toggleShow}>
        <AccountRow>
          <ImageContainer>
            <img src={getAvatar(account || '')} alt="account" />
          </ImageContainer>
          <span>
            {account?.slice(0, 8)}...{account?.slice(38, 42)}
          </span>
        </AccountRow>
      </AccountInfoContainer>
      <WalletInfoModal visible={showInfo} onClose={toggleShow} />
    </>
  );
};

const AccountInfoContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  justify-content: flex-end;
  z-index: 20;
  @media (max-width: 1024px) {
    left: 16px;
    right: unset;
    justify-content: flex-start;
  }
`;

const AccountRow = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: #9d4edd;
  border-radius: 30px;
  font-size: 16px;
  letter-spacing: 2px;
  padding: 8px 20px;
  min-width: 200px;
`;

const ImageContainer = styled.div`
  padding-top: 3px;
  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-right: 8px;
  }
`;
