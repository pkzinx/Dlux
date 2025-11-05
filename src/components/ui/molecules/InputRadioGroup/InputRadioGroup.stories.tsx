import { StoryFn, Meta } from '@storybook/react';

import { InputRadioGroup, InputRadioGroupProps } from './InputRadioGroup';

export default {
  title: 'molecules/InputRadioGroup',
  component: InputRadioGroup,
} as Meta;

export const Basic: StoryFn<InputRadioGroupProps> = (args: any) => (
  <InputRadioGroup {...args} />
);

Basic.args = {
  labelFor: 'nota',
};
