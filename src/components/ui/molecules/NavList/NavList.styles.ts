import styled from 'styled-components';
import media from 'styled-media-query';

export const NavList = styled.ul`
  position: relative;
  width: 100%;
  height: 100%;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow-x: hidden;
  padding: 0 1.5rem;

  ${media.greaterThan('medium')`
    justify-content: center;
    margin: 0;
  `}
`;

export const HamburgerWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const Badge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 999px;
  font-size: 10px;
  line-height: 16px;
  text-align: center;
  background: #e53935; /* vermelho para chamar atenção */
  color: #fff;
  box-shadow: 0 0 0 2px rgba(0,0,0,0.4);
`;
