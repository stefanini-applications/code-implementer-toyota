import { FaSearch } from 'react-icons/fa';

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 0 10px 10px 10px;
`;

export const TitleContainer = styled.div`
  display: flex;
  background-color: ${props => props.theme.palette.PRIMARY.MAIN_FOUR};
  padding: 6px 10px;
  border-radius: 4px;
  margin-top: 20px;
  margin-bottom: 15px;
`;

export const ContainerNameDateAck = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.p`
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: ${props => props.theme.palette.GREYSCALE.DARK};
`;

export const Label = styled.p`
  font-size: 11px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
  margin-bottom: 8px;
`;

export const ContainerDatePicker = styled.div`
  position: relative;
  display: flex;
  input {
    border: 1px solid transparent;
    border-radius: 0;
    padding: 0px 10px;
    transition: all 0.3s ease;

    &:focus {
      border: 1px solid transparent !important;
      box-shadow: unset;
    }

    &:disabled {
      background-color: ${props => props.theme.palette.GREYSCALE.GREY};
    }
  }
  p {
    margin: 6px;
  }
`;

export const ContainerJurisdiction = styled.div``;

export const ContainerTabs = styled.div`
  display: flex;
  gap: 10px;
`;

export const ContainerDate = styled.div``;

export const ContainerFilters = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

export const ContainerSearch = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
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
  size: 14,
  color: props.theme.palette.GREYSCALE.GREY_TWO
}))``;

export const PaginationContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  width: 100%;
`;

export const ContainerTable = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const ContainerImpactLinks = styled.div`
    display: flex;
    gap: 5px;
`;

export const ContainerAcknowledge = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`;
