import { FaSearch, FaTrashAlt } from 'react-icons/fa';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { MdKeyboardArrowRight, MdEdit } from 'react-icons/md';

import { transparentize } from 'polished';
import styled from 'styled-components';

interface ISelectedTab {
  selected: boolean;
}

export const Container = styled.div`
  max-width: 1240px;
  min-width: 940px;
  padding: 0 10px 20px 10px;
  margin: auto;
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

export const TabsWrapper = styled.div`
  display: inline-block;
  padding: 4px 6px;
  background-color: ${props => props.theme.palette.BACKGROUND.PROFILE};
  margin-bottom: 5px;
  border-radius: 8px;
  width: calc(100% - 10px);
  div {
    justify-content: center;
  }
`;

export const ContainerLabelTable = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const ContainerPagination = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  align-items: center;
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-radius: 6px;
  width: 324px;
`;

export const SearchField = styled.input`
  display: flex;
  flex: 1;
  padding: 0 !important;
  margin-left: 5px;
  border: none !important;
  background-color: transparent;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  outline: none;
`;

export const SearchIcon = styled(FaSearch).attrs(props => ({
  ...props,
  size: 14,
  color: props.theme.palette.GREYSCALE.GREY_TWO
}))``;

export const Label = styled.p`
  font-size: 11px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
  margin-bottom: 8px;
`;

export const Pagination = styled.div`
  display: flex;
  gap: 10px;
`;

export const RowContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
  input {
    border: none !important;
    &:focus {
      box-shadow: none !important;
    }
  }
`;

export const ItemsPerPage = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  margin: 0 7px 0 3px;
  color: ${props => props.theme.palette.TEXT.TERTIARY};
`;

export const ContainerTable = styled.div`
  padding: 20px;
  border: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  border-radius: 0 8px 8px 8px;
`;

export const ContainerButtons = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;

  button {
    height: 34px;
  }
`;

export const SubstanceUseNameSection = styled.p`
  font-size: 2px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  .input-commonname {
    max-width: 100%;
    width: 100%;
  }
  .input-commonname > input {
    max-width: 100%;
    width: 100%;
  }
  margin-bottom: 7px;
`;

export const SubtabsWrapper = styled.div`
  display: flex;
  gap: 10px;
  border-bottom: 3px solid #e1e1e1;
  width: auto;
`;

export const Subtabs = styled.div<ISelectedTab>`
  margin-bottom: -3px;
  padding-bottom: 5px;
  color: ${({ selected }) =>
    selected
      ? props => props.theme.palette.PRIMARY.MAIN
      : props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-bottom: 3px solid;
  border-color: ${({ selected }) =>
    selected ? props => props.theme.palette.PRIMARY.MAIN : '#e1e1e1'};
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
`;

export const SubtabsSelected = styled.div`
  border-bottom: 3px solid ${props => props.theme.palette.PRIMARY.MAIN};
  margin-bottom: -3px;
  padding-bottom: 5px;
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
`;
