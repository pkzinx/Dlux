import * as S from './InputRadioGroup.styles';

import { InputRadio, InputRadioProps } from '~atoms/InputRadio/InputRadio';

export type InputRadioGroupProps = Pick<
  InputRadioProps,
  'value' | 'labelFor' | 'onChange'
>;

export const InputRadioGroup = ({
  labelFor,
  value,
  onChange,
}: InputRadioGroupProps) => (
  <S.Wrapper>
    <InputRadio
      dataTestid="one-star"
      value="1"
      isChecked={value}
      labelFor={labelFor}
      color="primary"
      required
      onChange={e => onChange(e)}
    />
    <InputRadio
      dataTestid="two-star"
      value="2"
      isChecked={value}
      labelFor={labelFor}
      color={value > '1' ? 'primary' : 'starOff'}
      onChange={e => onChange(e)}
    />
    <InputRadio
      dataTestid="three-star"
      value="3"
      isChecked={value}
      labelFor={labelFor}
      color={value > '2' ? 'primary' : 'starOff'}
      onChange={e => onChange(e)}
    />
    <InputRadio
      dataTestid="four-star"
      value="4"
      isChecked={value}
      labelFor={labelFor}
      color={value > '3' ? 'primary' : 'starOff'}
      onChange={e => onChange(e)}
    />
    <InputRadio
      dataTestid="five-star"
      value="5"
      isChecked={value}
      labelFor={labelFor}
      color={value > '4' ? 'primary' : 'starOff'}
      onChange={e => onChange(e)}
    />
  </S.Wrapper>
);
