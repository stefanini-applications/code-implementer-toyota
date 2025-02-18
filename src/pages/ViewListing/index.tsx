import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

import { cloneDeep } from 'lodash';
import Moment from 'moment';
import readXlsxFile from 'read-excel-file';
import { Table } from 'rsuite';

import Button from '../../components/Button';
import EditableTreeTable from '../../components/EditableTreeTable';
import Link from '../../components/Link';
import RelatedSubstances from '../../components/RelatedSubstances';
import ScrollTopButton from '../../components/ScrollTopButton';
import listingsData from '../../mocks/listings-mock';
import { getListByName, genericS3Download } from '../../services/api';
import {
  selectors as selectDropdown,
  getListingsRequest as getListingsDropDownRequest
} from '../../store/modules/dropdownValues/actions';
import { getLegislationRecordRequest, selectors as selectorsRegulation } from '../../store/modules/legislations/actions';
import {
  selectors,
  getListingsRequest,
  attachmentListingsFailure,
  attachmentListingsReadFailure,
  listingsColumnDoesNotMatchError,
  editListingsRequest,
  editListingsUploadFailure
} from '../../store/modules/listings/actions';
import loadUserDataOnStorage from '../../utils/userData';
import ListingsError from '../ErrorModal/errors';
import {
  ArrowDown,
  BreadCrumbs,
  BreadCrumbsWrapper,
  Container,
  ContainerButton,
  ContainerList,
  ContainerSelect,
  ContainerTable,
  CurrentPage,
  HeaderContainer,
  Title,
  TitleContainer,
  UploadWrapperContainer,
  UploadLabel,
  UploadButton,
  Text,
  GeneralSection,
  Label,
  Search,
  SearchIcon,
  ContainerLoadingSearch,
  FlexSpaceBetween
} from './styled';
import { getEnv } from '../../utils/env-util';

const { Column, HeaderCell, Cell } = Table;

