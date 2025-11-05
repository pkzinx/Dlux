import { StoryFn, Meta } from '@storybook/react';

import { Footer } from './Footer';

export default {
  title: 'organisms/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Basic: StoryFn = () => <Footer />;
