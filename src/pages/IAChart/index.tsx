import { Breadcrumb, Button, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Chart } from 'react-google-charts';
import { LabelText } from '../ViewSubstanceImpactAssessment/styled';
import RangePicker from '../../components/RangePicker';
import Tabs from '../../components/Tabs';
import { getchartHistoryData } from '../../services/api';
import {
  getImpactAssessmentRecordRequest,
  selectors
} from '../../store/modules/impactAssessment/actions';
import {
  selectors as selectorSubs,
  getSubstanceRecordRequest
} from '../../store/modules/substances/actions';
import regionTabs from '../../mocks/region-tabs';

export const data = [
  [
    'Date',
    'Phase A',
    'Restriction Level B',
    'Resources Impact C',
    'Development D',
    'Evaluation E'
  ],
  ['Aug/01/2024', 1, 2, 2, 1, 2],
  ['Sep/22/2024', 1, 4, 3, 2, 3],
  ['Sep/28/2024', 3, 1, 4, 3, 2],
  ['Out/01/2024', 3, 0, 5, 4, 5]
];
export const data2 = [
  ['Date', 'Hits', 'CappedHits'],
  ['Aug/01/2024', 300, 0],
  ['Sep/22/2024', 500, 0],
  ['Sep/28/2024', 900, 0],
  ['Out/01/2024', 2000, 0]
];
export const data3 = [
  ['Date', 'Sites', ''],
  ['Aug/01/2024', 1, 0],
  ['Sep/22/2024', 3, 0],
  ['Sep/28/2024', 8, 0],
  ['Out/01/2024', 25, 0]
];

export const IA_PRIORITY_RANK: any = {
  title: 'Impact Assessment Priority Rank',
  curveType: 'line',
  vAxis: {
    ticks: [
      { v: 0, f: 'NR' },
      { v: 1, f: 'L' },
      { v: 2, f: 'M' },
      { v: 3, f: 'H' },
      { v: 4, f: 'VH' }
    ]
  },
  legend: { position: 'bottom' }
};

export const options: any = {
  title: 'Impact Assessment Metrics',
  curveType: 'line',
  legend: { position: 'bottom' }
};
export const options2: any = {
  title: 'Impact Assessment Hits',
  curveType: 'line',
  legend: { position: 'bottom' },
  vAxis: {
    ticks: [0, 100, { v: 1000, f: '>1000' }], // Define the Y-axis values
    viewWindow: {
      max: 1000 // Limit the max value of the Y-axis
    }
  },
  tooltip: {
    isHtml: true // Enable HTML to customize tooltip if needed
  }
};
export const options3: any = {
  title: 'Impact Assessment Sites',
  curveType: 'line',
  legend: { position: 'bottom' },
  vAxis: {
    ticks: [0, 6, { v: 20, f: '>20' }], // Define the Y-axis values
    viewWindow: {
      max: 20 // Limit the max value of the Y-axis
    }
  },
  tooltip: {
    isHtml: true // Enable HTML to customize tooltip if needed
  }
};
export const cappedData = data2.map(([date, hits]: any, index) => {
  if (index === 0)
    return [date, hits, { role: 'tooltip', type: 'string', p: { html: true } }]; // Keep the header row unchanged
  return [
    date,
    Math.min(hits, 1000),
    `<div style='font-size: 15px;'><strong>${date}</strong><br/>Hits: <strong>${hits}</strong></div>`
  ]; // Add a third column with the original hits value
});
export const cappedData2 = data3.map(([date, sites]: any, index) => {
  if (index === 0)
    return [
      date,
      sites,
      { role: 'tooltip', type: 'string', p: { html: true } }
    ]; // Keep the header row unchanged
  return [
    date,
    Math.min(sites, 20),
    `<div style='font-size: 15px;'><strong>${date}</strong><br/>Sites: <strong>${sites}</strong></div>`
  ]; // Add a third column with the original hits value
});

