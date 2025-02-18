/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Checkbox } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import Moment from 'moment';

import applicationTabs from '../../../mocks/application-tabs';
import { downloadAttachment, uploadAttachment } from '../../../services/api';
import {
  selectors,
  getImpactAssessmentSubstanceAttachments,
  editImpactAssessmentSubstanceAttachments,
  createImpactAssessmentSubstanceAttachments,
  deleteImpactAssessmentSubstanceAttachments
} from '../../../store/modules/impactAssessment/actions';
import { attachmentModalRegulatoryUpdatesFailure } from '../../../store/modules/regulatoryUpdates/actions';
import Button from '../../Button';
import Input from '../../Input';
import Link from '../../Link';
import PaginationAnt from '../../Pagination';
import Select from '../../Select';
import Table from '../../Table';
import TabsFilter from '../../Tags';
import {
  Container,
  Content,
  Label,
  Overlay,
  UpdateModal,
  TitleModal,
  XIcon,
  ErrorContainer,
  ContainerApplicationArea,
  ContainerCheckbox,
  ContainerFileUpload,
  ContainerFile,
  ContainerFileDescription,
  ContainerAttachmentFileName,
  AttachmentName,
  ContainerTable,
  ContainerEditText,
  IcoEdit,
  ContainerEditInput,
  ContainerPagination,
  ContainerButtons,
  Search,
  SearchIcon,
  Pagination,
  ContainerApplicationFilter,
  ContainerTabs,
  RequiredLabel,
  DescriptionText,
  SelectFileBtn
} from './styled';
import { ToastError } from '../../Toast';
import { createUserErrorLogRequest } from '../../../store/modules/userErrorLog/actions';
import PaginationSearch from '../../PaginationSearch';

export interface IOptions {
  value: any;
  label: any;
}

interface IModalAttachments {
  open?: boolean;
  close?: any;
  modalTitle: any;
  substanceId: number;
  regulationId: number;
  regionId: number;
  groupImpactAssessment?: boolean;
}

