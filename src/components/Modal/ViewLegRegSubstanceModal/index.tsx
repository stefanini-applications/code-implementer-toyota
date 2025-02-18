import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Button, Col, Row } from 'antd';
import { GrAttachment } from 'react-icons/gr';
import HTMLReactParser from 'html-react-parser';
import { useDispatch } from 'react-redux';
import PopupModal from '../PopupModal';
import { LabelConText, LabelText, TextContiner } from './styled';
import {
  downloadAttachment,
  getRegulatoryUpdateById
} from '../../../services/api';
import listToyotaJurisdictions from '../../../mocks/impact-tabs';
import ModalUpdate from '../ModalRegulatoryUpdates';
import Confirmation from '../Confirmation';
import { deleteRegulatoryUpdatesRecordRequest } from '../../../store/modules/regulatoryUpdates/actions';
import Button1 from '../../../components/Button';

interface VIEWLEGREGSUBSTANCEPROPS {
  open: any;
  handleCancel: () => void;
  selectedId: any;
  selectedSubstanceId?: any;
  deleteUpdate?: any;
}

const ViewLegRegSubstanceModal: React.FC<VIEWLEGREGSUBSTANCEPROPS> = ({
  open,
  handleCancel,
  selectedId,
  selectedSubstanceId,
  deleteUpdate
}) => {
  const [detailsData, setDetailsData] = useState<any>();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [viewModalWidth, setViewModalWidth] = useState(1400);
  const userRole = localStorage.getItem('user.role');
  useEffect(() => {
    let isMounted = true;
    if (selectedId) {
      const getRegulationUpdateData = async () => {
        const { data } = await getRegulatoryUpdateById(selectedId);
        console.log(data);
        setDetailsData(data?.message);
      };
      getRegulationUpdateData();
    }
    return () => {
      isMounted = false;
    };
  }, [selectedId]);

  async function handleAttachmentDownload(id: any) {
    const att = await downloadAttachment(id);
    window.open(att.data.message, '_blank', 'noopener,noreferrer');
  }

  return (
    <>
      <PopupModal
        open={open}
        handleCancel={handleCancel}
        title="Update Details"
        width={viewModalWidth}
        zIndex={viewModalWidth > 1000 ? 900 : -100}
      >
        {selectedSubstanceId > 0 && (
          <Row>
            <Col span={24}>
              <TextContiner>
                <LabelText>Substance Name:</LabelText>
                <LabelConText>
                  {(() => {
                    const substance = detailsData?.Substances?.find(
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

        <Row justify="space-between" style={{ marginTop: '20px' }}>
          <Col>
            <TextContiner>
              <LabelText>
                {detailsData?.Regulation?.recordType === 2
                  ? 'Legislation Name'
                  : 'Regulation Name'}
              </LabelText>
              <LabelConText>
                <Link
                  to={
                    detailsData?.Regulation?.recordType === 2
                      ? `/legislation/${detailsData?.Regulation?.id}`
                      : `/regulation/${detailsData?.Regulation?.id}`
                  }
                >
                  {detailsData?.Regulation.billTitle}
                </Link>
              </LabelConText>
            </TextContiner>
          </Col>

          <Col>
            <TextContiner>
              <LabelText>Nickname:</LabelText>
              <LabelConText>{detailsData?.Regulation?.nickname}</LabelConText>
            </TextContiner>
          </Col>

          <Col>
            <TextContiner>
              <LabelText>Jurisdiction:</LabelText>
              <LabelConText>
                {(() => {
                  const juric = listToyotaJurisdictions.find(
                    item =>
                      item.id ===
                      Number(detailsData?.Regulation?.jurisdictionId)
                  );
                  return juric && juric.description;
                })()}
              </LabelConText>
            </TextContiner>
          </Col>

          <Col>
            <TextContiner>
              <LabelText>
                {detailsData?.Regulation?.recordType === 2
                  ? 'Sub-Jurisdiction:'
                  : 'Regulatory Body:'}
              </LabelText>
              <LabelConText>
                {detailsData?.Regulation?.Agency?.description}
              </LabelConText>
            </TextContiner>
          </Col>

          {detailsData?.Regulation?.recordType === 2 && (
            <Col>
              <TextContiner>
                <LabelText>Year:</LabelText>
                <LabelConText>{detailsData?.Regulation?.year}</LabelConText>
              </TextContiner>
            </Col>
          )}
        </Row>

        <Row style={{ marginTop: '15px' }}>
          <Col span={6}>
            <TextContiner>
              <LabelText>Announcement Date:</LabelText>
              <LabelConText>
                {moment(detailsData?.agencyDate).format(
                  process.env.REACT_APP_DATE_FORMAT
                )}
              </LabelConText>
            </TextContiner>
          </Col>
          <Col span={3}>
            <TextContiner>
              <LabelText>Due Date:</LabelText>
              <LabelConText>
                {detailsData?.agencyDueDate ? (
                  moment(detailsData?.agencyDueDate).format(
                    process.env.REACT_APP_DATE_FORMAT
                  )
                ) : (
                  <>--/--/----</>
                )}
              </LabelConText>
            </TextContiner>
          </Col>

          <Col span={4}>
            <TextContiner>
              <LabelText>Last Modified:</LabelText>
              <LabelConText>
                {moment(detailsData?.updatedAt).format(
                  process.env.REACT_APP_DATE_FORMAT
                )}
              </LabelConText>
            </TextContiner>
          </Col>

          <Col span={4}>
            <TextContiner>
              <LabelText>By:</LabelText>
              <LabelConText>
                {detailsData?.User?.firstName} {detailsData?.User?.lastName}
              </LabelConText>
            </TextContiner>
          </Col>
        </Row>

        <Row style={{ marginTop: '15px' }}>
          <Col span={24}>
            <LabelText>Update</LabelText>
          </Col>
          <Col>
            <LabelConText style={{ marginTop: '10px' }}>
              {detailsData?.comment && (
                <>{HTMLReactParser(detailsData?.comment)}</>
              )}
            </LabelConText>
          </Col>
        </Row>

        {detailsData?.RegulationGroups?.length > 0 && (
          <Row style={{ marginTop: '15px' }}>
            <Col span={24}>
              {' '}
              <LabelText>Related Groups</LabelText>{' '}
            </Col>
            {detailsData?.RegulationGroups.map(data => (
              <Col style={{ paddingRight: '4px' }} key={data?.id}>
                {data?.name},
              </Col>
            ))}
          </Row>
        )}

        {detailsData?.Substances?.length > 0 && (
          <Row style={{ marginTop: '15px' }}>
            <Col span={24}>
              {' '}
              <LabelText>Related Substances</LabelText>
            </Col>
            {detailsData.Substances.map(
              data =>
                data.type === 'Substance' && (
                  <Col key={data.id} style={{ paddingRight: '4px' }}>
                    <Link to={`substance/${data.id}`}>{data.name},</Link>
                  </Col>
                )
            )}
          </Row>
        )}

        {detailsData?.Attachments?.length > 0 && (
          <>
            <Row style={{ marginTop: '15px' }}>
              <Col span={24}>
                {' '}
                <LabelText>Attachments</LabelText>
              </Col>
            </Row>

            {detailsData?.Attachments?.map(item => (
              <Row key={item?.id} style={{ marginTop: '10px' }}>
                <Col style={{ paddingRight: '8px' }}>
                  {moment(item?.createdAt).format(
                    process.env.REACT_APP_DATE_FORMAT
                  )}
                </Col>
                <Col style={{ paddingRight: '8px' }}>
                  {item?.description && <GrAttachment />}
                  <span style={{ paddingLeft: '4px' }}>
                    {item?.description}
                  </span>
                </Col>
                <Col style={{ display: 'flex', alignItems: 'center' }}>
                  {item?.fileName && <GrAttachment />}
                  <div
                    style={{
                      paddingLeft: '4px',
                      color: '#1677ff',
                      textDecoration: 'underline',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      handleAttachmentDownload(item?.id);
                    }}
                  >
                    {item?.fileName}
                  </div>
                </Col>
              </Row>
            ))}
          </>
        )}
        { userRole == null || userRole == 'Read-only' ? null :
        <Row justify="end">
          <Col>
            <Button
              type="default"
              style={{ marginRight: '10px' }}
              onClick={() => {
                setOpenEditModal(true);
                setViewModalWidth(100);
              }}
            >
              Edit Update
            </Button>
            { userRole == null || userRole == 'Normal User' ? null :
            <Button
              type="default"
              danger
              onClick={() => deleteUpdate(detailsData?.id)}
            >
              Delete Update
            </Button>
            }
          </Col>
        </Row>  
        } 
      </PopupModal>

      {openEditModal && (
        <ModalUpdate
          open={openEditModal}
          close={() => {
            setOpenEditModal(false);
            handleCancel();
          }}
          modalTitle="Edit Update"
          regulation={detailsData?.Regulation?.id}
          editData={detailsData}
          timeStamp={new Date().getTime()}
          location="HOME"
          selectedSubstanceId={selectedSubstanceId}
        />
      )}
    </>
  );
};

export default ViewLegRegSubstanceModal;
