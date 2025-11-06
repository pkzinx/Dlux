import { Background } from '../../atoms/Background/Background';
import { Heading } from '../../molecules/Heading/Heading';
import { Slider, SliderSettings } from '../../molecules/Slider/Slider';
import { ReviewBox, ReviewBoxProps } from '../../molecules/ReviewBox/ReviewBox';
import reviewsData from './mock';

import * as S from './Review.styles';

export type ReviewProps = {
  reviews?: ReviewBoxProps[];
};

const Arrow = ({ className, onClick, dir }: { className?: string; onClick?: () => void; dir: 'prev' | 'next' }) => (
  <button className={className} onClick={onClick} aria-label={dir === 'prev' ? 'Voltar avaliação' : 'Próxima avaliação'}>
    <span style={{ display: 'block', width: '100%', textAlign: 'center' }}>{dir === 'prev' ? '<' : '>'}</span>
  </button>
);

const settings: SliderSettings = {
  slidesToShow: 3,
  arrows: false,
  dots: true,
  infinite: true,
  speed: 1000,
  centerMode: true,
  cssEase: 'ease-out',
  centerPadding: '0',
  lazyLoad: 'ondemand',
  waitForAnimate: false,
  swipe: true,
  swipeToSlide: true,
  touchMove: true,
  touchThreshold: 10,
  prevArrow: <Arrow dir="prev" />,
  nextArrow: <Arrow dir="next" />,
  responsive: [
    {
      breakpoint: 940,
      settings: {
        slidesToShow: 2,
        arrows: false,
        dots: true,
        infinite: true,
        speed: 1000,
        centerMode: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        arrows: true,
        dots: false,
        infinite: true,
        speed: 600,
        centerMode: false,
        slidesToScroll: 1,
        adaptiveHeight: false,
        centerPadding: '0px',
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 1,
        arrows: true,
        dots: false,
        infinite: true,
        speed: 600,
        centerMode: false,
        slidesToScroll: 1,
        adaptiveHeight: false,
        centerPadding: '0px',
      },
    },
    {
      breakpoint: 340,
      settings: {
        slidesToShow: 1,
        arrows: true,
        dots: false,
        infinite: true,
        speed: 600,
        centerMode: false,
        slidesToScroll: 1,
        adaptiveHeight: false,
        centerPadding: '0px',
      },
    },
  ],
};

export const Review = ({ reviews }: ReviewProps) => {
  // Usar os reviews passados por props ou os dados mockados como fallback
  const reviewsToShow = reviews || reviewsData;

  return (
    <S.Wrapper>
      <Background src="/assets/img/slide-4.jpg">
        <Heading
          title="O Que Dizem de Nós"
          subtitle="Nossas Avaliações"
          lineBottom
        />

        <S.WrapperSlider>
          <Slider settings={settings}>
            {reviewsToShow?.map((item, index) => (
              <ReviewBox
                key={`${item.name} - ${item.answered} - ${index}`}
                {...item}
              />
            ))}
          </Slider>
        </S.WrapperSlider>
      </Background>
    </S.Wrapper>
  );
};
