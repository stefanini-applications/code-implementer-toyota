/* eslint-disable no-unused-expressions */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Moment from 'moment';

import Input from '../../../../components/Input';
import Link from '../../../../components/Link';
import PaginationAnt from '../../../../components/Pagination';
import TableAnt from '../../../../components/Table';
import history from '../../../../routes/history';
import {
  selectors as notificationsSelectors,
  getNotificationsRequest
} from '../../../../store/modules/notifications/actions';
import {
  Container,
  ContainerButtons,
  ContainerIcons,
  ContainerLoadingTable,
  ContainerLoadingSearch,
  ContainerPagination,
  IcoEdit,
  IcoMinus,
  IcoPlus,
  ItemActivity,
  Search,
  SearchIcon,
  TableBody,
  TableHead,
  TableHeadItem,
  TableItem,
  TableItemClickable,
  TableListPriorityRank,
  TableRow
} from './styled';
import PaginationSearch from '../../../../components/PaginationSearch';

const Activity: React.FC = () => {
  const notifications = useSelector(notificationsSelectors.notifications);
  const notificatiosPaginationInfo = useSelector(
    notificationsSelectors.notificationsPaginationInfo
  );
  const dispatch = useDispatch();
  const [loadingTable, setLoadingTable] = useState(false);
  const userInput: any = useRef('');
  const [autoFocus, setAutoFocus] = useState(false);

  const [controlRun, setControlRun] = useState(0);
  const [itemsPerPageCount, setItemsPerPageCount] = useState(10);
  const [itemsPerPageData, setItemsPerPage] = useState<any>({
    optionId: 1,
    optionValue: 10
  });
  const [sortOrderCol1, setSortOrderCol1] = useState<any>(null);
  const [sortOrderCol2, setSortOrderCol2] = useState<any>(null);
  const [sortOrderCol3, setSortOrderCol3] = useState<any>(null);
  const [sortKey, setSortKey] = useState<any>(null);
  const [sortClicked, setSortClicked] = useState<any>(false);

  useEffect(() => {
    dispatch(
      getNotificationsRequest({
        searchText: userInput.current || '',
        pageNumber: 1,
        pageSize: itemsPerPageCount,
        sortKey: sortKey || '',
        direction: sortKey === 'firstName'
          ? (sortOrderCol1 === 'ascend' ? 'ASC' : sortOrderCol1 === 'descend' ? 'DESC' : '')
          : sortKey === 'description'
            ? (sortOrderCol2 === 'ascend' ? 'ASC' : sortOrderCol2 === 'descend' ? 'DESC' : '')
            : sortKey === 'date'
              ? (sortOrderCol3 === 'ascend' ? 'ASC' : sortOrderCol3 === 'descend' ? 'DESC' : '')
              : ''
      })
    );
  }, []);

  useEffect(() => {
    if (sortClicked) {
      setLoadingTable(true);
      setSortClicked(false);
      setControlRun(1);
      dispatch(
        getNotificationsRequest({
          searchText: userInput.current || '',
          pageNumber: notificatiosPaginationInfo?.CurrentPage || 1,
          pageSize: itemsPerPageCount,
          sortKey: sortKey || '',
          direction: sortKey === 'firstName'
            ? (sortOrderCol1 === 'ascend' ? 'ASC' : sortOrderCol1 === 'descend' ? 'DESC' : '')
            : sortKey === 'description'
              ? (sortOrderCol2 === 'ascend' ? 'ASC' : sortOrderCol2 === 'descend' ? 'DESC' : '')
              : sortKey === 'date'
                ? (sortOrderCol3 === 'ascend' ? 'ASC' : sortOrderCol3 === 'descend' ? 'DESC' : '')
                : ''
        })
      );
    }
  }, [sortClicked]);

  const handleNotificationsPagination = (page, size) => {
    setLoadingTable(true);
    setControlRun(1);

    setItemsPerPageCount(size);

    dispatch(
      getNotificationsRequest({
        searchText: userInput.current || '',
        pageNumber: page,
        pageSize: size,
        sortKey: sortKey || '',
        direction: sortKey === 'firstName'
          ? (sortOrderCol1 === 'ascend' ? 'ASC' : sortOrderCol1 === 'descend' ? 'DESC' : '')
          : sortKey === 'description'
            ? (sortOrderCol2 === 'ascend' ? 'ASC' : sortOrderCol2 === 'descend' ? 'DESC' : '')
            : sortKey === 'date'
              ? (sortOrderCol3 === 'ascend' ? 'ASC' : sortOrderCol3 === 'descend' ? 'DESC' : '')
              : ''
      })
    );
  };

  function handleUserSearchInput(value) {
    setLoadingTable(true);
    setControlRun(1);
    dispatch(
      getNotificationsRequest({
        searchText: value,
        pageNumber: 1,
        pageSize: itemsPerPageCount,
        sortKey: sortKey || '',
        direction: sortKey === 'firstName'
          ? (sortOrderCol1 === 'ascend' ? 'ASC' : sortOrderCol1 === 'descend' ? 'DESC' : '')
          : sortKey === 'description'
            ? (sortOrderCol2 === 'ascend' ? 'ASC' : sortOrderCol2 === 'descend' ? 'DESC' : '')
            : sortKey === 'date'
              ? (sortOrderCol3 === 'ascend' ? 'ASC' : sortOrderCol3 === 'descend' ? 'DESC' : '')
              : ''
      })
    );
    userInput.current = value;

    if (!autoFocus) {
      setAutoFocus(true);
    }
  }

  const handleOnChange = (pagination, filters, sorter, extra) => {
    switch (sorter.field) {
      case 'name':
        setSortKey('firstName');
        if (sortOrderCol1 === 'ascend' || sortOrderCol1 === null) {
          setSortOrderCol1('descend');
        }
        if (sortOrderCol1 === 'descend') {
          setSortOrderCol1('ascend');
        }
        setAutoFocus(false);
        setSortOrderCol2(null);
        setSortOrderCol3(null);
        break;
      case 'description':
        setSortKey('description');
        if (sortOrderCol2 === 'ascend' || sortOrderCol2 === null) {
          setSortOrderCol2('descend');
        }
        if (sortOrderCol2 === 'descend') {
          setSortOrderCol2('ascend');
        }
        setAutoFocus(false);
        setSortOrderCol1(null);
        setSortOrderCol3(null);
        break;
      case 'date':
        setSortKey('date');
        if (sortOrderCol3 === 'ascend' || sortOrderCol3 === null) {
          setSortOrderCol3('descend');
        }
        if (sortOrderCol3 === 'descend') {
          setSortOrderCol3('ascend');
        }
        setAutoFocus(false);
        setSortOrderCol1(null);
        setSortOrderCol2(null);
        break;
      default:
        break;
    }
    setSortClicked(true);
  };

  useEffect(() => {
    setLoadingTable(true);
  }, [getNotificationsRequest, setItemsPerPage]);

  useEffect(() => {
    setControlRun(controlRun + 1);
    if (controlRun == 1) {
      setLoadingTable(false);
    }
  }, [notifications]);

  const columnsTable = [
    {
      title: 'User',
      textWrap: 'word-break',
      ellipsis: true,
      dataIndex: 'name',
      render: (text, record) => {
        return (
          <span>
            {record.firstName} {record.lastName}
          </span>
        );
      },
      sortOrder: sortOrderCol1,
      sorter: (a, b) => {
        // do nothing
      }
    },
    {
      title: 'Page',
      textWrap: 'word-break',
      ellipsis: true,
      dataIndex: 'description',
      render: (text, record) => {
        if (record.recordType == 'substance') {
          return (
            <Link
              style={{ wordBreak: 'break-word' }}
              href={`/substance/${record.recordId}`}
            >
              {record.description}
            </Link>
          );
        }

        if (record.recordType == 'class') {
          return (
            <Link
              style={{ wordBreak: 'break-word' }}
              href={`/class/${record.recordId}`}
            >
              {record.description}
            </Link>
          );
        }

        if (record.recordType == 'legislation') {
          return (
            <Link
              style={{ wordBreak: 'break-word' }}
              href={`/legislation/${record.recordId}`}
            >
              {record.description}
            </Link>
          );
        }

        if (record.recordType == 'regulation') {
          return (
            <Link
              style={{ wordBreak: 'break-word' }}
              href={`/regulation/${record.recordId}`}
            >
              {record.description}
            </Link>
          );
        }

        return null;
      },
      sortOrder: sortOrderCol2,
      sorter: (a, b) => {
        // do nothing
      }
    },
    {
      title: 'Activity',
      width: 90,
      dataIndex: 'action',
      render: (text, record) => {
        return (
          <ContainerIcons>
            {text == 'create' ? (
              <>
                <IcoPlus />
                Added
              </>
            ) : text == 'edit' ? (
              <>
                <IcoEdit />
                Edited
              </>
            ) : (
              <>
                <IcoMinus />
                Removed
              </>
            )}
          </ContainerIcons>
        );
      }
    },
    {
      title: 'Date and Time',
      dataIndex: 'date',
      width: 180,
      render: (text, record) => {
        return (
          <div>
            {Moment(text).format(process.env.REACT_APP_DATE_TIME_FORMAT)}
          </div>
        );
      },
      sortOrder: sortOrderCol3,
      sorter: (a, b) => {
        // do nothing
      }
    }
  ];

  return (
    <Container>
      <ContainerPagination>
      <PaginationSearch
          isSearchBar
           onPaginationSearchChangeInput={handleUserSearchInput} 
           defaultPaginationSearchText={userInput.current}
           autoFocus={autoFocus}
           pageSizeTotal={notificatiosPaginationInfo?.PageSize}
           current={notificatiosPaginationInfo?.CurrentPage}
           totalPage={notificatiosPaginationInfo?.TotalCount}
          selectPageSize
          handleClick={handleNotificationsPagination}
          handlePageChange={pageSize => {
            setItemsPerPageCount(pageSize);
          }}
          />
      </ContainerPagination>

        <TableAnt
          rowKey="id"
          columnsTable={columnsTable}
          dataTable={notifications}
          loading={loadingTable}
          onChange={handleOnChange}
          locale={{
            triggerDesc: 'Click to sort descending',
            triggerAsc: 'Click to sort descending',
            cancelSort: 'Click to sort ascending'
          }}
        />
      <PaginationSearch 
       pageSizeTotal={notificatiosPaginationInfo?.PageSize}
       current={notificatiosPaginationInfo?.CurrentPage}
       totalPage={notificatiosPaginationInfo?.TotalCount}
      selectPageSize
      isBottom
      handleClick={handleNotificationsPagination}
      handlePageChange={pageSize => {
        setItemsPerPageCount(pageSize);
      }}
      />
    </Container>
  );
};

export default Activity;