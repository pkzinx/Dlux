import * as S from './SocialMedia.styles';

export type SocialMediaProps = {
  link: string;
  image: string;
  alt: string;
  $marginRight?: boolean;
};

export const SocialMedia = ({
  link,
  image,
  alt,
  $marginRight = false,
}: SocialMediaProps) => (
  <S.SocialMedia $marginRight={$marginRight} as={undefined as any}>
    <S.WraperImage
      href={link}
      rel="noreferrer noopener"
      target="_blank"
      as={undefined as any}
    >
      <S.Image src={image} alt={alt} as={undefined as any} />
    </S.WraperImage>
  </S.SocialMedia>
);
