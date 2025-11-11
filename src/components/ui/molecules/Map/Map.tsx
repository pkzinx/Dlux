import * as S from './Map.styles';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useCallback } from 'react';

export type Place = {
  id: string;
  name: string;
  slug: string;
  location: {
    latitude: number;
    longitude: number;
  };
};

export type MapProps = {
  places?: Place[];
};

const Map = ({ places = [] }: MapProps) => {
  const defaultCenter: [number, number] = [-15.7034965731365, -44.02618036034336];
  const hasPlaces = places.length > 0;
  const center: [number, number] = hasPlaces
    ? [places[0].location.latitude, places[0].location.longitude]
    : defaultCenter;

  // Bypass restrictive type inference on MapContainerProps in this setup
  const RLMapContainer = MapContainer as unknown as (props: any) => JSX.Element;

  const handleTileError = useCallback((e: any) => {
    const img = e?.tile as HTMLImageElement | undefined;
    if (img) {
      // Usa uma imagem existente como fallback para minimizar erros no dev
      img.src = '/assets/img/slide-1.jpg';
    }
  }, []);

  // Em desenvolvimento, evita subdomínios (a/b/c) para reduzir erros
  const tileUrl =
    typeof window !== 'undefined' && process.env.NODE_ENV === 'development'
      ? 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  return (
    <S.Container>
      <S.Wrapper>
        <RLMapContainer
          center={center}
          zoom={16}
          scrollWheelZoom
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url={tileUrl}
            eventHandlers={{ tileerror: handleTileError }}
          />
          {places.map(place => (
            <Marker
              key={`marker-${place.id}`}
              position={[place.location.latitude, place.location.longitude]}
              {...({ title: place.name } as any)}
            >
              <Popup>
                <div style={{ minWidth: '160px' }}>
                  <strong>{place.name}</strong>
                  <br />
                  <a href={place.slug} target="_blank" rel="noreferrer">
                    Ver rotas
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </RLMapContainer>
      </S.Wrapper>
      <S.ArrowMoldingUp xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 19">
        <path
          d="M25.5 18.85C25.5 9.426 43 1.347 50 1.347V0H0v1.347c7 0 25.5 8.078 25.5 17.504Z"
          fill="currentColor"
        />
      </S.ArrowMoldingUp>
      <S.ArrowMoldingDown
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 19"
      >
        <path
          d="M24.5 0C24.5 9.425 7 17.504 0 17.504v1.347h50v-1.347c-7 0-25.5-8.079-25.5-17.504Z"
          fill="currentColor"
        />
      </S.ArrowMoldingDown>
    </S.Container>
  );
};

export default Map;
