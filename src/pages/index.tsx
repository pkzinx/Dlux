import dynamic from 'next/dynamic';

// Renderiza a Home apenas no cliente para evitar qualquer erro em SSR
const HomePage = dynamic(() => import('../components/ui/templates/HomePage/HomePage'), {
  ssr: false,
});

export default function Home() {
  return <HomePage />;
}