const tabsHeader = [
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

const IAChart = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { state: locationState }: any = location;
  const impactData: any = useSelector(selectors.impactAssessmentRecord);
  const substanceRecord = useSelector(selectorSubs.substanceRecord);
  const [switchTabs, setSwitchTabs] = useState('1');
  const [isRefresh, setIsRefresh] = useState(false);
  const [priorityRankData, setPriorityRankData] = useState([
    ['Date', 'Priority Rank']
  ]);
  const [dateRange, setDateRange] = useState([
    Moment(new Date()).subtract(30, 'days').toDate(),
    Moment(new Date()).toDate()
  ]);

  const getChartData = async () => {
    try {
      setPriorityRankData([['Date', 'Priority Rank']]);
      const reqData = {
        substanceId: 41,
        regulationId: 15,
        groupId: null,
        toyotaRegionId: 1,
        applicationAreaId: 1,
        dateFrom: dateRange ? dateRange[0].toISOString().split('T')[0] : '',
        dateTo: dateRange ? dateRange[1].toISOString().split('T')[0] : ''
      };
      const response = await getchartHistoryData(reqData);

      if (response?.data?.message && Array.isArray(response.data.message)) {
        const newData = response.data.message.map(item => {
          return [item.date, item.priorityRank];
        });
        setPriorityRankData(prevData => [...prevData, ...newData]);
      } else {
        console.log('Invalid data structure or no data available');
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChartData();
  }, [isRefresh]);

  useEffect(() => {
    if (locationState?.state?.finalParam) {
      const { substanceId, regulationId, toyotaRegionId } =
        locationState.state.finalParam;
      dispatch(
        getImpactAssessmentRecordRequest({
          substanceId,
          regulationId,
          toyotaRegionId
        })
      );
    }
  }, [dispatch, locationState]);

  useEffect(() => {
    if (impactData?.substanceId) {
      dispatch(getSubstanceRecordRequest(impactData.substanceId));
    }
  }, [impactData]);

  return (
    <div style={{ padding: '20px', paddingBottom: '100px', marginTop: '10px' }}>
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
            Impact Assessment for {substanceRecord?.data?.message?.casNumber} •{' '}
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
            {' '}
            {
              regionTabs.find(
                item => item.id === Number(impactData?.toyotaRegionId)
              )?.tab
            }
          </div>
        </Col>
      </Row>

      <Row style={{ marginTop: '10px' }}>
        <Col span={4}>
          <LabelText>Date Range: </LabelText>
          <div>
            <RangePicker
              format={process.env.REACT_APP_DATE_FORMAT!}
              defaultValue={[
                Moment(new Date()).subtract(30, 'days').toDate(),
                Moment(new Date()).toDate()
              ]}
              onChange={(e: any) => {
                setDateRange(e);
                setIsRefresh(prev => !prev);
              }}
            />
          </div>
        </Col>
        <Col span={24} style={{ marginTop: '15px' }}>
          <Button onClick={() => setIsRefresh(prev => !prev)}>Refresh</Button>
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

      <div
        style={{
          marginTop: '30px',
          paddingBottom: '30px',
          borderBottom: '2px solid gainsboro'
        }}
      >
        {priorityRankData && priorityRankData.length > 1 && (
          <Chart
            chartType="LineChart"
            width="100%"
            height="100%"
            data={priorityRankData}
            options={IA_PRIORITY_RANK}
            legendToggle
          />
        )}
      </div>
      <div style={{ marginTop: '30px', borderBottom: '2px solid gainsboro' }}>
        <Chart
          chartType="LineChart"
          width="100%"
          height="100%"
          data={data}
          options={options}
          legendToggle
        />
      </div>
      <div style={{ marginTop: '30px', borderBottom: '2px solid gainsboro' }}>
        <Chart
          chartType="LineChart"
          width="100%"
          height="300px"
          data={cappedData}
          options={options2}
          legendToggle
        />
      </div>
      <div style={{ marginTop: '30px', borderBottom: '2px solid gainsboro' }}>
        <Chart
          chartType="LineChart"
          width="100%"
          height="100%"
          data={cappedData2}
          options={options3}
          legendToggle
        />
      </div>
    </div>
  );
};

export default IAChart;
