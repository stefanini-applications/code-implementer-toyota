import { NavLink } from 'react-router-dom';

import styled from 'styled-components';

interface ISearchButton {
  disabled?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const SearchButton = styled.div<ISearchButton>`
  cursor: ${props => (props.disabled ? '' : 'pointer')};
  position: absolute;
  right: 0;
  padding: 10px;
  padding-top: ${props => props.disabled ? '8px' : '10px'};
  padding-bottom: ${props => props.disabled ? '8px' : '10px'};
  margin-right: 2px;
  border-radius: 0 8px 8px 0;
  svg {
    fill: ${props =>
      props.disabled
        ? props.theme.palette.GREYSCALE.GREY_TWO
        : props.theme.palette.PRIMARY.WHITE} !important;
  }
  background-color: ${props =>
    props.disabled
      ? props.theme.palette.GREYSCALE.GREY
      : props.theme.palette.PRIMARY.MAIN_TWO};
`;

export const LinkNav = styled(NavLink)`
  text-decoration: none;
  &:focus {
    background-color: ${props => props.theme.palette.GREYSCALE.GREY};
  }
`;

export const FakeTabElement = styled.a`
  text-decoration: none;
`;

export const AutocompleteGroup = styled.div`
  display: flex;
  background-color: ${props => props.theme.palette.PRIMARY.WHITE};
  padding: 10px 15px;
  align-items: center;
  border-radius: 8px;
  max-width: 450px;
  width: 450px;
  font-size: 14px;
  box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.17), 0px 2px 4px rgba(0, 0, 0, 0.05);
  border: 2px solid ${props => props.theme.palette.PRIMARY.WHITE};
  transition: all 0.3s ease;
  @media (max-width: 1300px) {
    width: 350px;
  }

  svg {
    fill: ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  }

  &:focus-within {
    border: 2px solid ${props => props.theme.palette.PRIMARY.MAIN_TWO};
    box-shadow: 0px 0px 0px 4px
      ${props => props.theme.palette.PRIMARY.MAIN_FOUR};
  }
`;

export const List = styled.ul`
  border-radius: 3px;
  background-color: ${props => props.theme.palette.PRIMARY.WHITE};
  list-style: none;
  margin-top: 0;
  width: 100%;
  max-width: 480px;
  padding-bottom: 5px;
  position: absolute;
  top: 52px;
  padding-top: 10px;
  border: 2px solid ${props => props.theme.palette.PRIMARY.MAIN_TWO};
  box-shadow: 0px 0px 0px 4px ${props => props.theme.palette.PRIMARY.MAIN_FOUR},
    0px 4px 13px ${props => props.theme.palette.BACKGROUND.BORDER},
    0px 2px 4px ${props => props.theme.palette.TEXT.SECONDARY};
  border-radius: 8px;
  z-index: 100;

  a {
    &:hover {
      text-decoration: none;
    }
  }
`;

export const Item = styled.li`
  color: ${props => props.theme.palette.TEXT.CONTRAST_ONE};
  display: block;
  font-size: 13px;
  font-family: 'Roboto', sans-serif;
  padding: 0.5rem;
  padding-left: 40px;
  word-break: break-word;

  &:hover {
    background-color: ${props => props.theme.palette.GREYSCALE.GREY};
    cursor: pointer;
  }
`;

export const Input = styled.input`
  display: flex;
  flex: 1;
  background-color: transparent;
  border: 0;
  outline: none;
  margin-left: 4px;
  font-size: 13px;
  font-family: 'Roboto', sans-serif;
`;

export const NotFound = styled.ul`
  color: ${props => props.theme.palette.TEXT.CONTRAST_ONE};
  padding: 0.5rem;
  list-style: none;
  font-size: 13px;
  font-family: 'Roboto', sans-serif;
  text-align: center;
`;

export const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SectionTitleWrapper = styled.div`
  display: flex;
  padding: 7px;
  color: ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  gap: 5px;
  font-size: 12px;
  padding-left: 20px;
`;

export const SectionTitle = styled.p`
  font-size: 13px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: ${props => props.theme.palette.GREYSCALE.GREY_TWO};

  &:focus {
    background-color: red;
  }
`;

export const GenericIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`;

export const ContainerLoadingSearch = styled.div`
  display: flex;
  padding: 10px 0;
  align-items: center;
  justify-content: center;

  svg {
    animation: loading 1.5s infinite ease;
    font-size: 20px;
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

export const ContainerItemsList = styled.div`
  position: relative;
  max-height: 320px;
  overflow-y: auto;
`;
