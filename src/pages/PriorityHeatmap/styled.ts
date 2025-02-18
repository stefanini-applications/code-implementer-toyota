import styled from 'styled-components';

export const ContainerHeatmap = styled.div`
  padding-bottom: 20px;
  max-width: 1240px;
  min-width: 940px;
  margin: auto;
  padding-right: 30px;
  padding-left: 30px;
`;
export const TitleContainer = styled.div`
  display: flex;
  background-color: ${props => props.theme.palette.PRIMARY.MAIN_FOUR};
  padding: 6px 10px;
  border-radius: 4px;
  margin-top: 20px;
  margin-bottom: 15px;
`;
export const Title = styled.p`
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: ${props => props.theme.palette.GREYSCALE.DARK};
`;