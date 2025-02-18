import { FaSearch } from 'react-icons/fa';
import { MdEdit, MdDelete } from 'react-icons/md';

import styled from 'styled-components';

export const Container = styled.div``;

export const ContainerButtonCreate = styled.div`
  width: 100$;
  display: flex;
  justify-content: flex-end;
`;

export const ContainerButtonsACtion = styled.div`
  display: flex;
  gap: 10px;
`;

export const DescriptionContainer = styled.div`
  margin-bottom: -24px;
`;

export const ContainerPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

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

export const IcoDelete = styled(MdDelete)<IcoEditProp>`
  cursor: pointer;
  font-size: 20px;
  pointer-events: ${({ isdisabled }) =>
    isdisabled === 'true' ? 'none' : undefined};
  cursor: ${({ isdisabled }) => (isdisabled === 'true' ? 'auto' : 'pointer')};
  color: ${({ isdisabled }) =>
    isdisabled === 'true'
      ? props => props.theme.palette.GREYSCALE.GREY_TWO
      : props => props.theme.palette.PRIMARY.RED};
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

export const Pagination = styled.div`
  display: flex;
  gap: 10px;
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