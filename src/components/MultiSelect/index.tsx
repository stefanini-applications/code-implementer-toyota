/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

import { Select } from 'antd';
import type { SelectProps } from 'antd';
import './styled.css';

import { Container, customStyles } from './styled';

interface IMultiSelector {
  options: any;
  onChange?: any;
  onSearch?: any;
  placeholder?: any;
  label: any;
  value: any;
  style?: any;
  defaultValue?: any;
}

const MultiSelect: React.FC<IMultiSelector> = ({
  options,
  onChange,
  onSearch,
  placeholder,
  label,
  value,
  style,
  defaultValue = []
}) => {
  return (
    <Container>
      <Select
        showSearch
        style={style}
        placeholder={placeholder}
        // defaultActiveFirstOption={false}
        mode="multiple"
        showArrow={false}
        filterOption={false}
        onSearch={onSearch}
        onChange={onChange}
        // notFoundContent={null}
        options={(options || []).map((d) => ({
          value: d[value],
          label: d[label],
        }))}
        defaultValue={defaultValue}
      />
    </Container>
  );
};

export default MultiSelect;
