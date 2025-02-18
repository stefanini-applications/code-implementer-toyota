import { IoMdClose } from 'react-icons/io';
import { MdKeyboardArrowRight, MdEdit } from 'react-icons/md';

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
  z-index: 99999999999999;
  backdrop-filter: blur(4px);
  label {
    font-size: 14px;
    color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
    margin-bottom: 4px;
  }
`;

export const XIcon = styled(IoMdClose)`
  cursor: pointer;
  font-size: 17px;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
`;
export const TitleModal = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  padding-bottom: 20px;
  margin-bottom: 20px;
  position: fixed;
  background-color: ${props => props.theme.palette.PRIMARY.WHITE};
  z-index: 100;
  width: 960px;
  padding: 20px 40px;
  border-radius: 10px 10px 0 0;
  box-shadow: 0px 4px 21px rgba(0, 0, 0, 0.06), 0px 1px 4px rgba(0, 0, 0, 0.03);
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
  padding-bottom: 20px;
`;
export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`;
export const BreadCrumbsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const BreadCrumbs = styled.span`
  font-size: 12px;
  margin-left: 3px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
  &:hover {
    color: ${props => transparentize(0.4, props.theme.palette.TEXT.PRIMARY)};
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const CurrentPage = styled.p`
  font-size: 12px;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
`;

export const ArrowDown = styled(MdKeyboardArrowRight).attrs(props => ({
  ...props,
  size: 16,
  color: transparentize(0.1, props.theme.palette.TEXT.PRIMARY)
}))`
  opacity: 0.8;
`;

export const PDFIcon = styled.img`
  height: 30px;
  width: 30px;
  margin-right: 10px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
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
  margin: 10px 10px 10px 10px;
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
  justify-content: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const Label = styled.p`
  font-size: 11px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
  margin-bottom: 8px;
`;

export const MainSectionText = styled.p`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  .input-casnum {
    width: auto;
    max-width: fit-content;
    margin: 0;
  }
`;
export const JurisdictionSection = styled.p`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  input {
    border: none !important;
    padding: 0 !important;
    &:focus {
      box-shadow: none !important;
    }
  }
  .jurisdiction-input {
    padding: 6px 10px;
  }
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
    width: 100%;
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
  background: rgba(160, 166, 177, 0.56);
  position: absolute;
`;
