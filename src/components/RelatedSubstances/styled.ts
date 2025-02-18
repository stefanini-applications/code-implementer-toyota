import {
  FaPlus,
  FaTrashAlt,
  FaSearch,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';

import styled from 'styled-components';

export const Container = styled.div``;

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

export const CheckboxInput = styled.input``;

export const ContainerRegionFilter = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

export const ContainerSelectedRegion = styled.span`
  font-size: 14px;
`;

export const ContainerSearch = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-height:35px;
`;

export const ButtonAddContainer = styled.div`
  display: flex;
  flex-direction: flex-end;
  justify-content: end;
  margin-bottom: 10px;
  button {
  }
`;

export const IconPlus = styled(FaPlus)`
  font-size: 10px;
  color: ${props => props.theme.palette.PRIMARY.WHITE} !important;
  margin-right: 6px;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
  margin-bottom: 30px;
`;

export const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  button {
    svg {
      width: 14px;
    }
  }
`;
export const ContainerSelect = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  float: right;
`;

export const IcoFileDelete = styled(FaTrashAlt)`
  font-size: 20px;
  cursor: pointer;
  color: ${props => props.theme.palette.PRIMARY.MAIN};
`;

export const Label = styled.p`
  font-size: 11px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
  margin-bottom: 8px;
`;

export const LabelSecondary = styled.span`
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
`;

export const SpanSentenceCase = styled.span`
  text-transform: capitalize;
  font-weight: bold;
`;

export const ContainerButton = styled.div`
  position: relative;
  width: 100%;
  button {
    float: right;
  }
`;

export const UploadWrapperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 10px;
  margin-top: -14px;
`;

export const UploadLabel = styled.label`
  width: 100px;
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
  text-align: center;
  justify-content: center;
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

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const ContainerButtonGroup = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 15px 0 0 0;
  .ant-menu-submenu-title {
    width: 270px;
  }
`;

export const ContainerButtonAdd = styled.div`
  position: relative;
`;

export const FlexSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const SearchIcon = styled(FaSearch).attrs(props => ({
  ...props,
  size: 13,
  color: props.theme.palette.GREYSCALE.GREY_THREE
}))``;

export const Search = styled.div`
  display: flex;
  align-items: center;
  width: 324px;
  input {
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
  }
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

export const ContainerButtonsEditMode = styled.div`
  display: flex;
  gap: 5px;
`;

export const FilePlaceholder = styled.input`
  display: none;
`;

export const DisabledTextInfo = styled.div`
  position: absolute;
  background-color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
  color: white;
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 12px;
  left: -24px;
  z-index: 100;
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

export const ArrowDown = styled(FaChevronDown).attrs(props => ({
  ...props,
  size: 14,
  color: props.theme.palette.PRIMARY.WHITE
}))`
  cursor: pointer;
`;
export const ArrowUp = styled(FaChevronUp).attrs(props => ({
  ...props,
  size: 14,
  color: props.theme.palette.PRIMARY.WHITE
}))`
  cursor: pointer;
`;

export const ActionContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const ActionIcon = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  cursor: pointer;
  font-size: 16px;

  &:hover {
    opacity: 0.8;
  }
`;
