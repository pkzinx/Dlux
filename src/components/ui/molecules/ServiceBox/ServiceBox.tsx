import { HairIcon } from '../../atoms/HairIcon/HairIcon';

import * as S from './ServiceBox.styles';

type InfosProps = {
  title: string;
  price: string;
  description: string;
};

export type ServiceBoxProps = {
  infos: InfosProps[];
};

const detectIconType = (items: InfosProps[]) => {
  const hasHair = items.some(({ title }) => /cabelo|corte/i.test(title));
  const hasBeard = items.some(({ title }) => /barba/i.test(title));
  if (hasHair && hasBeard) return 'full' as const;
  if (hasHair) return 'hair' as const;
  if (hasBeard) return 'baber' as const;
  return 'hair' as const;
};

export const ServiceBox = ({ infos }: ServiceBoxProps) => (
  <S.Wrapper>
    <HairIcon type={detectIconType(infos)} />

    <S.ContentInfos>
      {infos.map(({ title, price, description }) => (
        <S.Content key={`Service - ${title}`}>
          <S.InfoPrimary>
            <S.Title>{title}</S.Title>
            <S.Price>{price}</S.Price>
          </S.InfoPrimary>

          <S.Description>{description}</S.Description>
          <S.ScheduleButton type="button">Agendar</S.ScheduleButton>
        </S.Content>
      ))}
    </S.ContentInfos>
  </S.Wrapper>
);
