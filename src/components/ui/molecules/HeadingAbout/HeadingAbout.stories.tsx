import { StoryFn, Meta } from '@storybook/react';

import { HeadingAbout, HeadingAboutProps } from './HeadingAbout';

export default {
  title: 'molecules/HeadingAbout',
  component: HeadingAbout,
} as Meta;

export const Basic: StoryFn<HeadingAboutProps> = (args: any) => (
  <HeadingAbout {...args} />
);

Basic.args = {
  title: 'Olá Pessoal',
  subtitle: 'Nós Somos a 98BarberShop',
  lineBottom: true,
};
