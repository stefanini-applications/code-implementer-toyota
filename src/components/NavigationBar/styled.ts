import { BsPlus } from 'react-icons/bs';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

import { Menu } from 'antd';
import styled from 'styled-components';

interface IOpenButtons {
  open?: any;
}

interface IButton {
  isDisabled?: boolean;
}

export const Container = styled.div`
  background-color: ${props => props.theme.palette.GREYSCALE.GREY};
  padding-bottom: 20px;
  padding-top: 20px;
  width: calc(100% - 4px);
`;

export const ContainerItems = styled.div`
  display: flex;
  height: 40px;
  justify-content: space-between;
  // max-width: 1240px;
  min-width: 940px;
  margin: auto;
  padding-left: 30px;
    padding-right: 30px;
  @media (max-width: 1270px) {
    gap: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

export const LinkNav = styled(NavLink)`
  text-decoration: none;
  color: none;
`;

export const Touchable = styled.button`
  padding: 0;
  border: 0;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: left;

  &:hover {
    background-color: ${props => props.theme.palette.GREYSCALE.GREY};
  }
`;

export const ContainerBackground = styled.div`
  position: absolute;
  width: 100%;
  background-color: red;
  left: 0;
  height: 80px;
  top: 0;
  z-index: -1;
  background-color: ${props => props.theme.palette.GREYSCALE.GREY};
`;

export const NavItem = styled.p`
  font-size: 14px;
  color: ${props => props.theme.palette.TEXT.PRIMARY};
  cursor: pointer;
  display: flex;
  gap: 5px;
  align-items: center;
  svg {
    font-size: 11px;
  }
`;

export const Logo = styled.img`
  height: 35px;
  margin-right: 40px;
  padding-top: 10px;
  padding-bottom: 20px;
  cursor: pointer;
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: left;
  padding-top: 20px;
  padding-bottom: 25px;
  align-items: center;
  padding-right: 20px;
  width: 740px;
`;

export const AdvancedLink = styled.button`
  outline: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 11px;
  margin-left: 10px;
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.palette.PRIMARY.MAIN};
  height: 20px;
  gap: 6px;
  min-width: 87px;
`;

export const ButtonContainer = styled.div`
  button {
  }
  display: flex;
  align-items: center;
  position: relative;
`;

export const Buttons = styled.div<IOpenButtons>`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  background-color: ${props => props.theme.palette.PRIMARY.WHITE};
  border: 2px solid ${props => props.theme.palette.PRIMARY.MAIN_TWO};
  box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.17), 0px 2px 4px rgba(0, 0, 0, 0.05);

  border-radius: 8px;
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY};
  width: 150px;
  top: 36px;
  left: 0;
  z-index: 100;
  @media (max-width: 1420px) {
    right: 0;
    left: unset;
  }
`;

export const ClosableTouchable = styled.div`
  display: none;
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
`;

export const NavButton = styled.a<IButton>`
  text-decoration: none;
  display: flex;
  gap: 5px;
  color: ${({ isDisabled }) =>
    isDisabled
      ? props => props.theme.palette.GREYSCALE.GREY_TWO
      : props => props.theme.palette.PRIMARY.MAIN};
  align-items: center;
  cursor: ${({ isDisabled }) => (isDisabled ? 'none' : 'pointer')};
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : undefined)};
`;

export const TextButton = styled.text`
  text-transform: uppercase;
  font-size: 11px;
  font-weight: bold;
`;

export const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 13px;
  @media (max-width: 1220px) {
    width: 163px;
  }
`;

export const GroupNav = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 0;
`;

export const Link = styled.a``;

export const DisabledTextInfo = styled.div`
  position: absolute;
  background-color: ${props => props.theme.palette.GREYSCALE.GREY_FOUR};
  color: white;
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 12px;
  left: -24px;
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
  z-index: 120;
  box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.17), 0px 2px 4px rgba(0, 0, 0, 0.05);
`;

export const ContainerButton = styled.div`
  position: relative;
  z-index: 2;
`;

export const PlusIcon = styled(BsPlus)`
  color: ${props => props.theme.palette.PRIMARY.MAIN};
  height: 20px;
  width: 20px;
`;

export const ArrowDown = styled(FaChevronDown).attrs(props => ({
  ...props,
  size: 14,
  color: props.theme.palette.PRIMARY.WHITE
}))`
  cursor: pointer;
`;

export const ArrowDownReport = styled(FaChevronDown).attrs(props => ({
  ...props,
  size: 14
}))`
  padding-top: 4px;
  margin-right: -5px;
`;

export const SubMenu = styled(Menu.SubMenu)`
  .ant-menu-submenu-title{
    cursor: default;
  }  
`;

export const ArrowUp = styled(FaChevronUp).attrs(props => ({
  ...props,
  size: 14,
  color: props.theme.palette.PRIMARY.WHITE
}))`
  cursor: pointer;
`;
