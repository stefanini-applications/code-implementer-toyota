import { FaFileDownload } from 'react-icons/fa';

import styled from 'styled-components';

interface IBackgroundColor {
  backgroundColor?: string;
}

export const Container = styled.div`
  padding: 20px;
  font-size: 14px;
`;

export const ContainerTable = styled.div`
  padding-top: 20px;
  width: calc(100vw - 40px);
  overflow: auto;
`;

export const Table = styled.div`
  width: 1600px;
  margin: auto;

  .header-child {
    padding: 0;
  }

  .column-cas {
    width: 70px;
  }

  .column-chem {
    width: 150px;
  }

  .column-policy,
  .column-something,
  .column-gadsl,
  .column-bsl,
  .column-ban {
    width: 94px;
  }

  .column-regleg-country {
    width: 130px;
  }

  .column-application {
    width: 165px;
  }

  .column-phase {
    width: 50px;
  }

  .column-level {
    width: 80px;
  }

  .column-hits {
    width: 60px;
  }

  .column-resource {
    width: 70px;
  }

  .column-dev {
    width: 50px;
  }

  .column-eval {
    width: 58px;
  }

  .column-priority {
    width: 60px;
  }

  .column-regleg-updates {
    width: 200px;
  }

  .column-date {
    width: 90px;
  }

  .column-next {
    width: 250px;
  }

  .column-listing {
    width: 100px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
`;

export const HeaderItem = styled.div`
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-bottom: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: bold;
  background-color: ${props => props.theme.palette.PRIMARY.MAIN_FOUR};
  color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};

  &:first-child {
    border-radius: 8px 0 0 0;
    border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  }

  &:last-child {
    border-radius: 0 8px 0 0;
  }
`;

export const ContainerItems = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .date-range {
    border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  }
`;

export const ContainerHorizontalItems = styled.div`
  display: flex;
  & > div {
    border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
    border-left: 0;
    border-bottom: 0;

    &:last-child {
      border-right: 0;
    }
  }
`;

export const ContainerLineHorizontalItems = styled.div`
  display: flex;
  & > div {
    border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
    border-bottom: 0;

    &:last-child {
      border-right: 0;
    }
  }
`;

export const Item = styled.div`
  padding: 5px;
`;

export const LineContainer = styled.div`
  display: flex;
`;

export const ContainerLineItems = styled.div``;

export const LineItem = styled.div<IBackgroundColor>`
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-bottom: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  background-color: ${({ backgroundColor }) => backgroundColor};

  &:first-child {
    border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  }
`;

export const LineItemPriority = styled.div<IBackgroundColor>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ backgroundColor }) => backgroundColor};

  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
`;

export const ContainerVerticalItems = styled.div`
  display: flex;
  flex-direction: column;

  & > div:not(:first-child) {
    border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO} !important;
  }

  div {
    &:first-child {
      border-top: 0;
    }
  }
`;

export const ContainerItem = styled.div`
  div {
    border-top: 0;
  }
`;

export const ContainerFilters = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
`;

export const ContainerMultiSelect = styled.div``;

export const Label = styled.p`
  font-size: 11px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
  margin-bottom: 8px;
`;

export const ContainerInput = styled.div`
  display: flex;
  gap: 20px;
`;

export const CheckboxInput = styled.input``;

export const CheckboxLabel = styled.label``;

export const ContainerDownload = styled.div`
  width: 100%;
  display: flex;
  align-items: right;
  justify-content: right;
button {
  }
`;

export const IcoFileDownload = styled(FaFileDownload)`
  font-size: 11px;
  cursor: pointer;
  color: ${props => props.theme.palette.PRIMARY.MAIN};
`;

export const ContainerCheckbox = styled.div`
  display: flex;
  gap: 5px;
`;
