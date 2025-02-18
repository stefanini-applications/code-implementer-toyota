import { MdKeyboardArrowRight } from 'react-icons/md';

import { transparentize } from 'polished';
import styled from 'styled-components';

interface GrpLabelProp {
  noMargin?: boolean;
}

export const Container = styled.div`
  padding-bottom: 20px;
  padding-top: 10px;
  /* max-width: 1240px; */
  min-width: 940px;
  margin: auto;
  padding-right: 10px;
  padding-left: 10px;
  .ant-pagination {
    margin-top: 3px;
  }
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

export const Label = styled.p`
  font-size: 11px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
  margin-bottom: 8px;
`;

export const ContainerFields = styled.div`
  display: flex;
  gap: 20px;
`;

export const ErrorContainer = styled.div`
  color: #ff4d4f;
  font-size: 14px;
  font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
  margin-top: -20px;
`

interface FieldProp {
  marginTop?: string;
}

export const Field = styled.div<FieldProp>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: ${props => props.marginTop || undefined};
`;

export const ContainerTransfer = styled.div`
  margin-top: 50px;
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  gap: 15px;
`;

export const SubLabel = styled.p`
  font-size: 14px;
`;

export const GrpLabel = styled.p<GrpLabelProp>`
  font-size: 11px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
  margin-bottom: ${props => (props.noMargin ? undefined : '8px')};
`;

export const BreadCrumbsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const BreadCrumbs = styled.a`
  font-size: 12px;
  margin-left: 3px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
  text-decoration: none;

  &:hover {
    color: ${props => transparentize(0.4, props.theme.palette.TEXT.PRIMARY)};
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const CurrentPage = styled.p`
  font-size: 12px;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
  width: 500px;
  word-break: break-word;
`;

export const ArrowDown = styled(MdKeyboardArrowRight).attrs(props => ({
  ...props,
  size: 16,
  color: transparentize(0.1, props.theme.palette.TEXT.PRIMARY)
}))`
  opacity: 0.8;
`;
