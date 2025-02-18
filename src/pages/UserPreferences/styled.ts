import { MdKeyboardArrowRight } from 'react-icons/md';

import { transparentize } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1240px;
  min-width: 940px;
  margin: auto;
  padding: 0 10px 20px 10px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

export const BreadCrumbsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const BreadCrumbs = styled.a`
  text-decoration: none;
  font-size: 12px;
  margin-left: 3px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};

  &:hover {
    color: ${props => transparentize(0.4, props.theme.palette.TEXT.PRIMARY)};
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const ArrowDown = styled(MdKeyboardArrowRight).attrs(props => ({
  ...props,
  size: 16,
  color: transparentize(0.1, props.theme.palette.TEXT.PRIMARY)
}))`
  opacity: 0.8;
`;

export const CurrentPage = styled.p`
  font-size: 12px;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
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

export const TabsWrapper = styled.div`
  display: inline-block;
  padding: 4px 6px;
  background-color: ${props => props.theme.palette.BACKGROUND.PROFILE};
  margin-bottom: 5px;
  border-radius: 8px;
  width: 100%;
  div {
    justify-content: center;
  }
`;

export const ContainerFilterPreferences = styled.div`
  margin-bottom: 30px;
`;

export const Label = styled.p`
  font-size: 15px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
  margin-bottom: 2px;
  margin-top: 5px;
`;

export const SubLabel = styled.p`
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
  margin-bottom: 8px;
`;

export const Checkbox = styled.div`
  display: flex;
  gap: 5px;
`;

export const CheckboxLabel = styled.label``;

export const CheckboxInput = styled.input``;

export const ContainerCheckbox = styled.div`
  display: flex;
  gap: 5px;
`;

export const ContainerInput = styled.div`
  display: flex;
  gap: 20px;
`;

export const ContainerButtons = styled.div`
  display: flex;
`;
