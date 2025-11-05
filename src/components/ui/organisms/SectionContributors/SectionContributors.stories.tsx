import { StoryFn, Meta } from '@storybook/react';
import contributors from './contributors.mock';

import {
  SectionContributors,
  SectionContributorsProps,
} from './SectionContributors';

export default {
  title: 'organisms/SectionContributors',
  component: SectionContributors,
} as Meta;

export const Basic: StoryFn<SectionContributorsProps> = (args: any) => (
  <SectionContributors {...args} />
);

Basic.args = {
  contributors: contributors,
};
