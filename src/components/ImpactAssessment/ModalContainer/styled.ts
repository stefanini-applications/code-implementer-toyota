import { transparentize } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: 1050;
  background-color: red;

  textarea {
    font-family: 'Roboto', sans-serif;
    border: none;
    resize: vertical;
  }

  .t1-scope-comments {
    min-width: 900px;
    padding: 0;
    textarea {
      border: none;
      resize: vertical;
      min-height: 119px;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  position: absolute;
  padding: 20px;
  left: 0;
  right: 0;
  gap: 30px;
  width: 92%;
  height: 85%;
  overflow-x: hidden;
  margin: auto;
  border-radius: 2px;
  z-index: 1;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.07);
  background-color: ${props => props.theme.palette.PRIMARY.WHITE};

  /* ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.04);
    box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.04);
    background-color: rgba(204, 204, 204, 0.5);
  }

  ::-webkit-scrollbar-thumb {
    border: 0px solid transparent !important;
    -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
    box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
    background-color: ${props => props.theme.palette.PRIMARY.MAIN_TWO};
    border: 0;
  } */
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TitleContainer = styled.div`
  display: flex;
  padding: 15px 0;
  margin-top: 15px;
`;

export const Title = styled.p`
  font-size: 16px;
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.DARK};
`;

export const Label = styled.p`
  font-size: 13px;
  font-family: 'Roboto', sans-serif;
  text-align: center;
  margin: 0 4px 0 12px;
  color: ${props => props.theme.palette.TEXT.TERTIARY};
  opacity: 0.8;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ButtonsGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
`;

export const Save = styled.button`
  position: relative;
  border: none;
  box-shadow: inset 2px 3px 4px ${props => props.theme.palette.BUTTON.LIGHT},
    inset -2px -3px 4px ${props => props.theme.palette.BUTTON.SHADOW};
  border-radius: 8px;
  background: ${props => props.theme.palette.BUTTON.BACKGROUND};
  font-size: 16px;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  outline: none;
  padding: 7px 20px;
  transition: all 0.5s ease;

  &:hover {
    background: ${props => props.theme.palette.BUTTON.HOVER};
    box-shadow: none;
    cursor: pointer;
  }

  &:active {
    box-shadow: inset 2px 2px 4px rgba(5, 37, 152, 0.62);
    transition: all 0s;
  }
`;

export const Cancel = styled.button`
  position: relative;
  border: 1px solid ${props => props.theme.palette.PRIMARY.MAIN};
  border-radius: 8px;
  background-color: transparent;
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  display: flex;
  align-items: center;
  outline: none;
  padding: 7px 20px;
  transition: all 0.5s ease;
  white-space: nowrap;

  svg {
    fill: ${props => props.theme.palette.PRIMARY.MAIN};
    margin-right: 6px;
    transition: all 0.5s ease;
  }

  &:hover {
    background: ${props => props.theme.palette.BUTTON.HOVER};
    box-shadow: none;
    cursor: pointer;
    color: ${props => props.theme.palette.PRIMARY.WHITE};

    svg {
      fill: ${props => props.theme.palette.PRIMARY.WHITE};
    }
  }
`;

export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
`;

export const ImpactAssessmentTable = styled.div``;

export const TopSideTable = styled.section`
  display: grid;
  grid-template-areas:
    'a a a a'
    'b c d e'
    'f j k o'
    'g j l p'
    'h j m q'
    'i j n r';
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  margin-bottom: 40px;
  border-radius: 5px;
`;

export const TopTitleRowColumn = styled.div`
  grid-area: a;
  text-align: center;
  border-bottom: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 14px;
  text-transform: uppercase;
  color: ${props => transparentize(0.1, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
`;

export const TopSubColumnOne = styled.div`
  grid-area: b;
  text-align: center;
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => transparentize(0.3, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
`;

export const TopSubColumnTwo = styled.div`
  grid-area: c;
  text-align: center;
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => transparentize(0.3, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
`;

export const TopSubColumnThree = styled.div`
  grid-area: d;
  text-align: center;
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => transparentize(0.3, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0 !important;
`;

export const TopSubColumnFour = styled.div`
  grid-area: e;
  text-align: center;
  font-size: 11px;
  color: ${props => transparentize(0.3, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
`;

export const TopSubOneCelOne = styled.div`
  grid-area: f;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TopSubOneCelTwo = styled.div`
  grid-area: g;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
`;

export const TopSubOneCelThree = styled.div`
  grid-area: h;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
`;

export const TopSubOneCelFour = styled.div`
  grid-area: i;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
`;

export const TopSubTwoCelOne = styled.div`
  grid-area: j;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 50px;
  text-align: center;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
`;

export const TopSubThreeCelOne = styled.div`
  grid-area: k;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 12px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  padding: 5px;
`;

export const TopSubThreeCelTwo = styled.div`
  grid-area: l;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 12px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  padding: 5px;
`;

export const TopSubThreeCelThree = styled.div`
  grid-area: m;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 12px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  padding: 5px;
`;

export const TopSubThreeCelFour = styled.div`
  grid-area: n;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 12px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  padding: 5px;
`;

export const TopSubFourCelOne = styled.div`
  grid-area: o;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  padding: 20px 0;
`;

export const TopSubFourCelTwo = styled.div`
  grid-area: p;
  display: flex;
  justify-content: center;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  padding: 20px 0;
  align-items: center;
`;

export const TopSubFourCelThree = styled.div`
  grid-area: q;
  display: flex;
  justify-content: center;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  padding: 20px 0;
  align-items: center;
`;

export const TopSubFourCelFour = styled.div`
  grid-area: r;
  display: flex;
  justify-content: center;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  padding: 20px 0;
  align-items: center;
`;

export const BottomSideTable = styled.section`
  display: grid;
  grid-template-areas:
    'a a a a a b b'
    'c d e f g h i'
    'j n o s w aa ae'
    'k n p t x ab af'
    'l n q u y ac ag'
    'm n r v z ad ah';
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-radius: 5px;
`;

export const BottomTitleColumnOne = styled.div`
  grid-area: a;
  text-align: center;
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 14px;
  text-transform: uppercase;
  color: ${props => transparentize(0.1, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
`;

export const BottomTitleColumnTwo = styled.div`
  grid-area: b;
  text-align: center;
  font-size: 14px;
  text-transform: uppercase;
  color: ${props => transparentize(0.1, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
`;

export const BottomSubColumnOne = styled.div`
  grid-area: c;
  text-align: center;
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => transparentize(0.3, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
`;

export const BottomSubColumnTwo = styled.div`
  grid-area: d;
  text-align: center;
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => transparentize(0.3, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
`;

export const BottomSubColumnThree = styled.div`
  grid-area: e;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => transparentize(0.3, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
`;

export const BottomSubColumnFour = styled.div`
  grid-area: f;
  text-align: center;
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => transparentize(0.3, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
`;

export const BottomSubColumnFive = styled.div`
  grid-area: g;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => transparentize(0.3, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
`;

export const BottomSubColumnSix = styled.div`
  grid-area: h;
  text-align: center;
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => transparentize(0.3, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
`;

export const BottomSubColumnSeven = styled.div`
  grid-area: i;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => transparentize(0.3, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
`;

export const BottomSubOneCelOne = styled.div`
  grid-area: j;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  padding: 10px 0 30px 5px;
  text-transform: uppercase;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

export const BottomSubOneCelTwo = styled.div`
  grid-area: k;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  padding: 10px 0 30px 5px;
  text-transform: uppercase;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

export const BottomSubOneCelThree = styled.div`
  grid-area: l;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  padding: 10px 0 30px 5px;
  text-transform: uppercase;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

export const BottomSubOneCelFour = styled.div`
  grid-area: m;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  padding: 10px 0 30px 5px;
  text-transform: uppercase;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

export const BottomSubTwoCelOne = styled.div`
  grid-area: n;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 50px;
  text-align: center;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  textarea {
    resize: none !important;
  }
`;

export const BottomSubThreeCelOne = styled.div`
  grid-area: o;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  resize: none;
  textarea {
    resize: none !important;
  }
`;

export const BottomSubThreeCelTwo = styled.div`
  grid-area: p;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  resize: none;
  textarea {
    resize: none !important;
  }
`;

export const BottomSubThreeCelThree = styled.div`
  grid-area: q;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  resize: none;
  textarea {
    resize: none !important;
  }
`;

export const BottomSubThreeCelFour = styled.div`
  grid-area: r;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  resize: none;
  textarea {
    resize: none !important;
  }
`;

export const BottomSubFourCelOne = styled.div`
  grid-area: s;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  textarea {
    min-height: 100px;
  }
  min-width: 600px;
  min-height: 100px;
`;

export const BottomSubFourCelTwo = styled.div`
  grid-area: t;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  min-height: 100px;
  min-width: 600px;
  textarea {
    min-height: 100px;
  }
`;

export const BottomSubFourCelThree = styled.div`
  grid-area: u;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  min-height: 100px;
  min-width: 600px;
  textarea {
    min-height: 100px;
  }
`;

export const BottomSubFourCelFour = styled.div`
  grid-area: v;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  min-height: 100px;
  min-width: 600px;
  textarea {
    min-height: 100px;
  }
`;

export const BottomSubFiveCelOne = styled.div`
  grid-area: w;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
`;

export const BottomSubFiveCelTwo = styled.div`
  grid-area: x;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
`;

export const BottomSubFiveCelThree = styled.div`
  grid-area: y;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
`;

export const BottomSubFiveCelFour = styled.div`
  grid-area: z;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
`;

export const BottomSubSixCelOne = styled.div`
  grid-area: aa;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
`;
export const BottomSubSixCelTwo = styled.div`
  grid-area: ab;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
`;

export const BottomSubSixCelThree = styled.div`
  grid-area: ac;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
`;

export const BottomSubSixCelFour = styled.div`
  grid-area: ad;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
`;

export const BottomSubSevenCelOne = styled.div`
  grid-area: ae;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
`;

export const BottomSubSevenCelTwo = styled.div`
  grid-area: af;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
`;

export const BottomSubSevenCelThree = styled.div`
  grid-area: ag;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
`;

export const BottomSubSevenCelFour = styled.div`
  grid-area: ah;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
`;
