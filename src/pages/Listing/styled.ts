import { FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';

import { transparentize } from 'polished';
import styled from 'styled-components';

interface IBackgroundColor {
  backgroundColor?: string;
}

export const Container = styled.div`
  padding-bottom: 20px;
  max-width: 1240px;
  min-width: 940px;
  margin: auto;
  padding: 0px 10px;
`;

export const TableList = styled.table`
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-radius: 8px;
  border-spacing: 0;
  font-size: 14px;
`;

export const TableHead = styled.thead``;
export const TableHeadItem = styled.th`
  font-weight: bold;
  text-align: left;
  border-bottom: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  background-color: ${props => props.theme.palette.PRIMARY.MAIN_FOUR};
  color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};

  &:last-child {
    border-right: none;
    border-radius: 0 8px 0 0;
  }

  &:first-child {
    border-radius: 8px 0 0 0;
  }

  padding: 5px;
`;
export const TableBody = styled.tbody``;
export const TableRow = styled.tr`
  &:last-child td {
    border-bottom: none;
  }
`;
export const TableItem = styled.td`
  border-bottom: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  &:last-child {
    border-right: none;
  }
  padding: 5px;
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

export const ContainerListing = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const ListingItem = styled.div`
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  /* max-height: 30px; */
  position: relative;
  padding: 13px 22px;
  border-radius: 10px;
  min-width: 45.8%;
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-self: start;
`;

export const TitleClass = styled.div`
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  button {
    font-size: 14px;
  }
`;

export const ItemTitle = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  button {
    margin-right: 30px;
  }
`;

export const LabelTitle = styled.p`
  font-weight: bold;
  color: ${props => props.theme.palette.GREYSCALE.GREY_TWO};
`;

export const TextTitle = styled.div``;

export const ArrowDown = styled(FaChevronDown)`
  position: absolute;
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  right: 22px;
  top: 22px;
  font-size: 15px;
  cursor: pointer;
`;

export const ArrowUp = styled(FaChevronUp)`
  position: absolute;
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  right: 22px;
  top: 15px;
  font-size: 15px;
  cursor: pointer;
`;

export const BigCircle = styled.div<IBackgroundColor>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 25px;
  border-radius: 25px;
  background-color: ${({ backgroundColor }) => backgroundColor}; ;
`;

export const BigCircleText = styled.p`
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-radius: 6px;
  width: 324px;
  margin-bottom: 8px;
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

export const SectionJurisdiction = styled.div`
  display: flex;
  margin: 10px 0;
`;

export const ContainerJurisdiction = styled.div``;

export const TitleJurisdiction = styled.h3`
  color: ${props => props.theme.palette.GREYSCALE.GREY_FIVE};
`;

export const ContainerList = styled.ul`
  display: flex;
  list-style: none;
  gap: 10px;
  margin-top: 5px;
  flex-direction: column;
`;

export const List = styled.li`
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
  color: ${props => props.theme.palette.PRIMARY.MAIN};
`;

export const JurisdictionsContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;
