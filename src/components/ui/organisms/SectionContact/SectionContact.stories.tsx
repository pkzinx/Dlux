import { StoryFn, Meta } from '@storybook/react';

import { SectionContact } from './SectionContact';

export default {
  title: 'organisms/SectionContact',
  component: SectionContact,
} as Meta;

export const Basic: StoryFn = () => <SectionContact />;
