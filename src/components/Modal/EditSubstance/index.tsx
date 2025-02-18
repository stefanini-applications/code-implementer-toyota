/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { translate } from '../../../locales';
import history from '../../../routes/history';
import {
  createSubstanceRecordRequest,
  editSubstanceRecordRequest
} from '../../../store/modules/substances/actions';
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
  SubstanceNameSection,
  SubstanceNameWrapper,
  Overlay,
  UpdateModal,
  TitleModal,
  XIcon,
  ErrorContainer
} from './styled';

export interface IOptions {
  value: any;
  label: any;
}
interface IModalUpdate {
  open?: boolean;
  close?: any;
  editData?: any;
  modalTitle: any;
}
const ModalSubstanceEdit: React.FC<IModalUpdate> = ({
  open,
  close,
  editData,
  modalTitle
}) => {
  const substanceUses = useSelector(selectors.substanceUses);
  const [emptyCommonName, setEmptyCommonName] = useState(false);
  const [maxLengthCommonName, setMaxLengthCommonName] = useState(false);
  const [autoFocus, setAutoFocus] = useState(false);
  const [emptyCasNumber, setEmptyCasNumber] = useState(false);
  const [usesValue, setUsesValue] = useState<any>(null);
  const dispatch = useDispatch();
  const casNumber: any = useRef('');
  const commonName: any = useRef('');
  const otherNames: any = useRef('');
  const execSummary: any = useRef('');
  const nextSteps: any = useRef('');
  const resultValue: any = editData;

  useEffect(() => {
    if (editData) {
      otherNames.current = editData.otherNames;
      casNumber.current = editData.casNumber;
      commonName.current = editData.commonName;
      execSummary.current = editData.execSummary;
      nextSteps.current = editData.nextAction;
      const uses: any = [];
      resultValue?.SubstanceUses.forEach(element => {
        uses.push(Number(element.id));
      });
      setUsesValue(uses)
    } else {
      execSummary.current = '';
      nextSteps.current = '';
      setUsesValue(null)
    }
  }, [editData]);

  function handleSaveSubstance() {
    document.body.classList.remove("hide-overflow");
    if (casNumber.current && commonName.current && commonName.current.length <= 255) {
      if (resultValue?.id) {
        dispatch(
          editSubstanceRecordRequest({
            id: Number(resultValue?.id),
            commonName: commonName.current,
            otherNames: otherNames.current || '',
            casNumber: casNumber.current,
            execSummary: execSummary.current || '',
            nextAction: nextSteps.current || '',
            uses: usesValue || [],
            recordType: 1,
            active: 1
          })
        );
      } else {
        dispatch(
          createSubstanceRecordRequest({
            commonName: commonName.current,
            otherNames: otherNames.current,
            casNumber: casNumber.current,
            execSummary: execSummary.current,
            nextAction: nextSteps.current,
            uses: usesValue || [],
            recordType: 1,
            active: 1
          })
        );
      }
      close();
    } else {
      if (!casNumber.current) {
        setEmptyCasNumber(true)
      }
      if (!commonName.current) {
        setEmptyCommonName(true)
      }
      if (commonName.current.length > 255) {
        setMaxLengthCommonName(true)
      }
    }
  }
  useEffect(() => {
    if (open) {
      dispatch(getSubstancesUsesRequest());
      document.body.classList.add("hide-overflow");
    }
  }, [open]);

  const handleChangeUsesCheckbox = (value: any) => {
    setUsesValue(
      value.map(str => {
        return Number(str.value);
      })
    );
  };

  const handleClose = () => {
    document.body.classList.remove("hide-overflow");
    setEmptyCommonName(false);
    setEmptyCasNumber(false);
    setMaxLengthCommonName(false)
    close();
  };

  return open ? (
    <Container>
      <UpdateModal>
        <TitleModal>
          <p>{modalTitle}</p>
          <XIcon onClick={() => handleClose()} />
        </TitleModal>
        {/* <HeaderContainer>
          <BreadCrumbsWrapper>
            <BreadCrumbs href='/'>
              {translate('breadcrumbs.home')}
            </BreadCrumbs>
            <ArrowDown />
            <CurrentPage>New Substance</CurrentPage>
          </BreadCrumbsWrapper>
        </HeaderContainer> */}
        <Content>
          <MainSection>
            <Wrapper>
              <ContentWrapper>
                <MainSectionText>
                  <Input
                    className="input-casnum"
                    type="casnum"
                    defaultText={casNumber.current}
                    onChangeInput={(value) => {
                      casNumber.current = value;
                    }}
                    formLabel={
                      <Label noMargin>
                        {translate('pages.substanceRecord.cas')}
                      </Label>
                    }
                    namePath="casNumber"
                    triggerWarningMessage={emptyCasNumber}
                    warningMessage={translate('pages.regulatoryUpdates.toastEmpty')}
                  />
                </MainSectionText>
              </ContentWrapper>
              <SubstanceNameWrapper>
                <SubstanceNameSection>
                  <Input
                    className="input-commonname"
                    type="form"
                    maxLength={255}
                    defaultText={commonName.current}
                    autoFocus={autoFocus}
                    onChangeInput={(value) => {
                      commonName.current = value;
                      if (commonName.current.length > 255) {
                        setMaxLengthCommonName(true)
                        setAutoFocus(true);
                      } else {
                        setMaxLengthCommonName(false)
                      }
                    }}
                    formLabel={
                      <Label noMargin>
                        {translate('pages.substanceRecord.substanceName')}
                      </Label>
                    }
                    namePath="Substance Name"
                    triggerWarningMessage={emptyCommonName}
                    warningMessage={translate('pages.regulatoryUpdates.toastEmpty')}
                  />
                  {maxLengthCommonName &&
                    <ErrorContainer>Maximum Length is 255</ErrorContainer>
                  }
                </SubstanceNameSection>
              </SubstanceNameWrapper>
            </Wrapper>
          </MainSection>
          <GeneralSection>
            <Label>{translate('pages.substanceRecord.otherNames')}</Label>
            <TextExecSummary>
              <Input
                className="textarea textarea-nextsteps"
                type="textarea"
                defaultText={otherNames.current}
                onChangeInput={(value) => {
                  otherNames.current = value;
                }}
              />
            </TextExecSummary>
          </GeneralSection>
          <GeneralSection>
            <Label>{translate('pages.substanceRecord.execSummary')}</Label>
            <CkEditor
              id="execSummary"
              name="execSummary"
              data={resultValue ? resultValue.execSummary : ''}
              onChange={(event: any, editor: any) => {
                execSummary.current = editor.getData();
              }}
              isReadOnly={false}
              overFlowHide={false}
              onClickNotify={undefined}
            />
          </GeneralSection>
          <GeneralSection>
            <Label>{translate('pages.substanceRecord.nextSteps')}</Label>
            <CkEditor
              id="nextSteps"
              name="nextSteps"
              data={resultValue ? resultValue.nextAction : ''}
              onChange={(event: any, editor: any) => {
                nextSteps.current = editor.getData();
              }}
              isReadOnly={false}
              overFlowHide={false}
              onClickNotify={undefined}
            />
          </GeneralSection>
          <GeneralSection>
            <Label>{translate('pages.substanceRecord.substancesUses')}</Label>
            <Select
              mode="multiple"
              values={substanceUses}
              labelValue="description"
              keyValue="id"
              onChange={handleChangeUsesCheckbox}
              defaultValue={resultValue?.SubstanceUses}
            />
          </GeneralSection>
        </Content>
        <ButtonsContainer>
          <Button text="Cancel" onClick={() => handleClose()} />
          <Button type="primary" isDisabled={maxLengthCommonName} text="Save" onClick={handleSaveSubstance} />
        </ButtonsContainer>
      </UpdateModal>
      <Overlay />
    </Container>
  ) : null;
};

export default ModalSubstanceEdit;
