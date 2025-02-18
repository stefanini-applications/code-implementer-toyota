import { IoMdClose } from 'react-icons/io';

import styled from 'styled-components';

export const ContainerError = styled.div`
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
  z-index: 90;
  /* backdrop-filter: blur(4px); */

  @media (max-width: 1040px) {
    justify-content: unset;
  }

  label {
    font-size: 14px;
    color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
    margin-bottom: 4px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  height: 84%;
  padding: 0 40px;

  width: 960px;
`;

export const ContentNote = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  height: 80px;
  padding: 0 40px;

  max-height: 70%;
  width: 960px;
`;

export const SheetName = styled.p`
  margin-top:20px;
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
`;

export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background-color: ${props => props.theme.palette.GREYSCALE.TRANSLUCENT_THREE};
  position: absolute;
`;

export const Scroll = styled.div`
  height: calc(100% - 48px);
  overflow-y: auto;
  overflow-x: auto;
  position: relative;
  top: 5px;
`;

export const ItemsWrap = styled.p`
  margin:5px
`;

export const Items = styled.div`
  width: 100%;
  height: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UpdateModal = styled.div`
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

export const TitleModal = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  align-items: center;
  background-color: ${props => props.theme.palette.PRIMARY.WHITE};
  z-index: 100;
  width: 960px;
  padding: 20px 40px;
  border-radius: 10px 10px 0 0;

  @media (max-width: 1040px) {
    width: 880px;
  }
`;

export const CloseIcon = styled(IoMdClose)`
  cursor: pointer;
  font-size: 20px;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
`;

export const EntireName = styled.div`
  position: absolute;
  top: 20px;
  overflow: visible;
  opacity: 0;
  pointer-events: none;
  font-size: 11px;
  background-color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
  color: ${props => props.theme.palette.PRIMARY.WHITE};
  padding: 8px 16px;
  border-radius: 10px;
  font-weight: 700;
  z-index: 100;
  box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.17), 0px 2px 4px rgba(0, 0, 0, 0.05);
  transition: 0.3s ease;
  text-align: center;
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