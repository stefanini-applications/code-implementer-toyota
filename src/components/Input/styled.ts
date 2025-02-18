import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

import styled from 'styled-components';

interface IField {
  blocked?: boolean;
  colorPicker?: boolean;
  large?: boolean;
  noSpacing?: boolean;
  width?: any;
}

interface IAutocompleteInput {
  width?: any;
  listWidth?: any;
  direction?: any;
}

interface ISelectInput {
  width?: any;
  optionListWidth?: any;
  noSpacing?: any;
}

export const Container = styled.div`
  position: relative;

  input[type='text'] {
    border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
    border-radius: 6px;
    padding: 8px 11px;
    transition: all 0.3s ease;

    &:focus {
      border: 1px solid ${props => props.theme.palette.PRIMARY.MAIN_TWO};
      box-shadow: 0px 0px 0px 4px
        ${props => props.theme.palette.PRIMARY.MAIN_FOUR};
    }

    &:disabled {
      background-color: ${props => props.theme.palette.GREYSCALE.GREY};
    }
  }

  textarea,
  input {
    border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
    border-radius: 6px;
    padding: 8px 11px;
    transition: all 0.3s ease;
  }
`;

export const ContainerLevel = styled.div`
  position: relative;

  input[type='text'] {
    border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
    border-radius: 6px;
    padding: 8px 11px;
    transition: all 0.3s ease;

    &:focus {
      border: 1px solid ${props => props.theme.palette.PRIMARY.MAIN_TWO};
      box-shadow: 0px 0px 0px 4px
        ${props => props.theme.palette.PRIMARY.MAIN_FOUR};
    }

    &:disabled {
      background-color: ${props => props.theme.palette.GREYSCALE.GREY};
    }
  }

  textarea,
  input {
    border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
    border-radius: 6px;
    padding: 8px 11px;
    transition: all 0.3s ease;
  }
`;

export const Content = styled.div<IField>`
  display: flex;
  background: ${({ blocked }) =>
    blocked ? props => props.theme.palette.BACKGROUND.HINT : 'transparent'};
  border-radius: 3px;
  width: ${({ width }) => width || '165px'};
  max-width: ${({ width }) => width || '165px'};
  margin: 0 13px 14px 0;
  align-items: center;
  transition: all 0.2s ease-in-out;
`;

export const TextField = styled.textarea`
  display: flex;
  flex: 1;
  background-color: transparent;

  color: black;
  border: 0;
  input {
    border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
    border-radius: 6px;
    padding: 8px 11px;
    transition: all 0.3s ease;

    &:focus {
      border: 1px solid ${props => props.theme.palette.PRIMARY.MAIN_TWO};
      box-shadow: 0px 0px 0px 4px
        ${props => props.theme.palette.PRIMARY.MAIN_FOUR};
    }

    &:disabled {
      background-color: ${props => props.theme.palette.GREYSCALE.GREY};
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Label = styled.p`
  margin-bottom: 3px;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
  font-size: 24px;
`;

export const Mandatory = styled.p`
  font-size: 12.5px;
  margin-left: 5px;
  color: black;
`;

export const Field = styled.input<IField>`
  width: ${({ width }) => width || '165px'};
  max-width: ${({ width }) => width || '165px'};
  cursor: ${({ blocked }) => (blocked ? 'not-allowed' : 'text')};
  cursor: ${({ colorPicker }) => (colorPicker ? 'pointer' : null)};
  background: transparent;
  border: 0;
  outline: none;
  color: black;
  &::placeholder {
  }
  input {
    border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
    border-radius: 6px;
    padding: 8px 11px;
    transition: all 0.3s ease;

    &:focus {
      border: 1px solid ${props => props.theme.palette.PRIMARY.MAIN_TWO};
      box-shadow: 0px 0px 0px 4px
        ${props => props.theme.palette.PRIMARY.MAIN_FOUR};
    }

    &:disabled {
      background-color: ${props => props.theme.palette.GREYSCALE.GREY};
    }
  }
`;

export const Pick = styled.div<ISelectInput>`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  background-color: transparent;
  margin: 0;
  width: ${({ width }) => width || '165px'};
  align-items: center;
  border-radius: 6px;
  transition: all 0.2s ease-in-out;
  width: auto !important;
`;

export const PickLevel = styled.div<ISelectInput>`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  background-color: transparent;
  padding: 7px 10px;
  margin: 0;
  align-items: center;
  border-radius: 6px;
  transition: all 0.2s ease-in-out;
  input {
    border: none !important;

    &:focus {
      box-shadow: none !important;
    }
  }
`;

export const Option = styled.input<ISelectInput>`
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  width: ${({ optionListWidth }) => optionListWidth || '150px'};
  color: black;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  outline: none;
  caret-color: transparent;
  border: none !important;
  &:focus {
    box-shadow: none !important;
  }
`;

export const OptionLevel = styled.input<ISelectInput>`
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  width: 10px;
  color: black;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  outline: none;
  caret-color: transparent;
`;

export const List = styled.ul<IAutocompleteInput>`
  display: flex;
  flex-direction: column;
  bottom: ${({ direction }) => (direction == 'up' ? '100%' : 'unset')};
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  box-shadow: 0px 4px 7px 2px rgba(0, 0, 0, 0.08);
  list-style: none;
  margin-top: 5px;
  z-index: 99;
  position: absolute;
  max-height: 130px;
  overflow-y: auto;
  padding-left: 0;
  color: black !important;
  background-color: white;
  width: ${({ listWidth }) => listWidth || '185px'};
  width: 100%;
  border-radius: 6px;
`;

export const Item = styled.li`
  padding: 0.5rem;
  color: black;

  font-size: 12px;

  &:hover {
    background-color: ${props => props.theme.palette.PRIMARY.MAIN};
    cursor: pointer;
    color: ${props => props.theme.palette.PRIMARY.WHITE};
  }
`;

export const Touchable = styled.button`
  padding: 0;
  border: 0;
  outline: none;
  cursor: pointer;
  background-color: transparent;
`;

export const ArrowUp = styled(MdArrowDropUp).attrs(props => ({
  ...props,
  size: 18,
  color: props.theme.palette.GREYSCALE.DARK_THREE
}))`
  opacity: 0.8;
`;

export const ArrowDown = styled(MdArrowDropDown).attrs(props => ({
  ...props,
  size: 18,
  color: props.theme.palette.GREYSCALE.DARK_THREE
}))`
  opacity: 0.8;
`;

export const ArrowParent = styled.div`
  position: relative;
`;

interface ArrowProps {
  show?: boolean;
};

export const ArrowUpOptions = styled(MdArrowDropUp).attrs(props => ({
  ...props,
  size: 18,
  color: props.theme.palette.GREYSCALE.DARK_THREE
}))<ArrowProps>`
  opacity: ${({ show }) => show ? '0.8' : '0'};
  position: relative;
`;

export const ArrowDownOptions = styled(MdArrowDropDown).attrs(props => ({
  ...props,
  size: 18,
  color: props.theme.palette.GREYSCALE.DARK_THREE
}))<ArrowProps>`
  opacity: ${({ show }) => show ? '0.8' : '0'};
  position: absolute;
  left: 0;
  top: 0;
`;

export const NotFound = styled.ul`
  color: black;
  padding: 0.5rem;
  list-style: none;
  background-color: white;

  li {
    font-size: 12px;
  }
`;