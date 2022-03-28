import Headline from './components/Headline';

import Berries from 'assets/v2/berries.svg';
import { Typography, TypographySpan } from 'components/Typography';
import { SupplyCard, Box } from './components/styled';
import { FC } from 'react';
import { Col, Row } from 'styled-bootstrap-grid';

const WhatBerriesSection: FC = () => {
  return (
    <Box mt={130}>
      <Headline src={Berries}>
        <Typography xsFontSize={24} mdFontSize={32} mb={-25} fontSize={48} fontWeight="bold" lineHeight={56}>
          What’s &nbsp;
          <TypographySpan
            xsFontSize={24}
            mdFontSize={32}
            fontSize={48}
            fontWeight="bold"
            lineHeight={56}
            color="#E31D78"
          >
            $NAPAS?
          </TypographySpan>
        </Typography>
      </Headline>

      <Row alignItems="end">
        <Col xs={24} xl={15}>
          <Typography mdFontSize={18} mt={24} fontSize={24} lineHeight={28} align="justify">
            $NAPAS is the utility token that fuels within Napa World ecosystem and hold no monetary value.&nbsp;
            <TypographySpan mdFontSize={18} fontSize={24} lineHeight={28} color="#E31D78">
              (1 $NAPAS = 1 $NAPAS)
            </TypographySpan>
            . They exist in a limited supply and will become scarcer as tokens are burned for various utilities. $NAPAS
            will be distributed in three pools: Original staking pool (Bears Staking), LP Tokens Staking (add equal
            parts of ETH and $NAPAS) and single sided $NAPAS pool.
          </Typography>
        </Col>
        <Col xs={24} xl={9}>
          <SupplyCard>
            <Typography mdFontSize={18} fontSize={24} fontWeight="bold" lineHeight={28}>
              <TypographySpan mdFontSize={18} fontWeight="bold" fontSize={24} lineHeight={28} color="#E31D78">
                $NAPAS&nbsp;
              </TypographySpan>
              Total Supply
            </Typography>

            <Typography mdFontSize={16} mt={6} mb={32}>
              171,550,000
            </Typography>

            <Typography mdFontSize={18} fontSize={24} fontWeight="bold" lineHeight={28}>
              <TypographySpan mdFontSize={18} fontWeight="bold" fontSize={24} lineHeight={28} color="#E31D78">
                $NAPAS&nbsp;
              </TypographySpan>
              Smart Contract
            </Typography>
            <Typography mdFontSize={16} mt={6}>
              {/* 0x3cbaecef82e3a1ba1d01f9acb60883bdf11f4ee2 */}
            </Typography>
          </SupplyCard>
        </Col>
      </Row>
    </Box>
  );
};

export default WhatBerriesSection;
