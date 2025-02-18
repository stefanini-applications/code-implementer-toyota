import { BsPlus } from 'react-icons/bs';

import styled from 'styled-components';

interface IMenu {
  styling?: string;
  disabled?: boolean;
}

export const Container = styled.div<IMenu>`
.ant-menu-submenu-title {
  background-color: ${({ styling, disabled }) =>
    styling == 'button'
      ? disabled
        ? 'rgba(0,0,0,.04)'
        : props => props.theme.palette.PRIMARY.MAIN
      : ''};
  color: ${({ styling, disabled }) =>
    styling == 'button'
      ? disabled
        ? '#707070'
        : 'white'
      : ''}!important;
  height: ${({ styling }) => (styling == 'button' ? '32px' : '')};
  display: ${({ styling }) => (styling == 'button' ? 'flex' : '')};
  align-items: ${({ styling }) => (styling == 'button' ? 'center' : '')};
  padding: ${({ styling }) => (styling == 'button' ? '0 15px' : '')};
}

.ant-menu-submenu {
  padding-inline: 0;
}

.ant-menu-overflow {
  border-bottom: ${({ styling }) => (styling == 'button' ? 'none' : '')};
}


.ant-menu .ant-menu-submenu-disabled >.ant-menu-submenu-title{
    color: #707070 !important;
}

.ant-menu-light .ant-menu-submenu-disabled {
  color: '#707070 !important' ;
}

.ant-menu-submenu-title:hover {
  background-color: ${({ styling, disabled }) =>
    styling == 'button'
      ? disabled
        ? 'rgba(0,0,0,.04)'
        : props => props.theme.palette.BUTTON.HOVER
      : '#707070'} !important;
  color: ${({ styling, disabled }) =>
    styling == 'button' ? (disabled ? '#707070' : 'white') : ''} !important;
}

.ant-menu-submenu-open::after,
.ant-menu-overflow-item::after {
  border-bottom: ${({ styling }) =>
    styling == 'button' ? 'none' : ''} !important;
}
`;

export const PlusIcon = styled(BsPlus)`
  color: ${props => props.theme.palette.PRIMARY.DARK};
  height: 20px;
  width: 20px;
  margin-bottom: 30px
`;
