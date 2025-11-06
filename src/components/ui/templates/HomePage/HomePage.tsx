import { Element } from 'react-scroll';
import { useEffect, useRef, useState } from 'react';
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

const MapSectionContainer = styled.div`
  /* Wrapper para garantir um elemento DOM para o IntersectionObserver */
`;

const HomePage = () => {
  const [showMap, setShowMap] = useState(false);
  const mapSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = mapSectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShowMap(true);
            observer.disconnect();
          }
        });
      },
      { root: null, threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

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
      <MapSectionContainer ref={mapSectionRef}>
        <StyledElement name="localizacao">
          {showMap ? <Map places={places} /> : null}
        </StyledElement>
      </MapSectionContainer>
      <Footer />
    </>
  );
};

export default HomePage;
