/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { groupSubstances } from '../../services/api';
import { Container } from './styled';

interface DataType {
  id: string;
  name: string;
  phase: number;
  restrictionLevel: number;
  type: string;
  children?: any;
}

interface ITableTree {
  relatedData: any;
  columnsTable: any;
  onUpdateTreeData?: any;
  loadingStatus: boolean;
  reference: any;
}

const TreeTable: React.FC<ITableTree> = ({
  relatedData,
  columnsTable,
  onUpdateTreeData,
  loadingStatus,
  reference
}) => {
  const columns: ColumnsType<DataType> = columnsTable;
  const [loading, setLoading] = useState(false);

  // const getGroupSubstances = (record) => {
  //   setLoading(true);
  //   groupSubstances(record.id, reference)
  //   .then((response) => {
  //     if (response?.data?.message && onUpdateTreeData) {
  //       onUpdateTreeData(record.id, response?.data?.message);
  //     }
  //     setLoading(false);
  //   }).catch((err) => {
  //     setLoading(false);
  //   });
  // };

  return (
    <Container>
      <Table
        columns={columns}
        dataSource={relatedData}
        onExpand={(exp, record) => {
          if (
            record.type === 'Group'
            && exp
            && record?.children.length > 0
            && record?.children[0].dummyRow
          ) {
            // getGroupSubstances(record);
            console.log('b')
          }
        }}
        loading={loading || loadingStatus}
      />{' '}
    </Container>
  );
};

export default TreeTable;
