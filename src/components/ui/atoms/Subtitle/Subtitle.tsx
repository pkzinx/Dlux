import * as S from './Subtitle.styles';

import { TitleProps } from '../Title/Title';
export type SubtitleProps = TitleProps;

export const Subtitle = ({
  children,
  size = 'normal',
  $textAlign = 'center',
}: SubtitleProps) => (
  <S.WrapperSubtitle size={size} as={undefined as any}>
    <S.Subtitle size={size} $textAlign={$textAlign} as={undefined as any}>
      {children}
      <S.LineTitle aria-label="LineTitle" as={undefined as any} />
    </S.Subtitle>
  </S.WrapperSubtitle>
);
