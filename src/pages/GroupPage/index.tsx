import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Tooltip } from 'antd';

import Button from '../../components/Button';
import GroupList from '../../components/GroupList';
import Input from '../../components/Input';
import { ToastError } from '../../components/Toast/index';
import { translate } from '../../locales';
import history from '../../routes/history';
import {
  selectors,
  createEditGroupRequest,
  getGroupRequest
} from '../../store/modules/groupTemplate/actions';
import {
  Container,
  ContainerButton,
  ContainerFields,
  ContainerTransfer,
  Field,
  Label,
  SubLabel,
  Title,
  TitleContainer,
  GrpLabel,
  BreadCrumbsWrapper,
  BreadCrumbs,
  ArrowDown,
  CurrentPage,
  ErrorContainer
} from './styled';
import { createUserErrorLogRequest } from '../../store/modules/userErrorLog/actions';

const GroupPage: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const resultValue: any = location.state;
  const record = resultValue?.record;
  const groupId = resultValue?.group?.id;
  const groupRecord = resultValue?.group;
  const listing = resultValue?.listing || null;
  const listingId = resultValue?.listingId || null;
  const listRegulatoryUpdates = resultValue?.listRegulatoryUpdates || null;
  const userInput = useRef('');
  const [selectedSubstances, setSelectedSubstances] = useState([]);
  const [maxLengthUserInput, setMaxLengthUserInput] = useState(false);
  const [autoFocus, setAutoFocus] = useState(false);
  const [emptyGroupName, setEmptyGroupName] = useState(false);
  const groupForEdit = useSelector(selectors.groupForEdit);

  useEffect(() => {
    if (groupId) {
      dispatch(getGroupRequest(groupId));
      setSelectedSubstances([])
    }
  }, [dispatch, groupId]);

  useEffect(() => {
    if (groupForEdit) {
      setSelectedSubstances(groupForEdit.RegulationGroupSubstances.map(x => ({
        casNumber: x.casNumber,
        commonName: x.commonName,
        title: `${x.casNumber} • ${x.commonName}`
      })));
    }
  }, [groupForEdit]);


  useEffect(() => {
    if (groupRecord) {
      userInput.current = groupRecord.name;
    }
  }, [groupRecord]);

  function handleSave(e) {
    if (userInput.current) {
      if (
        selectedSubstances.length <= 0
      ) {
        setEmptyGroupName(false);
        dispatch(createUserErrorLogRequest({error: 'Substance or Template is not selected yet !', page: 'CreateEditGroup'}));
        ToastError('Substance or Template is not selected yet !');
        return;
      }
      const obj = {
        recordType: listing ? 3 : record.recordType,
        recordId: listing ? listingId : record.id,
        data: {
          id: groupId ? Number(groupId) : undefined,
          name: userInput.current,
          regulationId: Number(record.id),
          phase: groupRecord?.phase || '',
          phaseOutDate: groupRecord?.phaseOutDate,
          comments: groupRecord?.comments ?? '',
          rows: [
            ...selectedSubstances
          ]
        }
      }
      dispatch(
        createEditGroupRequest({
          recordType: listing ? 3 : record?.recordType,
          recordId: listing ? listingId : record?.id,
          data: {
            id: groupId ? Number(groupId) : undefined,
            name: userInput.current,
            regulationId: Number(record?.id),
            phase: groupRecord?.phase || '',
            phaseOutDate: groupRecord?.phaseOutDate,
            comments: groupRecord?.comments ?? '',
            rows: [
              ...selectedSubstances
            ]
          }
        })
      );
    } else {
      setEmptyGroupName(true);
    }
  }

  const handleOnCancel = () => {
    if (listing && listingId) {
      history.push(`/viewListing/${listingId}`, { scrollToTable: true });
    } else if (record.recordType === 2) { // legisaltion
      history.push(`/legislation/${record.id}`, { scrollToTable: true });
    } else if (record.recordType === 1) { // regulation
      history.push(`/regulation/${record.id}`, { scrollToTable: true });
    }
  }

  return (
    <Container>
      <BreadCrumbsWrapper>
        <BreadCrumbs href="/">Home</BreadCrumbs>
        <ArrowDown />
        <BreadCrumbs
          href={`/${listing ? 'viewListing' : record?.recordType === 2 ? 'legislation' : 'regulation'}/${listing ? listingId : record?.id
            }`}
          onMouseDown={() => {
            if (record?.listingType) {
              localStorage.setItem('reference', record?.id);
              localStorage.setItem('listName', record?.billTitle);
            }
          }}
        >
          <Tooltip title={record?.billTitle}>
            {record?.billTitle.length > 65
              ? `${record?.billTitle.slice(0, 65)}...`
              : record?.billTitle}
          </Tooltip>
        </BreadCrumbs>
        <ArrowDown />
        <CurrentPage>
          {groupId === null ? 'Create' : `Editing '${userInput.current}'`} Grouping
        </CurrentPage>
      </BreadCrumbsWrapper>

      <TitleContainer>
        <Title>Create or Modify a Legislation / Regulation Group</Title>
      </TitleContainer>

      <ContainerFields>
        <Field marginTop="-5px">
          <Input
            placeholder="Insert Group Name"
            type="form"
            defaultText={userInput.current}
            autoFocus={autoFocus}
            maxLength={255}
            onChangeInput={value => {
              userInput.current = value;
              if (userInput.current.length > 255) {
                setMaxLengthUserInput(true)
                setAutoFocus(true);
              } else {
                setMaxLengthUserInput(false)
              }
            }}
            onBlurInput={value => {
              userInput.current = value;
            }}
            onKeyUpInput={e => {
              userInput.current = e.target.value;
            }}
            fontFamily="'Roboto', sans-serif"
            fontSize="14px"
            formLabel={<GrpLabel noMargin>Group Name</GrpLabel>}
            namePath="groupName"
            triggerWarningMessage={emptyGroupName}
            warningMessage={translate('pages.regulatoryUpdates.toastEmpty')}
          />
          {maxLengthUserInput &&
            <ErrorContainer>Maximum Length is 255</ErrorContainer>
          }
        </Field>

        <Field>
          <Label>Legislation or Regulation</Label>
          <SubLabel>{record?.billTitle}</SubLabel>
        </Field>
      </ContainerFields>

      <ContainerTransfer>
        <GroupList
          recordId={record?.id}
          onSetSelectedSubstances={subs => {
            setSelectedSubstances(subs);
          }}
          groupId={groupId}
          groupTaggedToImpAssessment={groupForEdit?.groupTaggedToImpAssessment}
          recordType={
            listing
              ? 'listing'
              : record?.recordType === 2
                ? 'legislation'
                : 'regulation'
          }
          listRegulatoryUpdates={listRegulatoryUpdates}
        />
      </ContainerTransfer>

      <ContainerButton>
        <Button
          onClick={handleOnCancel}
          text="Cancel"
        />
        <Button
          type="primary"
          text="Save Group"
          onClick={handleSave}
          isDisabled={maxLengthUserInput}
        />
      </ContainerButton>
    </Container>
  );
};

export default GroupPage;
