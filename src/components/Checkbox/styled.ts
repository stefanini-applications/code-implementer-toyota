import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Check = styled.input`
  margin-right: 5px;
  cursor: pointer;
`;

export const Label = styled.p`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
`;
