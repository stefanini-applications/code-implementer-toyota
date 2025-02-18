import { AiFillWarning } from 'react-icons/ai';

import styled from 'styled-components';

export const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding-top: 190px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 334px;
`;

export const TitleError = styled.h1`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 25px;
  color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
`;

export const WarnIcon = styled(AiFillWarning)`
  color: ${props => props.theme.palette.GREYSCALE.GREY_SIX};
  width: 35px;
  height: 35px;
  position: absolute;
  left: -50px;
`;

export const DescriptionError = styled.p`
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
  margin-top: 10px;
`;

export const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 25px;
  gap: 10px;
`;
