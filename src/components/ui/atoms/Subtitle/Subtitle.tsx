import * as S from './Subtitle.styles';

import { TitleProps } from '../Title/Title';
import { HeadingProps } from '../../molecules/Heading/Heading';

export type SubtitleProps = TitleProps & Pick<HeadingProps, '$lineBottom'>;

export const Subtitle = ({
  children,
  size = 'normal',
  $lineBottom = false,
  $textAlign = 'center',
}: SubtitleProps) => (
  <S.WrapperSubtitle size={size} $lineBottom={$lineBottom} as={undefined as any}>
    <S.Subtitle size={size} $textAlign={$textAlign} as={undefined as any}>
      {children}
      {$lineBottom && (
        <S.LineTitle aria-label="LineTitle" as={undefined as any} />
      )}
    </S.Subtitle>
  </S.WrapperSubtitle>
);
