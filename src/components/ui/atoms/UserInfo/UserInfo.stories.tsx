import { StoryFn, Meta } from '@storybook/react';

import { UserInfo, UserInfoProps } from './UserInfo';

export default {
  title: 'atoms/UserInfo',
  component: UserInfo,
  args: {
    name: 'gabriel',
    surname: 'guedes',
  },
} as Meta;

export const Basic: StoryFn<UserInfoProps> = (args: any) => (
  <UserInfo {...args} />
);
