import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { downloadFileS3 } from '../../services/api';
import {
  selectors as groupTemplateSelector,
  getGroupTemplateRequest,
  clearTemplateData,
  getGroupRequest,
  clearGroupData
} from '../../store/modules/groupTemplate/actions';
import {
  selectors as s3Selector,
  getS3FileRequest
} from '../../store/modules/s3files/actions';
import TransferGroup from '../TransferGroup';
import {
  Container
} from './styled';

interface IGroupList {
  onSetSelectedSubstances: any;
  groupId?: any;
  recordId?: any;
  groupTaggedToImpAssessment?: any;
  recordType?: any;
  listRegulatoryUpdates?: any;
}

const GroupList: React.FC<IGroupList> = ({
  onSetSelectedSubstances,
  groupId,
  recordId,
  groupTaggedToImpAssessment,
  recordType,
  listRegulatoryUpdates
}) => {
  const templateList = useSelector(groupTemplateSelector.groupTemplate);
  const templatePagination = useSelector(groupTemplateSelector.groupTemplatePaginationInfo);
  const dispatch = useDispatch();
  const [searchedValue, setSearchedValue] = useState('');
  const [showLoadingLeftTable, setShowLoadingLeftTable] = useState(true);
  const [showLoadingRightTable, setShowLoadingRightTable] = useState(true);
  const [controlRun, setControlRun] = useState(1);
  const [searching, setSearching] = useState(true);
  const groupForEdit = useSelector(groupTemplateSelector.groupForEdit);
  const [selectedSubstances, setSelectedSubstances] = useState<any>([]);

  useEffect(() => {
    if (groupId) {
      dispatch(getGroupRequest(groupId));
      setShowLoadingRightTable(true)
    } else {
      setSelectedSubstances([])
      setShowLoadingRightTable(false)
    }
  }, [groupId]);


  useEffect(() => {
    if (groupForEdit) {
      setSelectedSubstances(groupForEdit.RegulationGroupSubstances.map(x => ({
        casNumber: x.casNumber,
        commonName: x.commonName,
        title: `${x.casNumber} • ${x.commonName}`
      })));
    } else {
      setSelectedSubstances([])
    }
  }, [groupForEdit]);

  useEffect(() => {
    dispatch(clearTemplateData())
    dispatch(clearGroupData())
    getTemplateData(1, '');
  }, [dispatch]);

  useEffect(() => {
    if (templateList) {
      setShowLoadingLeftTable(false)
    } else {
      setShowLoadingLeftTable(true)
    }
  }, [templateList, searching]);


  useEffect(() => {
    if (selectedSubstances) {
      setShowLoadingRightTable(false)
    } else {
      setShowLoadingRightTable(true)
    }
  }, [selectedSubstances]);

  const onChangePage = (pageNumber: number) => {
    getTemplateData(pageNumber, searchedValue);
  };

  const getTemplateData = (page: number, search: string) => {
    dispatch(
      getGroupTemplateRequest({
        search,
        pageNumber: page,
        pageSize: 10,
        noLoading: true,
        recordId: null,
        groupId: null
      })
    );
    setShowLoadingLeftTable(true)
  }


  const handleSearch = (value: string) => {
    setSearchedValue(value);
    getTemplateData(1, value);
  };

  const handleChange = (value: any) => {
    selectedSubstances.push(...value)
    const auxSelected = removeDuplicatesObj(selectedSubstances, 'casNumber')
    setSelectedSubstances(auxSelected)
    if (onSetSelectedSubstances) {
      onSetSelectedSubstances(auxSelected)
    }
  };

  const handleDeleteSubstances = (value: any) => {
    const casNumberArray = value.map((x: any) => x.casNumber)
    const auxSelected = removeDuplicatesObj(selectedSubstances.filter((x: any) => casNumberArray.indexOf(x.casNumber) === -1), 'casNumber')
    setSelectedSubstances(auxSelected)
    if (onSetSelectedSubstances) {
      onSetSelectedSubstances(auxSelected)
    }
  };

  const removeDuplicatesObj = (myArr, prop) => {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

  return (
    <Container>
      <TransferGroup
        data={templateList}
        paginationInfo={templatePagination}
        onChangePage={onChangePage}
        loadingLeftTable={showLoadingLeftTable}
        loadingRightTable={showLoadingLeftTable}
        onSearch={handleSearch}
        selectedSubstances={selectedSubstances}
        onTransferChange={handleChange}
        onDeleteSubstances={handleDeleteSubstances}
        groupTaggedToImpAssessment={groupTaggedToImpAssessment}
        recordType={recordType}
        listRegulatoryUpdates={listRegulatoryUpdates}
        groupId={groupId}
      />
    </Container>
  );
};

export default GroupList;
