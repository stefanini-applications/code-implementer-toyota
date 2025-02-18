/* eslint-disable no-unused-expressions */
import React, { useEffect, useState, useRef } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import Moment from 'moment';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { translate } from '../../../locales';
import { uploadAttachment } from '../../../services/api';
import {
  getUpdatesRelatedSubstanceRequest,
  selectors as dropdownSelectors
} from '../../../store/modules/dropdownValues/actions';
import {
  createRegulatoryUpdatesRecordRequest,
  editRegulatoryUpdatesRecordRequest,
  attachmentModalRegulatoryUpdatesFailure
} from '../../../store/modules/regulatoryUpdates/actions';
import Button from '../../Button';
import CkEditor from '../../CkEditor';
import DatePicker from '../../DatePicker';
import Input from '../../Input';
import Transfer from '../../Transfer';
import listToyotaJurisdictions from '../../../mocks/impact-tabs';
import {
  Container,
  ContainerSuccess,
  SuccessModal,
  UpdateModal,
  ContentToggle,
  ContainerModalItems,
  ContainerToggles,
  ContainerSave,
  ToggleItem,
  TitleModal,
  XIcon,
  TitleToggle,
  ContainerDates,
  DateColumnWrapper,
  RowWrapper,
  DateLabel,
  AttachmentsInputContainer,
  AttachmentsInput,
  AttachmentsButton,
  AttachmentsLabel,
  AttachmentsWrapperContainer,
  Touchable,
  RemoveAttachment,
  Overlay,
  Wrapper,
  Warning,
  AlertText,
  AddAttachment,
  BtnAddAttachment,
  ContainerDatePicker,
  ContainerFilesUploaded,
  ContainerRemoveAttachments,
  AttachmentName,
  TextContiner,
  LabelText,
  LabelConText
} from './styled';
import { ToastError } from '../../Toast';
import { createUserErrorLogRequest } from '../../../store/modules/userErrorLog/actions';

interface IModalUpdate {
  open?: boolean;
  close?: any;
  modalTitle: any;
  editData?: any;
  regulation: any;
  timeStamp: number;
  location?: string;
  selectedSubstanceId?: any;
}

