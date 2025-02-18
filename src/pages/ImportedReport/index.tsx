import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Col, Row } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import parse from 'html-react-parser';
import Moment from 'moment';
import ScrollTopButton from '../../components/ScrollTopButton';
import { Container, HeadingText, Label, ReportBox, Text } from './styled';

const ImportedReport: React.FC = () => {
  const location = useLocation();
  const { state: locationState }: any = location;
  const [bulkLegislations, setBulkLegislations] = useState<any>();
  useEffect(() => {
    if (locationState?.state?.bulkLegislationRecord) {
      document.body.classList.remove('hide-overflow');
      setBulkLegislations(locationState.state.bulkLegislationRecord);
    } else {
      console.error('No legislations found in state');
    }
  }, []);

  return (
    <>
      <Container>
        <Breadcrumb
          separator=">"
          items={[
            {
              title: 'Home',
              href: '/'
            },
            {
              title: 'Imported Report'
            }
          ]}
        />

        <Row justify="space-between" style={{ marginTop: '10px' }}>
          <Col>
            <HeadingText>Imported Report</HeadingText>
          </Col>
          <Col>
            <Button type="primary" onClick={() => window.print()}>
              Print
            </Button>
          </Col>
        </Row>
        <Row
          justify="space-between"
          style={{ marginTop: '20px', padding: '10px' }}
        >
          <Col>
            <HeadingText style={{ fontSize: '14px' }}>
              Number of Imported Legislation
            </HeadingText>
            <HeadingText>
              {bulkLegislations &&
                bulkLegislations.duplicates.length +
                  bulkLegislations.saved.length}
            </HeadingText>
          </Col>
          <Col>
            <HeadingText style={{ color: 'green', fontSize: '14px' }}>
              Number of Successfully Imported Legislation
            </HeadingText>
            <HeadingText>
              {bulkLegislations && bulkLegislations.saved.length}
            </HeadingText>
          </Col>
          <Col>
            <HeadingText style={{ color: 'red', fontSize: '14px' }}>
              Number of Errors
            </HeadingText>
            <HeadingText>
              {bulkLegislations && bulkLegislations.duplicates.length}
            </HeadingText>
          </Col>
        </Row>

        {bulkLegislations &&
          bulkLegislations.duplicates.length > 0 &&
          bulkLegislations.duplicates.map((data: any) => (
            <ReportBox key={data.duplicates[0].id}>
              <Row>
                <Col>
                  {' '}
                  <HeadingText style={{ color: 'red' }}>ERROR</HeadingText>
                </Col>
              </Row>

              <Row>
                <Col>
                  <div style={{ color: 'red' }}>Duplicate</div>
                </Col>
              </Row>

              <Row justify="space-between" style={{ marginTop: '20px' }}>
                <Col>
                  <Label> Legislation Name</Label>
                  <Text>{data.duplicates[0].billTitle}</Text>
                </Col>

                <Col>
                  <Label>Nickname</Label>
                  <Text>{data.duplicates[0].nickname}</Text>
                </Col>

                <Col>
                  <Label>Sub-Jurisdiction</Label>
                  <Text>{data.Agency.description}</Text>
                </Col>
                <Col>
                  <Label>Legislative Phase</Label>
                  <Text>Phase {data.duplicates[0].phase}</Text>
                </Col>

                <Col>
                  <Label>Year</Label>
                  <Text>{data.duplicates[0].year}</Text>
                </Col>
              </Row>

              <Row style={{ marginTop: '20px' }}>
                <Col span={24}>
                  <Label>Executive Summary</Label>
                  <Text>{parse(data.duplicates[0].billEpaDocket)}</Text>
                </Col>
              </Row>

              <Row style={{ marginTop: '20px' }}>
                <Col>
                  <Label>Announcement Date</Label>
                  <Text>
                    {Moment(data.agencyDate).format(
                      process.env.REACT_APP_DATE_FORMAT
                    )}
                  </Text>
                </Col>
              </Row>

              <Row style={{ marginTop: '20px' }}>
                <Col>
                  <Label>Update Description</Label>
                  <Text>{parse(data.comment)}</Text>
                </Col>
              </Row>

              <Row style={{ marginTop: '30px' }}>
                <Col>
                  <Link
                    to={`/legislation/${data.duplicates[0].id}`}
                    target="_blank"
                  >
                    Link
                  </Link>
                </Col>
              </Row>
            </ReportBox>
          ))}

        {bulkLegislations &&
          bulkLegislations.saved.length > 0 &&
          bulkLegislations.saved.map((data: any) => (
            <ReportBox key={data.regulationId}>
              <Row>
                <Col>
                  {' '}
                  <HeadingText style={{ color: 'green' }}>
                    SUCCESSFULLY IMPORTED
                  </HeadingText>
                </Col>
              </Row>

              <Row justify="space-between" style={{ marginTop: '20px' }}>
                <Col>
                  <Label> Legislation Name</Label>
                  <Text>{data.billTitle}</Text>
                </Col>

                <Col>
                  <Label>Nickname</Label>
                  <Text>{data.nickname}</Text>
                </Col>

                <Col>
                  <Label>Sub-Jurisdiction</Label>
                  <Text>{data.Agency.description}</Text>
                </Col>

                <Col>
                  <Label>Legislative Phase</Label>
                  <Text>Phase {data.phase}</Text>
                </Col>

                <Col>
                  <Label>Year</Label>
                  <Text>{data.year}</Text>
                </Col>
              </Row>

              <Row style={{ marginTop: '20px' }}>
                <Col span={24}>
                  <Label>Legislative Summary</Label>
                  <Text>{parse(data.billEpaDocket)}</Text>
                </Col>
              </Row>

              <Row style={{ marginTop: '20px' }}>
                <Col>
                  <Label>Announcement Date</Label>
                  <Text>
                    {Moment(data.agencyDate).format(
                      process.env.REACT_APP_DATE_FORMAT
                    )}
                  </Text>
                </Col>
              </Row>

              <Row style={{ marginTop: '20px' }}>
                <Col>
                  <Label>Description</Label>
                  <Text>{parse(data.comment)}</Text>
                </Col>
              </Row>

              <Row style={{ marginTop: '30px' }}>
                <Col>
                  <Link
                    to={`/legislation/${data.regulationId}`}
                    target="_blank"
                  >
                    Link
                  </Link>
                </Col>
              </Row>
            </ReportBox>
          ))}
      </Container>

      <ScrollTopButton />
    </>
  );
};

export default ImportedReport;
