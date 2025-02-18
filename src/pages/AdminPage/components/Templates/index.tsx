/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Moment from 'moment';



import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import Confirmation from '../../../../components/Modal/Confirmation';
import PaginationAnt from '../../../../components/Pagination';
import TableAnt from '../../../../components/Table';
import history from '../../../../routes/history';
import {
  selectors as selectorsTemplates,
  getAdminGroupTemplateRequest,
  deleteAdminGroupTemplateRequest
} from '../../../../store/modules/groupTemplate/actions';
import {
  Container,
  ContainerPagination,
  Pagination,
  Search,
  SearchIcon,
  ContainerButtons,
  ContainerLoadingSearch,
  ContainerButtonCreate,
  ContainerButtonsACtion,
  IcoEdit,
  IcoDelete,
} from './styled';
import PaginationSearch from '../../../../components/PaginationSearch';

interface Item {
  id: string;
  name: string;
  phase: number;
  restrictionLevel: number;
  title?: any;
  description?: any;
  dataIndex?: any;
  use: string;
  Jurisdictions: any;
  active: any;
}

interface ITemplate {
  onItemSelected?: any;
}

const Templates: React.FC<ITemplate> = ({ onItemSelected }) => {
  const listsTemplates = useSelector(selectorsTemplates.adminGroupTemplate);
  const userInput: any = useRef('');
  const [autoFocus, setAutoFocus] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [open, setOpen] = useState(false);
  const [itemsPerPageCount, setItemsPerPageCount] = useState(10);
  const [sortKey, setSortKey] = useState<any>(null);
  const [groupId, setGroupId] = useState<
    Array<any>
  >([]);
  const [sortClicked, setSortClicked] = useState<any>(false);
  const [sortOrderCol1, setSortOrderCol1] = useState<any>(null);
  const [sortOrderCol2, setSortOrderCol2] = useState<any>(null);
  const dispatch = useDispatch();
  const [controlRun, setControlRun] = useState(0);
  const paginationInfo = useSelector(selectorsTemplates.adminGroupTemplatePaginationInfo);
  const sortOrderLookup = {
    name: { ascend: 'ASC', descend: 'DESC' },
    updatedAt: { ascend: 'ASC', descend: 'DESC' },
  };
  const direction = sortOrderLookup[sortKey]?.[sortOrderCol1] ?? 
  sortOrderLookup[sortKey]?.[sortOrderCol2] ?? '';

  const handlePagination = (page, size) => {
    setLoadingTable(true);

    setControlRun(1);

    setItemsPerPageCount(size);

    dispatch(
      getAdminGroupTemplateRequest({
        search: userInput.current,
        pageNumber: page,
        pageSize: size,
        noLoading: true,
        sortKey,
        direction
      })
    );
  };

  useEffect(() => {
    if (sortClicked) {
      setSortClicked(false);
      setLoadingTable(true);
      setControlRun(1);
      dispatch(
        getAdminGroupTemplateRequest({
          search: userInput.current,
          pageNumber: 1,
          pageSize: 10,
          noLoading: true,
          sortKey,
          direction
        })
      );
    }
  }, [sortClicked]);

  useEffect(() => {
    dispatch(
      getAdminGroupTemplateRequest({
        search: userInput.current,
        pageNumber: 1,
        pageSize: 10,
        noLoading: true,
        sortKey,
        direction
      })
    )
  }, [dispatch]);

  useEffect(() => {
    setLoadingTable(true);
  }, [getAdminGroupTemplateRequest, setItemsPerPageCount]);

  function handleUserSearchInput(value) {
    setLoadingTable(true);
    setControlRun(1);
    dispatch(
      getAdminGroupTemplateRequest({
        pageNumber: 1,
        pageSize: itemsPerPageCount,
        search: value,
        noLoading: true,
        sortKey,
        direction
      })
    );
    userInput.current = value;

    if (!autoFocus) {
      setAutoFocus(true);
    }
  }

  const handleEditTemplate = (record) => {
    onItemSelected();
    history.push(`/template/${record.id}`);
  }

  useEffect(() => {
    setControlRun(controlRun + 1);
    if (controlRun == 1) {
      setLoadingTable(false);
    }
  }, [listsTemplates]);

  const columnsUses = [
    {
      title: 'Template Name',
      dataIndex: 'name',
      textWrap: 'word-break',
      ellipsis: true,
      sortOrder: sortOrderCol1,
      sorter: (a, b) => {
        // do nothing
      }
    },
    {
      title: 'Last Modified',
      dataIndex: 'updatedAt',
      width: 130,
      render: (text, record) => {
        return (
          <div>
            {Moment(text).format(process.env.REACT_APP_DATE_FORMAT)}
          </div>
        );
      },
      sortOrder: sortOrderCol2,
      // commented due to sort issue in backend
      sorter: (a, b) => {
        // do nothing
      }
    },
    {
      title: 'Action',
      key: 'action',
      width: 169,
      render: (_, record) => {
        return (
          <ContainerButtonsACtion>
            <IcoEdit 
            onClick={() => handleEditTemplate(record)}
            isdisabled='false' 
            />
            <IcoDelete
              onClick={() => {
                setOpen(true);
                setGroupId([Number(record.id)]);
                setTemplateName(record.name)
              }} 
              isdisabled='false' />
          </ContainerButtonsACtion>
        )
      }
    }
  ];

  const mergedColumns = columnsUses.map(col => {
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
      })
    };
  });

  const handleOnChange = (pagination, filters, sorter, extra) => {
    switch (sorter.field) {
      case 'name':
        setSortKey('name');
        setSortOrderCol1(sortOrderCol1 === 'ascend' || sortOrderCol1 === null ? 'descend' : 'ascend');
        setAutoFocus(false);
        setSortOrderCol2(null);
        break;
      case 'updatedAt':
        setSortKey('updatedAt');
        setSortOrderCol2(sortOrderCol2 === 'ascend' || sortOrderCol2 === null ? 'descend' : 'ascend');
        setAutoFocus(false);
        setSortOrderCol1(null);
        break;
      default:
        break;
    }

    setSortClicked(true);
  };

  const handleClose = action => {
    if (action === 'yes') {
      dispatch(
        deleteAdminGroupTemplateRequest(groupId)
      );
    }
    setOpen(false);
  };

  const handleCreateTemplate = () => {
    onItemSelected();
    history.push('/template');
  };

  return (
    <Container>
      <Confirmation
        open={open}
        centered
        setOpen={setOpen}
        titleModal="Remove template?"
        bodyText={`Do you want to remove ${templateName}?`}
        onClose={handleClose}
        okText="Remove Template"
        cancelText="Cancel"
      />
      <ContainerButtonCreate>
        <Button text="Create Template" onClick={handleCreateTemplate} />
      </ContainerButtonCreate>
      <ContainerPagination>
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
          onChange={handleOnChange}
          rowKey="id"
          columnsTable={mergedColumns}
          dataTable={listsTemplates}
          loading={loadingTable}
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

export default Templates;