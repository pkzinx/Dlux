import styled, { css } from 'styled-components';
import media from 'styled-media-query';
import { customMedia } from '../../../../utils/media/customMedia';
import { Container } from '../../atoms/Container/Container';

export const Wrapper = styled.section`
  padding: 2rem 0;

  ${media.greaterThan('small')`
    padding: 3rem 0;
  `}

  ${media.greaterThan('huge')`
    padding: 4rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `}
`;

export const ContainerContributors = styled(Container)`
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  ${customMedia.greaterThan('big')`
    flex-wrap: nowrap;
    justify-content: space-between;
  `}
`;

export const BoxContributors = styled.div`
  width: 14rem;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  ${media.greaterThan('small')`
    width: 15rem;
    height: auto;    
  `}

  ${media.greaterThan('medium')`
    width: 16rem;
    height: auto;
  `}
`;

export const Image = styled.img`
  ${({ theme }) => css`
    width: 12rem;
    height: 12rem;
    object-fit: cover;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    max-width: 100%;

    ${media.greaterThan('small')`
      width: 13rem;
      height: 13rem;
    `}

    ${media.greaterThan('medium')`
      width: 14.5rem;
      height: 14.5rem;
    `}
  `}
`;

export const Name = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-family: ${theme.font.family.tertiary};
    font-weight: ${theme.font.medium};
    font-size: ${theme.font.sizes.medium};
    line-height: ${theme.spacings.small};
    margin: 3rem 0 1.4rem;

    ${media.greaterThan('small')`
      font-size: ${theme.font.sizes.big};
      line-height: ${theme.spacings.medium};
    `}
  `}
`;

export const Occupation = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.textName};
    font-family: ${theme.font.family.tertiary};
    font-weight: ${theme.font.light};
    font-size: ${theme.font.sizes.xsmall};
    line-height: ${theme.spacings.xsmall};
    font-style: italic;

    ${media.greaterThan('small')`
      font-size: ${theme.font.sizes.medium};
    `}
  `}
`;
