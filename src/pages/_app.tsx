import Head from 'next/head';

import type { AppProps } from 'next/app';

import ContextProviders from '~contexts/contextUtils/providers';
import GlobalStyles from '~styles/global';
import { ThemeProvider } from 'styled-components';
import theme from '~styles/theme';

const StyledThemeProvider = ThemeProvider as any;
const StyledGlobalStyles = GlobalStyles as any;

function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProviders>
      <StyledThemeProvider theme={theme}>
        <Head>
          <title>98Barbershop</title>
          <link
            rel="shortcut icon"
            href="assets/img/icon-logo.png"
            type="image/x-icon"
          />
          <link
            rel="apple-touch-icon"
            href="assets/img/icon-logo.png"
            type="image/x-icon"
          />
          <link
            rel="apple-touch-icon"
            href="assets/img/logotipo-36-36.png"
            sizes="36x36"
          />
          <link
            rel="apple-touch-icon"
            href="assets/img/logotipo-48-48.png"
            sizes="48x48"
          />
          <link
            rel="apple-touch-icon"
            href="assets/img/logotipo-72-72.png"
            sizes="72x72"
          />
          <link
            rel="apple-touch-icon"
            href="assets/img/logotipo-96-96.png"
            sizes="96x96"
          />
          <link
            rel="apple-touch-icon"
            href="assets/img/logotipo-144-144.png"
            sizes="144x144"
          />
          <link
            rel="apple-touch-icon"
            href="assets/img/logotipo-192-192.png"
            sizes="192x192"
          />
          <link
            rel="apple-touch-icon"
            href="assets/img/logotipo-512-512.png"
            sizes="512x512"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#080808" />
          <meta
            name="description"
            content="98Barbershop, sua barbearia preferida agora em uma plataforma."
          />
        </Head>
        <StyledGlobalStyles />
        <Component {...pageProps} />
      </StyledThemeProvider>
    </ContextProviders>
  );
}

export default App;
