/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';

import { Transfer as TransferAnt } from 'antd';
import type { TransferDirection } from 'antd/es/transfer';

import { Container } from './styled';

interface RecordType {
  key: string;
  id: string;
  name: string;
}

interface ITransfer {
  data: RecordType[];
  defaultOptions?: any;
  onTransferChange?: any;
  showSearch?: boolean;
  filterOption?: any;
  fieldKey?: string;
}

const Transfer: React.FC<ITransfer> = ({ data, defaultOptions, onTransferChange, showSearch, filterOption, fieldKey='id' }) => {
  const [targetKeys, setTargetKeys] = useState<any>(defaultOptions?.map(x => x[fieldKey]));
  const [selectedKeys, setSelectedKeys] = useState<any>([]);

  const handleChange = (
    newTargetKeys: string[],
    direction: TransferDirection,
    moveKeys: string[],
  ) => {
    setTargetKeys(newTargetKeys);
    onTransferChange && onTransferChange(newTargetKeys)
  };
  const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  return (
    <Container>
      <TransferAnt
        rowKey={(record) => record[fieldKey]}
        dataSource={data}
        titles={['Source', 'Target']}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onSelectChange={onSelectChange}
        onChange={handleChange}
        className="ant-transfer-customize-list"
        render={(item) => item.name}
        oneWay
        showSearch={showSearch}
        filterOption={filterOption}
      />
    </Container>
  );
};

export default Transfer;
