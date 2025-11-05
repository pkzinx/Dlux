import { ServiceBoxProps } from '../../molecules/ServiceBox/ServiceBox';

const services: ServiceBoxProps[] = [
  {
    infos: [
      {
        title: 'Corte de Cabelo',
        price: 'R$ 20,00',
        description:
          'Realizado em qualquer tecnica de corte de cabelo, incluindo tesouras.',
      },
    ],
  },
  {
    infos: [
      {
        title: 'Barba',
        price: 'R$ 20,00',
        description:
          'Aparar o volume ou cortá-la, manutenção do desenho, da hidratação e esfoliação.',
      },
    ],
  },
  {
    infos: [
      {
        title: 'Corte e Barba',
        price: 'R$ 20,00',
        description:
          'Visual completo: corte preciso e barba tratada com hidratação e acabamento de respeito.',
      },
    ],
  },
];

export default services;
