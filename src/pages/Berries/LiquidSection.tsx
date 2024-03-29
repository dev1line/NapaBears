import Headline from './components/Headline';

import BerriesLiquid from 'assets/v2/berries_liquid.svg';
import { Typography, TypographySpan } from 'components/Typography';
import { Box } from './components/styled';
import { FC } from 'react';

const LiquidSection: FC = () => {
  return (
    <Box mt={129}>
      <Headline src={BerriesLiquid}>
        <Typography xsFontSize={24} mdFontSize={32} mb={-22} fontSize={48} fontWeight="bold" lineHeight={56}>
          <TypographySpan
            xsFontSize={24}
            mdFontSize={32}
            fontSize={48}
            fontWeight="bold"
            lineHeight={56}
            color="#098d60"
          >
            $NAPAS&nbsp;
          </TypographySpan>
          Liquidity Pools
        </Typography>
      </Headline>

      <Typography mdFontSize={18} mt={24} fontSize={24} lineHeight={28} align="justify">
        Liquidity pools (LPs) are crowdsourced pools of tokens which are often designed to incentivize staking by
        offering rewards. $NAPAS can be staked in liquidity pools #2 and #3 to earn additional $NAPAS. The portion of
        extra $NAPAS you receive is determined by how many tokens you stake relative to the whole pool.
        <br /> <br />
        Stakers in LP #2 earn a portion of the 15,000 $NAPAS emitted each day. Participating in LP #2 requires
        purchasing LP tokens by combining equal amounts of $NAPAS and WETH. The amount of WETH needed to make one LP
        token is relative to the market price of $NAPAS at the time you purchase the LP token. For additional
        instructions on how to do this, see 📖│staking-tutorials.
        <br /> <br />
        Stakers in LP #3 earn a portion of the 3,000 $NAPAS emitted each day. Participating in LP #3 is less risky and
        cheaper than LP #2 in that it only requires staking $NAPAS, but in turn the rewards are reduced.
      </Typography>
    </Box>
  );
};

export default LiquidSection;
