import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: transparent;
`;

export const TabContent = styled.div`
  padding: 10px;
`;

export const TabWithContent = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  outline: none;
  background-color: transparent;
  padding: 7px 20px;
  cursor: pointer;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
  font-weight: 700;
  border-radius: 8px;
  @media (max-width: 1200px) {
    font-size: 0.7em;
    padding: 7px 15px;
  }

  &.tab-has-content {
    color: ${props => props.theme.palette.PRIMARY.MAIN};
  }

  &.active {
    box-shadow: 0px 1px 4px -1px rgba(70, 70, 70, 0.31),
      inset 0px -1px 1px rgba(206, 204, 204, 0.27);
    background-color: ${props => props.theme.palette.PRIMARY.WHITE};
    color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
  }
`;

export const TabWithNoContent = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  outline: none;
  background-color: transparent;
  padding: 7px 20px;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: 700;
  border-radius: 8px;
  @media (max-width: 1200px) {
    font-size: 0.7em;
    padding: 7px 15px;
  }
`;
