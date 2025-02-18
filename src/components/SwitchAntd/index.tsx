import React from 'react';

import { Switch as SwitchAntd } from 'antd';

import { Container } from './styled';

interface ISwitch {
  defaultChecked?: boolean;
  onSwitchClick?: any
  size?: any;
}

const Switch: React.FC<ISwitch> = ({ defaultChecked = false, onSwitchClick, size }) => {
  return (
    <Container>
      <SwitchAntd
        size={size}
        defaultChecked={defaultChecked}
        onChange={onSwitchClick}
      />
    </Container>
  )
};

export default Switch;
