/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Moment from 'moment';

import { translate } from '../../../locales';
import listToyotaJurisdictions from '../../../mocks/impact-tabs';
import {
  selectors as enumeratorsSelector,
  getJurisdictionsRequest,
  getAgencyRequest
} from '../../../store/modules/enumerators/actions';
import {
  createRegulationRecordRequest,
  editRegulationRecordRequest
} from '../../../store/modules/regulations/actions';
import {
  selectors,
  getSubstancesUsesRequest
} from '../../../store/modules/substanceUses/actions';
import Button from '../../Button';
import CkEditor from '../../CkEditor';
import Input from '../../Input';
import Select from '../../Select';
import {
  Container,
  Content,
  MainSection,
  ContentWrapper,
  Wrapper,
  Label,
  MainSectionText,
  GeneralSection,
  TextExecSummary,
  ButtonsContainer,
  Overlay,
  UpdateModal,
  TitleModal,
  CloseIcon,
  Warning,
  AlertText,
  DropdownContainer,
  TextField,
  TextAreaField,
  ErrorContainer
} from './styled';

interface IModalRegulation {
  open?: boolean;
  close?: any;
  editData?: any;
  modalTitle: any;
  updateList?: any;
}

const ModalRegulation: React.FC<IModalRegulation> = ({
  open,
  close,
  editData,
  modalTitle,
  updateList
}) => {
  const listAgency = useSelector(enumeratorsSelector?.agency);
  const casNumberRef: any = useRef('');
  const nicknameRef: any = useRef('');
  const executiveSummary: any = useRef('');
  const resultValue: any = editData;
  const jurisdictionRef: any = useRef();
  const regulatoryBodyRef: any = useRef();
  const dispatch = useDispatch();
  const [emptyRegulationName, setEmptyRegulationName] = useState(false);
  const [jurisdictionId, setjurisdictionId] = useState(null);
  const [emptyJuridiction, setEmptyJuridiction] = useState(false);
  const [emptyRegulationBody, setEmptyRegulationBody] = useState(false);
  const [maxLengthRegulationName, setMaxLengthRegulationName] = useState(false);
  const [autoFocus, setAutoFocus] = useState(false);
  const [autoFocusRegNick, setAutoFocusRegNick] = useState(false);
  const [maxLengthRegulationNickName, setMaxLengthRegulationNickName] = useState(false);
  const substanceUses = useSelector(selectors.substanceUses);
  const [filteredAgencyList, setFilteredAgencyList] = useState<any>([]);
  const regulationName: any = useRef('');
  const regulationNickName: any = useRef('');
  const [regulationSummary, setregulationSummary] = useState('');
  const [regulatoryBody, setregulatoryBody] = useState<any>(null);
  const [jurisdiction, setJurisdiction] = useState<any>(null);

  useEffect(() => {
    if (resultValue) {
      resultValue.Jurisdiction.tab = resultValue.Jurisdiction.description;
      resultValue.Agency.tab = resultValue.Agency.description;
      regulationNickName.current = resultValue.nickname;
      regulationName.current = resultValue.billTitle;
      setregulationSummary(resultValue.billEpaDocket);
      setregulatoryBody(resultValue.Agency);
      setJurisdiction(resultValue.Jurisdiction.id);
    }
  }, [resultValue]);

  useEffect(() => {
    if (resultValue && resultValue.Jurisdiction && listAgency) {
      setFilteredAgencyList(
        listAgency.filter(
          x =>
            x.Jurisdictions.find(
              j => j.id === resultValue.Jurisdiction.id.toString()
            ) !== undefined
        )
      );
    }
  }, [resultValue, listAgency]);

  useEffect(() => {
    if (open) {
      if (!resultValue) {
        regulationNickName.current = '';
        regulationName.current = '';
        setregulationSummary('');
      }
      setFilteredAgencyList([]);
      dispatch(getSubstancesUsesRequest());
      dispatch(getAgencyRequest({ type: '1', onlyActive: true }));
    }
  }, [open, dispatch]);

  useEffect(() => {
    if (open) {
      document.body.classList.add("hide-overflow");
    }
  }, [open]);

  function handleSubmit() {
    // if (resultValue && !jurisdictionRef.current.value) {
    //   jurisdictionRef.current.value = resultValue?.Jurisdiction?.id;
    // }
    document.body.classList.remove("hide-overflow");
    if (regulationName.current && jurisdiction && regulatoryBody) {
      if (resultValue?.id) {
        dispatch(
          editRegulationRecordRequest({
            id: Number(resultValue?.id),
            active: true,
            agencyId: Number(regulatoryBody.id),
            billEpaDocket: regulationSummary || '',
            billTitle: regulationName.current,
            categoryId: resultValue?.categoryId
              ? Number(resultValue?.categoryId)
              : null,
            jurisdictionId: Number(jurisdiction),
            nickname: regulationNickName.current || '',
            recordType: resultValue?.recordType,
            tags: [],
            typeId: Number(resultValue?.typeId),
            year: resultValue?.year ? resultValue?.year : Moment().year()
          })
        );
      } else {
        dispatch(
          createRegulationRecordRequest({
            active: true,
            agencyId: Number(regulatoryBody.id),
            billEpaDocket: regulationSummary || '',
            billTitle: regulationName.current,
            categoryId: 1,
            jurisdictionId: Number(jurisdiction),
            nickname: regulationNickName.current || '',
            recordType: 1,
            tags: [],
            typeId: 1,
            year: Moment().year()
          })
        );
      }
      close && close();
      updateList && updateList();
    } else {
      !regulationName.current && setEmptyRegulationName(true);
      !jurisdiction && setEmptyJuridiction(true);
      !regulatoryBody && setEmptyRegulationBody(true);
    }
  }

  const handleClose = () => {
    document.body.classList.remove("hide-overflow");
    setEmptyRegulationName(false);
    setEmptyJuridiction(false);
    setEmptyRegulationBody(false);
    close();
  };

  return open ? (
    <Container>
      <UpdateModal>
        <TitleModal>
          <p>{modalTitle}</p>
          <CloseIcon onClick={() => handleClose()} />
        </TitleModal>
        <Content>
          <MainSection>
            <Wrapper>
              <ContentWrapper>
                <MainSectionText marginTop="-10px">
                  <Input
                    className="input-casnum"
                    type="form"
                    onFocus={() => { setAutoFocusRegNick(false) }}
                    autoFocus={autoFocus}
                    defaultText={regulationName.current}
                    maxLength={255}
                    onChangeInput={(value) => {
                      regulationName.current = value;
                      if (value.length == 256) {
                        setMaxLengthRegulationName(true)
                        setAutoFocus(true);
                      } else {
                        setMaxLengthRegulationName(false)
                      }
                    }}
                    formLabel={
                      <Label noMargin >Regulation Name</Label>
                    }
                    namePath="Regulation Name"
                    triggerWarningMessage={emptyRegulationName}
                    warningMessage={translate('pages.regulatoryUpdates.toastEmpty')}
                  />
                  {maxLengthRegulationName &&
                    <ErrorContainer>Maximum Length is 255</ErrorContainer>
                  }
                </MainSectionText>
              </ContentWrapper>
              <ContentWrapper>
                <MainSectionText marginTop="-10px">
                  <Input
                    type="form"
                    defaultText={regulationNickName.current}
                    onFocus={() => { setAutoFocus(false) }}
                    autoFocus={autoFocusRegNick}
                    maxLength={255}
                    onChangeInput={(value) => {
                      regulationNickName.current = value;
                      if (regulationNickName.current.length > 255) {
                        setMaxLengthRegulationNickName(true)
                        setAutoFocusRegNick(true);
                      } else {
                        setMaxLengthRegulationNickName(false)
                      }
                    }}
                    formLabel={
                      <Label noMargin >Nickname</Label>
                    }
                  />
                  {maxLengthRegulationNickName &&
                    <ErrorContainer>Maximum Length is 255</ErrorContainer>
                  }
                </MainSectionText>
              </ContentWrapper>
              <ContentWrapper>
                <MainSectionText>
                  <DropdownContainer marginTop="-10px">
                    <Select
                      labelValue="tab"
                      keyValue="id"
                      values={listToyotaJurisdictions}
                      // selectedValue={jurisdiction || ''}
                      defaultValue={resultValue?.Jurisdiction.description}
                      onChange={(value: { value: string; label: React.ReactNode }) => {
                        setJurisdiction(value.value)
                        setregulatoryBody(null);
                        if (value) {
                          setEmptyJuridiction(false);
                        }
                        setFilteredAgencyList(
                          listAgency.filter(
                            x =>
                              x.Jurisdictions.find(
                                j => Number(j.id) === Number(value.value)
                              ) !== undefined
                          )
                        );
                      }}
                      isFormType
                      formLabel={
                        <Label noMargin>Jurisdiction</Label>
                      }
                      namePath="jurisdiction"
                      triggerWarningMessage={emptyJuridiction}
                      warningMessage={translate('pages.regulatoryUpdates.toastEmpty')}
                      size="200px"
                    />
                  </DropdownContainer>
                </MainSectionText>
              </ContentWrapper>
              <ContentWrapper>
                <MainSectionText>
                  <DropdownContainer marginTop="-10px">
                    <Select
                      labelValue="description"
                      keyValue="id"
                      values={filteredAgencyList}
                      selectedValue={
                        regulatoryBody ? regulatoryBody.description : ''
                      }
                      onChange={(value: { value: string; label: React.ReactNode }) => {
                        setregulatoryBody(
                          filteredAgencyList?.find(x => x?.id === value.value)
                        );
                        if (value) {
                          setEmptyRegulationBody(false);
                        }
                      }}
                      isFormType
                      formLabel={
                        <Label noMargin>Regulatory Body</Label>
                      }
                      namePath="regulationBody"
                      triggerWarningMessage={emptyRegulationBody}
                      warningMessage={translate('pages.regulatoryUpdates.toastEmpty')}
                      size="200px"
                    />
                  </DropdownContainer>
                </MainSectionText>
              </ContentWrapper>
            </Wrapper>
          </MainSection>

          <GeneralSection>
            <Label>{translate('pages.substanceRecord.execSummary')}</Label>
            <CkEditor
              id="billEpaDocket"
              name="billEpaDocket"
              data={regulationSummary}
              onChange={(event: any, editor: any) => {
                setregulationSummary(editor.getData());
              }}
              isReadOnly={false}
              overFlowHide={false}
              onClickNotify={undefined}
            />
          </GeneralSection>
        </Content>
        <ButtonsContainer>
          <Button text="Cancel" onClick={() => handleClose()} />
          <Button type="primary" isDisabled={maxLengthRegulationName || maxLengthRegulationNickName} text="Save" onClick={handleSubmit} />
        </ButtonsContainer>
      </UpdateModal>
      <Overlay />
    </Container>
  ) : null;
};

export default ModalRegulation;
