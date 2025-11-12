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
            link="https://www.instagram.com/dlux_barbearia_/"
            image="/assets/svg/instagram-icon.svg"
            alt="Link que leva para a página no instagram"
          />
          <SocialMedia
            link="https://wa.me/5538991302319"
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
        Rua Montes Claros, nº 346 - Varzelândia - MG - CEP 39450-000
      </S.Description>
      <S.Description size="small">
        Copyright ©2025 <span>Dlux Barbearia</span>. Todos os direitos reservados
      </S.Description>
      <S.Description size="small">
        Desenvolvido por{' '}
        <a
          href="https://www.instagram.com/kaio.pietroxx"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram de Kaio Pietro"
        >
          <S.DevIcon />
          Kaio Pietro (@kaio.pietroxx)
        </a>
      </S.Description>
    </S.BoxInfoLocation>
  </S.Footer>
);
