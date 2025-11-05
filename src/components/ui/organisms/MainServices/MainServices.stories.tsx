import { StoryFn, Meta } from '@storybook/react';

import { MainServices, MainServicesProps } from './MainServices';

import services from './mock';

export default {
  title: 'organisms/MainServices',
  component: MainServices,
  args: {
    items: services,
  },
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Basic: StoryFn<MainServicesProps> = (args: any) => (
  <MainServices {...args} />
);

export const Mobile: StoryFn<MainServicesProps> = (args: any) => (
  <MainServices {...args} />
);

Mobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
};
