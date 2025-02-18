import { FaSearch, FaTrashAlt } from 'react-icons/fa';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { MdKeyboardArrowRight, MdEdit } from 'react-icons/md';

import { transparentize } from 'polished';
import styled from 'styled-components';

export const Container = styled.div``;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`;

export const BreadCrumbsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const BreadCrumbs = styled.span`
  font-size: 12px;
  margin-left: 3px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};

  &:hover {
    color: ${props => transparentize(0.4, props.theme.palette.TEXT.PRIMARY)};
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const ArrowDown = styled(MdKeyboardArrowRight).attrs(props => ({
  ...props,
  size: 16,
  color: transparentize(0.1, props.theme.palette.TEXT.PRIMARY)
}))`
  opacity: 0.8;
`;

export const CurrentPage = styled.p`
  font-size: 12px;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
`;

export const TitleContainer = styled.div`
  display: flex;
  background-color: ${props => props.theme.palette.PRIMARY.MAIN_TWO};
  padding: 6px 10px;
  border-radius: 4px;
  margin-top: 20px;
  margin-bottom: 15px;
`;

export const Title = styled.p`
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: ${props => props.theme.palette.TEXT.CONTRAST_TWO};
`;

export const TabsWrapper = styled.div`
  display: inline-block;
  padding: 4px 6px;
  background-color: ${props => props.theme.palette.BACKGROUND.PROFILE};
  margin-bottom: 5px;
  border-radius: 8px;
  width: 100%;
  div {
    justify-content: center;
  }
`;

export const ContainerLabelTable = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ContainerPagination = styled.div`
  display: flex;
  justify-content: space-between;
  width:100%
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

export const Label = styled.p`
  font-size: 11px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  margin-bottom: 8px;
`;

export const Pagination = styled.div`
  display: flex;
  gap: 10px;
`;

export const RowContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
  input {
    border: none !important;
    &:focus {
      box-shadow: none !important;
    }
  }
`;

export const ItemsPerPage = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  margin: 0 7px 0 3px;
  color: ${props => props.theme.palette.TEXT.TERTIARY};
`;

export const ContainerTable = styled.div`
  .ant-table-selection {
    display: none;
  }
`;

export const ContainerButtons = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  margin: 10px 10px 0 0;
  button {
    height: 34px;
  }
`;

export const SubstanceUseNameSection = styled.p`
  font-size: 2px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  .input-commonname {
    max-width: 100%;
    width: 100%;
  }
  .input-commonname > input {
    max-width: 100%;
    width: 100%;
  }
  margin-bottom: 7px;
`;

export const Table = styled.table`
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-radius: 8px;
  border-spacing: 0;
  font-size: 14px;
  width: 100%;
  margin-top: 5px;
  table-layout: fixed;
  position: relative;
  min-height: 100px;

  .link-value {
    color: ${props => props.theme.palette.PRIMARY.MAIN};
    text-decoration: underline;
    cursor: pointer;
  }

  .items-action {
    display: flex;
    gap: 5px;
  }

  .action-line {
    width: 45px;
  }

  .checkbox-line {
    width: 20px;
  }
`;

export const TableHead = styled.thead`
  .th-actions {
    width: 121px;
    min-width: 121px;
  }

  .th-cas {
    width: 90px;
    min-width: 90px;
  }
`;

export const TableHeadItem = styled.th`
  font-weight: bold;
  text-align: left;
  border-bottom: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
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
  border-bottom: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  &:last-child {
    border-right: none;
  }
  padding: 5px 5px 15px 5px;
  vertical-align: top;
  text-align: left;
  min-width: 100px;
  word-break: break-word;
`;

export const TableItemActions = styled.td`
  width: 121px;
  border-bottom: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  &:last-child {
    border-right: none;
  }
  padding: 5px 5px 15px 5px;
  vertical-align: top;
  text-align: left;

  word-break: break-word;
`;

export const TableItemClickable = styled.td`
  border-bottom: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  &:last-child {
    border-right: none;
  }
  padding: 5px 5px 15px 5px;
  vertical-align: top;
  text-align: left;
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  text-decoration: underline;
  word-break: break-word;
`;

export const TableItemLimited = styled.td`
  border-bottom: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  &:last-child {
    border-right: none;
  }
  padding: 5px 5px 15px 5px;
  vertical-align: top;
  text-align: left;
  max-width: 600px;
  li {
    margin-left: 20px;
    display: list-item !important;
  }
  word-break: break-word;
`;

export const TableItemEdit = styled.td`
  border-bottom: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  &:last-child {
    border-right: none;
  }
  padding-top: 5px;
  padding-left: 5px;
`;

export const Checkbox = styled.input`
  width: 15px;
  height: 15px;
`;

export const DummyCheckbox = styled.div`
  width: 13px;
  height: 13px;
  border: 1px solid #e7e7e7;
  background: #f7f7f7;
  border-radius: 2px;
`;

export const ContainerDummyCheckbox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IcoEdit = styled(MdEdit)`
  cursor: pointer;
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  font-size: 20px;
`;

export const TextLink = styled.span`
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

export const NoResult = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 10px;
`;

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

export const FlexRowItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  gap: 10px;
`;

export const ToolTipPanel = styled.div`
  position: relative;
`;

export const ToolTipName = styled.div`
  display: block;
  position: absolute;
  top: -83px;
  overflow: visible;
  word-break: break-word;
  opacity: 0;
  pointer-events: none;
  font-size: 14px;
  background-color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
  color: ${props => props.theme.palette.PRIMARY.WHITE};
  padding: 8px 16px;
  border-radius: 10px;
  z-index: 100;
  box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.17), 0px 2px 4px rgba(0, 0, 0, 0.05);
  transition: 0.3s ease;
  left: -30px;
  text-align: left;
  min-width: 320px;
  max-width: 500px;
  transition-delay: 0.2s;
  transform: scale(0.2);
  &::after {
    content: '';
    top: 60px;
    position: absolute;
    z-index: 10;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
    left: 33px;
  }
`;

export const BreakWord = styled.div`
  word-break: break-word;
`;