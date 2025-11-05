import { StoryFn, Meta } from '@storybook/react';

import { ModalForm, ModalFormProps } from './ModalForm';

export default {
  title: 'molecules/ModalForm',
  component: ModalForm,
} as Meta;

export const Success: StoryFn<ModalFormProps> = (args: any) => (
  <ModalForm {...args} />
);

Success.args = {
  isOpen: true,
  status: 'success',
};

export const Error: StoryFn<ModalFormProps> = (args: any) => (
  <ModalForm {...args} />
);

Error.args = {
  isOpen: true,
  status: 'error',
};
