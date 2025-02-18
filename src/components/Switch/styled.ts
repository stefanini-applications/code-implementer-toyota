import styled from 'styled-components';

export const DisableContainer = styled.div`
  display: flex;
  padding: 4px 3px;
  border-radius: 40px;
  width: 60px;
  background-color: ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  align-items: center;
  justify-content: space-between;
  color: ${props => props.theme.palette.OTHERS.DARK_GREY};
  font-size: 10px;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
`;

export const Disable = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${props => props.theme.palette.OTHERS.GREY};
  background: ${props => props.theme.palette.PRIMARY.WHITE};
  box-shadow: 0px 2px 4px -2px rgba(70, 70, 70, 0.94),
    inset 0px -1px 1px rgba(206, 204, 204, 0.81);
`;

export const ActiveContainer = styled.div`
  display: flex;
  padding: 4px 3px;
  border-radius: 40px;
  width: 60px;
  align-items: center;
  justify-content: space-between;
  font-size: 10px;
  color: ${props => props.theme.palette.TEXT.CONTRAST_TWO};
  background-color: ${props => props.theme.palette.PRIMARY.MAIN};
  cursor: pointer;
`;

export const Active = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${props => props.theme.palette.OTHERS.SWEET_GREEN};
  background: ${props => props.theme.palette.PRIMARY.WHITE};
  box-shadow: 0px 2px 4px -2px rgba(70, 70, 70, 0.94),
    inset 0px -1px 1px rgba(206, 204, 204, 0.81);
`;
