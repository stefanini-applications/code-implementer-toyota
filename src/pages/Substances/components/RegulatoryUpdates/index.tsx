/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CollapseUpdates from '../../../../components/Collapse/CollapseUpdates';
import Input from '../../../../components/Input';
import Pagination from '../../../../components/Pagination';
import {
  selectors,
  getRegulatoryUpdatesBySubstanceRequest
} from '../../../../store/modules/regulatoryUpdates/actions';
import {
  Container,
  SearchContainer,
  Search,
  SearchIcon,
  TitleContainer,
  Title,
  ContainerLoadingSearch,
  ContainerPagination
} from './styled';

interface ISubstanceRegulatoryUpdates {
  substanceId?: any;
  jurisdictions?: any;
  timeStamp: number;
}

const SubstanceRegulatoryUpdates: React.FC<ISubstanceRegulatoryUpdates> = ({
  substanceId,
  jurisdictions,
  timeStamp
}) => {
  const userInput: any = useRef('');
  const [autoFocus, setAutoFocus] = useState(false);
  const [openCollapsible, setOpenCollapsible] = useState(false);
  const [loadingUpdates, setLoadingUpdates] = useState(false);
  const listRegulatoryUpdates = useSelector(selectors.regulatoryUpdatesRecords);
  const regulatoryUpdatesBySubstancePaginationInfo = useSelector(
    selectors.regulatoryUpdatesSubstancePaginationInfo
  );
  const paginationInfo = regulatoryUpdatesBySubstancePaginationInfo;

  const dispatch = useDispatch();

  useEffect(() => {
    if (autoFocus) {
      setAutoFocus(false);
    }
  }, [timeStamp]);

  useEffect(() => {
    setLoadingUpdates(true);
    dispatch(
      getRegulatoryUpdatesBySubstanceRequest({
        substanceId,
        jurisdictions,
        search: '',
        pageNumber: 1
      })
    );
  }, [substanceId, jurisdictions]);

  useEffect(() => {
    setLoadingUpdates(false);
  }, [listRegulatoryUpdates]);

  const handleUserSearchInput = (value: any) => {
    setLoadingUpdates(true);
    dispatch(
      getRegulatoryUpdatesBySubstanceRequest({
        substanceId,
        jurisdictions,
        search: value,
        pageNumber: 1
      })
    );

    userInput.current = value;

    if (!autoFocus) {
      setAutoFocus(true);
    }
  };

  const handlePagination = page => {
    setLoadingUpdates(true);
    dispatch(
      getRegulatoryUpdatesBySubstanceRequest({
        substanceId,
        jurisdictions,
        search: '',
        pageNumber: page
      })
    );
  };

  return (
    <Container>
      <TitleContainer>
        <Title>Updates</Title>
      </TitleContainer>
      <SearchContainer>
        <Search>
          <Input
            className="reg-update-search-component"
            type="text"
            onChangeInput={handleUserSearchInput}
            prefixIcon={<SearchIcon />}
            defaultText={userInput.current}
            autoFocus={autoFocus}
            placeholder="Search in updates..."
          />
        </Search>
        <Pagination
          current={paginationInfo?.CurrentPage}
          totalPage={paginationInfo?.TotalCount}
          handleClick={handlePagination}
        />
      </SearchContainer>
      <CollapseUpdates loading={loadingUpdates} data={listRegulatoryUpdates} fromSubPage />
      <ContainerPagination>
        <Pagination
          current={paginationInfo?.CurrentPage}
          totalPage={paginationInfo?.TotalCount}
          handleClick={handlePagination}
        />
      </ContainerPagination>
    </Container>
  );
};

export default SubstanceRegulatoryUpdates;
