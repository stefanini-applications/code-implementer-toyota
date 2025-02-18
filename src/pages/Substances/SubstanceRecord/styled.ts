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
  margin: auto;
  min-width: 940px;
  padding: 0 10px;
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

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

export const ContainerDownload = styled.div`
  width: 100%;
  display: flex;
  align-items: right;
  justify-content: right;
  button {
  }
`;

export const ContainerTabs = styled.div`
  display: flex;
  gap: 10px;
`;

export const ContainerImpact = styled.div``;

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
  word-break: break-word;
`;

export const ArrowDown = styled(MdKeyboardArrowRight).attrs(props => ({
  ...props,
  size: 16,
  color: transparentize(0.1, props.theme.palette.TEXT.PRIMARY)
}))`
  opacity: 0.8;
  min-width: 16px;
`;

export const PDFIcon = styled.img`
  height: 30px;
  width: 30px;
  margin-right: 10px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

export const MainSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 25px 0 0;
  gap: 20px;
`;

export const DisabledTextInfo = styled.div`
  position: absolute;
  background-color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
  color: white;
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 12px;
  left: 0px;
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

export const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  button {
    svg {
      width: 14px;
    }
  }
`;

export const InfoSection = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const DescriptionSection = styled.div``;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

export const Label = styled.p`
  font-size: 11px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
  margin-bottom: 8px;
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

export const MainSectionText = styled.p`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  word-break: break-word;
`;

export const EntireName = styled.div`
  position: absolute;
  top: 40px;
  overflow: visible;
  opacity: 0;
  pointer-events: none;
  font-size: 11px;
  background-color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
  color: ${props => props.theme.palette.PRIMARY.WHITE};
  padding: 8px 16px;
  border-radius: 10px;
  font-weight: 700;
  z-index: 100;
  box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.17), 0px 2px 4px rgba(0, 0, 0, 0.05);
  transition: 0.3s ease;
  text-align: center;
  &::after {
    content: '';
    top: -4px;
    position: absolute;
    z-index: 10;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
    left: 47%;
  }
  word-break: break-word;
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

export const GeneralSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px 20px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  row-gap: 10px;
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
export const TextItem = styled.p`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  margin-right: 15px;
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
}

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
  -webkit-line-clamp: ${props => (props.showLess ? '6' : undefined)};
  -webkit-box-orient: vertical;
  white-space: normal;
`;
