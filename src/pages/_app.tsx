import Head from 'next/head';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Dlux Barber</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content="#080808" />
        <meta
          name="description"
          content="Dlux Barber, sua barbearia preferida agora em uma plataforma."
        />
      </Head>
      <div style={{ backgroundColor: '#080808', minHeight: '100vh' }}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default App;
