import styled from 'styled-components';

interface ITab {
  fullPage?: boolean;
}

export const Container = styled.div<ITab>`
  margin-bottom: ${props => (props.fullPage ? 0 : '-17px')};

  width: ${props => (props.fullPage ? '100%' : 'calc(100% - 10px)')};

  .ant-tabs-tab-btn {
    font-weight: 600;
    color: #3e3e3e;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${props => props.theme.palette.PRIMARY.MAIN};
    font-weight: 600;
  }

  .ant-tabs-tab-active {
    cursor: default;
  }

  .ant-tabs .ant-tabs-tab:hover {
    color: ${props => props.theme.palette.PRIMARY.MAIN};
  }

  .ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab-active,
  .ant-tabs-card.ant-tabs-top > div > .ant-tabs-nav .ant-tabs-tab-active {
    border-bottom-color: white !important;
  }

  .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab,
  .ant-tabs-card
    > div
    > .ant-tabs-nav
    .ant-tabs-tab
    .ant-tabs-card
    > .ant-tabs-nav
    .ant-tabs-tab,
  .ant-tabs-card > div > .ant-tabs-nav .ant-tabs-tab {
    border: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  }

  .ant-tabs-top > .ant-tabs-nav::before,
  .ant-tabs-bottom > .ant-tabs-nav::before,
  .ant-tabs-top > div > .ant-tabs-nav::before,
  .ant-tabs-bottom > div > .ant-tabs-nav::before {
    border-bottom: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  }
`;

export const TableLine = styled.div`
  position: absolute;
  left: 0;
  margin-top: 39px;
  z-index: -1;
  width: 100%;
  height: 1px;
  background-color: ${props => props.theme.palette.TABLE.BORDER};
`;
