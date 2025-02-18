import React, { useEffect, useState } from 'react';
import {
  Breadcrumb,
  Button,
  Col,
  Row,
  Select,
  Table,
  TableColumnsType
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Tabs from '../../components/Tabs';
import {
  getImpactAssessmentRecordRequest,
  selectors
} from '../../store/modules/impactAssessment/actions';
import {
  selectors as selectorSubs,
  getSubstanceRecordRequest
} from '../../store/modules/substances/actions';
import { LabelText } from './styled';
import regionTabs from '../../mocks/region-tabs';

const tabsHeader = [
  {
    label: 'All',
    key: '0'
  },
  {
    label: 'Articles (Parts / Vehicle)',
    key: '1'
  },
  {
    label: 'Operations - Direct',
    key: '2'
  },
  {
    label: 'Operations - Indirect',
    key: '3'
  },
  {
    label: 'Service Products',
    key: '4'
  }
];

const colorMap = {
  VH: '#FF8080',
  M: '#FFCC99',
  L: '#FFE6B3',
  H: '#FF9F8C',
  NR: '#DCEECF'
};

const columnsNext: TableColumnsType<any> = [
  {
    title: 'SEVERITY OF of THE BUSINESS',
    children: [
      {
        title: 'Application Area',
        width: 200,
        align: 'center',
        render: (_, record) => `${record.ApplicationArea.description}`
      },
      {
        title: 'Hits',
        dataIndex: 'hits',
        key: 'hits',
        align: 'center',
        width: 100
      },
      {
        title: 'Sites',
        dataIndex: 'sites',
        key: 'sites',
        width: 100,
        align: 'center'
      },
      {
        title: 'Resources Impact (C)',
        dataIndex: 'resourcesImpact',
        key: 'resourcesImpact',
        width: 100,
        align: 'center'
      },
      {
        title: 'Resources Impact (C) Comment',
        align: 'center',
        render: (_, record) => {
          return (
            <div
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              <div
                style={{
                  height: '60px',
                  overflowY: 'auto',
                  whiteSpace: 'normal'
                }}
              >
                {record?.comments}
              </div>
            </div>
          );
        }
      }
    ]
  },
  {
    title: 'LEVEL OF CONTROL',
    children: [
      {
        title: 'Development (D)',
        dataIndex: 'dev',
        key: 'dev',
        width: 100,
        fixed: 'right',
        align: 'center'
      },
      {
        title: 'Evaluation (E)',
        dataIndex: 'evalTime',
        key: 'evalTime',
        width: 100,
        fixed: 'right',
        align: 'center'
      },
      {
        title: 'Development (D) and Evaluation (E) Comments',
        fixed: 'right',
        align: 'center',
        render: (_, record) => {
          return (
            <div
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              <div
                style={{
                  height: '60px',
                  overflowY: 'auto',
                  whiteSpace: 'normal'
                }}
              >
                {record?.generalComments}
              </div>
            </div>
          );
        }
      }
    ]
  }
];

const ViewSubstanceIA = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { state: locationState }: any = location;
  const impactData: any = useSelector(selectors.impactAssessmentRecord);
  const substanceRecord = useSelector(selectorSubs.substanceRecord);
  const [switchTabs, setSwitchTabs] = useState('0');
  const [currentPhase, setCurrentPhase] = useState<any>(0);
  const [filteredData, setFilteredData] = useState(
    impactData?.ImpactAssessmentRows
  );

  useEffect(() => {
    if (locationState?.state?.finalParam) {
      const { substanceId, regulationId, toyotaRegionId } =
        locationState.state.finalParam;
      const filteredRegionId =
        regionTabs.find(
          item =>
            item.tab.toLocaleLowerCase() == toyotaRegionId?.toLocaleLowerCase()
        )?.id || 1;
      dispatch(
        getImpactAssessmentRecordRequest({
          substanceId,
          regulationId,
          toyotaRegionId: filteredRegionId
        })
      );
    }
  }, [dispatch, locationState]);

  useEffect(() => {
    if (impactData && impactData.phase) {
      setCurrentPhase(impactData.phase);
    }
    if (impactData?.substanceId) {
      dispatch(getSubstanceRecordRequest(impactData.substanceId));
    }
  }, [impactData]);

  useEffect(() => {
    if (impactData && switchTabs !== '0') {
      const filtered = impactData?.ImpactAssessmentRows?.filter(
        item => item.ApplicationArea?.id == switchTabs
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(impactData?.ImpactAssessmentRows);
    }
  }, [impactData, switchTabs]);

  const openChartsPage = () => {
    const finalParam = {
      substanceId: impactData?.substanceId,
      regulationId: impactData?.regulationId,
      toyotaRegionId: impactData?.toyotaRegionId
    };
    history.push('/impact-assessment-chart', {
      state: { finalParam }
    });
  };

  const columns: TableColumnsType<any> = [
    {
      title: 'REGULATORY SCOPE',
      children: [
        {
          title: 'Application Area',
          width: 200,
          align: 'center',
          render: (_, record) => `${record.ApplicationArea.description}`
        },
        {
          title: 'Phase (A)',
          dataIndex: 'restrictionLevel',
          key: 'restrictionLevel',
          width: 100,
          align: 'center',
          render: (_, record) => `${currentPhase}`,
          onCell: (record, index) => ({
            rowSpan: index === 0 ? 4 : 0
          })
        },
        {
          title: 'Target Use/Scope Comments',
          align: 'center',
          render: (_, record) => {
            return (
              <div
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                <div
                  style={{
                    height: '60px',
                    overflowY: 'auto',
                    whiteSpace: 'normal'
                  }}
                >
                  {record?.scopeComments}
                </div>
              </div>
            );
          }
        },
        {
          title: 'Level of Restriction (B)',
          dataIndex: 'restrictionLevel',
          key: 'restrictionLevel',
          width: 180,
          align: 'center'
        }
      ]
    },
    {
      title: 'APPLICATION AREA PRIORITY RANK',
      children: [
        {
          title: 'Relation between Phase (A) and Impact (B+C+D+E)',
          dataIndex: 'priorityRank',
          key: 'priorityRank',
          width: 150,
          fixed: 'right',
          align: 'center',
          render: (_, record) => {
            return (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '100%',
                    padding: '8px',
                    fontWeight: 'bold',
                    width: '30px',
                    height: '30px',
                    backgroundColor: colorMap[record.priorityRank] || '#ffffff'
                  }}
                >
                  {record.priorityRank}
                </div>
              </div>
            );
          }
        }
      ]
    }
  ];

  return (
    <>
      <div
        style={{ padding: '20px', paddingBottom: '100px', marginTop: '10px' }}
      >
        <Breadcrumb
          separator=">"
          items={[
            {
              title: 'Home',
              href: '/'
            },
            {
              title: 'Impact Assessment'
            }
          ]}
        />
        <Row style={{ marginTop: '10px' }}>
          <Col span={24}>
            <h3>
              Impact Assessment for substance:{' '}
              {substanceRecord?.data?.message?.casNumber} •{' '}
              {substanceRecord?.data?.message?.commonName}
            </h3>
          </Col>
        </Row>

        <Row style={{ marginTop: '30px' }}>
          <Col span={4}>
            <LabelText>
              {impactData?.Regulation?.recordType == 1
                ? 'Regulation'
                : 'Legislation'}
            </LabelText>
            <div>
              <Link
                to={`${
                  impactData?.Regulation?.recordType == 1
                    ? '/regulation/'
                    : '/legislation/'
                }${impactData?.Regulation?.id}`}
              >
                {impactData?.Regulation?.billTitle}
              </Link>
            </div>
          </Col>

          <Col span={4}>
            <LabelText>
              {impactData?.Regulation?.recordType == 1
                ? 'Regulatory Body'
                : 'Sub-Jurisdiction'}
            </LabelText>
            <div>{impactData?.Regulation?.Agency?.description}</div>
          </Col>

          <Col span={3}>
            <LabelText>Jurisdiction</LabelText>
            <div>{impactData?.Regulation?.Jurisdiction?.description}</div>
          </Col>

          <Col span={4}>
            <LabelText>Impacted Toyota Region</LabelText>
            <div>
              {
                regionTabs.find(
                  item => item.id === Number(impactData?.toyotaRegionId)
                )?.tab
              }
            </div>
          </Col>

          <Col span={3}>
            <LabelText>Priority Rank</LabelText>
            <div
              style={{
                backgroundColor:
                  colorMap[impactData?.priorityRank] || '#FFFFFF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '100%',
                padding: '8px',
                fontWeight: 'bold',
                width: '30px',
                height: '30px'
              }}
            >
              {impactData?.priorityRank}
            </div>
          </Col>

          {/* <Col span={3}>
            <LabelText>Version History</LabelText>
            <div>
              <Select style={{ width: 150 }} />
            </div>
          </Col> */}

          <Col span={3}>
            <div>{impactData?.attachmentsCount} Attachments</div>
            <Button>Attachments</Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button type="primary" onClick={openChartsPage}>
              Charts
            </Button>
          </Col>
        </Row>

        <div style={{ marginTop: '30px' }}>
          <Tabs
            activeKey={switchTabs.toString()}
            type="card"
            items={tabsHeader}
            onChange={(newActiveKey: string) => {
              setSwitchTabs(newActiveKey);
            }}
          />
        </div>

        <div style={{ marginTop: '15px' }}>
          {filteredData && (
            <Table
              columns={columns}
              dataSource={filteredData}
              bordered
              pagination={false}
              size="middle"
            />
          )}
        </div>

        <div style={{ marginTop: '20px' }}>
          {filteredData && (
            <Table
              columns={columnsNext}
              dataSource={filteredData}
              bordered
              pagination={false}
              size="middle"
            />
          )}
        </div>
      </div>
    </>
  );
};
export default ViewSubstanceIA;
