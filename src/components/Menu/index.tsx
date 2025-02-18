/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

import { MenuProps, Tooltip , Menu } from 'antd';


import { Container, PlusIcon } from './styled';

interface IMenu {
  items?: MenuProps['items'];
  styling?: string;
  onClickItem?: any;
  onClickMenu?: any;
  disabled?: boolean;
  tooltip?: any;
}

const MenuAnt: React.FC<IMenu> = ({
  items,
  styling,
  onClickItem,
  onClickMenu,
  disabled,
  tooltip
}) => {
  const [current, setCurrent] = useState<any>([]);

  const onClick: MenuProps['onClick'] = e => {
    onClickItem(e);
  };


  return tooltip && disabled ? (
    <Tooltip title={tooltip}>
      <Container
        disabled={disabled}
        styling={styling === 'button' ? 'button' : ''}
      >
        <Menu
          onClick={onClick}
          selectedKeys={current}
          mode="horizontal"
          items={items}
          disabled={disabled}
          triggerSubMenuAction="click"
          onOpenChange={onClickMenu}
        />
      </Container>
    </Tooltip>
  ) : (
    <Container
      disabled={disabled}
      styling={styling === 'button' ? 'button' : ''}
    >
      <Menu
          onClick={onClick}
        selectedKeys={current}
        mode="horizontal"
        items={items}
        disabled={disabled}
        triggerSubMenuAction="click"
        onOpenChange={onClickMenu}
      />
    </Container>
  );
};

export default MenuAnt;
