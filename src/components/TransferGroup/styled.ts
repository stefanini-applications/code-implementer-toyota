import { FaTrashAlt } from 'react-icons/fa';

import { Empty, List, Spin } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  height: 450px;

  .ant-empty-description {
    color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
  }

  .ant-list {
    height: 390px;
    overflow: auto;
    border: none;
    margin-top: 10px;
  }

  .ant-transfer-list-header-selected {
    content-visibility: hidden;
  }
  .ant-tree-checkbox-disabled .ant-tree-checkbox-inner:after {
    opacity: 1;
    transform: rotate(45deg) scale(1) translate(-50%, -50%);
    transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
  }
`;

// used to hide select all on left side of the transfer
export const OverlappingDiv = styled.div`
  background: ${props => props.theme.palette.PRIMARY.WHITE};
  width: 150px;
  height: 36px;
  position: absolute;
  z-index: 11;
  margin-top: 2px;
  margin-left: 2px;
  border-radius: 4px;
`;

export const ContainerNoData = styled.div`
  max-width: 80%;
  text-align: left;
  margin: auto;
  margin-top: 20px;
  ul {
    padding-left: 40px;
  }
`;

export const ContainerActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const AntEmpty = styled(Empty)`
  padding: 11px;
  .ant-empty-description {
    color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
  }
`;

export const LoadingIndicator = styled(Spin)`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AntdList = styled(List)`
  height: 100%;
  .ant-spin-nested-loading {
    height: 100%;
  }
`;

export const ContainerLoading = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const ContainerTreeLeft = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 15px 5px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 50%;
  height: 418px;
  position: relative;
`;

export const ContainerRemove = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: right;
  margin-bottom: 5px;
`;

export const ContainerListRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: right;
  width: 50%;
  height: 450px;
  position: relative;
  a {
    display: flex;
    justify-content: flex-end;
  }
`;

export const ContainerButtonTransfer = styled.div`
  button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const DeleteIcon = styled(FaTrashAlt)`
  cursor: pointer;
`;

export const ContainerTree = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
`;

export const ContainerList = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 15px 5px 0 5px;
`;

export const FlexColumns = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

export const ContainerPagination = styled.div`
  border-top: 1px ${props => props.theme.palette.GREYSCALE.GREY_SIX} solid;
`;
export const ContainerTreeList = styled.div`
  border-top: 1px ${props => props.theme.palette.GREYSCALE.GREY_SIX} solid;
`;
