/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { InputHTMLAttributes, useState, useEffect, useRef } from 'react';

import { Input as AntdInput, Form } from 'antd';
import { NamePath } from 'antd/es/form/interface';

import { translate } from '../../locales';
import useClickAway from '../../utils/useClickAway';
import {
  Container,
  Wrapper,
  Label,
  Mandatory,
  Pick,
  Option,
  List,
  Item,
  Touchable,
  ArrowDown,
  ArrowUp,
  NotFound,
  PickLevel,
  ContainerLevel,
  OptionLevel,
  ArrowParent,
  ArrowUpOptions,
  ArrowDownOptions
} from './styled';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  mandatory?: boolean;
  style?: object;
  placeholder?: string;
  type: string;
  options?: any;
  onChange?: any;
  defaultText?: any;
  inputRef?: any;
  optionSelected?: any;
  optionValue?: any;
  optionId?: any;
  appearence?: any;
  send?: any;
  className?: any;
  disableInput?: boolean;
  onClickOption?: any;
  onChangeOption?: any;
  selectSize?: any;
  listSelectSize?: any;
  onChangeInput?: any;
  placeholderOption?: any;
  noSpacing?: any;
  direction?: any;
  optionListWidth?: any;
  clickOptionId?: any;
  width?: string;
  height?: string;
  inputSize?: 'small' | 'middle' | 'large';
  warningMessage?: string;
  triggerWarningMessage?: boolean;
  namePath?: NamePath;
  formLabel?: React.ReactNode;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  autoFocus?: boolean;
  onBlurInput?: any;
  onKeyUpInput?: any;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline';
  borderRadius?: string;
  border?: string;
  fontFamily?: string;
  fontSize?: string;
  onFocus?: any;
  maxLength?: number;
  messageMaxLength?: string;
  inputRequired?: boolean;
}

export function GetInput(
  props: InputProps
) {
  const { onChangeInput, disableInput, placeholder, width, inputSize, defaultText, prefixIcon, suffixIcon, autoFocus, ...rest } = props;
  const handleChange = (e: any) => {
    const { value } = e.target;
    e.target.value = value;
    onChangeInput && onChangeInput(value);
  };

  return (
    <AntdInput
      onChange={handleChange}
      disabled={disableInput}
      placeholder={placeholder}
      width={width}
      size={inputSize}
      defaultValue={defaultText}
      prefix={prefixIcon}
      suffix={suffixIcon}
      autoFocus={autoFocus}
    />
  );
}

