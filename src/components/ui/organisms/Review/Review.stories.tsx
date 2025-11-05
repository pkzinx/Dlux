import { StoryFn, Meta } from '@storybook/react';

import reviews from './mock';

import { Review, ReviewProps } from './Review';

export default {
  title: 'organisms/Review',
  component: Review,
  args: {
    reviews: reviews,
  },
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Basic: StoryFn<ReviewProps> = (args: any) => <Review {...args} />;

export const Mobile: StoryFn<ReviewProps> = (args: any) => <Review {...args} />;

Mobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
};