const ViewListing: React.FC = () => {
  const location = useLocation();
  const reference = location.pathname.split('/')[2];
  const templateId = location.pathname.split('/')[3];
  let listName;
  listingsData.forEach((list) => {
    list.lists.forEach((listItem) => {
      if (listItem.id === Number(reference) && templateId === listItem.template) { listName = listItem.name };
    })
  })
  const [deleteSubstance, setDeleteSubstance] = React.useState(0);
  const handleOpen = () => setOpen(true);
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [type, setType] = React.useState('');
  const selectedUsesRef: any = useRef([]);
  const [selectedUses, setSelectedUses] = React.useState([]);
  const [listingDesc, setListingDesc] = React.useState('');
  const [loading, setLoading] = useState(false);
  const [listRelatedSubstancesRS, setListRelatedSubstancesRS] = React.useState<any>([]);
  const substancelist = useSelector(selectDropdown.dropDownListings);
  const regulation = useSelector(selectorsRegulation.legislationRecord);

  const handleChangeUsesCheckbox = value => {
    selectedUsesRef.current.value = value;
    setSelectedUses(value);
  };

  const listRelatedSubstances = useSelector(selectors.listings);
  const listingsUploadErrors = useSelector(selectors.listingsUploadErrors);
  const paginationInfo = useSelector(selectors.listingsPaginationInfo);
  const [itemsPerPageCount, setItemsPerPageCount] = useState(10);
  const [autoFocus, setAutoFocus] = useState(false);
  const [gadslYnLoading, setGadslYnLoading] = useState(false);
  const [timeStamp, setTimeStamp] = useState(new Date().getTime());
  const userInput: any = useRef('');
  const userRole = localStorage.getItem('user.role');
  const dispatch = useDispatch();
  const toyotaRegion = Number(localStorage.getItem('user.toyotaRegion'))

  
  useEffect(() => {
    if (autoFocus) {
      setAutoFocus(false);
    }
  }, [timeStamp]);

  useEffect(() => {
    if (listingsUploadErrors?.length > 0) {
      setOpenErrorModal(true);
    }
  }, [listingsUploadErrors]);

  useEffect(() => {
    setGadslYnLoading(false);
  }, [listRelatedSubstances]);

  useEffect(() => {
    if (type === 'rs') {
      dispatch(getLegislationRecordRequest({ id: reference }));
    }
  }, [reference, type]);

  useEffect(() => {
    handleChangeItemsPerPage(itemsPerPageCount);
  }, [itemsPerPageCount]);

  const handlePagination = page => {
    if ((page !== (paginationInfo?.CurrentPage || 1))) {
      setGadslYnLoading(true);
      dispatch(
        getListingsRequest({
          search: userInput.current,
          pageNumber: page,
          pageSize: itemsPerPageCount,
          paged: true,
          reference,
          type,
          noLoading: true,
          toyotaRegion
        })
      );
    }
  };

  function handleChangeItemsPerPage(value) {
    if (type && type !== 'rs') {
      setGadslYnLoading(true);
      dispatch(
        getListingsRequest({
          search: userInput.current,
          pageNumber: 1,
          pageSize: value,
          paged: true,
          reference,
          type,
          noLoading: true,
          toyotaRegion
        })
      );
    }
  }

  function handleUserSearchInputGadslYn(value) {
    if (type && type !== 'rs') {
      setGadslYnLoading(true);
      dispatch(
        getListingsRequest({
          search: value,
          pageNumber: paginationInfo?.CurrentPage || 1,
          pageSize: itemsPerPageCount,
          paged: true,
          reference,
          type,
          noLoading: true,
          toyotaRegion
        })
      );

      userInput.current = value;

      if (!autoFocus) {
        setAutoFocus(true);
      }
    }
  }

  useEffect(() => {
    if (type && type !== 'rs') {
      dispatch(
        getListingsRequest({
          search: userInput.current,
          pageNumber: paginationInfo?.CurrentPage || 1,
          pageSize: itemsPerPageCount,
          paged: true,
          reference,
          type,
          toyotaRegion
        })
      );
    } else if (type && type === 'rs') {
      /* setLoading(true);
      getListingsData({
        pageNumber: 1,
        pageSize: 10,
        paged: true,
        reference,
        type
      }).then((response) => {
        if (response?.data?.message) {
          setListRelatedSubstancesRS(response?.data?.message);
        }
        setLoading(false);
      }).catch((err) => {
        setLoading(false);
        ToastError(translate('pages.regulations.toastErrorListListings'));
      }); */
      dispatch(
        getListingsRequest({
          search: '',
          pageNumber: paginationInfo?.CurrentPage || 1,
          pageSize: 10,
          paged: true,
          reference,
          type,
          toyotaRegion
        })
      );
    }
  }, [dispatch, listName, type]);

  useEffect(() => {
    if (listName != null && listName != '') {
      asyncGetListByName(listName);
    }
  }, [listName]);

  const asyncGetListByName = async name => {
    const response = await getListByName(name);
    if (response?.data?.message?.description) {
      setListingDesc(response?.data?.message?.description);
    }
  };

  useEffect(() => {
    switch (Number(templateId)) {
      case 1:
        setType('gadsl');
        break;
      case 2:
        setType('rs');
        break;
      case 3:
        setType('yn');
        break;

      default:
        break;
    }
  }, [templateId]);

  useEffect(() => {
    loadUserDataOnStorage();
  }, []);

  // useEffect(() => {
  //   if (type) {
  //     dispatch(
  //       getListingsDropDownRequest({
  //         reference,
  //         type
  //       })
  //     );
  //   }
  // }, [dispatch, reference, type]);

  const handleChooseFile = (e: any) => {
    const extension = e?.target?.files[0]?.name?.split('.').pop();
    const extAllowed: any = process.env.REACT_APP_XL_ATT_EXT_ALLOWED;

    if (!extAllowed?.includes(extension?.toUpperCase())) {
      dispatch(attachmentListingsFailure());
    } else {
      // document.body.classList.add('loading-indicator');
      document.getElementById('loading-screen')!.style.visibility = 'visible';
      document.getElementById('loading-screen')!.style.opacity = '1';
      readXlsxFile(e.target.files[0])
        .then(rows => {
          document.getElementById('loading-screen')!.style.visibility =
            'hidden';
          document.getElementById('loading-screen')!.style.opacity = '0';
          // `rows` is an array of rows
          // each row being an array of cells.
          addListingsData(rows);
        })
        .catch(error => {
          document.getElementById('loading-screen')!.style.visibility =
            'hidden';
          document.getElementById('loading-screen')!.style.opacity = '0';
          dispatch(attachmentListingsReadFailure());
        });
    }
  };

  const addListingsData = rows => {
    switch (type) {
      case 'gadsl': {
        const relatedSubstances: any = [];
        for (let i = 0; i < rows.length; i++) {
          // validate columns size
          if (rows[i].length !== 9) {
            dispatch(listingsColumnDoesNotMatchError());
            return;
          }
          if (i > 0) {
            const tableSub: any = listRelatedSubstances.find(
              (sub: any) => sub.commonName === rows[i][1]
            );
            const listSub: any = substancelist.find(
              (sub: any) => sub.commonName === rows[i][1]
            );
            const subId = tableSub ? tableSub.id : listSub ? listSub.id : -1;
            const firstAddedMom = rows[i][6] ? Moment(rows[i][6]) : null;
            const firstAdded =
              firstAddedMom && firstAddedMom.isValid()
                ? firstAddedMom.toISOString()
                : null;
            const lastRevisedMom = rows[i][7] ? Moment(rows[i][7]) : null;
            const lastRevised =
              lastRevisedMom && lastRevisedMom.isValid()
                ? lastRevisedMom.toISOString()
                : null;
            const subForPush = {
              id: Number(subId),
              gadslId: tableSub ? Number(tableSub?.gadslId) : null,
              casNumber: rows[i][0] ? rows[i][0].toString() : '',
              commonName: rows[i][1] ? rows[i][1].toString() : '',
              classification: rows[i][2] ? rows[i][2].toString() : '',
              reasonCode: rows[i][3] ? rows[i][3].toString() : '',
              source: rows[i][4] ? rows[i][4].toString() : '',
              reporting: rows[i][5] ? rows[i][5].toString() : '',
              firstAdded,
              lastRevised,
              comments: rows[i][8] ? rows[i][8].toString() : ''
            };
            relatedSubstances.push(subForPush);
          }
        }
        break;
      }
      case 'rs': {
        const relatedSubstances: any = [];
        for (let i = 0; i < rows.length; i++) {
          // validate columns size
          if (rows[i].length !== 5) {
            dispatch(listingsColumnDoesNotMatchError());
            return;
          }

          if (i > 0) {
            const tableSub: any = listRelatedSubstances.find(
              (sub: any) => sub.commonName === rows[i][1]
            );
            const listSub: any = substancelist.find(
              (sub: any) => sub.commonName === rows[i][1]
            );
            const subId = tableSub ? tableSub.id : listSub ? listSub.id : -1;
            const phase =
              rows[i][2] && !isNaN(rows[i][2]) ? Number(rows[i][2]) : 0;
            const phaseOutDateMom = rows[i][3] ? Moment(rows[i][3]) : null;
            const phaseOutDate =
              phaseOutDateMom && phaseOutDateMom.isValid()
                ? phaseOutDateMom.toISOString()
                : null;
            const subForPush = {
              id: Number(subId),
              phase,
              phaseOutDate,
              casNumber: rows[i][0] ? rows[i][0].toString() : '',
              commonName: rows[i][1] ? rows[i][1].toString() : '',
              comments: rows[i][4] ? rows[i][4].toString() : ''
            };
            relatedSubstances.push(subForPush);
          }
        }
        break;
      }
      case 'yn': {
        const relatedSubstances: any = [];
        for (let i = 0; i < rows.length; i++) {
          // validate columns size
          if (rows[i].length !== 3) {
            dispatch(listingsColumnDoesNotMatchError());
            return;
          }
          if (i > 0) {
            const tableSub: any = listRelatedSubstances.find(
              (sub: any) => sub.commonName === rows[i][1]
            );
            const listSub: any = substancelist.find(
              (sub: any) => sub.commonName === rows[i][1]
            );
            const subId = tableSub ? tableSub.id : listSub ? listSub.id : -1;
            const subForPush = {
              id: Number(subId),
              ynListId: tableSub ? Number(tableSub?.ynListId) : null,
              casNumber: rows[i][0] ? rows[i][0].toString() : '',
              commonName: rows[i][1] ? rows[i][1].toString() : '',
              comments: rows[i][2] ? rows[i][2].toString() : ''
            };
            relatedSubstances.push(subForPush);
          }
        }
        break;
      }
      default:
        break;
    }
  };

  const handleUpdateTreeDataRS = async (grpId, data) => {
    const newObj = cloneDeep(listRelatedSubstancesRS);
    const grpIndex = newObj?.findIndex(item => item?.id === grpId);

    if (grpIndex > -1) {
      newObj[grpIndex].children = data;
      setListRelatedSubstancesRS(newObj);
    }
  };

  const downLoadListing = async (e: any) => {
    let bucket = process.env.REACT_APP_PROD_YORDAS_S3_BUCKET
    
    switch (getEnv()) {
      case 'local':
        bucket = process.env.REACT_APP_LOCAL_YORDAS_S3_BUCKET
        break;
      case 'development':
        bucket = process.env.REACT_APP_DEV_YORDAS_S3_BUCKET
        break;
      case 'qa':
        bucket = process.env.REACT_APP_QA_YORDAS_S3_BUCKET
        break;
      default:
        break;
    }
    const url = await genericS3Download(bucket, `${listName}.xlsx`);

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <ScrollTopButton
        notifyScroll={() => setTimeStamp(new Date().getTime())}
      />
      <Container>
        <HeaderContainer>
          <BreadCrumbsWrapper>
            <BreadCrumbs href="/">Home</BreadCrumbs>
            <ArrowDown />
            <BreadCrumbs href="/listing">Listing</BreadCrumbs>
            <ArrowDown />
            <CurrentPage>{listName}</CurrentPage>
          </BreadCrumbsWrapper>
        </HeaderContainer>

        <TitleContainer>
          <Title>{listName}</Title>
        </TitleContainer>
      </Container>
      <ContainerTable>
        <ContainerSelect>
          <GeneralSection>
            <Label>Description</Label>
            <Text>{listingDesc}</Text>
          </GeneralSection>
        </ContainerSelect>
        <ContainerList>
          
          {templateId !== '2' ? (
            <FlexSpaceBetween>
              { userRole == null ||
                    userRole == 'Read-only' ? null :
              <ContainerButton>
                <Button
                  text="Download Listing"
                  onClick={downLoadListing}
                  isDisabled={userRole == null || userRole == 'Read-only'}
                />
              </ContainerButton>
}
            </FlexSpaceBetween>
          ) : null}
          {templateId === '1' ? (
            <EditableTreeTable
              loadingStatus={gadslYnLoading}
              relatedData={listRelatedSubstances}
              onHandlePagination={handlePagination}
              onHandlePageChange={pageSize => setItemsPerPageCount(pageSize)}
              paginationInfo={paginationInfo}
              templateId={Number(templateId)}
              onPaginationSearchChangeInput={handleUserSearchInputGadslYn}
              defaultPaginationSearchText={userInput.current}
              autoFocus={autoFocus}
              columnsTable={[
                {
                  title: 'Substance',
                  dataIndex: 'name',
                  idKey: 'id',
                  width: 420,
                  render: (_, record) => {
                    return <Link href={`/substance/${record.id}`}>{record.name}</Link>
                  },
                },
                {
                  title: 'Classification',
                  dataIndex: 'classification',
                  width: 160,
                  class: 'center-cell classification-cell'
                },
                {
                  title: 'Reason Code',
                  dataIndex: 'reasonCode',
                  width: 160,
                  type: 'view',
                  class: 'center-cell reason-cell'
                },
                {
                  title: 'Source',
                  dataIndex: 'source',
                  width: 250,
                  type: 'view',
                  class: 'center-cell'
                },
                {
                  title: 'Reporting Threshold',
                  dataIndex: 'reporting',
                  width: 500,
                  type: 'viewComments',
                  class: 'center-cell'
                },
                {
                  title: 'First Added',
                  dataIndex: 'firstAdded',
                  width: 150,
                  type: 'view',
                  class: 'center-cell',
                  render: (_, record) => {
                    return record.firstAdded ? Moment.utc(record.firstAdded).format(process.env.REACT_APP_DATE_FORMAT) : '';
                  },
                },
                {
                  title: 'Last Revised',
                  dataIndex: 'lastRevised',
                  width: 150,
                  type: 'view',
                  class: 'center-cell',
                  render: (_, record) => {
                    return record.lastRevised ? Moment.utc(record.lastRevised).format(process.env.REACT_APP_DATE_FORMAT) : '';
                  },
                },
                {
                  title: 'Comments',
                  dataIndex: 'comments',
                  width: 400,
                  type: 'viewComments',
                  class: 'center-cell'
                }
              ]}
            />
          ) : null}
          {templateId === '2' ? (
            <RelatedSubstances
              legislation={regulation}
              legislationId={Number(reference)}
              recType="listing"
              recName={listName}
              showHeader={false}
              typeId={templateId}
              listing
              timeStamp={timeStamp}
            />
          ) : null}

          {templateId === '3' ? (
            <>
              <EditableTreeTable
                loadingStatus={gadslYnLoading}
                relatedData={listRelatedSubstances}
                onHandlePagination={handlePagination}
                onHandlePageChange={pageSize => setItemsPerPageCount(pageSize)}
                paginationInfo={paginationInfo}
                templateId={Number(templateId)}
                onPaginationSearchChangeInput={handleUserSearchInputGadslYn}
                defaultPaginationSearchText={userInput.current}
                autoFocus={autoFocus}
                columnsTable={[
                  {
                    title: 'Substance',
                    headerSort: true,
                    sortKey: 'commonName',
                    dataIndex: 'name',
                    width: 420,
                    idKey: 'id',
                    render: (_, data) => {
                      return <NavLink to={`/substance/${data.id}`}>{data.name}</NavLink>
                    }
                  },
                  {
                    title: 'Comments',
                    dataIndex: 'comments',
                    class: 'center-cell',
                    flexGrow: 3
                  }
                ]}
              />
            </>
          ) : null}
        </ContainerList>
      </ContainerTable>
    </>
  );
};

export default ViewListing;
