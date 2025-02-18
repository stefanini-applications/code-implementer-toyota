import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';


import Button from '../../components/Button';
import Input from '../../components/Input';
import { ToastError } from '../../components/Toast/index';
import TransferTemplate from '../../components/TransferTemplate';
import { translate } from '../../locales';
import history from '../../routes/history';
import {
  selectors as groupTemplateSelector,
  getGroupTemplateRequest,
  clearTemplateData,
  clearGroupData,
  getTemplateRequest,
  createEditTemplateRequest,
  clearSelectedTemplateData
} from '../../store/modules/groupTemplate/actions';
import {
  Container,
  ContainerButton,
  ContainerFields,
  ContainerTransfer,
  Field,
  Title,
  TitleContainer,
  GrpLabel,
  ErrorContainer
} from './styled';

const CreateTemplate: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userInput = useRef('');
  const [selectedSubstances, setSelectedSubstances] = useState<any>([]);
  const [maxLengthUserInput, setMaxLengthUserInput] = useState(false);
  const [autoFocus, setAutoFocus] = useState(false);
  const [emptyTemplateName, setEmptyTemplateName] = useState(false);
  const templateForEdit:any = useSelector(groupTemplateSelector.templateForEdit);
  const templateList = useSelector(groupTemplateSelector.groupTemplate);
  const templatePagination = useSelector(groupTemplateSelector.groupTemplatePaginationInfo);
  const [searchedValue, setSearchedValue] = useState('');
  const [showLoadingLeftTable, setShowLoadingLeftTable] = useState(true);
  const [showLoadingRightTable, setShowLoadingRightTable] = useState(true);
  const [searching, setSearching] = useState(true);
  const path = location.pathname.split('/')
  const templateId = Number(path[2]);

  useEffect(() => {
    if (templateId) {
      dispatch(getTemplateRequest(templateId));
      setSelectedSubstances([])
    } else {
      userInput.current = '';
      setSelectedSubstances([])
      setShowLoadingRightTable(false)
    }
  }, [dispatch, templateId]);

  useEffect(() => {
    dispatch(clearTemplateData())
    dispatch(clearSelectedTemplateData())
    dispatch(clearGroupData())
    getTemplateData(1, '');
  }, [dispatch]);
  

  useEffect(() => {
    if (templateList) {
      setShowLoadingLeftTable(false)
    } else {
      setShowLoadingLeftTable(true)
    }
  }, [templateList]);

  
  useEffect(() => {
    if (templateList) {
      setShowLoadingLeftTable(false)
    } else {
      setShowLoadingLeftTable(true)
    }
  }, [searching]);

  useEffect(() => {
    if (templateForEdit) {
      setSelectedSubstances(templateForEdit.GroupTemplateRows.map(x => ({
        casNumber: x.Substance.casNumber,
        commonName: x.Substance.commonName,
        title: `${x.Substance.casNumber} • ${x.Substance.commonName}`
      })));
      userInput.current =  templateForEdit.name;
      setShowLoadingRightTable(false)
    } else {
      userInput.current = '';
      setSelectedSubstances([])
    }
  }, [templateForEdit]);

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
        groupId: null
      })
    );
    setShowLoadingLeftTable(true)
  }
  
  const handleChange = (value:any) => {
    selectedSubstances.push(...value)
    prepareAndSetSubstances(selectedSubstances)
  };

  const handleDeleteSubstances = (value:any) => {
    const casNumberArray = value.map((x:any) => x.casNumber)
    prepareAndSetSubstances(casNumberArray)
  };

  const prepareAndSetSubstances = (substances:any) => {
    const auxSelected = removeDuplicatesObj(selectedSubstances.filter((x:any) => substances.indexOf(x.casNumber) === -1), 'casNumber')
    setSelectedSubstances(auxSelected)
  }

  const removeDuplicatesObj = (myArr, prop) => {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

  function handleSave(e) {
    if (userInput.current) {
      if (
        selectedSubstances.length <= 0
      ) {
        setEmptyTemplateName(false);
        ToastError('Substance or Template is not selected yet !');
        // return;
      }
      dispatch(
        createEditTemplateRequest({
          id: templateId ? Number(templateId) : undefined,
          name: userInput.current,
          substances: selectedSubstances.map(x=>x.casNumber)
        })
      );
      history.push('/admin')
    } else {
      setEmptyTemplateName(true);
    }
  }

  const handleOnCancel = () => {
    history.push('/admin')
  }

  return (
    <Container>
      {/* <BreadCrumbsWrapper>
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
      </BreadCrumbsWrapper> */}

      <TitleContainer>
        <Title>Create or Modify a Template</Title>
      </TitleContainer>

      <ContainerFields>
        <Field marginTop="-5px">
          <Input
            placeholder="Insert Template Name..."
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
            formLabel={<GrpLabel noMargin>Template Name</GrpLabel>}
            namePath="templateName"
            triggerWarningMessage={emptyTemplateName}
            warningMessage={translate('pages.regulatoryUpdates.toastEmpty')}
          />
          {maxLengthUserInput &&
            <ErrorContainer>Maximum Length is 255</ErrorContainer>
          }
        </Field>
      </ContainerFields>

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
        />
      </ContainerTransfer>

      <ContainerButton>
        <Button
          onClick={handleOnCancel}
          text="Cancel"
        />
        <Button
          type="primary"
          text="Save Template"
          onClick={handleSave}
          isDisabled={maxLengthUserInput}
        />
      </ContainerButton>
    </Container>
  );
};

export default CreateTemplate;
