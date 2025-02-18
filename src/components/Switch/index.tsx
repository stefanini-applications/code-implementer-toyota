import React from 'react';

import { DisableContainer, Disable, ActiveContainer, Active } from './styled';

interface ISwitch {
  active?: boolean;
  onSwitchClick?: () => void;
}

const Switch: React.FC<ISwitch> = ({ active = false, onSwitchClick }) => {
  return active ? (
    <ActiveContainer onClick={onSwitchClick}>
      <span />
      <Active />
    </ActiveContainer>
  ) : (
    <DisableContainer onClick={onSwitchClick}>
      <Disable />
      <span />
    </DisableContainer>
  );
};

export default Switch;
