import * as S from './Footer.styles';


import { SocialMedia } from '../../atoms/SocialMedia/SocialMedia';
import { Container } from '../../atoms/Container/Container';
import { Logotipo } from '../../atoms/Logotipo/Logotipo';

export const Footer = () => (
  <S.Footer>
    <Container>
      <S.BoxLogo>
        <Logotipo />
        <S.Description size="normal">
          A Dlux Barbearia é um espaço de serviços masculinos que combina valores
          tradicionais com estilo moderno. Uma barbearia contemporânea com uma
          atmosfera informal e alegre.
        </S.Description>
      </S.BoxLogo>

      <S.BoxInfoSocialMedia>
        <S.Heading>Siga-nos</S.Heading>
        <S.BoxSocialMedia>
          <SocialMedia
            $marginRight
            link="https://www.instagram.com/98barbershop/"
            image="/assets/svg/instagram-icon.svg"
            alt="Link que leva para a página no instagram"
          />
          <SocialMedia
            link="tel:+5511986548715"
            image="/assets/svg/whatsapp-icon.svg"
            alt="Link que mostra número do Whatsapp"
          />
        </S.BoxSocialMedia>
      </S.BoxInfoSocialMedia>
      <S.BoxInfoInstitutional>
        <S.Heading>Institucional</S.Heading>
        <a href="#">Termos de Uso</a>
        <a href="#">Política de Privacidade</a>
      </S.BoxInfoInstitutional>
    </Container>
    <S.BoxInfoLocation>
      <S.Curve xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101 24">
        <path
          d="M50.49 0C40.096 0 8.415 23.94 0 23.94h100.486C92.566 23.94 60.886 0 50.49 0Z"
          fill="currentColor"
        />
      </S.Curve>
      <S.BoxIcon to="home">
        <S.Arrow size={25} />
      </S.BoxIcon>

      <S.Description size="small">
        Rua Caminho Encanto 334 - Guarulhos - SP
      </S.Description>
      <S.Description size="small">
        Copyright ©2021 <span>Dlux Barbearia</span>. Todos os direitos reservados
      </S.Description>
    </S.BoxInfoLocation>
  </S.Footer>
);
