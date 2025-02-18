import styled from 'styled-components';

interface ITabActive {
  active?: boolean;
}
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1240px;
  min-width: 940px;
  margin: auto;
  padding: 0 10px;
`;

export const Title = styled.p`
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: ${props => props.theme.palette.GREYSCALE.DARK};
`;

export const TabIconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const TabMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: calc(100% - 12px);
  align-self: start;
  padding: 4px 6px;
  margin: 10px 0 5px 0;
  background-color: ${props => props.theme.palette.BACKGROUND.PROFILE};
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
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
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

export const ItemsPerPage = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  margin: 0 7px 0 3px;
  color: ${props => props.theme.palette.TEXT.TERTIARY};
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

export const ContainerResults = styled.div`
  padding: 20px;
  border: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  border-radius: 0px 8px 8px 8px;
  margin-bottom: 10px;
`;

export const MiddleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-self: start;
  background: transparent;
`;
export const AsideContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: transparent;
`;

export const TitleContainer = styled.div`
  display: flex;
  background-color: ${props => props.theme.palette.PRIMARY.MAIN_FOUR};
  padding: 6px 10px;
  border-radius: 4px;
  margin-top: 20px;
  margin-bottom: 15px;
`;
