/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { translate } from '../../locales';
import {
  getRegulatoryUpdatesRecordsRequest,
  selectors
} from '../../store/modules/regulatoryUpdates/actions';
import loadUserDataOnStorage from '../../utils/userData';
import Button from '../Button';
import CollapseRegulationUpdates from '../Collapse/CollapseUpdates';
import Input from '../Input';
import Modal from '../Modal/ModalRegulatoryUpdates';
import Pagination from '../Pagination';
import {
  Container,
  SearchContainer,
  Search,
  SearchIcon,
  TitleContainer,
  Title,
  ButtonAddContainer,
  IconPlus,
  ContainerButton,
  DisabledTextInfo,
  ContainerLoadingSearch,
  ContainerPagination
} from './styled';

interface IRegulationRegulatoryUpdates {
  regulationId: any;
  timeStamp: number;
}

const RegulationRegulatoryUpdates: React.FC<IRegulationRegulatoryUpdates> = ({
  regulationId,
  timeStamp
}) => {
  const [openCollapsible, setOpenCollapsible] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [loadingUpdates, setLoadingUpdates] = useState(false);
  const userInput: any = useRef('');
  const [autoFocus, setAutoFocus] = useState(false);
  const [regulatoryUpdateData, setRegulatoryUpdateData] = useState();
  const listRegulatoryUpdates = useSelector(selectors.regulatoryUpdatesRecords);
  const paginationInfo = useSelector(selectors.regulatoryUpdatesPaginationInfo);
  const dispatch = useDispatch();
  const userRole = localStorage.getItem('user.role');

  useEffect(() => {
    if (autoFocus) {
      setAutoFocus(false);
    }
  }, [timeStamp]);

  useEffect(() => {
    loadUserDataOnStorage();
  }, []);

  function handleCollapsibleOpen() {
    setOpenCollapsible(!openCollapsible);
  }

  function handleUserSearchInput(value) {
    setLoadingUpdates(true);
    dispatch(
      getRegulatoryUpdatesRecordsRequest({
        search: value,
        pageNumber: 1,
        regulationLegislationId: regulationId
      })
    );

    userInput.current = value;

    if (!autoFocus) {
      setAutoFocus(true);
    }
  }

  useEffect(() => {
    setLoadingUpdates(false);
  }, [listRegulatoryUpdates]);

  useEffect(() => {
    setLoadingUpdates(true);
    dispatch(
      getRegulatoryUpdatesRecordsRequest({
        search: '',
        pageNumber: 1,
        regulationLegislationId: regulationId
      })
    );
  }, [dispatch, regulationId]);

  const handlePagination = page => {
    setLoadingUpdates(true);
    dispatch(
      getRegulatoryUpdatesRecordsRequest({
        search: userInput.current,
        pageNumber: page,
        regulationLegislationId: regulationId
      })
    );
  };

  return (
    <Container>
      {openCreateModal && (
        <Modal
          open={openCreateModal}
          close={() => setOpenCreateModal(false)}
          modalTitle={translate('pages.regulatoryUpdates.newUpdate')}
          regulation={regulationId}
          timeStamp={timeStamp}
        />
      )}
      {openEditModal && (
        <Modal
          open={openEditModal}
          close={() => setOpenEditModal(false)}
          modalTitle={translate('pages.regulatoryUpdates.editUpdate')}
          regulation={regulationId}
          editData={regulatoryUpdateData}
          timeStamp={timeStamp}
        />
      )}
      <TitleContainer>
        <Title>Updates</Title>
      </TitleContainer>
      {userRole == null || userRole == 'Read-only' ? null : (
        <ContainerButton>
          <ButtonAddContainer>
            <Button
              toolTip={
                userRole == null || userRole == 'Read-only'
                  ? 'User role not authorized to open: Read-only'
                  : undefined
              }
              isDisabled={userRole == null || userRole == 'Read-only'}
              text="New Update"
              onClick={() => setOpenCreateModal(true)}
            />
          </ButtonAddContainer>
        </ContainerButton>
      )}
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
      <CollapseRegulationUpdates
        data={listRegulatoryUpdates}
        onEditClick={(itemData: any) => {
          setRegulatoryUpdateData(itemData);
          setOpenEditModal(true);
        }}
        regulationId={regulationId}
        loading={loadingUpdates}
      />
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

export default RegulationRegulatoryUpdates;
