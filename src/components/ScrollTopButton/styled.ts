import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  right: 10px;
  bottom: 10px;
  align-items: center;
  justify-content: center;
  z-index: 200;
  cursor: pointer;
  display: none;
  border: 1px solid ${props => props.theme.palette.PRIMARY.MAIN};
  padding: 3px 10px;
  border-radius: 20px;
  box-shadow: 0px 0px 25px -2px rgba(0, 0, 0, 0.23);
  background-color: ${props => props.theme.palette.PRIMARY.MAIN};
  color: ${props => props.theme.palette.PRIMARY.WHITE};
  gap: 5px;
`;

export const ContainerIconScroll = styled.div`
  svg {
    color: ${props => props.theme.palette.PRIMARY.WHITE};
    font-size: 20px;
    padding-top: 3px;
  }
`;

export const ContainerNameScroll = styled.div`
  font-size: 11px;
`;
