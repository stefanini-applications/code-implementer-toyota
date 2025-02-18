/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-expressions */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Tooltip, Typography } from 'antd';
import _ from 'lodash';

import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import Link from '../../../../components/Link';
import PaginationAnt from '../../../../components/Pagination';
import Select from '../../../../components/Select';
import TableAnt from '../../../../components/Table';
import { ToastSuccess, ToastError } from '../../../../components/Toast/index';
import { translate } from '../../../../locales';
import jurisdictionList from '../../../../mocks/impact-tabs';
import itemsPerPage from '../../../../mocks/items-per-page';
import {
  selectors,
  getAgencyRequest,
  createAgencyRequest
} from '../../../../store/modules/agency/actions';
import { selectors as selectorPaginationInfo } from '../../../../store/modules/homePage/actions';
import {
  Container,
  ContainerLabelTable,
  ContainerPagination,
  ItemsPerPage,
  Label,
  ErrorContainer,
  Pagination,
  RowContainer,
  Search,
  SearchIcon,
  ContainerButtons,
  AgencyNameSection,
  Checkbox,
  Table,
  TableBody,
  TableHead,
  TableHeadItem,
  TableItem,
  TableRow,
  IcoEdit,
  TableItemEdit,
  ContainerHeaderField,
  ContainerJurisdictionButton,
  SelectInput,
  ContainerLoadingTable,
  ContainerLoadingSearch,
  NoResult,
  ButtonsContainer,
  DescriptionContainer,
  AbbreviationContainer
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
  abbreviation: any;
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

let textEdit = {};
let editJurisdiction: any = [];
const editStatusValue: any = {};

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
  const jurDefVal = record?.Jurisdictions?.length > 0 ? record?.Jurisdictions[0].description : '';

  switch (title) {
    case 'Sub-Jurisdictions':
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
      case 'Abbreviation':
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
    case 'Jurisdictions':
      inputNode = (
        <Select
          labelValue="description"
          keyValue="id"
          values={jurisdictionList}
          inputRef={editJurisdictionRef}
          onChange={value => {
            editJurisdiction = [value];
          }}
          defaultValue={jurDefVal}
          size="100%"
        />
      );
      break;

    case 'Status':
      inputNode = (
        <Select
          labelValue="label"
          keyValue="value"
          defaultValue={record.active ? 1 : 2}
          onChange={value => {
            editStatusValue[record.id] = value;
          }}
          values={[
            {
              value: 1,
              label: 'Active'
            },
            {
              value: 2,
              label: 'Inactive'
            }
          ]}
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

const SubJurisdiction: React.FC = () => {
  const userInput: any = useRef('');
  const [editTableView, seteditTableView] = useState(false);
  const [itemsPerPageCount, setItemsPerPageCount] = useState(10);
  const [autoFocus, setAutoFocus] = useState(false);
  const [autoFocusSubJurisdiction, setAutoFocusSubJurisdiction] = useState(false);
  const [autoFocusSubJurisdictionTable, setAutoFocusSubJurisdictionTable] = useState(false);
  const [autoFocusAbbreviationTable, setAutoFocusAbbreviationTable] = useState(false);
  const [autoFocusAbbreviation, setAutoFocusAbbreviation] = useState(false);
  const [controlRun, setControlRun] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const descriptionRef: any = useRef('');
  const AbbreviationRef: any = useRef('');
  const [loadingTable, setLoadingTable] = useState(false);
  const jurisdictionRef: any = useRef([]);
  const inputRef = useRef<any>({});
  const editJurisdictionRef: any = useRef('');
  const editingDescription: any = useRef('');
  const editingAbbreviation: any = useRef('');
  // const [editJurisdiction, setEditJurisdiction] = useState<any>([]);
  const [editedJurisdiction, setEditedJurisdiction] = useState<any>([]);
  const [dataForEdit, setDataForEdit] = useState<
    Array<{ id: string; value: string }>
  >([]);
  const [jurisdiction, setJurisdiction] = useState<any>(null);
  const [abbreviation, setAbbreviation] = useState<any>(null);
  const dispatch = useDispatch();
  const agencies = useSelector(selectors.agency);
  const paginationInfo = useSelector(
    selectorPaginationInfo?.updatesPaginationInfo
  );
  const userRole = localStorage.getItem('user.role');
  const [itemsPerPageData, setItemsPerPage] = useState<any>({
    optionId: 1,
    optionValue: 10
  });

  const [editJurisdictionTable, setEditJurisdictionTable] = useState<any>([]);
  const [editStatus, setEditStatus] = useState<any>([]);
  const [sortOrderCol1, setSortOrderCol1] = useState<any>(null);
  const [sortOrderCol2, setSortOrderCol2] = useState<any>(null);
  const [sortOrderCol3, setSortOrderCol3] = useState<any>(null);
  const [sortOrderCol4, setSortOrderCol4] = useState<any>(null);
  const [sortKey, setSortKey] = useState<any>(null);
  const [sortClicked, setSortClicked] = useState<any>(false);
  const agencyType = 2;
  const sortOrderLookup = {
    description: { ascend: 'ASC', descend: 'DESC' },
    jurisdictions: { ascend: 'ASC', descend: 'DESC' },
    status: { ascend: 'ASC', descend: 'DESC' },
    abbreviation: { ascend: 'ASC', descend: 'DESC' },
  };

  const direction = sortOrderLookup[sortKey]?.[sortOrderCol1] ?? 
  sortOrderLookup[sortKey]?.[sortOrderCol2] ?? 
  sortOrderLookup[sortKey]?.[sortOrderCol3] ?? 
  sortOrderLookup[sortKey]?.[sortOrderCol4] ??'';

  useEffect(() => {
    dispatch(
      getAgencyRequest({
        search: '',
        type: agencyType,
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
      setSortClicked(false);
      setLoadingTable(true);
      setControlRun(1);
      dispatch(
        getAgencyRequest({
          search: userInput.current,
          type: agencyType,
          pageNumber: paginationInfo?.CurrentPage || 1,
          pageSize: itemsPerPageCount,
          onlyActive: false,
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
      getAgencyRequest({
        search: userInput.current,
        type: agencyType,
        pageNumber: page,
        pageSize: size,
        onlyActive: false,
        sortKey,
        direction
      })
    );
  };

  const onAddItems = () => {
    const found = agencies?.find(obj => obj.description === descriptionRef.current);
    const foundAbbr = agencies?.find(obj => obj.abbreviation === AbbreviationRef.current);
    console.log(AbbreviationRef.current)
    if(foundAbbr) {
      ToastError(
        translate('pages.agency.toastErrorDuplicateAbbrRecord')
      );
    }
    else if (found) {
      ToastError(
        translate('pages.agency.toastErrorDuplicateRecord')
      );
    } else if (descriptionRef.current === '') {
      ToastError(
        translate('pages.legislations.toastErrorSubJurisdictionEmpty')
      );
    } else if (AbbreviationRef.current === '') {
      ToastError(
        translate('pages.legislations.toastErrorAbbreviationEmpty')
      );
    } else {
      dispatch(
        createAgencyRequest({
          id: null,
          description: descriptionRef.current,
          refLink: '',
          type: agencyType,
          jurisdictions: jurisdiction,
          active: 1,
          abbreviation: AbbreviationRef.current
        })
      );
    }
  };

  function handleUserSearchInput(value) {
    setLoadingTable(true);
    setControlRun(1);
    dispatch(
      getAgencyRequest({
        search: value,
        type: agencyType,
        pageNumber: 1,
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

  const handleSave = agency => {
    cancel();
    if (agency && agency?.id) {
      console.log('editingDescription.current', editingDescription.current) 
      console.log('editingAbbreviation.current', editingDescription.abbreviation)
      const new_description = editingDescription.current || agency.description;
      const new_abbreviation = editingAbbreviation.current || agency.abbreviation;
      const foundAbbr = agencies?.find(obj => obj.abbreviation === editingAbbreviation.current);
      let jurisdictions: any = editedJurisdiction;
      if (jurisdictions.length <= 0) {
        jurisdictions = agencies.find(x => x.id === agency?.id).Jurisdictions?.map(x => Number(x.id));
      }
      let status;
      if (editStatusValue[agency.id] === undefined) {
        status = agencies.find(x => x.id === agency?.id).active;
      } else {
        status = Number(editStatusValue[agency.id].value) === 1;
      }
      if (!_.trim(new_description)) {
        ToastError(
          translate('pages.legislations.toastErrorSubJurisdictionEmpty')
        );
      } else if (new_description.length > 255) {
        ToastError(
          translate('pages.legislations.toastErrorSubJurisdictionSize')
        );
      }
      if (!_.trim(new_abbreviation)) {
        ToastError(
          translate('pages.legislations.toastErrorAbbreviationEmpty')
        );
      } else if (new_abbreviation.length > 255) {
        ToastError(
          translate('pages.legislations.toastErrorAbbreviationSize')
        );
      } else if(foundAbbr) {
        ToastError(
          translate('pages.agency.toastErrorDuplicateAbbrRecord')
        );
      }
      else {
        dispatch(
          createAgencyRequest({
            id: Number(agency?.id),
            description: new_description,
            refLink: '',
            type: agencyType,
            jurisdictions,
            abbreviation: new_abbreviation,
            active: status,
            isEdit: true,
            searchText: userInput.current,
            pageNumber: paginationInfo?.CurrentPage,
            pageSize: itemsPerPageCount
          })
        );
        setDataForEdit([...dataForEdit.filter(item => item.id != agency.id)]);
        setEditedJurisdiction([]);
      }
    }
    refactorData(agency.id);
  };

  function refactorData(id) {
    const asArr = Object.entries(textEdit);
    const jurArr = Object.entries(editJurisdictionTable);
    const statusArr = Object.entries(editStatus);
    const filtered = asArr.filter(([key, value]) => value && key !== id);
    const jurFiltered = jurArr.filter(([key, value]) => value && key !== id);
    const statusFiltered = statusArr.filter(
      ([key, value]) => value && key !== id
    );
    textEdit = Object.fromEntries(filtered);
    setEditJurisdictionTable(Object.fromEntries(jurFiltered));
    setEditStatus(Object.fromEntries(statusFiltered));
  }
  const arrJurisdictionRef: any = [];

  const handleChangeJurisdictions = (value: any) => {
    setJurisdiction([Number(value.value)]);
  };

  useEffect(() => {
    setLoadingTable(true);
  }, [getAgencyRequest, setItemsPerPage]);

  useEffect(() => {
    setControlRun(controlRun + 1);
    if (controlRun == 1) {
      setLoadingTable(false);
    }
  }, [agencies]);

  const [editingKey, setEditingKey] = useState('');

  const isEditing = record => record.id === editingKey;

  const [form] = Form.useForm();

  const edit = (record: Partial<Item> & { id: React.Key }) => {
    editingDescription.current = undefined;
    editingAbbreviation.current = undefined;
    setMaxLengthDescriptionEdit(false);
    setMinLengthDescriptionEdit(false);
    setAutoFocusSubJurisdictionTable(true);
    setAutoFocusSubJurisdiction(false);
    setMaxLengthAbbreviationEdit(false);
    setMinLengthAbbreviationEdit(false);
    setAutoFocus(false);
    form.setFieldsValue({
      use: record.description, 
      ...record
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
    setAutoFocusSubJurisdictionTable(false);
    setAutoFocusAbbreviationTable(false);
    setEditMode(false);
  };

  const [maxLengthDescriptionEdit, setMaxLengthDescriptionEdit] = useState(false);
  const [maxLengthAbbreviationEdit, setMaxLengthAbbreviationEdit] = useState(false);
  const [minLengthDescriptionEdit, setMinLengthDescriptionEdit] = useState(false);
  const [minLengthAbbreviationEdit, setMinLengthAbbreviationEdit] = useState(false);
  const columnsUses = [
    {
      title: 'Sub-Jurisdictions',
      editable: true,
      dataIndex: 'description',
      textWrap: 'word-break',
      ellipsis: true,
      render: (__, record) => {
        const editable = isEditing(record);
        return editable ? (
          editDescription(
            editingDescription,
            autoFocusSubJurisdictionTable,
            setAutoFocusSubJurisdiction,
            setAutoFocus,
            record,
            setMaxLengthDescriptionEdit,
            setAutoFocusSubJurisdictionTable,
            setMinLengthDescriptionEdit,
            maxLengthDescriptionEdit,
            minLengthDescriptionEdit)
        ) : (
          <Tooltip title={record.description}>
            {record.description}
          </Tooltip>
        )
      },
      sortOrder: sortOrderCol1,
      sorter: (a, b) => {
        // do nothing
      }
    },
    {
      title: 'Abbreviation',
      editable: true,
      dataIndex: 'abbreviation',
      textWrap: 'word-break',
      ellipsis: true,
      render: (__, record) => {
        const editable = isEditing(record);
        return editable ? (
          editAbbreviation(
            editingAbbreviation,
            autoFocusAbbreviationTable,
            setAutoFocusAbbreviation,
            setAutoFocus,
            record,
            setMaxLengthAbbreviationEdit,
            setAutoFocusAbbreviationTable,
            setMinLengthAbbreviationEdit,
            maxLengthAbbreviationEdit,
            minLengthAbbreviationEdit)
        ) : (
          <Tooltip title={record.abbreviation}>
            {record.abbreviation}
          </Tooltip>
        )
      },
      sortOrder: sortOrderCol4,
      sorter: (a, b) => {
        // do nothing
      }
    },
    {
      title: 'Jurisdictions',
      editable: true,
      width: editMode ? 300 : 120,
      dataIndex: 'jurisdictions',
      onCell: (__, record) => ({
        inputType: 'multi-select',
        editing: isEditing(record)
      }),
      render: (__, record) => {
        const editable = isEditing(record);

        return editable ? (
          <Select
            labelValue="description"
            keyValue="id"
            values={jurisdictionList}
            inputRef={editJurisdictionRef}
            onChange={value => {
              setEditedJurisdiction(
                [Number(value.value)]
              );
            }}
            defaultValue={record.Jurisdictions[0]?.description}
            size="100%"
          />
        )

          : (
            record.Jurisdictions?.map((jur: any, index: any) => {
              return (
                <div key={jur.description}>
                  {jur.description}
                </div>
              );
            })
          )

      },
      sortOrder: sortOrderCol2,
      // commented due to sort issue in backend
      sorter: (a, b) => {
        // do nothing
      }
    },
    {
      title: 'Status',
      editable: true,
      width: editMode ? 125 : 90,
      dataIndex: 'status',
      onCell: (__, record) => ({
        inputType: 'select',
        editing: isEditing(record)
      }),
      render: (__, record) => {
        return statusField(
          isEditing,
          record
        )
      },
      sortOrder: sortOrderCol3,
      sorter: (a, b) => {
        // do nothing
      }
    },
    {
      title: 'Action',
      key: 'action',
      width: 120,
      render: (__, record) => {
        const editable = isEditing(record);

        return editable ? (
          <>
            <Link
              fakeLink
              onClick={() => !maxLengthDescriptionEdit && !maxLengtAbbreviation && !(editingDescription.current === '' || editingAbbreviation.current ===''  ) && handleSave(record)}
              style={{ marginRight: 8 }}
              isDisabled={maxLengthDescriptionEdit || minLengthDescriptionEdit || (editingDescription.current === '' || editingAbbreviation.current ===''  )}
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
              textEdit[record.id] = record?.description || '';
              setEditMode(true);
              setDataForEdit([...dataForEdit, { id: record.id, value: record?.description || '' }]);
            }}
            isdisabled={userRole === null || userRole === 'Read-only' ? 'true' : 'false'}
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


  const handleOnChange = (pagination, filters, sorter, extra) => {
    switch (sorter.field) {
      case 'description':
        setSortKey('description');
        setSortOrderCol1(sortOrderCol1 === 'ascend' || sortOrderCol1 === null ? 'descend' : 'ascend');
        setAutoFocus(false);
        setSortOrderCol2(null);
        setSortOrderCol3(null);
        setSortOrderCol4(null);
        break;
      case 'jurisdictions':
        setSortKey('jurisdictions');
        setSortOrderCol2(sortOrderCol2 === 'ascend' || sortOrderCol2 === null ? 'descend' : 'ascend');
        setAutoFocus(false);
        setSortOrderCol1(null);
        setSortOrderCol3(null);
        setSortOrderCol4(null);
        break;
      case 'status':
        setSortKey('status');
        setSortOrderCol3(sortOrderCol3 === 'ascend' || sortOrderCol3 === null ? 'descend' : 'ascend');
        setAutoFocus(false);
        setSortOrderCol1(null);
        setSortOrderCol2(null);
        setSortOrderCol4(null);
        break;
      case 'abbreviation':
        setSortKey('abbreviation');
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
  const [maxLengthDescription, setMaxLengthDescription] = useState(false);
  const [maxLengtAbbreviation, setMaxLengthAbbreviation] = useState(false);
  return (
    <Container>
      <ContainerLabelTable>
        <Label />
        <ContainerButtons>
          <AgencyNameSection>
            <Label>Sub-Jurisdiction *</Label>
            <Input
              className="input-commonname"
              type="text"
              maxLength={255}
              defaultText={descriptionRef.current}
              disableInput={userRole == null || userRole == 'Read-only'}
              autoFocus={autoFocusSubJurisdiction}
              onFocus={() => { setAutoFocusSubJurisdictionTable(false); setAutoFocus(false) }}
              onChangeInput={value => {
                descriptionRef.current = value;
                if (descriptionRef.current.length > 255) {
                  setAutoFocusSubJurisdiction(true)
                  setMaxLengthDescription(true)
                } else {
                  setMaxLengthDescription(false)
                }
              }}
            />
            {maxLengthDescription &&
              <ErrorContainer>Maximum Length is 255</ErrorContainer>
            }
          </AgencyNameSection>
          <AgencyNameSection>
            <Label>Abbreviation *</Label>
            <Input
              className="input-commonname"
              type="text"
              maxLength={255}
              defaultText={AbbreviationRef.current}
              disableInput={userRole == null || userRole == 'Read-only'}
              autoFocus={autoFocusAbbreviation}
              onFocus={() => { setAutoFocusAbbreviation(false); setAutoFocus(false) }}
              onChangeInput={value => {
                AbbreviationRef.current = value;
                if (AbbreviationRef.current.length > 255) {
                  setAutoFocusAbbreviation(true)
                  setMaxLengthDescription(true)
                } else {
                  setMaxLengthDescription(false)
                }
              }}
            />
            {maxLengthDescription &&
              <ErrorContainer>Maximum Length is 255</ErrorContainer>
            }
          </AgencyNameSection>
          <ContainerJurisdictionButton>
            <ContainerHeaderField>
              <Label>Jurisdictions *</Label>
              <Select
                labelValue="description"
                keyValue="id"
                values={jurisdictionList}
                inputRef={jurisdictionRef}
                onChange={handleChangeJurisdictions}
                defaultValue={jurisdictionRef.current.value}
                size="300px"
                isDisabled={userRole == null || userRole == 'Read-only'}
              />
            </ContainerHeaderField>
            <Button
              text="Add Item"
              onClick={onAddItems}
              type="primary"
              isDisabled={userRole == null || userRole == 'Read-only' || maxLengthDescription || !jurisdiction || maxLengtAbbreviation }
            />
          </ContainerJurisdictionButton>
        </ContainerButtons>
      </ContainerLabelTable>

      <ContainerPagination>
        <PaginationSearch
          isSearchBar
           onPaginationSearchChangeInput={handleUserSearchInput} 
           defaultPaginationSearchText={userInput.current}
           autoFocus={autoFocus}
          onFocus={() => { setAutoFocusSubJurisdiction(false); setAutoFocusSubJurisdictionTable(false) }}
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
          dataTable={agencies}
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

const editAbbreviation = (
  editingAbbreviation,
  autoFocusAbbreviationTable,
  setAutoFocusAbbreviation,
  setAutoFocus,
  record,
  setMaxLengthAbbreviationEdit,
  setAutoFocusAbbreviationTable,
  setMinLengthAbbreviationEdit,
  maxLengthAbbreviationEdit,
  minLengthAbbreviationEdit
) => {
  return (
    <AbbreviationContainer>
      <Input
        className="input-commonname"
        type="form"
        maxLength={255}
        defaultText={editingAbbreviation.current !== undefined ? editingAbbreviation.current : record.abbreviation}
        autoFocus={autoFocusAbbreviationTable}
        onFocus={() => { setAutoFocusAbbreviation(false); setAutoFocus(false) }}
        onChangeInput={(value) => {
          editingAbbreviation.current = value;
          if (value.length > 255) {
            setMaxLengthAbbreviationEdit(true)
            setAutoFocusAbbreviationTable(true);
          } else if (maxLengthAbbreviationEdit) {
            setMaxLengthAbbreviationEdit(false)
          }
          if (value.length < 1) {
            setMinLengthAbbreviationEdit(true)
          } else if (minLengthAbbreviationEdit) {
            setMinLengthAbbreviationEdit(false)
          }
        }}
      />
      {maxLengthAbbreviationEdit &&
        <ErrorContainer>Maximum Length is 255</ErrorContainer>
      }
    </AbbreviationContainer>
  )
}

const editDescription = (
  editingDescription,
  autoFocusSubJurisdictionTable,
  setAutoFocusSubJurisdiction,
  setAutoFocus,
  record,
  setMaxLengthDescriptionEdit,
  setAutoFocusSubJurisdictionTable,
  setMinLengthDescriptionEdit,
  maxLengthDescriptionEdit,
  minLengthDescriptionEdit
) => {
  return (
    <DescriptionContainer>
      <Input
        className="input-commonname"
        type="form"
        maxLength={255}
        defaultText={editingDescription.current !== undefined ? editingDescription.current : record.description}
        autoFocus={autoFocusSubJurisdictionTable}
        onFocus={() => { setAutoFocusSubJurisdiction(false); setAutoFocus(false) }}
        onChangeInput={(value) => {
          editingDescription.current = value;      
          if (value.length > 255) {
            setMaxLengthDescriptionEdit(true)
            setAutoFocusSubJurisdictionTable(true);
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
  )
}
const statusField = (
  isEditing,
  record
) => {
  const editable = isEditing(record);
  return editable ? (
    <Select
      labelValue="label"
      keyValue="value"
      defaultValue={record.active ? 1 : 2}
      onChange={value => {
        editStatusValue[record.id] = value;
      }}
      values={[
        {
          value: 1,
          label: 'Active'
        },
        {
          value: 2,
          label: 'Inactive'
        }
      ]}
    />
  ) :

    (<div>{record.active ? 'Active' : 'Inactive'}</div>)
}

export default SubJurisdiction;