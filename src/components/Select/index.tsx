import React, { useEffect, useState } from 'react';

import { Select, ConfigProvider, Form } from 'antd';
import { NamePath } from 'antd/es/form/interface';

interface ISelect {
  values?: any;
  labelValue: string;
  keyValue: any;
  onChange?: any;
  size?: any;
  mode?: any;
  defaultValue?: any;
  allowClear?: any;
  inputRef?: any;
  isDisabled?: any;
  selectedValue?: any;
  placeholder?: string;
  isFormType?: boolean;
  warningMessage?: string;
  triggerWarningMessage?: boolean;
  namePath?: NamePath;
  formLabel?: React.ReactNode;
}

const SelectDropdown: React.FC<ISelect> = ({
  values,
  labelValue,
  keyValue,
  onChange,
  size,
  mode,
  defaultValue,
  allowClear,
  inputRef,
  isDisabled,
  selectedValue,
  placeholder,
  isFormType,
  warningMessage,
  triggerWarningMessage,
  namePath,
  formLabel
}) => {
  const [optionsSearchable, setOptionsSearchable] = useState<any>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (triggerWarningMessage) {
      form.validateFields();
    }
  }, [triggerWarningMessage]);

  useEffect(() => {
    if (values !== undefined && values.length > 0) {
      setOptionsSearchable(values.map(value => ({
        label: value[labelValue],
        value: value[keyValue],
        disabled: value.disabled || false
      })))
    }
    if (values !== undefined && values.length === 0) {
      setOptionsSearchable([]);
    }
  }, [values]);

  useEffect(() => {
    if (selectedValue !== undefined) {
      form.setFieldsValue({
        [`${namePath}`]: selectedValue
      });
    }
  }, [selectedValue]);

  let defaultValueOption;

  if (defaultValue !== undefined) {
    if (mode === 'multiple') {
      defaultValueOption = defaultValue.map(value => ({
        label: value[labelValue],
        value: value[keyValue]
      }));
    } else {
      defaultValueOption = defaultValue;
    }
  }

  const handleSearch = (value) => {
    const clonedOptions = [...values]

    setOptionsSearchable(clonedOptions.filter(y=> y[labelValue].toLowerCase().includes(value.toLowerCase())).map(x => ({
      label: x[labelValue],
      value: x[keyValue]
    })))
  }

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#3661fd'
          }
        }}
      >
        {isFormType ?
          <Form
            form={form}
            layout="vertical"
          >
            <Form.Item
              label={formLabel}
              name={namePath}
              rules={[{ required: true, message: warningMessage }]}
            >
              <Select
                mode={mode}
                placeholder={placeholder || "Select"}
                style={{ width: size }}
                ref={inputRef}
                onChange={onChange}
                allowClear={allowClear}
                value={selectedValue}
                defaultValue={defaultValueOption}
                options={optionsSearchable}
                filterOption={false}
                onSearch={handleSearch}
                disabled={isDisabled}
                labelInValue
              />
            </Form.Item>
          </Form> :
          <Select
            mode={mode}
            placeholder={placeholder || "Select"}
            style={{ width: size }}
            ref={inputRef}
            onChange={onChange}
            filterOption={false}
            onSearch={handleSearch}
            allowClear={allowClear}
            value={selectedValue}
            defaultValue={defaultValueOption}
            options={optionsSearchable}
            disabled={isDisabled}
            labelInValue
          />
        }
      </ConfigProvider>
    </>
  );
};

export default SelectDropdown;
