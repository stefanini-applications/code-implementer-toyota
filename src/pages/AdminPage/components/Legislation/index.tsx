/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Tooltip } from 'antd';

import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import Link from '../../../../components/Link';
import PaginationAnt from '../../../../components/Pagination';
import TableAnt from '../../../../components/Table';
import { translate } from '../../../../locales';
import itemsPerPage from '../../../../mocks/items-per-page';
import history from '../../../../routes/history';
import {
  selectors,
  getLegislationsRequest,
  deleteLegislationRecordRequest
} from '../../../../store/modules/legislations/actions';
import {
  Container,
  ContainerLabelTable,
  ContainerPagination,
  ContainerTable,
  ItemsPerPage,
  Label,
  Pagination,
  RowContainer,
  Search,
  SearchIcon,
  ContainerButtons,
  Checkbox,
  Table,
  TableBody,
  TableHead,
  TableHeadItem,
  TableItem,
  TableRow,
  TableItemClickableLegislation,
  ContainerLoadingTable,
  ContainerLoadingSearch,
  NoResult
} from './styled';
import PaginationSearch from '../../../../components/PaginationSearch';
import { ToastError } from '../../../../components/Toast';

interface Props {
  onItemSelected: () => void;
}

const Legislation: React.FC<Props> = ({ onItemSelected }) => {
  const [editTableView, seteditTableView] = useState(false);
  const [itemsPerPageCount, setItemsPerPageCount] = useState(10);
  const userInput: any = useRef('');
  const [autoFocus, setAutoFocus] = useState(false);
  const [controlRun, setControlRun] = useState(0);
  const [loadingTable, setLoadingTable] = useState(false);
  const [legislationsCheckedForDelete, setLegislationsCheckedForDelete] =
    useState<Array<any>>([]);
  const dispatch = useDispatch();
  const paginationInfo = useSelector(selectors.legislationsPaginationInfo);
  const listLegislations = useSelector(selectors.legislations);
  const userRole = localStorage.getItem('user.role');
  const pageInf = itemsPerPage.find(
    itm => itm.number === paginationInfo?.PageSize
  );
  const [itemsPerPageData, setItemsPerPage] = useState<any>({
    optionId: pageInf ? pageInf.id : 1,
    optionValue: pageInf ? pageInf.number : 10
  });
  const type = 'Legislation';

  const [sortOrderCol1, setSortOrderCol1] = useState<any>(null);
  const [sortOrderCol2, setSortOrderCol2] = useState<any>(null);
  const [sortOrderCol3, setSortOrderCol3] = useState<any>(null);
  const [sortOrderCol4, setSortOrderCol4] = useState<any>(null);
  const [sortKey, setSortKey] = useState<any>('');
  const [sortClicked, setSortClicked] = useState<any>(false);

  const sortOrderLookup = {
    billTitle: { ascend: 'ASC', descend: 'DESC' },
    nickname: { ascend: 'ASC', descend: 'DESC' },
    year: { ascend: 'ASC', descend: 'DESC' },
    status: { ascend: 'ASC', descend: 'DESC' },
  };

  const direction = sortOrderLookup[sortKey]?.[sortOrderCol1] ?? 
  sortOrderLookup[sortKey]?.[sortOrderCol2] ?? 
  sortOrderLookup[sortKey]?.[sortOrderCol3] ??
  sortOrderLookup[sortKey]?.[sortOrderCol4] ?? '';

  useEffect(() => {
    dispatch(
      getLegislationsRequest({
        searchText: '',
        type,
        pageNumber: paginationInfo?.CurrentPage || 1,
        pageSize: itemsPerPageCount,
        sortKey,
        direction
      })
    );
  }, []);

  useEffect(() => {
    if (sortClicked) {
      setLoadingTable(true);
      setSortClicked(false);
      setControlRun(1);
      dispatch(
        getLegislationsRequest({
          searchText: userInput.current,
          type,
          pageNumber: paginationInfo?.CurrentPage || 1,
          pageSize: itemsPerPageCount,          
          sortKey,
          direction
        })
      );
    }    
  }, [sortClicked]);

  const handleOnChange = (pagination, filters, sorter, extra) => {
    switch (sorter.field) {
      case 'year':        
        setSortKey('year');
        setSortOrderCol1(sortOrderCol1 === 'ascend' || sortOrderCol1 === null ? 'descend' : 'ascend');
        setAutoFocus(false);
        setSortOrderCol2(null);
        setSortOrderCol3(null);
        setSortOrderCol4(null);
        break;
      case 'billTitle':        
        setSortKey('billTitle');
        setSortOrderCol2(sortOrderCol2 === 'ascend' || sortOrderCol2 === null ? 'descend' : 'ascend');
        setAutoFocus(false);
        setSortOrderCol1(null);
        setSortOrderCol3(null);
        setSortOrderCol4(null);
        break;
      case 'nickname':        
        setSortKey('nickname');
        setSortOrderCol3(sortOrderCol3 === 'ascend' || sortOrderCol3 === null ? 'descend' : 'ascend');
        setAutoFocus(false);
        setSortOrderCol1(null);
        setSortOrderCol2(null);
        setSortOrderCol4(null);
        break;
        case 'status':        
        setSortKey('status');
        setSortOrderCol4(sortOrderCol4 === 'ascend' || sortOrderCol4 === null ? 'descend' : 'ascend');
        setAutoFocus(false);
        setSortOrderCol1(null);
        setSortOrderCol2(null);
        setSortOrderCol3(null);
        break;
      default:
        break;
    }
    setSortClicked(true);        
  };

  const handlePagination = (page, size) => {
    setLoadingTable(true);
    setControlRun(1);
    setItemsPerPageCount(size)
    dispatch(
      getLegislationsRequest({
        searchText: userInput.current,
        type,
        pageNumber: page,
        pageSize: size,
        sortKey,
        direction
      })
    );
  };

  const RemoveLines = () => {
    if(legislationsCheckedForDelete.length){
      dispatch(deleteLegislationRecordRequest(legislationsCheckedForDelete));
      setLegislationsCheckedForDelete([]);
    }else{
      ToastError(`Please select a record to be deleted`);
    }
    
  };

  const onSetLegislationsCheckedForDelete = (id: number, checked: boolean) => {
    if (checked) {
      if (!legislationsCheckedForDelete.includes(id)) {
        setLegislationsCheckedForDelete([...legislationsCheckedForDelete, id]);
      }
    } else {
      setLegislationsCheckedForDelete(
        legislationsCheckedForDelete.filter(value => {
          return value != id;
        })
      );
    }
  };

  function handleUserSearchInput(value) {
    setLoadingTable(true);
    setControlRun(1);
    dispatch(
      getLegislationsRequest({
        searchText: value,
        type,
        pageNumber: 1,
        pageSize: itemsPerPageCount,
        sortKey,
        direction
      })
    );
    userInput.current = value;

    if (!autoFocus) {
      setAutoFocus(true);
    }
  }

  const toCamelCase = (str) => {
    return str
      .toLowerCase()
      .replace(/_([a-z])/g, (_, char) => char.toUpperCase())
      .replace(/^./, (char) => char.toUpperCase());
  };

  function clickHandler(event, id) {
    event.preventDefault();
    if (event.button === 0 && !event.ctrlKey) {
      onItemSelected();
      history.push(`/legislation/${id}`);
    }

    if (event.ctrlKey || event.metaKey || event.button === 1) {
      window.open(`/legislation/${id}`, '_blank');
    }
  }

  useEffect(() => {
    setLoadingTable(true);
  }, [getLegislationsRequest, setItemsPerPage]);

  useEffect(() => {
    setControlRun(controlRun + 1);
    if (controlRun == 1) {
      setLoadingTable(false);
    }
  }, [listLegislations]);

  const rowSelection = {
    renderCell: (_, record) => (
      <Checkbox
        type="checkbox"
        onChange={event =>
          onSetLegislationsCheckedForDelete(
            record.id,
            event.currentTarget.checked
          )
        }
      />
    ),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange: (selectedRowKeys: React.Key[], selectedRows, record, event) => {
    }
  };

  const columnsTable = [
    {
      title: 'Year',
      editable: true,
      dataIndex: 'year',
      textWrap: 'word-break',
      ellipsis: true,
      render: (text, record) => {
        return (
          <Link
            fakeLink
            onClick={() => {
              clickHandler(event, record.id);
            }}
            onAuxClick={() => {
              clickHandler(event, record.id);
            }}
          >
            <Tooltip title={text}>
              {text}
            </Tooltip>
          </Link>
        );
      },
      sortOrder: sortOrderCol1,
      sorter: (a, b) => {
        // do nothing
      }
    },
    {
      title: 'Legislation Name',
      editable: true,
      dataIndex: 'billTitle',
      textWrap: 'word-break',
      ellipsis: true,
      render: (text, record) => {
        return (
          <Link
            fakeLink
            onClick={() => {
              clickHandler(event, record.id);
            }}
            onAuxClick={() => {
              clickHandler(event, record.id);
            }}
          >
            <Tooltip title={text}>
              {text}
            </Tooltip>
          </Link>
        );
      },
      sortOrder: sortOrderCol2,
      sorter: (a, b) => {
        // do nothing
      }
    },
    {
      title: 'Nickname',
      editable: true,
      textWrap: 'word-break',
      ellipsis: true,
      dataIndex: 'nickname',
      render: (text, record) => {
        return <span><Tooltip title={text}>
          {text}
        </Tooltip></span>;
      },
      sortOrder: sortOrderCol3,
      sorter: (a, b) => {
        // do nothing
      }
    },
    {
      title: 'Status',
      editable: true,
      textWrap: 'word-break',
      ellipsis: true,
      dataIndex: 'status',
      render: (text, record) => {
        // Convert status text to Camel Case
        const camelCaseText = toCamelCase(text);
        return (
          <span>
            <Tooltip title={camelCaseText}>
              {camelCaseText}
            </Tooltip>
          </span>
        );
      },
      sortOrder: sortOrderCol4,
      sorter: (a, b) => {
        // do nothing
      }
    }
  ];

  return (
    <Container>
      <ContainerLabelTable>
        <Label />
        <ContainerButtons>
          <Button
            onClick={() => seteditTableView(!editTableView)}
            text="Edit Table"
            isDisabled={
              userRole == null ||
              userRole == 'Read-only' ||
              userRole == 'Normal User'
            }
          />
        </ContainerButtons>
      </ContainerLabelTable>

      <ContainerPagination>
          {editTableView ? (
             <ContainerButtons>
            <Button danger text="Remove Lines" onClick={RemoveLines} />
            </ContainerButtons>
          ) : null}
        <PaginationSearch
          isSearchBar
           onPaginationSearchChangeInput={handleUserSearchInput} 
           defaultPaginationSearchText={userInput.current}
           autoFocus={autoFocus}
          current={paginationInfo?.CurrentPage}
          totalPage={paginationInfo?.TotalCount}
          pageSizeTotal={paginationInfo?.PageSize}
          selectPageSize
          handleClick={handlePagination}
          handlePageChange={pageSize => {
            setItemsPerPageCount(pageSize);
          }}
          />
      </ContainerPagination>

        <TableAnt
          rowKey="id"
          columnsTable={columnsTable}
          rowSelection={editTableView ? {
            type: editTableView ? 'checkbox' : 'radio',
            ...rowSelection,
          } : null}
          dataTable={listLegislations}
          loading={loadingTable}
          onChange={handleOnChange}
          locale={{
            triggerDesc: 'Click to sort descending',
            triggerAsc: 'Click to sort descending',
            cancelSort: 'Click to sort ascending'
          }}
        />
      <PaginationSearch 
      current={paginationInfo?.CurrentPage}
      totalPage={paginationInfo?.TotalCount}
      pageSizeTotal={paginationInfo?.PageSize}
      selectPageSize
      isBottom
      handleClick={handlePagination}
      handlePageChange={pageSize => {
        setItemsPerPageCount(pageSize);
      }}
      />
    </Container>
  );
};

export default Legislation;