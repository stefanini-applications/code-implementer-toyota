import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';

import { transparentize } from 'polished';
import styled from 'styled-components';

interface IBackgroundColor {
  backgroundColor?: string;
}

export const Container = styled.div`
  display: flex;
  height: 100%;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: ${props => props.theme.palette.GREYSCALE.TRANSLUCENT_THREE};
  align-items: center;
  justify-content: center;
  z-index: 90;
  /* backdrop-filter: blur(4px); */

  @media (max-width: 1040px) {
    justify-content: unset;
  }

  label {
    font-size: 14px;
    color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
    margin-bottom: 4px;
  }

  input {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
  }
`;

export const CloseIcon = styled(IoMdClose)`
  cursor: pointer;
  font-size: 20px;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
`;

export const TitleModal = styled.div`
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  align-items: center;
  /* border-bottom: 1px solid ${props =>
    props.theme.palette.GREYSCALE.GREY_TWO}; */
  padding-bottom: 20px;
  margin-bottom: 20px;
  position: fixed;
  background-color: ${props => props.theme.palette.PRIMARY.WHITE};
  z-index: 100;
  width: 960px;
  padding: 20px 40px;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
  /* box-shadow: 0px 4px 21px rgba(0, 0, 0, 0.06), 0px 1px 4px rgba(0, 0, 0, 0.03); */

  @media (max-width: 1040px) {
    width: 880px;
  }
`;

export const UpdateModal = styled.div`
  border-radius: 10px;
  width: 1040px;
  height: auto;
  max-height: 90%;
  background-color: ${props => props.theme.palette.BACKGROUND.DEFAULT};
  box-shadow: 0px 4px 21px rgba(0, 0, 0, 0.28), 0px 1px 4px rgba(0, 0, 0, 0.16);

  z-index: 100;
  position: relative;
  overflow-x: hidden;
  padding-bottom: 20px;

  @media (max-width: 1040px) {
    width: 960px;
    min-width: 960px;
    margin: auto;
  }

  animation: expand 0.3s 1 ease-in-out;

  @keyframes expand {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export const PDFIcon = styled.img`
  height: 30px;
  width: 30px;
  margin-right: 10px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0px 10px 00px;
  padding: 0 30px;
`;

export const MainSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 25px 0 0;
`;

export const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 10px 0px 10px 10px;
  button {
    svg {
      width: 14px;
    }
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  margin-left: 20px;
  gap: 10px;
  justify-content: flex-end;
  padding: 0 40px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

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

export const ErrorContainer = styled.div`
  color: #ff4d4f;
  font-size: 14px;
  font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
  margin-top: -20px;
`

interface MainSectionTextProp {
  marginTop?: string;
}

export const MainSectionText = styled.p<MainSectionTextProp>`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  .input-casnum {
    width: auto;
    max-width: fit-content;
    margin: 0;
    height: 20px;
  }
  margin-top: ${props => (props.marginTop ? props.marginTop : undefined)};
`;

export const BigCircle = styled.div<IBackgroundColor>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background-color: ${({ backgroundColor }) => backgroundColor}; ;
`;

export const BigCircleText = styled.p`
  font-size: 25px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
`;

export const BoldLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const BoldLabel = styled.p`
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
`;

export const EditRecord = styled(MdEdit).attrs(props => ({
  ...props,
  size: 16,
  color: props.theme.palette.TEXT.CONTRAST_ONE
}))`
  opacity: 0.8;
  margin-left: 5px;
`;

export const GeneralSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 10px 20px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const UnderlinedText = styled.p`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  text-decoration: underline;
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  margin-right: 25px;
  cursor: pointer;
`;

export const TextExecSummary = styled.p`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  .textarea {
    max-width: 100%;

    white-space: pre-wrap;
    word-wrap: break-word;
    textarea {
      height: 150px;
      &:focus {
        border: 1px solid ${props => props.theme.palette.PRIMARY.MAIN_TWO};
        box-shadow: 0px 0px 0px 4px
          ${props => props.theme.palette.PRIMARY.MAIN_FOUR};
      }

      &:disabled {
        background-color: ${props => props.theme.palette.GREYSCALE.GREY};
      }
    }
  }

  .textarea-nextsteps {
    textarea {
      height: 50px;
      &:focus {
        border: 1px solid ${props => props.theme.palette.PRIMARY.MAIN_TWO};
        box-shadow: 0px 0px 0px 4px
          ${props => props.theme.palette.PRIMARY.MAIN_FOUR};
      }

      &:disabled {
        background-color: ${props => props.theme.palette.GREYSCALE.GREY};
      }
    }
  }
`;

export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background-color: ${props => props.theme.palette.GREYSCALE.TRANSLUCENT_THREE};
  position: absolute;
`;

export const Warning = styled(HiOutlineExclamationCircle).attrs(props => ({
  ...props,
  size: 16,
  color: props.theme.palette.ERROR.DARK
}))`
  margin-right: 7px;
`;

export const AlertText = styled.p`
  color: ${props => props.theme.palette.ERROR.DARK};
  font-family: 'Roboto Light', sans-serif;
  font-size: 11.5px;
`;

interface DropdownContainerProp {
  marginTop?: string;
}

export const DropdownContainer = styled.div<DropdownContainerProp>`
  .rs-picker {
    width: 224px;
  }
  & > div {
    width: 165px !important;
  }
  margin-top: ${props => (props.marginTop ? props.marginTop : undefined)};
`;
export const TextField = styled.input`
  width: 165px;
  color: black;
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-radius: 6px;
  padding: 8px 11px;
  transition: all 0.3s ease;

  &:focus {
    border: 1px solid ${props => props.theme.palette.PRIMARY.MAIN_TWO};
    box-shadow: 0px 0px 0px 4px
      ${props => props.theme.palette.PRIMARY.MAIN_FOUR};
  }

  &:disabled {
    background-color: ${props => props.theme.palette.GREYSCALE.GREY};
  }
`;
export const TextAreaField = styled.textarea`
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-radius: 6px;
  padding: 8px 11px;
  transition: all 0.3s ease;
  height: 150px;
  width: 970px;

  &:focus {
    border: 1px solid ${props => props.theme.palette.PRIMARY.MAIN_TWO};
    box-shadow: 0px 0px 0px 4px
      ${props => props.theme.palette.PRIMARY.MAIN_FOUR};
  }

  &:disabled {
    background-color: ${props => props.theme.palette.GREYSCALE.GREY};
  }
`;
