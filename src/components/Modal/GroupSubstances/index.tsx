import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Col, Modal, Row } from 'antd';

import history from '../../../routes/history';
import {
  selectors,
  getGroupSubstancesRequest,
} from '../../../store/modules/regulationGroupSubstances/actions';
import Button from '../../Button';
import PaginationSearch from '../../PaginationSearch';
import TableAnt from '../../Table';
import { EditButtonContainer } from './styled';


const GroupSubstances = ({ open, group, close, toyotaRegionId, legislation, listing, typeId, listRegulatoryUpdates }: any) => {
  const dispatch = useDispatch();
  const userInput: any = useRef(''); // Input value for search
  const [itemsPerPageCount, setItemsPerPageCount] = useState(10);
  const [loadingTable, setLoadingTable] = useState(false);
  const paginationInfo = useSelector(selectors.groupSubstancesPaginationInfo);
  const groupSubstances = useSelector(selectors.groupSubstances); // Use the selector to get the list of regulations
  const [autoFocus, setAutoFocus] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [controlRun, setControlRun] = useState(0);
  const [searchTerm, setSearchTerm] = useState<any>("");
  const [sortOrderCol1, setSortOrderCol1] = useState<any>(null);
  const [sortOrderCol2, setSortOrderCol2] = useState<any>(null);
  const [sortOrderCol3, setSortOrderCol3] = useState<any>(null);
  const [sortKey, setSortKey] = useState<any>('');
  const [sortClicked, setSortClicked] = useState<any>(false);
  const sortOrderLookup = {
    casNumber: { ascend: 'ASC', descend: 'DESC' },
    commonName: { ascend: 'ASC', descend: 'DESC' },
  };

  const direction = sortOrderLookup[sortKey]?.[sortOrderCol1] ??
  sortOrderLookup[sortKey]?.[sortOrderCol2] ??
  sortOrderLookup[sortKey]?.[sortOrderCol3] ?? '';

  function handleUserSearchInput(value) {
    setSearchTerm(value)
    userInput.current = value;
  }

  useEffect(() => {
    if (groupSubstances) {
      setTableData(groupSubstances);
      setLoadingTable(false);
    }
  }, [groupSubstances]);

  useEffect(() => {
    if (searchTerm !== undefined && searchTerm !== null && group.id) {
        setLoadingTable(true);
        dispatch(
          getGroupSubstancesRequest({
            text: userInput.current,
            pageNumber: 1,
            pageSize: itemsPerPageCount,
            sortKey,
            direction,
            groupId: group.id,
            toyotaRegionId
          })
        );
        if (!autoFocus) {
          setAutoFocus(true);
        }
    }
    return undefined
  }, [searchTerm]);

  // Define columns for the table, including the checkbox and other fields
  const columnsTable = [
    {
      title: 'CAS RN',
      dataIndex: 'casNumber',
      textWrap: 'word-break',
      sortOrder: sortOrderCol1,
      sorter: (a, b) => {
        // do nothing
      },
      width: '20%'
    },
    {
      title: 'Substance',
      dataIndex: 'commonName',
      textWrap: 'word-break',
      sortOrder: sortOrderCol2,
      responsive: ['lg'],
      render: (_text, record) => (
        <Link to={`/substance/${record.id}`}>{record.commonName}</Link>
      ),
      sorter: (a, b) => {
        // do nothing
      },
      width: '60%'
    },
    {
      title: 'Level of Restriction',
      dataIndex: 'restrictionLevel',
      textWrap: 'word-break',
      width: '20%'
    }
  ];

  // Reset the form (checkboxes and search input) when the modal is loaded (open changes)
  useEffect(() => {
    if (open) {
      // Clear search text value
      setTableData([]);
      setSearchTerm('');
      userInput.current = ''; // Reset the reference as well
    }
  }, [open]);

    // Fetch data when component mounts
    useEffect(() => {
      setLoadingTable(true);
      dispatch(
        getGroupSubstancesRequest({
          text: userInput.current,
          pageNumber: 1,
          pageSize: itemsPerPageCount,
          sortKey,
          direction,
          groupId: group.id,
          toyotaRegionId
        })
      );
    }, [dispatch, itemsPerPageCount]);
  // Column Sort
    useEffect(() => {
      if (sortClicked) {
        setLoadingTable(true);
        setSortClicked(false);
        setControlRun(1);
        dispatch(
          getGroupSubstancesRequest({
            text: userInput.current,
            pageNumber: paginationInfo?.CurrentPage || 1,
            pageSize: itemsPerPageCount,
            sortKey,
            direction,
            groupId: group.id,
            toyotaRegionId
          })
        );
      }
    }, [sortClicked]);

  const handlePagination = (page, size) => {
    setLoadingTable(true);
    dispatch(
      getGroupSubstancesRequest({
        text: userInput.current,
        pageNumber: page,
        pageSize: size,
        sortKey,
        direction,
        groupId: group.id,
        toyotaRegionId
      })
    );
  };

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

  const navigateToGroupPage =(record) =>{
    history.push(`/group/${record.id}`, {
      record: legislation,
      group: record,
      listing,
      listingId: typeId,
      listRegulatoryUpdates
    });
  }

  return (
    <Modal
      open={open}
      title={group.name}
      width={1000}
      onCancel={close}
      footer={[
      ]}
    >
      <>
        <p>
          Phase: <b>{group.phase}</b>
        </p>
        <EditButtonContainer>
          <Button
              text="Edit Group"
              onClick={() => navigateToGroupPage(group)}
            />
        </EditButtonContainer>
        <Row justify="space-between">
          <Col span={24}>
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
              handlePageChange={(pageSize) => setItemsPerPageCount(pageSize)}
            />
          </Col>
        </Row>
        <TableAnt
          rowKey="key"
          columnsTable={columnsTable} // Pass the selection handler
          dataTable={tableData}
          loading={loadingTable}
          onChange={handleOnChange}
        />

        <Row justify="space-between">
          <Col span={24}>
            <PaginationSearch
              current={paginationInfo?.CurrentPage}
              totalPage={paginationInfo?.TotalCount}
              pageSizeTotal={paginationInfo?.PageSize}
              selectPageSize
              handleClick={handlePagination}
              handlePageChange={(pageSize) => setItemsPerPageCount(pageSize)}
            />
          </Col>
        </Row>
      </>
    </Modal>
  );
};

export default GroupSubstances;
