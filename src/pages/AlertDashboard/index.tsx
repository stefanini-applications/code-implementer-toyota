/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Moment from 'moment';


import Button from '../../components/Button';
import DatePicker from '../../components/DatePicker';
import Input from '../../components/Input';
import Link from '../../components/Link';
import Pagination from '../../components/Pagination';
import TableAnt from '../../components/Table';
import Tabs from '../../components/Tabs';
import MultiTabsRegion from '../../components/Tags';
import alertTabs from '../../mocks/alert-tabs';
import jurisdictionTabs from '../../mocks/impact-tabs';
import listingsData from '../../mocks/listings-mock';
import impactTabs from '../../mocks/region-tabs';
import history from '../../routes/history';
import {
    selectors,
    getAlertDashboardRequest,
    actInAlertDashboardRequest
} from '../../store/modules/alertDashboard/actions';
import { Container, ContainerAcknowledge, ContainerDate, ContainerDatePicker, ContainerFilters, ContainerImpactLinks, ContainerJurisdiction, ContainerNameDateAck, ContainerSearch, ContainerTable, ContainerTabs, Label, PaginationContainer, Search, SearchIcon, Title, TitleContainer } from './styled';

const AlertDashboard: React.FC = () => {
    const dispatch = useDispatch();

    const alertDashboardData = useSelector(selectors.alertDashboard);
    const paginationInfo = useSelector(selectors.alertDashboardPagination);

    const [switchTabs, setSwitchTabs] = useState(1);
    const handleTabSwitch = (newActiveKey: string) => {
        setSwitchTabs(Number(newActiveKey));
    };
    const [startDateParam, setStartDateParam] = useState(
        Moment(new Date()).subtract(30, 'days').toDate()
    );
    const [endDateParam, setEndDateParam] = useState(Moment(new Date()).toDate());
    const [activeIndex] = useState(0);
    const [jurisdictionFilters, setJurisdictionFilters] = useState<any>([]);
    const [impactFilters, setImpactFilters] = useState<any>([]);
    const userInput: any = useRef('');
    const [autoFocus, setAutoFocus] = useState(false);
    const [itemsPerPageCount, setItemsPerPageCount] = useState(window.innerHeight > 900 ? 10 : 5);
    const [pageNumber, setPageNumber] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [tableLoading, setTableLoading] = useState(false);
    const userRole = localStorage.getItem('user.role');
    const location = useLocation();

    const handleTabClick = (data: any) => {
        setJurisdictionFilters(data);
    }

    const handleImpactTabClick = (data: any) => {
        setImpactFilters(data);
    }

    const handleUserSearchInput = (value) => {
        userInput.current = value;
        if (!autoFocus) {
            setAutoFocus(true);
        }
        updateAlertDashboardData();
    }

    const handlePagination = (page, size) => {
        setCurrentPage(page);
        setItemsPerPageCount(size);
        updateAlertDashboardData(page, size);
    };

    const updateAlertDashboardData = (page = 1, size = null) => {
        setTableLoading(true);
        const pageSize = size || itemsPerPageCount;
        setCurrentPage(page);

        dispatch(getAlertDashboardRequest({
            type: switchTabs === 1 ? 'ImpactAssessment' : 'Update',
            dataRangeStart: startDateParam
                ? Moment(startDateParam).format('YYYY-MM-DD')
                : '',
            dataRangeEnd: endDateParam
                ? Moment(endDateParam).format('YYYY-MM-DD')
                : '',
            search: userInput.current || '',
            jurisdictions: jurisdictionFilters?.map((juri) => { return juri.id }),
            regions: switchTabs === 1 ? impactFilters?.map((reg) => { return reg.id }) : [],
            pageNumber: page,
            pageSize
        }));
    };

    const handleViewImpactassessment = (record) => {
        history.push(`/view-impact-assessment-group/${record.recordId}/${record.toyotaRegionId || 1}`);
    };

    const handleEditImpactassessment = (record) => {
        const pattern = /&/gi;
        const replacement = "replace_and_char";
        const typeName = record.type?.replace(pattern, replacement);
        const recType = typeName == 'Legislation' ? 2 : 1;
        const typeId = record.typeId?.replace(pattern, replacement);
        const reference = record?.regulationId?.replace(pattern, replacement);
        const toyotaRegionId = record?.toyotaRegionId;
        const splitName = record?.name.split(' • ')
        const casNumber = splitName[0];
        const commName = splitName[1];
        record.regulationId = reference;
        const query = encodeURI(`casNumber=${casNumber}&commonName=${commName}&typeName=${typeName}&type=${recType}&typeId=${typeId || reference}&substance=${record?.recordId}&regulationId=${reference}&region=${toyotaRegionId}`);

        history.push(`/editRecord-impactAssessment/${record.collapseIndex || 1}?${query}`);
    };

    const handleSetAck = (record, ack) => {
        setTableLoading(true);
        dispatch(actInAlertDashboardRequest(
            {
                type: switchTabs === 1 ? 'ImpactAssessment' : 'Update',
                id: record.id,
                action: ack ? 'ack' : 'undo',
            },
            {
                type: switchTabs === 1 ? 'ImpactAssessment' : 'Update',
                dataRangeStart: startDateParam
                    ? Moment(startDateParam).format('YYYY-MM-DD')
                    : '',
                dataRangeEnd: endDateParam
                    ? Moment(endDateParam).format('YYYY-MM-DD')
                    : '',
                search: userInput.current || '',
                jurisdictions: jurisdictionFilters?.map((juri) => { return juri.id }),
                regions: impactFilters?.map((reg) => { return reg.id }),
                pageNumber: currentPage,
                pageSize: itemsPerPageCount,
            }
        ));
    };

    useEffect(() => {
        updateAlertDashboardData();
    }, [dispatch, pageNumber, switchTabs, startDateParam, endDateParam, activeIndex, impactFilters, jurisdictionFilters, itemsPerPageCount, userInput]);

    useEffect(() => {
        setCurrentPage(1);
    }, [switchTabs]);

    useEffect(() => {
        setTableLoading(false);
    }, [alertDashboardData]);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const region = queryParams.get('region') || '';
        const tabId = Number(queryParams.get('tab')) || 1;
        setSwitchTabs(tabId);
        setImpactFilters([impactTabs?.find(tab => tab.tab === decodeURIComponent(region?.toUpperCase())) || []])
        updateAlertDashboardData();
    }, []);

    const getLink = (record) => {
        if (record.type === 'Substance') {
            return `/substance/${record.recordId}`;
        }
        if (record.type === 'Group') {
            return `/group/${record.recordId}`;
        }
        if (record.type === 'RegulationGroup') {
            return `/view-impact-assessment-group/${record.recordId}/${record.toyotaRegionId || 1}`;
        }
        if (record.type === 'Legislation') {
            return `/legislation/${record.regulationId || record.recordId}`;
        }
        if (record.type === 'Regulation') {
            return `/regulation/${record.regulationId || record.recordId}`;
        }
        if (record.type === 'Listing') {
            let listTypeId;
            listingsData.forEach((list) => {
                list.lists.forEach((listItem) => {
                    if (listItem.id === Number(record.recordId)) { listTypeId = listItem.template };
                })
            })
            return `/viewListing/${record.recordId}/${listTypeId}`;
        }
        return '';
    };
    const columnsAlert = [
        {
            title: 'Date',
            dataIndex: 'date',
            width: 120,
            render: (text, record) => {
                return Moment(record.date).format(process.env.REACT_APP_DATE_FORMAT)
            }
        },
        {
            title: 'Substance / Group',
            dataIndex: 'name',
            width: 350,
            render: (text, record) => {
                return record.type === 'RegulationGroup' ? (
                    text
                ) : (
                    <Link href={getLink(record)}>
                        {text}
                    </Link>
                )
            }
        },
        {
            title: 'Jurisdiction',
            dataIndex: 'Jurisdiction',
            key: 'description',
            width: 100,
            render: item => item?.description,
        },
        {
            title: 'Legislation / Regulation',
            dataIndex: 'name',
            width: 185,
            render: (text, record) => {
                return <Link href={`/${record.regulationType}/${record.regulationId}`}>{record.regulationName}</Link>
            }
        },
        {
            title: 'Impacted Toyota Region',
            dataIndex: 'ToyotaRegion',
            key: 'description',
            width: 185,
            render: item => item?.description,
        },
        {
            title: 'Application Area',
            dataIndex: 'ApplicationArea',
            key: 'description',
            width: 175,
            render: item => item?.description,
        },
        {
            title: 'Changelog',
            dataIndex: 'changeLog',
            width: 320,
            render: (text, record) => {
                const replacedText = text.replace(/\\n/g, '<br>');
                return <p dangerouslySetInnerHTML={{ __html: replacedText }} />;
            }
        },
        {
            title: 'User',
            dataIndex: 'username',
            width: 200,
        },
    ];

   /* const columnImpactLinks = {
        title: 'Impact Assessment Links',
        dataIndex: 'impact',
        render: (_, record) => {
            return (
                <ContainerImpactLinks>
                    {record.toyotaRegionId ? record.type === 'Group' || record.type === 'RegulationGroup' ? (<Button text="View Impact Assessment" onClick={() => handleViewImpactassessment(record)} />) : <Button text="Edit Impact Assessment" onClick={() => handleEditImpactassessment(record)} /> : null}
                </ContainerImpactLinks>
            )
        }
    }

    const columnAckChange = {
        title: 'Acknowledgement of Change',
        dataIndex: 'ack',
        render: (_, record) => {
            return (
                <ContainerAcknowledge>
                    <ContainerNameDateAck>
                        {record.ackBy ? (<>{record?.User?.firstName} {record?.User?.lastName}<span>{Moment(record.ackAt).format(process.env.REACT_APP_DATE_FORMAT)}</span></>) : null}
                    </ContainerNameDateAck>
                    {record.ackBy ? (
                        <Button text="Undo" onClick={() => handleSetAck(record, false)} />
                    ) : <Button text="Acknowledge" onClick={() => handleSetAck(record, true)} />}
                </ContainerAcknowledge>
            )
        }
    }
*/


    const columnsAlertRecords = [
        {
            title: 'Date',
            dataIndex: 'date',
            width: 120,
            render: (text, record) => {
                return Moment(record.date).format(process.env.REACT_APP_DATE_FORMAT)
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            width: 350,
            render: (text, record) => {
                return <Link href={getLink(record)}>{text}</Link>
            }
        },
        {
            title: 'Jurisdiction',
            dataIndex: 'Jurisdiction',
            key: 'description',
            width: 100,
            render: item => item?.description,
        },
        {
            title: 'Agency',
            dataIndex: 'agencyName',
            width: 185,
        },
        {
            title: 'Changelog',
            dataIndex: 'changeLog',
            width: 725,
            render: (text, record) => {
                const replacedText = text.replace(/\\n/g, '<br>');
                return <p dangerouslySetInnerHTML={{ __html: replacedText }} />;
            }
        },
        {
            title: 'User',
            dataIndex: 'username',
            width: 200,
        },
    ];

    const columnsTable =
        switchTabs === 1 ?
            userRole === 'Read-Only' ? columnsAlert : [...columnsAlert] :
            userRole === 'Read-Only' ? columnsAlertRecords : [...columnsAlertRecords]


    return (
        <Container>
            <TitleContainer>
                <Title>Changelog</Title>
            </TitleContainer>

            <Tabs fullPage type="card" activeKey={switchTabs.toString()} items={alertTabs} onChange={handleTabSwitch} />

            <ContainerFilters>
                <ContainerDate>
                    <Label>Date range:</Label>
                    <ContainerDatePicker>
                        <DatePicker
                            format={process.env.REACT_APP_DATE_FORMAT}
                            defaultValue={Moment(new Date()).subtract(1, 'days').toDate()}
                            onChange={e => {
                                setStartDateParam(e);
                            }}
                        />
                        <p> to: </p>
                        <DatePicker
                            format={process.env.REACT_APP_DATE_FORMAT}
                            defaultValue={Moment(new Date()).toDate()}
                            onChange={e => {
                                setEndDateParam(e);
                            }}
                        />
                    </ContainerDatePicker>
                </ContainerDate>

                <ContainerJurisdiction>
                    <Label>Jurisdiction</Label>
                    <ContainerTabs>
                        <MultiTabsRegion
                            tabsWithContent={jurisdictionTabs.map(tab => tab.id)}
                            key={activeIndex}
                            value={jurisdictionTabs}
                            selectedTabs={jurisdictionFilters}
                            disableTags={false}
                            onTabClick={handleTabClick}
                            substanceId={1}
                        />
                    </ContainerTabs>
                </ContainerJurisdiction>
                {switchTabs === 1 ? (
                    <ContainerJurisdiction>
                        <Label>Impacted Toyota Region</Label>
                        <ContainerTabs>
                            <MultiTabsRegion
                                tabsWithContent={impactTabs.map(tab => tab.id)}
                                key={activeIndex}
                                value={impactTabs}
                                selectedTabs={impactFilters}
                                disableTags={false}
                                onTabClick={handleImpactTabClick}
                                substanceId={1}
                            />
                        </ContainerTabs>
                    </ContainerJurisdiction>
                ) : null}

                <ContainerSearch>
                    <Search>
                        <Input
                            className="sub-search-component"
                            type="text"
                            onChangeInput={handleUserSearchInput}
                            prefixIcon={<SearchIcon />}
                            defaultText={userInput.current}
                            autoFocus={autoFocus}
                            placeholder="Search for changes..."
                        />
                    </Search>

                    <PaginationContainer>
                        <Pagination
                            current={currentPage}
                            totalPage={paginationInfo?.TotalCount}
                            pageSizeTotal={itemsPerPageCount}
                            defaultPageSize={10}
                            selectPageSize
                            handleClick={handlePagination}
                            pageSizeOptions={[5, 10, 15, 25, 50, 100]}
                            handlePageChange={pageSize => {
                                setItemsPerPageCount(pageSize);
                            }}
                        />
                    </PaginationContainer>
                </ContainerSearch>
            </ContainerFilters>

            <ContainerTable>
                <TableAnt
                    rowKey="id"
                    columnsTable={columnsTable}
                    dataTable={alertDashboardData}
                    loading={tableLoading}
                />
            </ContainerTable>

            <PaginationContainer>
                <Pagination
                    current={currentPage}
                    totalPage={paginationInfo?.TotalCount}
                    pageSizeTotal={itemsPerPageCount}
                    defaultPageSize={10}
                    selectPageSize
                    handleClick={handlePagination}
                    pageSizeOptions={[5, 10, 15, 25, 50, 100]}
                    handlePageChange={pageSize => {
                        setItemsPerPageCount(pageSize);
                    }}
                />
            </PaginationContainer>
        </Container>
    );
}

export default AlertDashboard;
