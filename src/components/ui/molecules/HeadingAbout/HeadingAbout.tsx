import * as S from './HeadingAbout.styles';

import { Subtitle } from '~atoms/Subtitle/Subtitle';

export type HeadingAboutProps = {
  title: string;
  subtitle: string;
  lineBottom?: boolean;
  lineLeft?: boolean;
  size?: 'normal' | 'large';
  icon?: string;
};

export const HeadingAbout = ({
  title,
  subtitle,
  lineBottom,
  lineLeft,
  icon,
  size = 'normal',
}: HeadingAboutProps) => (
  <S.Wrapper>
    {!!icon && (
      <S.IconHeading
        src={icon}
        role="img"
        aria-label="Sinalizador Giratório"
        as={undefined as any}
      />
    )}
    {!!lineLeft && <S.LineTitle aria-label="LineTitle" as={undefined as any} />}
    <S.Content>
      <S.TitleAbout>{title}</S.TitleAbout>
      <Subtitle textAlign="left" lineBottom={lineBottom} size={size}>
        {subtitle}
      </Subtitle>
    </S.Content>
  </S.Wrapper>
);
