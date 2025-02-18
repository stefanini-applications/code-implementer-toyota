import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

import { transparentize } from 'polished';
import styled from 'styled-components';

interface IBackgroundColor {
  backgroundColor?: string;
}
export const Container = styled.div``;

export const Substance = styled.div`
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  position: relative;
  padding: 13px 22px;
  border-radius: 10px;
  margin-left: 28px;
  margin-right: 28px;
`;

export const Class = styled.div`
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  position: relative;
  padding: 13px 22px;
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SubstanceTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  button {
    padding: 5px 17px;
    font-size: 12px !important;
  }
`;

export const ContainerLevels = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
`;

export const ItemLevel = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const ContainerClass = styled.div`
  display: flex;
  gap: 10px;
`;

export const ContainerClassInside = styled.div`
  display: flex;
  gap: 10px;
  padding-right: 28px;
`;

export const Plus = styled(FaPlusCircle)`
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  cursor: pointer;
  height: 20px;
  width: 20px;
  margin-top: 35px;
`;

export const Minus = styled(FaMinusCircle)`
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  cursor: pointer;
  height: 20px;
  width: 20px;
  margin-top: 35px;
`;

export const TitleClass = styled.div`
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  button {
    font-size: 14px;
  }
`;

export const SectionRelated = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const DateUpdate = styled.p`
  font-size: 14px;
  display: inline-block;
  position: absolute;
  font-weight: bold;
  color: ${props => props.theme.palette.GREYSCALE.DARK};
  top: -8px;
  background-color: ${props => props.theme.palette.PRIMARY.WHITE};
`;

export const DescriptionTextOpen = styled.p`
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-radius: 9px;
  padding: 8px 10px;
  flex-grow: 1;
`;

export const EditUpdateButton = styled.div`
  display: flex;
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  font-size: 16px;
  gap: 5px;
  align-items: center;
  cursor: pointer;
`;

export const ItemTitle = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const LabelTitle = styled.p`
  font-weight: bold;
  color: ${props => props.theme.palette.GREYSCALE.GREY_TWO};
`;

export const TextTitle = styled.div``;

export const LevelSection = styled.div``;

export const BigCircle = styled.div<IBackgroundColor>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 25px;
  border-radius: 25px;
  background-color: ${({ backgroundColor }) =>
    backgroundColor || (props => props.theme.palette.LEVEL.LOW)};
`;

export const BigCircleText = styled.p`
  font-size: 17px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
`;

export const Touchable = styled.button`
  padding: 0;
  border: 0;
  outline: none;
  cursor: pointer;
  background-color: transparent;
`;
