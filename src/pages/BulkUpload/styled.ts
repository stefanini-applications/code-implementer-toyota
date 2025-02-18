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
    min-height: 200vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  `

export const FormBox = styled.div`
  padding: 1rem;
  background-color: #f4f4f4;
  margin-top: 2rem;
`

export const HeadingText = styled.h2`
  padding: 15px 0px 20px;
  font-size: 1.2rem;
`

interface LabelProp {
    noMargin?: boolean;
  }
  
  export const Label = styled.p<LabelProp>`
    font-size: 11px;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
    color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
    margin-bottom: ${props => (props.noMargin ? undefined : '12px')};
    margin-top: ${props => (props.noMargin ? undefined : '-4px')};
  `;

  export const EditorBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 10px 20px;
`;