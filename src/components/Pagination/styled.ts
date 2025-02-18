import styled from 'styled-components';

export const Container = styled.div`

  a {
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
`;
