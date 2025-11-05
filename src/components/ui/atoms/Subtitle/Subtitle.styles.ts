import styled, { css } from 'styled-components';
import media from 'styled-media-query';
import { extraMedia } from '../../../../utils/media/customMedia';
import { SubtitleProps } from './Subtitle';

export const WrapperSubtitle = styled.div<Pick<SubtitleProps, 'size'>>`
  ${({ theme, size }) => css`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: ${theme.spacings.small};

    ${extraMedia.between('medium', 'big')`
      margin-bottom: ${theme.spacings.large};
    `}

    ${extraMedia.greaterThan('big')`
      margin-bottom: ${
        size === 'normal' ? theme.spacings.medium : theme.spacings.large
      };
    `}
  `}
`;

export const Subtitle = styled.h2<Pick<SubtitleProps, 'size' | '$textAlign'>>`
  ${({ theme, size, $textAlign }) => css`
    width: fit-content;
    display: flex;
    flex-direction: column;
    color: ${theme.colors.white};
    font-family: ${theme.font.family.secundary};
    font-weight: ${theme.font.light};
    font-size: ${theme.font.sizes.xxbig};
    text-align: center;

    ${media.greaterThan('medium')`
      font-size: ${
        size === 'normal' ? theme.font.sizes.xxlarge : theme.font.sizes.extra
      };
      text-align: ${$textAlign};
    `}
  `}
`;

export const LineTitle = styled.span`
  display: none;
  ${extraMedia.lessThan('big')`
    display: block;
  `}
  width: calc(100% + 2rem);
  height: 0.2rem;
  border-radius: 0.2rem;
  background: rgba(255, 255, 255, 0.3);
  margin-top: 0.5rem;
  margin-left: calc(-2rem / 2);
`;
