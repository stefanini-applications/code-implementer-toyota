import { Button, Col, Modal, Row, Checkbox } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PaginationSearch from '../../PaginationSearch';
import TableAnt from '../../Table';
import {
  selectors,
  getRegulationsRequest,
} from '../../../store/modules/regulations/actions';

import {
  createLinkedLegislationsRequest,
} from '../../../store/modules/linkedLegislations/actions';
import recordsTabs from '../../../mocks/records-tabs';

const AddLinkLegislationModal = ({ open, handleCancel, legislationId }: any) => {
  const dispatch = useDispatch();
  const userInput: any = useRef(''); // Input value for search
  const [itemsPerPageCount, setItemsPerPageCount] = useState(10);
  const [loadingTable, setLoadingTable] = useState(false);
  const paginationInfo = useSelector(selectors.regulationsPaginationInfo);
  const listLegislation = useSelector(selectors.regulations); // Use the selector to get the list of regulations
  const [selectedIds, setSelectedIds] = useState<number[]>([]); // Track selected IDs
  const [sortClicked, setSortClicked] = useState<any>(false);
  const [autoFocus, setAutoFocus] = useState(false);
  const [controlRun, setControlRun] = useState(0);
  const [searchTerm, setSearchTerm] = useState<any>("");
  
  function handleUserSearchInput(value) {
    setSearchTerm(value)
    userInput.current = value;
  }

  useEffect(() => {
    if (searchTerm !== undefined && searchTerm !== null && legislationId) {
        console.log('Show Legilation ID',legislationId);

        setLoadingTable(true);
        dispatch(
          getRegulationsRequest({
            searchText: userInput.current,
            type: 'Both', // Ensure this matches the type for fetching legislation
            pageNumber: 1,
            pageSize: itemsPerPageCount,
            sortKey: '',
            direction: '',
            originregulationID: legislationId
          })
        ); 
        setLoadingTable(false); 
        if (!autoFocus) {
          setAutoFocus(true);
        }      
    }
    return undefined
  }, [searchTerm]);
  // Define the function to handle checkbox selection
  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedIds([...selectedIds, id]); // Add selected ID
    } else {
      setSelectedIds(selectedIds.filter((item) => item !== id)); // Remove unselected ID
    }
  };

  // Define columns for the table, including the checkbox and other fields
  const columnsTable = (checkboxChangeHandler) => [
    {
      title: '',
      dataIndex: 'checkbox',
      render: (text, record) => (
        <Checkbox
          onChange={(e) => checkboxChangeHandler(e, record.id)}
        />
      ),
      width: '3rem'
    },
    {
      title: 'Type',
      dataIndex: 'recordType',
      textWrap: 'word-break',
      ellipsis: true,
       render: (text, record) => {
         return record.recordType === 1 ? 'Regulation' : 'Legislation';
       },
    },
    {
      title: 'Legislation/Regulation Name',
      dataIndex: 'billTitle',
      textWrap: 'word-break',
      ellipsis: true,
      render: (_text, record) => {
        // Check if recordType is 2 and the year exists
        const year = record.recordType === 2 && record.year ? ` ${record.year}` : '';
        return `${record.billTitle}${year}`; // Concatenate billTitle with year if conditions are met
      },
    },
    {
      title: 'Jurisdiction',
      dataIndex: ['Jurisdiction', 'description'],
      textWrap: 'word-break',
      ellipsis: true,
      render: (text) => {
        return <span>{text}</span>;
      },
    },
  ];

  // Reset the form (checkboxes and search input) when the modal is loaded (open changes)
  useEffect(() => {
    if (open) {
      // Clear checkboxes by resetting the checked status for all options
      const resetCheckboxes = recordsTabs.map((item) => ({ ...item, checked: false }));

      // Clear search text value
      setSearchTerm('');
      userInput.current = ''; // Reset the reference as well
    }
  }, [open]);

    // Fetch data when component mounts
    useEffect(() => {
      setLoadingTable(true);
      dispatch(
        getRegulationsRequest({
          searchText: userInput.current,
          type: 'Both', // Ensure this matches the type for fetching legislation
          pageNumber: 1,
          pageSize: itemsPerPageCount,
          sortKey: '',
          direction: '',
          originregulationID: legislationId
        })
      ); 
      setLoadingTable(false);
    }, [dispatch, itemsPerPageCount]);
  // Column Sort 
    useEffect(() => {
      if (sortClicked) {
        setLoadingTable(true);
        setSortClicked(false);
        setControlRun(1);
        dispatch(
          getRegulationsRequest({
            searchText: userInput.current,
            type:'Both',
            pageNumber: paginationInfo?.CurrentPage || 1,
            pageSize: itemsPerPageCount,          
            sortKey:'',
            direction:'',
            originregulationID: legislationId
          })
        );
      }    
    }, [sortClicked]);
  // API call to upsert the regulation-linked data
  const handleAdd = async () => {
    const postData: any = [];

    selectedIds.forEach((destId) => {
      postData.push({
        originRegulationID: legislationId, // Ensure legislationId is defined or passed as a prop
        destRegulationID: Number(destId),
      });
    });

    try {
      dispatch(createLinkedLegislationsRequest(postData)); // Dispatch the request
      setSelectedIds([]); // Reset selected IDs after successful submission
      handleCancel(); // Close the modal
    } catch (error) {
      console.log(error);
    }
  };
  // Reset selectedIds when modal opens
  useEffect(() => {
    setSelectedIds([]);
  }, [open]);

  const handleOk = () => {
    handleAdd(); // Trigger the upsert API call
  };

  const handlePagination = (page, size) => {
    setLoadingTable(true);
    dispatch(
      getRegulationsRequest({
        searchText: userInput.current,
        type: 'Both', // Default to both if pagination happens outside the search
        pageNumber: page,
        pageSize: size,
        sortKey: '',
        direction: '',
        originregulationID: legislationId
      })
    );
    setLoadingTable(false);
  };



  return (
    <Modal
      open={open}
      title="New Link"
      onOk={handleOk} // Upsert the selected regulations when clicked
      onCancel={handleCancel}
      width={1000}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Add
        </Button>,
      ]}
    >
      <>
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
          rowKey="id"
          columnsTable={columnsTable(handleCheckboxChange)} // Pass the selection handler
          dataTable={listLegislation}
          loading={loadingTable}
          locale={{
            triggerDesc: 'Click to sort descending',
            triggerAsc: 'Click to sort ascending',
            cancelSort: 'Cancel sort',
          }}
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

export default AddLinkLegislationModal;
