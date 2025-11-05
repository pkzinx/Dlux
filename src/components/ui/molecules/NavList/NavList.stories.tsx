import { StoryFn, Meta } from '@storybook/react';

import { NavList } from './NavList';

export default {
  title: 'molecules/NavList',
  component: NavList,
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#121212' }],
    },
    layout: 'fullscreen',
  },
} as Meta;

export const Basic: StoryFn = () => <NavList />;

export const Mobile: StoryFn = () => <NavList />;

Mobile.parameters = {
  layout: 'fullscreen',
  viewport: {
    defaultViewport: 'mobile1',
  },
};
