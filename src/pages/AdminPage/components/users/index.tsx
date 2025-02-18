/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Typography } from 'antd';

import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import Link from '../../../../components/Link';
import PaginationAnt from '../../../../components/Pagination';
import Select from '../../../../components/Select';
import TableAnt from '../../../../components/Table';
import { ToastError } from '../../../../components/Toast/index';
import { translate } from '../../../../locales';
import itemsPerPage from '../../../../mocks/items-per-page';
import {
  selectors as selectorsRoles,
  getRolesRequest
} from '../../../../store/modules/roles/actions';
import {
  selectors as selectorsUserSearch,
  getSearchUsersRequest,
  editUsersRequest
} from '../../../../store/modules/users/actions';
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
  ContainerSelect,
  ArrowSelect,
  ContainerLoadingTable,
  ContainerLoadingSearch,
  NoResult
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
  Roles: any;
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
let editRoles: any = [];

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
  let inputNode;
  const allRoles = useSelector(selectorsRoles.roles);

  switch (title) {
    case 'Name':
      inputNode = (
        <Input
          onChangeInput={value => {
            textEdit[record.id] = value;
          }}
          defaultText={record?.[dataIndex]}
          type="text"
        />
      );
      break;

    case 'Role':
      inputNode = (
        <Select
          size="130px"
          labelValue="name"
          keyValue="id"
          defaultValue={
            record.Roles && record.Roles.length > 0
              ? record.Roles[0].id
              : allRoles[0].id
          }
          values={allRoles.map(role => ({
            id: role.id,
            name: role.name
          }))}
          onChange={e => {
            const refactor = editRoles.map(roleModify => {
              if (roleModify.userId == record.id) {
                roleModify.roleId = e.value;
              }
              return roleModify;
            });
            editRoles = refactor;
          }}
        />
      );
      break;

    default:
      break;
  }

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

