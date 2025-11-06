import { ReviewBoxProps } from '../../molecules/ReviewBox/ReviewBox';

// 10 avaliações fictícias, 2 para cada barbeiro (Rikelv, Emerso, Kaue, Kevin, Alafi)
const reviews: ReviewBoxProps[] = [
  // Rikelv
  {
    answered: 'rikelv',
    stars: 5,
    feedback: 'Corte impecável e atenção aos detalhes. Voltarei com certeza!',
    name: 'João',
    surname: 'Ferraz',
  },
  {
    answered: 'rikelv',
    stars: 5,
    feedback: 'Degradê muito bem feito, atendimento rápido e educado.',
    name: 'Mateus',
    surname: 'Almeida',
  },

  // Emerso
  {
    answered: 'emerso',
    stars: 5,
    feedback: 'Barba alinhada e acabamento perfeito. Muito profissional.',
    name: 'Carlos',
    surname: 'Oliveira',
  },
  {
    answered: 'emerso',
    stars: 4,
    feedback: 'Atendimento excelente, corte muito bom. Recomendado!',
    name: 'Ricardo',
    surname: 'Souza',
  },

  // Kaue
  {
    answered: 'kaue',
    stars: 5,
    feedback: 'Entendeu exatamente o estilo que eu queria. Top demais!',
    name: 'André',
    surname: 'Moura',
  },
  {
    answered: 'kaue',
    stars: 4,
    feedback: 'Corte caprichado e ambiente agradável. Bom custo-benefício.',
    name: 'Marcos',
    surname: 'Vieira',
  },

  // Kevin
  {
    answered: 'kevin',
    stars: 5,
    feedback: 'Melhor fade que já fiz. Atendimento show!',
    name: 'Felipe',
    surname: 'Cardoso',
  },
  {
    answered: 'kevin',
    stars: 4,
    feedback: 'Pontual e cuidadoso, resultado muito bom.',
    name: 'Gustavo',
    surname: 'Ramos',
  },

  // Alafi
  {
    answered: 'alafi',
    stars: 5,
    feedback: 'Atendimento nota 10 e corte estiloso. Recomendo!',
    name: 'Pedro',
    surname: 'Henrique',
  },
  {
    answered: 'alafi',
    stars: 4,
    feedback: 'Profissional cuidadoso, acertou no desenho da barba.',
    name: 'Leonardo',
    surname: 'Pereira',
  },
];

export default reviews;
