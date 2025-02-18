import { FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';

import { transparentize } from 'polished';
import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';

interface IBackgroundColor {
  backgroundColor?: string;
}

export const Container = styled.div`
  padding-bottom: 20px;
  max-width: 1240px;
  min-width: 940px;
  margin: auto;
  padding: 0px 10px;
  .cs-sidebar--left ps {
    max-width: 150px;
    overflow: hidden;
  }
`;


export const CloseIcon = styled(IoMdClose)`
  cursor: pointer;
  font-size: 50px;
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
