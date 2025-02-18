import { FaSearch } from 'react-icons/fa';

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 20px;
  font-size: 14px;
  min-width: 940px;

  th {
    padding: 9px;
  }

  .no-padding {
    padding: 0px;
  }

  .no-right-border {
    border-right: none;
  }

  .no-top-border {
    border-top: none;
  }

  .border-left {
    border-left: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  }

  .middle-center-text {
    vertical-align: middle;
    text-align: center;
  }

  .middle-center-flex-text {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .minWidth {
    @media (max-width: 1520px) {
      width: 100px;
    }
  }
`;

export const SearchIcon = styled(FaSearch).attrs(props => ({
  ...props,
  size: 14,
  color: props.theme.palette.GREYSCALE.GREY_TWO
}))``;

export const Search = styled.div`
  display: flex;
  align-items: center;
  width: 324px;
  input {
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
  }
  margin-bottom: 10px;
`;

export const ContainerAntTabs = styled.div`
  .ant-tabs-nav-wrap {
    margin-left: 20px;
  }
`;

export const ContainerPagination = styled.div`
  display: flex;
  height: 36px;
  justify-content: end;
  position: relative;
  width: auto;
`;

export const ContainerTableActions = styled.div`
  margin-bottom: 0px;
  position: relative;
`;

export const ContainerPaginationTable = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ContainerTable = styled.div`
  // max-height: 100%;
  // overflow-y: auto;
  table.unstyledTable {
  }
  table.unstyledTable td,
  table.unstyledTable th {
  }
  table.unstyledTable thead {
    background: ${props => props.theme.palette.GREYSCALE.GREY_SIX};
  }
  table.unstyledTable thead th {
    font-weight: normal;
  }

  .date-line {
    width: 80px;
  }
  min-width: 940px;

  .subst-line {
    width: 120px;
    color: ${props => props.theme.palette.PRIMARY.MAIN};
    text-decoration: underline;
    word-break: break-word;
    cursor: pointer;
    @media (max-width: 1220px) {
      width: 100px;
    }
  }

  .regleg-line {
    width: 160px;
    color: ${props => props.theme.palette.PRIMARY.MAIN};
    text-decoration: underline;
    cursor: pointer;
    @media (max-width: 1220px) {
      width: 100px;
    }
  }
`;

export const TableHead = styled.thead`
  th {
    border-bottom: 1px solid ${props => props.theme.palette.TABLE.BORDER};
    position: sticky;
    top: 0;
    border-top: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  }

  th:first-child {
    border-left-radius: 8px 0 0 0;
  }

  th:last-child {
    border-radius: 0 8px 0 0;
  }
`;

export const ScrollTopDiv = styled.div`
  width: 100%;
  height: 0px;
`;

export const TableList = styled.table`
  border: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  border-radius: 8px;
  min-width: 983px;
  border-spacing: 0;
  font-size: 14px;
  width: 100%;
  position: relative;
  min-height: 219px;
  table-layout: fixed;
  border-top: none;
`;

interface TableHeadItemProp {
  number?: boolean;
}

interface TableGroupProps {
  group?: boolean;
}

export const TableHeadItem = styled.th<TableHeadItemProp>`
  text-align: center;
  width: auto;
  border-right: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  background-color: ${props => props.theme.palette.TABLE.BACKGROUND_HEADER};
  color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR} !important;
  text-decoration: none !important;
  cursor: default !important;
  font-weight: 600;
  padding: ${props => (props.number ? '8px' : '9px')}

  &:last-child {
    border-right: none;
    border-radius: 0 8px 0 0;
  }

  &:first-child {
    border-radius: 8px 0 0 0;
  }

  padding: 1px;
  background-clip: border-box;
`;

export const PaddingDiv = styled.td`
  padding: 9px;
`;

export const ImpactDiv = styled.td`
  width: 510px;
  display: flex;
  z-index: 3;
  border-bottom: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  height: 40px;
  margin-left: -1px;
  background-clip: content-box;
`;

export const ImpactInnerDiv = styled.div`
  width: 432px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
  background-color: ${props => props.theme.palette.TABLE.BACKGROUND_HEADER};
  height: 40px;
  padding-left: 8px;
`;

export const ImpactDivDummy = styled.div`
  height: 40px;
  visibility: hidden;
`;

export const TableBody = styled.tbody``;

export const ContainerLoading = styled.div`
  position: absolute;
  z-index: 13;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  background-color: rgba(255, 255, 255, 0.5);
`;

export const TableRow = styled.tr<TableGroupProps>`
  td {
    position: ${props => (props.group ? 'sticky' : 'unset')};
    top: 77px;
    background-color: white;
    border-bottom: ${props => (props.group ? '4px' : '1px')} solid #ebebeb;
    border-top: ${props => (props.group ? '3px' : '0px')} solid
      ${props => props.theme.palette.TABLE.BORDER};
  }
  &:first-child {
    td {
      border-top: none;
    }
  }
  height: auto;
  &:last-child td {
    border-bottom: none;
  }
  td:last-child {
    border-right: none;
  }
  .phaseSubstance {
    border-bottom: none;
  }
