/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye } from 'react-icons/fa';
import { Spin, Empty, Button, Row, Col, Radio } from 'antd';
import Moment from 'moment';
import Link from '../../components/Link';
import Pagination from '../../components/Pagination';
import ScrollTopButton from '../../components/ScrollTopButton';
import Tabs from '../../components/Tabs';
import MultiTabsRegion from '../../components/Tags';
import impactTabs from '../../mocks/impact-tabs';
import selectByTabs from '../../mocks/select-by-tabs';
import recentViewTabs from '../../mocks/recent-view-tabs';
import {
  clearUpdatesRegulation,
  selectors,
  updatesRegulationRequest,
  updatesSubstanceRequest,
  recentlyViewRequest
} from '../../store/modules/homePage/actions';
import loadUserDataOnStorage from '../../utils/userData';

import {
  Container,
  ContainerUpdates,
  ContainerTable,
  TableBody,
  TableHead,
  TableHeadItem,
  TableItem,
  TableList,
  TableRow,
  Title,
  TitleContainer,
  ContainerTabs,
  ContainerLine,
  NameRegLeg,
  ContainerPagination,
  ContainerLoadingTable,
  ContainerSpin,
  ContainerEmpty,
  RecentViewBox,
  RecentViewText,
  NoRecentView,
  RecentViewSpin
} from './styled';
import ViewLegRegSubstanceModal from '../../components/Modal/ViewLegRegSubstanceModal';
import ConfirmationModal from '../../components/Modal/ConfirmationModal';
import { deleteRegulatoryUpdatesRecordRequest } from '../../store/modules/regulatoryUpdates/actions';
import Confirmation from '../../components/Modal/Confirmation';
import { deleteRegulatoryUpdate } from '../../services/api';
import { translate } from '../../locales';
import { ToastSuccess } from '../../components/Toast';

interface ParamsType {
  pageNumber: number;
  regions: string;
  startDate: string;
  endDate: string;
  recordType?: number;
}

