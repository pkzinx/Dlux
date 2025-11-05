import { StoryFn, Meta } from '@storybook/react';

import { ServiceBox, ServiceBoxProps } from './ServiceBox';

import services from './mock';

export default {
  title: 'molecules/ServiceBox',
  component: ServiceBox,
  args: {
    infos: services,
    type: 'hair',
  },
} as Meta;

export const Basic: StoryFn<ServiceBoxProps> = (args: any) => (
  <ServiceBox {...args} />
);
