import { FaSearch, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

import styled from 'styled-components';

export const Container = styled.div``;

export const TableListPriorityRank = styled.table`
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-radius: 8px;
  border-spacing: 0;
  font-size: 14px;
  width: 100%;
  position: relative;
  min-height: 100px;

  .priority-line {
    width: 12px;
  }

  .date-line {
    width: 138px;
  }
`;

export const TableHead = styled.thead`
  th {
    border-top: none;
  }
`;
export const TableHeadItem = styled.th`
  font-weight: bold;
  text-align: left;
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  background-color: ${props => props.theme.palette.PRIMARY.MAIN_FOUR};
  color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR} !important;
  text-decoration: none !important;
  cursor: default !important;

  &:last-child {
    border-right: none;
    border-radius: 0 8px 0 0;
  }

  &:first-child {
    border-radius: 8px 0 0 0;
    border-top: none;
  }

  padding: 5px;
`;
export const TableBody = styled.tbody``;
export const TableRow = styled.tr`
  &:last-child td {
    border-bottom: none;
  }
`;

export const TableItem = styled.td`
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  &:last-child {
    border-right: none;
  }
  padding: 5px 5px 15px 5px;
  vertical-align: top;
  text-align: left;
`;

export const TableItemClickable = styled.td`
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  &:last-child {
    border-right: none;
  }
  padding: 5px 5px 15px 5px;
  vertical-align: top;
  text-align: left;
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  text-decoration: underline;
  cursor: pointer;
`;

export const ContainerIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const IcoPlus = styled(FaPlusCircle)`
  color: ${props => props.theme.palette.SUCCESS.DARK};
`;

export const IcoMinus = styled(FaMinusCircle)`
  color: ${props => props.theme.palette.ERROR.DARK};
`;

export const IcoEdit = styled(MdEdit)`
  color: ${props => props.theme.palette.PRIMARY.MAIN};
`;

export const ContainerPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ContainerButtons = styled.div`
  display: flex;
  gap: 5px;
  align-items: flex-start;
  justify-content: center;

  button {
    height: 34px;
  }
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
  width: 324px;
  input {
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
  }
`;

export const SearchIcon = styled(FaSearch).attrs(props => ({
  ...props,
  size: 14,
  color: props.theme.palette.GREYSCALE.GREY_TWO
}))``;

export const ContainerLoadingSearch = styled.div`
  display: none;
  align-items: center;
  justify-content: center;

  svg {
    animation: loading 1.5s infinite ease;
    font-size: 14px;
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }
`;

export const Pagination = styled.div`
  display: flex;
  gap: 10px;
`;

export const ItemActivity = styled(NavLink)`
  word-break: break-word;
`;

export const ContainerLoadingTable = styled.div`
  position: absolute;
  width: 100%;
  top: 28px;
  align-items: center;
  display: flex;
  justify-content: center;
  height: calc(100% - 28px);
  background-color: white;
  font-size: 35px;
  border-radius: 0 0 8px 8px;

  svg {
    animation: loading 1.5s infinite ease;
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }
`;