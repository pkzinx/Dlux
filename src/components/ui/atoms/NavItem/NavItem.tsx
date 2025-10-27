import * as S from './NavItem.styles';

type NavItemProps = {
  children: React.ReactNode;
};

export const NavItem = ({ children }: NavItemProps) => {
  return (
    <S.NavItem type="button" as={undefined as any}>
      {children}
    </S.NavItem>
  );
};
