import { FaFileDownload } from 'react-icons/fa';
import { MdKeyboardArrowRight, MdEdit } from 'react-icons/md';

import { transparentize } from 'polished';
import styled from 'styled-components';
import { Spin } from 'antd';

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
`;

export const ContainerGeneralSection = styled.div`
  display: flex;
`;

export const WrapperFirstDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
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

export const BreadCrumbs = styled.a`
  font-size: 12px;
  margin-left: 3px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
  text-decoration: none;

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
  align-items: flex-start;
  justify-content: space-between;
  margin: 25px 0 0;
  padding-right: 10px;
  padding-left: 10px;
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

export const ContentPhaseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 25px 0px 0px;
  align-items: center;
button {
    margin-right: -25px;
    svg {
      width: 14px;
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
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
  text-transform: capitalize;
`;

export const BigCircle = styled.div<IBackgroundColor>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background-color: ${props => props.theme.palette.PHASE.ZERO_ONE};
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

export const ReadMoreButton = styled.p`
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  text-decoration: underline;
  cursor: pointer;
  font-size: 11px;
  margin-top: 5px;
`;

export const GeneralSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px 20px 0px;
  padding-right: 10px;
  padding-left: 10px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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

export const TextExecSummary = styled.p`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
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
  justify-content: center;
  z-index: 200;
  cursor: pointer;
  display: none;
  border: 1px solid ${props => props.theme.palette.PRIMARY.MAIN};
  padding: 3px 10px;
  border-radius: 20px;
  box-shadow: 0px 0px 25px -2px rgba(0, 0, 0, 0.23);
  background-color: ${props => props.theme.palette.PRIMARY.MAIN};
  color: ${props => props.theme.palette.PRIMARY.WHITE};
  gap: 5px;
`;

export const ContainerIconScroll = styled.div`
  svg {
    color: ${props => props.theme.palette.PRIMARY.WHITE};
    font-size: 20px;
    padding-top: 3px;
  }
`;

export const ContainerNameScroll = styled.div`
  font-size: 11px;
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

export const LoadingIndicator = styled(Spin)`
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  
`;