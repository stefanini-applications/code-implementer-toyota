import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 20px;

  .ant-transfer-list-body-customize-wrapper {
    height: 340px;
    overflow: auto;
  }

  .ant-tree-list {
    height: 307px !important;
  }

  .ant-transfer-list {
    width: 50%;
  }

  .ant-pagination {
    display: flex;
    justify-content: flex-end;
    padding-right: 15px;
  }

  .ant-transfer-list-content {
    height: 340px;
  }

  .ant-checkbox-input {
    z-index: 10;
  }
`;

export const SelectComponent = styled.div`
  flex-direction: column;
  display: flex;
  gap: 10px;
`;