const ModalUpdate: React.FC<IModalUpdate> = ({
  open,
  close,
  modalTitle,
  editData,
  regulation,
  timeStamp,
  location,
  selectedSubstanceId
}) => {
  const [test, setTest] = useState<any>(false);
  const [filesShow, setFilesShow] = useState<any>([]);
  const [countFiles, setcountFiles] = useState(1);
  const showFileUploadRef = useRef<any>([true]);
  const [emptyComment, setEmptyComment] = useState(false);
  const [emptyAnnouncementDate, setEmptyAnnouncementDate] = useState(false);
  const [attDescription, setAttDescription] = useState<any>([]);
  const [openDueDate, setOpenDueDate] = useState(false);
  const [openAnnouncementDate, setOpenAnnouncementDate] = useState(false);
  const [announcementDate, setAnnouncementDate] = useState(undefined);
  const [dueDate, setDueDate] = useState(undefined);
  const [comment, setComment] = useState(undefined);

  const extnData = process.env.REACT_APP_ATT_EXT_ALLOWED || '';
  // eslint-disable-next-line no-useless-escape
  const extn = extnData.replace(/[\[\]']/g, '');
  const trimedExtn = extn.split(',').map(item => item.trim());
  const extentionAllowed = trimedExtn.join(', ');

  const filesRef = useRef<any>([]);
  const listSubstances: any = useSelector(
    dropdownSelectors.dropDownUpdatesRelatedSubstance
  );
  const dispatch = useDispatch();
  const [selectedSubstances, setSelectedSubstances] = useState<any>(
    editData?.Substances
  );

  useEffect(() => {
    dispatch(getUpdatesRelatedSubstanceRequest(regulation));
  }, [regulation]);

  useEffect(() => {
    setOpenAnnouncementDate(false);
    setOpenDueDate(false);
  }, [timeStamp]);

  useEffect(() => {
    setAnnouncementDate(editData?.agencyDate);
    setDueDate(editData?.agencyDueDate);
    setComment(editData?.comment);
    setTest(false);
    setEmptyComment(false);
    setEmptyAnnouncementDate(false);
  }, [editData]);

  useEffect(() => {
    if (open) {
      document.body.classList.add('hide-overflow');
    }
  }, [open]);

  useEffect(() => {
    if (editData) {
      setcountFiles(editData.Attachments.length);
      showFileUploadRef.current = [true];
      if (editData.Attachments.length > 0) {
        for (let index = 0; index < editData.Attachments.length; index++) {
          filesRef.current.push([
            {
              id: editData.Attachments[index].id,
              name: editData.Attachments[index].fileName,
              uploaded: true,
              uuid: editData.Attachments[index].fileUuid
            }
          ]);
          attDescription.push(editData.Attachments[index].description);
          if (index > 0) {
            showFileUploadRef.current.push(false);
          } else {
            showFileUploadRef.current[0] = false;
          }
        }
        setFilesShow(filesRef.current);
      } else {
        setcountFiles(1);
      }
    }
  }, [editData]);

  function handleClearUpModalInfo() {
    setcountFiles(1);
    showFileUploadRef.current.push([true]);
    filesRef.current = [];
    setFilesShow(filesRef.current);
    setAttDescription([]);
    setComment(undefined);
    setEmptyComment(false);
    setEmptyAnnouncementDate(false);
  }

  const handleChooseFile = (e: any, i: any) => {
    const extension = e?.target?.files[0]?.name?.split('.').pop();
    const extAllowed: any = process.env.REACT_APP_ATT_EXT_ALLOWED;
    if (!extAllowed?.includes(extension?.toUpperCase())) {
      dispatch(attachmentModalRegulatoryUpdatesFailure());
      dispatch(
        createUserErrorLogRequest({
          error: `Unsupported file type: Please try again with a file with the following extensions - ${extentionAllowed}`,
          page: 'AddEditRegulatoryUpdates'
        })
      );
      ToastError(
        `Unsupported file type: Please try again with a file with the following extensions - ${extentionAllowed}`
      );
    } else {
      filesRef.current = [...filesRef.current, Array.from(e.target.files)];
      setFilesShow(filesRef.current);
      showFileUploadRef.current[i] = false;
    }
  };

  const onAddAttDescription = (value: any, i: any) => {
    attDescription[i] = value;
  };

  const handleRemoveFile = (i: any) => {
    if (i === 0 && countFiles == 1) {
      showFileUploadRef.current[0] = true;
      filesRef.current = [];
      setFilesShow(filesRef.current);
      setAttDescription([]);
    } else {
      showFileUploadRef.current.splice(i, 1);
      filesRef.current.splice(i, 1);
      attDescription.splice(i, 1);
      setFilesShow(filesRef.current);
      setcountFiles(countFiles - 1);
    }
  };

  const handleAddMoreFiles = () => {
    attDescription.push('');
    showFileUploadRef.current.push(true);
    setcountFiles(countFiles + 1);
  };

  async function handleCreateNewUpdate() {
    if (comment && announcementDate) {
      const uploadResult = await uploadAttachment(
        filesRef.current,
        attDescription
      );
      const update = {
        id: editData ? Number(editData.id) : null,
        regulationId: Number(regulation),
        comment,
        agencyDate: announcementDate
          ? Moment.utc(Moment(announcementDate).utc()).format()
          : null,
        agencyDueDate: dueDate
          ? Moment.utc(Moment(dueDate).utc()).format()
          : null,
        toyotaDueDate: dueDate
          ? Moment.utc(Moment(dueDate).utc()).format()
          : null,
        active: 1,
        attachments: uploadResult,
        substances: listSubstances.filter(
          x => selectedSubstances?.map(sub => sub.key).indexOf(x.key) >= 0
        )
      };
      if (editData) {
        dispatch(editRegulatoryUpdatesRecordRequest(update));
      } else {
        dispatch(createRegulatoryUpdatesRecordRequest(update));
      }
      handleClearUpModalInfo();
      close();
      document.body.classList.remove('hide-overflow');
    } else if (!comment) {
      setEmptyComment(true);
    }
    if (!announcementDate) {
      setEmptyAnnouncementDate(true);
    }
  }

  return open ? (
    <Container>
      <ContainerSuccess>
        <SuccessModal>
          <div className="div-container-success">
            <div className="div-icon-success">
              <FaCheckCircle />
            </div>
            <div className="div-container-text-success">
              <div className="div-text-title-success">
                <p>{translate('header.success')}</p>
              </div>
              <div className="div-text-desc-success">
                <p>{translate('header.updateSuccess')}</p>
              </div>
            </div>
          </div>
        </SuccessModal>
      </ContainerSuccess>
      <UpdateModal>
        <ContainerModalItems>
          <TitleModal>
            <p>{modalTitle}</p>
            <XIcon
              onClick={() => {
                handleClearUpModalInfo();
                close();
                document.body.classList.remove('hide-overflow');
              }}
            />
          </TitleModal>

          <ContainerToggles
            onScroll={() => {
              setOpenAnnouncementDate(false);
              setOpenDueDate(false);
            }}
          >
            {location && location === 'HOME' && selectedSubstanceId > 0 && (
              <Row style={{ padding: '0px 0px 0px 35px' }}>
                <Col span={24}>
                  <TextContiner>
                    <LabelText>Substance Name:</LabelText>
                    <LabelConText>
                      {(() => {
                        const substance = editData?.Substances?.find(
                          item => item.id === selectedSubstanceId
                        );
                        if (!substance) return null;
                        return (
                          <Link to={`substance/${selectedSubstanceId}`}>
                            {substance.casNumber}
                            <span
                              style={{
                                width: '4px',
                                height: '4px',
                                marginLeft: '4px',
                                marginRight: '4px',
                                backgroundColor: '#1677ff',
                                borderRadius: '100%',
                                display: 'inline-flex'
                              }}
                            />
                            {substance.commonName}
                          </Link>
                        );
                      })()}
                    </LabelConText>
                  </TextContiner>
                </Col>
              </Row>
            )}

            {location && location === 'HOME' && (
              <Row
                justify="start"
                style={{ padding: '0px 0px 0px 35px', marginTop: '10px' }}
              >
                <Col span={12}>
                  <TextContiner>
                    <LabelText>
                      {editData?.Regulation?.recordType === 2
                        ? 'Legislation Name'
                        : 'Regulation Name'}
                    </LabelText>
                    <LabelConText>
                      <Link
                        to={
                          editData?.Regulation?.recordType === 2
                            ? `/legislation/${editData?.Regulation?.id}`
                            : `/regulation/${editData?.Regulation?.id}`
                        }
                      >
                        {editData?.Regulation.billTitle}
                      </Link>
                    </LabelConText>
                  </TextContiner>
                </Col>

                <Col span={8}>
                  <TextContiner>
                    <LabelText>Nickname:</LabelText>
                    <LabelConText>
                      {editData?.Regulation?.nickname}
                    </LabelConText>
                  </TextContiner>
                </Col>

                <Col span={4}>
                  <TextContiner>
                    <LabelText>Jurisdiction:</LabelText>
                    <LabelConText>
                      {(() => {
                        const juric = listToyotaJurisdictions.find(
                          item =>
                            item.id ===
                            Number(editData?.Regulation?.jurisdictionId)
                        );
                        return juric && juric.description;
                      })()}
                    </LabelConText>
                  </TextContiner>
                </Col>

                <Col span={4} style={{ marginTop: '15px' }}>
                  <TextContiner>
                    <LabelText>
                      {editData?.Regulation?.recordType === 2
                        ? 'Sub-Jurisdiction:'
                        : 'Regulatory Body:'}
                    </LabelText>
                    <LabelConText>
                      {editData?.Regulation?.Agency?.description}
                    </LabelConText>
                  </TextContiner>
                </Col>

                {editData?.Regulation?.recordType === 2 && (
                  <Col span={4} style={{ marginTop: '15px' }}>
                    <TextContiner>
                      <LabelText>Year:</LabelText>
                      <LabelConText>{editData?.Regulation?.year}</LabelConText>
                    </TextContiner>
                  </Col>
                )}
              </Row>
            )}

            <ToggleItem>
              <TitleToggle>
                <p>{translate('header.dates')}</p>
              </TitleToggle>

              <ContentToggle>
                <ContainerDates>
                  <RowWrapper>
                    <DateColumnWrapper>
                      <DateLabel>{translate('header.announcement')}</DateLabel>
                      <ContainerDatePicker>
                        <DatePicker
                          format={process.env.REACT_APP_DATE_FORMAT}
                          value={
                            editData
                              ? announcementDate
                                ? Moment(announcementDate).toDate()
                                : undefined
                              : undefined
                          }
                          onChange={e => {
                            setAnnouncementDate(e);
                            if (e !== '') {
                              setEmptyAnnouncementDate(false);
                            }
                          }}
                          openCalendar={openAnnouncementDate}
                          onSetOpenCalendar={openCal =>
                            setOpenAnnouncementDate(openCal)
                          }
                        />
                        {emptyAnnouncementDate ? (
                          <Wrapper>
                            <AlertText>
                              {translate('pages.regulatoryUpdates.toastEmpty')}
                            </AlertText>
                          </Wrapper>
                        ) : null}
                      </ContainerDatePicker>
                    </DateColumnWrapper>
                    <DateColumnWrapper>
                      <DateLabel>{translate('header.dueDate')}</DateLabel>
                      <ContainerDatePicker>
                        <DatePicker
                          format={process.env.REACT_APP_DATE_FORMAT}
                          value={
                            editData
                              ? dueDate
                                ? Moment(dueDate).toDate()
                                : undefined
                              : undefined
                          }
                          onChange={e => {
                            setDueDate(e);
                          }}
                          openCalendar={openDueDate}
                          onSetOpenCalendar={openCal => setOpenDueDate(openCal)}
                        />
                      </ContainerDatePicker>
                    </DateColumnWrapper>
                  </RowWrapper>
                </ContainerDates>
              </ContentToggle>
            </ToggleItem>
            <ToggleItem>
              <TitleToggle>
                <p>{translate('header.description')}</p>
              </TitleToggle>
              <ContentToggle>
                <CkEditor
                  id="comment"
                  name="comment"
                  data={editData ? editData.comment : ''}
                  onChange={(event: any, editor: any) => {
                    setComment(editor.getData());
                    if (editor.getData() !== '') {
                      setEmptyComment(false);
                    }
                  }}
                  isReadOnly={false}
                  overFlowHide={false}
                  onClickNotify={undefined}
                />
                {emptyComment ? (
                  <Wrapper>
                    <AlertText>
                      {translate('pages.regulatoryUpdates.toastEmpty')}
                    </AlertText>
                  </Wrapper>
                ) : null}
              </ContentToggle>
            </ToggleItem>

            <ToggleItem>
              <TitleToggle>
                <p>Substances / Groups</p>
              </TitleToggle>
              <ContentToggle>
                <Transfer
                  data={listSubstances}
                  defaultOptions={selectedSubstances}
                  fieldKey="key"
                  showSearch
                  filterOption={(inputValue, option) =>
                    option.name
                      .toLowerCase()
                      .indexOf(inputValue.toLowerCase()) > -1
                  }
                  onTransferChange={selectedValue => {
                    setSelectedSubstances(
                      listSubstances.filter(
                        x => selectedValue?.indexOf(x.key) >= 0
                      )
                    );
                  }}
                />
              </ContentToggle>
            </ToggleItem>

            <ToggleItem id="item-attachments">
              <TitleToggle>
                <p>{translate('header.attachments')}</p>
              </TitleToggle>
              <ContainerFilesUploaded>
                {[...Array(countFiles)].map((item, i) => (
                  <ContentToggle>
                    {showFileUploadRef.current[i] && (
                      <AttachmentsWrapperContainer>
                        <Button
                          toolTip={`Supported file types: ${extentionAllowed}`}
                          upload
                          id="select-file"
                          type="primary"
                          name="file"
                          text="Upload File"
                          onChange={(e: any) => handleChooseFile(e, i)}
                        />
                      </AttachmentsWrapperContainer>
                    )}
                    {!showFileUploadRef.current[i] && (
                      <AttachmentsWrapperContainer>
                        <AttachmentName>
                          {filesRef.current[i]?.[0].name}
                        </AttachmentName>
                        <Button
                          danger
                          onClick={() => handleRemoveFile(i)}
                          text="Remove attachment"
                        />
                      </AttachmentsWrapperContainer>
                    )}
                    <AttachmentsInputContainer>
                      <Input
                        type="text"
                        defaultText={attDescription ? attDescription[i] : ''}
                        maxLength={254}
                        onBlurInput={value => {
                          onAddAttDescription(value, i);
                        }}
                        placeholder="Input the description of the attachment here."
                      />
                    </AttachmentsInputContainer>
                    {!showFileUploadRef.current[i] && countFiles == i + 1 && (
                      <AddAttachment>
                        <Button
                          text={translate(
                            'components.buttons.addAttachmentButton'
                          )}
                          onClick={handleAddMoreFiles}
                        />
                      </AddAttachment>
                    )}
                  </ContentToggle>
                ))}
              </ContainerFilesUploaded>
            </ToggleItem>
          </ContainerToggles>
          <ContainerSave>
            <Button
              onClick={() => {
                handleClearUpModalInfo();
                close();
                document.body.classList.remove('hide-overflow');
              }}
              text={translate('components.buttons.cancelButton')}
            />
            <Button
              type="primary"
              text={translate('components.buttons.saveButton')}
              onClick={() => handleCreateNewUpdate()}
            />
          </ContainerSave>
        </ContainerModalItems>
      </UpdateModal>
      <Overlay />
    </Container>
  ) : null;
};

export default ModalUpdate;
