/* eslint-disable no-unused-expressions */
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Moment from 'moment';
import {Select as MultiSelect} from 'antd'
import attachmentsOptions from '../../mocks/attachment-options';
import statusOptions from '../../mocks/status';
import listToyotaJurisdictions from '../../mocks/impact-tabs';
import advSearch from '../../mocks/adv-search-tabs';
import dataDropdown from '../../mocks/select-jurisdictions';
import history from '../../routes/history';
import { listAgency } from '../../services/api';
import {
  getFilteredRecordsAdSearchRequest,
  setValues
} from '../../store/modules/advancedSearch/actions';
import {
  selectors as enumeratorsSelectors,
  getJurisdictionsRequest
} from '../../store/modules/enumerators/actions';
import {
  selectors as subSelectors,
  getSubstancesUsesRequest
} from '../../store/modules/substanceUses/actions';
import Button from '../Button';
import DatePicker from '../DatePicker';
import Input from '../Input';
import Select from '../Select';
import {
  Container,
  AdvancedSearchContainer,
  InputsContainer,
  ColumnContainer,
  InputContainer,
  Label,
  ButtonSearchContainer,
  SearchIco,
  SelectWrapper,
  WrapperAdvanced,
  CloseIco,
  Touchable,
  ContainerDatePicker,
  ContainerDateRange,
  DropdownContainer
} from './styled';

interface IAdvancedSearch {
  close?: any;
}

