import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const Wrapper = styled.main`
  ${({ theme }) => css`
    margin-bottom: calc(${theme.spacings.section} / 2);

    .slick-dots {
      position: absolute;
      list-style: none;
      display: flex !important;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: ${theme.spacings.small};
      bottom: calc(100vh * 0.1);

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

    ${media.greaterThan('large')`
      .slick-dots {
        position: absolute;
        left: 0;
        right: 0;
        bottom: calc(100vh * 0.08);
        top: unset;
        flex-direction: row;
        width: 100%;
        height: auto;
        justify-content: center;
        align-items: center;
      }
    `}
  `}
`;
