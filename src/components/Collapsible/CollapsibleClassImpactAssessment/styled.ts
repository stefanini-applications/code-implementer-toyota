import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import { transparentize } from 'polished';
import styled from 'styled-components';

export const ContainerClosed = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: transparent;
  align-items: center;
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  margin-top: 15px;
  overflow: hidden;
  padding: 0 22px;
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  margin-top: 15px;
  position: relative;
  border-radius: 10px;
`;

export const ArrowDown = styled(FaChevronDown).attrs(props => ({
  ...props,
  size: 14,
  color: props.theme.palette.PRIMARY.MAIN
}))`
  cursor: pointer;
`;

export const BigCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 35px;
  border-radius: 25px;
  background-color: ${props => props.theme.palette.PHASE.SIX};
`;

export const BigCircleText = styled.p`
  font-size: 17px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
`;

export const CollapsibleClosed = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const MiddleWrapperClosed = styled.div`
  display: flex;
  align-items: center;
`;

export const InfoDateClosed = styled.p`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  margin-right: 20px;
  display: flex;
  font-weight: bold;
`;

export const LabelDateUpdate = styled.p`
  margin-right: 5px;
  font-weight: normal;
`;

export const InfoPhaseClosed = styled.p`
  display: flex;
  font-size: 22px;
  height: 100%;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: ${props => transparentize(0.4, props.theme.palette.TEXT.PRIMARY)};
  background-color: ${props => props.theme.palette.PHASE.FIVE};
  padding: 8px 35px;
`;

export const InfoTextClosed = styled.p`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  margin-left: 45px;
`;

export const InfoDataClosed = styled.p`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  margin-left: 5px;
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
  margin: 15px 0;
`;

export const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Label = styled.p`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
`;

export const ArrowUp = styled(FaChevronUp).attrs(props => ({
  ...props,
  size: 14,
  color: props.theme.palette.PRIMARY.MAIN
}))`
  cursor: pointer;
  margin: 0 5px 0 15px;
`;

export const MiddleWrapperOpen = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
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

export const InfoDataOpen = styled.p`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  margin-left: 5px;
`;

export const InfoDateOpen = styled.p`
  font-size: 14px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  margin-left: 5px;
`;

export const ImpactAssessmentTable = styled.section`
  display: grid;
  grid-template-areas:
    'a a a b b c c xx'
    'd e f g h i j xx'
    'k o p t x ab af aj'
    'l o q u y ac ag ak'
    'm o r v z ad ah al'
    'n o s w aa ae ai am';

  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-bottom: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-radius: 5px;
`;

export const InvisibleColumn = styled.div`
  grid-area: xx;
`;

export const TitleColumnOne = styled.div`
  grid-area: a;
  text-align: center;
  font-size: 14px;
  text-transform: uppercase;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
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
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => transparentize(0.3, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
`;

export const SubColumnTwo = styled.div`
  grid-area: e;
  text-align: center;
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

export const SubOneCelOne = styled.div`
  grid-area: k;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubOneCelTwo = styled.div`
  grid-area: l;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubOneCelThree = styled.div`
  grid-area: m;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubOneCelFour = styled.div`
  grid-area: n;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubTwoCelOne = styled.div`
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
  background-color: ${props => props.theme.palette.PHASE.FIVE};
`;

export const SubThreeCelOne = styled.div`
  grid-area: p;
  text-align: center;
  font-weight: bold;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  padding: 10px 0;
`;

export const SubThreeCelTwo = styled.div`
  grid-area: q;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: bold;
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  padding: 10px 0;
`;

export const SubThreeCelThree = styled.div`
  grid-area: r;
  text-align: center;
  font-weight: bold;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  padding: 10px 0;
`;

export const SubThreeCelFour = styled.div`
  grid-area: s;
  text-align: center;
  font-weight: bold;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  padding: 10px 0;
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

export const SubFourCelTwo = styled.div`
  grid-area: u;
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

export const SubFourCelThree = styled.div`
  grid-area: v;
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

export const SubFourCelFour = styled.div`
  grid-area: w;
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

export const SubFiveCelTwo = styled.div`
  grid-area: y;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: bold;
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubFiveCelThree = styled.div`
  grid-area: z;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: bold;
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubFiveCelFour = styled.div`
  grid-area: aa;
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
export const SubSixCelTwo = styled.div`
  grid-area: ac;
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

export const SubSixCelThree = styled.div`
  grid-area: ad;
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

export const SubSixCelFour = styled.div`
  grid-area: ae;
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
  font-weight: bold;
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubSevenCelTwo = styled.div`
  grid-area: ag;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: bold;
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubSevenCelThree = styled.div`
  grid-area: ah;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: bold;
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubSevenCelFour = styled.div`
  grid-area: ai;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
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
  border-radius: 0px 5px 0px 0px;

  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: bold;
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubEightCelTwo = styled.div`
  grid-area: ak;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: bold;
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubEightCelThree = styled.div`
  grid-area: al;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: bold;
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubEightCelFour = styled.div`
  grid-area: am;
  text-align: center;
  border-radius: 0px 0px 5px 0px;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: bold;
  font-size: 27px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`;