const Input: React.FC<InputProps> = ({
  label,
  mandatory,
  style,
  placeholder,
  type,
  options,
  inputRequired,
  inputRef,
  optionSelected,
  optionId,
  optionValue,
  appearence,
  send,
  className,
  disableInput,
  onClickOption,
  onChangeOption,
  defaultText,
  selectSize,
  listSelectSize,
  onChangeInput,
  placeholderOption,
  noSpacing,
  direction,
  optionListWidth,
  clickOptionId,
  width,
  height,
  inputSize,
  warningMessage,
  triggerWarningMessage,
  namePath,
  formLabel,
  prefixIcon,
  suffixIcon,
  autoFocus,
  onBlurInput,
  onKeyUpInput,
  resize,
  borderRadius,
  border,
  fontFamily,
  fontSize,
  onFocus,
  maxLength,
  messageMaxLength,
  ...rest
}) => {
  const Standart = () => {
    const handleChange = (e: any) => {
      const { value } = e.target;
      e.target.value = value;
      onChangeInput && onChangeInput(value);
    };

    const handleBlur = (e: any) => {
      const { value } = e.target;
      e.target.value = value;
      onBlurInput && onBlurInput(value);
    };

    const handleKeyUp = (e: any) => {
      onKeyUpInput && onKeyUpInput(e);
    };

    return (
      <AntdInput
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disableInput}
        placeholder={placeholder}
        width={width}
        size={inputSize}
        defaultValue={defaultText}
        prefix={prefixIcon}
        suffix={suffixIcon}
        autoFocus={autoFocus}
        onKeyUp={handleKeyUp}
        ref={inputRef}
        onFocus={onFocus}
        maxLength={maxLength ? maxLength + 1 : undefined}
      />
    );
  };

  const FormType = React.forwardRef((props, ref) => {
    const [form] = Form.useForm();

    useEffect(() => {
      if (!defaultText && triggerWarningMessage) {
        form.validateFields();
      }
    }, [triggerWarningMessage]);

    const handleChange = (e: any) => {
      const { value } = e.target;
      onChangeInput && onChangeInput(value);
      form.validateFields();
      e.target.value = value;
    };

    return (
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          label={formLabel}
          name={namePath}
          rules={[{ required: inputRequired || true, message: warningMessage }, { max: maxLength, message: messageMaxLength }]}
        >
          <AntdInput
            onChange={handleChange}
            disabled={disableInput}
            placeholder={placeholder}
            width={width}
            maxLength={maxLength ? maxLength + 1 : undefined}
            size={inputSize}
            defaultValue={defaultText}
            prefix={prefixIcon}
            suffix={suffixIcon}
            ref={inputRef}
            autoFocus={autoFocus}
          />
        </Form.Item>
      </Form>
    );
  });

  const TextArea = () => {
    const handleChange = (e: any) => {
      const { value } = e.target;
      e.target.value = value;
      onChangeInput && onChangeInput(value);
    };

    return (
      <AntdInput.TextArea
        onChange={handleChange}
        disabled={disableInput}
        placeholder={placeholder}
        maxLength={maxLength ? maxLength + 1 : undefined}
        spellCheck="false"
        size={inputSize}
        defaultValue={defaultText}
        rows={3}
        style={{
          resize,
          borderRadius,
          fontFamily,
          fontSize,
        }}
      />
    );
  };

  const NumberInput = () => {
    const [numVal, setNumVal] = useState('');

    const handleChange = (e: any) => {
      const { value } = e.target;
      e.target.value = value.replace(/\D/g, '');
      setNumVal(value.replace(/\D/g, ''));
      onChangeInput && onChangeInput(value.replace(/\D/g, ''));
    };
    return (
      <AntdInput.TextArea
        onChange={handleChange}
        disabled={disableInput}
        maxLength={maxLength ? maxLength + 1 : undefined}
        placeholder={placeholder}
        spellCheck="false"
        value={numVal || defaultText}
        size={inputSize}
        defaultValue={defaultText}
        rows={3}
        style={{
          border,
          resize,
          height,
          borderRadius,
          fontFamily,
          fontSize,
        }}
      />
    );
  };

  const Select = () => {
    const [listOptions, setListOptions] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [userInput, setUserInput] = useState();
    const [idInput, setIdInput] = useState<any>(optionSelected);
    const select: any = useRef();
    let optionsListComponent;

    useEffect(() => {
      const value = options?.find((opt: any) => opt?.id == optionSelected);
      if (value) {
        setUserInput(value[appearence]);
      }
    }, [optionSelected !== undefined]);

    function handleOpenOptions() {
      const list = options;
      setListOptions(list);
      setShowOptions(!showOptions);
    }

    useClickAway(select, () => {
      if (showOptions) setShowOptions(false);
    });

    function handleSelectOption(value: any) {
      if (value) {
        optionValue = value[appearence];
        optionId = value[send];
        clickOptionId && clickOptionId(value[send]);
        onClickOption && onClickOption(optionId, optionValue);
        setShowOptions(false);
        setUserInput(value[appearence]);
        setIdInput(value[send]);
      }
    }

    if (showOptions) {
      if (listOptions?.length) {
        const optionPlaceholder: any = { id: 0, name: placeholder };
        optionsListComponent = (
          <List direction={direction} listWidth={listSelectSize}>
            {placeholderOption ? (
              <Item
                value={optionPlaceholder.id}
                onClick={() => handleSelectOption(optionPlaceholder)}
              >
                {placeholder}
              </Item>
            ) : null}
            {listOptions?.map((value: any) => {
              return (
                <Item
                  key={value[send]}
                  value={value[send]}
                  onClick={() => handleSelectOption(value)}
                >
                  {value[appearence]}
                </Item>
              );
            })}
          </List>
        );
      } else {
        optionsListComponent = (
          <List listWidth={listSelectSize}>
            <NotFound>
              <li>{translate('components.input.noSuggestions')}</li>
            </NotFound>
          </List>
        );
      }
    }
    return (
      <Container>
        <Wrapper>
          <Label>{label}</Label>
          {mandatory && <Mandatory>*</Mandatory>}
        </Wrapper>
        <Pick
          onClick={handleOpenOptions}
          noSpacing={noSpacing}
          width={selectSize}
          ref={select}
        >
          <Option
            onChange={onChangeOption}
            placeholder={placeholder}
            type="text"
            ref={inputRef}
            value={userInput}
            id={idInput}
            optionListWidth={optionListWidth}
            readOnly
          />
          <Touchable onClick={handleOpenOptions}>
            <ArrowParent>
              <ArrowUpOptions show={showOptions} />
              <ArrowDownOptions show={!showOptions} />
            </ArrowParent>
          </Touchable>
        </Pick>
        {optionsListComponent}
      </Container>
    );
  };

  const CasNumber = () => {
    function casNumMask(mask: any) {
      const v = mask.replaceAll(/[^\w]/gi, '').replaceAll('-', '').slice(0, 13);
      if (v.length >= 4) {
        return `${v.slice(0, v.length - 3)}-${v.slice(-3, -1)}-${v.slice(-1)}`;
      }
      if (v.length >= 3) {
        return `-${v.slice(-3, -1)}-${v.slice(-1)}`;
      }
      if (v.length >= 2) {
        return `${v.slice(-2, -1)}-${v.slice(-1)}`;
      }
      if (v.length >= 1) {
        return `-${v}`;
      }
      return v;
    }

    const [form] = Form.useForm();

    useEffect(() => {
      if (triggerWarningMessage) {
        form.validateFields();
      }
    }, [triggerWarningMessage]);

    const handleChange = (e: any) => {
      e.currentTarget.maxLength = 12;
      const { value } = e.target;
      e.target.value = casNumMask(value);
      form.setFieldsValue({
        casNumber: casNumMask(value)
      });
      form.validateFields();
      onChangeInput && onChangeInput(casNumMask(value));
    };

    return (
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          label={formLabel}
          name={namePath}
          rules={[{ required: true, message: warningMessage }]}
        >
          <AntdInput
            onChange={handleChange}
            disabled={disableInput}
            placeholder={placeholder}
            width={width}
            size={inputSize}
            defaultValue={defaultText}
          />
        </Form.Item>
      </Form>
    );
  };

  const SelectLevel = () => {
    const [listOptions, setListOptions] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [userInput, setUserInput] = useState();
    const [idInput, setIdInput] = useState<any>(optionSelected);
    const select: any = useRef();
    let optionsListComponent;

    useEffect(() => {
      const value = options?.find((opt: any) => opt?.id == optionSelected);
      if (value) {
        setUserInput(value[appearence]);
      }
    }, [optionSelected !== undefined]);

    function handleOpenOptions() {
      const list = options;
      setListOptions(list);
      setShowOptions(!showOptions);
    }

    useClickAway(select, () => {
      if (showOptions) setShowOptions(false);
    });

    function handleSelectOption(value: any) {
      optionValue = value[appearence];
      optionId = value[send];
      clickOptionId && clickOptionId(value[send]);
      onClickOption && onClickOption(optionId, optionValue);
      setShowOptions(false);
      setUserInput(value[appearence]);
      setIdInput(value[send]);
    }

    if (showOptions) {
      if (listOptions?.length) {
        const optionPlaceholder: any = { id: 0, name: placeholder };
        optionsListComponent = (
          <List direction={direction} listWidth={listSelectSize}>
            {placeholderOption ? (
              <Item
                value={optionPlaceholder.id}
                onClick={() => handleSelectOption(optionPlaceholder)}
              >
                {placeholder}
              </Item>
            ) : null}
            {listOptions?.map((value: any) => {
              return (
                <Item
                  key={value[send]}
                  value={value[send]}
                  onClick={() => handleSelectOption(value)}
                >
                  {value[appearence]}
                </Item>
              );
            })}
          </List>
        );
      } else {
        optionsListComponent = (
          <List listWidth={listSelectSize}>
            <NotFound>
              <li>{translate('components.input.noSuggestions')}</li>
            </NotFound>
          </List>
        );
      }
    }
    return (
      <ContainerLevel>
        <Wrapper>
          <Label>{label}</Label>
          {mandatory && <Mandatory>*</Mandatory>}
        </Wrapper>
        <PickLevel
          onClick={handleOpenOptions}
          noSpacing={noSpacing}
          width={selectSize}
          ref={select}
          className={className}
        >
          <OptionLevel
            onChange={onChangeOption}
            placeholder={placeholder}
            type="text"
            ref={inputRef}
            value={userInput}
            id={idInput}
            optionListWidth={optionListWidth}
            readOnly
          />
          <Touchable onClick={handleOpenOptions}>
            {showOptions ? <ArrowUp /> : <ArrowDown />}
          </Touchable>
        </PickLevel>
        {optionsListComponent}
      </ContainerLevel>
    );
  };

  function handleInputTypes() {
    switch (type) {
      case 'text':
        return <Standart />;
      case 'form':
        return <FormType />;
      case 'textarea':
        return <TextArea />;
      case 'number':
        return <NumberInput />;
      case 'select':
        return <Select />;
      case 'casnum':
        return <CasNumber />;
      case 'select-level':
        return <SelectLevel />;
      default:
        return <Standart />;
    }
  }

  return <>{handleInputTypes()}</>;
};

export default Input;
