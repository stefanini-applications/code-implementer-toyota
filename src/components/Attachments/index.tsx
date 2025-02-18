/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from 'react';
import {
  AiFillFileImage,
  AiFillFilePdf,
  AiFillMail,
  AiFillFileText,
  AiFillFileWord,
  AiFillFileExcel,
  AiFillFilePpt,
} from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';

import { Spin } from 'antd';
import cuid from 'cuid';
import Moment from 'moment';

import { downloadAttachment } from '../../services/api';
import {
  selectors,
  getLegislationRecordAttachmentsRequest
} from '../../store/modules/legislations/actions';
import { selectors as reguSelectors } from '../../store/modules/regulatoryUpdates/actions';
import Link from '../Link';
import Tabs from '../Tabs';
import {
  Container,
  TitleContainer,
  Title,
  ContainerTable,
  TableList,
  ContainerLoadingTable,
  ContainerSpin,
  AttachmentsContainer,
  Attachment,
  TitleAttachment,
  DateAttachment,
  DescAttachment,
  UserAttachment,
  ContainerAttachmentRegulationRegion,
  AttachmentRegulation,
  SpanSentenceCase
} from './styled';
import PaginationSearch from '../PaginationSearch';

interface IAttachments {
  legislationId?: any;
  timeStamp: number;
}

