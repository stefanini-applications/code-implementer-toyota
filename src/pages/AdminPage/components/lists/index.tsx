/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Typography } from 'antd';

import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import Link from '../../../../components/Link';
import PaginationAnt from '../../../../components/Pagination';
import TableAnt from '../../../../components/Table';
import { translate } from '../../../../locales';
import itemsPerPage from '../../../../mocks/items-per-page';
import defaultListsData from '../../../../mocks/listings-mock';
import {
  selectors as selectorsListings,
  updateListsRequest,
  getSearchListsRequest
} from '../../../../store/modules/listings/actions';
import {
  Container,
  ContainerPagination,
  ItemsPerPage,
  Pagination,
  RowContainer,
  Search,
  SearchIcon,
  ContainerButtons,
  Table,
  TableBody,
  TableHead,
  TableHeadItem,
  TableItem,
  TableRow,
  IcoEdit,
  TableItemEdit,
  ContainerLoadingTable,
  ContainerLoadingSearch,
  NoResult,
  RowItems,
  DescriptionContainer
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

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: string;
  record: Item;
  index: number;
  children: React.ReactNode;
}

const textEdit = {};
const editJurisdiction: any = [];

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const [editStatus, setEditStatus] = useState<any>([]);
  const editJurisdictionRef: any = useRef('');
  const inputNode = (
    <Input
      onChangeInput={value => {
        textEdit[record.id] = value;
      }}
      defaultText={record?.[dataIndex]}
      type="text"
      autoFocus
    />
  );

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`
            }
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Lists: React.FC = () => {
  const listsAll = useSelector(selectorsListings.lists);
  const userInput: any = useRef('');
  const [autoFocus, setAutoFocus] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [itemsPerPageCount, setItemsPerPageCount] = useState(10);
  const userRoleCurrent = localStorage.getItem('user.role');
  const editingDescription: any = useRef('');
  const dispatch = useDispatch();
  const [itemsPerPageData, setItemsPerPage] = useState<any>({
    optionId: 1,
    optionValue: 10
  });
  const inputRef = useRef<any>({});
  const [listsForEdit, setListsForEdit] = useState<
    Array<{ name: string; description: string }>
  >([]);
  const [controlRun, setControlRun] = useState(0);
  const paginationInfo = useSelector(selectorsListings.listsPaginationInfo);
  const [sortOrderCol1, setSortOrderCol1] = useState<any>(null);
  const [sortOrderCol2, setSortOrderCol2] = useState<any>(null);
  const [sortOrderCol3, setSortOrderCol3] = useState<any>(null);
  const [sortKey, setSortKey] = useState<any>('');
  const [sortClicked, setSortClicked] = useState<any>(false);

  const sortOrderLookup = {
    name: { ascend: 'ASC', descend: 'DESC' },
    description: { ascend: 'ASC', descend: 'DESC' },
  };

  const direction = sortOrderLookup[sortKey]?.[sortOrderCol1] ?? 
  sortOrderLookup[sortKey]?.[sortOrderCol2] ?? 
  sortOrderLookup[sortKey]?.[sortOrderCol3] ?? '';
  useEffect(() => {
    if (sortClicked) {
      setLoadingTable(true);
      setSortClicked(false);
      setControlRun(1);
      dispatch(
        getSearchListsRequest({
          searchText: userInput.current,
          pageNumber: paginationInfo?.CurrentPage || 1,
          pageSize: itemsPerPageCount,          
          noLoading: true,
          sortKey,
          direction
        })
      );
    }    
  }, [sortClicked]);

  const handleOnChange = (pagination, filters, sorter, extra) => {
    switch (sorter.field) {
      case 'name':        
        setSortKey('name');
        setSortOrderCol1(sortOrderCol1 === 'ascend' || sortOrderCol1 === null ? 'descend' : 'ascend');
        setAutoFocus(false);
        setSortOrderCol2(null);
        setSortOrderCol3(null);
        break;
      case 'description':        
        setSortKey('description');
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
      getSearchListsRequest({
        searchText: userInput.current,
        pageNumber: page,
        pageSize: size,
        noLoading: true,
        sortKey,
        direction
      })
    );
  };

  function handleUserSearchInput(value) {
    setLoadingTable(true);
    setControlRun(1);
    dispatch(
      getSearchListsRequest({
        searchText: value,
        pageNumber: 1,
        pageSize: itemsPerPageCount,
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
  useEffect(() => {
    dispatch(
      getSearchListsRequest({
        searchText: '',
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
  }, [getSearchListsRequest, setItemsPerPage]);
  
  useEffect(() => {
    setControlRun(controlRun + 1);
    if (controlRun == 1) {
      setLoadingTable(false);
    }
  }, [listsAll]);

  const saveEditedLists = list => {
    cancel();

    if (list && list?.name) {
      refactorListsRefs(list.name);
      const new_description = editingDescription.current;
      // const new_description = textEdit[list?.id];
      dispatch(
        updateListsRequest({
          list: [
            {
              name: list?.name,
              description: new_description,
              id: Number(list.id)
            }
          ],
          allInsert: false,
          searchText: userInput.current,
          pageNumber: paginationInfo?.CurrentPage,
          pageSize: itemsPerPageCount
        })
      );
      setListsForEdit([
        ...listsForEdit.filter(item => item.name != list.name)
      ]);
      refactorListsRefs(list.name);
    }
  };

  function refactorListsRefs(name) {
    const asArr = Object.entries(inputRef.current);
    const filtered = asArr.filter(([key, value]) => value && key !== name);
    inputRef.current = Object.fromEntries(filtered);
  }

  const [editingKey, setEditingKey] = useState('');

  const isEditing = record => record.id === editingKey;

  const [form] = Form.useForm();

  const edit = (record: Partial<Item> & { id: React.Key }) => {
    form.setFieldsValue({
      use: record.description,
      ...record
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const columnsUses = [
    {
      title: 'Name',
      dataIndex: 'name',
      textWrap: 'word-break',
      ellipsis: true,
      editable: true,
      onCell: (_, record) => ({
        inputType: 'text',
      }),
      sortOrder: sortOrderCol1,
      sorter: (a, b) => {
        // do nothing
      }
    },
    {
      title: 'Description',
      editable: true,
      dataIndex: 'description',
      textWrap: 'word-break',
      ellipsis: true,
      editing: true,
      onCell: (_, record) => ({
        inputType: 'text',
      }),
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <DescriptionContainer>
            <Input
              className="input-commonname"
              type="form"
              defaultText={record.description}
              onChangeInput={(value) => {
                editingDescription.current = value;
              }}
            />
          </DescriptionContainer>
        ) : (
          record.description
        )
      },
      sortOrder: sortOrderCol1,
      sorter: (a, b) => {
        // do nothing
      }
    },
    {
      title: 'Action',
      key: 'action',
      width: 120,
      render: (_, record) => {
        const editable = isEditing(record);

        return editable ? (
          <>
            <Link
              fakeLink
              onClick={() => saveEditedLists(record)}
              style={{ marginRight: 8 }}
            >
              Save
            </Link>
            <Link fakeLink onClick={cancel} style={{ marginRight: 8 }}>
              Cancel
            </Link>
          </>
        ) : (
          <IcoEdit
            onClick={() => {
              edit(record);
              setListsForEdit([
                ...listsForEdit,
                { name: record.name, description: '' }
              ]);
            }}
            isdisabled={
              userRoleCurrent == null ||
                userRoleCurrent == 'Read-only' ||
                userRoleCurrent == 'Normal User'
                ? 'true'
                : 'false'
            }
          />
        );
      }
    }
  ];

  const mergedColumns = columnsUses.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
      })
    };
  });

  return (
    <Container>
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
          rowKey="id"
          editCell={EditableCell}
          columnsTable={mergedColumns}
          dataTable={listsAll}
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

export default Lists;