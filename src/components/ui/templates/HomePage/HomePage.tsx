import { Element } from 'react-scroll';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import { Header } from '../../organisms/Header/Header';
import { Footer } from '../../organisms/Footer/Footer';
import { BannerSlider } from '../../organisms/BannerSlider/BannerSlider';
import { SectionAbout } from '../../organisms/SectionAbout/SectionAbout';
import { MainServices } from '../../organisms/MainServices/MainServices';
import { Review } from '../../organisms/Review/Review';
import { SectionContributors } from '../../organisms/SectionContributors/SectionContributors';

import items from '../../organisms/BannerSlider/mock';
import services from '../../organisms/MainServices/mock';
import places from '../../molecules/Map/map.mock';
import contributors from '../../organisms/SectionContributors/contributors.mock';
import reviews from '../../organisms/Review/mock';

const Map = dynamic(() => import('../../molecules/Map/Map'), { ssr: false });

const StyledElement = styled(Element)`
  /* Additional styles if needed */
`;

const HomePage = () => {
  return (
    <>
      <Header />
      <StyledElement name="home">
        <BannerSlider items={items} />
      </StyledElement>
      <StyledElement name="sobre">
        <SectionAbout />
      </StyledElement>
      <StyledElement name="servicos">
        <MainServices items={services} />
      </StyledElement>
      <StyledElement name="equipe">
        <SectionContributors contributors={contributors} />
      </StyledElement>
      <StyledElement name="avaliacao">
        <Review />
      </StyledElement>
      <StyledElement name="localizacao">
        <Map places={places} />
      </StyledElement>
      <Footer />
    </>
  );
};

export default HomePage;
