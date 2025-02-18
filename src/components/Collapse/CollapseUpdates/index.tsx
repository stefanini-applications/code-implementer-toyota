/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Collapse, Spin, Tooltip } from 'antd';
import cuid from 'cuid';
import Moment from 'moment';

import { downloadAttachment } from '../../../services/api';
import { deleteRegulatoryUpdatesRecordRequest } from '../../../store/modules/regulatoryUpdates/actions';
import ckEditorPlugins from '../../../utils/ckEditorPluginsReadOnly';
import loadUserDataOnStorage from '../../../utils/userData';
import Button from '../../Button';
import Link from '../../Link';
import Confirmation from '../../Modal/Confirmation';
import {
  Bold,
  Container,
  ContainerItemsUpdate,
  TitleUpdateContainer,
  DateUpdate,
  RelatedSubstancesContainer,
  TitleUpdateSeparator,
  ContainerSubstancesUpdate,
  UlSubstances,
  RelatedAttachmentsContainer,
  ContainerAttachmentsUpdate,
  Attachment,
  DescriptionAttachment,
  AttachmentIco,
  TextDescriptionAttachment,
  ContainerDescriptionAttachment,
  EntireCollapsibleName,
  MetaDataAttachment,
  UsernameAttachment,
  DataAttachment,
  ContainerItems,
  ContainerButton,
  ButtonsEditContainer,
  CkContainer,
  ContainerItemsLeft,
  ContainerPanel,
  ContainerDate,
  UpdateContainer,
  ContainerButtonsDetails,
  ContainerLoading
} from './styled';

interface ICollapse {
  data?: any;
  onEditClick?: any;
  regulationId?: any;
  fromSubPage?: boolean;
  loading?: boolean;
}

const { Panel } = Collapse;

