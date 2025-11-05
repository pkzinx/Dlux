/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, ReactNode, useContext } from 'react';

import reviewsData from '../components/ui/organisms/Review/mock';
import { ReviewBoxProps } from '../components/ui/molecules/ReviewBox/ReviewBox';

export type ReviewContextProps = {
  reviews: ReviewBoxProps[];
  setReviews: (reviews: ReviewBoxProps[]) => void;
};

export type ReviewContextProviderProps = {
  children: ReactNode;
};

// Criando o contexto com um valor padrão
const defaultContextValue: ReviewContextProps = {
  reviews: reviewsData,
  setReviews: () => {}
};

// Criando o contexto com o valor padrão
export const ReviewContext = createContext<ReviewContextProps>(defaultContextValue);

// Hook personalizado para usar o contexto
export const useReviewContext = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviewContext deve ser usado dentro de um ReviewContextProvider');
  }
  return context;
};

// Componente Provider
export const ReviewContextProvider = ({ children }: ReviewContextProviderProps) => {
  const [reviews, setReviews] = useState<ReviewBoxProps[]>(reviewsData);

  const value = {
    reviews,
    setReviews
  };

  return (
    <ReviewContext.Provider value={value}>
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewContextProvider;
