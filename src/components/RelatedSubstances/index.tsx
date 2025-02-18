/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import {
  AiOutlineCloudUpload,
  AiOutlineCloudDownload,
  AiOutlineLoading
} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { Modal, Table, Tooltip } from 'antd';
import { cloneDeep } from 'lodash';
import Moment from 'moment';
import readXlsxFile, { readSheetNames, Row } from 'read-excel-file';

import { translate } from '../../locales';
import regionTabs from '../../mocks/region-tabs';
import ImpactAssessmentError from '../../pages/ErrorModal/errors';
import history from '../../routes/history';
import {
  downloadRelatedSubstance,
  genericS3Upload,
  getListingsData
} from '../../services/api';
import { getEnv } from '../../utils/env-util';
import {
  selectors as selectorsImpactAssessment,
  attachmentImapctAssessmentFailure,
  attachmentImapctAssessmentReadFailure,
  attachmentImapctAssessmentReadTabsFailure,
  attachmentImapctAssessmentInvalidSheetNames,
  uploadImpactAssessmentListRequest,
  uploadImpactAssessmentListUploadFailure
} from '../../store/modules/impactAssessment/actions';
import {
  selectors,
  getListingsRequest,
  deleteGroupRequest
} from '../../store/modules/listings/actions';
import { selectors as regUpSelector } from '../../store/modules/regulatoryUpdates/actions';
import { editUserToyotaRegionRequest } from '../../store/modules/userPreferences/actions';
import loadUserDataOnStorage from '../../utils/userData';
import Button from '../Button';
import EditableTreeTable from '../EditableTreeTable';
import Link from '../Link';
import Menu from '../Menu';
import ModalToyotaRegion from '../Modal/ModalToyotaRegion';
import { ToastError } from '../Toast/index';
import {
  Container,
  TitleContainer,
  Title,
  FlexSpaceBetween,
  Search,
  SearchIcon,
  ContainerButtonGroup,
  FilePlaceholder,
  DisabledTextInfo,
  ContainerButtonAdd,
  ContainerButtonsEditMode,
  ArrowDown,
  ArrowUp,
  ContainerLoadingSearch,
  ContainerRegionFilter,
  ContainerSelectedRegion,
  Label,
  ContainerSearch,
  LabelSecondary,
  SpanSentenceCase,
  CheckboxInput,
  ActionContainer,
  ActionIcon
} from './styled';
import { queueImpactAssessmentUploadRequest } from '../../store/modules/queues/actions';
import { getRegulationRecordRequest } from '../../store/modules/regulations/actions';
import GroupSubstances from '../Modal/GroupSubstances';

interface IRelatedSubstances {
  legislationId: any;
  legislation?: any;
  recType?: any;
  recName?: any;
  showHeader?: any;
  typeId?: any;
  listing?: any;
  timeStamp?: number;
  id?: string;
}

