import { StoryFn, Meta } from '@storybook/react';

import { Button, ButtonProps } from './Button';

export default {
  title: 'atoms/Button',
  component: Button,
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#121212' }],
    },
  },
} as Meta;

export const Basic: StoryFn<ButtonProps> = (args: any) => <Button {...args} />;

Basic.args = {
  children: 'Marcar Hora',
};

export const Secondary: StoryFn<ButtonProps> = (args: any) => (
  <Button {...args} />
);

Secondary.args = {
  children: 'Saiba Mais',
  buttonStyle: 'secondary',
};
