import React, { useEffect, useState, useRef } from 'react';
import { BsFillDiamondFill, BsFillXDiamondFill } from 'react-icons/bs';
import { FaCircle, FaGavel } from 'react-icons/fa';
import { GoLaw } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Spin } from 'antd';

import Input from '../../components/Input';
import Pagination from '../../components/Pagination';
import TableResult from '../../components/TableResult';
import Tabs from '../../components/Tabs';
import { translate } from '../../locales';
import searchTabs from '../../mocks/search-results-tabs';
import {
  selectors as advancedSelectors,
  getFilteredRecordsAdSearchRequest
} from '../../store/modules/advancedSearch/actions';
import {
  getLegislationsPaginationInfo,
  selectors as selectorsLeg
} from '../../store/modules/legislations/actions';
import {
  getRegulationsPaginationInfo,
  selectors as selectorsReg
} from '../../store/modules/regulations/actions';
import {
  selectors,
  setSearchTabInfo,
  getSearchKeyDownResultsRequest
} from '../../store/modules/searchResults/actions';
import { SearchKeys } from '../../store/modules/searchResults/types';
import {
  getSubstancesPaginationInfo,
  selectors as selectorsSubCls
} from '../../store/modules/substances/actions';
import {
  AsideContainer,
  Container,
  ContainerResults,
  MiddleContainer,
  RowContainer,
  TabIconContainer,
  Title,
  TitleContainer
} from './styled';

