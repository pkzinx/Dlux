import styled, { css, keyframes } from 'styled-components';
import media from 'styled-media-query';

import { Container } from '../../atoms/Container/Container';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    margin: calc(${theme.spacings.section} / 2) 0;

    .slick-track,
    .slick-list {
      display: flex;
    }

    .slick-slide > div {
      margin: 0 ${theme.spacings.xxsmall};
      flex: 1 0 auto;
      height: 100%;
    }

    ${media.greaterThan('medium')`
      margin: ${theme.spacings.section} 0;
    `}
  `}
`;

export const WrapperServicesBox = styled(Container)`
  display: flex;
  gap: 3rem;
`;

export const SwipeHint = styled.div`
  ${({ theme }) => css`
    display: none;
    ${media.lessThan('large')`
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.xsmall};
      margin-top: ${theme.spacings.xsmall};
      text-align: center;
      flex-direction: column;
      gap: ${theme.spacings.xxsmall};
    `}
  `}
`;

const swipe = keyframes`
  0% { transform: translateX(0); opacity: 0.6; }
  50% { transform: translateX(6px); opacity: 1; }
  100% { transform: translateX(0); opacity: 0.6; }
`;

export const SwipeVisual = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacings.xxsmall};
    color: ${theme.colors.white};

    svg {
      animation: ${swipe} 1.4s ease-in-out infinite;
    }

    svg:nth-child(1) {
      transform-origin: center;
      animation-delay: 0s;
    }

    svg:nth-child(2) {
      transform-origin: center;
      animation-delay: 0.2s;
    }
  `}
`;
