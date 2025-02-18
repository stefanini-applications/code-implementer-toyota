import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { MdKeyboardArrowRight, MdEdit } from 'react-icons/md';

import { transparentize } from 'polished';
import styled from 'styled-components';

interface IBackgroundColor {
  backgroundColor?: string;
}

export const Container = styled.div`
  display: flex;
  height: 100%;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: ${props => props.theme.palette.GREYSCALE.TRANSLUCENT_THREE};
  align-items: center;
  justify-content: center;
  z-index: 100;
  /* backdrop-filter: blur(4px); */

  @media (max-width: 1040px) {
    justify-content: unset;
  }

  label {
    font-size: 14px;
    color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
    margin-bottom: 4px;
  }

  input {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
  }
`;

export const Warning = styled(HiOutlineExclamationCircle).attrs(props => ({
  ...props,
  size: 16,
  color: props.theme.palette.ERROR.DARK
}))`
  margin-right: 7px;
`;

export const AlertText = styled.p`
  color: ${props => props.theme.palette.ERROR.DARK};
  font-family: 'Roboto Light', sans-serif;
  font-size: 11.5px;
`;

export const XIcon = styled(IoMdClose)`
  cursor: pointer;
  font-size: 20px;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
`;
export const TitleModal = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  align-items: center;
  /* border-bottom: 1px solid ${props =>
    props.theme.palette.GREYSCALE.GREY_TWO}; */
  padding-bottom: 20px;
  margin-bottom: 20px;
  /* position: fixed; */
  background-color: ${props => props.theme.palette.PRIMARY.WHITE};
  z-index: 100;
  width: 960px;
  padding: 20px 40px;
  border-radius: 10px 10px 0 0;
  /* box-shadow: 0px 4px 21px rgba(0, 0, 0, 0.06), 0px 1px 4px rgba(0, 0, 0, 0.03); */

  @media (max-width: 1040px) {
    width: 880px;
  }
`;

export const ImapctAssessmentModal = styled.div`
  border-radius: 10px;
  width: 1040px;
  height: 90%;
  background-color: ${props => props.theme.palette.BACKGROUND.DEFAULT};
  box-shadow: 0px 4px 21px rgba(0, 0, 0, 0.28), 0px 1px 4px rgba(0, 0, 0, 0.16);
  padding-bottom: 72px;

  z-index: 100;
  position: relative;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 1040px) {
    width: 960px;
    min-width: 960px;
    margin: auto;
  }

  transform: scale(1);
  animation: expand 0.3s 1 ease-in-out;

  @keyframes expand {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
`;
export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
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

export const CurrentPage = styled.p`
  font-size: 12px;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
`;

export const ArrowDown = styled(MdKeyboardArrowRight).attrs(props => ({
  ...props,
  size: 16,
  color: transparentize(0.1, props.theme.palette.TEXT.PRIMARY)
}))`
  opacity: 0.8;
`;

export const PDFIcon = styled.img`
  height: 30px;
  width: 30px;
  margin-right: 10px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: auto;
  height: 84%;
  padding: 0 40px;

  max-height: 70%;
  width: 960px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  /* box-shadow: 1px 1px 21px rgb(0 0 0 / 6%), 0px 1px 4px rgb(0 0 0 / 3%); */
  padding-bottom: 20px;
  margin-bottom: 20px;
  /* position: fixed; */
  background-color: ${props => props.theme.palette.PRIMARY.WHITE};
  z-index: 100;
  width: 960px;
  padding: 20px 40px;
  border-radius: 00px 0px 10px 10px;
  /* border-top: 1px solid ${props =>
    props.theme.palette.GREYSCALE.GREY_TWO}; */
  bottom: 0px;

  @media (max-width: 1040px) {
    width: 880px;
  }
`;

interface LabelProp {
  noMargin?: boolean;
}

export const BoldLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const BoldLabel = styled.p`
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
`;

export const EditRecord = styled(MdEdit).attrs(props => ({
  ...props,
  size: 16,
  color: props.theme.palette.TEXT.CONTRAST_ONE
}))`
  opacity: 0.8;
  margin-left: 5px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const UnderlinedText = styled.p`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  text-decoration: underline;
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  margin-right: 25px;
  cursor: pointer;
`;

export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background-color: ${props => props.theme.palette.GREYSCALE.TRANSLUCENT_THREE};
  position: absolute;
`;

export const InfoWrapperOpen = styled.div`
  display: flex;
  align-items: center;
`;

export const InfoTextOpen = styled.p`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
`;

export const InfoDataOpenName = styled.p`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  margin-left: 5px;
  word-break: break-all;
`;

export const InfoWrapperOpenDate = styled.div`
  display: flex;
  align-items: center;
  min-width: 170px;
  justify-content: right;
`;

export const InfoDateOpen = styled.p`
  font-size: 14px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  margin-left: 5px;
`;

interface ITableStructure {
  selectedArea?: boolean;
}

export const ImpactAssessmentTable = styled.section<ITableStructure>`
  display: grid;
  grid-template-areas: ${({ selectedArea }) =>
    selectedArea
      ? `'d e f g h i j xx' 'k o p t x ab af aj'`
      : `
    'd e f g h i j xx'
    'k o p t x ab af aj'
    'l o q u y ac ag ak'
    'm o r v z ad ah al'
    'n o s w aa ae ai am'`};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-bottom: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-radius: 5px;
`;

export const TitleColumnOne = styled.div`
  grid-area: a;
  text-align: center;
  font-size: 14px;
  text-transform: uppercase;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-radius: 5px 0px 0px 0px;
  color: ${props => transparentize(0.1, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
`;

export const TitleColumnTwo = styled.div`
  grid-area: b;
  text-align: center;
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 14px;
  text-transform: uppercase;
  color: ${props => transparentize(0.1, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
`;

export const TitleColumnThree = styled.div`
  grid-area: c;
  text-align: center;
  border-radius: 0px 5px 0px 0px;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 14px;
  text-transform: uppercase;
  color: ${props => transparentize(0.1, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
`;

export const SubColumnOne = styled.div`
  grid-area: d;
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
  grid-area: xx;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => transparentize(0.3, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
  border-radius: 0px 5px 0px 0px;
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
  font-size: 50px;
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

export const MiddleWrapperOpen = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
`;

export const BigCircle = styled.div<IBackgroundColor>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 35px;
  border-radius: 25px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  min-width: 35px;
`;

export const BigCircleText = styled.p`
  font-size: 17px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
`;
