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
`;



export const SectionContainer = styled.div`
  margin: 20px;
  white-space: pre-line;
`;

export const DatesContainer = styled.div`
  white-space: pre-line;
  display: flex;
  direction: row;
  margin-top: 10px;
`;
