import styled, { css } from 'styled-components';
import media from 'styled-media-query';

type ModalProps = { $isOpen: boolean };

export const Background = styled.div<ModalProps>`
  ${({ theme, $isOpen }) => css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    opacity: ${$isOpen ? 0.9 : 0};
    visibility: ${$isOpen ? 'visible' : 'hidden'};
    pointer-events: ${$isOpen ? 'all' : 'none'};
    transition: opacity 0.3s ease, visibility 0.3s ease;
    z-index: 1000;
  `}
`;

export const Modal = styled.div<ModalProps>`
  ${({ theme, $isOpen }) => css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${theme.colors.darkGray};
    border: 0.2rem solid ${theme.colors.white};
    border-radius: 1rem;
    padding: ${theme.spacings.medium};
    width: 95%;
    max-width: 720px;
    opacity: ${$isOpen ? 1 : 0};
    visibility: ${$isOpen ? 'visible' : 'hidden'};
    pointer-events: ${$isOpen ? 'all' : 'none'};
    transition: opacity 0.3s ease, visibility 0.3s ease;
    z-index: 1001;

    ${media.greaterThan('medium')`
      padding: ${theme.spacings.large};
    `}
  `}
`;

export const Title = styled.h3`
  ${({ theme }) => css`
    font-family: ${theme.font.family.tertiary};
    font-weight: ${theme.font.medium};
    font-size: ${theme.font.sizes.xmedium};
    color: ${theme.colors.white};
    margin-bottom: ${theme.spacings.small};
    text-align: center;

    ${media.greaterThan('medium')`
      font-size: ${theme.font.sizes.xxlarge};
    `}
  `}
`;

export const Form = styled.form`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${theme.spacings.small};

    ${media.greaterThan('medium')`
      grid-template-columns: 1fr 1fr;
    `}
  `}
`;

export const FullRow = styled.div`
  grid-column: 1 / -1;
`;

export const FieldInline = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${theme.spacings.small};
  `}
`;

export const BarberGrid = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacings.small};

    ${media.greaterThan('medium')`
      grid-template-columns: repeat(3, 1fr);
    `}
  `}
`;

export const BarberCard = styled.label<{ $selected?: boolean }>`
  ${({ theme, $selected }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacings.xsmall};
    padding: ${theme.spacings.xsmall};
    border: 0.2rem solid ${$selected ? theme.colors.primary : theme.colors.gray};
    border-radius: 0.8rem;
    cursor: pointer;
    transition: border-color 0.2s ease;
    color: ${theme.colors.white};
  `}
`;

export const BarberAvatar = styled.img`
  ${({ theme }) => css`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    border: 0.2rem solid ${theme.colors.white};
  `}
`;

export const Actions = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-end;
    gap: ${theme.spacings.small};
    margin-top: ${theme.spacings.medium};
    grid-column: 1 / -1;
  `}
`;