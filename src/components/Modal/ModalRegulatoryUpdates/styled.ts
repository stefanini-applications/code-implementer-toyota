import { FaChevronDown, FaTrashAlt } from 'react-icons/fa';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';

import styled from 'styled-components';

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

  label {
    font-size: 14px;
    color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
    margin-bottom: 4px;
  }

  input {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
  }

  @media (max-width: 1040px) {
    justify-content: unset;
  }
`;

export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background-color: ${props => props.theme.palette.GREYSCALE.TRANSLUCENT_THREE};
  position: absolute;
`;

export const XIcon = styled(IoMdClose)`
  cursor: pointer;
  font-size: 17px;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
`;

export const ContainerModalItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  height: 100%;
`;

export const ToggleItem = styled.div`
  margin-top: 50px;
  padding-left: 40px;
  padding-right: 40px;
  &:first-child {
    margin-top: 0px;
  }
`;

export const ContainerToggles = styled.div`
  padding-bottom: 20px;
  margin-top: 60px;
  overflow-y: scroll;
  height: 90%;
  padding-top: 10px;
  padding: 10px 0px 20px 0px;
  overflow-x: hidden;
  border-radius: 8px;
  margin-bottom: 73px;

  .item-attachments {
    margin-bottom: 20px;
  }
`;

export const ContainerSave = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
  /* box-shadow: 1px 1px 21px rgb(0 0 0 / 6%), 0px 1px 4px rgb(0 0 0 / 3%); */
  padding-bottom: 20px;
  margin-bottom: 20px;
  position: fixed;
  background-color: ${props => props.theme.palette.PRIMARY.WHITE};
  z-index: 100;
  width: 960px;
  padding: 20px 40px;
  border-radius: 00px 0px 10px 10px;
  /* border-top: 1px solid ${props =>
    props.theme.palette.GREYSCALE.GREY_TWO}; */
  bottom: 18px;

  @media (max-width: 1040px) {
    width: 880px;
  }
`;

export const CancelButton = styled.a`
  text-decoration: underline;
  cursor: pointer;
`;

export const UpdateModal = styled.div`
  border-radius: 10px;
  width: 1040px;
  height: 90%;
  background-color: ${props => props.theme.palette.BACKGROUND.DEFAULT};
  box-shadow: 0px 4px 21px rgba(0, 0, 0, 0.28), 0px 1px 4px rgba(0, 0, 0, 0.16);

  z-index: 100;
  position: relative;

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

export const IcoChevronDown = styled(FaChevronDown)`
  font-size: 15px;
  color: ${props => props.theme.palette.PRIMARY.MAIN};
`;

export const TitleToggle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  /* border-bottom: 1px solid ${props =>
    props.theme.palette.GREYSCALE.GREY_TWO}; */
  /* padding-bottom: 2px; */
  font-weight: 700;
  color: ${props => props.theme.palette.GREYSCALE.GREY_FIVE};
  font-size: 14px;

  /* background-color: ${props => props.theme.palette.PRIMARY.MAIN_FOUR}; */
  border-radius: 4px;
  margin-top: 10px;
`;

export const TitleModal = styled.div`
  font-size: 14px;
  display: flex;
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

export const SuccessModal = styled.div`
  border: 1px solid red;
  position: absolute;
  right: 0;
  top: 40px;
  border: 3px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: white;
  padding: 30px 25px;
  max-width: 595px;

  svg {
    font-size: 75px;
    color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
  }

  .div-container-success {
    display: flex;
    gap: 10px;
  }

  .div-text-title-success {
    font-size: 24px;
    color: ${props => props.theme.palette.GREYSCALE.DARK_TWO};
    font-weight: 700;
    border-bottom: 1px solid ${props => props.theme.palette.TEXT.CONTRAST_ONE};
    padding-bottom: 10px;
  }

  .div-text-desc-success {
    font-size: 36px;
    color: ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  }
`;

export const ContainerSuccess = styled.div`
  background: rgba(255, 255, 255, 0.45);
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: none;
  z-index: 11;
`;

export const AddAttachment = styled.div`
  text-align: left;
  margin-bottom: 10px;
  margin-top: 5px;
