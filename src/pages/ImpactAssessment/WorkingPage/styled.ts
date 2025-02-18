import { FiExternalLink } from 'react-icons/fi';
import { MdKeyboardArrowRight } from 'react-icons/md';

import { transparentize } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-width: 940px;
  padding: 0 10px;
  margin: auto;

  textarea {
    font-family: 'Roboto', sans-serif;
    border: none;
    resize: vertical;
  }
  .t1-scope-comments {
    min-width: 900px;
    padding: 0;
    @media (max-width: 1200px) {
      min-width: 570px;
    }
    textarea {
      border: none;
      resize: vertical;
      min-height: 119px;
    }
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  p {
    margin: 0;
  }
`;

export const AttachmentsButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const AttachmentsCount = styled.div`
  font-size: 14px;
`;

export const ErrorContainer = styled.div`
  color: #ff4d4f;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ContainerImpact = styled.div``;

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

export const MiddleInformation = styled.div``;

export const TitleMiddleInfo = styled.p`
  font-weight: bold;
  margin-bottom: 10px;
`;

export const SwitchContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
  align-items: center;
`;

export const TextSwitchContainer = styled.p``;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  left: 0;
  right: 0;
  gap: 30px;
  width: 100%;
  overflow-x: hidden;
  margin: auto;
  border-radius: 2px;
  z-index: 1;
  background-color: ${props => props.theme.palette.PRIMARY.WHITE};
  border-radius: 8px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
  margin-top: 20px;
`;

export const TitleContainer = styled.div`
  display: flex;
  padding: 15px 0;
  margin-top: 15px;
`;

export const Title = styled.p`
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.DARK};
  font-weight: bold;
  word-break: break-word;
`;

export const SelectPicker = styled.select`
  padding: 7px 10px;
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-radius: 6px;
  -webkit-appearance: none;
  appearance: none;
  padding-right: 24px;
`;

export const SelectWrapper = styled.div`
  position: relative;

  /* &:after {
    content: '▾';
    font-size: 1rem;
    top: 6px;
    right: 10px;
    position: absolute;
    pointer-events: none;
    color: ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  } */
`;

interface LabelProp {
  noMargin?: boolean;
}

export const LabelPlaceholders = styled.div<LabelProp>`
  font-size: 11px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
  margin-bottom: ${props => (props.noMargin ? undefined : '12px')};
  margin-top: ${props => (props.noMargin ? undefined : '-4px')};
  display: flex;
`;

export const Label = styled.p<LabelProp>`
  font-size: 11px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
  margin-bottom: ${props => (props.noMargin ? undefined : '12px')};
  margin-top: ${props => (props.noMargin ? undefined : '-4px')};
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
  grid-template-columns: 2fr 1fr 10fr 2fr;

  // .t1-phase-label:before {
  //   font-weight: normal;
  //   display: inline-block;
  //   margin-inline-end: 4px;
  //   color: #ff4d4f;
  //   font-size: 14px;
  //   font-family: SimSun, sans-serif;
  //   line-height: 1;
  //   content: '*';
  // }
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
  font-size: 11px;
  color: ${props => transparentize(0.3, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
`;

export const TopSubColumnTwo = styled.div`
  grid-area: c;
  text-align: center;
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
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
`;

export const TopSubOneCelThree = styled.div`
  grid-area: h;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TopSubOneCelFour = styled.div`
  grid-area: i;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TopSubTwoCelOne = styled.div`
  grid-area: j;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 30px;
  text-align: center;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
`;

export const TopSubThreeCelOne = styled.div`
  grid-area: k;
  position: relative;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 12px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
`;

export const TopSubThreeCelTwo = styled.div`
  position: relative;
  grid-area: l;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 12px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
`;

interface IValidationError {
  bottom?: boolean;
}

export const ValidationError = styled.div<IValidationError>`
  color: #ff4d4f;
  font-size: 14px;
  position: absolute;
  top: ${props => (!props.bottom ? '0' : undefined)};
  bottom: ${props => (props.bottom ? '0' : undefined)};
  z-index: 10;
  background-color: white;
  cursor: default;
  padding: 10px;
`;

export const TopSubThreeCelThree = styled.div`
  grid-area: m;
  position: relative;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 12px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
`;

export const TopSubThreeCelFour = styled.div`
  grid-area: n;
  position: relative;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 12px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
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
    'a a a a a b b b'
    'c e xa f g h i ya'
    'j o xb s w aa ae yb'
    'k p xc t x ab af yc'
    'l q xd u y ac ag yd'
    'm r xe v z ad ah ye';
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-radius: 5px;
  grid-template-columns: 2fr 1fr 1fr 1fr 4fr 1fr 1fr 3fr;
`;

export const BottomTitleColumnOne = styled.div`
  grid-area: a;
  text-align: center;
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
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: bold;
  padding: 10px 0;
`;

export const BottomTitleColumnThree = styled.div`
  grid-area: xx;
  text-align: center;
  font-size: 14px;
  text-transform: uppercase;
  color: ${props => transparentize(0.1, props.theme.palette.TEXT.PRIMARY)};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-weight: bold;
  padding: 10px 0;
`;

export const BottomSubColumnOne = styled.div`
  grid-area: c;
  text-align: center;
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
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => transparentize(0.3, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
`;

export const BottomSubColumnThree = styled.div`
  grid-area: e;
  text-align: center;
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => transparentize(0.3, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
`;

export const BottomSubColumnSites = styled.div`
  grid-area: xa;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  font-size: 11px;
  color: ${props => transparentize(0.3, props.theme.palette.TEXT.PRIMARY)};
  font-weight: bold;
  padding: 10px 0;
`;

export const BottomSubColumnFour = styled.div`
  grid-area: f;
  text-align: center;
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
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

export const BottomSubColumnComment = styled.div`
  grid-area: ya;
  text-align: center;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
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
  font-size: 30px;
  text-align: center;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  textarea {
    resize: none !important;
  }
`;

export const BottomSubThreeCelOne = styled.div`
  grid-area: o;
  position: relative;
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
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
  position: relative;
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
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
  position: relative;
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
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
  position: relative;
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  resize: none;
  textarea {
    resize: none !important;
  }
`;

export const BottomSubSitesCelOne = styled.div`
  background-color: #e6e6e6;
  grid-area: xb;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  resize: none;
  textarea {
    resize: none !important;
  }
  pointer-events: none;
`;

export const BottomSubSitesCelTwo = styled.div`
  grid-area: xc;
  position: relative;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_THREE};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  resize: none;
  textarea {
    resize: none !important;
  }
