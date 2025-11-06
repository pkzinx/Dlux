import Head from 'next/head';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styles/global';
import theme from '../styles/theme';
import ReviewContextProvider from '../contexts/ReviewContext';

function App({ Component, pageProps }: AppProps) {
  // Em desenvolvimento, desregistrar qualquer Service Worker para evitar loops de reload/cache
  useEffect(() => {
    if (
      process.env.NODE_ENV === 'development' &&
      typeof navigator !== 'undefined' &&
      'serviceWorker' in navigator
    ) {
      navigator.serviceWorker
        .getRegistrations()
        .then((regs) => regs.forEach((r) => r.unregister()))
        .catch(() => {
          // silenciosamente ignora erros ao tentar desregistrar SW em dev
        });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ReviewContextProvider>
        <Head>
          <title>Dlux Barber</title>
          <meta
            name="description"
            content="Dlux Barber - Sua barbearia de confiança"
          />
        </Head>
        <GlobalStyles />
        <Component {...pageProps} />
      </ReviewContextProvider>
    </ThemeProvider>
  );
}

export default App;
