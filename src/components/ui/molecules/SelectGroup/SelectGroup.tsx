import * as S from './SelectGroup.styles';
import { InputGroupProps } from '../InputGroup/InputGroup';

type InputProps = Pick<
  InputGroupProps,
  'label' | 'labelFor' | 'required' | 'placeholder' | 'marginBottom' | 'value'
>;

export type SelectGroupProps = {
  children: React.ReactNode;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
} & InputProps;

export const SelectGroup = ({
  label,
  labelFor,
  required,
  placeholder,
  children,
  value = '',
  marginBottom = false,
  onChange,
}: SelectGroupProps) => (
  <S.Wrapper marginBottom={marginBottom}>
    <S.Label htmlFor={labelFor}>{label}</S.Label>
    <S.Select
      id={labelFor}
      name={labelFor}
      onChange={onChange}
      required={required}
      role="combobox"
      value={value}
    >
      <option value="">{placeholder}</option>
      {children}
    </S.Select>
  </S.Wrapper>
);