const CollapseComponent: React.FC<ICollapse> = ({
  data,
  onEditClick,
  regulationId,
  fromSubPage,
  loading
}) => {
  const [open, setOpen] = React.useState(false);
  const [updateToDelete, setUpdateToDelete] = React.useState(0);
  const dispatch = useDispatch();
  const userRole = localStorage.getItem('user.role');
  const onChange = (key: string | string[]) => {
    if (Array.isArray(key)) {
      key.forEach(element => {
        const tooltip = document.getElementById(
          element.replace('panel-collapse-', '')
        );
        if (tooltip && tooltip.style) {
          tooltip!.style.display = 'none';
        }
      });
    }
  };

  const removeTags = (tag: any) => {
    const ele = document.createElement('div');
    ele.innerHTML = tag;
    return ele.textContent;
  };

  useEffect(() => {
    data?.forEach((element: any) => {
      element.open = false;
    });
  }, [data]);

  async function handleAttachmentDownload(id: any) {
    const att = await downloadAttachment(id);
    window.open(att.data.message, '_blank', 'noopener,noreferrer');
  }

  useEffect(() => {
    loadUserDataOnStorage();
  }, []);

  const handleClose = action => {
    if (action === 'yes') {
      dispatch(
        deleteRegulatoryUpdatesRecordRequest({
          id: updateToDelete,
          regulationId
        })
      );
    }
    setOpen(false);
  };
  const fakeItems: any = {}; // do not remove
  return (
    <Container>
      {loading && (
        <ContainerLoading>
          <Spin />
        </ContainerLoading>
      )}

      <Collapse onChange={onChange} items={fakeItems}>
        {data?.map((item: any) => {
          const commentWithoutTag = removeTags(item?.comment);
          const panel = document.getElementById(`panel-collapse-${item?.id}`);
          const panelHeader = panel?.children[0];
          const tooltip = document.getElementById(item?.id);

          panelHeader?.addEventListener('mouseenter', () => {
            tooltip!.style.opacity = '1';
            tooltip!.style.visibility = 'visible';
            tooltip!.style.transform = 'scale(1)';
          });

          panelHeader?.addEventListener('mouseleave', () => {
            tooltip!.style.opacity = '0';
            tooltip!.style.visibility = 'hidden';
            tooltip!.style.transform = 'scale(0.2)';
          });
          return (
            <>
              <ContainerPanel>
                <EntireCollapsibleName id={item?.id}>
                  {commentWithoutTag}
                </EntireCollapsibleName>
              </ContainerPanel>
              <ContainerDate>
                <DateUpdate>
                  {Moment(item?.updatedAt).format(
                    process.env.REACT_APP_DATE_FORMAT
                  )}
                </DateUpdate>
              </ContainerDate>
              <Panel
                header={commentWithoutTag}
                key={`panel-collapse-${item.id}`}
                id={`panel-collapse-${item.id}`}
              >
                <ContainerItems>
                  <ContainerButtonsDetails>
                    <ContainerItemsLeft>
                      <ContainerItemsUpdate>
                        <Bold>
                          {item?.Regulation.recordType === 1
                            ? 'Regulation'
                            : 'Legislation'}
                          :{' '}
                        </Bold>
                        <Link
                          style={{ lineBreak: 'anywhere' }}
                          href={`/${
                            item?.Regulation.recordType === 1
                              ? 'regulation'
                              : 'legislation'
                          }/${item?.Regulation.id}`}
                        >
                          {item?.Regulation.nickname
                            ? item.Regulation.nickname
                            : item.Regulation.billTitle}
                        </Link>
                      </ContainerItemsUpdate>
                      <ContainerItemsUpdate>
                        <Bold>Announcement Date: </Bold>
                        <p>
                          {item.agencyDate
                            ? item.agencyDate &&
                              Moment(item.agencyDate).format(
                                process.env.REACT_APP_DATE_FORMAT
                              )
                            : '--/--/----'}
                        </p>
                      </ContainerItemsUpdate>
                      <ContainerItemsUpdate>
                        <Bold>Due Date: </Bold>
                        <p>
                          {item.agencyDueDate
                            ? item.agencyDueDate &&
                              Moment(item.agencyDueDate).format(
                                process.env.REACT_APP_DATE_FORMAT
                              )
                            : '--/--/----'}
                        </p>
                      </ContainerItemsUpdate>
                      <ContainerItemsUpdate>
                        <Bold>Last Modified: </Bold>
                        <p>
                          {Moment(item?.updatedAt).format(
                            process.env.REACT_APP_DATE_FORMAT
                          )}
                        </p>{' '}
                        <Bold>by </Bold>
                        <p>
                          {item?.User
                            ? `${item?.User?.firstName} ${item?.User?.lastName}`
                            : '---- ----'}
                        </p>
                      </ContainerItemsUpdate>
                    </ContainerItemsLeft>
                    {fromSubPage ||
                    userRole == null ||
                    userRole == 'Read-only' ? null : (
                      <ButtonsEditContainer>
                        <ContainerButton>
                          <Button
                            toolTip={
                              userRole == null || userRole == 'Read-only'
                                ? 'User role not authorized to open: Read-only'
                                : undefined
                            }
                            isDisabled={
                              userRole == null || userRole == 'Read-only'
                            }
                            text="Edit Update"
                            onClick={() => onEditClick(item)}
                          />
                        </ContainerButton>

                        <ContainerButton>
                          { userRole === 'Admin' && (
                          <Button
                            danger
                            text="Delete Update"
                            onClick={() => {
                              setUpdateToDelete(item.id);
                              setOpen(true);
                            }}
                          />
                        )}
                          <Confirmation
                            open={open}
                            setOpen={setOpen}
                            titleModal="Delete Update"
                            bodyText="Are you sure you want to delete this update?"
                            onClose={handleClose}
                            okText="Delete Update"
                            cancelText="Cancel"
                          />
                        </ContainerButton>
                      </ButtonsEditContainer>
                    )}
                  </ContainerButtonsDetails>
                  <TitleUpdateContainer>
                    <UpdateContainer>
                      <Bold>Update</Bold>
                      <CkContainer>
                        <CKEditor
                          // name="comment"
                          editor={ClassicEditor}
                          config={{
                            removePlugins: ckEditorPlugins
                          }}
                          data={item?.comment}
                          disabled
                        />
                      </CkContainer>
                    </UpdateContainer>
                  </TitleUpdateContainer>
                  {item?.RegulationGroups?.length > 0 && (
                    <RelatedSubstancesContainer>
                      <TitleUpdateSeparator>
                        Related Groups
                      </TitleUpdateSeparator>

                      <ContainerSubstancesUpdate>
                        <UlSubstances>
                          {item?.RegulationGroups?.map((value: any) => {
                            return (
                              <Tooltip key={cuid()} title={value?.name}>
                                <li >
                                  {value?.name.length > 30
                                    ? `${value?.name.substring(0, 30)}...`
                                    : value?.name}
                                </li>
                              </Tooltip>
                            );
                          })}
                        </UlSubstances>
                      </ContainerSubstancesUpdate>
                    </RelatedSubstancesContainer>
                  )}
                  {item?.Substances.filter(x => x.type === 'Substance').length >
                    0 && (
                    <RelatedSubstancesContainer>
                      <TitleUpdateSeparator>
                        Related Substances
                      </TitleUpdateSeparator>

                      <ContainerSubstancesUpdate>
                        <UlSubstances>
                          {item?.Substances?.filter(
                            x => x.type === 'Substance'
                          ).map((value: any) => {
                            const url = `/substance/${value?.id}`;

                            return (
                              <Tooltip key={cuid()}  title={value?.name}>
                                <li >
                                  <a href={url}>
                                    {value?.name.length > 30
                                      ? `${value?.name.substring(0, 30)}...`
                                      : value?.name}
                                  </a>
                                </li>
                              </Tooltip>
                            );
                          })}
                        </UlSubstances>
                      </ContainerSubstancesUpdate>
                    </RelatedSubstancesContainer>
                  )}

                  <RelatedAttachmentsContainer>
                    {item?.Attachments.length > 0 && (
                      <TitleUpdateSeparator>Attachments</TitleUpdateSeparator>
                    )}
                    <ContainerAttachmentsUpdate>
                      {item?.Attachments?.map((value: any) => {
                        return (
                          <Attachment key={cuid()}>
                            <MetaDataAttachment>
                              <UsernameAttachment>
                                {value?.User?.firstName} {value?.User?.lastName}
                              </UsernameAttachment>
                              <DataAttachment>
                                {Moment(value?.createdAt).format(
                                  process.env.REACT_APP_DATE_FORMAT
                                )}
                              </DataAttachment>
                            </MetaDataAttachment>

                            <DescriptionAttachment key={cuid()}>
                              <AttachmentIco />
                              {value?.description ? (
                                <ContainerDescriptionAttachment>
                                  <Tooltip title={value?.description}>
                                    <TextDescriptionAttachment
                                      maxWidth={
                                        value?.description.length >= 55
                                          ? '55ch'
                                          : (value?.description.length + 1)
                                              .toString()
                                              .concat('ch')
                                      }
                                    >
                                      {value?.description}
                                    </TextDescriptionAttachment>
                                  </Tooltip>
                                </ContainerDescriptionAttachment>
                              ) : null}

                              <ContainerDescriptionAttachment key={cuid()}>
                                <Tooltip title={value?.fileName}>
                                  <Link
                                    onClick={() => {
                                      handleAttachmentDownload(value?.id);
                                    }}
                                  >
                                    {value?.fileName}
                                  </Link>
                                </Tooltip>
                              </ContainerDescriptionAttachment>
                            </DescriptionAttachment>
                          </Attachment>
                        );
                      })}
                    </ContainerAttachmentsUpdate>
                  </RelatedAttachmentsContainer>
                </ContainerItems>
              </Panel>
            </>
          );
        })}
      </Collapse>
    </Container>
  );
};

export default CollapseComponent;