`;

export const DummyTableRow = styled.tr`
  height: 10px;
`;

interface TableItemProp {
  cursorPointer?: boolean;
  bottomLast?: boolean;
  substance?: boolean;
  number?: boolean;
  priority?: boolean;
  casNumber?: boolean;
  vh?: boolean;
}

export const TableNumber = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

export const TableComment = styled.div`
  max-height: 100px;
  overflow-y: auto;
`;

export const ContainerSubstanceName = styled.div`
  max-height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box !important;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  white-space: normal;
`;

export const TableItem = styled.td<TableItemProp>`
  padding-left: ${props => (props.casNumber ? '18px' : '')};
  border-bottom: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  border-right: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  padding: 5px 10px 5px 10px;
  vertical-align: top;
  max-height: 90px;
  text-align: ${props => (props.priority ? 'center' : 'left')};
  max-width: 20px;
  word-break: break-word;
  padding-left: ${props => (props.substance ? '20px' : '10px')};
  &:hover {
    cursor: ${props => (props.cursorPointer ? 'pointer' : undefined)};
    font-weight: ${props => (props.cursorPointer ? 'bold' : undefined)};
  }
  border-bottom-right-radius: ${props => (props.bottomLast ? '8px' : '0px')};
  color: ${props => (props.vh ? 'white' : null)};
`;

export const DummyTableItem = styled.td`
  border-top: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  background-color: ${props => props.theme.palette.TABLE.BACKGROUND_HEADER};
  &:last-child td {
    border-right: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  }
`;

export const TableHeadImpactSubItem = styled.div`
  width: 100%;
  border-right: solid 1px ${props => props.theme.palette.TABLE.BORDER};
  &:last-child {
    border-right: none;
  }
`;

export const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  button {
  }
`;

export const PointerCursor = styled.td`
  cursor: pointer;
  padding: 9px;
`;

export const ContainerTabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

export const FlexWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Link = styled.a`
  width: 160px;
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  text-decoration: underline;
  word-break: break-word;
  cursor: pointer;
  @media (max-width: 1220px) {
    width: 100px;
  }
`;

export const DupLink = styled.td`
  width: 160px;
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  text-decoration: underline;
  word-break: break-word;
  cursor: pointer;
  @media (max-width: 1220px) {
    width: 100px;
  }
  &:hover {
    text-decoration: none;
    opacity: 0.7;
  }
`;

export const SelectWrapper = styled.div`
  position: relative;

  /* &:after {
    content: '▾';
    font-size: 1rem;
    top: 6px;
    right: 10px;
    position: absolute;
    pointer-events: none;
    color: ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  } */
`;

export const DropdownContainer = styled.div`
  .rs-picker {
    width: 216px;
  }

  & > div {
    width: 224px;
    font-size: 14px;
  }
`;

export const LabelInfo = styled.p`
  font-size: 11px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
  margin-bottom: 5px;
`;

export const RadioFont = styled.div`
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
`;

export const ContainerButtonsModal = styled.div`
  display: flex;
  justify-content: end;
  button {
    margin-left: 5px;
  }
`;

interface MultiLineDotsProp {
  showLess?: boolean;
}

export const MultiLineDots = styled.div<MultiLineDotsProp>`
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: ${props => (props.showLess ? '4' : '8')};
  -webkit-box-orient: vertical;
  white-space: normal;
`;

export const ToolTipPanel = styled.div`
  position: relative;
`;

export const ToolTipName = styled.div`
  display: block;
  position: absolute;
  top: 5px;
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
  left: 0px;
  text-align: left;
  min-width: 150px;
  max-width: 500px;
  transition-delay: 0.2s;
  transform: scale(0.2);
  &::after {
    content: '';
    top: -4px;
    position: absolute;
    z-index: 10;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
    left: 5%;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Label = styled.p`
  font-size: 13px;
  font-family: 'Roboto', sans-serif;
  text-align: center;
  margin: 0 4px 0 12px;
  color: ${props => props.theme.palette.TEXT.TERTIARY};
  opacity: 0.8;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  p {
    margin: 0;
  }
`;

export const AttachmentsButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const AttachmentsCount = styled.div`
  font-size: 14px;
`;

export const TitleContainer = styled.div`
  display: flex;
  // background-color: ${props => props.theme.palette.PRIMARY.MAIN_FOUR};
  border-radius: 4px;
  margin-top: 20px;
  margin-bottom: 15px;
`;

export const Title = styled.p`
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: ${props => props.theme.palette.GREYSCALE.DARK};
`;
