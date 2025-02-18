import styled from 'styled-components';


export const Label = styled.p`
font-size: 11px;
font-weight: bold;
font-family: 'Roboto', sans-serif;
color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
`;

export const PhaseCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background-color: ${props => props.theme.palette.PHASE.ZERO_ONE};
`;