const Main: React.FC = () => {
  const [activeIndex] = useState(0);
  const [loadingPriority, setLoadingPriority] = useState(true);
  const [regionsPriorityRank, setRegionsPriorityRank] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRecentView, setLoadingRecentView] = useState(true);
  const [ViewLegRegModal, setViewLegRegModal] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [regionsUpdates, setRegionsUpdates] = useState<any>([]);
  const [switchUpdates, setSwitchUpdates] = useState(
    Number(localStorage.getItem('homeUpdateTabs')) || 3
  );
  const [updatesRegulationWithContent, setUpdatesRegulationWithContent]: any =
    useState([]);
  const [tabsWithContent, setTabsWithContent]: any = useState([]);
  const [updatesSubstanceWithContent, setUpdatesSubstanceWithContent]: any =
    useState([]);
  const path = window.location.pathname;
  const substancePriorityRank: any = useSelector(
    selectors.priorityRankSubstance
  );
  const updatesSubstance: any = useSelector(selectors.updatesSubstance);
  const updatesRegulation: any = useSelector(selectors.updatesRegulation);
  const recentlyView: any = useSelector(selectors.recentlyView);
  const paginationInfo = useSelector(selectors.updatesPaginationInfo);
  const substanceId = Number(path.substring(path.lastIndexOf('/') + 1));
  const dispatch = useDispatch();
  const [selectedIdForDetails, setSelectedIdForDetails] = useState();
  const [selectedSubstance, setSelectedSubstance] = useState<any>();
  const [recentViewTab, setRecentViewTab] = useState(
    Number(localStorage.getItem('recentTab')) || 1
  );
  const [type, setType] = useState(1);
  const [selectedUpdateId, setSelectedUpdateId] = useState();
  const [isUpdatedDeleted, setIsUpdatedDeleted] = useState(false);

  useEffect(() => {
    loadUserDataOnStorage();
  }, []);

  const handlePagination = page => {
    const regions = regionsUpdates.map(region => {
      return region['id'];
    });
    const params: any = {
      regions: regions.toString(),
      startDate: Moment().subtract(30, 'days').format('YYYY-MM-DD'),
      endDate: Moment().format('YYYY-MM-DD')
    };
    params.pageNumber = page;
    loadData(params);
  };

  useEffect(() => {
    const regions =
      regionsUpdates.length > 0
        ? regionsUpdates.map(region => {
            return region['id'].toString();
          })
        : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const params: ParamsType = {
      pageNumber: 1,
      regions: regions.toString(),
      startDate: Moment().subtract(30, 'days').format('YYYY-MM-DD'),
      endDate: Moment().format('YYYY-MM-DD')
    };
    if (switchUpdates === 3 || switchUpdates === 1) {
      params.recordType = switchUpdates === 3 ? 1 : 2;
    }
    loadData(params);
  }, [regionsUpdates, switchUpdates, isUpdatedDeleted]);

  useEffect(() => {
    loadRecentView();
  }, [recentViewTab, type]);
  useEffect(() => {
    if (recentlyView) {
      setLoadingRecentView(false);
    }
  }, [recentlyView]);

  const loadRecentView = () => {
    setLoadingRecentView(true);
    dispatch(
      recentlyViewRequest({
        recordType: recentViewTab,
        everyone: type === 2
      })
    );
  };

  const loadData = params => {
    setLoading(true);
    setIsUpdatedDeleted(false);
    dispatch(clearUpdatesRegulation());
    if (switchUpdates === 3 || switchUpdates === 1) {
      dispatch(updatesRegulationRequest(params));
    } else {
      dispatch(updatesSubstanceRequest(params));
    }
  };

  useEffect(() => {
    setLoading(true);
    let updatesWithContent: any = [];
    let dataIsReady = false;
    if (switchUpdates === 1 || switchUpdates === 3) {
      const filteredRegulation = updatesRegulation?.data;
      setUpdatesRegulationWithContent(filteredRegulation);
      updatesWithContent = updatesRegulation?.filter.map(x => Number(x));
      dataIsReady = !!filteredRegulation && filteredRegulation?.length > 0;
    }
    if (switchUpdates === 2) {
      const filteredSubstance = updatesSubstance?.data;
      setUpdatesSubstanceWithContent(filteredSubstance);
      updatesWithContent = updatesSubstance?.filter.map(x => Number(x));
      dataIsReady = !!filteredSubstance && filteredSubstance.length > 0;
    }
    setTabsWithContent(
      impactTabs?.map(tab =>
        updatesWithContent?.includes(tab.id) ? tab.id : undefined
      )
    );
    if (dataIsReady) {
      setLoading(false);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [updatesRegulation, updatesSubstance, switchUpdates]);

  useEffect(() => {
    setLoadingPriority(true);
  }, [regionsPriorityRank]);

  useEffect(() => {
    setLoadingPriority(false);
  }, [substancePriorityRank]);

  const handleClose = async action => {
    if (action === 'yes') {
      const response = await deleteRegulatoryUpdate({ id: selectedUpdateId });
      if (response.status === 200) {
        setIsUpdatedDeleted(true);
        console.log(switchUpdates);
        ToastSuccess(
          translate('pages.regulatoryUpdates.toastSuccessDeleteRecord')
        );
        setIsUpdatedDeleted(true);
      }
      setViewLegRegModal(false);
    }
    setConfirmOpen(false);
  };

  return (
    <>
      <Container>
        <ScrollTopButton />
        <Row gutter={10}>
          <Col md={24} lg={24} xl={18}>
            <ContainerLine>
              <ContainerUpdates>
                <TitleContainer>
                  <Title>Updates</Title>
                </TitleContainer>
                <ContainerTabs>
                  <MultiTabsRegion
                    tabsWithContent={tabsWithContent}
                    key={activeIndex}
                    substanceId={substanceId}
                    value={impactTabs}
                    disableTags={false}
                    selectedTabs={regionsUpdates}
                    onTabClick={(data: any) => {
                      setRegionsUpdates(data);
                    }}
                  />
                </ContainerTabs>

                <Tabs
                  type="card"
                  activeKey={switchUpdates.toString()}
                  items={selectByTabs}
                  onChange={(newActiveKey: string) => {
                    setSwitchUpdates(Number(newActiveKey));
                    localStorage.setItem('homeUpdateTabs', newActiveKey);
                    setRegionsUpdates([]);
                  }}
                />

                <ContainerTable>
                  <ContainerPagination>
                    <Pagination
                      pageSizeTotal={20}
                      current={paginationInfo?.CurrentPage}
                      totalPage={paginationInfo?.TotalCount}
                      handleClick={handlePagination}
                    />
                  </ContainerPagination>
                  <TableList>
                    {switchUpdates === 1 && (
                      <>
                        <TableHead>
                          <TableRow>
                            <TableHeadItem className="regleg-line">
                              Legislation
                            </TableHeadItem>
                            <TableHeadItem>Update</TableHeadItem>
                            <TableHeadItem
                              style={{ width: '90px' }}
                              className="date-line"
                            >
                              Announcement Date
                            </TableHeadItem>
                            <TableHeadItem
                              style={{ width: '90px' }}
                              className="date-line"
                            >
                              Due Date
                            </TableHeadItem>
                            <TableHeadItem style={{ width: '100px' }}>
                              Action
                            </TableHeadItem>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {updatesRegulationWithContent?.length > 0 ? (
                            updatesRegulationWithContent?.map(regulation => {
                              const array: any[] = [];
                              let parseReg = true;
                              const countReg =
                                regulation.RegulationUpdates.length;
                              // Determine the display text based on the recordType and nickname presence
                              const displayName = (() => {
                                if (regulation.recordType === 2) {
                                  return regulation.nickname
                                    ? regulation.nickname.length > 65
                                      ? `${regulation.nickname.slice(0, 65)}...`
                                      : regulation.nickname
                                    : `${regulation.billTitle} ${regulation.year}`; // Show billTitle + year for recordType 2 if no nickname
                                }
                                if (regulation.recordType === 1) {
                                  return regulation.nickname
                                    ? regulation.nickname.length > 65
                                      ? `${regulation.nickname.slice(0, 65)}...`
                                      : regulation.nickname
                                    : regulation.billTitle; // Show only billTitle for recordType 1 if no nickname
                                }
                                return '';
                              })();

                              // Create the regulation HTML
                              const regHtml = (
                                <TableItem
                                  className="regleg-line"
                                  rowSpan={countReg}
                                >
                                  <Link href={`legislation/${regulation.id}`}>
                                    <NameRegLeg>{displayName}</NameRegLeg>
                                  </Link>
                                </TableItem>
                              );
                              regulation.RegulationUpdates.forEach(update => {
                                array.push(
                                  <TableRow>
                                    {parseReg ? regHtml : null}
                                    <TableItem>
                                      {update.comment.length > 400
                                        ? `${update.comment
                                            .slice(0, 400)
                                            .replace(/\s\w*$/, '')}...`
                                        : update.comment}
                                    </TableItem>
                                    <TableItem className="date-line">
                                      {Moment(update.agencyDate).format(
                                        process.env.REACT_APP_DATE_FORMAT
                                      )}
                                    </TableItem>
                                    <TableItem className="date-line">
                                      {update.toyotaDueDate
                                        ? Moment(update.toyotaDueDate).format(
                                            process.env.REACT_APP_DATE_FORMAT
                                          )
                                        : ''}
                                    </TableItem>
                                    <TableItem>
                                      <Button
                                        onClick={() => {
                                          setViewLegRegModal(true);
                                          setSelectedIdForDetails(update?.id);
                                          setSelectedSubstance(0);
                                        }}
                                      >
                                        {' '}
                                        <FaEye />
                                      </Button>
                                    </TableItem>
                                  </TableRow>
                                );
                                parseReg = false;
                              });
                              return array;
                            })
                          ) : (
                            <ContainerEmpty>
                              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            </ContainerEmpty>
                          )}
                        </TableBody>
                      </>
                    )}

                    {switchUpdates === 3 && (
                      <>
                        <TableHead>
                          <TableRow>
                            <TableHeadItem className="regleg-line">
                              Regulation
                            </TableHeadItem>
                            <TableHeadItem>Update</TableHeadItem>
                            <TableHeadItem
                              style={{ width: '90px' }}
                              className="date-line"
                            >
                              Announcement Date
                            </TableHeadItem>
                            <TableHeadItem
                              style={{ width: '90px' }}
                              className="date-line"
                            >
                              Due Date
                            </TableHeadItem>
                            <TableHeadItem style={{ width: '100px' }}>
                              Action
                            </TableHeadItem>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {updatesRegulationWithContent?.length > 0 ? (
                            updatesRegulationWithContent?.map(regulation => {
                              const array: any[] = [];
                              let parseReg = true;
                              const countReg =
                                regulation.RegulationUpdates.length;

                              // Determine the display text based on the recordType and nickname presence
                              const displayName = (() => {
                                if (regulation.recordType === 2) {
                                  return regulation.nickname
                                    ? regulation.nickname.length > 65
                                      ? `${regulation.nickname.slice(0, 65)}...`
                                      : regulation.nickname
                                    : `${regulation.billTitle} ${regulation.year}`; // Show billTitle + year for recordType 2 if no nickname
                                }
                                if (regulation.recordType === 1) {
                                  return regulation.nickname
                                    ? regulation.nickname.length > 65
                                      ? `${regulation.nickname.slice(0, 65)}...`
                                      : regulation.nickname
                                    : regulation.billTitle; // Show only billTitle for recordType 1 if no nickname
                                }
                                return '';
                              })();

                              // Create the regulation HTML
                              const regHtml = (
                                <TableItem
                                  className="regleg-line"
                                  rowSpan={countReg}
                                >
                                  <Link href={`regulation/${regulation.id}`}>
                                    <NameRegLeg>{displayName}</NameRegLeg>
                                  </Link>
                                </TableItem>
                              );
                              regulation.RegulationUpdates.forEach(update => {
                                array.push(
                                  <TableRow>
                                    {parseReg ? regHtml : null}
                                    <TableItem>
                                      {update.comment.length > 400
                                        ? `${update.comment
                                            .slice(0, 400)
                                            .replace(/\s\w*$/, '')}...`
                                        : update.comment}
                                    </TableItem>
                                    <TableItem className="date-line">
                                      {Moment(update.agencyDate).format(
                                        process.env.REACT_APP_DATE_FORMAT
                                      )}
                                    </TableItem>
                                    <TableItem className="date-line">
                                      {update.toyotaDueDate
                                        ? Moment(update.toyotaDueDate).format(
                                            process.env.REACT_APP_DATE_FORMAT
                                          )
                                        : ''}
                                    </TableItem>
                                    <TableItem>
                                      <Button
                                        onClick={() => {
                                          setViewLegRegModal(true);
                                          setSelectedIdForDetails(update?.id);
                                          setSelectedSubstance(0);
                                        }}
                                      >
                                        {' '}
                                        <FaEye />
                                      </Button>
                                    </TableItem>
                                  </TableRow>
                                );
                                parseReg = false;
                              });
                              return array;
                            })
                          ) : (
                            <ContainerEmpty>
                              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            </ContainerEmpty>
                          )}
                        </TableBody>
                      </>
                    )}

                    {switchUpdates === 2 && (
                      <>
                        <TableHead>
                          <TableRow>
                            <TableHeadItem className="subst-line">
                              Substance
                            </TableHeadItem>
                            <TableHeadItem className="regleg-line">
                              Legislation / Regulation
                            </TableHeadItem>
                            <TableHeadItem>Update</TableHeadItem>
                            <TableHeadItem
                              style={{ width: '90px' }}
                              className="date-line"
                            >
                              Announcement Date
                            </TableHeadItem>
                            <TableHeadItem
                              style={{ width: '90px' }}
                              className="date-line"
                            >
                              Due Date
                            </TableHeadItem>
                            <TableHeadItem style={{ width: '100px' }}>
                              Action
                            </TableHeadItem>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {updatesSubstanceWithContent?.length > 0 ? (
                            updatesSubstanceWithContent.map(substance => {
                              const array: any[] = [];
                              let parseReg;
                              let parseSub = true;
                              const countSub = substance.Regulations.reduce(
                                (countReg, currentReg) =>
                                  countReg +
                                  currentReg.RegulationUpdates.length,
                                0
                              );

                              let substUrl = '';

                              if (substance.recordType === 1) {
                                substUrl = `substance/${substance.id}`;
                              }

                              const subHtml = (
                                <TableItem
                                  className="subst-line"
                                  rowSpan={countSub}
                                >
                                  <Link href={substUrl}>
                                    {substance.casNumber} •{' '}
                                    {substance.commonName}
                                  </Link>
                                </TableItem>
                              );

                              substance.Regulations.forEach(regulation => {
                                parseReg = true;
                                const countReg =
                                  regulation.RegulationUpdates.length;
                                let regLegSubstUrl = '';

                                if (regulation.recordType === 1) {
                                  regLegSubstUrl = `regulation/${regulation.id}`;
                                } else {
                                  regLegSubstUrl = `legislation/${regulation.id}`;
                                }

                                // Determine the display text based on the recordType and nickname presence
                                const displayName = (() => {
                                  if (regulation.recordType === 2) {
                                    return regulation.nickname
                                      ? regulation.nickname.length > 65
                                        ? `${regulation.nickname.slice(
                                            0,
                                            65
                                          )}...`
                                        : regulation.nickname
                                      : `${regulation.billTitle} ${regulation.year}`; // Show billTitle + year for recordType 2 if no nickname
                                  }
                                  if (regulation.recordType === 1) {
                                    return regulation.nickname
                                      ? regulation.nickname.length > 65
                                        ? `${regulation.nickname.slice(
                                            0,
                                            65
                                          )}...`
                                        : regulation.nickname
                                      : regulation.billTitle; // Show only billTitle for recordType 1 if no nickname
                                  }
                                  return '';
                                })();

                                // Create the regulation HTML
                                const regHtml = (
                                  <TableItem
                                    className="regleg-line"
                                    rowSpan={countReg}
                                  >
                                    <Link href={regLegSubstUrl}>
                                      <NameRegLeg>{displayName}</NameRegLeg>
                                    </Link>
                                  </TableItem>
                                );
                                regulation.RegulationUpdates.forEach(update => {
                                  array.push(
                                    <TableRow>
                                      {parseSub ? subHtml : null}
                                      {parseReg ? regHtml : null}
                                      <TableItem>{update.comment}</TableItem>
                                      <TableItem className="date-line">
                                        {Moment(update.agencyDate).format(
                                          process.env.REACT_APP_DATE_FORMAT
                                        )}
                                      </TableItem>
                                      <TableItem className="date-line">
                                        {update.toyotaDueDate
                                          ? Moment(update.toyotaDueDate).format(
                                              process.env.REACT_APP_DATE_FORMAT
                                            )
                                          : ''}
                                      </TableItem>
                                      <TableItem>
                                        <Button
                                          onClick={() => {
                                            setViewLegRegModal(true);
                                            setSelectedIdForDetails(update?.id);
                                            setSelectedSubstance(substance.id);
                                          }}
                                        >
                                          {' '}
                                          <FaEye />
                                        </Button>
                                      </TableItem>
                                    </TableRow>
                                  );
                                  parseReg = false;
                                  parseSub = false;
                                });
                              });

                              return array;
                            })
                          ) : (
                            <ContainerEmpty>
                              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            </ContainerEmpty>
                          )}
                        </TableBody>
                      </>
                    )}

                    {loading ? (
                      <ContainerLoadingTable id="loading-update">
                        <ContainerSpin>
                          <Spin />
                        </ContainerSpin>
                      </ContainerLoadingTable>
                    ) : null}
                  </TableList>
                  <ContainerPagination>
                    <Pagination
                      pageSizeTotal={20}
                      current={paginationInfo?.CurrentPage}
                      totalPage={paginationInfo?.TotalCount}
                      handleClick={handlePagination}
                    />
                  </ContainerPagination>
                </ContainerTable>
              </ContainerUpdates>
            </ContainerLine>
          </Col>

          <Col md={24} lg={24} xl={6}>
            <TitleContainer>
              <Title>Recently Viewed</Title>
            </TitleContainer>

            <Radio.Group
              onChange={e => {
                setType(e.target.value);
              }}
              value={type}
              style={{ margin: '10px' }}
            >
              <Radio value={1}>By me</Radio>
              <Radio value={2}>By everyone</Radio>
            </Radio.Group>

            <Tabs
              onChange={key => {
                setRecentViewTab(key);
                localStorage.setItem('recentTab', key);
              }}
              activeKey={recentViewTab.toString()}
              type="card"
              items={recentViewTabs}
            />
            <RecentViewBox>
              {recentlyView && recentlyView.length > 0 && (
                <>
                  {recentlyView.map(item => (
                    <Link href={item.url}>
                      <RecentViewText>{item.name}</RecentViewText>
                    </Link>
                  ))}
                </>
              )}
              {loadingRecentView ? (
                <RecentViewSpin>
                  <Spin />
                </RecentViewSpin>
              ) : null}
              {recentlyView && recentlyView.length === 0 && (
                <NoRecentView>
                  No recently viewed pages to display.
                </NoRecentView>
              )}
            </RecentViewBox>
          </Col>
        </Row>
      </Container>

      {ViewLegRegModal && (
        <ViewLegRegSubstanceModal
          open={ViewLegRegModal}
          selectedId={selectedIdForDetails}
          selectedSubstanceId={selectedSubstance}
          handleCancel={() => setViewLegRegModal(false)}
          deleteUpdate={id => {
            console.log(id);
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
    </>
  );
};

export default Main;
