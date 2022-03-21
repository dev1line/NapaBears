import { FC } from 'react';

import { ThreeDot } from './components/ThreeDot';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import HalloweenBearSection from './HalloweenBearSection';
import HeavenAndHellSection from './HeavenAndHellSection';
import DevolopmentSection from './DevolopmentSection';
import FooterSection from './FooterSection';

const HomePage: FC = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <HalloweenBearSection />
      <ThreeDot />
      <HeavenAndHellSection />
      <ThreeDot />
      <DevolopmentSection />
      <FooterSection />
    </>
  );
};

export default HomePage;
