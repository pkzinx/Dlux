import * as S from './ButtonScroll.styles';

export type ButtonScrollProps = {
  buttonStyle?: 'primary' | 'secondary';
  children: React.ReactNode;
  marginLeft?: 'small' | 'medium' | 'large' | 'big';
  to: string;
};

export const ButtonScroll = ({
  children,
  to,
  buttonStyle = 'primary',
  marginLeft,
}: ButtonScrollProps) => (
  <S.Wrapper buttonStyle={buttonStyle} marginLeft={marginLeft}>
    <S.StyledLink
      to={to}
      spy={true}
      hashSpy={true}
      smooth={true}
      duration={600}
      autoFocus={true}
      data-testid="button-scroll"
    >
      {children}
    </S.StyledLink>
  </S.Wrapper>
);
