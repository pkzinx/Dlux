import MediaMatch from '../../molecules/MediaMatch/MediaMatch';
import { useState } from 'react';

import { Background } from '../../atoms/Background/Background';
import { Heading } from '../../molecules/Heading/Heading';
import {
  ServiceBox,
  ServiceBoxProps,
} from '../../molecules/ServiceBox/ServiceBox';
import { Slider, SliderSettings } from '../../molecules/Slider/Slider';
import { ScheduleModal } from '../../molecules/ScheduleModal/ScheduleModal';
import contributors from '../SectionContributors/contributors.mock';

import * as S from './MainServices.styles';

export type MainServicesProps = {
  items: ServiceBoxProps[];
};

const settings: SliderSettings = {
  slidesToShow: 2,
  arrows: false,
  infinite: false,
  speed: 500,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1.05,
        arrows: false,
        infinite: false,
        speed: 500,
      },
    },
  ],
};

export const MainServices = ({ items }: MainServicesProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>();

  // Exibir os 5 barbeiros da seção de equipe com nomes e fotos
  const barbers = contributors.map((c) => ({ name: c.name, src: c.src }));

  const openSchedule = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsOpen(true);
  };

  return (
    <S.Wrapper>
      <Background src="/assets/img/slide-4.jpg">
        <Heading
          title="Pronto para Cortar"
          subtitle="Principais Serviços"
          lineBottom
        />

        <MediaMatch $greaterThan="large">
          <S.WrapperServicesBox>
            {items.map(({ infos }, index) => (
              <ServiceBox key={`Service - ${index}`} infos={infos} onSchedule={openSchedule} />
            ))}
          </S.WrapperServicesBox>
        </MediaMatch>

        <MediaMatch $lessThan="large">
          <Slider settings={settings}>
            {items.map(({ infos }, index) => (
              <ServiceBox
                key={`Service in the slider - ${index}`}
                infos={infos}
                onSchedule={openSchedule}
              />
            ))}
          </Slider>
          <S.SwipeHint>
            Rolar para ver os outros serviços
            <S.SwipeVisual aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                <polyline points="0,0 6,6 0,12" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
              <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                <polyline points="0,0 6,6 0,12" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </S.SwipeVisual>
          </S.SwipeHint>
        </MediaMatch>

        <ScheduleModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          barbers={barbers}
          serviceTitle={selectedService}
        />
      </Background>
    </S.Wrapper>
  );
};
