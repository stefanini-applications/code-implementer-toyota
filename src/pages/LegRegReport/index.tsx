/* eslint-disable react/no-unescaped-entities */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaEye } from 'react-icons/fa';
import {
  Empty,
  Spin,
  Checkbox as AntCheckbox,
  Radio as AntRadio,
  Button as AntButton
} from 'antd';
import Moment from 'moment';

import Button from '../../components/Button';
import DatePicker from '../../components/DatePicker';
import RangePicker from '../../components/RangePicker';
import Link from '../../components/Link';
import ScrollTopButton from '../../components/ScrollTopButton';
import impactTabs from '../../mocks/impact-tabs';
import regulationStatusOptions from '../../mocks/regulation-status';
import recordsTabs from '../../mocks/records-tabs';
import { deleteRegulatoryUpdate, downloadReport } from '../../services/api';
import {
  getRegulationReportRequest,
  selectors
} from '../../store/modules/regulationReport/actions';
import loadUserDataOnStorage from '../../utils/userData';
import {
  ButtonsGroup,
  Container,
  ContainerDates,
  ContainerRangePicker,
  ContainerDownload,
  ContainerMultiSelect,
  ContainerTable,
  Label,
  TableBody,
  TableHead,
  TableHeadItem,
  TableItem,
  TableItemAgency,
  TableList,
  TableRow,
  Title,
  TitleContainer,
  IcoFileDownload,
  ContainerInput,
  Checkbox,
  CheckboxLabel,
  CheckboxInput,
  ContainerCheckbox,
  ContainerEmpty,
  ContainerLoading
} from './styled';
import MultiSelect from '../../components/MultiSelect';
import ViewLegRegSubstanceModal from '../../components/Modal/ViewLegRegSubstanceModal';
import Confirmation from '../../components/Modal/Confirmation';
import { ToastSuccess } from '../../components/Toast';
import { translate } from '../../locales';

