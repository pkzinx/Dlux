import { StoryFn, Meta } from '@storybook/react';

import { InputGroup, InputGroupProps } from './InputGroup';

export default {
  title: 'molecules/InputGroup',
  component: InputGroup,
} as Meta;

export const Basic: StoryFn<InputGroupProps> = (args: any) => (
  <InputGroup {...args} />
);

Basic.args = {
  label: 'Nome:',
  placeholder: 'Ex: Rafael Batista',
  labelFor: 'name',
  type: 'text',
  required: true,
};
