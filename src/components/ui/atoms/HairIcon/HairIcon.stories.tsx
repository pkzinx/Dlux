import { StoryFn, Meta } from '@storybook/react';

import { HairIcon } from './HairIcon';

export default {
  title: 'atoms/HairIcon',
  component: HairIcon,
} as Meta;

export const Hair: StoryFn = () => <HairIcon />;
