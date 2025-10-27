import * as S from './Background.styles';

export type BackgroundProps = {
  src: string;
  children: React.ReactNode;
};

export const Background = ({ src, children }: BackgroundProps) => (
  <S.Wrapper src={src} aria-label="Background">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 19"
      style={{
        position: 'absolute',
        width: '5rem',
        color: 'var(--color-dark-gray)',
        top: '-0.1rem',
        left: '50%',
        transform: 'translate(-50%, 0)',
      }}
    >
      <path
        d="M25.5 18.85C25.5 9.426 43 1.347 50 1.347V0H0v1.347c7 0 25.5 8.078 25.5 17.504Z"
        fill="currentColor"
      />
    </svg>

    {children}

    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 19"
      style={{
        position: 'absolute',
        width: '5rem',
        color: 'var(--color-dark-gray)',
        bottom: '-0.1rem',
        left: '50%',
        transform: 'translate(-50%, 0)',
      }}
    >
      <path
        d="M24.5 0C24.5 9.425 7 17.504 0 17.504v1.347h50v-1.347c-7 0-25.5-8.079-25.5-17.504Z"
        fill="currentColor"
      />
    </svg>
  </S.Wrapper>
);
