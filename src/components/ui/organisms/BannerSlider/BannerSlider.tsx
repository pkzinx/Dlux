import { Slider, SliderSettings } from '../../molecules/Slider/Slider';
import { Banner, BannerProps } from '../Banner/Banner';

import * as S from './BannerSlider.styles';

export type BannerSliderProps = {
  items: BannerProps[];
};

const settings: SliderSettings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 1000,
  autoplay: true,
  autoplaySpeed: 6000,
};

export const BannerSlider = ({ items }: BannerSliderProps) => (
  <S.Wrapper>
    <Slider settings={settings}>
      {items.map(item => (
        <Banner key={item.title} {...item}></Banner>
      ))}
    </Slider>
  </S.Wrapper>
);
