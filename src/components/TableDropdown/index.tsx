/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';

import {
  Container,
  Pick,
  Option,
  Touchable,
  List,
  Item,
  ArrowUp,
  ArrowDown
} from './styled';

interface ITableDropdown {
  options: any;
  onChangeOption?: any;
  onClickOption?: any;
  placeholder?: any;
  inputRef?: any;
  appearence?: any;
  send?: any;
  optionSelected?: any;
  disabled?: any;
}

const TableDropdown: React.FC<ITableDropdown> = ({
  options,
  onChangeOption,
  onClickOption,
  placeholder,
  inputRef,
  appearence,
  optionSelected,
  send,
  disabled
}) => {
  const [listOptions, setListOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [userInput, setUserInput] = useState();
  const [idInput, setIdInput] = useState<any>(optionSelected);
  let optionsListComponent;

  useEffect(() => {
    const value = options?.find((opt: any) => opt?.id == optionSelected);
    if (value) {
      setUserInput(value[appearence]);
    }
  }, [optionSelected]);

  function handleOpenOptions() {
    const list = options;
    setListOptions(list);
    setShowOptions(!showOptions);
  }

  function handleSelectOption(value: any) {
    const optionValue = value[appearence];
    const optionId = value[send];
    onClickOption && onClickOption(optionId, optionValue);
    setShowOptions(false);
    setUserInput(value[appearence]);
    setIdInput(value[send]);
  }

  if (showOptions) {
    if (listOptions?.length) {
      optionsListComponent = (
        <List>
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
        <List>
          <div>
            <li>no suggestions</li>
          </div>
        </List>
      );
    }
  }

  return (
    <Container>
      <Pick onClick={handleOpenOptions} disabled={disabled}>
        <Option
          onChange={onChangeOption}
          placeholder={placeholder}
          type="text"
          disabled={disabled}
          ref={inputRef}
          value={userInput}
          id={idInput}
          readOnly
        />
        <Touchable>{showOptions ? <ArrowUp /> : <ArrowDown />}</Touchable>
      </Pick>
      {optionsListComponent}
    </Container>
  );
};

export default TableDropdown;
