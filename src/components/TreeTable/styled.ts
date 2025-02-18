import styled from 'styled-components';

export const Container = styled.div`
  .ant-table-content {
    border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
    border-radius: 8px;
    overflow: hidden;
    overflow-x: auto;
  }

  th {
    background: ${props => props.theme.palette.PRIMARY.MAIN_FOUR} !important;
    font-weight: bold;
  }
`;