import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const Wrapper = styled.main`
  ${({ theme }) => css`
    margin: calc(${theme.spacings.section} / 2) 0;

    /* Mobile: espaçamento lateral e entre slides para melhor separação */
    ${media.lessThan('medium')`
      .slick-list {
        padding: 0 ${theme.spacings.xsmall}; /* 16px laterais */
      }
      .slick-slide > div {
        margin: 0 ${theme.spacings.xxsmall}; /* 8px em cada lado = 16px entre cards */
      }
    `}

    .slick-slide {
      transition: all linear 0.3s;

      & > div {
        display: flex;
        flex: 1 0 auto;
        height: 100%;
      }
    }

    /* Só aplicar o efeito de escala em telas maiores */
    ${media.greaterThan('medium')`
      .slick-slide:not(.slick-center) {
        transform: scale(0.9);
      }
    `}

    /* Setas de navegação visíveis e acessíveis no mobile */
    ${media.lessThan('medium')`
      .slick-prev,
      .slick-next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 3.2rem;
        height: 3.2rem;
        background: ${theme.colors.primary};
        border-radius: ${theme.border.radius.regular};
        box-shadow: 0 0 1rem rgba(26, 255, 234, 0.3);
        z-index: ${theme.layers.overlay};
      }

      .slick-prev { left: ${theme.spacings.xsmall}; }
      .slick-next { right: ${theme.spacings.xsmall}; }

      .slick-prev:before,
      .slick-next:before {
        color: ${theme.colors.black};
        font-size: 2rem;
        opacity: 1;
      }
    `}

    /* Mobile: garantir altura automática dos slides e evitar colapso */
    ${media.lessThan('medium')`
      .slick-slide > div {
        height: auto;
      }
    `}

  }

    .slick-dots {
      list-style: none;
      display: flex !important;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: ${theme.spacings.small};
      margin-top: 4rem;

      li {
        position: relative;
        background: transparent;
        width: 1rem;
        height: 1rem;
        border: 0.1rem solid ${theme.colors.primary};
        border-radius: 0.1rem;
        transform: rotate(45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all linear 0.3s;

        &:hover,
        &:focus {
          background: ${theme.colors.primary};
        }

        &.slick-active {
          background: ${theme.colors.primary};

          &::after {
            content: '';
            position: absolute;
            background: transparent;
            width: calc(1rem * 1.4);
            height: calc(1rem * 1.4);
            border: 0.1rem solid ${theme.colors.primary};
            border-radius: 0.1rem;
            box-shadow: 0 0 0.5rem ${theme.colors.primary};
          }
        }
      }

      button {
        opacity: 0;
        width: 1rem;
        height: 1rem;
        cursor: pointer;
      }
    }

    ${media.greaterThan('medium')`
      margin-bottom: ${theme.spacings.section};
    `}
  `}
`;

export const WrapperSlider = styled.div`
  ${({ theme }) => css`
    max-width: ${theme.grid.container};

    ${media.greaterThan('large')`
      margin-left: auto;
      margin-right: auto;
    `}
  `}
`;