const RelatedSubstances: React.FC<IRelatedSubstances> = ({
  legislationId,
  legislation,
  recType,
  recName,
  showHeader = true,
  typeId = null,
  listing = false,
  timeStamp,
  id
}) => {
  const [openGroupSubstances, setOpenGroupSubstances] = useState(false);
  const [openRegionModal, setOpenRegionModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [searchedArray, setSearchedArray]: any = useState();
  const [editMode, setEditMode] = useState(false);
  const [iconMenu, setIconMenu] = useState(<ArrowDown />);
  const impactAssessmentErrors = useSelector(
    selectorsImpactAssessment.impactAssessmentListUploadError
  );
  const listRegulatoryUpdates = useSelector(
    regUpSelector.regulatoryUpdatesRecords
  );
  const dispatch = useDispatch();
  const userRole = localStorage.getItem('user.role');
  const userInputRs: any = useRef('');
  const [autoFocus, setAutoFocus] = useState(false);
  const [group, setGroup] = useState(0);
  const [rsLoading, setRsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const paginationInfo = useSelector(selectors.listingsPaginationInfo);
  const listRelatedSubstances = useSelector(selectors.listings);
  const [toyotaRegion, setToyotaRegion] = useState(
    localStorage.getItem('user.toyotaRegion')
  );
  const toyotaRegionName = regionTabs.find(
    obj => obj.id === Number(toyotaRegion)
  )?.tab;
  const [selected, setSelected] = useState<any>([]);
  const [itemsPerPageCount, setItemsPerPageCount] = useState(10);
  const [isStatusChanged, setIsStatusChanged] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setRsLoading(false);
    setSearchedArray(
      listRelatedSubstances?.map(x => ({
        ...x,
        checked: !!selected?.find(y => y.id === x.id)
      }))
    );
  }, [listRelatedSubstances]);

  useEffect(() => {
    if (autoFocus) {
      setAutoFocus(false);
    }
  }, [timeStamp]);

  const fetchListingData = () => {
    setRsLoading(true);
    dispatch(
      getListingsRequest({
        search: userInputRs.current || '',
        pageNumber: paginationInfo?.CurrentPage || 1,
        pageSize: itemsPerPageCount || 10,
        paged: true,
        reference: legislationId,
        type: 'rs',
        noLoading: true,
        toyotaRegion: toyotaRegion || '1'
      })
    );
  };

  useEffect(() => {
    setRsLoading(true);
    dispatch(
      getListingsRequest({
        search: userInputRs.current || '',
        pageNumber: paginationInfo?.CurrentPage || 1,
        pageSize: 10,
        paged: true,
        reference: legislationId,
        type: 'rs',
        noLoading: true,
        toyotaRegion: toyotaRegion || '1'
      })
    );
  }, [legislationId, toyotaRegion]);

  useEffect(() => {
    const fetchData = async () => {
      await loadUserDataOnStorage();
      setToyotaRegion(localStorage.getItem('user.toyotaRegion'));
    };

    fetchData();
  }, []);

  useEffect(() => {
    const body = document.body;
    if (openErrorModal) {
      body.classList.add('modal-open');
    } else {
      body.classList.remove('modal-open');
    }
  }, [openErrorModal]);

  useEffect(() => {
    if (impactAssessmentErrors?.length > 0) {
      setOpenErrorModal(true);
    }
  }, [impactAssessmentErrors]);

  const handleView = (record, type) => {
    if (type === `Substance`) {
      const finalParam = {
        substanceId: record.id,
        regulationId: legislationId,
        toyotaRegionId: toyotaRegionName
      };
      history.push('/view-substance-impact-assessment', {
        state: { finalParam }
      });
    } else {
      history.push(
        `/view-impact-assessment-group/${record.id}/${toyotaRegion}`
      );
    }
  };

  const handleEdit = (e, record, type) => {
    e.preventDefault();
    if (record.markedDelete || record.uploadInProgress) {
      console.log('Edit disabled for:', record);
      return;
    }
    if (type === `Substance`) {
      const typeName = `${record?.casNumber} • ${record?.commonName}`;
      const pattern = /&/gi;
      const replacement = 'replace_and_char';
      const repCommName = record?.commonName.replace(pattern, replacement);
      const repTypeName = typeName.replace(pattern, replacement);
      if (record.hasImpactAssessment) {
        const query = encodeURI(
          `casNumber=${record.casNumber}` +
            `&commonName=${repCommName}` +
            `&typeName=${repTypeName}&type=${recType}&typeId=${legislationId}` +
            `&substance=${record?.id}` +
            `&region=${toyotaRegion}` +
            `&regulationId=${legislationId}` +
            `&regulation=${legislationId}`
        );

        history.push(`/editRecord-impactAssessment/${record?.id}?${query}`);
      } else {
        const query = encodeURI(
          `casNumber=${record.casNumber}` +
            `&commonName=${repCommName}` +
            `&typeName=${repTypeName}&type=${recType}&typeId=${legislationId}` +
            `&substance=${record?.id}` +
            `&region=${toyotaRegion}` +
            `&regulationId=${legislationId}` +
            `&regulation=${legislationId}` +
            `&phase=${legislation?.phase ?? ``}`
        );

        history.push(`/newRecord-impactAssessment?${query}`);
      }
    } else {
      navigateToGroupPage(record);
    }
  };

  const handleDelete = record => {
    console.log('Delete clicked for:', record);
    // Add logic for deleting the record
  };

  function containsAnyLettersOrSpecialChars(str) {
    return (
      /[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/.test(str) || /[a-zA-Z]/.test(str)
    );
  }

  const readSheets = async (e: any) => {
    let error =
      "Invalid File: The uploaded Excel file didn't come from GRIIPS, please try again with a valid file (downloaded from GRIIPS)";
    try {
      const article = await readXlsxFile(e.target.files[0], {
        sheet: 'Articles (Parts Or Vehicle)',
        trim: false
      });
      const config: Row[] = await readXlsxFile(e.target.files[0], {
        sheet: 'Config',
        trim: false
      });
      if (config[0][0] !== process.env.REACT_APP_UUID_EXCEL_UPLOAD) {
        throw Error(error);
      }
      if (config[1][0] !== legislation.id) {
        let legName = legislation.nickname || legislation.billTitle;
        legName =
          legName.length > 50 ? `${legName.substring(0, 50)}...` : legName;
        error = `Invalid File: The uploaded Excel file didn't come from "${legName}", please try again with an Excel file downloaded from this page`;
        throw Error(error);
      }
      if (config[3][0] !== toyotaRegion) {
        error = `Invalid File: The uploaded Excel file is from a different Impacted Toyota Region, please try again with an Excel file downloaded from this Impacted Toyota Region`;
        throw Error(error);
      }
      const groups: any = [];
      for (let i = 1; i < article.length; i++) {
        if (article[i][0] && article[i][0] === 'GROUP') {
          groups.push(Number(article[i][11]));
          console.log(article[i][11]);
        }
      }

      let bucket = process.env.REACT_APP_PROD_TEMP_S3_BUCKET;

      switch (getEnv()) {
        case 'local':
          bucket = process.env.REACT_APP_LOCAL_TEMP_S3_BUCKET;
          break;
        case 'development':
          bucket = process.env.REACT_APP_DEV_TEMP_S3_BUCKET;
          break;
        case 'qa':
          bucket = process.env.REACT_APP_QA_TEMP_S3_BUCKET;
          break;
        default:
          break;
      }
      const upload = await genericS3Upload(e.target.files[0], bucket);
      dispatch(
        queueImpactAssessmentUploadRequest({
          fileName: e.target.files[0].name,
          regulationId: Number(legislation.id),
          groups
        })
      );
      document.getElementById('loading-screen')!.style.visibility = 'hidden';
      document.getElementById('loading-screen')!.style.opacity = '0';
      setTimeout(() => {
        fetchListingData();
        dispatch(getRegulationRecordRequest({ id: legislation.id }));
      }, 2000);
    } catch (err) {
      console.log(err);
      document.getElementById('loading-screen')!.style.visibility = 'hidden';
      document.getElementById('loading-screen')!.style.opacity = '0';
      ToastError(error);
    }
  };

  const handleDownloadFile = async () => {
    const att = await downloadRelatedSubstance(
      legislationId,
      toyotaRegion,
      selected.map(x => x.id)
    );
    const blob = new Blob([new Uint8Array(att.data.message.content.data)], {
      type: att.data.message.contentType
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const now = new Date();
    const date = now
      .toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      })
      .replace(/\//g, '');
    const time = now
      .toLocaleTimeString('en-US', { hour12: false })
      .replace(/:/g, '');
    const date_time = `${date}_${time}`;
    const legislationTitle = legislation.nickname
      ? legislation.nickname
      : legislation.billTitle;

    link.download = `${
      toyotaRegionName === 'SE ASIA'
        ? 'SE_ASIA'
        : toyotaRegionName?.replaceAll(' ', '_')
    }_${legislationTitle.slice(0, 26)}_${date_time}.xlsx`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 7000);
  };

  const handleChooseFile = (e: any) => {
    const extension = e?.target?.files[0]?.name?.split('.').pop();
    const extAllowed: any = process.env.REACT_APP_XL_ATT_EXT_ALLOWED;

    if (!extAllowed?.includes(extension?.toUpperCase())) {
      dispatch(attachmentImapctAssessmentFailure());
    } else {
      // document.body.classList.add('loading-indicator');
      document.getElementById('loading-screen')!.style.visibility = 'visible';
      document.getElementById('loading-screen')!.style.opacity = '1';
      readSheetNames(e.target.files[0])
        .then(sheetNames => {
          readSheets(e);
          if (legislation) {
            legislation.uploadJobRunning = true;
            setIsStatusChanged(true);
          }
        })
        .catch(err => {
          document.getElementById('loading-screen')!.style.visibility =
            'hidden';
          document.getElementById('loading-screen')!.style.opacity = '0';
          dispatch(attachmentImapctAssessmentReadFailure());
        });
    }
  };

  const onCloseErrorList = () => {
    dispatch(uploadImpactAssessmentListUploadFailure([]));
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickMenu = e => {
    if (e.length > 0) {
      setIconMenu(<ArrowUp />);
    } else {
      setIconMenu(<ArrowDown />);
    }
  };

  const handleClickItem = e => {
    if (e.key === 'downloadIA') {
      handleDownloadFile();
    } else {
      inputRef.current?.click();
    }
  };

  const handleUpdateTreeData = async (grpId, data) => {
    const newObj = cloneDeep(searchedArray);
    const grpIndex = newObj?.findIndex(item => item?.id === grpId);
    if (grpIndex > -1) {
      newObj[grpIndex].children = data;
      setSearchedArray(newObj);
    }
  };

  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  const handleUserSearchInputRs = value => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      if (!isSearching) {
        setIsSearching(true);
      }
      setRsLoading(true);
      dispatch(
        getListingsRequest({
          search: value,
          pageNumber: 1,
          pageSize: paginationInfo?.PageSize || 10,
          paged: true,
          reference: legislationId,
          type: 'rs',
          noLoading: true,
          toyotaRegion
        })
      );
      userInputRs.current = value;
      if (!autoFocus) {
        setAutoFocus(true);
      }
    }, 500);
  };

  useEffect(() => {
    let lastScrollY = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) > 100) {
        setAutoFocus(false);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleUserSearchInputRsRecursive = (item, value) => {
    if (item.name.toLowerCase().includes(value.toLowerCase())) {
      return true;
    }
    if (item.children && item.children.length > 0) {
      const filteredChildren = item.children.filter(child => {
        return handleUserSearchInputRsRecursive(child, value);
      });
      if (filteredChildren.length > 0) {
        item.children = filteredChildren;
        return true;
      }
      return false;
    }
    return false;
  };

  useEffect(() => {
    handleChangeItemsPerPage(itemsPerPageCount);
  }, [itemsPerPageCount]);

  const handlePagination = page => {
    if (page !== (paginationInfo?.CurrentPage || 1)) {
      setRsLoading(true);
      dispatch(
        getListingsRequest({
          search: userInputRs.current,
          pageNumber: page,
          pageSize: itemsPerPageCount,
          paged: true,
          reference: legislationId,
          type: 'rs',
          noLoading: true,
          toyotaRegion
        })
      );
    }
  };

  const handleChangeItemsPerPage = value => {
    setRsLoading(true);
    dispatch(
      getListingsRequest({
        search: userInputRs.current,
        pageNumber: 1,
        pageSize: value,
        paged: true,
        reference: legislationId,
        type: 'rs',
        noLoading: true,
        toyotaRegion
      })
    );
  };

  const handleNavigationClick = (e, record) => {
    if (record.type === 'Group') {
      e.preventDefault();
      setGroup(record);
      setOpenGroupSubstances(true);
    }
  };

  const navigateToGroupPage = record => {
    history.push(`/group/${record.id}`, {
      record: legislation,
      group: record,
      listing,
      listingId: typeId,
      listRegulatoryUpdates
    });
  };

  const groupActions = record => {
    return (
      <ActionContainer>
        <Tooltip title="View Group Impact Assessment">
          <ActionIcon
            color="#1890ff"
            onClick={() => handleView(record, `Group`)}
          >
            <EyeOutlined />
          </ActionIcon>
        </Tooltip>
        <Tooltip title="Edit Group Members">
          <ActionIcon color="#52c41a">
            <Link
              href={`/${record.type === 'Group' ? 'group' : 'substance'}/${
                record.id
              }`}
              onClick={e => handleEdit(e, record, `Group`)}
            >
              <EditOutlined />
            </Link>
          </ActionIcon>
        </Tooltip>
      </ActionContainer>
    );
  };

  const substanceActions = record => {
    if (record.level !== 0) {
      return null;
    }
    return (
      <ActionContainer>
        <Tooltip title="View Substance Impact Assessment">
          <ActionIcon
            color="#1890ff"
            onClick={() => handleView(record, `Substance`)}
          >
            <EyeOutlined />
          </ActionIcon>
        </Tooltip>
        <Tooltip
          title={
            record.hasImpactAssessment
              ? 'Edit Substance Impact Assessment'
              : 'Create Substance Impact Assessment'
          }
        >
          <ActionIcon color="#52c41a">
            <Link
              href={`/${record.type === 'Group' ? 'group' : 'substance'}/${
                record.id
              }`}
              onClick={e => handleEdit(e, record, `Substance`)}
            >
              <EditOutlined />
            </Link>
          </ActionIcon>
        </Tooltip>
      </ActionContainer>
    );
  };
  return (
    <Container>
      {openRegionModal && (
        <ModalToyotaRegion
          centered
          open={openRegionModal}
          onOk={value => {
            setToyotaRegion(value);
            dispatch(editUserToyotaRegionRequest(value));
          }}
          toyotaRegionId={toyotaRegion}
          onCancel={() => {
            setOpenRegionModal(false);
          }}
          modalTitle="Change Impacted Toyota Region"
        />
      )}
      {openErrorModal && (
        <ImpactAssessmentError
          errorList={impactAssessmentErrors}
          close={() => {
            setOpenErrorModal(false);
            onCloseErrorList();
          }}
          listingPage={false}
        />
      )}

      {openGroupSubstances && (
        <GroupSubstances
          open={openGroupSubstances}
          close={() => setOpenGroupSubstances(false)}
          group={group}
          toyotaRegionId={toyotaRegion}
          legislation={legislation}
          listing={listing}
          typeId={typeId}
          listRegulatoryUpdates={listRegulatoryUpdates}
        />
      )}
      {showHeader && (
        <TitleContainer id="group-table">
          <Title>Related Substances</Title>
        </TitleContainer>
      )}
      <ContainerSearch>
        {editMode || listing ? null : (
          <ContainerRegionFilter>
            <ContainerSelectedRegion>
              <LabelSecondary>Impacted Toyota Region:</LabelSecondary>{' '}
              <SpanSentenceCase>
                {toyotaRegionName === 'SE ASIA'
                  ? 'SE Asia'
                  : toyotaRegionName?.toLowerCase()}
              </SpanSentenceCase>
            </ContainerSelectedRegion>
            <Button
              onClick={() => setOpenRegionModal(true)}
              text="Change Region"
            />
          </ContainerRegionFilter>
        )}
      </ContainerSearch>

      <ContainerButtonGroup id={id}>
        {userRole == null || userRole == 'Read-only' ? null : (
          <>
            {!listing && (
              <ContainerButtonsEditMode>
                <Button
                  toolTip={
                    userRole == null || userRole == 'Read-only'
                      ? 'User role not authorized to open: Read-only'
                      : undefined
                  }
                  text="Add Substances"
                  isDisabled={userRole == null || userRole == 'Read-only'}
                  onClick={() =>
                    history.push(
                      `/add-related-substances/${legislationId}/${legislation.recordType}`
                    )
                  }
                />
                <Button
                  isDisabled={userRole == null || userRole == 'Read-only'}
                  toolTip={
                    userRole == null || userRole == 'Read-only'
                      ? 'User role not authorized to open: Read-only'
                      : undefined
                  }
                  text="Create Group"
                  onClick={() =>
                    history.push('/group', {
                      record: legislation,
                      group: null,
                      listing,
                      listingId: typeId
                    })
                  }
                />
              </ContainerButtonsEditMode>
            )}
            {editMode || listing ? null : (
              <>
                <Menu
                  styling="button"
                  tooltip={
                    userRole == null || userRole == 'Read-only'
                      ? 'User role not authorized to open: Read-only'
                      : legislation?.deleteJobRunning
                      ? 'Impact Assessment information cannot be uploaded or downloaded while a group is being deleted'
                      : null
                  }
                  onClickItem={handleClickItem}
                  onClickMenu={handleClickMenu}
                  disabled={
                    userRole == null ||
                    userRole == 'Read-only' ||
                    legislation?.uploadJobRunning ||
                    legislation?.deleteJobRunning
                  }
                  items={[
                    {
                      label: legislation?.uploadJobRunning
                        ? 'Uploading Impact Assessment'
                        : 'Edit Impact Assessment via Excel',
                      key: 'SubMenu',
                      icon:
                        legislation?.uploadJobRunning ||
                        legislation?.deleteJobRunning ? (
                          <AiOutlineLoading className="rotateicon" />
                        ) : (
                          iconMenu
                        ),
                      children: [
                        {
                          label: 'Upload Impact Assessment',
                          key: 'uploadIA',
                          icon: <AiOutlineCloudUpload />
                        },
                        {
                          label: 'Download Impact Assessment',
                          key: 'downloadIA',
                          icon: <AiOutlineCloudDownload />
                        }
                      ]
                    }
                  ]}
                />
                <FilePlaceholder
                  id="select-file"
                  ref={inputRef}
                  type="file"
                  name="file"
                  placeholder=""
                  onChange={(e: any) => handleChooseFile(e)}
                  onClick={(e: any) => {
                    // upload the same file again
                    e.target.value = null;
                  }}
                />
              </>
            )}

            {editMode ? (
              <ContainerButtonsEditMode>
                <Button
                  toolTip={
                    userRole == null || userRole == 'Read-only'
                      ? 'User role not authorized to open: Read-only'
                      : undefined
                  }
                  text="Add Substances"
                  isDisabled={userRole == null || userRole == 'Read-only'}
                  onClick={() =>
                    history.push(
                      `/add-related-substances/${legislationId}/${legislation.recordType}`
                    )
                  }
                />
                <Button
                  isDisabled={userRole == null || userRole == 'Read-only'}
                  toolTip={
                    userRole == null || userRole == 'Read-only'
                      ? 'User role not authorized to open: Read-only'
                      : undefined
                  }
                  text="Create Group"
                  onClick={() =>
                    history.push('/group', {
                      record: legislation,
                      group: null,
                      listing,
                      listingId: typeId
                    })
                  }
                />
              </ContainerButtonsEditMode>
            ) : null}
          </>
        )}
      </ContainerButtonGroup>

      <EditableTreeTable
        onPaginationSearchChangeInput={handleUserSearchInputRs}
        defaultPaginationSearchText={userInputRs.current}
        placeholder="Search in related substances..."
        autoFocus={autoFocus}
        rsLoading={rsLoading}
        relatedData={searchedArray}
        search={userInputRs.current || ''}
        expandAll={isSearching ? true : null}
        onHandlePagination={handlePagination}
        onHandlePageChange={pageSize => setItemsPerPageCount(pageSize)}
        onUpdateTreeData={handleUpdateTreeData}
        typeId={typeId}
        recType={recType}
        recName={recName}
        loadingStatus={rsLoading}
        listRegulatoryUpdates={listRegulatoryUpdates}
        paginationInfo={paginationInfo}
        reference={legislationId}
        impactEditColumn={!editMode}
        listing={listing}
        templateId={2}
        toyotaRegionId={toyotaRegion}
        onViewClick={handleView}
        handleEditAction={handleEdit}
        columnsTable={
          listing && typeId === '2'
            ? [
                {
                  title: 'Group / Substance',
                  dataIndex: 'name',
                  textWrap: 'word-break',
                  ellipsis: true,
                  editable: false,
                  render: (_, record) =>
                    record.dummyRow ? (
                      'Loading...'
                    ) : listing && record.type === 'Group' ? (
                      record.name
                    ) : (
                      <Link
                        href={`/${
                          record.type === 'Group' ? 'group' : 'substance'
                        }/${record.id}`}
                        onClick={e => handleNavigationClick(e, record)}
                        isDisabled={record?.uploadInProgress === true}
                      >
                        {record.name}
                      </Link>
                    )
                },
                {
                  title: 'Phase',
                  dataIndex: 'phase',
                  width: 70,
                  editable: true
                },
                {
                  title: 'Phase-Out Date',
                  dataIndex: 'phaseOutDate',
                  width: '10%',
                  render: (_, record) => {
                    return (
                      <span>
                        {record.phaseOutDate
                          ? Moment(record.phaseOutDate).format(
                              process.env.REACT_APP_DATE_FORMAT
                            )
                          : ''}
                      </span>
                    );
                  }
                },
                {
                  title: 'Level of Restriction',
                  dataIndex: 'restrictionLevel',
                  width: 154,
                  editable: true
                },
                {
                  title: 'Comments',
                  dataIndex: 'comments',
                  width: '20%'
                }
              ]
            : editMode
            ? [
                {
                  title: 'Group / Substance',
                  dataIndex: 'name',
                  textWrap: 'word-break',
                  ellipsis: true,
                  editable: false,
                  render: (_, record) =>
                    record.dummyRow ? (
                      'Loading...'
                    ) : (
                      <Tooltip title={record.name}>
                        {listing && record.type === 'Group' ? (
                          record.name
                        ) : (
                          <Link
                            href={`/${
                              record.type === 'Group' ? 'group' : 'substance'
                            }/${record.id}`}
                            onClick={e => handleNavigationClick(e, record)}
                            isDisabled={record?.markedDelete === true}
                          >
                            {record.name}
                          </Link>
                        )}
                      </Tooltip>
                    )
                },
                {
                  title: 'Phase',
                  dataIndex: 'phase',
                  width: 70,
                  editable: true,
                  render: (_, record) => (
                    <div className={record.markedDelete ? 'disableText' : ''}>
                      {record.phase}
                    </div>
                  )
                },
                {
                  title: 'Level of Restriction',
                  dataIndex: 'restrictionLevel',
                  width: 154,
                  editable: true,
                  render: (_, record) => (
                    <div className={record.markedDelete ? 'disableText' : ''}>
                      {record.restrictionLevel}
                    </div>
                  )
                }
              ]
            : [
                {
                  title: '',
                  dataIndex: 'checked',
                  width: 100,
                  render: (_, record) =>
                    record.type === 'Group' ? (
                      <CheckboxInput
                        type="checkbox"
                        id={`custom-checkbox-${record.id}`}
                        name={record.id}
                        defaultChecked={record.checked}
                        value={record.id}
                        disabled={
                          record?.markedDelete || record?.uploadInProgress
                        }
                        onChange={e => {
                          if (e.target.checked) {
                            selected.push(record);
                          } else {
                            selected.splice(
                              selected.findIndex(x => x.id === record.id),
                              1
                            );
                          }
                          const newSelected = selected;
                          setSelected(newSelected);
                        }}
                      />
                    ) : null
                },
                {
                  title: 'Group / Substance',
                  dataIndex: 'name',
                  textWrap: 'word-break',
                  ellipsis: true,
                  editable: false,
                  render: (_, record) =>
                    record.dummyRow ? (
                      'Loading...'
                    ) : (
                      <Tooltip title={record.name}>
                        {listing && record.type === 'Group' ? (
                          record.name
                        ) : (
                          <Link
                            href={`/${
                              record.type === 'Group' ? 'group' : 'substance'
                            }/${record.id}`}
                            onClick={e => handleNavigationClick(e, record)}
                            isDisabled={
                              record?.markedDelete === true ||
                              record?.uploadInProgress === true
                            }
                          >
                            <div
                              style={{
                                paddingLeft: record.level === 1 ? '3rem' : ''
                              }}
                            >
                              {record.name}
                            </div>
                          </Link>
                        )}
                      </Tooltip>
                    )
                },
                {
                  title: 'Phase',
                  dataIndex: 'phase',
                  width: 80,
                  editable: true,
                  render: (_, record) => <div>{record.phase}</div>
                },
                {
                  title: 'Level of Restriction',
                  dataIndex: 'restrictionLevel',
                  width: 154,
                  editable: true,
                  render: (_, record) => <div>{record.restrictionLevel}</div>
                }
                // {
                //   title: 'Action',
                //   dataIndex: 'action',
                //   width: 150,
                //   render: (_, record) =>
                //     record.type === 'Group'
                //       ? groupActions(record)
                //       : substanceActions(record)
                // }
              ]
        }
      />
    </Container>
  );
};

export default RelatedSubstances;
