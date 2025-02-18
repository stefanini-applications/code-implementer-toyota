/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

import {
  EditOutlined,
  EyeOutlined,
  FormOutlined,
  MinusOutlined,
  PlusOutlined
} from '@ant-design/icons';
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Button as AntdButton,
  Tooltip
} from 'antd';

import { groupSubstances } from '../../services/api';
import { deleteRelatedSubstancesRequest } from '../../store/modules/relatedSubstances/actions';
import Button from '../Button';
import Link from '../Link';
import Confirmation from '../Modal/Confirmation';
import PaginationAnt from '../Pagination';
import {
  Container,
  PlusIcon,
  ContainerButtonsImpact,
  EditIcon,
  Pagination,
  EyeIcon
} from './styled';
import PaginationSearch from '../PaginationSearch';
import { queueDeleteGroupRequest } from '../../store/modules/queues/actions';
import { getRegulationRecordRequest } from '../../store/modules/regulations/actions';

interface Item {
  id: string;
  name: string;
  phase: number;
  restrictionLevel: number;
  type: string;
  groupTaggedToImpAssessment?: boolean;
}

interface ITableTree {
  relatedData: any;
  columnsTable: any;
  listRegulatoryUpdates?: any;
  onDeleteGroups?: any;
  reference?: any;
  onUpdateTreeData?: any;
  loadingStatus: boolean;
  impactEditColumn?: boolean;
  recType?: any;
  recName?: any;
  typeId?: any;
  onHandlePageChange?: any;
  onHandlePagination?: any;
  paginationInfo?: any;
  rsLoading?: any;
  paginated?: any;
  expandAll?: any;
  defaultPagination?: boolean;
  listing?: boolean;
  templateId?: number;
  toyotaRegionId?: any;
  search?: string;
  rowSelection?: any;
  onPaginationSearchChangeInput?: any;
  defaultPaginationSearchText?: any;
  autoFocus?: any;
  placeholder?: string;
  onViewClick?: any;
  handleEditAction?: any;
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
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

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

const EditableTreeTable: React.FC<ITableTree> = ({
  relatedData,
  columnsTable,
  reference,
  listRegulatoryUpdates,
  onDeleteGroups,
  onUpdateTreeData,
  loadingStatus,
  impactEditColumn,
  recType,
  recName,
  typeId = null,
  onHandlePageChange,
  onHandlePagination,
  paginationInfo,
  rsLoading,
  search,
  rowSelection = null,
  paginated = false,
  expandAll = false,
  defaultPagination = false,
  listing = false,
  templateId = 0,
  toyotaRegionId = '1',
  onPaginationSearchChangeInput,
  defaultPaginationSearchText,
  autoFocus,
  placeholder,
  onViewClick,
  handleEditAction
}) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [currenPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<any>(-1);
  const [titleText, setTitleText] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [groupId, setGroupId] = useState<any>(-1);
  const [eleType, setEleType] = useState('');
  const userRole = localStorage.getItem('user.role');
  const dispatch = useDispatch();
  const toyotaRegion = Number(localStorage.getItem('user.toyotaRegion'));

  useEffect(() => {
    if (rsLoading != undefined) {
      setLoading(rsLoading);
    }
  }, [rsLoading]);

  useEffect(() => {
    if (paginationInfo?.CurrentPage && paginationInfo?.PageSize) {
      const currentPage =
        paginationInfo?.CurrentPage > paginationInfo?.TotalPages
          ? 1
          : paginationInfo?.CurrentPage;
      setCurrentPage(currentPage);
      setItemsPerPage(paginationInfo?.PageSize);
    }
  }, [paginationInfo]);

  // const getGroupSubstances = record => {
  //   setLoading(true);
  //   groupSubstances(record.id, reference)
  //     .then(response => {
  //       if (response?.data?.message && onUpdateTreeData) {
  //         onUpdateTreeData(record.id, response?.data?.message);
  //       }
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       setLoading(false);
  //     });
  // };

  const isEditing = (record: Item) => record.id === editingKey;

  let columns: any = [];

  columns = [
    ...columnsTable,
    {
      title: 'Action',
      dataIndex: 'IAction',
      width: 300,
      render: (_, record) => {
        let allUpdates;
        let upd;
        let impAssessLen;
        let type;
        let thoseOrThat;

        if (record.type === 'Substance' && record.level === 0) {
          impAssessLen = record?.hasImpactAssessment ? 1 : 0;

          if (!listing) {
            allUpdates = listRegulatoryUpdates
              ?.map(regUp =>
                regUp?.Substances?.filter(
                  sub => sub.id === record.id.toString()
                )
              )
              .flat();
            upd = allUpdates?.length > 1 ? 'updates' : 'update';
            thoseOrThat = allUpdates?.length > 1 ? 'those' : 'that';
            type = recType === 'regulation' ? 'regulatory' : 'legislative';
          }
        } else if (record.type === 'Group') {
          impAssessLen = record?.groupTaggedToImpAssessment ? 1 : 0;

          if (!listing) {
            allUpdates = listRegulatoryUpdates
              ?.map(regUp =>
                regUp?.RegulationGroups?.filter(
                  grp => grp.id === record.id.toString()
                )
              )
              .flat();
            upd = allUpdates?.length > 1 ? 'updates' : 'update';
            thoseOrThat = allUpdates?.length > 1 ? 'those' : 'that';
            type = recType === 'regulation' ? 'regulatory' : 'legislative';
          }
        }

        return record.type === 'Substance' &&
          record.level === 0 &&
          templateId === 2 ? (
          <div style={{ display: 'flex' }}>
            <div>
              <Button
                toolTip="View Substance Impact Assessment"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  color: '#1890ff'
                }}
                icon={<EyeOutlined />}
                onClick={() => onViewClick(record, 'Substance')}
              />
            </div>

            <div style={{ paddingLeft: '10px' }}>
              <Button
                toolTip={
                  record.hasImpactAssessment
                    ? 'Edit Substance Impact Assessment'
                    : 'Create Substance Impact Assessment'
                }
                style={{
                  justifyContent: 'center',
                  color: '#1890ff',
                  display:
                    userRole == null || userRole === 'Read-only'
                      ? 'none'
                      : 'flex'
                }}
                onClick={e => handleEditAction(e, record, `Substance`)}
                icon={<FormOutlined />}
              />
            </div>
            <div style={{ paddingLeft: '10px' }}>
              <Button
                style={{
                  display:
                    userRole == null ||
                    userRole === 'Read-only' ||
                    userRole === 'Normal User'
                      ? 'none'
                      : 'block'
                }}
                isDisabled={userRole == null || userRole == 'Read-only'}
                danger
                text="Remove Substance"
                onClick={() => {
                  setEleType('Substance');
                  setOpen(true);
                  setDeleteId(record.id);
                  setTitleText(`Remove substance from ${recType}?`);
                  setBodyText(
                    allUpdates?.length > 0 && impAssessLen > 0
                      ? `This substance is tagged in ${allUpdates?.length} ${type} ${upd}
                            and an Impact Assessment has been created for it. It will be removed
                            from ${thoseOrThat} ${type} ${upd}, and the associated Impact Assessment information
                            will be deleted.`
                      : allUpdates?.length > 0
                      ? `This substance is tagged in ${allUpdates?.length} ${type} ${upd}.
                              It will be removed from ${thoseOrThat} ${type} ${upd}.`
                      : impAssessLen > 0
                      ? `An Impact Assessment has been created for this substance, in this ${recType}.
                                That Impact Assessment information will be deleted.`
                      : ``
                  );
                }}
              />
            </div>
          </div>
        ) : record.type === 'Group' ? (
          <div style={{ display: 'flex' }}>
            <div>
              <Button
                toolTip="View Group Impact Assessment"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  color: '#1890ff'
                }}
                icon={<EyeOutlined />}
                onClick={() => onViewClick(record, 'Group')}
              />
            </div>

            <div style={{ paddingLeft: '10px' }}>
              <Button
                toolTip="Edit Group Members"
                style={{
                  justifyContent: 'center',
                  color: '#1890ff',
                  display:
                    userRole == null || userRole === 'Read-only'
                      ? 'none'
                      : 'flex'
                }}
                onClick={e => handleEditAction(e, record, `Group`)}
                icon={<EditOutlined />}
              />
            </div>

            <div style={{ paddingLeft: '10px' }}>
              <Button
                style={{
                  display:
                    userRole == null ||
                    userRole === 'Read-only' ||
                    userRole === 'Normal User'
                      ? 'none'
                      : 'flex'
                }}
                isDisabled={
                  userRole == null ||
                  userRole == 'Read-only' ||
                  record?.markedDelete
                }
                danger
                text={record?.markedDelete ? 'Deleting Group' : 'Delete Group'}
                btnLoading={record?.markedDelete}
                onClick={() => {
                  setEleType('Group');
                  setOpen(true);
                  setDeleteId(-1);
                  setGroupId(record.id);
                  setTitleText(`Delete this group?`);
                  setBodyText(
                    allUpdates?.length > 0 && impAssessLen > 0
                      ? `This group is tagged in ${allUpdates?.length} ${type} ${upd}
                                and an Impact Assessment has been created for it. It will be removed
                                from ${thoseOrThat} ${type} ${upd}, and the Impact Assessment information
                                (for the group and the substances within it) will be deleted`
                      : allUpdates?.length > 0
                      ? `This group is tagged in ${allUpdates?.length} ${type} ${upd}.
                                  It will be removed from ${thoseOrThat} ${type} ${upd}.`
                      : impAssessLen > 0
                      ? `An Impact Assessment exists for this group and the substances within it, in this ${recType}.
                                    This Impact Assessment information will be deleted.`
                      : `All substances within it will also be removed from the ${recType}`
                  );
                }}
              />
            </div>
          </div>
        ) : null;
      }
    }
  ];

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: 'number',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    };
  });

  const handleClose = action => {
    if (action === 'yes') {
      if (eleType === 'Group') {
        const statusChangedRes =
          relatedData && relatedData.find(item => item.id === groupId);
        if (statusChangedRes) {
          statusChangedRes.markedDelete = true;
        }
        dispatch(
          queueDeleteGroupRequest({
            groupId: Number(groupId),
            regulationId: Number(reference)
          })
        );

        setTimeout(() => {
          dispatch(getRegulationRecordRequest({ id: reference }));
        }, 2000);
      } else {
        dispatch(
          deleteRelatedSubstancesRequest({
            regulation: Number(reference),
            substance: Number(deleteId),
            type: eleType,
            listing,
            group: Number(groupId),
            toyotaRegion,
            search
          })
        );
      }
    }
    setOpen(false);
  };

  return (
    <Container>
      <Confirmation
        open={open}
        centered
        setOpen={setOpen}
        titleModal={titleText}
        bodyText={bodyText}
        onClose={handleClose}
        okText={eleType === 'Group' ? 'Delete' : 'Remove'}
        cancelText="Cancel"
      />
      {!defaultPagination ? (
        <>
          <PaginationSearch
            onPaginationSearchChangeInput={onPaginationSearchChangeInput}
            defaultPaginationSearchText={defaultPaginationSearchText}
            autoFocus={autoFocus}
            isSearchBar
            current={currenPage}
            totalPage={paginationInfo?.TotalCount}
            pageSizeTotal={itemsPerPage}
            selectPageSize
            handleClick={page => {
              if (onHandlePagination) {
                setCurrentPage(page);
                onHandlePagination(page);
              }
            }}
            handlePageChange={pageSize => {
              if (onHandlePageChange) {
                setItemsPerPage(pageSize);
                onHandlePageChange(pageSize);
              }
            }}
          />
        </>
      ) : null}
      <Form form={form} component={false}>
        <Table
          rowSelection={rowSelection}
          components={{
            body: {
              cell: EditableCell
            }
          }}
          bordered
          key="table"
          dataSource={relatedData}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={defaultPagination ? { position: ['bottomRight'] } : false}
          loading={loading || loadingStatus}
          expandable={{
            expandedRowKeys: expandAll ? relatedData?.map(o => o.key) : null,
            onExpand: (exp, record) => {
              if (
                record.type === 'Group' &&
                exp &&
                record?.children.length > 0 &&
                record?.children[0].dummyRow
              ) {
                // getGroupSubstances(record);
                console.log('a');
              }
            },
            expandIcon: ({ expanded, onExpand, record }) => {
              return record.type === 'Group' ? (
                expanded ? (
                  <AntdButton
                    size="small"
                    onClick={e => onExpand(record, e)}
                    style={{
                      marginRight: '8px',
                      bottom: '3px',
                      borderRadius: '6px',
                      fontSize: '8px',
                      width: '17px',
                      height: '17px'
                      // cursor: 'pointer'
                    }}
                    icon={<MinusOutlined />}
                    disabled={record?.children?.length === 0}
                  />
                ) : null
              ) : null;
            }
          }}
        />
      </Form>
      {!defaultPagination ? (
        <PaginationSearch
          current={currenPage}
          totalPage={paginationInfo?.TotalCount}
          pageSizeTotal={itemsPerPage}
          selectPageSize
          isBottom
          handleClick={page => {
            if (onHandlePagination) {
              setCurrentPage(page);
              onHandlePagination(page);
            }
          }}
          handlePageChange={pageSize => {
            if (onHandlePageChange) {
              setItemsPerPage(pageSize);
              onHandlePageChange(pageSize);
            }
          }}
        />
      ) : null}
    </Container>
  );
};

export default EditableTreeTable;