const SearchResult: React.FC = () => {
  const searchTabInfo = useSelector(selectors.searchTabInfo);
  const [activeIndex, setActiveIndex] = useState(1);
  const [activeKeyTab, setActiveKeyTab] = useState('1');
  const [activeType, setActiveType] = useState('All');
  const [isFirstTime, setIsFirstTime] = useState(true);
  const listSearchKeyDownResuls = useSelector(selectors.searchKeyDownResults);
  const listAllFilteredSearchResuls = useSelector(
    advancedSelectors.filteredRecordsAdSearch
  );
  const paginationInfoKeyDown = useSelector(
    selectors.searchKeyDownResultsPaginationInfo
  );
  const paginationInfoAdvanced = useSelector(
    advancedSelectors.advancedSearchResultsPaginationInfo
  );
  const paginationInfoLeg = useSelector(
    selectorsLeg.legislationsPaginationInfo
  );
  const paginationInfoReg = useSelector(selectorsReg.regulationsPaginationInfo);
  const paginationInfoSub = useSelector(
    selectorsSubCls.substancesPaginationInfo
  );
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [searchResults, setSearchResults] = useState<any>([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const resultValue: any = location.state;
  const searchType = window.location.search.split('=')[1];
  const isItemSelected = useRef(false);
  const searchKeysStore = searchTabInfo.searchKeys;
  const [searchKeys, setSearchKeys] = useState<SearchKeys | undefined>(
    searchKeysStore
  );

  useEffect(() => {
    if (
      searchKeysStore &&
      searchKeysStore.timeStamp === resultValue.timeStamp &&
      isFirstTime
    ) {
      if (searchKeysStore.searchType === 'basic') {
        dispatch(
          getSearchKeyDownResultsRequest({
            type: searchKeysStore.type,
            searchText: searchKeysStore.text,
            pageNumber: searchKeysStore.pageNumber,
            pageSize: searchKeysStore.pageSize,
            loading: true
          })
        );
      } else if (searchKeysStore.searchType === 'adv') {
        dispatch(
          getFilteredRecordsAdSearchRequest({
            pageSize: searchKeysStore.pageSize,
            pageNumber: searchKeysStore.pageNumber,
            text: searchKeysStore.text,
            type: searchKeysStore.type,
            jurisdiction: searchKeysStore?.jurisdiction,
            agency: searchKeysStore?.agency,
            agencyType: searchKeysStore?.agencyType,
            subUses: searchKeysStore?.subUses,
            hasAttachment: searchKeysStore.hasAttachment,
            notSearch: searchKeysStore.notSearch,
            startDate: searchKeysStore.startDate,
            endDate: searchKeysStore.endDate,
            status: searchKeysStore.status
          })
        );
      }
      setIsFirstTime(false);
    } else {
      if (searchType === 'basic') {
        dispatch(
          getSearchKeyDownResultsRequest({
            type: 'All',
            searchText: resultValue?.text,
            pageNumber: 1,
            pageSize: itemsPerPage,
            loading: true
          })
        );
        setSearchKeys({
          type: 'All',
          text: resultValue?.text,
          pageNumber: 1,
          pageSize: itemsPerPage,
          searchType: 'basic',
          timeStamp: resultValue.timeStamp,
          status: resultValue.status
        });
      } else {
        dispatch(
          getFilteredRecordsAdSearchRequest({
            pageSize: itemsPerPage,
            pageNumber: 1,
            text: resultValue?.text,
            type: resultValue?.type,
            jurisdiction: resultValue?.jurisdiction,
            agency: resultValue?.agency,
            agencyType: resultValue?.agencyType,
            subUses: resultValue?.subUses,
            hasAttachment: resultValue?.hasAttachment,
            notSearch: resultValue?.notSearch,
            startDate: resultValue?.startDate,
            endDate: resultValue?.endDate,
            status: resultValue?.status
          })
        );
        setSearchKeys({
          pageSize: itemsPerPage,
          pageNumber: 1,
          text: resultValue?.text,
          type: resultValue?.type,
          jurisdiction: resultValue.jurisdiction,
          hasAttachment: resultValue?.hasAttachment,
          notSearch: resultValue?.notSearch,
          startDate: resultValue?.startDate,
          endDate: resultValue?.endDate,
          searchType: 'adv',
          timeStamp: resultValue.timeStamp,
          status: resultValue?.status
        });
      }
      setActiveIndex(0);
    }
    setActiveKeyTab('1');
    setLoadingStatus(true);
  }, [dispatch, searchType, resultValue]);
  useEffect(() => {
    if (resultValue) {
      setLoadingStatus(false);
    }
  }, [resultValue]);

  useEffect(() => {
    if (listSearchKeyDownResuls) {
      setLoadingStatus(false);
    }
    setSearchResults(listSearchKeyDownResuls);
  }, [listSearchKeyDownResuls]);

  useEffect(() => {
    setSearchResults(listAllFilteredSearchResuls);
  }, [listAllFilteredSearchResuls]);

  const handlePaginationAdvancedSearchResuls = (page, size) => {
    setCurrentPage(page);
    setItemsPerPage(size);
    // const pageCount = paginationInfoAdvanced?.TotalPages;
    const advancedParams = resultValue;
    dispatch(
      getFilteredRecordsAdSearchRequest({
        pageSize: size,
        pageNumber: page,
        text: advancedParams?.text,
        type: advancedParams?.type,
        jurisdiction: advancedParams?.jurisdiction,
        agency: advancedParams?.agency,
        agencyType: advancedParams?.agencyType,
        subUses: advancedParams?.subUses,
        hasAttachment: advancedParams?.hasAttachment,
        notSearch: advancedParams?.notSearch,
        startDate: advancedParams?.startDate,
        endDate: advancedParams?.endDate,
        status: advancedParams?.status
      })
    );
    setSearchKeys({
      pageSize: itemsPerPage,
      pageNumber: page,
      text: advancedParams?.text,
      type: advancedParams?.type,
      jurisdiction: advancedParams.jurisdiction,
      hasAttachment: advancedParams?.hasAttachment,
      notSearch: advancedParams?.notSearch,
      startDate: advancedParams?.startDate,
      endDate: advancedParams?.endDate,
      searchType: 'adv',
      timeStamp: resultValue.timeStamp,
      status: resultValue.status
    });
  };

  const handleSearchPagination = (page, size) => {
    setCurrentPage(page);
    dispatch(
      getSearchKeyDownResultsRequest({
        type: activeType,
        searchText: resultValue.text,
        pageNumber: page,
        pageSize: size ?? itemsPerPage,
        loading: true
      })
    );
    setSearchKeys({
      type: activeType,
      text: resultValue.text,
      pageNumber: page,
      pageSize: size ?? itemsPerPage,
      searchType: 'basic',
      timeStamp: resultValue.timeStamp,
      status: resultValue.status
    });
  };

  const handleTabClick = (index: any) => {
    let route;
    switch (index) {
      case 0:
        route = 'All';
        break;
      case 1:
        route = 'Substance';
        break;
      case 2:
        route = 'Regulation';
        break;
      case 3:
        route = 'Legislation';
        break;
      default:
        route = 'All';
        break;
    }

    setCurrentPage(1);
    setItemsPerPage(10);
    setActiveIndex(index);
    setActiveType(route);
    if (searchType === 'adv') {
      dispatch(
        getFilteredRecordsAdSearchRequest({
          pageSize: 10,
          pageNumber: 1,
          text: resultValue?.text,
          type: index === 0 ? resultValue?.type : route,
          jurisdiction: resultValue?.jurisdiction,
          agency: resultValue?.agency,
          agencyType: resultValue?.agencyType,
          subUses: resultValue?.subUses,
          hasAttachment: resultValue?.hasAttachment,
          notSearch: resultValue?.notSearch,
          startDate: resultValue?.startDate,
          endDate: resultValue?.endDate,
          status: resultValue.status
        })
      );
      setSearchKeys({
        pageSize: 10,
        pageNumber: 1,
        text: resultValue?.text,
        type: route,
        jurisdiction: resultValue.jurisdiction,
        hasAttachment: resultValue?.hasAttachment,
        notSearch: resultValue?.notSearch,
        startDate: resultValue?.startDate,
        endDate: resultValue?.endDate,
        searchType: 'adv',
        timeStamp: resultValue.timeStamp,
        status: resultValue.status
      });
    } else {
      dispatch(
        getSearchKeyDownResultsRequest({
          type: route,
          searchText: resultValue?.text,
          pageNumber: 1,
          pageSize: 10,
          loading: true
        })
      );
      setSearchKeys({
        type: route,
        text: resultValue?.text,
        pageNumber: 1,
        pageSize: 10,
        searchType: 'basic',
        timeStamp: resultValue.timeStamp,
        status: resultValue.status
      });
    }
  };

  useEffect(() => {
    return () => {
      if (!isItemSelected.current) {
        dispatch(
          setSearchTabInfo({
            tabId: 0,
            searchKeys: undefined
          })
        );
      }
    };
  }, [isItemSelected.current]);

  useEffect(() => {
    // reset admin tabs pagination info
    // {"TotalCount":50,"PageSize":10,"CurrentPage":2,"TotalPages":5}
    dispatch(
      getSubstancesPaginationInfo({
        TotalCount: 1,
        PageSize: 10,
        CurrentPage: 1,
        TotalPages: paginationInfoSub.TotalPages
      })
    );
    dispatch(
      getRegulationsPaginationInfo({
        TotalCount: 1,
        PageSize: 10,
        CurrentPage: 1,
        TotalPages: paginationInfoReg.TotalPages
      })
    );
    dispatch(
      getLegislationsPaginationInfo({
        TotalCount: 1,
        PageSize: 10,
        CurrentPage: 1,
        TotalPages: paginationInfoLeg.TotalPages
      })
    );
  }, []);

  const onItemSelected = () => {
    isItemSelected.current = true;
    dispatch(
      setSearchTabInfo({
        tabId: activeIndex,
        searchKeys
      })
    );
  };

  const tabIcons = [FaCircle, BsFillDiamondFill, FaGavel, GoLaw];

  return (
    <Container>
      <TitleContainer>
        <Title>Search Results</Title>
      </TitleContainer>
      <Tabs
        activeKey={activeKeyTab}
        type="card"
        items={searchTabs.map(tab => {
          const Icon = tabIcons[Number(tab.key) - 1];
          return {
            label: (
              <TabIconContainer>
                <Icon />
                {tab.label}
              </TabIconContainer>
            ),
            key: tab.key
          };
        })}
        onChange={(newActiveKey: string) => {
          const activeKey = Number(newActiveKey);
          setActiveKeyTab(newActiveKey);
          handleTabClick(activeKey - 1);
        }}
      />
      <ContainerResults>
        <MiddleContainer>
          <RowContainer />
          <AsideContainer>
            {searchType === 'adv' ? (
              <Pagination
                current={currentPage}
                pageSizeTotal={itemsPerPage}
                totalPage={paginationInfoAdvanced?.TotalCount}
                handleClick={handlePaginationAdvancedSearchResuls}
                handlePageChange={pageSize => {
                  setItemsPerPage(pageSize);
                }}
                selectPageSize
              />
            ) : (
              <Pagination
                current={currentPage}
                totalPage={paginationInfoKeyDown?.TotalCount}
                handleClick={handleSearchPagination}
                pageSizeTotal={itemsPerPage}
                handlePageChange={pageSize => {
                  setItemsPerPage(pageSize);
                }}
                selectPageSize
              />
            )}
          </AsideContainer>
        </MiddleContainer>
        {loadingStatus ? (
          <Spin />
        ) : (
          <TableResult
            searchResultData={searchResults}
            onItemSelected={onItemSelected}
          />
        )}

        <MiddleContainer>
          <RowContainer />
          <AsideContainer>
            {searchType === 'adv' ? (
              <Pagination
                current={currentPage}
                pageSizeTotal={itemsPerPage}
                totalPage={paginationInfoAdvanced?.TotalCount}
                handleClick={handlePaginationAdvancedSearchResuls}
                handlePageChange={pageSize => {
                  setItemsPerPage(pageSize);
                }}
                selectPageSize
              />
            ) : (
              <Pagination
                current={currentPage}
                totalPage={paginationInfoKeyDown?.TotalCount}
                handleClick={handleSearchPagination}
                pageSizeTotal={itemsPerPage}
                handlePageChange={pageSize => {
                  setItemsPerPage(pageSize);
                }}
                selectPageSize
              />
            )}
          </AsideContainer>
        </MiddleContainer>
      </ContainerResults>
    </Container>
  );
};

export default SearchResult;
