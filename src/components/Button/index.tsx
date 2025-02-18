/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { ButtonHTMLAttributes, useRef } from 'react';

import { Popover, Tooltip } from 'antd';

import { Container, UploadButton, Link, PooverText, ButtonAnt } from './styled';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  isDisabled?: boolean;
  onClick?: any;
  type?: any;
  upload?: any;
  onChange?: any;
  danger?: boolean;
  popOverContent?: any;
  popOverTitle?: any;
  icon?: any;
  toolTip?: any;
  ref?: any;
  btnLoading?: boolean;
  style?: any;
}

const Button: React.FC<IButton> = ({
  text,
  isDisabled,
  onClick,
  type,
  upload,
  onChange,
  danger,
  btnLoading,
  popOverContent,
  popOverTitle,
  icon,
  toolTip,
  ref,
  style
}) => {
  // @ts-ignore

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return popOverContent || popOverTitle ? (
    <Popover
      content={<PooverText>{popOverContent}</PooverText>}
      title={popOverTitle}
    >
      <ButtonAnt
        icon={icon}
        disabled={isDisabled}
        type={type}
        onClick={upload ? handleClick : onClick}
        danger={danger}
        loading={btnLoading}
        ref={ref}
        style={style}
      >
        {text}
      </ButtonAnt>
    </Popover>
  ) : toolTip ? (
    <Tooltip title={toolTip}>
      <Container isDisabled={isDisabled}>
        <ButtonAnt
          icon={icon}
          disabled={isDisabled}
          type={type}
          onClick={upload ? handleClick : onClick}
          danger={danger}
          loading={btnLoading}
          ref={ref}
          style={style}
        >
          {text}
        </ButtonAnt>
        {upload ? (
          <UploadButton
            id="select-file"
            ref={inputRef}
            type="file"
            name="file"
            placeholder=""
            onChange={onChange}
            style={style}
            onClick={(e: any) => {
              // upload the same file again
              e.target.value = null;
            }}
          />
        ) : null}
      </Container>
    </Tooltip>
  ) : (
    <Container isDisabled={isDisabled}>
      <ButtonAnt
        isLink={type === 'link'}
        icon={icon}
        disabled={isDisabled}
        type={type}
        onClick={upload ? handleClick : onClick}
        danger={danger}
        loading={btnLoading}
        ref={ref}
        style={style}
      >
        {text}
      </ButtonAnt>
      {upload ? (
        <UploadButton
          id="select-file"
          ref={inputRef}
          type="file"
          name="file"
          placeholder=""
          onChange={onChange}
          onClick={(e: any) => {
            // upload the same file again
            e.target.value = null;
          }}
          style={style}
        />
      ) : null}
    </Container>
  );
};

export default Button;
