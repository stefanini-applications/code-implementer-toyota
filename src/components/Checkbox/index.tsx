import React from 'react';

import { Container, Check, Label } from './styled';

interface ICheckbox {
  label?: string;
  id?: any;
  name?: string;
  value?: any;
  onClick?: any;
  defaultChecked?: any;
  disabled?: boolean;
}

const Checkbox: React.FC<ICheckbox> = ({
  id,
  name,
  value,
  label,
  onClick,
  defaultChecked,
  disabled
}) => {
  return (
    <Container>
      <Check
        type="checkbox"
        id={id}
        name={name}
        value={value}
        onClick={onClick}
        defaultChecked={defaultChecked}
        disabled={disabled}
      />
      <Label>{label}</Label>
    </Container>
  );
};

export default Checkbox;
