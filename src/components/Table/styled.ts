import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  tr:last-child td:first-child{
    border-bottom-left-radius: 8px;
  }

  tr:last-child td:last-child {
    border-bottom-right-radius: 8px;
  }

  th, td, .ant-table-container {
     border-color: ${props => props.theme.palette.TABLE.BORDER} !important;
  }

  .ant-table-wrapper .ant-table-tbody > tr.ant-table-row:hover > td,
  .ant-table-wrapper .ant-table-tbody > tr > td.ant-table-cell-row-hover {
    background: none;
  }

   .ant-table-wrapper, .ant-table-thead, th.ant-table-column-sort{
   background: #f7f7f7;
   }

      .ant-table-wrapper, td.ant-table-column-sort:hover{
      background: none;
      }
      .ant-table-wrapper .ant-table-thead th.ant-table-column-sort{
      background: #f7f7f7;
      }
      .ant-table-wrapper td.ant-table-column-sort{
      background: #ffffff;
      }

  .ant-table-thead > tr > th {
    background: #f7f7f7;
  }

  .ant-pagination a {
    text-decoration: none;
  }

  .ant-pagination-item-active a {
    color: ${props => props.theme.palette.PRIMARY.MAIN};
  }

  .ant-pagination-item-active {
    border-color: ${props => props.theme.palette.TABLE.BORDER};
  }

  .ant-pagination-options-size-changer:hover {
    border-color: ${props => props.theme.palette.PRIMARY.MAIN};
  }

  .ant-select-item-option-selected {
    background-color: ${props =>
      props.theme.palette.PRIMARY.MAIN_FOUR} !important;
  }

  .ant-table-cell {
    border-color:  ${props => props.theme.palette.TABLE.BORDER};
  }

  // table {
  //   border-left: 1px solid ${props => props.theme.palette.TABLE.BORDER} !important;
  //   border-bottom: 1px solid ${props => props.theme.palette.TABLE.BORDER} !important;
  // }

  // .ant-table-cell {
  //   border-top: 1px solid ${props => props.theme.palette.TABLE.BORDER} !important;
  //   border-right: 1px solid ${props => props.theme.palette.TABLE.BORDER} !important;
  // }
`;

export const CommentUpdate = styled.div``;

export const ContainerComments = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

export const ContainerEdit = styled.div`
  /* min-width: 102px; */
  width: auto;
`;
