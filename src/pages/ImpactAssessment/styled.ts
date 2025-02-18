import { AiFillPlusCircle } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';

import { transparentize } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px 20px;
`;

export const TitleContainer = styled.div`
  display: flex;
  background-color: ${props => props.theme.palette.PRIMARY.MAIN_FOUR};
  padding: 6px 10px;
  border-radius: 4px;
`;

export const NewRecord = styled(AiFillPlusCircle).attrs(props => ({
  ...props,
  size: 20,
  color: props.theme.palette.TEXT.CONTRAST_ONE
}))`
  margin-left: 4px;
`;

export const Pagination = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: flex-end;
`;

export const NewImpactBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
`;
export const Label = styled.p`
  font-size: 11px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
  margin-bottom: 8px;
`;

export const ContainerTags = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: -5px;
`;

export const TabsContainer = styled.div`
  margin-top: 10px;
`;

export const Title = styled.p`
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: ${props => props.theme.palette.GREYSCALE.DARK};
`;

export const TagsContainer = styled.div`
  display: flex;
  gap: 45px;
  margin: 0 12px;
  @media (max-width: 1000px) {
    flex-wrap: wrap;
    gap: 10px;
    div {
      margin-bottom: 10px;
      margin-right: 20px;
    }
  }
`;

export const Touchable = styled.button`
  padding: 0;
  border: 0;
  outline: none;
  background-color: transparent;
  position: relative;
  button {
  }
  svg {
    width: 14px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 12px 15px;
  align-items: baseline;
`;

export const SectionTitle = styled.p`
  font-size: 11px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: ${props => transparentize(0.4, props.theme.palette.TEXT.PRIMARY)};
`;

export const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const RecordsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: transparent;
  margin-bottom: 10px;
`;

export const ContainerLoading = styled.div`
  position: absolute;
  z-index: 13;
  width: 100%;
  height: calc(100% - 57px);
  display: flex;
  justify-content: center;
  align-items: center;
  top: 57px;
  background-color: rgba(255, 255, 255, 0.5);
`;

export const EditSection = styled.div`
  display: flex;
  justify-content: flex-end;
`;

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
  size: 13,
  color: props.theme.palette.GREYSCALE.GREY_THREE
}))``;

export const DisabledTextInfo = styled.div`
  position: absolute;
  background-color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
  color: white;
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 12px;
  left: 0px;
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

export const ContainerButtonImpact = styled.div``;

export const ContainerButton = styled.div`
  position: relative;
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
