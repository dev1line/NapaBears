import { useWallet } from 'hooks/useWallet';
import { FC, useState } from 'react';
import styled from 'styled-components';

import { getAvatar } from 'utils/getAvatar';
import { Typography } from './Typography';
import WalletInfoModal from './WalletInfoModal';

export const AccountInfo: FC = () => {
  const { account } = useWallet();
  const [showInfo, setShowInfo] = useState(false);

  const toggleShow = () => {
    setShowInfo(!showInfo);
  };

  if (!account) return <div />;

  return (
    <>
      <AccountInfoContainer onClick={toggleShow}>
        <AccountRow>
          <ImageContainer>
            <img src={getAvatar(account || '')} alt="account" />
          </ImageContainer>
          <Typography>
            {account?.slice(0, 7)}...{account?.slice(35, 42)}
          </Typography>
        </AccountRow>
      </AccountInfoContainer>
      <WalletInfoModal visible={showInfo} onClose={toggleShow} />
    </>
  );
};

const AccountInfoContainer = styled.div`
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
  background: #098d60;
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
