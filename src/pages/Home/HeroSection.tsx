import { BearImage, HeroContainer, BearImageWrapper } from './components/HeroStyled';
import Bear1 from 'assets/v2/bear_1.png';
import Bear2 from 'assets/v2/bear_2.png';
import Bear3 from 'assets/v2/bear_3.png';
import Bear4 from 'assets/v2/bear_4.png';
// import MetaBear from 'assets/v2/metabear_text.svg';
import {} from './components/DevolopmentStyled';

const HeroSection = () => {
  return (
    <HeroContainer>
      {/* <MetaBearText src={MetaBear} /> */}

      <BearImageWrapper>
        <div>
          <BearImage src={Bear1} bottom={-5} alt="bear_1" />
          <BearImage src={Bear2} bottom={-4} xsHidden alt="bear_2" />
        </div>
        <div>
          <BearImage src={Bear3} bottom={-6} alt="bear_3" />
          <BearImage src={Bear4} bottom={-5} xsHidden alt="bear_4" />
        </div>
      </BearImageWrapper>
    </HeroContainer>
  );
};

export default HeroSection;
