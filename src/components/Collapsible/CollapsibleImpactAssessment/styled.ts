import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { FaChevronUp } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

import { RightOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { transparentize } from 'polished';
import styled from 'styled-components';

interface IBackgroundColor {
  backgroundColor?: string;
}

interface ITableStructure {
  selectedArea?: boolean;
}

export const ContainerClosed = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: transparent;
  align-items: center;
  cursor: pointer;
`;

export const Link = styled(NavLink)`
  font-weight: bold;
`;

export const AntPopConfirm = styled(Popconfirm)`
  max-width: 360px;
  overflow: hidden;
  .ant-popover-content,
  .ant-popconfirm {
    max-width: 360px;
  }
`;

export const ContainerHeaders = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
`;

export const LeftHeaders = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  padding-left: 45px;
  span {
    width: 50%;
  }
`;

export const RightHeaders = styled.div`
  display: flex;
  gap: 20px;
  width: 353px;
`;

interface ILabel {
  sortable?: boolean;
}

export const LabelHeader = styled.span<ILabel>`
  font-size: 14px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  color: ${props => transparentize(0.4, props.theme.palette.TEXT.PRIMARY)};
  cursor: ${props => (props.sortable ? 'pointer' : undefined)};
`;

export const ArrowDownSort = styled(BsArrowDown)``;

export const ArrowUpSort = styled(BsArrowUp)``;

export const ContainerCollapseInfo = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  margin-top: 7px;
`;

export const CollapseInfoLeft = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  padding-left: 45px;
  width: calc(100% - 400px);
`;

export const CollapseInfoRight = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
  width: 353px;
  // padding-right: 15px;
  // justify-content: space-between;
`;

export const ClosedLabel = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: keep-all;
`;

export const InfoGroup = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  width: 50%;
  // flex: 1;
  // margin-left: 24px;
  // max-width: 80%;
  > div {
    max-width: 80%;
  }
`;

interface IContainerContent {
  open?: boolean;
}

export const ContainerContent = styled.div<IContainerContent>`
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  margin-top: 10px;
  overflow: hidden;
  padding: 10px 0px;
  border: 1px solid #d9d9d9;
  position: relative;
  border-radius: 10px;
  background-color: ${props => props.theme.palette.GREYSCALE.GREY};
  max-height: ${props => (props.open ? '600px' : '30px')};
  transition: max-height 0.3s ease;
`;

export const InfosDataClosed = styled.div`
  display: flex;
  gap: 20px;
  margin-left: 5px;
  align-items: center;
  margin-right: 20px;
`;

export const ArrowDown = styled(RightOutlined).attrs(props => ({
  ...props
}))`
  left: 20px;
  position: absolute;
  cursor: pointer;
  width: 12px;
  height: 12px;
  margin-right: 5px;
  rotate: ${props => (props.open ? '90deg' : undefined)};
  transition: rotate 0.3s ease-out;
`;

export const BigCircle = styled.div<IBackgroundColor>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  border-radius: 25px;
  background-color: ${({ backgroundColor }) => backgroundColor} !important;
  min-width: 30px;
`;

export const BigCircleText = styled.p`
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
`;

export const CollapsibleClosed = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

export const MiddleWrapperClosed = styled.div`
  display: flex;
  align-items: flex-start;
  // flex: 1;
  width: 50%;
`;

export const InfoDateClosed = styled.p`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  // margin-right: 10px;
  width: 90px;
`;

export const LabelItem = styled.div`
  font-size: 14px;
  display: flex;
  gap: 5px;
`;

export const InfoDataClosedName = styled.p`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  margin-left: 5px;
  word-break: break-word;
`;

export const InfoDataClosed = styled.p`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  // margin-left: 5px;
  max-width: 80%;
`;

export const InfoRegionClosed = styled.p`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  word-break: break-word;
  // display: flex;
  width: 165px;
`;

export const InfoDataClosedNick = styled.p`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  margin-left: 5px;
  word-break: break-word;
  font-weight: bold;
  white-space: nowrap;
`;

export const ContainerOpen = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
`;

export const HeaderCollapsibleOpen = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 10px 10px 0 10px;
`;

export const Touchable = styled.div`
  padding: 0;
  border: 0;
  outline: none;
  background-color: transparent;
  max-width: 150px;
  button {
    padding: 7px 13px;
  }
`;

export const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const InfoWrapperOpenNick = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

export const InfoDataOpen = styled.p`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  margin-left: 5px;
`;

export const ImpactAssessmentTable = styled.section<ITableStructure>`
  display: grid;
  grid-template-areas: ${({ selectedArea }) =>
    selectedArea
      ? `'a a a b b c c jj' 'd e f g h i j jj' 'k o p t x ab af aj'`
      : `'a a a b b c c jj'
    'd e f g h i j jj'
    'k o p t x ab af aj'
    'l o q u y ac ag ak'
    'm o r v z ad ah al'
    'n o s w aa ae ai am'`};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-bottom: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-radius: 5px;
  margin-right: 10px;
  margin-left: 10px;
  margin-top: 10px;
  div {
    background-color: white;
  }
`;

export const ContainerBigCircle = styled.div`
  margin-top: -7px;
`;

export const SubColumnOne = styled.div`
  grid-area: d;
  border-radius: 5px 0 0 0;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => transparentize(0.3, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
`;

export const SubColumnTwo = styled.div`
  grid-area: e;
  text-align: center;
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => transparentize(0.3, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
`;

export const SubColumnThree = styled.div`
  grid-area: f;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => transparentize(0.3, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
`;

export const SubColumnFour = styled.div`
  grid-area: g;
  text-align: center;
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => transparentize(0.3, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
`;

export const SubColumnFive = styled.div`
  grid-area: h;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => transparentize(0.3, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
`;

export const SubColumnSix = styled.div`
  grid-area: i;
  text-align: center;
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => transparentize(0.3, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
`;

export const SubColumnSeven = styled.div`
  grid-area: j;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => transparentize(0.3, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
`;

export const SubColumnEight = styled.div`
  grid-area: jj;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => transparentize(0.3, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
  border-radius: 0 5px 0 0;
`;

export const SubOneCelOne = styled.div`
  grid-area: k;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubOneCelTwo = styled.div<ITableStructure>`
  grid-area: ${({ selectedArea }) => (selectedArea ? `k` : `l`)};
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubOneCelThree = styled.div<ITableStructure>`
  grid-area: ${({ selectedArea }) => (selectedArea ? `k` : `m`)};
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubOneCelFour = styled.div<ITableStructure>`
  grid-area: ${({ selectedArea }) => (selectedArea ? `k` : `n`)};
  border-radius: 0 0 0 5px;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubTwoCelOne = styled.div<IBackgroundColor>`
  grid-area: o;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 27px;
  text-align: center;
  font-weight: bold;
  color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

export const SubThreeCelOne = styled.div`
  grid-area: p;
  text-align: center;
  font-weight: bold;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  padding: 10px 0;
  height: 35px;
`;

export const SubThreeCelTwo = styled.div<ITableStructure>`
  grid-area: ${({ selectedArea }) => (selectedArea ? `p` : `q`)};
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: bold;
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  padding: 10px 0;
  height: 35px;
`;

export const SubThreeCelThree = styled.div<ITableStructure>`
  grid-area: ${({ selectedArea }) => (selectedArea ? `p` : `r`)};
  text-align: center;
  font-weight: bold;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  padding: 10px 0;
  height: 35px;
`;

export const SubThreeCelFour = styled.div<ITableStructure>`
  grid-area: ${({ selectedArea }) => (selectedArea ? `p` : `s`)};
  text-align: center;
  font-weight: bold;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  padding: 10px 0;
  height: 35px;
`;

export const SubFourCelOne = styled.div`
  grid-area: t;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubFourCelTwo = styled.div<ITableStructure>`
  grid-area: ${({ selectedArea }) => (selectedArea ? `t` : `u`)};
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubFourCelThree = styled.div<ITableStructure>`
  grid-area: ${({ selectedArea }) => (selectedArea ? `t` : `v`)};
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubFourCelFour = styled.div<ITableStructure>`
  grid-area: ${({ selectedArea }) => (selectedArea ? `t` : `w`)};
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubFiveCelOne = styled.div`
  grid-area: x;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: bold;
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubFiveCelTwo = styled.div<ITableStructure>`
  grid-area: ${({ selectedArea }) => (selectedArea ? `x` : `y`)};
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: bold;
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubFiveCelThree = styled.div<ITableStructure>`
  grid-area: ${({ selectedArea }) => (selectedArea ? `x` : `z`)};
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: bold;
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubFiveCelFour = styled.div<ITableStructure>`
  grid-area: ${({ selectedArea }) => (selectedArea ? `x` : `aa`)};
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: bold;
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubSixCelOne = styled.div`
  grid-area: ab;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: bold;
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SubSixCelTwo = styled.div<ITableStructure>`
  grid-area: ${({ selectedArea }) => (selectedArea ? `ab` : `ac`)};
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: bold;
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubSixCelThree = styled.div<ITableStructure>`
  grid-area: ${({ selectedArea }) => (selectedArea ? `ab` : `ad`)};
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: bold;
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubSixCelFour = styled.div<ITableStructure>`
  grid-area: ${({ selectedArea }) => (selectedArea ? `ab` : `ae`)};
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: bold;
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubSevenCelOne = styled.div`
  grid-area: af;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: bold;
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubSevenCelTwo = styled.div<ITableStructure>`
  grid-area: ${({ selectedArea }) => (selectedArea ? `af` : `ag`)};
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: bold;
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubSevenCelThree = styled.div<ITableStructure>`
  grid-area: ${({ selectedArea }) => (selectedArea ? `af` : `ah`)};
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: bold;
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubSevenCelFour = styled.div<ITableStructure>`
  grid-area: ${({ selectedArea }) => (selectedArea ? `af` : `ai`)};
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: bold;
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubEightCelOne = styled.div`
  grid-area: aj;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: bold;
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubEightCelTwo = styled.div<ITableStructure>`
  grid-area: ${({ selectedArea }) => (selectedArea ? `aj` : `ak`)};
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: bold;
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubEightCelThree = styled.div<ITableStructure>`
  grid-area: ${({ selectedArea }) => (selectedArea ? `aj` : `al`)};
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: bold;
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubEightCelFour = styled.div<ITableStructure>`
  grid-area: ${({ selectedArea }) => (selectedArea ? `aj` : `am`)};
  text-align: center;
  border-radius: 0px 0px 5px 0px;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: bold;
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContainerButton = styled.div`
  position: relative;
`;

export const DisabledTextInfo = styled.div`
  position: absolute;
  background-color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
  color: white;
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 12px;
  left: 0px;
  top: 30px;
  &::after {
    content: '';
    top: -5px;
    position: absolute;
    z-index: 10;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
    left: 46%;
  }
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.17), 0px 2px 4px rgba(0, 0, 0, 0.05);
`;
