import Head from 'next/head';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styles/global';
import theme from '../styles/theme';
import ReviewContextProvider from '../contexts/ReviewContext';

function App({ Component, pageProps }: AppProps) {
  // Registrar o Service Worker para habilitar PWA (localhost é considerado seguro)
  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .catch(() => {
          // Ignora falhas de registro
        });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ReviewContextProvider>
        <Head>
          <title>Dlux Barbearia</title>
          <meta
            name="description"
            content="Dlux Barbearia — sua barbearia de confiança"
          />
          <meta name="application-name" content="Dlux Barbearia" />
        </Head>
        <GlobalStyles />
        <Component {...pageProps} />
      </ReviewContextProvider>
    </ThemeProvider>
  );
}

export default App;
