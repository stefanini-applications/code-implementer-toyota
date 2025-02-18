import { Button } from 'antd';
import styled from 'styled-components';

interface ISelectedButton {
  selectedButton?: boolean;
  deleteState?: boolean;
  isDisabled?: boolean;
}

export const Container = styled.div<ISelectedButton>`
  .ant-btn-primary {
    background-color: ${({ isDisabled }) =>
      isDisabled
        ? 'rgba(0,0,0,.04)'
        : props => props.theme.palette.BUTTON.BACKGROUND};
  }
    .ant-btn-default:disabled{
    color: #707070;
    }
  .ant-btn-primary:not(:disabled):hover {
    background-color: ${props => props.theme.palette.BUTTON.HOVER};
  }

  .ant-btn-default:not(:disabled):hover {
    border-color: ${props => props.theme.palette.BUTTON.HOVER};
    color: ${props => props.theme.palette.BUTTON.HOVER};
  }

  .ant-btn-dangerous:not(:disabled):hover {
    color: #ff7875;
    border-color: #ffa39e;
  }

  button {
    display: flex;
    align-items: center;
  }

  /* &:active {
    box-shadow: ${({ deleteState, isDisabled }) =>
    isDisabled
      ? 'none'
      : deleteState
      ? props => `inset 2px 2px 4px ${props.theme.palette.BUTTON.SHADOW_ERROR}`
      : props => `inset 2px 2px 4px ${props.theme.palette.BUTTON.SHADOW}`};
    transition: all 0s;
  } */
`;

interface IButton {
  isLink?: boolean;
}

export const ButtonAnt = styled(Button)<IButton>`
  span {
    color: ${props =>
      props.isLink ? props.theme.palette.BUTTON.BACKGROUND : ''};
    text-decoration: ${props => (props.isLink ? 'underline' : '')};
  }
  span:hover {
    text-decoration: ${props => (props.isLink ? 'none' : '')};
    color: ${props => (props.isLink ? '#69b1ff' : '')};
  }
`;

export const UploadButton = styled.input`
  display: none;
`;

export const Link = styled.a`
  text-decoration: none;
`;

export const PooverText = styled.div`
  max-width: 50ch;
  min-width: 20ch;
`;
