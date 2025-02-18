import styled from 'styled-components';

export const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: 402,
    'border-radius': '6px'
  }),
  control: (provided, state) => ({
    ...provided,
    'border-radius': '6px',
    border: state.isFocused ? `1px solid #5F99FE` : `1px solid #A0A6B1`,
    transition: 'all 0.3s ease',
    'box-shadow': state.isFocused ? `0px 0px 0px 4px #DAE7FE` : '',
    fontSize: '14px'
  }),
  container: (provided, state) => ({
    ...provided,
    width: 402
  })
};

export const Container = styled.div`
  .ant-select-selection-overflow {
    max-height: 300px;
    overflow-y: auto;
  }
`;
