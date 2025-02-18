import { FaFileDownload } from 'react-icons/fa';
import { MdKeyboardArrowRight, MdEdit } from 'react-icons/md';

import { transparentize } from 'polished';
import styled from 'styled-components';

interface IBackgroundColor {
  backgroundColor?: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  min-width: 940px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ContainerDownload = styled.div`
  width: 100%;
  display: flex;
  align-items: right;
  justify-content: right;
button {
  }
`;

export const ContainerGeneralSection = styled.div`
  display: flex;
`;

export const ItemGeneralSection = styled.div``;

export const IcoFileDownload = styled(FaFileDownload)`
  font-size: 11px;
  cursor: pointer;
  color: ${props => props.theme.palette.PRIMARY.MAIN};
`;

export const BreadCrumbsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const TextExecSummary = styled.p`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
`;

export const ReadMoreButton = styled.p`
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  text-decoration: underline;
  cursor: pointer;
  font-size: 11px;
  margin-top: 5px;
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
  width: 500px;
  word-break: break-word;
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
`;

export const MainSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 25px 0 0;
  flex: 1;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 25px 10px 0px;
button {
    margin-right: -25px;
    svg {
      width: 14px;
    }
  }
`;

export const ContainerMainSection = styled.div`
  display: flex;
  align-items: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
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
  margin-bottom: 25px;
  word-break: break-word;
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
  margin: 10px 0px 20px 0;
  table {
    border-radius: 8px !important;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  word-break: break-word;
`;

export const Text = styled.p`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  li {
    margin-left: 20px;
    display: list-item !important;
  }
  word-break: break-word;
`;

export const UnderlinedText = styled.p`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  text-decoration: underline;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  margin-right: 25px;
`;

export const DisabledTextInfo = styled.div`
  position: absolute;
  background-color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
  color: white;
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 12px;
  left: -24px;
  top: 30px;
  &::after {
    content: '';
    top: -5px;
    position: absolute;
    z-index: 10;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
    left: 46%;
  }
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.17), 0px 2px 4px rgba(0, 0, 0, 0.05);
`;

export const ContainerButton = styled.div`
  position: relative;
`;

export const ContainerScrollTop = styled.div`
  position: fixed;
  right: 10px;
  bottom: 10px;
  align-items: center;
  z-index: 200;
  cursor: pointer;
  display: none;
`;

export const ContainerIconScroll = styled.div`
  border: 1px solid ${props => props.theme.palette.PRIMARY.MAIN};
  background-color: ${props => props.theme.palette.PRIMARY.WHITE};
  padding: 5px 5px 2px 5px;
  border-radius: 20px;
  box-shadow: 0px 0px 25px -2px rgba(0, 0, 0, 0.23);
  svg {
    color: ${props => props.theme.palette.PRIMARY.MAIN};
    font-size: 20px;
  }
`;

export const ContainerNameScroll = styled.div`
  font-size: 11px;
  border: 1px solid ${props => props.theme.palette.PRIMARY.MAIN};
  background-color: ${props => props.theme.palette.PRIMARY.WHITE};
  padding: 5px 8px 5px 5px;
  border-radius: 20px 0 0 20px;
  margin-right: -5px;
  box-shadow: 0px 0px 25px -2px rgba(0, 0, 0, 0.23);
`;

export const ButtonSpace = styled.div`
  margin-top: 10px;
`;

interface MultiLineDotsProp {
  showLess?: boolean;
};

export const MultiLineDots = styled.div<MultiLineDotsProp>`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  li {
    margin-left: 20px;
    display: list-item !important;
  }
  word-break: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: ${props => props.showLess ? '6' : undefined};
  -webkit-box-orient: vertical;
  white-space: normal;
`;