import { AiOutlineEdit } from 'react-icons/ai';
import { BsPlus, BsEye } from 'react-icons/bs';

import styled from 'styled-components';

export const Container = styled.div`
  .ant-table-wrapper .ant-table-tbody > tr.ant-table-row:hover > td,
  .ant-table-wrapper .ant-table-tbody > tr > td.ant-table-cell-row-hover {
    background: none;
  }

  .ant-pagination a {
    text-decoration: none;
  }

  .ant-pagination-item-active a {
    color: ${props => props.theme.palette.PRIMARY.MAIN};
  }

  .ant-pagination-item-active {
    border-color: ${props => props.theme.palette.PRIMARY.MAIN};
  }

  .ant-pagination-options-size-changer:hover {
    border-color: ${props => props.theme.palette.PRIMARY.MAIN};
  }

  .ant-select-item-option-selected {
    background-color: ${props =>
      props.theme.palette.PRIMARY.MAIN_FOUR} !important;
  }

  table {
    border-left: 1px solid ${props => props.theme.palette.TABLE.BORDER};
    border-bottom: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  }
  td {
    border-right: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  }

  .ant-table-cell {
    border-right: 1px solid ${props => props.theme.palette.TABLE.BORDER} !important;
    border-top: 1px solid ${props => props.theme.palette.TABLE.BORDER} !important;
  }
`;

// export const PaginationSearchContainer = styled.div`
// display:flex; 
// justify-content: space-between;
// margin: 20px 0 10px 0;
// `

export const ContainerFlex = styled.div`
  min-width: 102px;
  display: flex;
  flex-direction: row;
`;

export const MarginDiv = styled.div`
  width: 20px;
`;

export const BoldFont = styled.div`
  min-width: 1ch;
  max-width: 21ch;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
`;

export const KeepSpace = styled.div`
  white-space: pre-wrap;
  font-weight: bold;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PooverText = styled.div`
  max-width: 50ch;
  min-width: 20ch;
`;

export const PlusIcon = styled(BsPlus)`
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  height: 20px;
  width: 20px;
  margin-left: -2px;
`;

export const EyeIcon = styled(BsEye)`
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  height: 15px;
  width: 15px;
`;

export const EditIcon = styled(AiOutlineEdit)`
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  height: 15px;
  width: 15px;
`;

export const DisabledTextInfo = styled.div`
  position: absolute;
  background-color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
  color: white;
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 12px;
  left: -24px;
  top: 30px;
  &::after {
    content: '';
    top: -5px;
    position: absolute;
    z-index: 10;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
    left: 46%;
  }
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.17), 0px 2px 4px rgba(0, 0, 0, 0.05);
`;

export const ContainerButtonsImpact = styled.div`
  position: relative;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 0 10px 0;
`;