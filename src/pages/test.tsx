import Link from 'next/link';

export default function Test() {
  return (
    <div>
      <h1>🧪 Página de Teste</h1>
      <p>Se você está vendo isso, tudo está funcionando perfeitamente!</p>
      <p>✅ Roteamento funcionando</p>
      <p>✅ Navegação entre páginas OK</p>
      <Link href="/" style={{ color: '#1affea', textDecoration: 'underline' }}>
        ← Voltar para home
      </Link>
    </div>
  );
}
