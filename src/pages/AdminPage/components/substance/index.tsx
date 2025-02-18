/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Space, Tooltip } from 'antd';

import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import Link from '../../../../components/Link';
import PaginationAnt from '../../../../components/Pagination';
import TableAnt from '../../../../components/Table';
import itemsPerPage from '../../../../mocks/items-per-page';
import history from '../../../../routes/history';
import {
  selectors,
  getSubstancesRequest,
  deleteSubstanceRecordRequest
} from '../../../../store/modules/substances/actions';
import {
  Container,
  ContainerLabelTable,
  ContainerPagination,
  ContainerTable,
  Label,
  Pagination,
  Search,
  SearchIcon,
  ContainerButtons,
  Checkbox,
  TextLink,
  ContainerLoadingSearch,
  ToolTipPanel,
  ToolTipName,
  DummyCheckbox,
  BreakWord,
  ContainerDummyCheckbox
} from './styled';
import PaginationSearch from '../../../../components/PaginationSearch';
import { ToastError } from '../../../../components/Toast';

interface Props {
  onItemSelected: () => void;
}

const Substance: React.FC<Props> = ({ onItemSelected }) => {
  const userInput: any = useRef('');
  const [autoFocus, setAutoFocus] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [controlRun, setControlRun] = useState(0);
  const [controlEdit, setControlEdit] = useState(0);
  const [substancesCheckedForDelete, setSubstancesCheckedForDelete] = useState<
    Array<any>
  >([]);
  const dispatch = useDispatch();
  const paginationInfo = useSelector(selectors.substancesPaginationInfo);
  const listSubstances = useSelector(selectors.substances);
  const userRole = localStorage.getItem('user.role');
  const pageInf = itemsPerPage.find(
    itm => itm.number === paginationInfo?.PageSize
  );
  const [itemsPerPageData, setItemsPerPage] = useState<any>({
    optionId: pageInf ? pageInf.id : 1,
    optionValue: pageInf ? pageInf.number : 10
  });
  const [itemsPerPageCount, setItemsPerPageCount] = useState(10);
  const type = 'Substance';
  
  const [sortOrderCol1, setSortOrderCol1] = useState<any>(null);
  const [sortOrderCol2, setSortOrderCol2] = useState<any>(null);
  const [sortOrderCol3, setSortOrderCol3] = useState<any>(null);
  const [sortKey, setSortKey] = useState<any>('');
  const [sortClicked, setSortClicked] = useState<any>(false);
  const subtanceType = 1;
  const sortOrderLookup = {
    casNumber: { ascend: 'ASC', descend: 'DESC' },
    commonName: { ascend: 'ASC', descend: 'DESC' },
  };

  const direction = sortOrderLookup[sortKey]?.[sortOrderCol1] ?? 
  sortOrderLookup[sortKey]?.[sortOrderCol2] ?? 
  sortOrderLookup[sortKey]?.[sortOrderCol3] ?? '';

  useEffect(() => {
    dispatch(
      getSubstancesRequest({
        searchText: userInput.current,
        type,
        pageNumber: 1,
        pageSize: itemsPerPageCount,
        onlyActive: false,
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
        getSubstancesRequest({
          search: userInput.current,
          type,
          pageNumber: paginationInfo?.CurrentPage || 1,
          pageSize: itemsPerPageCount,
          onlyActive: false,
          sortKey,
          direction
        })
      );
    }    
  }, [sortClicked]);

  function clickHandler(event, substance) {
    event.preventDefault();
    if (event.button === 0 && !event.ctrlKey) {
      onItemSelected();
      history.push(`/interest/${substance.casNumber}`);
    }

    if (event.ctrlKey || event.button === 1) {
      window.open(`/interest/${substance.casNumber}`, '_blank');
    }
  }

  function clickSubstanceHandler(event, id) {
    event.preventDefault();
    if (event.button === 0 && !event.ctrlKey) {
      onItemSelected();
      history.push(`/substance/${id}`);
    }

    if (event.ctrlKey || event.metaKey || event.button === 1) {
      window.open(`/substance/${id}`, '_blank');
    }
  }

  function clickHandlerPrediction(event, substance) {
    event.preventDefault();
    if (event.button === 0 && !event.ctrlKey) {
      onItemSelected();
      localStorage.setItem('id', substance.id);
      localStorage.setItem('title', substance.title);
      history.push('/prediction');
    }

    if (event.ctrlKey || event.metaKey || event.button === 1) {
      localStorage.setItem('id', substance.id);
      localStorage.setItem('title', substance.title);
      window.open(`/prediction`, '_blank');
    }
  }

  const handlePagination = (page, size) => {
    setLoadingTable(true);
    setControlRun(1);
    setItemsPerPageCount(size);

    dispatch(
      getSubstancesRequest({
        searchText: userInput.current,
        type,
        pageNumber: page,
        pageSize: size,
        onlyActive: false,
        sortKey,
        direction
      })
    );
  };

  const RemoveLines = () => {
    if(substancesCheckedForDelete.length){
      dispatch(deleteSubstanceRecordRequest(substancesCheckedForDelete));
      setSubstancesCheckedForDelete([]);
    }else{
      ToastError(`Please select a record to be deleted`);
    }
    
  };

  const onSetSubstancesCheckedForDelete = (id: number, checked: boolean) => {
    if (checked) {
      if (!substancesCheckedForDelete.includes(id)) {
        setSubstancesCheckedForDelete([...substancesCheckedForDelete, id]);
      }
    } else {
      setSubstancesCheckedForDelete(
        substancesCheckedForDelete.filter(value => {
          return value != id;
        })
      );
    }
  };

  function handleUserSearchInput(value) {
    setLoadingTable(true);
    setControlRun(1);
    dispatch(
      getSubstancesRequest({
        searchText: value,
        type,
        pageNumber: paginationInfo?.CurrentPage,
        pageSize: itemsPerPageCount,
        onlyActive: false,
        sortKey,
        direction
      })
    );
    userInput.current = value; 

    if (!autoFocus) {
      setAutoFocus(true);
    }
  }

  useEffect(() => {
    setLoadingTable(true);
  }, [getSubstancesRequest, setItemsPerPage]);

  useEffect(() => {
    setControlRun(controlRun + 1);
    if (controlRun === 1) {
      setLoadingTable(false);
    }
  }, [listSubstances]);

  const handleOnChange = (pagination, filters, sorter, extra) => {
    switch (sorter.field) {
      case 'casNumber':        
        setSortKey('casNumber');
        setSortOrderCol1(sortOrderCol1 === 'ascend' || sortOrderCol1 === null ? 'descend' : 'ascend');
        setAutoFocus(false);
        setSortOrderCol2(null);
        setSortOrderCol3(null);
        break;
      case 'commonName':        
        setSortKey('commonName');
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
  const rowSelection = {
    renderCell: (_, record) => (
      <>
        {record?.isYordasSubstance
          ? (
            <Tooltip title={`This substance is managed by another system (Yordas Hive), so it can't be deleted within GRIIPS.`}>
              <ContainerDummyCheckbox><DummyCheckbox /></ContainerDummyCheckbox>
            </Tooltip>
          )
          : <Checkbox
            type="checkbox"
            checked={substancesCheckedForDelete.includes(record.id)}
            onChange={event =>
              onSetSubstancesCheckedForDelete(
                record.id,
                event.currentTarget.checked
              )
            }
          />}
      </>
    ),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange: (selectedRowKeys: React.Key[], selectedRows, record, event) => {
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name
    })
  };

  const columnsTable: any =
    [
      {
        title: 'CAS RN',
        dataIndex: 'casNumber',
        width: 120,
        key: 'id',
        render: text => {
          return (
            <span
              style={{
                whiteSpace: 'nowrap'
              }}
            >
              {text}
            </span>
          );
        },
        sortOrder: sortOrderCol1,
        sorter: (a, b) => {
          // do nothing
        }
      },
      {
        title: 'Substance Name',
        dataIndex: 'commonName',
        textWrap: 'word-break',
        ellipsis: true,
        render: (text, record) => {
          return (
            <Link
              onClick={() => {
                clickSubstanceHandler(event, record.id);
              }}
              onAuxClick={() => {
                clickSubstanceHandler(event, record.id);
              }}
              href={`/substance/${record.id}`}>
              <TextLink>
                <Tooltip title={text}>
                  {text}
                </Tooltip>
              </TextLink>
            </Link>
          );
        },
        sortOrder: sortOrderCol2,
        sorter: (a, b) => {
          // do nothing
        }
      },
      {
        title: 'Action',
        key: 'action',
        width: 160,
        render: (_, record) => (
          <Space
            style={{
              whiteSpace: 'nowrap'
            }}
            size="middle"
          >
            <Link onClick={() => {
              clickHandler(event, record);
            }}
              onAuxClick={() => {
                clickHandler(event, record);
              }}
              href={`/interest/${record.casNumber}`}>
              <TextLink
              >
                Interest
              </TextLink>
            </Link>
            <Link
              onMouseDown={() => {
                clickHandlerPrediction(event, record);
              }}
              href="/prediction">
              <TextLink>
                Prediction
              </TextLink>
            </Link>
          </Space>
        )
      }
    ];

  return (
    <Container>
      <ContainerLabelTable>
        <Label />
        <ContainerButtons>
          <Button
            onClick={() => setControlEdit(controlEdit == 0 ? 1 : 0)}
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
        
          {controlEdit == 1 ? (
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

      <ContainerTable>
        <TableAnt
          rowSelection={controlEdit === 1 ? {
            type: controlEdit === 1 ? 'checkbox' : 'radio',
            ...rowSelection,
          } : null}
          columnsTable={columnsTable}
          dataTable={listSubstances}
          loading={loadingTable}
          onChange={handleOnChange}
          locale={{
            triggerDesc: 'Click to sort descending',
            triggerAsc: 'Click to sort descending',
            cancelSort: 'Click to sort ascending'
          }}
        />
      </ContainerTable>
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

export default Substance;