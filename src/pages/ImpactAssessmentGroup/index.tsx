import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Spin, Tooltip } from 'antd';

import Button from '../../components/Button';
import Input from '../../components/Input';
import ModalAttachmentsIA from '../../components/Modal/ModalAttachmentsIA';
import Pagination from '../../components/Pagination'
import TabsAnt from '../../components/Tabs'
import {
  getImpactAssessmentByGroupRequest,
  selectors
} from '../../store/modules/impactAssessment/actions';
import {
  Container,
  ContainerTable,
  TableList,
  TableHead,
  TableBody,
  TableRow,
  TableItem,
  TableHeadItem,
  TitleContainer,
  Title,
  TableNumber,
  TableComment,
  ContainerTableActions,
  ContainerLoading,
  ContainerSubstanceName,
  ContainerAntTabs,
  ContainerPagination,
  Wrapper,
  InputWrapper,
  LabelInfo,
  SelectWrapper,
  DropdownContainer,
  Search,
  SearchIcon,
  AttachmentsButtonContainer,
  AttachmentsCount,
  ContainerPaginationTable
} from './styled';
import PaginationSearch from '../../components/PaginationSearch';

const ImpactAssessmentGroup: React.FC = () => {
  const dispatch = useDispatch();
  const userInput: any = useRef('');
  const [openAttachments, setOpenAttachments] = useState(false);
  const [autoFocus, setAutoFocus] = useState(false);
  const [loadingTable, setLoadingTable] = useState(true);
  const [controlRun, setControlRun] = useState(0);
  const groupData = useSelector(selectors.impactAssessmentByGroup);
  const [itemsPerPageCount, setItemsPerPageCount] = useState(window.innerHeight > 900 ? 10 : 5);
  const [currentPage, setCurrentPage] = useState(1);
  const paginationInfo = useSelector(selectors.impactAssessmentGroupPaginationInfo);
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [search, setSearch] = useState('');

  const path = window.location.pathname;
  const splitedPath = path.split('/');
  const groupId = Number(splitedPath[2]);
  const toyotaRegionId = Number(splitedPath[3]);

  const groupDataImpactAssessment = groupData?.impactAssessment;
  const firstSubstanceId = groupData?.substances?.length > 0 ? groupData?.substances?.[0]?.id : null;

  let colorLevel;
  switch (groupDataImpactAssessment?.priorityRank) {
    case 'Low':
      colorLevel = '#FAE6DA';
      break;
    case 'Medium':
      colorLevel = '#F1B196';
      break;
    case 'High':
      colorLevel = '#E97354';
      break;
    case 'Very High':
      colorLevel = '#BB2F29';
      break;
    default:
      colorLevel = '#C6E0B8';
      break;
  }

  const items = [
    {
      label: 'Articles (Parts / Vehicle)',
      key: '1',
    },
    {
      label: 'Operations - Direct',
      key: '2'
    },
    {
      label: 'Operations - Indirect',
      key: '3',
    },
    {
      label: 'Service Products',
      key: '4',
    }
  ]

  useEffect(() => {
    if (openAttachments === false) {
      setLoadingTable(true);
      setControlRun(1);
      dispatch(getImpactAssessmentByGroupRequest({
        pageNumber: 1,
        pageSize: itemsPerPageCount,
        groupId,
        toyotaRegionId,
        applicationAreaId: activeTabKey,
        searchText: search,
      }))
    }
  }, [activeTabKey, openAttachments])

  useEffect(() => {
    setLoadingTable(true);
  }, [getImpactAssessmentByGroupRequest]);


  const onChangeTab = (key: string) => {
    setActiveTabKey(key);
    setControlRun(1);
  };

  const handlePagination = (page, size) => {
    setCurrentPage(page)
    dispatch(
      getImpactAssessmentByGroupRequest({
        pageNumber: page,
        pageSize: size,
        groupId,
        toyotaRegionId,
        applicationAreaId: activeTabKey,
        searchText: search,
      })
    );
    setLoadingTable(true)
    setControlRun(1);
  };

  useEffect(() => {
    setControlRun(controlRun + 1);
    if (controlRun === 1) {
      setLoadingTable(false);
    }
  }, [groupData])

  const handleUserSearchInput = (value) => {
    setLoadingTable(true);
    setControlRun(1);
    setSearch(value)
    dispatch(
      getImpactAssessmentByGroupRequest({
        searchText: value,
        pageNumber: 1,
        pageSize: itemsPerPageCount,
        groupId,
        toyotaRegionId,
        applicationAreaId: activeTabKey
      })
    );
    userInput.current = value;

    if (!autoFocus) {
      setAutoFocus(true);
    }
  }

  return (
    <>
      <Container>
        <TitleContainer>
          <Title>Impact Assessment for {groupData.name}</Title>
        </TitleContainer>
        <Wrapper>
          <InputWrapper>
            <LabelInfo>{groupData.regulation?.type}</LabelInfo>
            <SelectWrapper>
              <DropdownContainer>
                <NavLink to={groupData.regulation?.type === 'Regulation' ? `/regulation/${groupData.regulation?.id}` : `/legislation/${groupData.regulation?.id}`}>
                  <Tooltip title={groupData.regulation?.title}>
                    <ContainerSubstanceName>{groupData.regulation?.title}</ContainerSubstanceName>
                  </Tooltip>
                </NavLink>
              </DropdownContainer>
            </SelectWrapper>
          </InputWrapper>
          <InputWrapper>
            <LabelInfo>
              {groupData.regulation?.type === 'Regulation' ? 'Regulatory Body' : 'Sub-Jurisdiction'}
            </LabelInfo>
            <p>{groupData.regulation?.agency}</p>
          </InputWrapper>
          <InputWrapper>
            <LabelInfo>Jurisdiction</LabelInfo>
            <p>{groupData.regulation?.jurisdiction}</p>
          </InputWrapper>
          <InputWrapper>
            <LabelInfo>Impacted Toyota Region</LabelInfo>
            <p>{groupData.toyotaRegion?.description}</p>
          </InputWrapper>
          <InputWrapper>
            <AttachmentsButtonContainer>
              <Button onClick={() => { setOpenAttachments(true) }} text='Attachments' />
              <AttachmentsCount>
                {groupData?.attachmentsCount || 0} attachment{groupData?.attachmentsCount === 0 ? '' : 's'}
              </AttachmentsCount>
            </AttachmentsButtonContainer>
          </InputWrapper>
        </Wrapper>
      </Container>

      {openAttachments && (
        <ModalAttachmentsIA
          groupImpactAssessment
          open={openAttachments}
          close={() => setOpenAttachments(false)}
          modalTitle="Attachments"
          substanceId={groupId}
          regulationId={groupData.regulation?.id}
          regionId={groupData.impactAssessment?.toyotaRegionId}
        />
      )}

      <ContainerTableActions>
        <ContainerAntTabs>
          <TabsAnt activeKey={activeTabKey} fullPage type="card" items={items} onChange={onChangeTab} />
        </ContainerAntTabs>

      </ContainerTableActions>

      <Container>
        <ContainerPaginationTable>
          
          <PaginationSearch
            isSearchBar
            onPaginationSearchChangeInput={handleUserSearchInput} 
            defaultPaginationSearchText={userInput.current}
            autoFocus={autoFocus}
            current={currentPage}
            totalPage={paginationInfo?.TotalCount}
            pageSizeTotal={itemsPerPageCount}
            selectPageSize
            handleClick={handlePagination}
            handlePageChange={pageSize => {
              setItemsPerPageCount(pageSize);
            }}
          />
        </ContainerPaginationTable>
        <ContainerTable>
          <TableList>
            <TableHead>
              <TableHeadItem className='minWidth'>Substance / Group</TableHeadItem>
              <TableHeadItem style={{ width: '37px' }} number>Phase (A)</TableHeadItem>
              <TableHeadItem style={{ width: '68px' }} number>Level of Restriction (B)</TableHeadItem>
              <TableHeadItem>Targeted Use / Scope Comments</TableHeadItem>
              <TableHeadItem style={{ width: '42px' }} number>Hits</TableHeadItem>
              {activeTabKey === "2" || activeTabKey === "3" ? (<TableHeadItem number>Sites</TableHeadItem>) : null}
              <TableHeadItem style={{ width: '66px' }} number>Resources Impact (C)</TableHeadItem>
              <TableHeadItem>Resources Impact (C) Comments</TableHeadItem>
              <TableHeadItem style={{ width: '88px' }} number>Development (D)</TableHeadItem>
              <TableHeadItem style={{ width: '66px' }} number>Evaluation (E)</TableHeadItem>
              <TableHeadItem>Development (D) and Evaluation (E) Comments</TableHeadItem>
              <TableHeadItem style={{ width: '62px' }}>Priority</TableHeadItem>
            </TableHead>

            <TableBody>
              {loadingTable ? (<ContainerLoading><Spin /></ContainerLoading>) : null}
              <>
                {groupData ? (
                  <>
                    <TableRow group>
                      <TableItem>{groupData.name}</TableItem>
                      <TableItem number><TableNumber>{groupData?.phase}</TableNumber></TableItem>
                      <TableItem number><TableNumber>{groupDataImpactAssessment?.restrictionLevel}</TableNumber></TableItem>
                      <TableItem><TableComment>{groupDataImpactAssessment?.scopeComments}</TableComment></TableItem>
                      <TableItem number><TableNumber>{groupDataImpactAssessment?.hits}</TableNumber></TableItem>
                      {activeTabKey === "2" || activeTabKey === "3" ? (<TableItem number>{groupDataImpactAssessment?.sites}</TableItem>) : null}
                      <TableItem number><TableNumber>{groupDataImpactAssessment?.resourcesImpact}</TableNumber></TableItem>
                      <TableItem><TableComment>{groupDataImpactAssessment?.comments}</TableComment></TableItem>
                      <TableItem number><TableNumber>{groupDataImpactAssessment?.dev}</TableNumber></TableItem>
                      <TableItem number><TableNumber>{groupDataImpactAssessment?.evalTime}</TableNumber></TableItem>
                      <TableItem><TableComment>{groupDataImpactAssessment?.generalComments}</TableComment></TableItem>
                      <TableItem vh={colorLevel === "#BB2F29"} style={{ backgroundColor: colorLevel }} priority>{groupDataImpactAssessment?.priorityRank}</TableItem>
                    </TableRow>

                    {groupData.substances?.map(substance => {
                      const isFirstChild = substance.id === firstSubstanceId;
                      let childColor;
                      switch (substance?.priorityRank) {
                        case 'Low':
                          childColor = '#FAE6DA';
                          break;
                        case 'Medium':
                          childColor = '#F1B196';
                          break;
                        case 'High':
                          childColor = '#E97354';
                          break;
                        case 'Very High':
                          childColor = '#BB2F29';
                          break;
                        default:
                          childColor = '#C6E0B8';
                          break;
                      }
                      return (
                        <TableRow>
                          <TableItem casNumber>
                            <NavLink to={`/substance/${substance.id}`}>
                              <Tooltip title={substance.title}>
                                <ContainerSubstanceName>{substance.title}</ContainerSubstanceName>
                              </Tooltip>
                            </NavLink>
                          </TableItem>
                          {isFirstChild ? (<TableItem number className='phaseSubstance' rowSpan={groupData.substances?.length}><TableNumber /></TableItem>) : null}
                          <TableItem number><TableNumber>{substance?.restrictionLevel}</TableNumber></TableItem>
                          <TableItem><TableComment>{substance?.scopeComments}</TableComment></TableItem>
                          <TableItem number><TableNumber>{substance?.hits}</TableNumber></TableItem>
                          {activeTabKey === "2" || activeTabKey === "3" ? (<TableItem number>{substance?.sites}</TableItem>) : null}
                          <TableItem number><TableNumber>{substance?.resourcesImpact}</TableNumber></TableItem>
                          <TableItem><TableComment>{substance?.comments}</TableComment></TableItem>
                          <TableItem number><TableNumber>{substance?.dev}</TableNumber></TableItem>
                          <TableItem number><TableNumber>{substance?.evalTime}</TableNumber></TableItem>
                          <TableItem><TableComment>{substance?.generalComments}</TableComment></TableItem>
                          <TableItem vh={childColor === "#BB2F29"} style={{ backgroundColor: childColor }} priority>{substance?.priorityRank}</TableItem>
                        </TableRow>
                      )
                    })}
                  </>
                ) : null}
              </>
            </TableBody>
          </TableList>
        </ContainerTable>
        
        <PaginationSearch 
          current={currentPage}
          totalPage={paginationInfo?.TotalCount}
          pageSizeTotal={itemsPerPageCount}
          selectPageSize
          isBottom
          handleClick={handlePagination}
          handlePageChange={pageSize => {
            setItemsPerPageCount(pageSize);
          }}
        />
      </Container>
    </>
  )
}

export default ImpactAssessmentGroup;