const Attachments: React.FC<IAttachments> = ({ legislationId, timeStamp }) => {
  const [attachmentTab, setAttachmentTab] = useState(1);
  const legislationAttachments = useSelector(selectors.legislationAttachments);
  const [listAttachments, setListAttachments] = useState<any>([]);
  const [loadingAttachments, setLoadingAttachments] = useState(true);
  const paginationInfo = useSelector(selectors.attachmentPaginationInfo);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const listRegulatoryUpdates = useSelector(
    reguSelectors.regulatoryUpdatesRecords
  );
  const userInput: any = useRef('');
  const [autoFocus, setAutoFocus] = useState(false);
  const dispatch = useDispatch();
  const selectByTabs = [
  {
    label: 'Updates',
    key: '1'
  },
  {
    label: 'Impact Assessments',
    key: '2'
  }
];

  function getToyotaRegionDescription(id) {
    switch (id) {
      case 1:
        return 'Americas';
      case 2:
        return 'Europe';
      case 3:
        return 'SE Asia';
      case 4:
        return 'China';
      case 5:
        return 'Japan';
      default:
        return null;
    }
  }

  useEffect(() => {
    if (autoFocus) {
      setAutoFocus(false);
    }
  }, [timeStamp]);

  useEffect(() => {
    setLoadingAttachments(true);
    dispatch(
      getLegislationRecordAttachmentsRequest({
        legislationId,
        attachmentTab,
        searchText: userInput.current,
        pageSize: itemsPerPage,
        pageNumber: 1
      })
    );
  }, [attachmentTab]);

  useEffect(() => {
    setLoadingAttachments(true);
    dispatch(
      getLegislationRecordAttachmentsRequest({
        legislationId,
        attachmentTab,
        searchText: userInput.current,
        pageSize: itemsPerPage,
        pageNumber: 1
      })
    );
  }, [dispatch, legislationId, listRegulatoryUpdates]);

  const handlePagination = (page, size) => {
    setItemsPerPage(size)
    setLoadingAttachments(true);
    dispatch(
      getLegislationRecordAttachmentsRequest({
        legislationId,
        attachmentTab,
        searchText: userInput.current,
        pageSize: size,
        pageNumber: page
      })
    );
  };
  function handleUserSearchInput(value) {
    setLoadingAttachments(true);
    dispatch(
      getLegislationRecordAttachmentsRequest({
        legislationId,
        attachmentTab,
        searchText: value,
        pageSize: itemsPerPage,
        pageNumber: 1
      })
    );
    userInput.current = value;

    if (!autoFocus) {
      setAutoFocus(true);
    }
  }

  useEffect(() => {
    setListAttachments(legislationAttachments);
    setLoadingAttachments(false);
  }, [legislationAttachments]);

  async function handleAttachmentDownload(id: any) {
    const att = await downloadAttachment(id);
    window.open(att.data.message, '_blank', 'noopener,noreferrer');
  }

  return (
    <Container>
      <TitleContainer>
        <Title>Attachments</Title>
      </TitleContainer>
      <Tabs type="card" activeKey={attachmentTab.toString()} items={selectByTabs} onChange={(newActiveKey: string) => {
        setAttachmentTab(Number(newActiveKey));
        if (userInput.current) {
          userInput.current = '';
        }
        setItemsPerPage(10)
      }} />
      <AttachmentsContainer>
      <PaginationSearch
          onPaginationSearchChangeInput={handleUserSearchInput} 
          placeholder="Search in attachments..."
          defaultPaginationSearchText={userInput.current}
          autoFocus={autoFocus}
          isSearchBar
          current={paginationInfo?.CurrentPage}
          totalPage={paginationInfo?.TotalCount}
          pageSizeTotal={itemsPerPage}
          selectPageSize
          handleClick={handlePagination}
          handlePageChange={pageSize => {
            setItemsPerPage(pageSize);
          }}
          />
        {loadingAttachments ? (
            <ContainerTable>
              <TableList>
                <ContainerLoadingTable id="loading-attachment">
                  <ContainerSpin>
                    <Spin />
                  </ContainerSpin>
                </ContainerLoadingTable>
              </TableList>
            </ContainerTable>
            
        ) : listAttachments?.map((item: any) => {
          const isGroup = item?.groupId !== '0'
          return (
            <Attachment key={cuid()}>
              <DateAttachment>
                {Moment(item.createdAt).format(
                  process.env.REACT_APP_DATE_FORMAT
                )}
              </DateAttachment>
              <TitleAttachment>
                <DescAttachment>{item.description}</DescAttachment>
                <UserAttachment>
                  {item?.User?.firstName} {item?.User?.lastName}
                </UserAttachment>
              </TitleAttachment>
              {attachmentTab==2 && (item?.groupId || item?.substanceId)? <ContainerAttachmentRegulationRegion>
                <AttachmentRegulation>{isGroup ? 'Group' : 'Substance'}:</AttachmentRegulation>
                  <Link style={{ lineBreak: 'anywhere' }} href={
                      isGroup ? `/view-impact-assessment-group/${item.groupId}/${item.toyotaRegionId}`
                      : `/substance/${item.substanceId}`
                    }>
                    {isGroup ? item.group : item.substanceName}
                  </Link>
                  <AttachmentRegulation>Impacted Toyota Region:</AttachmentRegulation>
                  <SpanSentenceCase>{`${getToyotaRegionDescription(Number(item.toyotaRegionId)) || '---'}`}</SpanSentenceCase>
              </ContainerAttachmentRegulationRegion>
              : null
              }
              <Link
                flex
                onClick={() => {
                  handleAttachmentDownload(item.id);
                }}
              >
                {item.fileName.split('.').pop().toUpperCase() == 'JPG' ||
                  item.fileName.split('.').pop().toUpperCase() == 'PNG' ? (
                  <AiFillFileImage />
                ) : item.fileName.split('.').pop().toUpperCase() == 'PDF' ? (
                  <AiFillFilePdf />
                ) : item.fileName.split('.').pop().toUpperCase() == 'EML' ||
                  item.fileName.split('.').pop().toUpperCase() == 'MSG' ? (
                  <AiFillMail />
                ) : item.fileName.split('.').pop().toUpperCase() == 'TXT' ? (
                  <AiFillFileText />
                ) : item.fileName.split('.').pop().toUpperCase() == 'DOC' ||
                  item.fileName.split('.').pop().toUpperCase() == 'DOCX' ? (
                  <AiFillFileWord />
                ) : item.fileName.split('.').pop().toUpperCase() == 'XLS' ||
                  item.fileName.split('.').pop().toUpperCase() == 'XLX' ||
                  item.fileName.split('.').pop().toUpperCase() == 'XLSX' ? (
                  <AiFillFileExcel />
                ) : item.fileName.split('.').pop().toUpperCase() == 'PPT' ||
                  item.fileName.split('.').pop().toUpperCase() == 'PPTX' ||
                  item.fileName.split('.').pop().toUpperCase() == 'CSV' ? (
                  <AiFillFilePpt />
                ) : null}
                {item.fileName}
              </Link>
            </Attachment>
          );
        })}
        <PaginationSearch
          onPaginationSearchChangeInput={handleUserSearchInput} 
           placeholder="Search in attachments..."
          defaultPaginationSearchText={userInput.current}
          autoFocus={autoFocus}
          current={paginationInfo?.CurrentPage}
          totalPage={paginationInfo?.TotalCount}
          pageSizeTotal={itemsPerPage}
          selectPageSize
          handleClick={handlePagination}
          handlePageChange={pageSize => {
            setItemsPerPage(pageSize);
          }}
          />
      </AttachmentsContainer>
    </Container>
  );
};

export default Attachments;
