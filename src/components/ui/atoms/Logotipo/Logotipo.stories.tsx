import { StoryFn, Meta } from '@storybook/react';

import { Logotipo, LogotipoProps } from './Logotipo';

export default {
  title: 'atoms/Logotipo',
  component: Logotipo,
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#121212' }],
    },
  },
} as Meta;

export const Basic: StoryFn<LogotipoProps> = (args: any) => (
  <Logotipo {...args} />
);