const ModalAttachments: React.FC<IModalAttachments> = ({
  open,
  close,
  modalTitle,
  substanceId,
  regulationId,
  regionId,
  groupImpactAssessment = false
}) => {
  const [maxLengthDescription, setMaxLengthDescription] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [controlRun, setControlRun] = useState(0);
  const [maxLengthDescriptionEdit, setMaxLengthDescriptionEdit] =
    useState(false);
  const filesRef = useRef<any>();
  const userInput = useRef<any>();
  const editApplicationRef = useRef<any>();
  const editingDescription = useRef<any>();
  const [filesShow, setFilesShow] = useState<any>([]);
  const [createApplicationArea, setCreateApplicationArea] = useState<any>([]);
  const [editApplication, setEditApplication] = useState<any>([]);
  const [itemsPerPageCount, setItemsPerPageCount] = useState<any>(10);
  const [maxFileSize, setMaxFileSize] = useState<any>(false);
  const [autoFocus, setAutoFocus] = useState(false);
  const [appAreaFilters, setAppAreaFilters]: any = useState([]);
  const [focusSearch, setFocusSearch] = useState(false);
  const [autoFocusDescriptionEdit, setAutoFocusDescriptionEdit] =
    useState(false);
  const [editMode, setEditMode] = useState(false);
  const showFileUploadRef = useRef<any>([true]);
  const attDescription = useRef<any>('');
  const [editingKey, setEditingKey] = useState('');
  const tableData = useSelector(selectors.substanceAttachmentImpactAssessment);
  const paginationInfo = useSelector(selectors.substanceAttachmentsPagination);

  const extnData = process.env.REACT_APP_ATT_EXT_ALLOWED || '';
  // eslint-disable-next-line no-useless-escape
  const extn = extnData.replace(/[\[\]']/g, '');
  const trimedExtn = extn.split(',').map(item => item.trim());
  const extentionAllowed = trimedExtn.join(', ');

  const dispatch = useDispatch();

  const isEditing = record => record.id === editingKey;

  useEffect(() => {
    dispatch(
      getImpactAssessmentSubstanceAttachments({
        groupImpactAssessment,
        substanceId,
        toyotaRegion: regionId,
        regulationId,
        pageNumber: Number(paginationInfo?.CurrentPage) || 1,
        pageSize: Number(paginationInfo?.PageSize) || 10,
        searchText: ''
      })
    );
  }, []);

  useEffect(() => {
    setControlRun(controlRun + 1);
    if (controlRun == 1) {
      setLoadingTable(false);
    }
  }, [tableData]);

  const handleSave = record => {
    const attachments = {
      ...record?.Attachment,
      description:
        editingDescription?.current || record?.Attachment.description,
      id: Number(record.id)
    };
    const areasSelected = appAreaFilters.map(item => {
      return item.id;
    });
    dispatch(
      editImpactAssessmentSubstanceAttachments({
        id: Number(record?.id),
        substanceId: Number(record?.substanceId || record?.regulationGroupId),
        regulationId: Number(record?.regulationId),
        toyotaRegionId: Number(regionId),
        attachment: attachments,
        applicationAreas:
          editApplication.map(application => application.key) || [],
        pageSize: Number(paginationInfo?.PageSize) || 10,
        pageNumber: Number(paginationInfo?.CurrentPage) || 1,
        searchText: userInput.current || '',
        areasSelected,
        groupImpactAssessment
      })
    );
    setEditingKey('');
    setLoadingTable(true);
    setControlRun(1);
  };

  useEffect(() => {
    if (open) {
      document.body.classList.add('hide-overflow');
    }
  }, [open]);

  const handleClose = () => {
    document.body.classList.remove('hide-overflow');
    setMaxLengthDescription(false);
    close();
  };

  const onChange = (checkedValues: CheckboxValueType[]) => {
    if (checkedValues.length === 0) {
      setCreateApplicationArea([]);
    } else {
      setCreateApplicationArea(checkedValues);
    }
  };

  const handleChooseFile = (e: any) => {
    const file = e.target.files[0];
    const fileSizeInMB = file.size / (1024 * 1024);
    const maxSizeInMB = 10;
    const extension = file?.name?.split('.').pop();
    const extAllowed: any = process.env.REACT_APP_ATT_EXT_ALLOWED;
    if (!extAllowed?.includes(extension?.toUpperCase())) {
      dispatch(
        createUserErrorLogRequest({
          error: `Unsupported file type: Please try again with a file with the following extensions - ${extentionAllowed}`,
          page: 'AttachmentsImpactAssessment'
        })
      );
      ToastError(
        `Unsupported file type: Please try again with a file with the following extensions - ${extentionAllowed}`
      );
      dispatch(attachmentModalRegulatoryUpdatesFailure());
    } else if (fileSizeInMB > maxSizeInMB) {
      setMaxFileSize(true);
    } else {
      setMaxFileSize(false);
      filesRef.current = e.target.files;
      setFilesShow(filesRef.current);
      showFileUploadRef.current = false;
    }
  };

  const handleRemoveFile = () => {
    showFileUploadRef.current = true;
    filesRef.current = undefined;
    attDescription.current = '';
    setFilesShow(filesRef.current);
  };

  const cancel = () => {
    setEditingKey('');
    setEditMode(false);
  };

  const edit = (record: any) => {
    setEditingKey(record.id);
  };

  const deleteAttachment = id => {
    const areasSelected = appAreaFilters.map(item => {
      return item.id;
    });
    dispatch(
      deleteImpactAssessmentSubstanceAttachments({
        id,
        substanceId,
        toyotaRegion: regionId,
        regulationId,
        pageSize: Number(paginationInfo?.PageSize) || 10,
        pageNumber: Number(paginationInfo?.CurrentPage) || 1,
        searchText: userInput.current || '',
        areasSelected,
        groupImpactAssessment
      })
    );
    setLoadingTable(true);
    setControlRun(1);
    handleRemoveFile();
    cancel();
  };

  const handlePagination = (page, size) => {
    setLoadingTable(true);
    setControlRun(1);

    setItemsPerPageCount(size);

    dispatch(
      getImpactAssessmentSubstanceAttachments({
        groupImpactAssessment,
        substanceId,
        toyotaRegion: regionId,
        regulationId,
        pageNumber: page,
        pageSize: size,
        searchText: userInput.current
      })
    );
  };

  const handleUserSearchInput = value => {
    setLoadingTable(true);
    setControlRun(1);
    dispatch(
      getImpactAssessmentSubstanceAttachments({
        groupImpactAssessment,
        substanceId,
        toyotaRegion: regionId,
        regulationId,
        pageNumber: Number(paginationInfo?.CurrentPage) || 1,
        pageSize: itemsPerPageCount,
        searchText: value
      })
    );
    userInput.current = value;

    if (!focusSearch) {
      setFocusSearch(true);
    }
  };

  const handleAppAreaFilterClick = (data: any) => {
    setAppAreaFilters(data);
    const areasSelected = data.map(item => {
      return item.id;
    });
    setLoadingTable(true);
    setControlRun(1);

    dispatch(
      getImpactAssessmentSubstanceAttachments({
        groupImpactAssessment,
        substanceId,
        toyotaRegion: regionId,
        regulationId,
        pageNumber: Number(paginationInfo?.pageNumber) || 1,
        pageSize: Number(paginationInfo?.pageSize) || 10,
        searchText: '',
        areasSelected
      })
    );
  };

  const uploadFile = async () => {
    const uploadResult = await uploadAttachment(
      [filesRef.current],
      [attDescription.current]
    );

    const areasSelected = appAreaFilters.map(item => {
      return item.id;
    });

    dispatch(
      createImpactAssessmentSubstanceAttachments({
        substanceId: Number(substanceId),
        regulationId: Number(regulationId),
        toyotaRegionId: Number(regionId),
        attachment: uploadResult[0],
        applicationAreas: createApplicationArea,
        pageSize: Number(paginationInfo?.PageSize) || 10,
        pageNumber: Number(paginationInfo?.CurrentPage) || 1,
        searchText: userInput.current || '',
        areasSelected,
        groupImpactAssessment
      })
    );

    handleRemoveFile();
    setLoadingTable(true);
    setControlRun(1);
  };

  async function handleAttachmentDownload(id: any) {
    const att = await downloadAttachment(id);
    window.open(att.data.message, '_blank', 'noopener,noreferrer');
  }

  const columnsTable = [
    {
      title: 'Date',
      dataIndex: 'createdAt',
      width: 100,
      render: (text, record) => {
        return (
          <div>{Moment(text).format(process.env.REACT_APP_DATE_FORMAT)}</div>
        );
      }
    },
    {
      title: 'Filename',
      dataIndex: 'fileName',
      render: (text, record) => {
        return (
          <Link
            fakeLink
            onClick={() => {
              handleAttachmentDownload(record?.Attachment.id);
            }}
          >
            {record?.Attachment.fileName}
          </Link>
        );
      }
    },
    {
      title: 'Description',
      dataIndex: 'description',
      render: (_, record) => {
        const editable = isEditing(record);

        return editable ? (
          <ContainerEditInput>
            <Input
              type="form"
              defaultText={
                editingDescription.current !== undefined
                  ? editingDescription.current
                  : record?.Attachment.description
              }
              maxLength={255}
              autoFocus={autoFocusDescriptionEdit}
              onFocus={() => {
                setAutoFocus(false);
              }}
              onChangeInput={value => {
                editingDescription.current = value;
                if (value.length > 255) {
                  setMaxLengthDescriptionEdit(true);
                  setAutoFocusDescriptionEdit(true);
                } else if (maxLengthDescriptionEdit) {
                  setMaxLengthDescriptionEdit(false);
                }
              }}
            />
            {maxLengthDescriptionEdit && (
              <ErrorContainer>Maximum Length is 255</ErrorContainer>
            )}
          </ContainerEditInput>
        ) : (
          <DescriptionText>{record?.Attachment.description}</DescriptionText>
        );
      }
    },
    {
      title: 'Application Area',
      dataIndex: 'applicationArea',
      width: 180,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Select
            labelValue="description"
            keyValue="id"
            values={applicationTabs}
            inputRef={editApplicationRef}
            onChange={value => {
              setEditApplication(value);
            }}
            selectedValue={editApplication}
            size="100%"
            mode="multiple"
          />
        ) : (
          record?.ApplicationAreas.map(item => {
            return <div>{applicationTabs[Number(item.id) - 1].label}</div>;
          })
        );
      }
    },
    {
      title: 'Action',
      key: 'action',
      width: 166,
      render: (__, record) => {
        const editable = isEditing(record);

        return editable ? (
          <ContainerEditText>
            <Link
              fakeLink
              onClick={() => !maxLengthDescriptionEdit && handleSave(record)}
              style={{ marginRight: 8 }}
            >
              Save
            </Link>
            <Link fakeLink onClick={cancel} style={{ marginRight: 8 }}>
              Cancel
            </Link>

            <Link onClick={() => deleteAttachment(Number(record.id))} fakeLink>
              Remove
            </Link>
          </ContainerEditText>
        ) : (
          <IcoEdit
            onClick={() => {
              edit(record);
              editingDescription.current = undefined;
              setEditMode(true);
              setEditApplication(
                record?.ApplicationAreas.map(val => {
                  return {
                    label: val.description,
                    value: Number(val.id),
                    key: Number(val.id)
                  };
                })
              );
            }}
            isdisabled="false"
          />
        );
      }
    }
  ];

  return open ? (
    <Container>
      <UpdateModal>
        <TitleModal>
          <p>{modalTitle}</p>
          <XIcon onClick={() => handleClose()} />
        </TitleModal>
        <Content>
          <ContainerFileUpload>
            <ContainerApplicationArea>
              <RequiredLabel>Application Area</RequiredLabel>
              <ContainerCheckbox>
                <Checkbox.Group onChange={onChange} options={applicationTabs} />
              </ContainerCheckbox>
            </ContainerApplicationArea>
            <ContainerFile>
              {!showFileUploadRef.current && (
                <ContainerAttachmentFileName>
                  <AttachmentName>{filesRef.current?.[0].name}</AttachmentName>
                  <Button
                    danger
                    onClick={() => handleRemoveFile()}
                    text="Remove attachment"
                  />
                  <Button
                    id="upload-file"
                    toolTip={
                      createApplicationArea.length === 0
                        ? 'Please select at least one Application Area'
                        : undefined
                    }
                    type="primary"
                    isDisabled={createApplicationArea.length === 0}
                    name="file"
                    text="Upload Attachment"
                    onClick={() =>
                      createApplicationArea.length === 0 ? null : uploadFile()
                    }
                  />
                </ContainerAttachmentFileName>
              )}
              {showFileUploadRef.current && (
                <SelectFileBtn>
                  <Button
                    toolTip={`Supported file types: ${extentionAllowed}`}
                    upload
                    id="select-file"
                    type="primary"
                    name="file"
                    text="Select File"
                    onChange={(e: any) => handleChooseFile(e)}
                  />
                </SelectFileBtn>
              )}
              <ContainerFileDescription>
                <Input
                  type="form"
                  defaultText={attDescription.current}
                  autoFocus={autoFocus}
                  maxLength={255}
                  onChangeInput={value => {
                    attDescription.current = value;
                    if (attDescription.current.length > 255) {
                      setMaxLengthDescription(true);
                      setAutoFocus(true);
                    } else {
                      setMaxLengthDescription(false);
                    }
                  }}
                  placeholder="Input the description of the attachment here."
                />
                {maxLengthDescription && (
                  <ErrorContainer>Maximum Length is 255</ErrorContainer>
                )}
              </ContainerFileDescription>
            </ContainerFile>
            {maxFileSize && (
              <ErrorContainer>Maximum file size is 10MB</ErrorContainer>
            )}
          </ContainerFileUpload>

          <ContainerApplicationFilter>
            <Label>Application Area Filter</Label>
            <ContainerTabs>
              <TabsFilter
                tabsWithContent={applicationTabs}
                key={0}
                value={applicationTabs}
                disableTags={false}
                selectedTabs={appAreaFilters}
                onTabClick={handleAppAreaFilterClick}
                substanceId={1}
                useDesc
              />
            </ContainerTabs>
          </ContainerApplicationFilter>

          <PaginationSearch
            isSearchBar
            onPaginationSearchChangeInput={handleUserSearchInput}
            defaultPaginationSearchText={userInput.current}
            autoFocus={focusSearch}
            current={Number(paginationInfo?.CurrentPage)}
            totalPage={paginationInfo?.TotalCount}
            pageSizeTotal={Number(paginationInfo?.PageSize)}
            selectPageSize
            handleClick={handlePagination}
            handlePageChange={pageSize => {
              setItemsPerPageCount(pageSize);
            }}
          />

          <ContainerTable>
            <Table
              rowKey="id"
              columnsTable={columnsTable}
              dataTable={tableData}
              loading={loadingTable}
              // onChange={handleOnChange}
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
        </Content>
      </UpdateModal>
      <Overlay />
    </Container>
  ) : null;
};

export default ModalAttachments;
