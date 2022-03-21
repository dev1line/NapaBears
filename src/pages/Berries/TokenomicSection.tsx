import Headline from './components/Headline';

import BerriesTokenomic from 'assets/v2/berries_tokenomic.svg';
import { Typography, TypographySpan } from 'components/Typography';
import { Box } from './components/styled';
import { FC } from 'react';

const TokenomicSection: FC = () => {
  return (
    <Box mt={100}>
      <Headline src={BerriesTokenomic}>
        <Typography xsFontSize={24} mdFontSize={32} mb={-22} fontSize={48} fontWeight="bold" lineHeight={56}>
          <TypographySpan
            xsFontSize={24}
            mdFontSize={32}
            fontSize={48}
            fontWeight="bold"
            lineHeight={56}
            color="#E31D78"
          >
            $BERRIES&nbsp;
          </TypographySpan>
          Tokenomics
        </Typography>
      </Headline>

      <Typography mdFontSize={18} mt={24} fontSize={24} lineHeight={28} align="justify">
        $BERRIES are a deflationary utility token. This means they exist in a limited supply and will become more scarce
        as tokens are burned for various utilities. $BERRIES will be distributed in three pools totaling 171,550,000
        tokens. See below for detailed information on the supply: <br /> <br /> Emissions Pool (pool #1):
        <br />
        -Unlocked bears: 2 $BERRIES/day * 10,000 bears for 5 years = 36,500,000
        <br />
        -Locked bears: 3 $BERRIES/day Bonus for locking bears for 1 week of staking
        <br />
        -(Limited to first 3,000 bears) for 5 years =16,425,000
        <br /> <br />
        Liquidity Pool (pool #2): -15,000 $BERRIES/day x 5 years =27,375,000
        <br /> <br />
        Single Side Liquidity Pool (pool #3): -3,000 $BERRIES/day x 5 years = 5,475,000
        <br /> <br />
        Pooled Sums = 85,775,000 $BERRIES
        <br /> <br />
        DAO's 50% Holding -The total supply will be 2x so that the DAO has majority control over the supply.
        <br /> <br />
        Total $BERRIES: 171,550,000
      </Typography>
    </Box>
  );
};

export default TokenomicSection;
