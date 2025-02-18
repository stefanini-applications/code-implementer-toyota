import styled from 'styled-components';


const theme = {
    container: {
      maxWidth: '1240px',
      minWidth: '940px',
      padding: '15px 10px 20px'
    }
  }

export const Container = styled.div`
    max-width: ${theme.container.maxWidth};
    min-width: ${theme.container.minWidth};
    margin: auto;
    padding: ${theme.container.padding};
    min-height: 100%;
    padding-bottom: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  `

  export const HeadingText = styled.h2`
  padding: 5px 0px 5px;
  font-size: 1rem;
`

export const ReportBox = styled.div`
  padding: 1rem;
  background-color: #f4f4f4;
  margin-top: 1rem;
`

export const Label = styled.p`
font-size: 11px;
font-weight: bold;
font-family: 'Roboto', sans-serif;
color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
`;

export const Text = styled.p`
font-size: 14px;
color: ${props => props.theme.palette.GREYSCALE.DARK_TWO};
padding: 10px 0px;
`;