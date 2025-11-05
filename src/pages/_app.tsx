import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styles/global';
import theme from '../styles/theme';
import ReviewContextProvider from '../contexts/ReviewContext';

function App({ Component, pageProps }: AppProps) {
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
