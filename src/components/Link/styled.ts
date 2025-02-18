import { NavLink } from 'react-router-dom';

import styled from 'styled-components';

interface ILink {
  isDisabled?: boolean;
  flex?: boolean;
}

export const StyledLink = styled(NavLink)<ILink>`
  display: ${props => (props.flex ? 'flex' : '')};
  align-items: center;
  gap: 5px;
  font-size: 14px;

  cursor: ${props => (props.isDisabled ? 'no-drop' : 'pointer')};

  svg {
    color: ${props =>
      props.isDisabled ? props.theme.palette.GREYSCALE.GREY_TWO : ''};
  }

  color: ${props =>
    props.isDisabled ? props.theme.palette.GREYSCALE.GREY_TWO : ''};

  &:hover {
    color: ${props =>
      props.isDisabled ? props.theme.palette.GREYSCALE.GREY_TWO : ''};
    text-decoration: ${props => (props.isDisabled ? 'none' : '')};
  }
`;

export const FakeLink = styled.span<ILink>`
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  cursor: pointer;
  text-decoration: none;
  transition: color 0.3s;
  font-size: 14px;

  cursor: ${props => (props.isDisabled ? 'no-drop' : 'pointer')};

  svg {
    color: ${props =>
      props.isDisabled ? props.theme.palette.GREYSCALE.GREY_TWO : ''};
  }

  color: ${props =>
    props.isDisabled ? props.theme.palette.GREYSCALE.GREY_TWO : ''};

  &:hover {
    color: ${props =>
      props.isDisabled ? props.theme.palette.GREYSCALE.GREY_TWO : ''};
    text-decoration: ${props => (props.isDisabled ? 'none' : '')};
  }

  &:hover {
    text-decoration: underline;
    color: #69b1ff;

    > p,
    > span {
      text-decoration: underline;
    }
  }
`;
