import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background: transparent;
  align-items: center;
  margin: 0 0 0 15px;
`;

export const PaginationInfo = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  color: ${props => props.theme.palette.TEXT.CONTRAST_ONE};
`;

export const WrapperRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Touchable = styled.button`
  width: 16px;
  height: 16px;
  border: 0;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  margin-left: 5px;
  margin-top: 3px;
  background: ${props => props.theme.palette.GREYSCALE.GREY};
  border-radius: 3.76471px;
`;

export const PaginationGoBack = styled(FaChevronLeft).attrs(props => ({
  ...props,
  size: 6,
  color: props.theme.palette.PRIMARY.MAIN
}))``;

export const PaginationGoFoward = styled(FaChevronRight).attrs(props => ({
  ...props,
  size: 6,
  color: props.theme.palette.PRIMARY.MAIN
}))``;
