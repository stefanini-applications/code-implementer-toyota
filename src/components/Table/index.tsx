/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import { Form, Table } from 'antd';

import { Container } from './styled';

interface ITable {
  dataTable?: any;
  columnsTable?: any;
  loading?: boolean;
  rowSelection?: any;
  rowKey?: any;
  editCell?: any;
  showPagination?: any;
  onChange?: any;
  locale?: any;
  showSorterTooltip?: boolean;
}

const TableAnt: React.FC<ITable> = ({
  rowKey,
  dataTable,
  columnsTable,
  loading,
  rowSelection,
  editCell,
  showPagination,
  onChange,
  locale,
  showSorterTooltip = false
}) => {
  const [form] = Form.useForm();
  console.log('columnsTable', columnsTable);
  return (
    <Container>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: editCell
            }
          }}
          locale={{ emptyText: loading ? ' ': '', ...locale }}
          rowKey={rowKey}
          rowSelection={rowSelection}
          rowClassName="editable-row"
          loading={loading}
          columns={columnsTable}
          dataSource={dataTable}
          pagination={showPagination || false}
          bordered
          onChange={onChange}
          showSorterTooltip={showSorterTooltip}
        />
      </Form>
    </Container>
  );
};

export default TableAnt;
