/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-expressions */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Tooltip } from 'antd';

import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import Link from '../../../../components/Link';
import TableAnt from '../../../../components/Table';
import { ToastError } from '../../../../components/Toast/index';
import { translate } from '../../../../locales';
import {
  selectors as selectorsSubUsesSearch,
  createSubstanceUsesRequest,
  getSearchSubstancesUsesRequest,
  deleteSubstancesUsesRequest,
  editSubstanceUsesRequest
} from '../../../../store/modules/substanceUses/actions';
import {
  Container,
  ContainerLabelTable,
  ContainerPagination,
  Label,
  ContainerButtons,
  SubstanceUseNameSection,
  Checkbox,
  IcoEdit,
  DescriptionContainer,
  ErrorContainer
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
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

let textEdit = {};

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
  const inputNode =
    inputType === 'number' ? null : (
      <Input
        onChangeInput={value => {
          textEdit[record.id] = value;
        }}
        defaultText={record?.[dataIndex]}
        type="text"
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

const SubstanceUse: React.FC = () => {
  const [editTableView, seteditTableView] = useState(false);
  const userInput: any = useRef('');
  const [autoFocus, setAutoFocus] = useState(false);
  const [autoFocusDescTable, setAutoFocusDescTable] = useState(false);
  const [autoFocusDescription, setAutoFocusDescription] = useState(false);
  const [maxLengthDescriptionEdit, setMaxLengthDescriptionEdit] = useState(false);
  const [maxLengthDescription, setMaxLengthDescription] = useState(false);
  const [minLengthDescriptionEdit, setMinLengthDescriptionEdit] = useState(false);
  const [controlRun, setControlRun] = useState(0);
  const [loadingTable, setLoadingTable] = useState(false);
  const [itemsPerPageCount, setItemsPerPageCount] = useState(10);
  const subUseDescription: any = useRef('');
  const editingDescription: any = useRef('');
  const [subUsesCheckedForDelete, setSubUsesCheckedForDelete] = useState<
    Array<any>
  >([]);
  const substanceUsesSearched = useSelector(
    selectorsSubUsesSearch.substanceUses
  );
  const [subUsesForEdit, setSubUsesForEdit] = useState<
    Array<{ id: string; value: string }>
  >([]);
  const dispatch = useDispatch();
  const substanceUses = useSelector(selectorsSubUsesSearch.substanceUses);
  const userRole = localStorage.getItem('user.role');
  const [filteredUses, setFilteredUses] = useState<any>([]);
  const paginationInfo = useSelector(
    selectorsSubUsesSearch?.substanceUsesPaginationInfo
  );
  const [itemsPerPageData, setItemsPerPage] = useState<any>({
    optionId: 1,
    optionValue: 10
  });
  const [sortKey, setSortKey] = useState<any>('');
  const [sortOrderDirection, setSortOrderDirection] = useState<string>('ASC');
  const [sortClicked, setSortClicked] = useState<any>(false);
  const sortOrderLookup = {
    description: { ascend: 'ASC', descend: 'DESC' },
  };

  const sortDirection = sortOrderDirection === 'ascend' ? 'DESC' : 'ASC';


  useEffect(() => {
    dispatch(
      getSearchSubstancesUsesRequest({
        searchText: '',
        pageNumber: 1,
        pageSize: itemsPerPageCount,
        direction: sortDirection
      })
    );
  }, []);


  useEffect(() => {
    if (sortClicked) {
      setLoadingTable(true);
      setControlRun(1);
      setSortClicked(false);
      dispatch(
        getSearchSubstancesUsesRequest({
          searchText: '',
          pageNumber: 1,
          pageSize: itemsPerPageCount,
          direction: sortDirection
        })
      );
    }  
  }, [sortClicked]);

  useEffect(() => {
    setFilteredUses(
      substanceUsesSearched?.length > 0 ? substanceUsesSearched : substanceUses
    );
  }, [substanceUses, substanceUsesSearched]);

  const handlePagination = (page, size) => {
    setLoadingTable(true);
    setControlRun(1);
    setItemsPerPageCount(size);
    dispatch(
      getSearchSubstancesUsesRequest({
        searchText: userInput.current,
        pageNumber: page,
        pageSize: size,
        direction: sortDirection
      })
    );
  };

  const handleOnChange = (pagination, filters, sorter, extra) => {
    switch (sorter.field) {
      case 'description':
        setSortKey('description');
        setSortOrderDirection(sortOrderDirection === 'ascend' ? 'descend' : 'ascend');
        setAutoFocus(false);
        break;
      default:
        break;
    }
    setSortClicked(true);   
  };
  const RemoveLines = () => {
    if(subUsesCheckedForDelete.length){
      dispatch(deleteSubstancesUsesRequest(subUsesCheckedForDelete));
      setSubUsesCheckedForDelete([]);
    }else{
      ToastError(`Please select a record to be deleted`);
    }
    
  };

  const onSetSubUsesCheckedForDelete = (id: number, checked: boolean) => {
    if (checked) {
      if (!subUsesCheckedForDelete.includes(id)) {
        setSubUsesCheckedForDelete([...subUsesCheckedForDelete, id]);
      }
    } else {
      setSubUsesCheckedForDelete(
        subUsesCheckedForDelete.filter(value => {
          return value != id;
        })
      );
    }
  };

  const onAddItems = () => {
    if (subUseDescription.current === '') {
      ToastError(translate('pages.substances.toastErrorSubstancesEmpty'));
    } else {
      dispatch(
        createSubstanceUsesRequest({
          description: subUseDescription.current,
          active: 1
        })
      );
    }
  };

  function handleUserSearchInput(value) {
    setLoadingTable(true);
    setControlRun(1);
    dispatch(
      getSearchSubstancesUsesRequest({
        searchText: value,
        pageNumber: 1,
        pageSize: itemsPerPageCount,
        direction: sortDirection
      })
    );
    userInput.current = value;

    if (!autoFocus) {
      setAutoFocus(true);
    }
  }

  const saveEditedSubUses = substanceUse => {
    cancel();
    if (substanceUse && substanceUse?.id) {
      const new_description = editingDescription.current;
      if (new_description) {
        dispatch(
          editSubstanceUsesRequest({
            id: Number(substanceUse?.id),
            description: new_description,
            active: 1,
            searchText: userInput.current,
            pageNumber: paginationInfo?.CurrentPage,
            pageSize: itemsPerPageCount
          })
        );
        setSubUsesForEdit([
          ...subUsesForEdit.filter(item => item.id != substanceUse.id)
        ]);
        refactorSubUsesRefs(substanceUse.id);
      }
    }
  };

  function refactorSubUsesRefs(id) {
    const asArr = Object.entries(textEdit);
    const filtered = asArr.filter(([key, value]) => value && key !== id);
    textEdit = Object.fromEntries(filtered);
  }

  useEffect(() => {
    setLoadingTable(true);
  }, [getSearchSubstancesUsesRequest, setItemsPerPage]);

  useEffect(() => {
    setControlRun(controlRun + 1);
    if (controlRun == 1) {
      setLoadingTable(false);
    }
  }, [substanceUses]);

  const [editingKey, setEditingKey] = useState('');

  const isEditing = record => record.id === editingKey;

  const [form] = Form.useForm();

  const edit = (record: Partial<Item> & { id: React.Key }) => {
    editingDescription.current = undefined;
    setMaxLengthDescriptionEdit(false);
    setMinLengthDescriptionEdit(false);
    setAutoFocusDescription(false);
    setAutoFocusDescTable(true);
    form.setFieldsValue({
      use: record.description,
      ...record
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const rowSelection = {
    renderCell: (_, record) => (
      <Checkbox
        type="checkbox"
        onChange={event =>
          onSetSubUsesCheckedForDelete(record.id, event.currentTarget.checked)
        }
      />
    ),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange: (selectedRowKeys: React.Key[], selectedRows, record, event) => {
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name
    })
  };

  const columnsUses = [
    {
      title: 'Use',
      textWrap: 'word-break',
      ellipsis: true,
      editable: true,
      dataIndex: 'description',
      
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
              onFocus={() => { setAutoFocusDescription(false); setAutoFocus(false); }}
              autoFocus={autoFocusDescTable}
              maxLength={255}
              defaultText={editingDescription.current !== undefined ? editingDescription.current : record.description}
              onChangeInput={(value) => {
                editingDescription.current = value;
                if (value.length > 255) {
                  setMaxLengthDescriptionEdit(true)
                  setAutoFocusDescTable(true);
                } else if (maxLengthDescriptionEdit) {
                  setMaxLengthDescriptionEdit(false)
                }
                if (value.length < 1) {
                  setMinLengthDescriptionEdit(true)
                } else if (minLengthDescriptionEdit) {
                  setMinLengthDescriptionEdit(false)
                }
              }}
            />
            {maxLengthDescriptionEdit &&
              <ErrorContainer>Maximum Length is 255</ErrorContainer>
            }
          </DescriptionContainer>
        ) : (
          <Tooltip title={record.description}>
            {record.description}
          </Tooltip>
        )
      },
      sortOrder: sortOrderDirection,
      sorter: (a, b) => {
        // do nothing
      }
    },
    {
      title: 'Action',
      width: 160,
      key: 'action',
      render: (_, record) => {
        const editable = isEditing(record);

        return editable ? (
          <>
            <Link
              flex={false}
              onClick={() => !(editingDescription.current === '') && saveEditedSubUses(record)}
              style={{ marginRight: 8 }}
              isDisabled={(editingDescription.current === '')}
            >
              Save
            </Link>
            <Link flex={false} onClick={cancel} style={{ marginRight: 8 }}>
              Cancel
            </Link>
          </>
        ) : (
          <IcoEdit
            onClick={() => {
              textEdit[record.id] = record?.description || '';
              edit(record);
              setSubUsesForEdit([
                ...subUsesForEdit,
                {
                  id: record.id,
                  value: record?.description || ''
                }
              ]);
            }}
            isdisabled={
              userRole == null || userRole == 'Read-only' ? 'true' : 'false'
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
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title
      })
    };
  });

  return (
    <Container>
      <ContainerLabelTable>
        <Label />
        <ContainerButtons $alignEnd>
          <SubstanceUseNameSection>
            <Label>Description *</Label>
            <Input
              className="input-commonname"
              maxLength={255}
              type="text"
              defaultText={subUseDescription.current}
              autoFocus={autoFocusDescription}
              disableInput={userRole == null || userRole == 'Read-only'}
              onFocus={() => { setAutoFocusDescTable(false); setAutoFocus(false); }}
              onChangeInput={value => {
                subUseDescription.current = value;
                if (subUseDescription.current.length > 255) {
                  setMaxLengthDescription(true)
                  setAutoFocusDescription(true);
                } else {
                  setMaxLengthDescription(false)
                }
              }}
            />
            {maxLengthDescription &&
              <ErrorContainer>Maximum Length is 255</ErrorContainer>
            }
          </SubstanceUseNameSection>
          <Button
            text="Add Item"
            onClick={onAddItems}
            type="primary"
            isDisabled={userRole == null || userRole == 'Read-only'}
          />
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
          editCell={EditableCell}
          rowSelection={editTableView ? {
            type: editTableView ? 'checkbox' : 'radio',
            ...rowSelection,
          } : null}
          columnsTable={mergedColumns}
          dataTable={filteredUses}
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

export default SubstanceUse;