import * as S from './NavList.styles';

import { useEffect, useState } from 'react';
import { Sling as Hamburger } from 'hamburger-react';

import MediaMatch from '../MediaMatch/MediaMatch';
import { Logotipo } from '../../atoms/Logotipo/Logotipo';
import { MenuMobile } from '../MenuMobile/MenuMobile';
import { NavLinks } from '../NavLinks/NavLinks';
import { getActiveAppointments, onStorageChange, clearExpired } from '@/utils/appointmentsStorage';
import * as SStyles from './NavList.styles';

export const NavList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [apptCount, setApptCount] = useState(0);

  useEffect(() => {
    clearExpired();
    setApptCount(getActiveAppointments().length);
    const off = onStorageChange(items => setApptCount(items.length));
    const interval = setInterval(() => {
      clearExpired();
      setApptCount(getActiveAppointments().length);
    }, 60 * 1000);
    return () => {
      off();
      clearInterval(interval);
    };
  }, []);

  return (
    <S.NavList>
      <NavLinks
        paddingXLine={10}
        names={[
          { nav: 'Home', link: 'home' },
          { nav: 'Sobre', link: 'sobre' },
          { nav: 'Serviços', link: 'servicos' },
          { nav: 'Equipe', link: 'equipe' },
          { nav: 'Avaliações', link: 'avaliacao' },
          { nav: 'Localização', link: 'localizacao', offset: -220 },
        ]}
      >
        <Logotipo $hideOnMobile />
      </NavLinks>

      <MediaMatch $lessThan="medium">
        <SStyles.HamburgerWrapper>
          <Hamburger
            color="#FFF"
            duration={0.4}
            size={30}
            distance="md"
            rounded
            direction="right"
            easing="ease-out"
            toggled={isOpen}
            toggle={setIsOpen}
            label="Abrir e Fechar"
          />
          {apptCount > 0 && <SStyles.Badge aria-label="Notificação de agendamento">1</SStyles.Badge>}
        </SStyles.HamburgerWrapper>

        <MenuMobile $isOpen={isOpen} setIsOpen={setIsOpen} />
      </MediaMatch>
    </S.NavList>
  );
};
