import styled, { css } from 'styled-components';
import media from 'styled-media-query';

type ServicesModalStylesProps = { $isOpen: boolean };

export const Background = styled.div<ServicesModalStylesProps>`
  ${({ theme, $isOpen }) => css`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: ${$isOpen ? 0.9 : 0};
    visibility: ${$isOpen ? 'visible' : 'hidden'};
    pointer-events: ${$isOpen ? 'all' : 'none'};
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.35s ease-in-out;
    z-index: ${theme.layers.overlay};
  `}
`;

export const Modal = styled.div<ServicesModalStylesProps>`
  ${({ theme, $isOpen }) => css`
    position: fixed;
    top: 50%;
    left: 50%;
    width: 92%;
    max-width: 74rem;
    max-height: 70vh;
    background-color: ${theme.colors.gray};
    display: flex;
    flex-direction: column;
    border-radius: 2rem;
    opacity: ${$isOpen ? 1 : 0};
    visibility: ${$isOpen ? 'visible' : 'hidden'};
    pointer-events: ${$isOpen ? 'all' : 'none'};
    transition: all 0.35s ease-in-out;
    transform: translate(-50%, -50%);
    z-index: ${theme.layers.modal};
    padding: 2.4rem;

    ${media.greaterThan('medium')`
      padding: 3.2rem;
    `}
  `}
`;

export const Header = styled.header`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${theme.spacings.small};
    color: ${theme.colors.white};
  `}
`;

export const Title = styled.h2`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.medium};
    font-weight: 600;

    ${media.greaterThan('medium')`
      font-size: ${theme.font.sizes.large};
    `}
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${theme.spacings.xsmall};
    overflow: auto;
    padding-right: 0.4rem;

    ${media.greaterThan('medium')`
      grid-template-columns: 1fr 1fr;
      gap: ${theme.spacings.small};
    `}
  `}
`;

export const Card = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacings.xxsmall};
    border: 0.2rem solid ${theme.colors.white};
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(6px);
    border-radius: 1rem;
    padding: ${theme.spacings.xsmall};
    color: ${theme.colors.white};
  `}
`;

export const CardHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `}
`;

export const ServiceName = styled.h3`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    font-weight: 500;
  `}
`;

export const Price = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    font-weight: 600;
  `}
`;

export const Meta = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xsmall};
    color: ${theme.colors.white};
    opacity: 0.85;
  `}
`;

export const Footer = styled.footer`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-end;
    margin-top: ${theme.spacings.small};
  `}
`;

export const CardActions = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-end;
    margin-top: ${theme.spacings.xxsmall};
  `}
`;