import { AiFillPlusCircle } from 'react-icons/ai';

import { transparentize } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleContainer = styled.div`
  display: flex;
  background-color: ${props => props.theme.palette.PRIMARY.MAIN_FOUR};
  padding: 6px 10px;
`;

export const Title = styled.p`
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: ${props => props.theme.palette.GREYSCALE.DARK};
`;

export const Touchable = styled.button`
  padding: 0;
  border: 0;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  svg {
    width: 14px;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 45px;
  margin: 0 15px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 12px 15px;
  align-items: baseline;
`;

export const SectionTitle = styled.p`
  font-size: 11px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: ${props => transparentize(0.4, props.theme.palette.TEXT.PRIMARY)};
`;

export const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Label = styled.p`
  font-size: 13px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
`;

export const NewRecord = styled(AiFillPlusCircle).attrs(props => ({
  ...props,
  size: 20,
  color: props.theme.palette.TEXT.CONTRAST_ONE
}))`
  margin-left: 4px;
`;

export const TabsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 98%;
  margin: auto;
  align-self: start;
  padding: 4px 6px;
  background-color: ${props => props.theme.palette.BACKGROUND.PROFILE};
  border-radius: 6px;
`;

export const RecordsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  margin: 0 12px;
`;

export const EditSection = styled.div`
  display: flex;
  justify-content: flex-end;
`;
