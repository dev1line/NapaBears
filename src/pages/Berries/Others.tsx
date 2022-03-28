import Headline from './components/Headline';
import styled from 'styled-components';
import Berries from 'assets/v2/berries.svg';
import Finder from 'assets/v2/finder.svg';
import { Typography, TypographySpan } from 'components/Typography';
import { SupplyCard, Box } from './components/styled';
import { FC } from 'react';
import { Col, Row } from 'styled-bootstrap-grid';

const EtherView = styled.img`
  all: unset;
  cursor: pointer;
  width: 20px;
  height: 40px;
  border-radius: 50%;
  margin-left: 15px;
`;
const Others: FC = () => {
  return (
    <Box mt={130}>
      <Box mb={30}>
        <Headline src={Berries}>
          <Typography xsFontSize={24} mdFontSize={32} mb={-25} fontSize={48} fontWeight="bold" lineHeight={56}>
            Others &nbsp;
            <TypographySpan
              xsFontSize={24}
              mdFontSize={32}
              fontSize={48}
              fontWeight="bold"
              lineHeight={56}
              color="#098d60"
            >
              $NAPAS?
            </TypographySpan>
          </Typography>
        </Headline>
      </Box>
      <Row alignItems="end">
        <Col xs={24} xl={24}>
          <SupplyCard>
            <Typography mdFontSize={18} fontSize={24} fontWeight="bold" lineHeight={28}>
              <TypographySpan mdFontSize={18} fontWeight="bold" fontSize={24} lineHeight={28} color="#098d60">
                NapaBears NFT&nbsp;
              </TypographySpan>
            </Typography>
            <Typography mt={6} fontSize={14} color="#2cf9dd" style={{ display: 'flex', alignItems: 'center' }}>
              0x2b2758787De93EF68aDd99590405e1380470Ec66
              <a href="https://rinkeby.etherscan.io/address/0x2b2758787De93EF68aDd99590405e1380470Ec66" color="#2cf9dd">
                <EtherView src={Finder} />
              </a>
            </Typography>
            <Typography mdFontSize={18} fontSize={24} fontWeight="bold" lineHeight={28}>
              <TypographySpan mdFontSize={18} fontWeight="bold" fontSize={24} lineHeight={28} color="#098d60">
                NapaBears Staking&nbsp;
              </TypographySpan>
            </Typography>
            <Typography mt={6} fontSize={14} color="#2cf9dd" style={{ display: 'flex', alignItems: 'center' }}>
              0x8f4DA7561BA68792B6c876fA94D0c01062F53726
              <a href="https://rinkeby.etherscan.io/address/0x8f4DA7561BA68792B6c876fA94D0c01062F53726" color="#2cf9dd">
                <EtherView src={Finder} />
              </a>
            </Typography>
            <Typography mdFontSize={18} fontSize={24} fontWeight="bold" lineHeight={28}>
              <TypographySpan mdFontSize={18} fontWeight="bold" fontSize={24} lineHeight={28} color="#098d60">
                $NAPAS&nbsp;
              </TypographySpan>
            </Typography>
            <Typography mt={6} fontSize={14} color="#2cf9dd" style={{ display: 'flex', alignItems: 'center' }}>
              0x70522B26A1A31272dAAABD2D3810203a0f3Fa234
              <a href="https://rinkeby.etherscan.io/address/0x70522B26A1A31272dAAABD2D3810203a0f3Fa234" color="#2cf9dd">
                <EtherView src={Finder} />
              </a>
            </Typography>
            <Typography mdFontSize={18} fontSize={24} fontWeight="bold" lineHeight={28}>
              <TypographySpan mdFontSize={18} fontWeight="bold" fontSize={24} lineHeight={28} color="#098d60">
                $NAPAS Single Staking &nbsp;
              </TypographySpan>
            </Typography>
            <Typography mt={6} fontSize={14} color="#2cf9dd" style={{ display: 'flex', alignItems: 'center' }}>
              0x70522B26A1A31272dAAABD2D3810203a0f3Fa234
              <a href="https://rinkeby.etherscan.io/address/0x70522B26A1A31272dAAABD2D3810203a0f3Fa234" color="#2cf9dd">
                <EtherView src={Finder} />
              </a>
            </Typography>
            <Typography mdFontSize={18} fontSize={24} fontWeight="bold" lineHeight={28}>
              <TypographySpan mdFontSize={18} fontWeight="bold" fontSize={24} lineHeight={28} color="#098d60">
                LP Token Sushiswap &nbsp;
              </TypographySpan>
            </Typography>
            <Typography mt={6} fontSize={14} color="#2cf9dd" style={{ display: 'flex', alignItems: 'center' }}>
              0xf72781a260078D88574b5Dc5B5AD5532A9b2375d
              <a href="https://rinkeby.etherscan.io/address/0xf72781a260078D88574b5Dc5B5AD5532A9b2375d" color="#2cf9dd">
                <EtherView src={Finder} />
              </a>
            </Typography>
            <Typography mdFontSize={18} fontSize={24} fontWeight="bold" lineHeight={28}>
              <TypographySpan mdFontSize={18} fontWeight="bold" fontSize={24} lineHeight={28} color="#098d60">
                $NAPAS Rewards &nbsp;
              </TypographySpan>
            </Typography>
            <Typography mt={6} fontSize={14} color="#2cf9dd" style={{ display: 'flex', alignItems: 'center' }}>
              0x82D67fcAAce564FC206F1e73d2c77f43e76e2FFf
              <a href="https://rinkeby.etherscan.io/address/0x82D67fcAAce564FC206F1e73d2c77f43e76e2FFf" color="#2cf9dd">
                <EtherView src={Finder} />
              </a>
            </Typography>
            <Typography mdFontSize={18} fontSize={24} fontWeight="bold" lineHeight={28}>
              <TypographySpan mdFontSize={18} fontWeight="bold" fontSize={24} lineHeight={28} color="#098d60">
                HeavenOrHell NFT &nbsp;
              </TypographySpan>
            </Typography>
            <Typography mt={6} fontSize={14} color="#2cf9dd" style={{ display: 'flex', alignItems: 'center' }}>
              0x34e279EfB2D91C122B2A16D54E1F77c27c30db5F
              <a href="https://rinkeby.etherscan.io/address/0x34e279EfB2D91C122B2A16D54E1F77c27c30db5F" color="#2cf9dd">
                <EtherView src={Finder} />
              </a>
            </Typography>
            <Typography mdFontSize={18} fontSize={24} fontWeight="bold" lineHeight={28}>
              <TypographySpan mdFontSize={18} fontWeight="bold" fontSize={24} lineHeight={28} color="#098d60">
                Angel Rewards &nbsp;
              </TypographySpan>
            </Typography>
            <Typography mt={6} fontSize={14} color="#2cf9dd" style={{ display: 'flex', alignItems: 'center' }}>
              0x153e65F4205Fc66ABB95431Ce2D018B6eA55CE0d
              <a href="https://rinkeby.etherscan.io/address/0x153e65F4205Fc66ABB95431Ce2D018B6eA55CE0d" color="#2cf9dd">
                <EtherView src={Finder} />
              </a>
            </Typography>
          </SupplyCard>
        </Col>
      </Row>
    </Box>
  );
};

export default Others;
