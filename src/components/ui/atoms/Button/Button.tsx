import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import * as S from './Button.styles';

type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = {
  $buttonStyle?: 'primary' | 'secondary';
  as?: React.ElementType;
} & ButtonTypes;

export const Button = ({
  children,
  $buttonStyle = 'primary',
  as,
  ...props
}: ButtonProps) => (
  <S.Wrapper as={as as any} $buttonStyle={$buttonStyle} {...props}>
    {children}
  </S.Wrapper>
);
