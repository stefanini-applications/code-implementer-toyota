import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

import { Tooltip } from 'antd';
import styled from 'styled-components';

interface IBackgroundColor {
  backgroundColor?: string;
}

export const Container = styled.div`
  padding-bottom: 20px;
  // max-width: 1240px;
  min-width: 940px;
  margin: auto;
  padding-right: 30px;
  padding-left: 30px;
`;

export const ContainerHeatmap = styled.div``;

export const UpdateTooltip = styled(Tooltip)`
  .ant-tooltip-inner {
    width: 400px !important;
  }
`;

export const Heatmap = styled.div`
  height: 670px;
  & > :nth-child(1) {
    border-width: 0px;
  }
  @media (max-width: 1200px) {
    height: 630px;
  }
  @media (max-width: 1175px) {
    height: 620px;
  }
  @media (max-width: 1150px) {
    height: 610px;
  }
  @media (max-width: 1125px) {
    height: 600px;
  }
  @media (max-width: 1100px) {
    height: 590px;
  }
  @media (max-width: 1075px) {
    height: 580px;
  }
  @media (max-width: 1050px) {
    height: 570px;
  }
  @media (max-width: 1025px) {
    height: 550px;
  }
  @media (max-width: 1000px) {
    height: 540px;
  }
  @media (max-width: 976px) {
    height: 520px;
  }
`;

/*
  other option is like below (instead of & > :nth-child(1))
  & > iframe {
    border-width: 0px;
  }
*/

export const ContainerUpdates = styled.div`
  width: 100%;
`;

export const IcoPlus = styled(FaPlusCircle)`
  color: ${props => props.theme.palette.SUCCESS.DARK};
`;

export const IcoMinus = styled(FaMinusCircle)`
  color: ${props => props.theme.palette.ERROR.DARK};
`;

export const IcoEdit = styled(MdEdit)`
  color: ${props => props.theme.palette.PRIMARY.MAIN};
`;

export const ContainerTable = styled.div`
  padding: 20px;
  border: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  border-radius: 0px 8px 8px 8px;

  table.unstyledTable {
  }
  table.unstyledTable td,
  table.unstyledTable th {
  }
  table.unstyledTable thead {
    background: ${props => props.theme.palette.GREYSCALE.GREY_SIX};
  }
  table.unstyledTable thead th {
    font-weight: normal;
  }

  .date-line {
    width: 80px;
  }

  .subst-line {
    width: 120px;
    color: ${props => props.theme.palette.PRIMARY.MAIN};
    word-break: break-word;
    cursor: pointer;
    @media (max-width: 1220px) {
      width: 100px;
    }
  }

  .regleg-line {
    width: 160px;
    color: ${props => props.theme.palette.PRIMARY.MAIN};
    cursor: pointer;
    @media (max-width: 1220px) {
      width: 100px;
    }
  }
`;

export const ContainerTableLeft = styled.div`
  width: 100%;
`;

export const TextUpdate = styled.p`
  overflow: auto;
  max-height: 87px;
`;

export const ContainerTablePriorityRank = styled.div`
  table.unstyledTable {
  }
  table.unstyledTable td,
  table.unstyledTable th {
  }
  table.unstyledTable thead {
    background: ${props => props.theme.palette.GREYSCALE.GREY_SIX};
  }
  table.unstyledTable thead th {
    font-weight: normal;
  }
  display: flex;
  flex-direction: row;
  width: 100%;
`;
export const ContainerTableNotification = styled.div`
  table.unstyledTable {
  }
  table.unstyledTable td,
  table.unstyledTable th {
  }
  table.unstyledTable thead {
    background: ${props => props.theme.palette.GREYSCALE.GREY_SIX};
  }
  table.unstyledTable thead th {
    font-weight: normal;
  }
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TableHead = styled.thead`
  th {
    border-top: none;
  }
`;
export const TableHeadItem = styled.th`
  text-align: left;
  border-right: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  background-color: ${props => props.theme.palette.TABLE.BACKGROUND_HEADER};
  color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR} !important;
  text-decoration: none !important;
  cursor: default !important;
  font-weight: 600;

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
  word-break: break-word;
`;

export const ContainerHeatMap = styled.div`
  width: 39%;
  @media (max-width: 1220px) {
    width: 100%;
  }
`;

export const ContainerLine = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 1220px) {
    display: block;
  }
`;

export const ContainerPagination = styled.div`
  display: flex;
  justify-content: end;
`;

export const TabsWrapper = styled.div`
  display: inline-block;
  padding: 4px 6px;
  background-color: ${props => props.theme.palette.BACKGROUND.PROFILE};
  margin-bottom: 5px;
  border-radius: 8px;
`;

export const ContainerTabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
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

export const TableList = styled.table`
  border: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  border-radius: 8px;
  border-spacing: 0;
  font-size: 14px;
  width: 100%;
  position: relative;
  min-height: 219px;
  table-layout: fixed;
  margin: 10px 0;
`;

export const NicknameRegLeg = styled(NavLink)`
  display: flex;
  flex-direction: column;
`;

export const NameRegLeg = styled.span`
  width: 100%;
  word-break: break-word;
  display: inline-block;
`;

export const ContainerTables = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ContainerIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const ContainerSpin = styled.div`
  max-height: 400px;
  height: 100%;
  top: 0;
  position: absolute;
  display: flex;
  align-items: center;
`;

export const RecentViewSpin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -20px;
`;

export const NoRecentView = styled.div`
  margin:10px
`

export const ContainerLoadingTable = styled.div`
  position: absolute;
  width: 100%;
  top: 0px;
  align-items: center;
  display: flex;
  justify-content: center;
  height: calc(100% - 28px);
  background-color: white;
  font-size: 35px;
  border-radius: 0 0 8px 8px;
  opacity: 0.8;
  transition: opacity 0.3s;

  svg {
    animation: loading 1.5s infinite ease;
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }
`;

export const BigCircle = styled.div<IBackgroundColor>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 35px;
  border-radius: 25px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  margin: auto;
`;

export const BigCircleText = styled.p`
  font-size: 17px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
`;

export const ContainerEmpty = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: absolute;
`;

export const RecentViewBox = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid gainsboro;
    border-radius: 4px;
`

export const RecentViewText = styled.div`
    font-size: 14px;
    text-decoration: underline;
    border-bottom: 1px solid gainsboro;
    padding: 10px
`
