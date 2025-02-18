import { FaSearch } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 101;

  .input-component {
    padding: 0;
    max-width: inherit;
    width: auto;
    margin: 0;
  }

  .select-component {
    padding: 5px 10px;
  }
`;

export const WrapperAdvanced = styled.div`
  background-color: black;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.palette.GREYSCALE.TRANSLUCENT_THREE};
`;

export const AdvancedSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  padding: 20px;
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-radius: 8px;
  background-color: ${props => props.theme.palette.PRIMARY.WHITE};
  box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.17), 0px 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  height: auto;

  animation: expand 0.3s 1 ease-in-out;

  @keyframes expand {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export const TitleSection = styled.p`
  font-size: 18px;
`;

export const TitleSearch = styled.p`
  text-decoration: underline;
  margin-bottom: 15px;
`;

export const InputsContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: baseline;
  padding: 20px 30px 0 30px;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const OverlayDateRange = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  left: 0;
  top: 0;
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin-right: 15px;
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  min-width: 33%;
  margin-bottom: 10px;
  input {
    width: 324px;
  }
  align-items: center;
`;

export const Label = styled.label`
  width: 120px;
`;

export const Button = styled.button`
  cursor: pointer;
`;

export const SearchIco = styled(FaSearch)`
  width: 12px;
`;

export const CloseIco = styled(IoMdClose)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  fill: ${props => props.theme.palette.GREYSCALE.GREY_THREE};

  cursor: pointer;
`;

export const ButtonSearchContainer = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;

  svg {
    color: ${props => props.theme.palette.PRIMARY.WHITE} !important;
    margin-right: 5px;
  }

  button {
    margin: auto;
  }
`;

export const SelectWrapper = styled.div`
  position: relative;
  max-width: 326px;

  div {
    /* width: 300px; */
  }

  input {
    border: none;
    padding: 0;

    &:focus {
      border: none;
      box-shadow: none;
    }
  }
`;

export const Touchable = styled.button`
  padding: 0;
  border: 0;
  outline: none;
  cursor: pointer;
  background-color: transparent;
`;

export const Select = styled.select`
  font-size: 14px;
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-family: 'Roboto', sans-serif;
  border-radius: 6px;
  padding: 6px 9px;
  appearance: none;
  padding-right: 25px;
`;

export const Option = styled.option``;
export const ContainerDatePicker = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  p {
    margin-left: 0px;
  }
`;

export const ContainerDateRange = styled.div`
  display: flex;
  gap: 10px;
  min-width: 33%;
  margin-bottom: 10px;
  align-items: center;
`;

export const DropdownContainer = styled.div`
  margin-top: 3px;
  .rs-picker-select {
    width: 322px;
  }
  & > div {
    width: 324px;
  }
`;
