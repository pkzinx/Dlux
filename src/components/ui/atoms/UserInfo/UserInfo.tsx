import * as S from './UserInfo.styles';

export type UserInfoProps = {
  name: string;
  surname: string;
};

export const UserInfo = ({ name, surname }: UserInfoProps) => (
  <S.Wrapper as={undefined as any}>
    <S.Name
      aria-label="User name"
      as={undefined as any}
    >{`-${name} ${surname}`}</S.Name>
  </S.Wrapper>
);
