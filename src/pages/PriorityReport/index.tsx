/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useRef } from 'react';
import { BsArrowDownUp, BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

import { Spin, Modal, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import _, { cloneDeep } from 'lodash';
import Moment from 'moment';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Link from '../../components/Link';
import ImpactAssessmentModal from '../../components/Modal/ViewImpactAssessment';
import PaginationAnt from '../../components/Pagination';
import Switch from '../../components/SwitchAntd';
import MultiTabsRegion from '../../components/Tags';
import applicationTabs from '../../mocks/application-tabs';
import jurisdictionTabs from '../../mocks/impact-tabs';
import toyotaRegionTabs from '../../mocks/region-tabs';
import history from '../../routes/history';
import { downloadPriorityReport } from '../../services/api'
import {
  selectors,
  getPriorityReportRequest,
  getPriorityReportTabsRequest
} from '../../store/modules/priorityReport/actions';
import handleDownloadPage from '../../utils/download-page';
import {
  Container,
  ContainerTable,
  TableList,
  TableHead,
  TableBody,
  TableRow,
  TableItem,
  TableHeadItem,
  PointerCursor,
  ContainerTabs,
  DummyTableRow,
  DummyTableItem,
  FlexWrap,
  Label,
  PaddingDiv,
  ImpactDiv,
  ImpactInnerDiv,
  ImpactDivDummy,
  DupLink,
  RadioFont,
  ScrollTopDiv,
  ContainerButtonsModal,
  MultiLineDots,
  ToolTipPanel,
  ToolTipName,
  TitleContainer,
  Title,
  PrioritySort,
  TextLink,
  ContainerSwitches,
  DivSwitch,
  ContainerDownload,
  ContainerOptions,
  ContainerApplicationArea,
  ContainerDownloads,
  ContainerJurisdiction,
  ContainerImpactedRegion,
  ContainerPagination,
  ContainerButtons,
  Search,
  SearchIcon,
  Pagination,
  ContainerLoading
} from './styled';

const PriorityReport: React.FC = () => {
  const dispatch = useDispatch();
  // const jurisdictions = localStorage.getItem('user.jurisdictions');
  // const toyotaRegions = localStorage.getItem('user.toyotaRegions');
  const priorityReportDataOrg = useSelector(selectors.priorityReport);
  const priorityReportTabsOrg = useSelector(selectors.priorityReportTabs);
  const [priorityReportData, setPriorityReportData] = useState<any>();
  const [impactAssessmentData, setImpactAssessmentData] = useState<any>();
  const [highlightValues, setHighlightValues] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [controlRun, setControlRun] = useState(0);
  const [showPhase6, setShowPhase6] = useState(false);
  const [showlegislation, setlesgislation] = useState(false);
  const [viewImpactAssessment, setViewImpactAssessment] = useState(false);
  const [subGrpSortOrder, setSubGrpSortOrder] = useState<'ascending' | 'descending' | 'none'>('none');
  const [prioSortOrder, setPrioSortOrder] = useState<'highToLow' | 'lowToHigh' | 'none'>('none');
  const [prioritySortOrder, setPrioritySortOrder] = useState<'highToLow' | 'lowToHigh'>('highToLow');
  const [activeIndex] = useState(0);
  const [activeIndexImpacReg] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [processDownloadReport, setProcessDownloadReport] = useState(false);
  const [itemsPerPageCount, setItemsPerPageCount] = useState(10);
  const [autoFocus, setAutoFocus] = useState(false);
  const [backupData, setBackupData] = useState<any>();
  const [jurisdictionTabsWithContent, setJurisdictionTabsWithContent]: any = useState([]);
  const [regionTabsWithContent, setRegionTabsWithContent]: any = useState([]);
  const [jurisdictionFilters, setJurisdictionFilters] = useState<any>([]);
  const [toyotaRegFilters, setToyotaRegFilters]: any = useState([]);
  const [appAreaFilters, setAppAreaFilters] = useState(5);
  const [sortOption, setSortOption] = useState(1);
  const [sortOrder, setSortOrder] = useState('desc');
  const [headerBottomBorder, setHeaderBottomBorder] = useState(false);
  const userInput: any = useRef('');
  const paginationInfo = useSelector(selectors.priorityPaginationInfo);

  window.onscroll = function () {
    const headScroll = document.getElementById('head-scroll');
    const reachedTop = headScroll?.getClientRects().item(0)?.top;

    if (!headerBottomBorder && reachedTop && reachedTop <= 0) {
      setHeaderBottomBorder(true);
    }

    if (headerBottomBorder && reachedTop && reachedTop > 1) {
      setHeaderBottomBorder(false);
    }
  };

  useEffect(() => {
    setControlRun(controlRun + 1);
    if (controlRun == 1 || priorityReportDataOrg === undefined) {
      setTableLoading(false);
    }
  }, [priorityReportDataOrg]);

  useEffect(() => {
    setTableLoading(true);
    setControlRun(1);
    dispatch(getPriorityReportRequest({
      showPhase6,
      searchText: userInput.current || '',
      pageNumber: paginationInfo?.CurrentPage || 1,
      pageSize: Number(itemsPerPageCount) || 10,
      showLegislation: showlegislation,
      sortOption,
      sortDirection: sortOrder,
      appArea: appAreaFilters === 5 ? '' : appAreaFilters,
      region: toyotaRegFilters?.map((reg) => { return reg.id }),
      jurisdiction: jurisdictionFilters?.map((juri) => { return juri.id })
    }));
  }, [dispatch, showPhase6, showlegislation, appAreaFilters, toyotaRegFilters, jurisdictionFilters, sortOrder, sortOption]);

  const updateFilterOptions = () => {
    dispatch(getPriorityReportTabsRequest({
      showPhase6,
      showLegislation: showlegislation,
      region: toyotaRegFilters?.map((reg) => { return reg.id }),
      jurisdiction: jurisdictionFilters?.map((juri) => { return juri.id }),
      appArea: appAreaFilters === 5 ? '' : appAreaFilters,
    }));
  };

  useEffect(() => {
    updateFilterOptions();
  }, []);

  useEffect(() => {
    const validFilterOptions = priorityReportTabsOrg;

    const jurisdictionList = validFilterOptions?.jurisdictionTabs;
    setJurisdictionTabsWithContent(jurisdictionTabs?.map(tab => jurisdictionList?.includes(tab.tab.toUpperCase()) ? tab.id : undefined))

    const regionList = validFilterOptions?.toyotaRegionTabs?.map(x => x.toUpperCase());
    setRegionTabsWithContent(toyotaRegionTabs?.map(tab => regionList?.includes(tab.tab.toUpperCase()) ? tab.id : undefined))
  }, [priorityReportTabsOrg, priorityReportDataOrg]);

  useEffect(() => {
    jurisdictionFilters.forEach((auxJurisdiction) => {
      if (!jurisdictionTabsWithContent.includes(auxJurisdiction.id)) {
        jurisdictionTabsWithContent[auxJurisdiction.id] = auxJurisdiction.id;
      }
    });
    toyotaRegFilters.forEach((auxRegion) => {
      if (!regionTabsWithContent.includes(auxRegion.id)) {
        regionTabsWithContent[auxRegion.id] = auxRegion.id;
      }
    });
  }, [jurisdictionTabsWithContent, regionTabsWithContent]);


  useEffect(() => {
    updateFilterOptions();
    if (priorityReportDataOrg) {
      setPriorityReportData(
        cloneDeep(
          getAllFiltered(
            priorityReportDataOrg,
            jurisdictionFilters,
            toyotaRegFilters,
            appAreaFilters
          )
        )
      );
    }
  }, [priorityReportDataOrg]);

  useEffect(() => {
    if (processDownloadReport && priorityReportData) {
      handleDownloadPage(`Substance-Priority-Report-${Moment().format('MMDDYYYY')}`)
      setPriorityReportData(backupData)
      setProcessDownloadReport(false)
    }
  }, [priorityReportData, processDownloadReport]);

  const getAllFiltered = (
    data,
    jurisdictionFiltersData?: any,
    impactRegPriorityData?: any,
    appAreaFiltersData?: any
  ) => {
    let retData = cloneDeep(data);

    if (retData && jurisdictionFiltersData?.length > 0) {
      retData = retData.map((item) => {
        const found = jurisdictionFiltersData.find(prio => prio.description === item.jurisdiction);
        return found ? item : null;
      }).filter((item) => item !== null);
    }

    if (retData && impactRegPriorityData?.length > 0) {
      retData = retData.map((item) => {
        const found = impactRegPriorityData.find(prio => prio.tab.toLowerCase() === item.toyotaRegion.toLowerCase());
        return found ? item : null;
      }).filter((item) => item !== null);
    }

    if (retData && appAreaFiltersData) {
      retData = retData.map((item) => {
        item.rowsForEdit = cloneDeep(item.rows);
        item.rows = cloneDeep(item.rows.map((impacts) => {
          if (appAreaFiltersData === 5 || appAreaFiltersData.toString() === impacts.applicationAreaId) {
            return impacts;
          }
          return null;
        }).filter((subItem) => subItem !== null));
        return item;
      }).filter((item) => item !== null);
    }

    return retData;
  }

  const handleSubstanceGroupSort = (
    e,
    retainPrevSort?: boolean,
  ) => {
    if (!retainPrevSort) {
      if (subGrpSortOrder === 'none' || subGrpSortOrder === 'descending') {
        setSubGrpSortOrder('ascending');
        setSortOrder('asc');
      } else {
        setSortOrder('desc');
        setSubGrpSortOrder('descending');
      }

      setPrioSortOrder('none');
    }
    setSortOption(3);
  };

  const handlePrioritySort = (
    e,
    retainPrevSort?: boolean,
  ) => {
    if (!retainPrevSort) {
      if (prioSortOrder === 'none' || prioSortOrder === 'lowToHigh') {
        setPrioSortOrder('highToLow');
        setSortOrder('desc');
      } else {
        setSortOrder('asc');
        setPrioSortOrder('lowToHigh');
      }
      setSortOption(1);
      setSubGrpSortOrder('none');
    }
  }

  const handleFirstPrioritySort = () => {
    switch (prioritySortOrder) {
      case 'lowToHigh':
        setPrioritySortOrder('highToLow');
        setSortOrder('desc');
        break;
      case 'highToLow':
        setSortOrder('asc');
        setPrioritySortOrder('lowToHigh');
        break;
      default:
        break;
    }
    setSortOption(2);
  }

  const handleTabClick = (data: any) => {
    setJurisdictionFilters(data);
    updateFilterOptions();
  }

  const handleImpacRegTabClick = (data: any) => {
    setToyotaRegFilters(data);
    updateFilterOptions();
  }

  const handleAppAreaTabClick = (e: RadioChangeEvent) => {
    setAppAreaFilters(e.target.value);
    setTableLoading(true);
    setControlRun(1);
    if (e.target.value === 5) {
      setSortOption(1);
    } else {
      setSortOption(2);
    }
  }

  const handleCloseImpactAssessment = () => {
    setViewImpactAssessment(false);
  }

  const handleEditImpactAssessment = () => {
    setViewImpactAssessment(false);
    const typeName = `${impactAssessmentData?.casNumber} • ${impactAssessmentData?.commonName}`
    const recType = 'substance';
    const pattern = /&/gi;
    const replacement = "replace_and_char";
    const repCommName = impactAssessmentData?.commonName.replace(pattern, replacement);
    const repTypeName = typeName.replace(pattern, replacement);
    const region = impactAssessmentData?.toyotaRegionId;
    const regulationId = impactAssessmentData?.regulation?.id;
    const query = encodeURI(
      `casNumber=${impactAssessmentData?.casNumber}` +
      `&commonName=${repCommName}` +
      `&typeName=${repTypeName}&type=${recType}&typeId=${impactAssessmentData?.substanceId}` +
      `&substance=${impactAssessmentData?.substanceId}` +
      `&region=${region}` +
      `&regulationId=${regulationId}` +
      `&regulation=${regulationId}`
    );

    history.push(
      `/editRecord-impactAssessment/${impactAssessmentData?.substanceId}?${query}`
    );
  }

  const handleDownloadClick = async () => {
    setIsModalOpen(true)
  }

  const handleDownload = async (type) => {
    const obj = {
      showPhase6,
      searchText: userInput.current || '',
      pageNumber: 1,
      pageSize: 999999,
      showLegislation: showlegislation,
      sortOption,
      sortDirection: sortOrder,
      appArea: appAreaFilters === 5 ? '' : appAreaFilters,
      region: toyotaRegFilters?.map((reg) => { return reg.id }),
      jurisdiction: jurisdictionFilters?.map((juri) => { return juri.id }),
      hideNr: type !== 'full'
    };

    const att = await downloadPriorityReport(obj);
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

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (viewImpactAssessment) {
      document.body.classList.add("hide-overflow");
    } else {
      document.body.classList.remove("hide-overflow");
    }
  }, [viewImpactAssessment]);

  useEffect(() => {
    return () => {
      document.body.classList.remove("hide-overflow");
    }
  }, []);

  const rowSpanCalc = appAreaFilters === 5 ? 4 : 1;
  const showHeaderBottom = headerBottomBorder || priorityReportData?.length === 0;

  function handleUserSearchInput(value) {
    dispatch(getPriorityReportRequest({
      showPhase6,
      searchText: value,
      sortOption,
      sortDirection: sortOrder,
      pageNumber: 1,
      pageSize: Number(itemsPerPageCount) || 10,
      showLegislation: showlegislation,
      appArea: appAreaFilters === 5 ? '' : appAreaFilters,
      region: toyotaRegFilters?.map((reg) => { return reg.id }),
      jurisdiction: jurisdictionFilters?.map((juri) => { return juri.id })
    }));

    userInput.current = value;

    if (!autoFocus) {
      setAutoFocus(true);
    }

    setTableLoading(true);
    setControlRun(1);
  }

  const handlePagination = (page, size) => {
    setItemsPerPageCount(size);

    dispatch(
      dispatch(getPriorityReportRequest({
        showPhase6,
        sortOption,
        sortDirection: sortOrder,
        searchText: userInput.current,
        pageNumber: page,
        pageSize: size,
        showLegislation: showlegislation,
        appArea: appAreaFilters === 5 ? '' : appAreaFilters,
        region: toyotaRegFilters?.map((reg) => { return reg.id }),
        jurisdiction: jurisdictionFilters?.map((juri) => { return juri.id })
      }))
    );

    setTableLoading(true);
    setControlRun(1);
  };

  function getToyotaRegionId(region) {
    switch (region) {
      case 'Americas':
        return 1;
      case 'Europe':
        return 2;
      case 'SE Asia':
        return 3;
      case 'China':
        return 4;
      case 'Japan':
        return 5;
      default:
        return 0;
    }
  }

  function getColorLevelOverall(priorityRank) {
    switch (priorityRank) {
      case 'Low':
        return '#FAE6DA';
      case 'Medium':
        return '#F1B196';
      case 'High':
        return '#E97354';
      case 'Very High':
        return '#BB2F29';
      default:
        return '#C6E0B8';
    }
  }

  return (
    <Container>
      <Modal
        title="Do you want to include rows with the priority 'No Risk'?"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <ContainerButtonsModal>
            <Button key="submit" onClick={() => handleDownload('full')}
              text="Include 'No Risk' entries"
            />
            <Button
              key="link"
              type="primary"
              onClick={() => handleDownload('wNR')}
              text="Exclude 'No Risk' entries"
            />
          </ContainerButtonsModal>
        ]}>
        <p>Caution: Including all the entries with a priority of 'No Risk' in the download will increase processing time, and may lead to performance issues.</p>
      </Modal>
      {viewImpactAssessment
        && <ImpactAssessmentModal
          modalTitle='Impact Assessment'
          data={impactAssessmentData}
          onClose={handleCloseImpactAssessment}
          onEditRecordClick={handleEditImpactAssessment}
        />}
      <TitleContainer>
        <Title>Priority Report</Title>
      </TitleContainer>
      <ContainerTable id="divIdToPrint">
        <ContainerOptions>
          <FlexWrap>
            <ContainerJurisdiction>
              <Label>Jurisdiction</Label>
              <ContainerTabs>
                <MultiTabsRegion
                  tabsWithContent={jurisdictionTabsWithContent}
                  key={activeIndex}
                  value={jurisdictionTabs}
                  selectedTabs={jurisdictionFilters}
                  disableTags={false}
                  onTabClick={handleTabClick}
                  substanceId={1}
                />
              </ContainerTabs>
            </ContainerJurisdiction>

            <ContainerImpactedRegion>
              <Label>Impacted Toyota Region</Label>
              <ContainerTabs>
                <MultiTabsRegion
                  tabsWithContent={regionTabsWithContent}
                  key={activeIndexImpacReg}
                  value={toyotaRegionTabs}
                  disableTags={false}
                  selectedTabs={toyotaRegFilters}
                  onTabClick={handleImpacRegTabClick}
                  substanceId={1}
                />
              </ContainerTabs>
            </ContainerImpactedRegion>

            <ContainerApplicationArea>
              <Label>Application Area</Label>
              <ContainerTabs>
                <Radio.Group onChange={handleAppAreaTabClick} value={appAreaFilters} size="large">
                  <Radio value={5}>
                    <RadioFont>
                      All
                    </RadioFont>
                  </Radio>
                  <Radio value={applicationTabs[0].id}>
                    <RadioFont>
                      {applicationTabs[0].description}
                    </RadioFont>
                  </Radio>
                  <Radio value={applicationTabs[1].id}>
                    <RadioFont>
                      {applicationTabs[1].description}
                    </RadioFont>
                  </Radio>
                  <Radio value={applicationTabs[2].id}>
                    <RadioFont>
                      {applicationTabs[2].description}
                    </RadioFont>
                  </Radio>
                  <Radio value={applicationTabs[3].id}>
                    <RadioFont>
                      {applicationTabs[3].description}
                    </RadioFont>
                  </Radio>
                </Radio.Group>
              </ContainerTabs>
            </ContainerApplicationArea>

          </FlexWrap>
          <ContainerDownloads>
            <ContainerSwitches>
              <DivSwitch>
                <RadioFont>Highlight missing values</RadioFont>
                <Switch size="small" onSwitchClick={(e) => setHighlightValues(!highlightValues)} />
              </DivSwitch>
              <DivSwitch>
                <RadioFont>Show rows with Phase 6</RadioFont>
                <Switch size="small" onSwitchClick={(e) => setShowPhase6(!showPhase6)} />
              </DivSwitch>
              <DivSwitch>
                <RadioFont>Show Legislations</RadioFont>
                <Switch size="small" onSwitchClick={(e) => setlesgislation(!showlegislation)} />
              </DivSwitch>
            </ContainerSwitches>
            <ContainerDownload>
              <Button onClick={() => handleDownloadClick()} text="Download Priority Report" />
            </ContainerDownload>
          </ContainerDownloads>
        </ContainerOptions>

        <ScrollTopDiv id="head-scroll" />
        <ContainerPagination>
          <ContainerButtons>
            <Search>
              <Input
                className="sub-search-component"
                type="text"
                onChangeInput={handleUserSearchInput}
                prefixIcon={<SearchIcon />}
                defaultText={userInput.current}
                autoFocus={autoFocus}
                placeholder="Search for priority reports"
              />
            </Search>
          </ContainerButtons>

          <Pagination>
            <PaginationAnt
              current={Number(paginationInfo?.CurrentPage)}
              totalPage={Number(paginationInfo?.TotalCount)}
              pageSizeTotal={Number(paginationInfo?.PageSize)}
              selectPageSize
              handleClick={handlePagination}
              handlePageChange={pageSize => {
                setItemsPerPageCount(pageSize);
              }}
            />
          </Pagination>
        </ContainerPagination>
        <TableList style={{ minWidth: '1400px', minHeight: '140px' }}>
          <TableHead>
            <TableHeadItem
              headerBottomBorder={showHeaderBottom}
              className='minWidth'
              onClick={handleSubstanceGroupSort}
              style={{ zIndex: 12 }}
            >
              <PointerCursor>
                Substance / Group
                {' '}
                {subGrpSortOrder === 'none'
                  ? <BsArrowDownUp />
                  : subGrpSortOrder === 'ascending'
                    ? <BsArrowUp />
                    : <BsArrowDown />}
              </PointerCursor>
            </TableHeadItem>
            <TableHeadItem headerBottomBorder={showHeaderBottom} style={{ width: '120px', zIndex: 11 }}>
              <PaddingDiv>Agency</PaddingDiv>
            </TableHeadItem>
            <TableHeadItem headerBottomBorder={showHeaderBottom} className='minWidth' style={{ zIndex: 10 }}>
              <PaddingDiv>Legislation / Regulation</PaddingDiv>
            </TableHeadItem>
            <TableHeadItem headerBottomBorder={showHeaderBottom} style={{ width: '80px', zIndex: 9 }}>
              <PaddingDiv>Impacted Toyota Region</PaddingDiv>
            </TableHeadItem>
            <TableHeadItem headerBottomBorder={showHeaderBottom} style={{ width: '165px', zIndex: 8 }}>
              <PaddingDiv>Application Area</PaddingDiv>
            </TableHeadItem>
            <TableHeadItem headerBottomBorder={showHeaderBottom} style={{ width: '108px', zIndex: 7 }}>
              <PaddingDiv className="middle-center-flex-text">Phase (A)</PaddingDiv>
            </TableHeadItem>
            <TableHeadItem headerBottomBorder={showHeaderBottom} style={{ width: '108px', zIndex: 6 }}>
              <ImpactDiv><ImpactInnerDiv>Impact</ImpactInnerDiv></ImpactDiv>
              <PaddingDiv className="middle-center-text">Level of Restriction (B)</PaddingDiv>
            </TableHeadItem>
            <TableHeadItem headerBottomBorder={showHeaderBottom} style={{ width: '108px', zIndex: 3 }}>
              <ImpactDivDummy>Impact</ImpactDivDummy>
              <PaddingDiv className="middle-center-text">Resources Impact (C)</PaddingDiv>
            </TableHeadItem>
            <TableHeadItem headerBottomBorder={showHeaderBottom} style={{ width: '108px', zIndex: 2 }}>
              <ImpactDivDummy>Impact</ImpactDivDummy>
              <PaddingDiv className="middle-center-text">Development (D)</PaddingDiv>
            </TableHeadItem>
            <TableHeadItem headerBottomBorder={showHeaderBottom} style={{ width: '108px', zIndex: 1 }} className="no-right-border">
              <ImpactDivDummy>Impact</ImpactDivDummy>
              <PaddingDiv style={{ width: '85px' }} className="middle-center-text">Evaluation (E)</PaddingDiv>
            </TableHeadItem>
            <TableHeadItem headerBottomBorder={showHeaderBottom} style={{ width: '85px', zIndex: 7 }} className="border-left" onClick={() => appAreaFilters != 5 ? handleFirstPrioritySort() : null}>
              <PrioritySort>
                Priority
                {appAreaFilters != 5 ? prioritySortOrder === 'lowToHigh'
                  ? <BsArrowUp />
                  : <BsArrowDown /> : null}
              </PrioritySort>
            </TableHeadItem>
            {(appAreaFilters === 5) &&
              <TableHeadItem headerBottomBorder={showHeaderBottom} style={{ width: '85px', zIndex: 14 }} onClick={handlePrioritySort}>
                <PointerCursor>
                  Overall Priority
                  {' '}
                  {prioSortOrder === 'none'
                    ? <BsArrowDownUp />
                    : prioSortOrder === 'highToLow'
                      ? <BsArrowDown />
                      : <BsArrowUp />}
                </PointerCursor>
              </TableHeadItem>}
            <TableHeadItem headerBottomBorder={showHeaderBottom} style={{ width: '95px' }} className="no-right-border" />
          </TableHead>
          {tableLoading ? (
            <ContainerLoading><Spin /></ContainerLoading>
          ) : null}
          <TableBody>
            {priorityReportDataOrg?.length > 0 || priorityReportDataOrg !== undefined ? (
              priorityReportDataOrg.map((impactAssessment, index) => {
                const array: any[] = [];
                let parseSubstanceHeader = true;
                let parseImpactAssessmentHeader = true;
                let parseViewImpAssessment = true;
                const toyotaRegionId = getToyotaRegionId(impactAssessment.toyotaRegion)

                const colorLevelOverall = getColorLevelOverall(impactAssessment.priorityRank)

                const impactAssessmentRows = impactAssessment.rows;
                impactAssessmentRows.forEach(row => {
                  const colorLevel = getColorLevelOverall(row.priorityRank)
                  array.push(
                    <TableRow>
                      {parseSubstanceHeader ? renderSubstanceHtml(impactAssessment, index, appAreaFilters, rowSpanCalc) : null}
                      {parseImpactAssessmentHeader ? renderAgencyHtml(impactAssessment, index, rowSpanCalc) : null}
                      <TableItem>{row.applicationArea}</TableItem>
                      <TableItem
                        style={{
                          verticalAlign: 'middle',
                          textAlign: 'center'
                        }}
                      >
                        {impactAssessment.phase}
                      </TableItem>
                      <TableItem
                        highlightCell={row.highLightB && highlightValues}
                        style={{
                          verticalAlign: 'middle',
                          textAlign: 'center'
                        }}
                      >
                        {row.restrictionLevel}
                      </TableItem>
                      <TableItem
                        highlightCell={row.highLightC && highlightValues}
                        style={{
                          verticalAlign: 'middle',
                          textAlign: 'center'
                        }}
                      >
                        {row.resourcesImpact}
                      </TableItem>
                      <TableItem
                        highlightCell={row.highLightD && highlightValues}
                        style={{
                          verticalAlign: 'middle',
                          textAlign: 'center'
                        }}
                      >
                        {row.dev}
                      </TableItem>
                      <TableItem
                        highlightCell={row.highLightE && highlightValues}
                        style={{
                          verticalAlign: 'middle',
                          textAlign: 'center'
                        }}
                        className="middle-center-text"
                      >
                        {row.evalTime}
                      </TableItem>
                      <TableItem
                        style={{
                          backgroundColor: colorLevel,
                          backgroundClip: 'padding-box',
                          color: row.priorityRank === 'Very High'
                            ? 'white'
                            : undefined,
                          verticalAlign: 'middle',
                          textAlign: 'center'
                        }}
                      >
                        {row.priorityRank}
                      </TableItem>
                      {(appAreaFilters === 5) &&
                        (parseImpactAssessmentHeader ? renderPriorityRankHtml(impactAssessment, colorLevelOverall, rowSpanCalc) : null)}
                      {parseViewImpAssessment ? renderViewImpAssessment(impactAssessment, toyotaRegionId, index, priorityReportData, rowSpanCalc) : null}
                    </TableRow>
                  );

                  parseSubstanceHeader = false;
                  parseImpactAssessmentHeader = false;
                  parseViewImpAssessment = false;
                })
                return (index !== priorityReportData?.length - 1 ? [...array, ...renderDummyArray(appAreaFilters)] : array);
              })
            ) : (
              <TableItem
                colSpan={appAreaFilters === 5 ? 13 : 12}
                style={{
                  verticalAlign: 'middle',
                  textAlign: 'center'
                }}
                className="no-top-border no-right-border"
              >
                No Data Available
              </TableItem>
            )}
          </TableBody>
        </TableList>
      </ContainerTable>
      <Pagination>
        <PaginationAnt
          current={Number(paginationInfo?.CurrentPage)}
          totalPage={Number(paginationInfo?.TotalCount)}
          pageSizeTotal={Number(paginationInfo?.PageSize)}
          selectPageSize
          handleClick={handlePagination}
          handlePageChange={pageSize => {
            setItemsPerPageCount(pageSize);
          }}
        />
      </Pagination>
    </Container>
  )

  function renderSubstanceHtml(impactAssessment, index, applicationAreaFilters, rowSpan) {
    return <TableItem rowSpan={rowSpan}>
      {impactAssessment.isSubstance
        ?
        <Link href={`/substance/${impactAssessment.id}`}>
          <TextLink>
            <MultiLineDots
              onMouseEnter={(e) => {
                const tooltip = document.getElementById(`sub-${index}`);
                tooltip!.style.opacity = '1';
                tooltip!.style.visibility = 'visible';
                tooltip!.style.transform = 'scale(1)';
              }}
              onMouseLeave={(e) => {
                const tooltip = document.getElementById(`sub-${index}`);
                tooltip!.style.opacity = '0';
                tooltip!.style.visibility = 'hidden';
                tooltip!.style.transform = 'scale(0.2)';
              }}
              showLess={applicationAreaFilters !== 5}
            >
              {impactAssessment.name}
            </MultiLineDots>
          </TextLink>
        </Link>
        : <MultiLineDots
          onMouseEnter={(e) => {
            const tooltip = document.getElementById(`sub-${index}`);
            tooltip!.style.opacity = '1';
            tooltip!.style.visibility = 'visible';
            tooltip!.style.transform = 'scale(1)';
          }}
          onMouseLeave={(e) => {
            const tooltip = document.getElementById(`sub-${index}`);
            tooltip!.style.opacity = '0';
            tooltip!.style.visibility = 'hidden';
            tooltip!.style.transform = 'scale(0.2)';
          }}
          showLess={applicationAreaFilters !== 5}
        >
          {impactAssessment.name}
        </MultiLineDots>}
      <ToolTipPanel>
        <ToolTipName id={`sub-${index}`}>
          {impactAssessment.name}
        </ToolTipName>
      </ToolTipPanel>
    </TableItem>
  }

  function renderViewImpAssessment(impactAssessment, toyotaRegionId, index, priorityReportData, rowSpanCalc) {
    return <TableItem
      bottomLast={index === priorityReportData?.length - 1}
      rowSpan={rowSpanCalc}
      className='no-right-border'
      style={{
        backgroundClip: 'padding-box',
        verticalAlign: 'middle',
        textAlign: 'center',
        width: '100px'
      }}
    >
      {impactAssessment.isSubstance ?
        <DupLink>
          <Link
            onClick={
              impactAssessment.isSubstance
                ? (e) => {
                  setViewImpactAssessment(true);
                  setImpactAssessmentData({
                    rows: impactAssessment?.rowsForEdit || impactAssessment?.rows,
                    phase: impactAssessment?.phase,
                    updatedAt: impactAssessment?.updatedAt,
                    regulation: impactAssessment?.regulation,
                    impactAssessmentId: impactAssessment?.impactAssessmentId,
                    casNumber: impactAssessment?.casNumber,
                    commonName: impactAssessment?.commonName,
                    substanceId: impactAssessment?.id,
                    toyotaRegionId: getToyotaRegionId(impactAssessment.toyotaRegion)
                  });
                } : undefined
            } href="#">View Impact Assessment</Link>
        </DupLink> :
        <Link href={`/view-impact-assessment-group/${impactAssessment?.id}/${toyotaRegionId}`}>
          View Impact Assessment
        </Link>
      }
    </TableItem>
  }

  function renderAgencyHtml(impactAssessment, index, rowSpanCalc) {
    return <>
      <TableItem rowSpan={rowSpanCalc}>
        {impactAssessment.agency}
      </TableItem>
      <TableItem rowSpan={rowSpanCalc}>
        <Link href={
          impactAssessment.regulation.recordType === 1
            ? `/regulation/${impactAssessment.regulation.id}`
            : `/legislation/${impactAssessment.regulation.id}`
        }
        >
          <TextLink>
            <MultiLineDots
              onMouseEnter={(e) => {
                const tooltip = document.getElementById(`reg-${index}`);
                tooltip!.style.opacity = '1';
                tooltip!.style.visibility = 'visible';
                tooltip!.style.transform = 'scale(1)';
              }}
              onMouseLeave={(e) => {
                const tooltip = document.getElementById(`reg-${index}`);
                tooltip!.style.opacity = '0';
                tooltip!.style.visibility = 'hidden';
                tooltip!.style.transform = 'scale(0.2)';
              }}
              showLess={appAreaFilters !== 5}
            >
              {impactAssessment.regulation?.nickname ? impactAssessment.regulation?.nickname : impactAssessment.regulation?.recordType === 2 ? `${impactAssessment.regulation?.billTitle} ${impactAssessment.regulation?.year}` : impactAssessment.regulation?.billTitle}
            </MultiLineDots>
          </TextLink>
        </Link>
        <ToolTipPanel>
          <ToolTipName id={`reg-${index}`}>
          {impactAssessment.regulation?.nickname ? impactAssessment.regulation?.nickname : impactAssessment.regulation?.recordType === 2 ? `${impactAssessment.regulation?.billTitle} ${impactAssessment.regulation?.year}` : impactAssessment.regulation?.billTitle}
          </ToolTipName>
        </ToolTipPanel>
      </TableItem>
      <TableItem rowSpan={rowSpanCalc}>
        {impactAssessment.toyotaRegion}
      </TableItem>
    </>
  }

  function renderPriorityRankHtml(impactAssessment, colorLevelOverall, rowSpanCalc) {
    return <TableItem
      rowSpan={rowSpanCalc}
      style={{
        backgroundColor: colorLevelOverall,
        backgroundClip: 'padding-box',
        verticalAlign: 'middle',
        textAlign: 'center',
        color: impactAssessment.priorityRank === 'Very High'
          ? 'white'
          : undefined
      }}
    >
      {impactAssessment.priorityRank}
    </TableItem>
  }
  function renderDummyArray(appAreaFilters) {
    return [<DummyTableRow>
      <DummyTableItem />
      <DummyTableItem />
      <DummyTableItem />
      <DummyTableItem />
      <DummyTableItem />
      <DummyTableItem />
      <DummyTableItem />
      <DummyTableItem />
      <DummyTableItem />
      <DummyTableItem />
      <DummyTableItem />
      {(appAreaFilters === 5) && <DummyTableItem />}
      <DummyTableItem />
    </DummyTableRow>]
  }

}

export default PriorityReport;