`;

export const BtnAddAttachment = styled.button`
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  text-decoration: underline;
  padding: 0;
  border: 0;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  font-size: 14px;
  margin-top: 10px;
`;

export const ContainerDates = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SectionTitle = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
`;

export const DateRightSide = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DateLabel = styled.label`
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
`;

export const RowWrapper = styled.div`
  display: flex;
  gap: 15px;
`;

export const DateLeftSide = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DateColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ContentToggle = styled.div`
  padding-top: 10px;
`;

export const TitleDate = styled.p`
  color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
  font-size: 24px;
`;

export const AttachmentsWrapperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AttachmentsInputContainer = styled.div`
  margin-top: 10px;
`;

export const AttachmentsInput = styled.input`
  display: flex;
  height: 40px;
  width: 100%;
  padding: 0 5px 0 5px;
`;

export const AttachmentsButton = styled.input`
  display: none;
`;

export const AttachmentsLabel = styled.label`
  border: none;
  border-radius: 4px;
  background-color: ${props => props.theme.palette.BUTTON.BACKGROUND};
  border-radius: 3px;
  color: white;
  font-size: 16px;
  display: block;
  outline: none;
  cursor: pointer;
  padding: 10px 25px;
  transition: all 0.5s ease;
  color: ${props => props.theme.palette.PRIMARY.WHITE} !important;
  position: relative;
  border: none;
  box-shadow: inset 2px 3px 4px ${props => props.theme.palette.BUTTON.LIGHT},
    inset -2px -3px 4px ${props => props.theme.palette.BUTTON.SHADOW};
  border-radius: 8px;
  background: ${props => props.theme.palette.BUTTON.BACKGROUND};
  font-size: 16px;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  outline: none;
  padding: 7px 20px;
  transition: all 0.5s ease;

  &:hover {
    background: ${props => props.theme.palette.BUTTON.HOVER};
    box-shadow: none;
    cursor: pointer;
  }

  &:active {
    box-shadow: inset 2px 2px 4px rgba(5, 37, 152, 0.62);
    transition: all 0s;
  }
`;

export const Touchable = styled.button`
  padding: 0;
  border: 0;
  outline: none;
  cursor: pointer;
  background-color: transparent;
`;

export const RemoveAttachment = styled(FaTrashAlt)`
  height: 15px;
  width: 15px;
  margin-left: 5px;
`;

export const OverlayDateRange = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  left: -300px;
  top: 0;
`;

export const DatePickerContainer = styled.div`
  position: absolute;
  border: 1px solid grey;
  border-radius: 8px;
  z-index: 2000;
  top: 63px;
  left: 0;
  box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.17), 0px 2px 4px rgba(0, 0, 0, 0.05);

  @media (max-width: 1000px) {
    top: 322px;
  }

  input {
    width: 100% !important;
    padding: inherit;
    border: none;

    &:focus {
      border: none;
      box-shadow: none;
    }
  }

  &:first-child {
    border: 1px solid grey;
    border-radius: 8px;
    &:first-child {
      border-radius: 8px;
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

export const Warning = styled(HiOutlineExclamationCircle).attrs(props => ({
  ...props,
  size: 16,
  color: props.theme.palette.ERROR.DARK
}))`
  margin-right: 7px;
`;

export const AlertText = styled.p`
  color: #FF4D4F;
  font-family: 'Roboto Light', sans-serif;
  font-size: 14px;
  margin-top: 10px;
  padding-left: 5px;
`;

export const ContainerDatePicker = styled.div`
  input {
    border: none;
  }
`;

export const ContainerFilesUploaded = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ContainerRemoveAttachments = styled.div`
  display: flex;
  gap: 5px;
  color: ${props => props.theme.palette.BUTTON.BACKGROUND_ERROR};
  text-decoration: underline;
  font-size: 14px;
  align-items: center;
`;

export const AttachmentName = styled.div`
  word-break: break-word;
`;



export const TextContiner = styled.div`
  display: flex;
`;

export const LabelText = styled.div`
  color: '#676d7c';
  font-weight: 700;
  padding-right: 10px;
`;
export const LabelConText = styled.div`
  color: '#2E53D7';
`;