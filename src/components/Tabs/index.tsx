/* eslint-disable no-unused-expressions */
import React from 'react';

import { Tabs } from 'antd'

import { Container, TableLine } from './styled';

interface ITabs {
  type?: any;
  items: any;
  onChange?: any;
  activeKey?: string;
  fullPage?: boolean;
}

const TabsAnt: React.FC<ITabs> = ({
  type,
  items,
  onChange,
  activeKey = "1",
  fullPage = false,
}) => {

  return (
    <>
      <Container fullPage={fullPage}>
        {fullPage ? (<TableLine />) : null}
        <Tabs activeKey={activeKey} defaultActiveKey="1" type={type && "card"} items={items} onChange={onChange} />
      </Container>
    </>
  );
};

export default TabsAnt;
