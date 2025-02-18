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
  getRegulationsRequest,
  deleteRegulationRecordRequest
} from '../../../../store/modules/regulations/actions';
import {
  Container,
  ContainerLabelTable,
  ContainerPagination,
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
  TableItemClickable,
  ContainerLoadingTable,
  ContainerLoadingSearch,
  NoResult,
  ContainerDummyCheckbox,
  DummyCheckbox
} from './styled';
import PaginationSearch from '../../../../components/PaginationSearch';
import { ToastError } from '../../../../components/Toast';

interface Props {
  onItemSelected: () => void;
}

const Regulation: React.FC<Props> = ({ onItemSelected }) => {
  const [editTableView, seteditTableView] = useState(false);
  const [itemsPerPageCount, setItemsPerPageCount] = useState(10);
  const userInput: any = useRef('');
  const [autoFocus, setAutoFocus] = useState(false);
  const [controlRun, setControlRun] = useState(0);
  const [loadingTable, setLoadingTable] = useState(false);

  const [regulationsCheckedForDelete, setRegulationsCheckedForDelete] =
    useState<Array<any>>([]);
  const dispatch = useDispatch();
  const paginationInfo = useSelector(selectors.regulationsPaginationInfo);
  const listRegulations = useSelector(selectors.regulations);
  const userRole = localStorage.getItem('user.role');
  const pageInf = itemsPerPage.find(
    itm => itm.number === paginationInfo?.PageSize
  );
  const [itemsPerPageData, setItemsPerPage] = useState<any>({
    optionId: pageInf ? pageInf.id : 1,
    optionValue: pageInf ? pageInf.number : 10
  });
  const type = 'Regulation';

  const [sortOrderCol1, setSortOrderCol1] = useState<any>(null);
  const [sortOrderCol2, setSortOrderCol2] = useState<any>(null);
  const [sortOrderCol3, setSortOrderCol3] = useState<any>(null);
  const [sortKey, setSortKey] = useState<any>('');
  const [sortClicked, setSortClicked] = useState<any>(false);

  const sortOrderLookup = {
    billTitle: { ascend: 'ASC', descend: 'DESC' },
    nickname: { ascend: 'ASC', descend: 'DESC' },
  };

  const direction = sortOrderLookup[sortKey]?.[sortOrderCol1] ?? 
  sortOrderLookup[sortKey]?.[sortOrderCol2] ?? 
  sortOrderLookup[sortKey]?.[sortOrderCol3] ?? '';

  useEffect(() => {
    dispatch(
      getRegulationsRequest({
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
        getRegulationsRequest({
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
      case 'billTitle':        
        setSortKey('billTitle');
        setSortOrderCol1(sortOrderCol1 === 'ascend' || sortOrderCol1 === null ? 'descend' : 'ascend');
        setAutoFocus(false);
        setSortOrderCol2(null);
        setSortOrderCol3(null);
        break;
      case 'nickname':        
        setSortKey('nickname');
        setSortOrderCol2(sortOrderCol2 === 'ascend' || sortOrderCol2 === null ? 'descend' : 'ascend');
        setAutoFocus(false);
        setSortOrderCol1(null);
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
    setItemsPerPageCount(size);
    dispatch(
      getRegulationsRequest({
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
    if(regulationsCheckedForDelete.length){
      dispatch(deleteRegulationRecordRequest(regulationsCheckedForDelete));
      setRegulationsCheckedForDelete([]);
    }else{
      ToastError(`Please select a record to be deleted`);
    }
    
  };

  const onSetRegulationsCheckedForDelete = (id: number, checked: boolean) => {
    if (checked) {
      if (!regulationsCheckedForDelete.includes(id)) {
        setRegulationsCheckedForDelete([...regulationsCheckedForDelete, id]);
      }
    } else {
      setRegulationsCheckedForDelete(
        regulationsCheckedForDelete.filter(value => {
          return value != id;
        })
      );
    }
  };

  function handleUserSearchInput(value) {
    setLoadingTable(true);
    setControlRun(1);
    dispatch(
      getRegulationsRequest({
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

  function clickHandler(event, id) {
    event.preventDefault();
    if (event.button === 0 && !event.ctrlKey) {
      onItemSelected();
      history.push(`/regulation/${id}`);
    }

    if (event.ctrlKey || event.metaKey || event.button === 1) {
      window.open(`/regulation/${id}`, '_blank');
    }
  }

  useEffect(() => {
    setLoadingTable(true);
  }, [getRegulationsRequest, setItemsPerPage]);

  useEffect(() => {
    setControlRun(controlRun + 1);
    if (controlRun == 1) {
      setLoadingTable(false);
    }
  }, [listRegulations]);

  const yordasRegulations = ["44", "15", "71", "39", "22", "34", "36", "41"]

  const rowSelection = {
    renderCell: (_, record) => (
      <>
        {yordasRegulations.includes(record.id) ? (
          <Tooltip title={`This regulation is managed by another system (Yordas Hive), so it can't be deleted within GRIIPS.`}>
            <ContainerDummyCheckbox><DummyCheckbox /></ContainerDummyCheckbox>
          </Tooltip>
        ) : (
          <Checkbox
            type="checkbox"
            onChange={event =>
              onSetRegulationsCheckedForDelete(
                record.id,
                event.currentTarget.checked
              )
            }
          />
        )}
      </>
    ),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange: (selectedRowKeys: React.Key[], selectedRows, record, event) => {
    }
  };

  const columnsTable = [
    {
      title: 'Regulation Name',
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
            {text}
          </Link>
        );
        
      },
      sortOrder: sortOrderCol1,
      sorter: (a, b) => {
        // do nothing
      }
    },
    {
      title: 'Nickname',
      editable: true,
      dataIndex: 'nickname',
      textWrap: 'word-break',
      ellipsis: true,
      render: (text, record) => {
        return <span>{text}</span>;
      },
      sortOrder: sortOrderCol2,
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
          rowSelection={editTableView ? {
            type: editTableView ? 'checkbox' : 'radio',
            ...rowSelection,
          } : null}
          columnsTable={columnsTable}
          dataTable={listRegulations}
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

export default Regulation;