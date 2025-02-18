import React, { useState } from 'react';

import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';

import { Container } from './styled';

interface IPagination {
  totalPage: number;
  current: number;
  handleClick?: any;
  handlePageChange?: any;
  selectPageSize?: boolean;
  pageSizeTotal?: number;
  defaultPageSize?: number;
  pageSizeOptions?: any;
}

const App: React.FC<IPagination> = ({
  totalPage,
  current,
  handleClick,
  handlePageChange,
  selectPageSize,
  pageSizeTotal,
  defaultPageSize,
  pageSizeOptions
}) => {
  const onChange: PaginationProps['onChange'] = (page, size) => {
    handleClick(page, size);
  };

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    currentPage,
    pageSize,
  ) => {
    handlePageChange(pageSize);
  };

  const showSelectPageSize = !!selectPageSize;

  return (
    <Container>
      <Pagination
        showSizeChanger={showSelectPageSize}
        onChange={onChange}
        onShowSizeChange={onShowSizeChange}
        defaultPageSize={defaultPageSize}
        pageSizeOptions={pageSizeOptions}
        // defaultCurrent={current}
        total={totalPage}
        pageSize={pageSizeTotal || 10}
        current={current}
      />
    </Container>
  );
};

export default App;
