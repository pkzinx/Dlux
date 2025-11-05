import * as S from './Logotipo.styles';

export type LogotipoProps = {
  color?: 'white' | 'black';
  size?: 'small' | 'normal' | 'large';
  $hideOnMobile?: boolean;
};

export const Logotipo = ({
  color = 'white',
  size = 'normal',
  $hideOnMobile = false,
}: LogotipoProps) => (
  <S.Wrapper
    color={color}
    size={size}
    $hideOnMobile={$hideOnMobile}
    as={undefined as any}
  >
    <img
      src="/assets/img/icon-logo.png"
      alt="Dlux Barbearia"
      aria-label="Dlux Barbearia"
      loading="lazy"
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
  </S.Wrapper>
);
