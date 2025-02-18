import { FaSearch } from 'react-icons/fa';

import styled from 'styled-components';

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

export const TextArea = styled.textarea`
  display: flex;
  flex: 1;
  padding: 0 !important;
  border: none !important;
  background-color: transparent;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  outline: none;
  width: 100%;
  resize: none;
`;

export const TextAreaClickable = styled.textarea`
  display: flex;
  flex: 1;
  padding: 0 !important;
  border: none !important;
  background-color: transparent;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  outline: none;
  width: 100%;
  resize: none;
  cursor: pointer !important;
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  text-decoration: underline;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-radius: 6px;
  background-color: white;
  width: 90%;
`;

export const InputContainerAntd = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  height: 100px;
  font-family: 'Roboto', sans-serif;
`;

export const SectionInput = styled.div`
  padding: 0 10px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const SectionTextArea = styled.div`
  padding: 0 10px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  align-items: center;

  div {
    height: 55%;
    align-items: unset;
  }
`;

export const SectionTextAreaView = styled.div`
  padding: 0 10px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: left;

  align-items: center;

  div {
    align-items: unset;
    padding: 0;
    width: 96%;
    border: none;
    background-color: transparent;
    margin-top: 17px;
  }

  textarea {
    cursor: unset;
  }
`;

export const OverlayDateRange = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  left: -300px;
  top: 0;
`;

export const DatePickerContainer = styled.div`
  position: absolute;
  border: 1px solid grey;
  border-radius: 8px;
  z-index: 2000;
  top: 63px;
  left: 0;
  box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.17), 0px 2px 4px rgba(0, 0, 0, 0.05);

  @media (max-width: 1000px) {
    top: 322px;
  }

  input {
    width: 100% !important;
    padding: inherit;
    border: none;

    &:focus {
      border: none;
      box-shadow: none;
    }
  }

  &:first-child {
    border: 1px solid grey;
    border-radius: 8px;
    &:first-child {
      border-radius: 8px;
    }
  }
`;

export const ContainerPhase = styled.div`
  position: relative;
  & > div {
    max-width: 100px;
  }
  &:after {
    content: '>';
    font: 11px 'Consolas', monospace;
    color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    right: 9px;
    top: 9px;
    padding: 0 0 2px;
    position: absolute;
    pointer-events: none;
  }
`;

export const ContainerDate = styled.div``;

export const SelectPhase = styled.select`
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-radius: 6px;
  padding: 8px 17px 8px 11px;
  transition: all 0.3s ease;
  appearance: none;

  &:focus {
    border: 1px solid ${props => props.theme.palette.PRIMARY.MAIN_TWO};
    box-shadow: 0px 0px 0px 4px
      ${props => props.theme.palette.PRIMARY.MAIN_FOUR};
  }

  &:disabled {
    background-color: ${props => props.theme.palette.GREYSCALE.GREY};
  }
`;

export const ContainerSubstanceName = styled.div`
  padding: 0 !important;
  border: none !important;
  background-color: transparent;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  outline: none;
  width: 100%;
  height: 34px;
  cursor: pointer !important;
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  text-decoration: underline;
  margin-top: 0px !important;
`;

export const LinkSubstance = styled.a`
  display: inline-block;
  word-wrap: break-word;
  width: 100%;
`;

export const TextAreaClickableReact = styled.div`
  padding: 0 !important;
  border: none !important;
  background-color: transparent;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  cursor: pointer !important;
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  text-decoration: underline;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: normal;
`;

export const PaddingDiv = styled.div`
  padding: 8px 12px;
`;

export const TextAreaReact = styled.div`
  display: flex;
  flex: 1;
  padding: 0 !important;
  border: none !important;
  background-color: transparent;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
`;

export const TextWrap = styled.div`
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: normal;
`;

export const Pagination = styled.div`
  display: flex;
  gap: 10px;
`;

export const ContainerPagination = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  align-items: center;
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