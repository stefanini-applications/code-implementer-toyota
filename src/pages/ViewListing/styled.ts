import { FaPlus, FaSearch, FaTrashAlt } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { MdKeyboardArrowRight } from 'react-icons/md';

import { transparentize } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px 10px;
  min-width: 940px;
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
  padding: 10px 0;
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

export const ArrowDown = styled(MdKeyboardArrowRight).attrs(props => ({
  ...props,
  size: 16,
  color: transparentize(0.1, props.theme.palette.TEXT.PRIMARY)
}))`
  opacity: 0.8;
`;

export const CurrentPage = styled.p`
  font-size: 12px;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
`;

export const ContainerTable = styled.div`
  padding: 0 10px;
  min-width: 940px;
`;

export const ContainerSelect = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  padding-bottom: 15px;
`;

export const GeneralSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px 20px;
  margin-top: -20px;
  width: 100%;
`;

export const Text = styled.p`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  word-break: break-word;
`;

export const Label = styled.p`
  font-size: 11px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
  margin-bottom: 8px;
`;

export const IcoFileDelete = styled(FaTrashAlt)`
  font-size: 20px;
  cursor: pointer;
  color: ${props => props.theme.palette.PRIMARY.MAIN};
`;

export const ContainerList = styled.div`
  padding-bottom: 70px;
`;

export const SearchIcon = styled(FaSearch).attrs(props => ({
  ...props,

  size: 14,

  color: props.theme.palette.GREYSCALE.GREY_TWO
}))``;
export const Input = styled.input`
  display: flex;
  flex: 1;
  padding: 0 !important;
  margin-left: 5px;
  border: none !important;
  background-color: transparent;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  outline: none;
  width: 100%;
`;


export const Search = styled.div`
  display: flex;
  align-items: center;
  width: 324px;
  input {
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
  }
  margin-bottom: 8px;
`;

export const ContainerLoadingSearch = styled.div`
  display: none;
  align-items: center;
  justify-content: center;

  svg {
    animation: loading 1.5s infinite ease;
    font-size: 14px;
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }
`;

export const ContainerButton = styled.div`
  display: flex;
  gap: 5px;
  text-align: right;
`;

export const UploadWrapperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 10px;
`;

export const UploadLabel = styled.label`
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

export const UploadButton = styled.input`
  display: none;
`;

export const EntireName = styled.div`
  position: absolute;
  top: 20px;
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

export const FlexSpaceBetween = styled.div`
  display: flex;
  justify-content: flex-end;
`;