import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Button from '../../components/Button';
import { ToastError } from '../../components/Toast/index';
import TransferTemplate from '../../components/TransferTemplate';
import history from '../../routes/history';
import {
  selectors as groupTemplateSelector,
  getGroupTemplateRequest,
  clearTemplateData
} from '../../store/modules/groupTemplate/actions';
import {
  selectors,
  getRelatedSubstancesRequest,
  clearRelatedSubstances,
  editRelatedSubstancesRequest
} from '../../store/modules/relatedSubstances/actions';
import {
  Container,
  ContainerButton,
  ContainerTransfer,
  Title,
  TitleContainer
} from './styled';
import { createUserErrorLogRequest } from '../../store/modules/userErrorLog/actions';

const AddRelatedSubstances: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [selectedSubstances, setSelectedSubstances] = useState<any>([]);
  const [maxLengthUserInput, setMaxLengthUserInput] = useState(false);
  const relatedSubstances: any = useSelector(selectors.relatedSubstances);
  const templateList = useSelector(groupTemplateSelector.groupTemplate);
  const templatePagination = useSelector(
    groupTemplateSelector.groupTemplatePaginationInfo
  );
  const [searchedValue, setSearchedValue] = useState('');
  const [showLoadingLeftTable, setShowLoadingLeftTable] = useState(true);
  const [showLoadingRightTable, setShowLoadingRightTable] = useState(true);
  const [searching, setSearching] = useState(true);
  const path = location.pathname.split('/');
  const regulationId = Number(path[2]);
  const recordType = Number(path[3]); // 1 = Regulation, 2 = Legislation
  const returnUrl = `/${
    recordType === 1 ? 'regulation' : 'legislation'
  }/${regulationId}`;

  useEffect(() => {
    if (regulationId) {
      dispatch(getRelatedSubstancesRequest({ recordId: regulationId }));
      setSelectedSubstances([]);
    } else {
      setSelectedSubstances([]);
      setShowLoadingRightTable(false);
    }
  }, [dispatch, regulationId]);

  useEffect(() => {
    dispatch(clearTemplateData());
    dispatch(clearRelatedSubstances());
    getTemplateData(1, '');
  }, [dispatch]);

  useEffect(() => {
    if (templateList) {
      setShowLoadingLeftTable(false);
    } else {
      setShowLoadingLeftTable(true);
    }
  }, [templateList]);

  useEffect(() => {
    if (templateList) {
      setShowLoadingLeftTable(false);
    } else {
      setShowLoadingLeftTable(true);
    }
  }, [searching]);

  useEffect(() => {
    if (relatedSubstances) {
      setSelectedSubstances(
        relatedSubstances.map(x => ({
          casNumber: x.casNumber,
          commonName: x.commonName,
          title: `${x.casNumber} • ${x.commonName}`
        }))
      );
      setShowLoadingRightTable(false);
    } else {
      setSelectedSubstances([]);
    }
  }, [relatedSubstances]);

  const onChangePage = (pageNumber: number) => {
    getTemplateData(pageNumber, searchedValue);
  };

  const handleSearch = (value: string) => {
    setSearchedValue(value);
    getTemplateData(1, value);
  };

  const getTemplateData = (page: number, search: string) => {
    dispatch(
      getGroupTemplateRequest({
        search,
        pageNumber: page,
        pageSize: 10,
        noLoading: true,
        recordId: null,
        groupId: null,
        onlySubstances: true
      })
    );
    setShowLoadingLeftTable(true);
  };

  const handleChange = (value: any) => {
    selectedSubstances.push(...value);
    prepareAndSetSubstances(selectedSubstances);
  };

  const handleDeleteSubstances = (value: any) => {
    const casNumberArray = value.map((x: any) => x.casNumber);
    prepareAndSetSubstances(casNumberArray);
  };

  const prepareAndSetSubstances = (substances: any) => {
    const auxSelected = removeDuplicatesObj(
      selectedSubstances.filter(
        (x: any) => substances.indexOf(x.casNumber) === -1
      ),
      'casNumber'
    );
    setSelectedSubstances(auxSelected);
  };

  const removeDuplicatesObj = (myArr, prop) => {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  };

  function handleSave(e) {
    if (selectedSubstances.length <= 0) {
      dispatch(
        createUserErrorLogRequest({
          error: 'Substance or Template is not selected yet !',
          page: 'AddEditRelatedSubstances'
        })
      );
      ToastError('Substance or Template is not selected yet !');
      return;
    }
    dispatch(
      editRelatedSubstancesRequest({
        regulation: regulationId ? Number(regulationId) : undefined,
        relatedSubstances: selectedSubstances.map(x => x.casNumber)
      })
    );
    history.push(returnUrl);
  }

  const handleOnCancel = () => {
    history.push(returnUrl);
  };

  return (
    <Container>
      <TitleContainer>
        <Title>Add or Remove Related Substances</Title>
      </TitleContainer>

      <ContainerTransfer>
        <TransferTemplate
          data={templateList}
          paginationInfo={templatePagination}
          onChangePage={onChangePage}
          loadingLeftTable={showLoadingLeftTable}
          loadingRightTable={showLoadingRightTable}
          onSearch={handleSearch}
          selectedSubstances={selectedSubstances}
          onTransferChange={handleChange}
          onDeleteSubstances={handleDeleteSubstances}
          substanceTemplate
        />
      </ContainerTransfer>

      <ContainerButton>
        <Button onClick={handleOnCancel} text="Cancel" />
        <Button
          type="primary"
          text="Save Related Substances"
          onClick={handleSave}
          isDisabled={maxLengthUserInput}
        />
      </ContainerButton>
    </Container>
  );
};

export default AddRelatedSubstances;
