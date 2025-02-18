/* eslint-disable no-unused-expressions */
import React, { useEffect, useState, useRef } from 'react';
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
import Moment from 'moment';

import Input from '../../../../components/Input';
import Link from '../../../../components/Link';
import Pagination from '../../../../components/Pagination';
import Tabs from '../../../../components/Tabs';
import { downloadAttachment } from '../../../../services/api';
import {
  getSubstanceAttachmentsRequest,
  selectors
} from '../../../../store/modules/substances/actions';
import {
  Container,
  TitleContainer,
  Title,
  SearchContainer,
  Search,
  SearchIcon,
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
  AttachmentRegulation,
  SpanSentenceCase,
  SpanLinkSentenceCase,
  LinkSentenceCase,
  ContainerAttachmentRegulationRegion,
  AttachmentFile,
  Filename,
  ContainerLoadingSearch
} from './styled';
import PaginationSearch from '../../../../components/PaginationSearch';

interface ISubstanceAttachments {
  substanceId?: any;
  jurisdictions?: any;
  recordType?: any;
  timeStamp: number;
}

const SubstanceAttachments: React.FC<ISubstanceAttachments> = ({
  substanceId,
  jurisdictions,
  recordType,
  timeStamp
}) => {
  const [attachmentTab, setAttachmentTab] = useState(1);
  const userInput: any = useRef('');
  const [autoFocus, setAutoFocus] = useState(false);
  const substanceAttachments = useSelector(selectors.substanceAttachments);
  const [listAttachments, setListAttachments] = useState<any>([]);
  const [loadingAttachments, setLoadingAttachments] = useState(true);
  const [controlRun, setControlRun] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const paginationInfo = useSelector(
    selectors.substanceAttachmentPaginationInfo
  );
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
      case "1":
        return 'Americas';
      case "2":
        return 'Europe';
      case "3":
        return 'SE Asia';
      case "4":
        return 'China';
      case "5":
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
    setControlRun(1);
    if (recordType === 1) {
      dispatch(
        getSubstanceAttachmentsRequest(substanceId, jurisdictions, attachmentTab, '', 10, 1)
      );
    }
  }, [attachmentTab]);

  useEffect(() => {
    setLoadingAttachments(true);
    setControlRun(1);
    if (recordType === 1) {
      dispatch(
        getSubstanceAttachmentsRequest(substanceId, jurisdictions, attachmentTab, '', 10, 1)
      );
    }
  }, [substanceId, jurisdictions]);

  useEffect(() => {
    setListAttachments(substanceAttachments);
    setControlRun(controlRun + 1);
    if (controlRun == 1) {
      setLoadingAttachments(false);
    }
  }, [substanceAttachments]);

  const handleUserSearchInput = value => {
    setLoadingAttachments(true);
    setControlRun(1);
    if (recordType === 1) {
      dispatch(
        getSubstanceAttachmentsRequest(substanceId, jurisdictions, attachmentTab, value, itemsPerPage, 1)
      );
    }
    userInput.current = value;

    if (!autoFocus) {
      setAutoFocus(true);
    }
  };

  const handlePagination = (page, size) => {
    setLoadingAttachments(true);
    setItemsPerPage(size)
    setControlRun(1);
    if (recordType === 1) {
      dispatch(
        getSubstanceAttachmentsRequest(
          substanceId,
          jurisdictions,
          attachmentTab,
          userInput.current,
          size,
          page
        )
      );
    }
  };

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
        ) : listAttachments?.data?.message?.map((item: any) => {
          return (
            <Attachment>
              <DateAttachment>
                {Moment(item.createdAt).format(
                  process.env.REACT_APP_DATE_FORMAT
                )}
              </DateAttachment>
              <TitleAttachment>
                <DescAttachment>{item.description}</DescAttachment>
                <UserAttachment>
                  {item.User?.firstName} {item.User?.lastName}
                </UserAttachment>
              </TitleAttachment>
              {item.regulationId ? <ContainerAttachmentRegulationRegion>
                <AttachmentRegulation>{item?.recordType === 1 ? 'Regulation' : 'Legislation'}:</AttachmentRegulation>
                <Link style={{ lineBreak: 'anywhere' }} href={`/${item?.recordType === 1 ? 'regulation' : 'legislation'}/${item?.regulationId}`}>
                  {`${item.regulation || 'Click to view'}`}
                </Link>
                {(attachmentTab == 2) ? <AttachmentRegulation>Impacted Toyota Region:</AttachmentRegulation> : null}
                {(attachmentTab == 2) ? <SpanSentenceCase>{`${getToyotaRegionDescription(item.toyotaRegionId) || '---'}`}</SpanSentenceCase> : null}
              </ContainerAttachmentRegulationRegion>
                : null
              }
              <AttachmentFile
                onClick={() => {
                  handleAttachmentDownload(item.id);
                }}
              >
                {item.fileName.split('.').pop() == 'jpg' ||
                  item.fileName.split('.').pop() == 'png' ? (
                  <AiFillFileImage />
                ) : item.fileName.split('.').pop() == 'pdf' ? (
                  <AiFillFilePdf />
                ) : item.fileName.split('.').pop() == 'eml' ||
                  item.fileName.split('.').pop() == 'msg' ? (
                  <AiFillMail />
                ) : item.fileName.split('.').pop() == 'txt' ? (
                  <AiFillFileText />
                ) : item.fileName.split('.').pop() == 'doc' ||
                  item.fileName.split('.').pop() == 'docx' ? (
                  <AiFillFileWord />
                ) : item.fileName.split('.').pop() == 'xls' ||
                  item.fileName.split('.').pop() == 'xlx' ||
                  item.fileName.split('.').pop() == 'xlsx' ? (
                  <AiFillFileExcel />
                ) : item.fileName.split('.').pop() == 'ppt' ||
                  item.fileName.split('.').pop() == 'pptx' ||
                  item.fileName.split('.').pop() == 'csv' ? (
                  <AiFillFilePpt />
                ) : null}
                <Filename>{item.fileName}</Filename>
              </AttachmentFile>
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

export default SubstanceAttachments;
