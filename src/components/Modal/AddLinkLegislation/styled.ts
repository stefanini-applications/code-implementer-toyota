import { FaFileDownload } from 'react-icons/fa';

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  flex-direction: column;
  gap: 10px;
  padding: 0px 10px 20px 10px;
  min-width: 940px;

  th {
    border-color: ${props => props.theme.palette.TABLE.BORDER};
    background-color: ${props => props.theme.palette.TABLE.BACKGROUND_HEADER};
    color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
    font-weight: 600;
    padding: 16px;
  }

  td {
    border-color: ${props => props.theme.palette.TABLE.BORDER};
    padding: 16px;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  background-color: ${props => props.theme.palette.PRIMARY.MAIN_FOUR};
  padding: 6px 10px;
  border-radius: 4px;
  margin-top: 20px;
  margin-bottom: 15px;
`;

export const ContainerLoading = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  z-index: 6;
  padding-top: 120px;
  background-color: rgba(255, 255, 255, 0.5);
`;

export const Title = styled.p`
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: ${props => props.theme.palette.GREYSCALE.DARK};
`;

export const ContainerDates = styled.div`
  position: relative;
  display: flex;
  gap: 30px;
`;
export const ContainerRangePicker = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.p`
  font-size: 11px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
  margin-bottom: 8px;
`;

export const ContainerMultiSelect = styled.div``;

export const ContainerTable = styled.div`
  position: relative;
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
`;

export const TableList = styled.table`
  border: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  border-radius: 8px;
  border-spacing: 0;
  font-size: 14px;
  min-height: 219px;
  width: 100%;
`;

export const TableHead = styled.thead`
  th {
    position: sticky;
    top: 0;
    z-index: 5;
    border-top: none;
  }
`;
export const TableHeadItem = styled.th`
  text-align: left;
  border-bottom: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  border-right: 1px solid ${props => props.theme.palette.TABLE.BORDER};

  &:last-child {
    border-right: none;
    border-radius: 0 8px 0 0;
  }

  &:first-child {
    border-radius: 8px 0 0 0;
  }
`;
export const TableBody = styled.tbody`
  position: relative;
`;
export const TableRow = styled.tr`
  &:last-child td {
    border-bottom: none;
  }
`;

export const TableItem = styled.td`
  border-bottom: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  border-right: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  &:last-child {
    border-right: none;
  }
  padding: 16px 16px 20px 16px;
  vertical-align: top;
  text-align: left;
  word-break: break-word;
`;
export const TableItemAgency = styled.td`
  border-bottom: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  border-right: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  &:last-child {
    border-right: none;
  }
  padding: 5px;
  vertical-align: top;
  text-align: left;
`;

export const ButtonsGroup = styled.div`
  margin-top: 10px;
`;

export const IcoFileDownload = styled(FaFileDownload)`
  font-size: 11px;
  cursor: pointer;
  color: ${props => props.theme.palette.PRIMARY.MAIN};
`;

export const ContainerDownload = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

export const ContainerInput = styled.div`
  display: flex;
  gap: 20px;
      align-items: center;
      margin-top: 10px;
      margin-bottom: 10px;
`;

export const Checkbox = styled.div`
  display: flex;
  gap: 5px;
`;

export const CheckboxLabel = styled.label` text-transform: capitalize;`;

export const CheckboxInput = styled.input`
height: 1rem;
    width: 1rem;
    margin-top: 4px;
`;

export const ContainerCheckbox = styled.div`
  display: flex;
  gap: 5px;
`;

export const ContainerEmpty = styled.div`
  padding: 16px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: absolute;
`;
