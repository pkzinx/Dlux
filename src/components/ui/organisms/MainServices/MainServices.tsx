import MediaMatch from '~molecules/MediaMatch/MediaMatch';

import { Background } from '~atoms/Background/Background';
import { Heading } from '~molecules/Heading/Heading';
import { ServiceBox, ServiceBoxProps } from '~molecules/ServiceBox/ServiceBox';
import { Slider, SliderSettings } from '~molecules/Slider/Slider';

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

export const MainServices = ({ items }: MainServicesProps) => (
  <S.Wrapper>
    <Background src="/assets/img/slide-4.jpg">
      <Heading
        title="Pronto para Cortar"
        subtitle="Principais Serviços"
        lineBottom
      />

      <MediaMatch greaterThan="large">
        <S.WrapperServicesBox>
          {items.map(({ infos }, index) => (
            <ServiceBox key={`Service - ${index}`} infos={infos} />
          ))}
        </S.WrapperServicesBox>
      </MediaMatch>

      <MediaMatch lessThan="large">
        <Slider settings={settings}>
          {items.map(({ infos }, index) => (
            <ServiceBox
              key={`Service in the slider - ${index}`}
              infos={infos}
            />
          ))}
        </Slider>
      </MediaMatch>
    </Background>
  </S.Wrapper>
);
