import { StoryFn, Meta } from '@storybook/react';

import { NavItem } from './NavItem';

export default {
  title: 'atoms/NavItem',
  component: NavItem,
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#121212' }],
    },
  },
} as Meta;

export const Basic: StoryFn = () => <NavItem>O melhor está por vir!</NavItem>;
