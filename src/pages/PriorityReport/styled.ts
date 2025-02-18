import { FaSearch } from 'react-icons/fa';

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 0 10px;

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

export const ContainerTable = styled.div`
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

  margin-bottom: 10px;
`;

export const TableHead = styled.thead`
  th {
    position: sticky;
    top: 0;
    border-top: none;
  }
`;

export const ScrollTopDiv = styled.div`
  width: 100%;
  height: 0px;
`;

export const ContainerSwitches = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const DivSwitch = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 10px;

  > div {
    margin: 0px;
    margin-top: -5px;
    width: auto;
  }
`;

export const ContainerJurisdiction = styled.div``;

export const ContainerImpactedRegion = styled.div``;

export const ContainerOptions = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  align-items: stretch;
  margin-bottom: 15px;
`;

export const ContainerApplicationArea = styled.div``;

export const ContainerDownloads = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: right;
`;

export const TableList = styled.table`
  border: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  border-radius: 8px;
  border-spacing: 0;
  font-size: 14px;
  width: 100%;
  position: relative;
  min-height: 219px;
  table-layout: fixed;
`;

export const ContainerDownload = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

interface TableHeadItemProp {
  headerBottomBorder: boolean;
}

export const TableHeadItem = styled.th<TableHeadItemProp>`
  text-align: left;
  border-right: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  border-bottom: ${props =>
    props.headerBottomBorder
      ? `1px solid ${props.theme.palette.TABLE.BORDER}`
      : undefined};
  background-color: ${props => props.theme.palette.TABLE.BACKGROUND_HEADER};
  color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR} !important;
  text-decoration: none !important;
  cursor: default !important;
  font-weight: 600;

  &:last-child {
    border-right: none;
    border-radius: 0 8px 0 0;
  }

  &:first-child {
    border-radius: 8px 0 0 0;
    border-top: none;
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

export const TableRow = styled.tr`
  height: 40px;
  &:last-child td {
    border-bottom: none;
  }
`;

export const DummyTableRow = styled.tr`
  height: 10px;
`;

interface TableItemProp {
  cursorPointer?: boolean;
  bottomLast?: boolean;
  highlightCell?: boolean;
}

export const TableItem = styled.td<TableItemProp>`
  border: 1px solid ${props => props.highlightCell ? ' #A200D6' : props.theme.palette.TABLE.BORDER};
  padding: 5px 10px 5px 10px;
  vertical-align: top;
  background-color: ${props => props.highlightCell ? '#F9E5FF' : null};
  text-align: left;
  word-break: break-word;
  &:hover {
    cursor: ${props => (props.cursorPointer ? 'pointer' : undefined)};
    font-weight: ${props => (props.cursorPointer ? 'bold' : undefined)};
  }
  border-bottom-right-radius: ${props => (props.bottomLast ? '8px' : '0px')};

  a {
    color: ${props => props.theme.palette.PRIMARY.MAIN};
  }
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

export const PointerCursor = styled.td`
  cursor: pointer;
  padding: 9px;
`;

export const PrioritySort = styled.td`
  cursor: pointer;
  padding: 9px;
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const ContainerTabs = styled.div`
  display: flex;
  gap: 10px;
`;

export const FlexWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
`;

export const TextLink = styled.span`
  width: 160px;
  word-break: break-word;
  @media (max-width: 1220px) {
    width: 100px;
  }
`;

export const DupLink = styled.td`
  width: 160px;
  word-break: break-word;
  @media (max-width: 1220px) {
    width: 100px;
  }
`;

export const Label = styled.p`
  font-size: 11px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
  margin-bottom: 5px;
`;

export const RadioFont = styled.span`
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
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

export const Pagination = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  width: 100%;
`;


export const SearchIcon = styled(FaSearch).attrs(props => ({
  ...props,
  size: 14,
  color: props.theme.palette.GREYSCALE.GREY_TWO
}))``;

export const ContainerLoading = styled.div`
  position: absolute;
  z-index: 13;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 120px;
  top: 0;
  background-color: rgba(255, 255, 255, 0.5);
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

export const ContainerButtons = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;

  button {
    height: 34px;
  }
`;

export const ContainerPagination = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  align-items: center;
  margin-bottom: 10px;
`;

export const TitleContainer = styled.div`
  display: flex;
  background-color: ${props => props.theme.palette.PRIMARY.MAIN_FOUR};
  padding: 6px 10px;
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
