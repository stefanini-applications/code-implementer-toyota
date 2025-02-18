import { MdKeyboardArrowRight } from 'react-icons/md';

import { transparentize } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  padding-bottom: 20px;
  max-width: 1240px;
  min-width: 940px;
  padding: 0 10px;
  margin: auto;
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
  word-break: break-word;
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
  word-break: break-word;
`;

export const TableHead = styled.thead`
  th {
    border-top: none;
  }
`;
export const TableHeadItem = styled.th`
  text-align: left;
  border-right: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR} !important;
  text-decoration: none !important;
  cursor: default !important;

  &:last-child {
    border-right: none;
    border-radius: 0 8px 0 0;
  }

  &:first-child {
    border-radius: 8px 0 0 0;
    border-top: none;
  }

  padding: 16px;
`;
export const TableBody = styled.tbody``;
export const TableRow = styled.tr`
  &:last-child td {
    border-bottom: none;
  }
`;
export const TableItem = styled.td`
  border-top: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  border-right: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  &:last-child {
    border-right: none;
  }
  padding: 16px 16px 20px 16px;
  vertical-align: top;
  text-align: left;
`;

export const NicknameRegLeg = styled.p``;

export const NameRegLeg = styled.p`
  max-width: 120px;
  word-break: break-word;
`;

export const ContainerTable = styled.div`
  display: flex;
  gap: 20px;
  align-items: start;
`;

export const TableList = styled.table`
  border: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  border-radius: 8px;
  border-spacing: 0;
  font-size: 14px;
  position: relative;
  min-height: 221px;
`;

export const ContainerDescription = styled.div`
  font-size: 14px;
`;

export const TitleDescription = styled.h1``;

export const SubTitleDescription = styled.h2`
  padding: 15px 0 5px 0;
`;
export const TextDescription = styled.p``;

export const ListDescription = styled.ul`
  padding: 5px 0 10px 0;
  margin-left: 30px;
`;

export const ItemListDescription = styled.li``;

export const SubtitleTable = styled.p`
  font-size: 14px;
  padding: 5px 0;
  word-break: break-word;
`;

export const ImageModel = styled.img`
  max-width: 800px;
  width: 100%;
`;

export const ContainerEmpty = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: absolute;
`;
