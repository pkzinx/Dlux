import { StoryFn, Meta } from '@storybook/react';

import { SocialMedia, SocialMediaProps } from './SocialMedia';

export default {
  title: 'atoms/SocialMedia',
  component: SocialMedia,
} as Meta;

export const Instagram: StoryFn<SocialMediaProps> = (args: any) => (
  <SocialMedia {...args} />
);
export const Whatsapp: StoryFn<SocialMediaProps> = (args: any) => (
  <SocialMedia {...args} />
);

Instagram.args = {
  link: 'https://www.instagram.com/98barbershop/',
  image: '/assets/svg/instagram-icon.svg',
  alt: 'Link que leva para a página no instagram',
};

Whatsapp.args = {
  link: 'https://wa.me/5538991302319',
  image: '/assets/svg/whatsapp-icon.svg',
  alt: 'Link que mostra número do Whatsapp',
};
