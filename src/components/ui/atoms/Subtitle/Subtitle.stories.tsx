import { StoryFn, Meta } from '@storybook/react';

import { Subtitle } from './Subtitle';
import { TitleProps } from '../Title/Title';
import { Container } from '../Container/Container';

export default {
  title: 'atoms/Subtitle',
  component: Subtitle,
  argsTypes: {
    children: {
      type: 'string',
    },
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#121212' }],
    },
  },
} as Meta;

export const BasicHowTitle: StoryFn<TitleProps> = (args: any) => (
  <Container>
    <Subtitle {...args} />
  </Container>
);

BasicHowTitle.args = {
  children: 'Tenha uma ótima aparência, sinta-se confiante',
};

export const BasicHowTitleMobile: StoryFn<TitleProps> = (args: any) => (
  <Container>
    <Subtitle {...args} />
  </Container>
);

BasicHowTitleMobile.parameters = {
  layout: 'fullscreen',
  viewport: {
    defaultViewport: 'mobile1',
  },
};

BasicHowTitleMobile.args = {
  children: 'We Are BarberShop!',
};