`;

export const BottomSubSitesCelThree = styled.div`
  grid-area: xd;
  position: relative;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  resize: none;
  textarea {
    resize: none !important;
  }
`;

export const BottomSubSitesCelFour = styled.div`
  background-color: #e6e6e6;
  grid-area: xe;
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
  position: relative;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const BottomSubFourCelTwo = styled.div`
  grid-area: t;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  color: ${props => props.theme.palette.TEXT.PRIMARY};
`;

export const BottomSubFourCelThree = styled.div`
  grid-area: u;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  color: ${props => props.theme.palette.TEXT.PRIMARY};
`;

export const BottomSubFourCelFour = styled.div`
  grid-area: v;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-right: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  color: ${props => props.theme.palette.TEXT.PRIMARY};
`;

export const BottomSubFiveCelOne = styled.div`
  grid-area: w;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  textarea {
    min-height: 100px;
  }
  @media (max-width: 1200px) {
    min-width: 300px;
  }
  min-height: 100px;
`;

export const BottomSubFiveCelTwo = styled.div`
  grid-area: x;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  min-height: 100px;
  textarea {
    min-height: 100px;
  }
  @media (max-width: 1200px) {
    min-width: 300px;
  }
`;

export const BottomSubFiveCelThree = styled.div`
  grid-area: y;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  min-height: 100px;
  textarea {
    min-height: 100px;
  }
  @media (max-width: 1200px) {
    min-width: 300px;
  }
`;

export const BottomSubFiveCelFour = styled.div`
  grid-area: z;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  min-height: 100px;
  textarea {
    min-height: 100px;
  }
  @media (max-width: 1200px) {
    min-width: 300px;
  }
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

export const BottomSubCommentCelOne = styled.div`
  grid-area: yb;
  position: relative;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  min-height: 100px;
  textarea {
    min-height: 100px;
  }
  @media (max-width: 1200px) {
    min-width: 300px;
  }
`;

export const BottomSubCommentCelTwo = styled.div`
  grid-area: yc;
  position: relative;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  min-height: 100px;
  textarea {
    min-height: 100px;
  }
  @media (max-width: 1200px) {
    min-width: 300px;
  }
`;

export const BottomSubCommentCelThree = styled.div`
  grid-area: yd;
  position: relative;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  min-height: 100px;
  textarea {
    min-height: 100px;
  }
  @media (max-width: 1200px) {
    min-width: 300px;
  }
`;

export const BottomSubCommentCelFour = styled.div`
  grid-area: ye;
  position: relative;
  border-top: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  border-left: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  min-height: 100px;
  textarea {
    min-height: 100px;
  }
  @media (max-width: 1200px) {
    min-width: 300px;
  }
`;

export const DropdownContainer = styled.div`
  .rs-picker {
    width: 216px;
  }

  & > div {
    width: 224px;
    font-size: 14px;
  }
  margin-top: -6px;
`;

export const TextTableNumber = styled.input`
  width: 97%;
  margin-left: -1px;
  height: 95%;
  border: none;
  padding: 5px 0px 0px 5px;
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  @media (min-width: 1200px) {
    width: 80px;
  }
`;

export const EditLegislationContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EditLegislationButton = styled.div`
  display: flex;
  cursor: pointer;
  text-decoration: underline;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  gap: 2px;
  color: #3661fd;
  &:hover {
    color: #69b1ff;
  }
`;

export const EditLegislationIco = styled(FiExternalLink)`
  width: 14px;
  margin-top: 3px;
`;