const LegRegReport: React.FC = () => {
  const [jurisdictions, setJurisdictions] = useState(impactTabs);
  const [regulationStatus, setRegulationStatus] = useState(['ACTIVE']);
  const [type, setType] = useState(2);
  const [reportType, setReportType] = useState(2);
  const [recordsType, setRecordsType] = useState(recordsTabs);
  const [jurisdictionChecked, setJurisdictionChecked] = useState(false);
  const [recordsTypeChecked, setRecordsTypeChecked] = useState(false);
  const [timeStamp, setTimeStamp] = useState(new Date().getTime());
  const [loadingTable, setLoadingTable] = useState(false);
  const inputAllRef = useRef<any>();
  const regulationReport = useSelector(selectors.regulationReport);
  const dispatch = useDispatch();
  const today = new Date();
  const dateFormated = today.toLocaleDateString('en-US');
  const [annoucementDate, setAnnoucementDate] = useState([
    Moment(new Date()).subtract(30, 'days').toDate(),
    Moment(new Date()).toDate()
  ]);
  const [dueDate, setDueDate] = useState<any>();
  const [ViewLegRegModal, setViewLegRegModal] = useState(false);
  const [selectedIdForDetails, setSelectedIdForDetails] = useState();
  const [selectedSubstance, setSelectedSubstance] = useState<any>();

  const [selectedUpdateId, setSelectedUpdateId] = useState();
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    inputAllRef.current.checked = true;
    setJurisdictions(
      jurisdictions?.map(x => {
        x.checked = true;

        return x;
      })
    );
  }, []);

  useEffect(() => {
    setJurisdictionChecked(jurisdictions.some(x => x.checked));
    setRecordsTypeChecked(recordsType.some(x => x.checked));
  }, []);

  useEffect(() => {
    if (regulationReport) {
      setLoadingTable(false);
    }
  }, [regulationReport]);

  const handleGenerateReport = () => {
    setLoadingTable(true);
    setReportType(type);
    const obj = {
      startDate: annoucementDate
        ? annoucementDate[0].toISOString().split('T')[0]
        : '',
      endDate: annoucementDate
        ? annoucementDate[1].toISOString().split('T')[0]
        : '',
      startDueDate: dueDate ? dueDate[0].toISOString().split('T')[0] : '',
      endDueDate: dueDate ? dueDate[1].toISOString().split('T')[0] : '',
      jurisdictions: jurisdictions
        .map(x => {
          if (x.checked) return x.id;
        })
        .filter(x => x !== undefined)
        .toString(),
      types: type.toString(),
      status: type === 2 ? regulationStatus.toString() : 'ACTIVE'
    };
    dispatch(getRegulationReportRequest(obj));
  };

  const handleDownloadReport = async () => {
    const obj = {
      startDate: annoucementDate
        ? annoucementDate[0].toISOString().split('T')[0]
        : '',
      endDate: annoucementDate
        ? annoucementDate[1].toISOString().split('T')[0]
        : '',
      startDueDate: dueDate ? dueDate[0].toISOString().split('T')[0] : '',
      endDueDate: dueDate ? dueDate[1].toISOString().split('T')[0] : '',
      jurisdictions: jurisdictions
        .map(x => {
          if (x.checked) return x.id;
        })
        .filter(x => x !== undefined)
        .toString(),
      types: type.toString(),
      status: type === 2 ? regulationStatus.toString() : 'ACTIVE'
    };

    const att = await downloadReport(obj);
    const blob = new Blob([new Uint8Array(att.data.message.content.data)], {
      type: att.data.message.contentType
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = att.data.message.fileName;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 7000);
  };

  const handleCheckbox = () => {
    const hasTrueValue = jurisdictions.some(obj => obj.checked);
    const hasFalseValue = jurisdictions.some(obj => !obj.checked);
    if (hasFalseValue && hasTrueValue) {
      const updatedCheckedState = jurisdictions.map(obj => {
        return { ...obj, checked: false };
      });
      setJurisdictions(updatedCheckedState);
      inputAllRef.current.checked = false;
      setJurisdictionChecked(updatedCheckedState.some(x => x.checked));
    } else {
      const updatedCheckedState = jurisdictions.map(obj => {
        return { ...obj, checked: !obj.checked };
      });
      setJurisdictions(updatedCheckedState);
      setJurisdictionChecked(updatedCheckedState.some(x => x.checked));
      if (hasTrueValue) {
        inputAllRef.current.checked = false;
      } else {
        inputAllRef.current.checked = true;
      }
    }
  };

  const handleClose = async action => {
    if (action === 'yes') {
      const response = await deleteRegulatoryUpdate({ id: selectedUpdateId });
      if (response.status === 200) {
        ToastSuccess(
          translate('pages.regulatoryUpdates.toastSuccessDeleteRecord')
        );
        handleGenerateReport();
      }
      setViewLegRegModal(false);
    }
    setConfirmOpen(false);
  };

  return (
    <Container>
      <ScrollTopButton
        notifyScroll={() => setTimeStamp(new Date().getTime())}
      />
      <TitleContainer>
        <Title>Legislation / Regulation Report</Title>
      </TitleContainer>

      <ContainerDates>
        <ContainerRangePicker>
          <Label>Annoucement Date:</Label>
          <RangePicker
            format={process.env.REACT_APP_DATE_FORMAT!}
            defaultValue={[
              Moment(new Date()).subtract(30, 'days').toDate(),
              Moment(new Date()).toDate()
            ]}
            onChange={e => {
              setAnnoucementDate(e);
            }}
          />
        </ContainerRangePicker>
        <ContainerRangePicker>
          <Label>Due Date:</Label>
          <RangePicker
            format={process.env.REACT_APP_DATE_FORMAT!}
            onChange={e => {
              setDueDate(e);
            }}
          />
        </ContainerRangePicker>
      </ContainerDates>
      <ContainerMultiSelect>
        <Label>Type</Label>
        <ContainerInput>
          <AntRadio.Group
            onChange={e => {
              setType(e.target.value);
            }}
            value={type}
          >
            <AntRadio value={2}>Legislation</AntRadio>
            <AntRadio value={1}>Regulation</AntRadio>
          </AntRadio.Group>
        </ContainerInput>
      </ContainerMultiSelect>

      <ContainerMultiSelect>
        <Label>Jurisdiction</Label>
        <ContainerInput>
          <ContainerCheckbox>
            <CheckboxInput
              type="checkbox"
              id="custom-checkbox-all"
              name="All"
              value="all"
              ref={inputAllRef}
              onChange={() => {
                handleCheckbox();
              }}
            />
            <CheckboxLabel htmlFor="custom-checkbox-all">All</CheckboxLabel>
          </ContainerCheckbox>
          {jurisdictions.map((item, index) => {
            return (
              <ContainerCheckbox>
                <AntCheckbox
                  type="radio"
                  id={`custom-checkbox-${item.tab}`}
                  name={item.tab}
                  checked={item.checked}
                  value={item.tab}
                  onChange={() => {
                    const updatedCheckedState = jurisdictions.map((obj, i) =>
                      i === index ? { ...obj, checked: !obj.checked } : obj
                    );
                    setJurisdictions(updatedCheckedState);

                    const checkedCount = updatedCheckedState.reduce(
                      (acc, obj) => (obj.checked ? acc + 1 : acc),
                      0
                    );

                    inputAllRef.current.checked =
                      checkedCount === updatedCheckedState.length;
                    inputAllRef.current.indeterminate =
                      checkedCount > 0 &&
                      checkedCount < updatedCheckedState.length;
                    setJurisdictionChecked(
                      updatedCheckedState.some(x => x.checked)
                    );
                  }}
                />
                <CheckboxLabel htmlFor={`custom-checkbox-${item.tab}`}>
                  {item.tab}
                </CheckboxLabel>
              </ContainerCheckbox>
            );
          })}
        </ContainerInput>
      </ContainerMultiSelect>
      {type === 2 ? (
        <ContainerMultiSelect>
          <Label>Status</Label>
          <MultiSelect
            options={regulationStatusOptions}
            onChange={(e: any) => {
              setRegulationStatus(e);
            }}
            placeholder="Status"
            label="label"
            value="id"
            style={{ width: '300px', height: '40px' }}
            defaultValue={regulationStatus}
          />
        </ContainerMultiSelect>
      ) : null}

      <ContainerDownload>
        <Button
          isDisabled={
            !jurisdictionChecked ||
            !type ||
            !annoucementDate ||
            (type === 2 && regulationStatus.length <= 0)
          }
          toolTip={
            !jurisdictionChecked ||
            !annoucementDate ||
            !type ||
            (type === 2 && regulationStatus.length <= 0)
              ? 'Please select Dates, types of record, and jurisdictions before creating a report'
              : ''
          }
          type="primary"
          text="Create Report"
          onClick={() => handleGenerateReport()}
        />

        <Button
          onClick={async () => {
            handleDownloadReport();
          }}
          text="Download Report"
          toolTip={
            !regulationReport || regulationReport?.length <= 0
              ? 'Report needs to be created before it can be downloaded'
              : null
          }
          isDisabled={!regulationReport || regulationReport?.length <= 0}
        />
      </ContainerDownload>
      {regulationReport || loadingTable ? (
        <ContainerTable>
          {loadingTable ? (
            <ContainerLoading>
              <Spin />
            </ContainerLoading>
          ) : null}
          <TableList>
            <TableHead>
              <TableHeadItem style={{ width: '8%' }}>
                Jurisdiction
              </TableHeadItem>
              {reportType === 2 ? (
                <>
                  <TableHeadItem style={{ minWidth: '90px', width: '8%' }}>
                    Sub - Jurisdiction
                  </TableHeadItem>
                  <TableHeadItem style={{ minWidth: '90px', width: '8%' }}>
                    Legislation
                  </TableHeadItem>
                  <TableHeadItem style={{ minWidth: '90px', width: '8%' }}>
                    Status
                  </TableHeadItem>
                </>
              ) : (
                <>
                  <TableHeadItem style={{ minWidth: '90px', width: '8%' }}>
                    Regulatory Body
                  </TableHeadItem>
                  <TableHeadItem style={{ minWidth: '90px', width: '8%' }}>
                    Regulation
                  </TableHeadItem>
                </>
              )}
              <TableHeadItem style={{ width: '26%' }}>
                Executive Summary
              </TableHeadItem>
              <TableHeadItem style={{ width: '26%' }}>Update</TableHeadItem>
              <TableHeadItem
                style={{ minWidth: '90px', width: '8%' }}
                className="date-line"
              >
                Announcement Date
              </TableHeadItem>
              <TableHeadItem
                style={{ minWidth: '90px', width: '8%' }}
                className="date-line"
              >
                Due Date
              </TableHeadItem>
              <TableHeadItem
                style={{ minWidth: '90px', width: '8%' }}
                className="date-line"
              >
                Last Modified
              </TableHeadItem>
              <TableHeadItem style={{ width: '100px' }}>Action</TableHeadItem>
            </TableHead>
            <TableBody>
              {regulationReport?.length > 0 ? (
                regulationReport.map(jurisdiction => {
                  const array: any[] = [];
                  let jurHtml;
                  let agencyHtml;
                  let regHtml;
                  let parseJur = true;
                  let parseAgency;
                  let parseReg;
                  const countJur = jurisdiction.agencies.reduce(
                    (count, current) =>
                      count +
                      current.regulations.reduce(
                        (countReg, currentReg) =>
                          countReg + currentReg.regulationUpdates.length,
                        0
                      ),
                    0
                  );
                  if (jurisdiction.agencies.length > 0) {
                    jurHtml = (
                      <TableItem rowSpan={countJur}>
                        {jurisdiction.description}
                      </TableItem>
                    );
                  }

                  jurisdiction.agencies.map(agency => {
                    parseAgency = true;
                    const countagency = agency.regulations.reduce(
                      (countReg, currentReg) =>
                        countReg + currentReg.regulationUpdates.length,
                      0
                    );

                    if (agency.regulations.length > 0) {
                      agencyHtml = (
                        <TableItem rowSpan={countagency}>
                          {agency.description}
                        </TableItem>
                      );
                    }

                    agency.regulations.map(regulation => {
                      parseReg = true;
                      const countReg = regulation.regulationUpdates.length;
                      if (countReg > 0) {
                        regHtml = (
                          <>
                            <TableItem rowSpan={countReg}>
                              <Link
                                href={`/${
                                  regulation.recordType === 1
                                    ? 'regulation'
                                    : 'legislation'
                                }/${regulation.id}`}
                              >
                                {regulation.nickname
                                  ? regulation.nickname
                                  : regulation.recordType === 2
                                  ? ` ${regulation.billTitle} ${regulation.year}`
                                  : regulation.billTitle}
                              </Link>
                            </TableItem>
                            {reportType === 2 ? (
                              <TableItem rowSpan={countReg}>
                                {regulation.status}
                              </TableItem>
                            ) : null}
                            <TableItem rowSpan={countReg}>
                              {regulation.billEpaDocket}
                            </TableItem>
                          </>
                        );
                      }

                      regulation.regulationUpdates.map(update => {
                        array.push(
                          <TableRow>
                            {parseJur ? jurHtml : null}
                            {parseAgency ? agencyHtml : null}
                            {parseReg ? regHtml : null}
                            <TableItem>{update.comment}</TableItem>
                            <TableItem className="date-line">
                              {update.agencyDate}
                            </TableItem>
                            <TableItem className="date-line">
                              {update.toyotaDueDate}
                            </TableItem>
                            <TableItem className="date-line">
                              {update.updatedAt}
                            </TableItem>
                            <TableItem>
                              <AntButton
                                onClick={() => {
                                  setViewLegRegModal(true);
                                  setSelectedIdForDetails(update?.id);
                                  setSelectedSubstance(0);
                                }}
                              >
                                {' '}
                                <FaEye />
                              </AntButton>
                            </TableItem>
                          </TableRow>
                        );
                        parseJur = false;
                        parseAgency = false;
                        parseReg = false;
                      });
                    });
                  });
                  return array;
                })
              ) : !loadingTable ? (
                <ContainerEmpty>
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="There are no updates for the selected dates, type, and jurisdictions. Please change your selections and try again."
                  />
                </ContainerEmpty>
              ) : null}
            </TableBody>
          </TableList>
        </ContainerTable>
      ) : null}
      {ViewLegRegModal && (
        <ViewLegRegSubstanceModal
          open={ViewLegRegModal}
          selectedId={selectedIdForDetails}
          selectedSubstanceId={selectedSubstance}
          handleCancel={() => setViewLegRegModal(false)}
          deleteUpdate={id => {
            setSelectedUpdateId(id);
            setConfirmOpen(true);
          }}
        />
      )}

      <Confirmation
        open={confirmOpen}
        setOpen={setConfirmOpen}
        titleModal="Delete Update"
        bodyText="Are you sure you want to delete this update?"
        onClose={handleClose}
        okText="Delete Update"
        cancelText="Cancel"
      />
    </Container>
  );
};

export default LegRegReport;
