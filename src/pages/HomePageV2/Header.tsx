import styled from 'styled-components';
// import titleImg from 'assets/images/bear/bearstitle.png';
// import VampBear from 'assets/images/bear/VampBear.png';
// import JasonBear from 'assets/images/bear/JasonBear.png';
// import Mummybear from 'assets/images/bear/Mummybear.png';
// import FrightNight from 'assets/images/bear/FRIGHT-NIGHT-IS-HERE_.png';
// import Twitter from 'assets/images/bear/Twitter.png';
// import Discord from 'assets/images/bear/discord-vector-logo-11573850119dtn7ne3oho.png';
// import OpenSea from 'assets/images/bear/6mDtyT6V_400x400.png';
import ThisYear from 'assets/images/bear/This-year-the-halloween-bears-have-come-to-take-over.-everythin.png';
import Zombieknife from 'assets/images/bear/Zombieknife.png';
// import StakeYourBear from 'assets/images/bear/STAKE-YOUR-BEAR-TO-EARN-SWEETZ.png';
import GDFG from 'assets/images/bear/gdfg.png';
// import TenMint from 'assets/images/bear/10-OF-MINT-FUNDS-WILL--BE-USED-TO-FUND-THE-DAO.png';
// import StakeBearZ from 'assets/images/bear/STAKE-YOUR-BEAR-TO-EARN-SWEETZ1.png';
// import DAOVault from 'assets/images/bear/DAO-VAULT-IS-FRACTIONALIZED--EMISSIONS-ARE-PAID-OUT-VIA-SWEET.png';
// import Scroll from './Scroll';
import { Container } from 'components/Container';

import { useRef } from 'react';

interface HeaderProps {
  executeScroll: () => void;
}

export default function HeaderComponent({ executeScroll }: HeaderProps) {
  const myRefCenter = useRef(null);
  // const executeScrollCenter = () => (myRefCenter as any).current.scrollIntoView();
  return (
    <Header>
      {/* <ImageContainer>
        <TitleImg src={titleImg} width="742" alt="a" className="image-12" />
      </ImageContainer> */}

      <Container>
        {/* <BearContainer>
          <img src={VampBear} loading="lazy" width="313" alt="b" className="image-4" />
          <img src={JasonBear} loading="lazy" width="260" alt="c" className="image-3" />
          <img src={Mummybear} loading="lazy" width="254" alt="d" className="image-2" />
        </BearContainer>
        <FrightNightImg src={FrightNight} loading="lazy" width="853" alt="e" className="image-5" />
        <div className="section-7 wf-section">
          <BuyButton href="https://opensea.io/collection/halloweenbears" target="blank" className="button w-button">
            <strong className="bold-text-2">SOLD OUT! BUY ON OPENSEA</strong>
          </BuyButton>
        </div>
        <p className="paragraph">
          <span className="text-span">
            <strong className="bold-text">10 MAX PER TRANSACTION</strong>
          </span>
        </p>
        <SocialContainer>
          <img src={Twitter} loading="lazy" width="80" alt="" className="image-18" />
          <DiscordImg src={Discord} loading="lazy" width="71" alt="" className="image-19" />
          <img src={OpenSea} loading="lazy" width="69" alt="" />
        </SocialContainer>
        <Scroll executeScroll={executeScrollCenter} /> */}

        <CenterContainer ref={myRefCenter}>
          <ThisYearImg src={ThisYear} loading="lazy" sizes="100vw" alt="" className="image-13" />
          <ZombieKnifeImg src={Zombieknife} loading="lazy" alt="" className="image-14" />
          <StakeBearText> STAKE YOUR BEAR TO EARN $BERRIES</StakeBearText>
          {/* <StakeYourBearImg src={StakeYourBear} loading="lazy" alt="" className="image-16" /> */}
          <GDFGImg src={GDFG} loading="lazy" sizes="100vw" alt="" className="image-15" />
        </CenterContainer>
        {/* <Scroll executeScroll={executeScroll} /> */}
        <div className="div-block">
          <Divider />
        </div>
        <StakeContainer>
          {/* <TenMintImg
            src={TenMint}
            loading="lazy"
            width="314"
            id="w-node-_5a799db6-514b-5e84-e5ee-4e4348140ea6-afb016c7"
            alt=""
            className="image-17"
          /> */}
          <StakeBearTextSmall> 10% OF MINT FUNDS WILL BE USED TO FUND THE DAO</StakeBearTextSmall>
          <StakeBearTextSmall> STAKE YOUR BEAR TO EARN $BERRIES</StakeBearTextSmall>
          <StakeBearTextSmall> DAO VAULT IS FRACTIONALIZED & EMISSIONS ARE PAID OUT VIA $BERRIES</StakeBearTextSmall>
        
          {/* <StakeBearZImg src={StakeBearZ} loading="lazy" width="337" alt="" /> */}
          {/* <DAOVaultImg src={DAOVault} loading="lazy" width="335" alt="" /> */}
        </StakeContainer>
      </Container>
    </Header>
  );
}

