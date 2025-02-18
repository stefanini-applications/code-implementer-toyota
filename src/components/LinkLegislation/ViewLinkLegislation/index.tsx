import React from 'react';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import PopupModal from '../../Modal/PopupModal';
import { Label, PhaseCircle } from './styled';

const ViewLinkLegislation = ({
  open,
  handleCancel,
  legislationId,
  legislationName,
  jurisdiction,
  phase,
  nickName,
  subJurisdiction,
  status,
  summary,
  recordType
}) => {
  return (
    <>
      {legislationId ? (
        <PopupModal
          open={open}
          handleCancel={handleCancel}
          title={
            recordType === 2 ? 'Legislation Details' : 'Regulation Details'
          }
        >
          <Row style={{ marginTop: '20px' }}>
            <Col span={16}>
              <Label>
              {recordType === 2 ? 'Legislation Name' : 'Regulation Name'}
              </Label>
              <div>{legislationName}</div>
            </Col>

            <Col span={4}>
              <Label>Jurisdiction</Label>
              <div>{jurisdiction}</div>
            </Col>
            <Col span={4}>
              {recordType === 2 ? (
                <>
                  <Label>Phase</Label>
                  <PhaseCircle>{phase}</PhaseCircle>
                </>
              ) : null}
            </Col>
          </Row>

          <Row style={{ marginTop: '20px' }}>
            <Col span={16}>
              <Label>Nickname</Label>
              <div>{nickName}</div>
            </Col>

            <Col span={4}>
              <Label>
                {recordType === 2 ? 'Sub-Jurisdiction' : 'Regulatory Body'}
              </Label>
              <div>{subJurisdiction}</div>
            </Col>

            <Col span={4}>
            {recordType === 2 && (
              <>
              <Label>Status</Label>
              <div style={{textTransform: 'capitalize'}}>{status}</div>
              </>
            )}
              
            </Col>
          </Row>

          <Row style={{ marginTop: '20px' }}>
            <Col span={24}>
              <Label>Executive Summary</Label>
              <div>{parse(summary)}</div>
            </Col>
          </Row>

          <Row style={{ marginTop: '20px' }}>
            <Col span={6}>
              <Link
                onClick={handleCancel}
                to={`${
                  recordType === 2 ? '/legislation/' : '/regulation/'
                }${legislationId}`}
              >
                Link
              </Link>
            </Col>
          </Row>
        </PopupModal>
      ) : null}
    </>
  );
};

export default ViewLinkLegislation;