const UsersPage: React.FC = () => {
  const usersSearched = useSelector(selectorsUserSearch.users);
  const userInput: any = useRef('');
  const [autoFocus, setAutoFocus] = useState(false);
  const [controlRun, setControlRun] = useState(0);
  const [loadingTable, setLoadingTable] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [itemsPerPageCount, setItemsPerPageCount] = useState(10);
  const allRoles = useSelector(selectorsRoles.roles);
  const userRoleCurrent = localStorage.getItem('user.role');
  const [dataForEdit, setDataForEdit] = useState<Array<{ id: string }>>([]);
  const dispatch = useDispatch();
  const paginationInfo = useSelector(selectorsUserSearch?.usersPaginationInfo);
  const [itemsPerPageData, setItemsPerPage] = useState<any>({
    optionId: 1,
    optionValue: 10
  });
  
  const [sortOrderCol1, setSortOrderCol1] = useState<any>(null);
  const [sortOrderCol2, setSortOrderCol2] = useState<any>(null);
  const [sortOrderCol3, setSortOrderCol3] = useState<any>(null);
  const [sortOrderCol4, setSortOrderCol4] = useState<any>(null);
  const [sortKey, setSortKey] = useState<any>(null);
  const [sortClicked, setSortClicked] = useState<any>(false);

  const sortOrderLookup = {
    name: { ascend: 'ASC', descend: 'DESC' },
    mail: { ascend: 'ASC', descend: 'DESC' },
    status: { ascend: 'ASC', descend: 'DESC' },
    role: { ascend: 'ASC', descend: 'DESC' },
  };
  
  const direction = sortOrderLookup[sortKey]?.[sortOrderCol1] ?? 
  sortOrderLookup[sortKey]?.[sortOrderCol2] ?? 
  sortOrderLookup[sortKey]?.[sortOrderCol3] ?? 
  sortOrderLookup[sortKey]?.[sortOrderCol4] ?? '';

  useEffect(() => {
    dispatch(getRolesRequest());
    dispatch(
      getSearchUsersRequest({
        searchText: '',
        pageNumber: 1,
        pageSize: itemsPerPageCount,
        sortKey,
        direction
      })
    );
  }, []);
  
  useEffect(() => {
    if (sortClicked) {
      setSortClicked(false);
      setLoadingTable(true);
      setControlRun(1);
      dispatch(
        getSearchUsersRequest({
          searchText: '',
          pageNumber: 1,
          pageSize: itemsPerPageCount,
          sortKey,
          direction
        })
      );
    }
  }, [sortClicked]);

  const handlePagination = (page, size) => {
    setLoadingTable(true);
    setControlRun(1);

    setItemsPerPageCount(size);

    dispatch(
      getSearchUsersRequest({
        searchText: userInput.current,
        pageNumber: page,
        pageSize: size,
        sortKey,
        direction
      })
    );
  };

  function handleUserSearchInput(value) {
    setLoadingTable(true);
    setControlRun(1);
    dispatch(
      getSearchUsersRequest({
        searchText: value,
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

  useEffect(() => {
    setLoadingTable(true);
  }, [getSearchUsersRequest, setItemsPerPage]);

  useEffect(() => {
    setControlRun(controlRun + 1);
    if (controlRun == 1) {
      setLoadingTable(false);
    }
  }, [usersSearched]);
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
    setEditMode(false);
  };

  const columnsUses = [
    {
      title: 'Name',
      dataIndex: 'name',
      textWrap: 'word-break',
      ellipsis: true,
      sortOrder: sortOrderCol1,
      onCell: (_, record) => ({
        inputType: 'text',
        editing: isEditing(record)
      }),
      render: (_, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
      sorter: (a, b) => {
        // do nothing
      }
    },
    {
      title: 'Email ID',
      textWrap: 'word-break',
      ellipsis: true,
      dataIndex: 'mail',
      sortOrder: sortOrderCol2,
      onCell: (_, record) => ({
        inputType: 'text',
        editing: isEditing(record)
      }),
      sorter: (a, b) => {
        // do nothing
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 90,
      sortOrder: sortOrderCol3,
      onCell: (_, record) => ({
        inputType: 'select',
        editing: isEditing(record)
      }),
      render: (_, record) => {
        return <div>{record.active ? 'Active' : 'Inactive'}</div>;
      },
      sorter: (a, b) => {
        // do nothing
      }
    },
    {
      title: 'Role',
      editable: true,
      dataIndex: 'role',
      width: editMode ? 163 : 111,
      sortOrder: sortOrderCol4,
      onCell: (_, record) => ({
        inputType: 'select',
        editing: isEditing(record)
      }),
      render: (_, record) => {
        return (
          <div>
            {record.Roles && record.Roles.length > 0
              ? record.Roles[0].name
              : 'None'}
          </div>
        );
      },
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
              onClick={() => saveEditedUsers(
                record,
                cancel,
                dispatch,
                userInput,
                paginationInfo,
                itemsPerPageCount,
                setDataForEdit,
                dataForEdit)}
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
              setEditMode(true);

              if (allRoles.length > 0) {
                setDataForEdit([...dataForEdit, { id: record.id }]);

                const roleId = record.Roles && record.Roles.length > 0 ? record.Roles[0].id : allRoles[0].id;

                editRoles = [...editRoles, { userId: record.id, roleId }];
              }
            }}
            isdisabled={userRoleCurrent === null || ['Read-only', 'Normal User'].includes(userRoleCurrent) ? 'true' : 'false'}
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
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    };
  });
  
  const handleOnChange = (pagination, filters, sorter, extra) => {
    setSortOrderCol1(null);
    setSortOrderCol2(null);
    setSortOrderCol3(null);
    setSortOrderCol4(null);
    setAutoFocus(false);
    switch (sorter.field) {
      case 'name':
        setSortKey('name');
        setSortOrderCol1(sortOrderCol1 === 'ascend' || sortOrderCol1 === null ? 'descend' : 'ascend');
        break;
      case 'mail':
        setSortKey('mail');
        setSortOrderCol2(sortOrderCol2 === 'ascend' || sortOrderCol2 === null ? 'descend' : 'ascend');
        break;
      case 'status':
        setSortKey('status');
        setSortOrderCol3(sortOrderCol3 === 'ascend' || sortOrderCol3 === null ? 'descend' : 'ascend');
        break;
      case 'role':
        setSortKey('role');
        setSortOrderCol4(sortOrderCol4 === 'ascend' || sortOrderCol4 === null ? 'descend' : 'ascend');
        break;
      default:
        break;
    }

    setSortClicked(true);
  };

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
          dataTable={usersSearched}
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

const saveEditedUsers = (
  user,
  cancel,
  dispatch,
  userInput,
  paginationInfo,
  itemsPerPageCount,
  setDataForEdit,
  dataForEdit
) => {
  cancel();
  if (user && user?.id) {
    const userRole = editRoles.find(ele => ele.userId == user?.id);

    if (userRole != null) {
      dispatch(
        editUsersRequest({
          userId: Number(userRole.userId),
          roleId: Number(userRole.roleId),
          searchText: userInput.current,
          pageNumber: paginationInfo?.CurrentPage,
          pageSize: itemsPerPageCount
        })
      );
      setDataForEdit([...dataForEdit.filter(item => item.id != user.id)]);
      editRoles = [...editRoles.filter(item => item.userId != user.id)];
    } else {
      ToastError(translate('pages.users.toastErrorRoleEmpty'));
    }
  }
};

export default UsersPage;