const AdvancedSearch: React.FC<IAdvancedSearch> = ({ close }) => {
  const substanceUses = useSelector(subSelectors.substanceUses);
  const itemsPerPage = useSelector(enumeratorsSelectors.itemsPerPage);
  const keywordsRef: any = useRef('');
  const noneTheseWordsRef: any = useRef('');
  const regionRef: any = useRef();
  const attachmentRef: any = useRef();
  const statusRef: any = useRef();
  let startDateParam = Moment('01-01-2018', 'MM-dd-yyyy').toDate();
  let endDateParam = Moment(new Date()).toDate();
  const dispatch = useDispatch();
  const [listSubJur, setListSubJur] = useState<any>([]);
  const [filteredSubJur, setFilteredSubJur] = useState<any>([]);
  const [subJurisdiction, setSubJurisdiction] = useState<any>();
  const [listReguBody, setListReguBody] = useState<any>([]);
  const [filteredReguBody, setFilteredReguBody] = useState<any>([]);
  const [regulationBody, setRegulationBody] = useState<any>();
  const [usesValue, setUsesValue] = useState<any>([]);
  const [searchType, setSearchType] = useState<any>(null);
  const [statusValue, setstatusValue] = useState<any>([]);
  // Set 'active' as the default selected status
  const [selectedStatuses, setSelectedStatuses] = useState(['active']); // '1' corresponds to 'active'

  useEffect(() => {
    getAgency();
    dispatch(getSubstancesUsesRequest());
  }, []);

  async function getAgency () {
    // sub-jur
    const subJr = await listAgency({
      onlyActive: true,
      type: '2'
    });
    // regu-body
    const reguBody = await listAgency({
      onlyActive: true,
      type: '1'
    });

    if (subJr?.data?.message) {
      setListSubJur(subJr?.data?.message);
    }

    if (reguBody?.data?.message) {
      setListReguBody(reguBody?.data?.message);
    }
  }

  function handleAdvancedSearch() {
    console.log(statusValue);
    const filteredResults = {
      pageSize: itemsPerPage?.optionValue,
      pageNumber: 1,
      text: keywordsRef?.current,
      type: searchType === null ? 'All' : searchType,
      jurisdiction: regionRef?.current || 0,
      agency: searchType === 'Regulation' && regulationBody
                ? regulationBody.description
                : searchType === 'Legislation' && subJurisdiction
                  ? subJurisdiction.description
                  : '',
      agencyType:  searchType === 'Regulation' && regulationBody
                    ? 'Regulation'
                    : searchType === 'Legislation' && subJurisdiction
                      ? 'Legislation'
                      : '',
      subUses: usesValue,
      status: statusValue,
      hasAttachment: attachmentRef?.current || 0,
      notSearch: noneTheseWordsRef?.current,
      startDate: startDateParam
        ? Moment.utc(Moment(startDateParam).utc()).format()
        : '',
      endDate: endDateParam
        ? Moment.utc(Moment(endDateParam).utc()).format()
        : '',
      timeStamp: new Date().valueOf()
    };
    dispatch(setValues(filteredResults));
    history.push('/result?type=adv', filteredResults);
    close();
  }

  const handleChangeUsesCheckbox = (value: any) => {
    setUsesValue(
      value.map(str => {
        return str.label;
      })
    );
  };

  const handleChangestatusCheckbox = (value: any) => {
    setstatusValue(value)
  };

  return (
    <Container>
      <WrapperAdvanced />
      <AdvancedSearchContainer>
        <Touchable onClick={close}>
          <CloseIco />
        </Touchable>
        <InputsContainer>
          <ColumnContainer>
            <InputContainer>
              <Label>Keywords:</Label>
              <Input
                className="input-component"
                type="text"
                onChangeInput={(value) => {
                  keywordsRef.current = value;
                }}
                defaultText={keywordsRef?.current}
              />
            </InputContainer>
            {/* <InputContainer>
              <Label>Username:</Label>
              <input disabled type="text" name="InputAuthor" />
            </InputContainer> */}
            <InputContainer>
              <Label>Search Type:</Label>
              <SelectWrapper>
                <DropdownContainer>
                  <Select
                    labelValue="tab"
                    keyValue="id"
                    values={advSearch}
                    onChange={(value: { value: string; label: React.ReactNode }) => {
                      setSearchType(advSearch[Number(value.value) - 1].tab);                      
                    }}
                  />
                </DropdownContainer>
              </SelectWrapper>
            </InputContainer>
            {(searchType === 'Legislation' || searchType === 'Regulation') &&
              <InputContainer>
                <Label>Jurisdiction:</Label>
                <SelectWrapper>
                  <DropdownContainer>
                    <Select
                      labelValue="tab"
                      keyValue="id"
                      values={listToyotaJurisdictions}
                      onChange={(value: { value: string; label: React.ReactNode }) => {
                        regionRef.current = value.value;
                        setFilteredSubJur(
                          listSubJur.filter(
                            x =>
                              x.Jurisdictions.find(
                                j => Number(j.id) === Number(value.value)
                              ) !== undefined
                          )
                        );
                        setFilteredReguBody(
                          listReguBody.filter(
                            x =>
                              x.Jurisdictions.find(
                                j => Number(j.id) === Number(value.value)
                              ) !== undefined
                          )
                        );
                        setSubJurisdiction(null);
                        setRegulationBody(null);
                      }}
                    />
                  </DropdownContainer>
                </SelectWrapper>
              </InputContainer>}
            {searchType === 'Legislation' &&
              <InputContainer>
                <Label>Sub-Jurisdiction:</Label>
                <SelectWrapper>
                  <DropdownContainer>
                    <Select
                      labelValue="description"
                      keyValue="id"
                      values={filteredSubJur}
                      selectedValue={
                        subJurisdiction ? subJurisdiction.description : ''
                      }
                      onChange={(value: { value: string; label: React.ReactNode }) => {
                        setSubJurisdiction(
                          filteredSubJur?.find(x => x?.id === value.value)
                        );
                      }}
                    />
                  </DropdownContainer>
                </SelectWrapper>
              </InputContainer>}
            {searchType === 'Regulation' &&
              <InputContainer>
                <Label>Regulatory Body:</Label>
                <SelectWrapper>
                  <DropdownContainer>
                    <Select
                      labelValue="description"
                      keyValue="id"
                      values={filteredReguBody}
                      selectedValue={
                        regulationBody ? regulationBody.description : ''
                      }
                      onChange={(value: { value: string; label: React.ReactNode }) => {
                        setRegulationBody(
                          filteredReguBody?.find(x => x?.id === value.value)
                        );
                      }}
                    />
                  </DropdownContainer>
                </SelectWrapper>
              </InputContainer>}
            {searchType === 'Substance' &&
              <InputContainer>
                <Label>Substance Uses:</Label>
                <SelectWrapper>
                  <DropdownContainer>
                  <Select
                    mode="multiple"
                    values={substanceUses}
                    labelValue="description"
                    keyValue="id"
                    onChange={handleChangeUsesCheckbox}
                  />
                  </DropdownContainer>
                </SelectWrapper>
              </InputContainer>}
            <InputContainer>
              <Label>None of these words:</Label>
              <Input
                className="input-component"
                type="text"
                onChangeInput={(value) => {
                  noneTheseWordsRef.current = value;
                }}
                defaultText={noneTheseWordsRef?.current}
              />
            </InputContainer>
            

          </ColumnContainer>
          <ColumnContainer>
            <InputContainer>
              <Label>Attachment:</Label>
              <SelectWrapper>
                <DropdownContainer>
                  <Select
                    labelValue="name"
                    keyValue="id"
                    values={attachmentsOptions}
                    onChange={value => {
                      attachmentRef.current = value.value;
                    }}
                  />
                </DropdownContainer>
              </SelectWrapper>
            </InputContainer>
            <ContainerDateRange>
              <Label>Date range:</Label>
              <ContainerDatePicker>
                <DatePicker
                  format={process.env.REACT_APP_DATE_FORMAT}
                  defaultValue={Moment('01-01-2018', 'MM-dd-yyyy').toDate()}
                  onChange={e => {
                    startDateParam = e;
                  }}
                  width="149px"
                />
                <p>to:</p>
                <DatePicker
                  format={process.env.REACT_APP_DATE_FORMAT}
                  defaultValue={Moment(new Date()).toDate()}
                  onChange={e => {
                    endDateParam = e;
                  }}
                  width="149px"
                />
              </ContainerDatePicker>
            </ContainerDateRange>
            {(searchType === 'Legislation') &&
            <InputContainer>            
            <Label>Legislations Status:</Label>            
                <SelectWrapper>
                  <DropdownContainer>
                  <MultiSelect
                  mode="multiple"
                  options={statusOptions}
                  fieldNames={{ label: 'status', value: 'value' }}
                  defaultValue={["active"]}
                  onChange={handleChangestatusCheckbox} 
                  />
                  </DropdownContainer>
                </SelectWrapper>
            </InputContainer>
}
            {/* <InputContainer>
              <Label>Journal:</Label>
              <input disabled type="text" name="InputJournal" />
            </InputContainer>
            <InputContainer>
              <Label>Status:</Label>
              <input disabled type="text" name="InputStatus" />
            </InputContainer> */}
          </ColumnContainer>
        </InputsContainer>
        <ButtonSearchContainer>
          <Button type="primary" onClick={handleAdvancedSearch} text="Search" />
        </ButtonSearchContainer>
      </AdvancedSearchContainer>
    </Container>
  );
};

export default AdvancedSearch;
