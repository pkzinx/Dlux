import { StoryFn, Meta } from '@storybook/react';

import { InputRadio, InputRadioProps } from './InputRadio';

export default {
  title: 'atoms/InputRadio',
  component: InputRadio,
} as Meta;

export const Basic: StoryFn<InputRadioProps> = (args: any) => (
  <InputRadio {...args} />
);

Basic.args = {
  labelFor: 'level',
  value: '1',
  required: true,
};
