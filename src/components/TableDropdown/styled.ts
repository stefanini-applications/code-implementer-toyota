import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

import { transparentize } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const Pick = styled.div<{
  disabled?: boolean;
}>`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid
    ${props => transparentize(0.3, props.theme.palette.TEXT.PRIMARY)};
  background-color: transparent;
  padding: 4px 9px 4px;
  margin: 0;
  width: 50px;
  align-items: center;
  transition: all 0.2s ease-in-out;
  cursor: ${props => (props.disabled ? 'none' : 'pointer')};
  pointer-events: ${props => (props.disabled ? 'none' : undefined)};
`;

export const Option = styled.input`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  width: 40px;
  color: black;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  outline: none;
  text-align: center;
  caret-color: transparent;
`;

export const Touchable = styled.button`
  padding: 0;
  border: 0;
  outline: none;
  cursor: pointer;
  background-color: transparent;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  bottom: unset;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  list-style: none;
  margin-top: 5px;
  z-index: 99;
  position: absolute;
  max-height: 130px;
  overflow-y: auto;
  padding-left: 0;
  color: black !important;
  background-color: white;
  width: 65px;
`;

export const Item = styled.li`
  padding: 0.5rem;
  color: black;
  font-size: 12px;
  margin: 4px;

  &:hover {
    background-color: ${props => props.theme.palette.PRIMARY.MAIN};
    border-radius: 2px;
    cursor: pointer;
    color: ${props => props.theme.palette.PRIMARY.WHITE};
  }
`;

export const ArrowUp = styled(MdKeyboardArrowUp).attrs(props => ({
  ...props,
  size: 18,
  color: props.theme.palette.TEXT.PRIMARY
}))`
  opacity: 0.8;
`;

export const ArrowDown = styled(MdKeyboardArrowDown).attrs(props => ({
  ...props,
  size: 18,
  color: props.theme.palette.TEXT.PRIMARY
}))`
  opacity: 0.8;
`;
