import type { NextPageContext } from 'next';

type ErrorProps = {
  statusCode?: number;
};

function ErrorPage({ statusCode }: ErrorProps) {
  const code = statusCode ?? 500;
  const message =
    code === 404
      ? 'Página não encontrada'
      : 'Ocorreu um erro inesperado';

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ margin: 0, fontSize: 22 }}>Erro {code}</h1>
      <p style={{ marginTop: 8, color: '#555' }}>{message}</p>
      <p style={{ marginTop: 12 }}>
        Tente atualizar a página ou voltar para a Home.
      </p>
      <a href="/" style={{ color: '#1affea', textDecoration: 'underline' }}>
        ← Ir para Home
      </a>
    </div>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext): ErrorProps => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 500;
  return { statusCode };
};

export default ErrorPage;