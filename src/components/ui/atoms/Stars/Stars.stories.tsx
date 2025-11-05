import { StoryFn, Meta } from '@storybook/react';

import { StarProps, Stars } from './Stars';

export default {
  title: 'atoms/Stars',
  component: Stars,
  args: {
    feedbackNote: 5,
  },
} as Meta;

export const Basic: StoryFn<StarProps> = (args: any) => <Stars {...args} />;
