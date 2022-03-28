import Headline from './components/Headline';

import BerriesYtility from 'assets/v2/berries_utility.svg';
import { Typography, TypographySpan } from 'components/Typography';
import { Box } from './components/styled';
import { FC } from 'react';

const UtilitySection: FC = () => {
  return (
    <Box mt={129}>
      <Headline src={BerriesYtility}>
        <Typography xsFontSize={24} mdFontSize={32} mb={-22} fontSize={48} fontWeight="bold" lineHeight={56}>
          <TypographySpan
            xsFontSize={24}
            mdFontSize={32}
            fontSize={48}
            fontWeight="bold"
            lineHeight={56}
            color="#E31D78"
          >
            $NAPAS&nbsp;
          </TypographySpan>
          Utility
        </Typography>
      </Headline>

      <Typography mdFontSize={18} mt={24} fontSize={24} lineHeight={28} align="justify">
        In projects with ERC-20 tokens like $NAPAS, utilities are necessary mechanisms to consume or "burn" the tokens
        that are generated over time. This gives them additional value and helps stabilize the market price of the
        token. <br /> <br /> The Napa World team is committed to making sure there are sufficient utilities for using
        $NAPAS you accumulate from staking or by direct purchase. Our first major time-limited utility event will be
        Heaven and Hell launching November 11th. This event will allow holders to spend their $NAPAS for an exclusive
        NFT mint of an angel or witch-themed bear. We're still working out the exact mechanics of this event, but can
        confirm all NFTs minted in this collection will have additional utility.
        <br /> <br /> This is just the beginning of what we have in mind for utilities, so stay tuned and hold onto your
        $NAPAS!
      </Typography>
    </Box>
  );
};

export default UtilitySection;
