import * as S from './Subtitle.styles';

import { TitleProps } from '../Title/Title';
export type SubtitleProps = TitleProps & {
  lineBottom?: boolean;
  $lineBottom?: boolean;
};

export const Subtitle = ({
  children,
  size = 'normal',
  $textAlign = 'center',
  lineBottom,
  $lineBottom,
}: SubtitleProps) => {
  const showLine = (lineBottom ?? $lineBottom) ?? false;

  return (
    <S.WrapperSubtitle size={size} as={undefined as any}>
      <S.Subtitle size={size} $textAlign={$textAlign} as={undefined as any}>
        {children}
        {showLine && (
          <S.LineTitle aria-label="LineTitle" as={undefined as any} />
        )}
      </S.Subtitle>
    </S.WrapperSubtitle>
  );
};
