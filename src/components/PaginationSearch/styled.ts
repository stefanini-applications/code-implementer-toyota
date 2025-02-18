import { FaSearch } from 'react-icons/fa';
import styled, { css } from 'styled-components';

export const SearchIcon = styled(FaSearch).attrs(props => ({
  ...props,
  size: 14,
  color: props.theme.palette.GREYSCALE.GREY_TWO
}))``;

export const PaginationSearchContainer = styled.div<{ $bottom?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0 10px 0;
  width:100%;
  ${props =>
    props.$bottom &&
    css`
      margin: 10px 0 10px 0;
    `};
`;

export const InputBox = styled.div`
  width: 324px;
  input {
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
  }
`;
