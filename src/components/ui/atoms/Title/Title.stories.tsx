import { StoryFn, Meta } from '@storybook/react';

import { Title, TitleProps } from './Title';

export default {
  title: 'atoms/Title',
  component: Title,
  argTypes: {
    children: {
      type: 'string',
    },
  },
  args: {
    children: 'Seja o Primeiro a Saber',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#121212' }],
    },
    layout: 'fullscreen',
  },
} as Meta;

export const Basic: StoryFn<TitleProps> = (args: any) => (
  <div style={{ textAlign: 'center' }}>
    <Title {...args} />
  </div>
);

export const Mobile: StoryFn<TitleProps> = (args: any) => (
  <div style={{ textAlign: 'center' }}>
    <Title {...args} />
  </div>
);

Mobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
};
