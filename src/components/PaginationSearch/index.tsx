import React from 'react';
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import Input from '../Input';
import { InputBox, PaginationSearchContainer, SearchIcon } from './styled';

interface IPaginationSearch {
  onPaginationSearchChangeInput?: any;
  defaultPaginationSearchText?: any;
  autoFocus?: any;
  isSearchBar?: boolean;
  totalPage?: number;
  current?: number;
  handleClick?: any;
  handlePageChange?: any;
  selectPageSize?: boolean;
  pageSizeTotal?: number;
  defaultPageSize?: number;
  pageSizeOptions?: any;
  isBottom?:boolean;
  placeholder?:string;
  onFocus?:any;
}

const PaginationSearch: React.FC<IPaginationSearch> = ({
  onPaginationSearchChangeInput,
  defaultPaginationSearchText,
  autoFocus,
  isSearchBar,
  totalPage,
  current,
  handleClick,
  handlePageChange,
  selectPageSize,
  pageSizeTotal,
  defaultPageSize,
  pageSizeOptions,
  isBottom,
  placeholder = "search here",
  onFocus
}) => {
  const onChange: PaginationProps['onChange'] = (page, size) => {
    handleClick(page, size);
  };

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    currentPage,
    pageSize
  ) => {
    handlePageChange(pageSize);
  };

  const showSelectPageSize = !!selectPageSize;
  return (
    <PaginationSearchContainer $bottom={isBottom}>
      <InputBox>
        {isSearchBar && (
          <Input
            className="sub-search-component"
            type="text"
            onChangeInput={onPaginationSearchChangeInput}
            prefixIcon={<SearchIcon />}
            defaultText={defaultPaginationSearchText}
            autoFocus={autoFocus}
            placeholder={placeholder}
            onFocus={onFocus}
          />
        )}
      </InputBox>
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
    </PaginationSearchContainer>
  );
};

export default PaginationSearch;
