export default function NotFound() {
  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ margin: 0, fontSize: 22 }}>404 — Página não encontrada</h1>
      <p style={{ marginTop: 8, color: '#555' }}>
        A rota acessada não existe. Verifique o endereço ou volte para a Home.
      </p>
      <a href="/" style={{ color: '#1affea', textDecoration: 'underline' }}>
        ← Ir para Home
      </a>
    </div>
  );
}