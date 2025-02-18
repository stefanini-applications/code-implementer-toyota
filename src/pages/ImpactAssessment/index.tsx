/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { Empty, Spin } from 'antd';

import Button from '../../components/Button';
import CollapsibleImpactAssessment from '../../components/Collapsible/CollapsibleImpactAssessment';
import { GetInput } from '../../components/Input';
import PaginationAnt from '../../components/Pagination';
import Tags from '../../components/Tags';
import applicationTabs from '../../mocks/application-tabs';
import impactTabs from '../../mocks/region-tabs';
import history from '../../routes/history';
import { selectors as dropdownSelector } from '../../store/modules/dropdownValues/actions';
import { selectors, getImpactAssessmentBySubstanceRequest } from '../../store/modules/impactAssessment/actions';
import { Item } from '../SubstancePriority/styled';
import {
  Container,
  TitleContainer,
  Title,
  RecordsContainer,
  Touchable,
  NewImpactBtnContainer,
  Search,
  SearchIcon,
  TabsContainer,
  Label,
  Pagination,
  ContainerTags,
  ContainerLoading
} from './styled';

interface IImpactAssessment {
  impactAssessment?: Array<any>;
  substanceData?: any;
  jurisdictions?: any;
}

const ImpactAssessment: React.FC<IImpactAssessment> = ({
  impactAssessment,
  substanceData,
  jurisdictions,
}) => {
  const [activeIndex] = useState(0);
  const [openCollapsible, setOpenCollapsible] = useState(false);
  const [impactedRegionTabs, setImpactedRegionTabs] = useState(impactTabs);
  const [impactedRegionFilter, setImpactedRegionFilter] = useState<any>([]);
  const [applicationArea1, setApplicationArea1] = useState(true);
  const [applicationArea2, setApplicationArea2] = useState(true);
  const [applicationArea3, setApplicationArea3] = useState(true);
  const [applicationArea4, setApplicationArea4] = useState(true);
  const [loadingData, setLoadingData] = useState(true);
  const [applicationArea, setApplicationArea] = useState([]);
  const [sortDirection, setSortDirection] = useState('DESC');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [appAreaFilters, setAppAreaFilters] = useState([]);
  const dispatch = useDispatch();
  const dataImpactAssessment = useSelector(selectors.impactAssessmentBySubstance);
  const paginationInfo = useSelector(selectors.impactAssessmentBySubstancePaginationInfo);
  const listRegulations = useSelector(
    dropdownSelector.dropDownRegulationSubstance
  );
  const userRole = localStorage.getItem('user.role');
  const [userInput, setUserInput] = useState('');

  const typeName = `${substanceData?.casNumber} • ${substanceData?.commonName}`
  const recType = 'substance'

  const [inputSearchComponent] = useState(
    GetInput({
      className: 'impact-assessment-search-component',
      type: 'text',
      onChangeInput: handleUserSearchInput,
      prefixIcon: <SearchIcon />,
      placeholder: 'Search in impact assessment...'
    })
  );

  function handleCollapsibleOpen() {
    setOpenCollapsible(!openCollapsible);
  }

  useEffect(() => {
    setLoadingData(true);
    if (substanceData?.id) {
      dispatch(getImpactAssessmentBySubstanceRequest({
        substanceId: substanceData?.id,
        searchText: userInput,
        pageNumber: currentPage,
        pageSize: itemsPerPage,
        sortDirection,
        impactedRegionFilter,
        applicationArea: '',
        jurisdictions
      }))
    }
  }, [substanceData, userInput, sortDirection, impactedRegionFilter, jurisdictions, itemsPerPage, currentPage])

  const getToyotaRegionId = (region) => {
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

  function handleEditRecord(index: any, item: any) {
    const pattern = /&/gi;
    const replacement = "replace_and_char";
    const repCommName = substanceData.commonName.replace(pattern, replacement);
    const repTypeName = typeName.replace(pattern, replacement);

    const query = encodeURI(`casNumber=${substanceData.casNumber}`
      + `&commonName=${repCommName}`
      + `&typeName=${repTypeName}`
      + `&type=${recType}`
      + `&typeId=${substanceData.id}`
      + `&substance=${substanceData.id}`
      + `&region=${getToyotaRegionId(item.toyotaRegion)}`
      + `&regulation=${item.regulation.id}`)

    substanceData['collapseIndex'] = index;
    history.push(
      `/editRecord-impactAssessment/${index + 1}?${query}`
    );
  }

  useEffect(() => {
    filterByJurisdiction(
      jurisdictions,
      userInput.toLowerCase()
    );
  }, [jurisdictions, impactAssessment]);

  const filterByJurisdiction = (
    jurisdictions: any,
    userInputStr: string
  ) => {
    let auxImpactAssessment = dataImpactAssessment;
    if (jurisdictions.length > 0) {
      auxImpactAssessment = impactAssessment?.filter((x: any) =>
        jurisdictions.includes(Number(x?.Regulation?.jurisdictionId))
      );
      impactedRegionTabs?.forEach(element => {
        element.hasRecords =
          auxImpactAssessment?.find(
            x => Number(x.toyotaRegionId) === element.id
          ) !== undefined;
      });
    } else {
      impactedRegionTabs?.forEach(element => {
        element.hasRecords =
          impactAssessment?.find(
            x => Number(x.toyotaRegionId) === element.id
          ) !== undefined;
      });
      const newImpactedRegionTabs = impactedRegionTabs
      setImpactedRegionTabs(newImpactedRegionTabs);
    }
    if (userInputStr) {
      auxImpactAssessment = auxImpactAssessment?.filter(
        (x: any) =>
          x.Regulation.billTitle.toLowerCase().includes(userInputStr) ||
          x.Regulation.nickname.toLowerCase().includes(userInputStr) ||
          x.Regulation.Agency.description.toLowerCase().includes(userInputStr)
      );
    }
  }

  useEffect(() => {
    setLoadingData(false);
  }, [dataImpactAssessment]);

  function handleOpenNewRecord() {
    const pattern = /&/gi;
    const replacement = "replace_and_char";
    const repCommName = substanceData.commonName.replace(pattern, replacement);
    const repTypeName = typeName.replace(pattern, replacement);
    const query = encodeURI(`casNumber=${substanceData.casNumber}&commonName=${repCommName}&typeName=${repTypeName}&type=${recType}&typeId=${substanceData.id}&substance=${substanceData.id}`)

    history.push(
      `/newRecord-impactAssessment?${query}`
    );
  }

  function handleUserSearchInput(value: any) {
    setLoadingData(true);
    setUserInput(value);
  }

  const handleAppAreaTabClick = (data: any) => {
    setAppAreaFilters(data);
    setApplicationArea(data.map(tab => tab.id));
    if (data.length === 0) {
      setApplicationArea1(true);
      setApplicationArea2(true);
      setApplicationArea3(true);
      setApplicationArea4(true);
    } else {
      const area1 = data.find((item) => item.id === 1);
      const area2 = data.find((item) => item.id === 2);
      const area3 = data.find((item) => item.id === 3);
      const area4 = data.find((item) => item.id === 4);

      if (area1) {
        setApplicationArea1(true);
      } else {
        setApplicationArea1(false);
      }

      if (area2) {
        setApplicationArea2(true);
      } else {
        setApplicationArea2(false);
      }

      if (area3) {
        setApplicationArea3(true);
      } else {
        setApplicationArea3(false);
      }

      if (area4) {
        setApplicationArea4(true);
      } else {
        setApplicationArea4(false);
      }
    }
  }

  const handlePagination = (page, size) => {
    setCurrentPage(page);
    dispatch(getImpactAssessmentBySubstanceRequest({
      substanceId: substanceData?.id,
      searchText: userInput,
      pageNumber: page,
      pageSize: size,
      sortDirection,
      impactedRegionFilter,
      applicationArea,
      jurisdictions
    }))
  };

  return (
    <Container>
      <TitleContainer>
        <Title>Impact Assessment</Title>
      </TitleContainer>
      <TabsContainer>
        <Label>Impacted Toyota Region</Label>
        <ContainerTags>
          <Tags
            value={impactTabs.map(item => ({ ...item, hasRecords: 'true' }))}
            liveIndex={activeIndex}
            tabsWithContent={impactTabs.map(item => item.id)}
            onTabClick={(data: any) => {
              const dataAux: any[] = [];
              data.map(x => dataAux.push(x.id));
              setImpactedRegionFilter(dataAux);
            }}
            hasTagConnection
          />
          {userRole == null || userRole == 'Read-only' ? null : (
            <Touchable>
              <Button
                toolTip={
                  userRole == null ||
                    userRole == 'Read-only' ||
                    listRegulations?.length === 0
                    ? userRole == 'Read-only'
                      ? 'User role not authorized to open: Read-only'
                      : 'This substance is not related to any legislation / regulation'
                    : undefined
                }
                isDisabled={
                  userRole == null ||
                  userRole == 'Read-only' ||
                  listRegulations?.length === 0
                }
                text="New Impact Assessment"
                onClick={handleOpenNewRecord}
              />
            </Touchable>
          )}
        </ContainerTags>
      </TabsContainer>
      <TabsContainer>
        <Label>Application Area</Label>
        <Tags
          value={applicationTabs}
          selectedTabs={appAreaFilters}
          onTabClick={handleAppAreaTabClick}
          useDesc
        />
      </TabsContainer>
      <NewImpactBtnContainer>
        <Search>{inputSearchComponent}</Search>
        <Pagination>
          <PaginationAnt
            current={currentPage}
            totalPage={Number(paginationInfo?.TotalCount)}
            pageSizeTotal={itemsPerPage}
            selectPageSize
            handleClick={handlePagination}
            handlePageChange={(pageSize) => {
              setItemsPerPage(pageSize)
            }}
          />
        </Pagination>
      </NewImpactBtnContainer>

      <RecordsContainer>
        {loadingData && (
          <ContainerLoading>
            <Spin />
          </ContainerLoading>
        )}
        {dataImpactAssessment.length > 0 ? (
          <CollapsibleImpactAssessment
            data={dataImpactAssessment}
            onCollapsibleClick={handleCollapsibleOpen}
            onSortDirection={setSortDirection}
            sortDirection={sortDirection}
            showApplicationArea={[
              applicationArea1,
              applicationArea2,
              applicationArea3,
              applicationArea4
            ]}
            onEditRecordClick={(index: any, item: any) =>
              handleEditRecord(index, item)
            }
          />
        ) : (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />)}

      </RecordsContainer>
      <Pagination>
        <PaginationAnt
          current={currentPage}
          totalPage={Number(paginationInfo?.TotalCount)}
          pageSizeTotal={itemsPerPage}
          selectPageSize
          handleClick={handlePagination}
          handlePageChange={(pageSize) => {
            setItemsPerPage(pageSize)
          }}
        />
      </Pagination>
    </Container >
  );
};

export default ImpactAssessment;
