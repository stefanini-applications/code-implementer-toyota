import { FaSearch, FaFilePdf } from 'react-icons/fa';

import styled from 'styled-components';

export const Container = styled.div``;

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

export const TableList = styled.table`
  -- border: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  border-radius: 8px;
  border-spacing: 0;
  font-size: 14px;
  width: 100%;
  position: relative;
  min-height: 219px;
  table-layout: fixed;
`;

export const ContainerLoadingTable = styled.div`
  position: absolute;
  width: 100%;
  /* height: 400px; */
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

export const ContainerSpin = styled.div`
  max-height: 400px;
  height: 100%;
  top: 0;
  position: absolute;
  display: flex;
  align-items: center;
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

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
  width: 324px;
  input {
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
  }
`;

export const SearchIcon = styled(FaSearch).attrs(props => ({
  ...props,
  size: 13,
  color: props.theme.palette.GREYSCALE.GREY_THREE
}))``;

export const ContainerLoadingSearch = styled.div`
  display: none;
  align-items: center;
  justify-content: center;

  svg {
    animation: loading 1.5s infinite ease;
    font-size: 14px;
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

export const AttachmentsContainer = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  padding: 20px;
  border: 1px solid ${props => props.theme.palette.TABLE.BORDER};
  border-radius: 0px 8px 8px 8px;
`;

export const Attachment = styled.div`
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  margin-top: 5px;
  position: relative;
  padding: 13px 22px;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
`;

export const TitleAttachment = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DateAttachment = styled.p`
  font-size: 14px;
  display: inline-block;
  position: absolute;
  font-weight: bold;
  color: ${props => props.theme.palette.GREYSCALE.DARK};
  top: -8px;
  background-color: ${props => props.theme.palette.PRIMARY.WHITE};
`;
export const DescAttachment = styled.p``;
export const UserAttachment = styled.p`
  font-weight: bold;
  color: ${props => props.theme.palette.GREYSCALE.GREY_TWO};
`;

export const ContainerAttachmentRegulationRegion = styled.div`
  font-size: 14px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;
export const AttachmentRegulation = styled.span`
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
`;

export const SpanSentenceCase = styled.span`
  text-transform: capitalize;
  font-weight: bold;
`;

export const SpanLinkSentenceCase = styled.span`
  text-transform: capitalize;
  font-weight: bold;
  a:hover {
    text-transform: capitalize;
    font-weight: bold;
    text-decoration: underline;
    color: rgb(105, 177, 255);
  }
`;

export const LinkSentenceCase = styled.a`
`;

export const AttachmentFile = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 10px;
  align-items: center;
  cursor: pointer;

  svg {
    font-size: 23px;
    color: ${props => props.theme.palette.PRIMARY.MAIN};
  }
`;

export const PDFIco = styled(FaFilePdf)`
  color: ${props => props.theme.palette.GREYSCALE.GREY_TWO};
`;

export const Filename = styled.div`
  cursor: pointer;
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  text-decoration: underline;
  word-break: break-word;
`;