// const BuyButton = styled.a`
//   position: static;
//   display: inline-block;
//   margin-top: 0px;
//   margin-right: auto;
//   margin-left: 350px;
//   -webkit-box-pack: center;
//   -webkit-justify-content: center;
//   -ms-flex-pack: center;
//   justify-content: center;
//   -webkit-box-align: start;
//   -webkit-align-items: flex-start;
//   -ms-flex-align: start;
//   align-items: flex-start;
//   border-radius: 20px;
//   background-color: #f60;
//   box-shadow: 0 2px 10px 0 #fff;
//   font-family: Exo, sans-serif;
//   font-size: 35px;
//   line-height: 50px;
//   text-align: center;
//   padding: 9px 15px;
//   color: white;
//   border: 0;
//   text-decoration: none;
//   cursor: pointer;
//   margin: 56px auto 5px;
// `;

// const ImageContainer = styled.div`
//   text-align: center;
// `;

// const BearContainer = styled.div`
//   display: flex;
//   margin-top: 36px;
//   margin-right: auto;
//   margin-left: auto;
//   justify-content: space-around;
// `;

const Header = styled.header`
  padding: 18px 32px 24px;
  z-index: 5;
    background-color: #5a189a;

`;

// const TitleImg = styled.img`
//   margin-top: 10px;
//   margin-right: auto;
//   margin-left: auto;
//   width: 742px;
// `;

// const FrightNightImg = styled.img`
//   margin-top: -22px;
// `;

// const SocialContainer = styled.div`
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   width: 300px;
//   margin-top: 20px;
//   margin: 30px auto 0;
// `;

// const DiscordImg = styled.img`
//   margin-top: 10px;
// `;

const ThisYearImg = styled.img`
  max-width: 100%;
  margin-top: 109px;
  @media (max-width: 992px) {
    margin-top: 0px;
  }
`;

const ZombieKnifeImg = styled.img`
  margin-top: -25px;
  max-width: 100%;
  @media (max-width: 992px) {
    margin-top: -15px;
    max-width: calc(100vw - 100px);
  }
`;

// const StakeYourBearImg = styled.img`
//   margin-top: -45px;
//   max-width: 100%;
// `;

const GDFGImg = styled.img`
  max-width: 100%;
  max-width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  bottom: 10%;
`;

// const TenMintImg = styled.img`
//   position: relative;
//   width: 100%;
// `;

// const StakeBearZImg = styled.img`
//   position: relative;
//   width: 100%;
// `;

// const DAOVaultImg = styled.img`
//   position: relative;
//   width: 100%;
// `;

const Divider = styled.div`
  height: 10px;
  background-color: #fff;
  margin-top: 125px;
  margin-bottom: 125px;
  @media (max-width: 992px) {
    margin-top: 50px;
    margin-bottom: 50px;
  }
`;

const StakeContainer = styled.div`
  display: grid;
  margin-bottom: 100px;
  grid-auto-columns: 1fr;
  grid-column-gap: 16px;
  grid-row-gap: 32px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;

  border: 10px none #000;
  border-radius: 6px;
  @media (max-width: 992px) {
    grid-template-columns: 1fr 1fr;
    justify-items: center;
  }
  @media (max-width: 710px) {
    grid-template-columns: 1fr;
  }
`;

const CenterContainer = styled.div`
  position: relative;
`;

const StakeBearText = styled.p`
  font-size:80px;
  margin-top: -45px;
  @media (max-width: 768px) {
    font-size:50px;
  }
`

const StakeBearTextSmall = styled.p`
font-size: 50px;
text-align:left;
@media (max-width: 768px) {
  font-size:40px;
}
`