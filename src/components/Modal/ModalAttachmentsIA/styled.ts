import { FaSearch } from 'react-icons/fa';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
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

export const XIcon = styled(IoMdClose)`
  cursor: pointer;
  font-size: 20px;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
`;
export const TitleModal = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  align-items: center;
  /* border-bottom: 1px solid ${props =>
    props.theme.palette.GREYSCALE.GREY_TWO}; */
  padding-bottom: 20px;
  /* position: fixed; */
  background-color: ${props => props.theme.palette.PRIMARY.WHITE};
  z-index: 100;
  width: 960px;
  padding: 20px 40px;
  border-radius: 10px 10px 0 0;
  /* box-shadow: 0px 4px 21px rgba(0, 0, 0, 0.06), 0px 1px 4px rgba(0, 0, 0, 0.03); */

  @media (max-width: 1040px) {
    width: 880px;
  }
`;

export const UpdateModal = styled.div`
  border-radius: 10px;
  width: 1040px;
  height: 90%;
  background-color: ${props => props.theme.palette.BACKGROUND.DEFAULT};
  box-shadow: 0px 4px 21px rgba(0, 0, 0, 0.28), 0px 1px 4px rgba(0, 0, 0, 0.16);

  z-index: 100;
  position: relative;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 1040px) {
    width: 960px;
    min-width: 960px;
    margin: auto;
  }

  transform: scale(1);
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

export const BreadCrumbs = styled.a`
  text-decoration: none;
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

export const ContainerApplicationArea = styled.div``;

export const ContainerPagination = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 10px;
  align-items: center;
`;

export const ContainerButtons = styled.div`
  display: flex;
  gap: 5px;
  align-items: flex-start;
  justify-content: center;

  button {
    height: 34px;
  }
`;

export const ContainerTabs = styled.div`
  display: flex;
  gap: 10px;
`;

export const Pagination = styled.div`
  display: flex;
  gap: 10px;
`;

export const ContainerApplicationFilter = styled.div``;

export const Search = styled.div`
  display: flex;
  align-items: center;
  width: 324px;
  input {
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
  }
`;

export const SearchIcon = styled(FaSearch).attrs(props => ({
  ...props,
  size: 14,
  color: props.theme.palette.GREYSCALE.GREY_TWO
}))``;

export const ContainerEditInput = styled.div`
display: flex;
gap: 20px;
flex-direction: column;
  form > div {
      margin-bottom: 0;
    }
  }
`;

export const DescriptionText = styled.span`
  word-break: break-word;
`;

export const ContainerTable = styled.div``;

interface IcoEditProp {
  isdisabled: string;
}

export const IcoEdit = styled(MdEdit)<IcoEditProp>`
  cursor: pointer;
  font-size: 20px;
  pointer-events: ${({ isdisabled }) =>
    isdisabled === 'true' ? 'none' : undefined};
  cursor: ${({ isdisabled }) => (isdisabled === 'true' ? 'auto' : 'pointer')};
  color: ${({ isdisabled }) =>
    isdisabled === 'true'
      ? props => props.theme.palette.GREYSCALE.GREY_TWO
      : props => props.theme.palette.PRIMARY.MAIN};
`;

export const ContainerEditText = styled.div`
  // width: 120px;
  height: 25.5px;
`;

export const ContainerCheckbox = styled.div``;

export const ContainerFileUpload = styled.div`
`;

export const ContainerFileDescription = styled.div`
  max-width: 400px;
`;

export const ContainerAttachmentFileName = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
`;

export const AttachmentName = styled.div`
  word-break: break-word;
`;

export const ContainerFile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

export const SelectFileBtn = styled.div`
width: 200px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 84%;
  padding: 0 40px;

  max-height: 100%;
  width: 960px;
`;

interface LabelProp {
  noMargin?: boolean;
}

export const Label = styled.p<LabelProp>`
  font-size: 11px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
  margin-bottom: ${props => (props.noMargin ? undefined : '8px')};
`;

export const RequiredLabel = styled.p<LabelProp>`
  font-size: 11px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
  margin-bottom: ${props => (props.noMargin ? undefined : '8px')};
  &::before {
      display: inline-block;
  margin-inline-end: 4px;
  color: #ff4d4f;
  font-size: 14px;
  font-family: SimSun,sans-serif;
  line-height: 1;
  content: "*";
  font-weight: 400;
}
  }
`;

export const BigCircle = styled.div<IBackgroundColor>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background-color: ${({ backgroundColor }) => backgroundColor};
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
export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background-color: ${props => props.theme.palette.GREYSCALE.TRANSLUCENT_THREE};
  position: absolute;
`;

export const ErrorContainer = styled.div`
  color: #ff4d4f;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  margin-top: -20px;
`;
