import { AiFillPlusCircle } from 'react-icons/ai';

import styled from 'styled-components';

interface ITabActive {
  active?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
`;

export const Title = styled.p`
  display: flex;
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  color: ${props => props.theme.palette.GREYSCALE.DARK};
  padding-bottom: 10px;
  border-bottom: 1px solid ${props => props.theme.palette.GREYSCALE.GREY};
  font-weight: bold;
`;

export const TabMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  align-self: start;
  padding: 4px 6px;
  margin: 10px 0 5px 0;
  background-color: ${props => props.theme.palette.GREYSCALE.GREY};
  border-radius: 6px;
`;

export const TabButton = styled.button<ITabActive>`
  display: flex;
  align-items: center;
  border: 0;
  outline: none;
  background-color: transparent;
  padding: 7px 25px;
  cursor: pointer;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: 700;
  border-radius: 8px;
  box-shadow: ${({ active }) =>
    active
      ? '0px 1px 4px -1px rgba(70, 70, 70, 0.31), inset 0px -1px 1px rgba(206, 204, 204, 0.27);'
      : 'none'};

  background-color: ${({ active }) =>
    active ? props => props.theme.palette.PRIMARY.WHITE : 'none'};

  svg {
    margin-right: 5px;
  }

  @media (max-width: 1000px) {
    font-size: 0.7em;
    padding: 7px 15px;
  }
`;

export const Icon = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 5px;
`;

export const TabContentValue = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  color: ${props => props.theme.palette.TEXT.TERTIARY};
  margin-left: 3px;
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

export const Filter = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  color: ${props => props.theme.palette.TEXT.TERTIARY};
  margin: 0 7px 0 3px;
`;

export const ItemsPerPage = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  margin: 0 7px 0 3px;
  color: ${props => props.theme.palette.TEXT.TERTIARY};
`;

export const MiddleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-self: start;
  padding-top: 20px;
  margin: 0 0 5px 0;
  background: transparent;
`;

export const AsideContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: transparent;
`;

export const ResultItem = styled.div`
  display: flex;
  width: 100%;
  align-self: start;
  background: transparent;
  margin: 15px 0;
`;

export const LeftSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-top: 4px;
  svg {
    color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
  }
`;

export const LeftSidePicture = styled.img`
  height: 22px;
  margin-bottom: 6px;
`;

export const LeftSideInfo = styled.p`
  display: flex;
  font-family: 'Roboto', sans-serif;
  font-size: 11px;
  color: ${props => props.theme.palette.TEXT.TERTIARY};
  margin: 3px 0 0 0;
`;

export const LeftSideSubinfo = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 11px;
  color: ${props => props.theme.palette.TEXT.TERTIARY};
  margin: 0 0 0 5px;
`;

export const MiddleSideContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 10px;
`;

export const MiddleSideInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const MiddleSideTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
  word-break: break-word;
`;

export const MiddleSideInfo = styled.p`
  display: flex;
  font-family: 'Roboto', sans-serif;
  font-size: 11px;
  color: ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  margin: 3px 0 0 0;
`;

export const MiddleSideSubinfo = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 11px;
  color: ${props => props.theme.palette.TEXT.TERTIARY};
  margin: 0 0 0 5px;
`;

export const MiddleSideText = styled.p`
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.TEXT.TERTIARY};
  font-size: 14px;
  word-break: break-word;
`;

export const ContainerRelated = styled.div`
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
  display: flex;
  gap: 3px;
  font-size: 11px;
  margin-top: 5px;
`;

export const Related = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  gap: 5px;
  color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
  text-decoration: underline;
  word-break: break-word;
`;

export const SubUses = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  gap: 5px;
  color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
  word-break: break-word;
`;

export const BottomPaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const EmptyResultsContainer = styled.div`
  display: flex;
  margin: 15px 0;
  justify-content: center;
`;

export const EmptyResultsText = styled.p`
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.TEXT.TERTIARY};
  font-size: 14px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const NewRecord = styled(AiFillPlusCircle).attrs(props => ({
  ...props,
  size: 20,
  color: props.theme.palette.TEXT.CONTRAST_ONE
}))`
  margin-left: 4px;
`;

export const DropdownContainer = styled.div`
  margin-top: 3px;
  .rs-picker {
    width: 80px;
  }
  & > div {
    width: 75px;
  }
`;
