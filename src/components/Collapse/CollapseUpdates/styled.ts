import { GrAttachment } from 'react-icons/gr';

import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  .ant-collapse-header-text {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .date-update {
    min-width: 90px;
    font-weight: bold;
    padding-left: 10px;
  }

  .ant-collapse-header-text {
    padding-right: 120px;
  }
`;

export const ContainerLoading = styled.div`
  position: absolute;
  z-index: 13;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  background-color: rgba(255, 255, 255, 0.5);
`;

export const ContainerButtonsDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RelatedAttachmentsContainer = styled.div``;

export const ContainerAttachmentsUpdate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Attachment = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 20px;
`;

export const MetaDataAttachment = styled.div``;

export const UsernameAttachment = styled.p`
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
`;

export const DataAttachment = styled.p``;
export const DescriptionAttachment = styled.div`
  display: flex;
  gap: 5px;
  margin-left: 10px;
  align-items: center;
`;

interface FilenameProps {
  maxWidth?: string;
}

export const ContainerItemsUpdate = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  gap: 5px;
`;

export const ContainerItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Bold = styled.span`
  font-weight: bold;
`;

export const TitleUpdateContainer = styled.div`
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  button {
    font-size: 14px;
  }
  .ck {
    width: calc(100% - 7px);
    word-break: break-word;
    overflow-wrap: break-word;
  }
  .ck-editor__top {
    display: none;
  }
  .ck.ck-editor__main > .ck-editor__editable:not(.ck-focused) {
    border-radius: 0px;
  }
`;

export const EntireCollapsibleName = styled.div`
  display: block;
  position: absolute;
  top: 37px;
  overflow: visible;
  word-break: break-word;
  width: 100%;
  opacity: 0;
  pointer-events: none;
  font-size: 14px;
  background-color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
  color: ${props => props.theme.palette.PRIMARY.WHITE};
  padding: 8px 16px;
  border-radius: 10px;
  z-index: 100;
  box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.17), 0px 2px 4px rgba(0, 0, 0, 0.05);
  transition: 0.3s ease;
  width: auto;
  left: 10px;
  text-align: left;
  max-width: 500px;
  transition-delay: 0.2s;
  transform: scale(0.2);
  &::after {
    content: '';
    top: -4px;
    position: absolute;
    z-index: 10;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
    left: 50%;
  }
`;

export const ContainerDescriptionAttachment = styled.div`
  position: relative;
`;

export const DateUpdate = styled.p`
  font-size: 14px;
  display: inline-block;
  position: absolute;
  font-weight: bold;
  color: #17161c;
  top: 13px;
  right: 18px;
`;

export const EditUpdateButton = styled.div`
  display: flex;
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  font-size: 16px;
  gap: 5px;
  align-items: center;
  cursor: pointer;
`;

export const RelatedSubstancesContainer = styled.div``;

export const EntireSubstanceName = styled.div`
  position: absolute;
  top: 20px;
  overflow: visible;
  width: 85.2%;
  opacity: 0;
  pointer-events: none;
  font-size: 12px;
  background-color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
  color: ${props => props.theme.palette.PRIMARY.WHITE};
  padding: 8px 16px;
  border-radius: 10px;
  z-index: 100;
  box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.17), 0px 2px 4px rgba(0, 0, 0, 0.05);
  transition: 0.3s ease;
  text-align: left;
  width: auto;
  &::after {
    content: '';
    top: -4px;
    position: absolute;
    z-index: 10;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
    left: 47%;
  }
  word-break: break-word;
`;

export const EntireName = styled.div`
  position: absolute;
  top: 20px;
  overflow: visible;
  opacity: 0;
  pointer-events: none;
  font-size: 12px;
  background-color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
  color: ${props => props.theme.palette.PRIMARY.WHITE};
  padding: 8px 16px;
  border-radius: 10px;
  z-index: 100;
  box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.17), 0px 2px 4px rgba(0, 0, 0, 0.05);
  transition: 0.3s ease;
  text-align: left;
  max-width: 668px;
  line-break: anywhere;
  &::after {
    content: '';
    top: -4px;
    position: absolute;
    z-index: 10;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
    left: 47%;
  }
`;

export const TitleUpdateSeparator = styled.p`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 5px;
`;

export const ContainerSubstancesUpdate = styled.div``;
export const UlSubstances = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  li {
    position: relative;
    p {
      white-space: nowrap;
      overflow: hidden;
      color: ${props => props.theme.palette.PRIMARY.MAIN};
      text-decoration: underline;
      cursor: pointer;
      &:hover {
        color: ${props => props.theme.palette.PRIMARY.DARK};
      }
    }
  }
`;

interface DescriptionProps {
  maxWidth?: string;
}

export const TextDescriptionAttachment = styled.p<DescriptionProps>`
  max-width: ${({ maxWidth }) => (maxWidth !== undefined ? maxWidth : '55ch')};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const AttachmentIco = styled(GrAttachment)`
  fill: ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  height: 25px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ButtonsEditContainer = styled.div`
  display: flex;
  justify-content: right;
  gap: 10px;
  button {
    width: 100%;
  }
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
  z-index: 120;
`;

export const ContainerButton = styled.div`
  position: relative;
`;

export const UpdateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  li {
    margin-left: 20px;
    display: list-item !important;
  }
  width: 100%;
  height: auto;

  .ck-read-only {
    border: none;
    padding: 0;
  }

  .ck-read-only p {
    margin: 0 !important;
  }

  .ck {
    height: auto;
  }
`;

export const CkContainer = styled.div`
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY_TWO};
  padding: 5px;
`;

export const ContainerItemsLeft = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

export const ContainerPanel = styled.div`
  position: relative;
`;

export const ContainerDate = styled.div`
  position: relative;
`;
