import { StoryFn, Meta } from '@storybook/react';

import MediaMatch from './MediaMatch';

export default {
  title: 'molecules/MediaMatch',
  component: MediaMatch,
} as Meta;

export const Desktop: StoryFn = () => (
  <MediaMatch greaterThan="medium">Desktop</MediaMatch>
);
export const Mobile: StoryFn = () => (
  <MediaMatch lessThan="medium">Mobile</MediaMatch>
);

Mobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
};
