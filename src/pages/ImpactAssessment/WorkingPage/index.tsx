/* eslint-disable prefer-destructuring */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Tooltip, Input as InputAntd } from 'antd';

import Button from '../../../components/Button';
import Input from '../../../components/Input';
import ModalAttachmentsIA from '../../../components/Modal/ModalAttachmentsIA';
import ModalLegislationEdit from '../../../components/Modal/ModalLegislation';
import Select from '../../../components/Select';
import TableDropdown from '../../../components/TableDropdown';
import { translate } from '../../../locales';
import dropOpts from '../../../mocks/dropdown-ia';
import dropOptsNoNN from '../../../mocks/dropdown-ia-no-nn';
import phaseOpts from '../../../mocks/phase-ia';
import regionTabs from '../../../mocks/region-tabs';
import history from '../../../routes/history';
import { selectors, getRegulationsSubstanceRequest } from '../../../store/modules/dropdownValues/actions';
import {
  createImpactAssessmentRecordRequest,
  editImpactAssessmentRecordRequest,
  getImpactAssessmentByIdRequest,
  getImpactAssessmentBySubstanceRequest,
  resetImpactAssessmentBySubstance,
  getImpactAssessmentBySubstanceRegulationAndToyotaRegion,
  selectors as selectorsImpactAssessment,
  getImpactAssessmentRecordRequest,
  getImpactAssessmentRecordRequestClone,
  clearImpactAssessmentData
} from '../../../store/modules/impactAssessment/actions';
import {
  selectors as legislationSelectors,
  getLegislationRecordRequest
} from '../../../store/modules/legislations/actions';
import { selectors as selectorsRegulation, getRegulationRecordRequest } from '../../../store/modules/regulations/actions';
import {
  getToyotaRegionsRequest,
  selectors as selectorsToyotaRegion
} from '../../../store/modules/toyotaRegions/actions';
import {
  Container,
  Content,
  TitleContainer,
  Title,
  Footer,
  ButtonsGroup,
  ImpactAssessmentTable,
  TopSideTable,
  TopTitleRowColumn,
  TopSubColumnOne,
  TopSubColumnTwo,
  TopSubColumnThree,
  TopSubColumnFour,
  TopSubOneCelOne,
  TopSubOneCelTwo,
  TopSubOneCelThree,
  TopSubOneCelFour,
  TopSubTwoCelOne,
  TopSubThreeCelOne,
  TopSubThreeCelTwo,
  TopSubThreeCelThree,
  TopSubThreeCelFour,
  TopSubFourCelOne,
  TopSubFourCelTwo,
  TopSubFourCelThree,
  TopSubFourCelFour,
  BottomSideTable,
  BottomTitleColumnOne,
  BottomTitleColumnTwo,
  BottomSubColumnOne,
  BottomSubColumnTwo,
  BottomSubColumnThree,
  BottomSubColumnFour,
  BottomSubColumnFive,
  BottomSubColumnSix,
  BottomSubColumnSeven,
  BottomSubOneCelOne,
  BottomSubOneCelTwo,
  BottomSubOneCelThree,
  BottomSubOneCelFour,
  BottomSubTwoCelOne,
  BottomSubThreeCelOne,
  BottomSubThreeCelTwo,
  BottomSubThreeCelThree,
  BottomSubThreeCelFour,
  BottomSubSitesCelOne,
  BottomSubSitesCelTwo,
  BottomSubSitesCelThree,
  BottomSubSitesCelFour,
  BottomSubFourCelOne,
  BottomSubFourCelTwo,
  BottomSubFourCelThree,
  BottomSubFourCelFour,
  BottomSubFiveCelOne,
  BottomSubFiveCelTwo,
  BottomSubFiveCelThree,
  BottomSubFiveCelFour,
  BottomSubSixCelOne,
  BottomSubSixCelTwo,
  BottomSubSixCelThree,
  BottomSubSixCelFour,
  BottomSubSevenCelOne,
  BottomSubSevenCelTwo,
  BottomSubSevenCelThree,
  BottomSubSevenCelFour,
  BottomSubCommentCelOne,
  BottomSubCommentCelTwo,
  BottomSubCommentCelThree,
  BottomSubCommentCelFour,
  BottomSubColumnComment,
  Wrapper,
  Label,
  HeaderContainer,
  BreadCrumbsWrapper,
  BreadCrumbs,
  CurrentPage,
  ArrowDown,
  InputWrapper,
  SelectWrapper,
  DropdownContainer,
  BottomSubColumnSites,
  BottomTitleColumnThree,
  EditLegislationContainer,
  EditLegislationButton,
  EditLegislationIco,
  ErrorContainer,
  LabelPlaceholders,
  ValidationError,
  AttachmentsButtonContainer,
  AttachmentsCount,
} from './styled';

const NewRecord: React.FC = () => {
  const [agencyName, setAgencyName] = useState();
  const [recordType, setRecordType] = useState(0);
  const [toyotaRegion, setToyotaRegion] = useState<any>();
  const [regulationId, setRegulationId] = useState<any>();
  const [emptyLegFramework, setEmptyLegFramework] = useState(false);
  const [emptyRegion, setEmptyRegion] = useState(false);
  const [emptyPhase, setEmptyPhase] = useState(false);
  const [maxLengthScopeComments, setMaxLengthScopeComments] = useState([false, false, false, false]);
  const [openAttachments, setOpenAttachments] = useState(false);
  const [maxLengthHits, setMaxLengthHits] = useState([false, false, false, false]);
  const [maxLengthSites, setMaxLengthSites] = useState([false, false, false, false]);
  const [maxLengthCommentAnalysis, setMaxLengthCommentAnalysis] = useState([false, false, false, false]);
  const [maxLengthComment, setMaxLengthComment] = useState([false, false, false, false]);
  const [openModal, setOpenModal] = useState(false);
  const [updated, setUpdated]: any = useState({});
  const [duplicatedByToyotaRegion, setDuplicatedByToyotaRegion] = useState(false);
  const [impactDataLoaded, setImpactDataLoaded] = useState(false);
  const [jurisdictionName, setJurisdictionName] = useState();
  const listToyotaRegions = useSelector(selectorsToyotaRegion.toyotaRegions);
  const listRegulations = useSelector(selectors.dropDownRegulationSubstance);
  const regulation: any = useSelector(selectorsRegulation.regulationRecord);
  const legislation = useSelector(legislationSelectors.legislationRecord);
  const toyotaRegionSelector = useSelector(selectorsImpactAssessment.impactAssessmentBySubstanceRegulationAndToyotaRegion);
  const levelRowOneRef: any = useRef('');
  const levelRowTwoRef: any = useRef('');
  const levelRowThreeRef: any = useRef('');
  const levelRowFourRef: any = useRef('');
  const scopeCommentOneRef: any = useRef('');
  const scopeCommentTwoRef: any = useRef('');
  const scopeCommentThreeRef: any = useRef('');
  const scopeCommentFourRef: any = useRef('');
  const hitsOneRef: any = useRef('');
  const hitsTwoRef: any = useRef('');
  const hitsThreeRef: any = useRef('');
  const hitsFourRef: any = useRef('');
  const generalCommentsOneRef: any = useRef('');
  const generalCommentsTwoRef: any = useRef('');
  const generalCommentsThreeRef: any = useRef('');
  const generalCommentsFourRef: any = useRef('');
  const sitesTwoRef: any = useRef('');
  const sitesThreeRef: any = useRef('');
  const commentOneRef: any = useRef('');
  const commentTwoRef: any = useRef('');
  const commentThreeRef: any = useRef('');
  const commentFourRef: any = useRef('');
  const resourcesOneRef: any = useRef('');
  const resourcesTwoRef: any = useRef('');
  const resourcesThreeRef: any = useRef('');
  const resourcesFourRef: any = useRef('');
  const developmentOneRef: any = useRef('');
  const developmentTwoRef: any = useRef('');
  const developmentThreeRef: any = useRef('');
  const developmentFourRef: any = useRef('');
  const evaluationOneRef: any = useRef('');
  const evaluationTwoRef: any = useRef('');
  const evaluationThreeRef: any = useRef('');
  const evaluationFourRef: any = useRef('');

  const textareaRef = useRef<typeof Input>(null);
  const [hideSwitch, setHideSwitch] = useState(true);
  const impactData: any = useSelector(
    selectorsImpactAssessment.impactAssessmentRecord
  );
  const impactDataClone: any = useSelector(
    selectorsImpactAssessment.impactAssessmentRecordClone
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split('/')
  const newImpactAssessment = path[1] === 'newRecord-impactAssessment'
  const impactAssessmentIndex = newImpactAssessment ? null : Number(path[2]);

  const resultValue = JSON.parse(`{"${location.search.substring(1).replace(/&/g, '","').replace(/=/g, '":"')}"}`, function (key, value) { return key === "" ? value : decodeURIComponent(value) });
  const pattern = /replace_and_char/gi;
  const replacement = "&";
  const type = resultValue?.type;
  const typeId = resultValue?.typeId;
  const typeName = resultValue?.typeName.replace(pattern, replacement);
  const substanceIdValue = resultValue?.substance;
  const commName = resultValue?.commonName.replace(pattern, replacement);
  const toyotaRegionIdValue = resultValue?.region;
  const toyotaRegionDescription = regionTabs.find(x => x.id === Number(toyotaRegionIdValue))?.tab
  const regulationIdValue = resultValue?.regulation || resultValue?.regulationId;
  const [phaseRef, setPhaseRef] = useState<any>(resultValue?.phase ?? '');

  let breadCrumbName = ''
  let url = ''
  switch (type) {
    case 'legislation':
      url = `/legislation/${typeId}`;
      breadCrumbName = typeName
      break;
    case 'regulation':
      url = `/regulation/${typeId}`;
      breadCrumbName = typeName
      break;
    case 'listing':
      url = `/viewListing/${typeId}`;
      breadCrumbName = typeName
      break;
    default:
      url = `/substance/${substanceIdValue}`;
      breadCrumbName = `${resultValue?.casNumber} • ${commName}`
      break;
  }

  useEffect(() => {
    if (newImpactAssessment) {
      dispatch(getToyotaRegionsRequest());
    }
  }, []);

  useEffect(() => {
    if (toyotaRegionSelector?.length > 0) {
      setDuplicatedByToyotaRegion(true);
    } else {
      setDuplicatedByToyotaRegion(false);
    }
  }, [toyotaRegionSelector]);

  useEffect(() => {
    if (openModal) {
      dispatch(getLegislationRecordRequest({ id: regulationId }));
    }
  }, [openModal]);

  useEffect(() => {
    if (regulationIdValue && location.search) {
      dispatch(getRegulationRecordRequest({ id: regulationIdValue }));
    }
  }, [location.search]);

  useEffect(() => {
    if (regulation) {
      setRegulationId(regulation.id);
      setAgencyName(regulation.Agency.description);
      setRecordType(regulation.recordType);
      setJurisdictionName(regulation.Jurisdiction.description);
    }
  }, [regulation]);


  useEffect(() => {
    if (impactData && !newImpactAssessment) {
      setRegulationId(impactData?.Regulation?.id || regulationIdValue);
      setAgencyName(impactData?.Regulation?.Agency?.description || regulation?.Agency?.description);
      setRecordType(impactData?.Regulation?.recordType || regulation?.recordType);
      setJurisdictionName(impactData?.Regulation?.Jurisdiction?.description || regulation?.Jurisdiction?.description);
      setPhaseRef(impactData?.phase || resultValue?.phase)
      setToyotaRegion(impactData?.toyotaRegionId || toyotaRegionIdValue)
      if (impactData?.ImpactAssessmentRows && impactData?.ImpactAssessmentRows.length > 0) {
        setHideSwitch(
          impactData?.ImpactAssessmentRows[0].hits ||
          impactData?.ImpactAssessmentRows[1].hits ||
          impactData?.ImpactAssessmentRows[2].hits ||
          impactData?.ImpactAssessmentRows[3].hits ||
          impactData?.ImpactAssessmentRows[0].comments ||
          impactData?.ImpactAssessmentRows[1].comments ||
          impactData?.ImpactAssessmentRows[2].comments ||
          impactData?.ImpactAssessmentRows[3].comments ||
          impactData?.ImpactAssessmentRows[0].resourcesImpact !== 0 ||
          impactData?.ImpactAssessmentRows[1].resourcesImpact !== 0 ||
          impactData?.ImpactAssessmentRows[2].resourcesImpact !== 0 ||
          impactData?.ImpactAssessmentRows[3].resourcesImpact !== 0 ||
          impactData?.ImpactAssessmentRows[0].dev !== 0 ||
          impactData?.ImpactAssessmentRows[1].dev !== 0 ||
          impactData?.ImpactAssessmentRows[2].dev !== 0 ||
          impactData?.ImpactAssessmentRows[3].dev !== 0 ||
          impactData?.ImpactAssessmentRows[0].evalTime !== 0 ||
          impactData?.ImpactAssessmentRows[1].evalTime !== 0 ||
          impactData?.ImpactAssessmentRows[2].evalTime !== 0 ||
          impactData?.ImpactAssessmentRows[3].evalTime !== 0 ||
          impactData?.ImpactAssessmentRows[0].generalComments ||
          impactData?.ImpactAssessmentRows[1].generalComments ||
          impactData?.ImpactAssessmentRows[2].generalComments ||
          impactData?.ImpactAssessmentRows[3].generalComments ||
          impactData?.ImpactAssessmentRows[1].sites ||
          impactData?.ImpactAssessmentRows[2].sites
        );
        commentOneRef.current = impactData?.ImpactAssessmentRows[0].comments
        commentTwoRef.current = impactData?.ImpactAssessmentRows[1].comments
        commentThreeRef.current = impactData?.ImpactAssessmentRows[2].comments
        commentFourRef.current = impactData?.ImpactAssessmentRows[3].comments

        levelRowOneRef.current = impactData?.ImpactAssessmentRows[0].restrictionLevel
        levelRowTwoRef.current = impactData?.ImpactAssessmentRows[1].restrictionLevel
        levelRowThreeRef.current = impactData?.ImpactAssessmentRows[2].restrictionLevel
        levelRowFourRef.current = impactData?.ImpactAssessmentRows[3].restrictionLevel
        hitsOneRef.current = impactData?.ImpactAssessmentRows[0].hits
        hitsTwoRef.current = impactData?.ImpactAssessmentRows[1].hits
        hitsThreeRef.current = impactData?.ImpactAssessmentRows[2].hits
        hitsFourRef.current = impactData?.ImpactAssessmentRows[3].hits

        resourcesOneRef.current = impactData?.ImpactAssessmentRows[0].resourcesImpact
        resourcesTwoRef.current = impactData?.ImpactAssessmentRows[1].resourcesImpact
        resourcesThreeRef.current = impactData?.ImpactAssessmentRows[2].resourcesImpact
        resourcesFourRef.current = impactData?.ImpactAssessmentRows[3].resourcesImpact

        developmentOneRef.current = impactData?.ImpactAssessmentRows[0].dev
        developmentTwoRef.current = impactData?.ImpactAssessmentRows[1].dev
        developmentThreeRef.current = impactData?.ImpactAssessmentRows[2].dev
        developmentFourRef.current = impactData?.ImpactAssessmentRows[3].dev

        evaluationOneRef.current = impactData?.ImpactAssessmentRows[0].evalTime
        evaluationTwoRef.current = impactData?.ImpactAssessmentRows[1].evalTime
        evaluationThreeRef.current = impactData?.ImpactAssessmentRows[2].evalTime
        evaluationFourRef.current = impactData?.ImpactAssessmentRows[3].evalTime

        sitesTwoRef.current = impactData?.ImpactAssessmentRows[1].sites
        sitesThreeRef.current = impactData?.ImpactAssessmentRows[2].sites

        scopeCommentOneRef.current = impactData?.ImpactAssessmentRows[0].scopeComments
        scopeCommentTwoRef.current = impactData?.ImpactAssessmentRows[1].scopeComments
        scopeCommentThreeRef.current = impactData?.ImpactAssessmentRows[2].scopeComments
        scopeCommentFourRef.current = impactData?.ImpactAssessmentRows[3].scopeComments

        generalCommentsOneRef.current = impactData?.ImpactAssessmentRows[0].generalComments
        generalCommentsTwoRef.current = impactData?.ImpactAssessmentRows[1].generalComments
        generalCommentsThreeRef.current = impactData?.ImpactAssessmentRows[2].generalComments
        generalCommentsFourRef.current = impactData?.ImpactAssessmentRows[3].generalComments
      }

      setImpactDataLoaded(true)
    }
  }, [impactData]);

  useEffect(() => {
    if (!listRegulations && newImpactAssessment) {
      dispatch(getRegulationsSubstanceRequest(substanceIdValue));
    }
  }, [listRegulations]);

  useEffect(() => {
    return () => {
      dispatch(resetImpactAssessmentBySubstance());
    }
  }, []);
  
  useEffect(() => {
    if (openAttachments === false) {
      if (impactAssessmentIndex) {
        dispatch(getImpactAssessmentRecordRequestClone({ substanceId: substanceIdValue, regulationId: regulationIdValue, toyotaRegionId: toyotaRegionIdValue }))
      } else {
        setImpactDataLoaded(false)
      }
    }
  }, [openAttachments]);

  useEffect(() => {
    if (impactAssessmentIndex) {
      dispatch(getImpactAssessmentRecordRequest({ substanceId: substanceIdValue, regulationId: regulationIdValue, toyotaRegionId: toyotaRegionIdValue }))
    } else {
      setImpactDataLoaded(false)
    }
  }, [impactAssessmentIndex]);


  function handleCreateImpactAssessment() {
    const hasAnyMaxLength = maxLengthScopeComments.some((el) => el === true) || maxLengthSites.some((el) => el === true) || maxLengthCommentAnalysis.some((el) => el === true) || maxLengthComment.some((el) => el === true);

    if ((phaseRef && phaseRef !== "") && (!hasAnyMaxLength) && (regulationId || regulation) && (toyotaRegion || resultValue?.region) && !duplicatedByToyotaRegion) {
      dispatch(
        editImpactAssessmentRecordRequest({
          active: 1,
          phase: phaseRef.toString() || '',
          regulationId: Number(regulationId || regulation),
          toyotaRegionId: Number(toyotaRegion || resultValue?.region),
          rows: [
            {
              applicationAreaId: 1,
              scopeComments: scopeCommentOneRef.current,
              comments: commentOneRef.current,
              restrictionLevel: levelRowOneRef.current,
              hits: hitsOneRef.current,
              sites: null,
              resourcesImpact: resourcesOneRef.current,
              dev: developmentOneRef.current,
              evalTime: evaluationOneRef.current,
              trendRating: 1,
              generalComments: generalCommentsOneRef.current
            },
            {
              applicationAreaId: 2,
              scopeComments: scopeCommentTwoRef.current,
              comments: commentTwoRef.current,
              restrictionLevel: levelRowTwoRef.current,
              hits: hitsTwoRef.current,
              sites: sitesTwoRef.current,
              resourcesImpact: resourcesTwoRef.current,
              dev: developmentTwoRef.current,
              evalTime: evaluationTwoRef.current,
              trendRating: 1,
              generalComments: generalCommentsTwoRef.current
            },
            {
              applicationAreaId: 3,
              scopeComments: scopeCommentThreeRef.current,
              comments: commentThreeRef.current,
              restrictionLevel: levelRowThreeRef.current,
              hits: hitsThreeRef.current,
              sites: sitesThreeRef.current,
              resourcesImpact: resourcesThreeRef.current,
              dev: developmentThreeRef.current,
              evalTime: evaluationThreeRef.current,
              trendRating: 1,
              generalComments: generalCommentsThreeRef.current
            },
            {
              applicationAreaId: 4,
              scopeComments: scopeCommentFourRef.current,
              comments: commentFourRef.current,
              restrictionLevel: levelRowFourRef.current,
              hits: hitsFourRef.current,
              sites: null,
              resourcesImpact: resourcesFourRef.current,
              dev: developmentFourRef.current,
              evalTime: evaluationFourRef.current,
              trendRating: 1,
              generalComments: generalCommentsFourRef.current
            }
          ],
          substanceId: Number(substanceIdValue),
          url
        })
      );
      dispatch(clearImpactAssessmentData());
    }
  }

  return (
    (impactData && impactDataLoaded) || newImpactAssessment ? (
      <Container>
        {openModal && (
          <ModalLegislationEdit
            open={openModal}
            close={(phase) => {
              if (phase !== undefined) {
                setPhaseRef(phase)
              }
              setOpenModal(false)
            }}
            modalTitle="Edit Legislation"
            editData={legislation}
            editOnlyPhase
          />
        )}

        {openAttachments && (
          <ModalAttachmentsIA
            open={openAttachments}
            close={() => setOpenAttachments(false)}
            modalTitle="Attachments"
            substanceId={substanceIdValue}
            regulationId={regulationIdValue}
            regionId={toyotaRegionIdValue}
          />
        )}

        <Content>
          <HeaderContainer>
            <BreadCrumbsWrapper>
              <BreadCrumbs href="/">Home</BreadCrumbs>
              <ArrowDown />
              <BreadCrumbs
                href={url}
              >
                <Tooltip title={breadCrumbName}>
                  {breadCrumbName.length > 65
                    ? `${breadCrumbName.slice(0, 65)}...`
                    : breadCrumbName}
                </Tooltip>
              </BreadCrumbs>
              <ArrowDown />
              <CurrentPage>Impact Assessment</CurrentPage>
            </BreadCrumbsWrapper>
          </HeaderContainer>
          <TitleContainer>
            <Title>
              Impact Assessment for substance: {resultValue?.casNumber} •{' '}
              {commName}
            </Title>
          </TitleContainer>

          <Wrapper>
            <InputWrapper>
              {!newImpactAssessment || regulation ?
                <LabelPlaceholders noMargin>
                  {recordType === 1
                    ? 'Regulation'
                    : recordType === 2
                      ? 'Legislation'
                      : 'Legislation / Regulation'}</LabelPlaceholders>
                : null}
              <SelectWrapper>

                {!newImpactAssessment ?
                  <p>{impactData?.Regulation ? impactData?.Regulation?.nickname || impactData?.Regulation?.billTitle : regulation?.nickname || regulation?.billTitle}</p>
                  : regulation ? <p>{regulation.nickname ? regulation.nickname : regulation.billTitle}</p> :
                    <DropdownContainer>
                      <Select
                        labelValue="billTitle"
                        keyValue="id"
                        values={listRegulations}
                        formLabel={<Label noMargin>{recordType === 1
                          ? 'Regulation'
                          : recordType === 2
                            ? 'Legislation'
                            : 'Legislation / Regulation'}</Label>}
                        isFormType
                        onChange={value => {
                          const aux = listRegulations.find(
                            (x: any) => x.id === value.value
                          );
                          if (aux.recordType === 1) {
                            // Regulation
                            setPhaseRef(aux.Substances[0].RegulationSubstance.phase)
                          } else {
                            // Legislation
                            setPhaseRef(aux.phase)
                          }
                          if (value) {
                            setEmptyLegFramework(false);
                          }
                          setRegulationId(value.value);
                          setAgencyName(aux.Agency.description);
                          setRecordType(aux.recordType);
                          setJurisdictionName(aux.Jurisdiction.description);
                          if (substanceIdValue && value.value && toyotaRegion) {
                            dispatch(getImpactAssessmentBySubstanceRegulationAndToyotaRegion({ substanceId: substanceIdValue, regulationId: value.value, toyotaRegionId: toyotaRegion }));
                          }
                        }}
                        namePath="framework"
                        triggerWarningMessage={emptyLegFramework}
                        warningMessage={translate('pages.regulatoryUpdates.toastEmpty')}
                        size="360px"
                      />
                    </DropdownContainer>
                }

              </SelectWrapper>
              {duplicatedByToyotaRegion &&
                <ErrorContainer>Impact Assessment already existis for this combination of Regulation and Impacted Toyota Region</ErrorContainer>
              }
            </InputWrapper>
            <InputWrapper>
              <LabelPlaceholders noMargin>
                {recordType === 1
                  ? 'Regulatory Body'
                  : recordType === 2
                    ? 'Sub-jurisdiction'
                    : 'Regulatory Body / Sub-jurisdiction'}
              </LabelPlaceholders>
              <p>{agencyName}</p>
            </InputWrapper>
            <InputWrapper>
              <LabelPlaceholders noMargin>Jurisdiction</LabelPlaceholders>
              <p>{jurisdictionName}</p>
            </InputWrapper>
            <InputWrapper>
              {!newImpactAssessment || resultValue?.region ?
                <LabelPlaceholders noMargin>
                  Impacted Toyota Region
                </LabelPlaceholders>
                : null}
              <SelectWrapper>

                {!newImpactAssessment ?
                  <p>{impactData.length > 0 ?
                    impactData?.ImpactAssessmentRows[0]?.ToyotaRegion?.description.toUpperCase() :
                    toyotaRegionDescription}</p>
                  : resultValue?.region
                    ? <p>{listToyotaRegions?.find(obj => obj.id === resultValue?.region).description}</p> :
                    <DropdownContainer>
                      <Select
                        labelValue="description"
                        keyValue="id"
                        values={listToyotaRegions}
                        formLabel={<Label noMargin>Impacted Toyota Region</Label>}
                        defaultValue={
                          toyotaRegionIdValue
                        }
                        onChange={value => {
                          setToyotaRegion(value.value);
                          if (value) {
                            setEmptyRegion(false);
                            if (substanceIdValue && regulationId && value.value) {
                              dispatch(getImpactAssessmentBySubstanceRegulationAndToyotaRegion({ substanceId: substanceIdValue, regulationId, toyotaRegionId: value.value }));
                            }
                          }
                        }}
                        isFormType
                        namePath="region"
                        triggerWarningMessage={emptyRegion}
                        warningMessage={translate('pages.regulatoryUpdates.toastEmpty')}
                        size="160px"
                      />
                    </DropdownContainer>
                }

              </SelectWrapper>
            </InputWrapper>
            {impactData?.ImpactAssessmentRows && (
              <InputWrapper>
                <AttachmentsButtonContainer>
                  <Button onClick={() => { setOpenAttachments(true) }} text='Attachments' />
                  <AttachmentsCount>
                    {impactDataClone?.attachmentsCount || 0} attachment{impactDataClone?.attachmentsCount === 0 ? '' : 's'}
                  </AttachmentsCount>
                </AttachmentsButtonContainer>
              </InputWrapper>
            )}
          </Wrapper>

          <ImpactAssessmentTable>
            <TopSideTable>
              <TopTitleRowColumn>Regulatory Scope</TopTitleRowColumn>

              <TopSubColumnOne>Application Area</TopSubColumnOne>
              <TopSubColumnTwo className="t1-phase t1-phase-label">Phase (A)</TopSubColumnTwo>
              <TopSubColumnThree className="t1-scope-comments">
                Target Use / Scope Comments
              </TopSubColumnThree>
              <TopSubColumnFour>Level of Restriction (B)</TopSubColumnFour>

              <TopSubOneCelOne>Articles (Parts / Vehicle)</TopSubOneCelOne>
              <TopSubThreeCelOne className="t1-scope-comments">
                {maxLengthScopeComments[0] === true &&
                  <ValidationError>
                    Maximum Length is 30000
                  </ValidationError>
                }
                <Input
                  inputRef={textareaRef}
                  className="input-text"
                  type="textarea"
                  maxLength={30000}
                  defaultText={scopeCommentOneRef.current}
                  onChangeInput={value => {
                    scopeCommentOneRef.current = value
                    if (scopeCommentOneRef.current.length > 30000) {
                      maxLengthScopeComments[0] = true;
                      setMaxLengthScopeComments([...maxLengthScopeComments]);
                    } else if (maxLengthScopeComments[0] === true) {
                      maxLengthScopeComments[0] = false;
                      setMaxLengthScopeComments([...maxLengthScopeComments]);
                    }
                  }}
                  borderRadius="0px"
                  fontFamily="'Roboto', sans-serif"
                  fontSize="14px"
                />
              </TopSubThreeCelOne>
              <TopSubFourCelOne>
                <Select
                  labelValue="levelRestriction"
                  values={dropOptsNoNN}
                  keyValue="id"
                  placeholder=" "
                  size="63px"
                  defaultValue={levelRowOneRef.current}
                  onChange={(value: { value: string }) => {
                    levelRowOneRef.current = value.value
                    if (resourcesOneRef.current === 'NN' && value.value !== "0") { resourcesOneRef.current = '' }
                    if (developmentOneRef.current === 'NN' && (value.value !== "0" && resourcesOneRef.current !== "0")) { developmentOneRef.current = '' }
                    if (evaluationOneRef.current === 'NN' && (value.value !== "0" && resourcesOneRef.current !== "0")) { evaluationOneRef.current = '' }
                    setUpdated({ ...updated, levelRowOne: value.value });
                  }}
                />
              </TopSubFourCelOne>

              <TopSubOneCelTwo>Operations - Direct</TopSubOneCelTwo>
              <TopSubThreeCelTwo className="t1-scope-comments">
                {maxLengthScopeComments[1] === true &&
                  <ValidationError>
                    Maximum Length is 30000
                  </ValidationError>
                }
                <Input
                  className="input-text"
                  type="textarea"
                  maxLength={30000}
                  defaultText={scopeCommentTwoRef.current}
                  onChangeInput={value => {
                    scopeCommentTwoRef.current = value
                    if (scopeCommentTwoRef.current.length > 30000) {
                      maxLengthScopeComments[1] = true;
                      setMaxLengthScopeComments([...maxLengthScopeComments]);
                    } else if (maxLengthScopeComments[1] === true) {
                      maxLengthScopeComments[1] = false;
                      setMaxLengthScopeComments([...maxLengthScopeComments]);
                    }
                  }}
                  borderRadius="0px"
                  fontFamily="'Roboto', sans-serif"
                  fontSize="14px"
                />
              </TopSubThreeCelTwo>
              <TopSubFourCelTwo>
                <Select
                  labelValue="levelRowTwoRef"
                  values={dropOptsNoNN}
                  keyValue="id"
                  placeholder=" "
                  size="63px"
                  defaultValue={levelRowTwoRef.current}
                  onChange={(value: { value: string }) => {
                    levelRowTwoRef.current = value.value
                    if (resourcesTwoRef.current === 'NN' && value.value !== "0") { resourcesTwoRef.current = '' }
                    if (developmentTwoRef.current === 'NN' && (value.value !== "0" && resourcesTwoRef.current !== "0")) { developmentTwoRef.current = '' }
                    if (evaluationTwoRef.current === 'NN' && (value.value !== "0" && resourcesOneRef.current !== "0")) { evaluationTwoRef.current = '' }
                    setUpdated({ ...updated, levelRowTwo: value.value });
                  }}
                />
              </TopSubFourCelTwo>

              <TopSubOneCelThree>Operations - Indirect</TopSubOneCelThree>
              <TopSubThreeCelThree className="t1-scope-comments">
                {maxLengthScopeComments[2] === true &&
                  <ValidationError>
                    Maximum Length is 30000
                  </ValidationError>
                }
                <Input
                  className="input-text"
                  type="textarea"
                  maxLength={30000}
                  defaultText={scopeCommentThreeRef.current}
                  onChangeInput={value => {
                    scopeCommentThreeRef.current = value
                    if (scopeCommentThreeRef.current.length > 30000) {
                      maxLengthScopeComments[2] = true;
                      setMaxLengthScopeComments([...maxLengthScopeComments]);
                    } else if (maxLengthScopeComments[2] === true) {
                      maxLengthScopeComments[2] = false;
                      setMaxLengthScopeComments([...maxLengthScopeComments]);
                    }
                  }}
                  borderRadius="0px"
                  fontFamily="'Roboto', sans-serif"
                  fontSize="14px"
                />
              </TopSubThreeCelThree>
              <TopSubFourCelThree>
                <Select
                  labelValue="levelRowThreeRef"
                  values={dropOptsNoNN}
                  keyValue="id"
                  placeholder=" "
                  size="63px"
                  defaultValue={levelRowThreeRef.current}
                  onChange={(value: { value: string }) => {
                    levelRowThreeRef.current = value.value
                    if (resourcesThreeRef.current === 'NN' && value.value !== "0") { resourcesThreeRef.current = '' }
                    if (developmentThreeRef.current === 'NN' && (value.value !== "0" && resourcesThreeRef.current !== "0")) { developmentThreeRef.current = '' }
                    if (evaluationThreeRef.current === 'NN' && (value.value !== "0" && resourcesOneRef.current !== "0")) { evaluationThreeRef.current = '' }
                    setUpdated({ ...updated, levelRowThree: value.value });
                  }}
                />
              </TopSubFourCelThree>

              <TopSubOneCelFour>Service Products</TopSubOneCelFour>
              <TopSubThreeCelFour className="t1-scope-comments">
                {maxLengthScopeComments[3] === true &&
                  <ValidationError>
                    Maximum Length is 30000
                  </ValidationError>
                }

                <Input
                  className="input-text"
                  type="textarea"
                  maxLength={30000}
                  defaultText={scopeCommentFourRef.current}
                  onChangeInput={value => {
                    scopeCommentFourRef.current = value
                    if (scopeCommentFourRef.current.length > 30000) {
                      maxLengthScopeComments[3] = true;
                      setMaxLengthScopeComments([...maxLengthScopeComments]);
                    } else if (maxLengthScopeComments[3] === true) {
                      maxLengthScopeComments[3] = false;
                      setMaxLengthScopeComments([...maxLengthScopeComments]);
                    }
                  }}
                  borderRadius="0px"
                  fontFamily="'Roboto', sans-serif"
                  fontSize="14px"
                />
              </TopSubThreeCelFour>
              <TopSubFourCelFour>
                <Select
                  labelValue="levelRowFourRef"
                  values={dropOptsNoNN}
                  keyValue="id"
                  placeholder=" "
                  size="63px"
                  defaultValue={levelRowFourRef.current}
                  onChange={(value: { value: string }) => {
                    levelRowFourRef.current = value.value
                    if (resourcesFourRef.current === 'NN' && value.value !== "0") { resourcesFourRef.current = '' }
                    if (developmentFourRef.current === 'NN' && (value.value !== "0" && resourcesFourRef.current !== "0")) { developmentFourRef.current = '' }
                    if (evaluationFourRef.current === 'NN' && (value.value !== "0" && resourcesOneRef.current !== "0")) { evaluationFourRef.current = '' }
                    setUpdated({ ...updated, levelRowFour: value.value });
                  }}
                />
              </TopSubFourCelFour>

              <TopSubTwoCelOne className="t1-phase">
                {recordType === 1 ? (
                  <Select
                    labelValue="phaseRef"
                    values={phaseOpts}
                    keyValue="id"
                    placeholder=" "
                    formLabel={<Label noMargin />}
                    selectedValue={phaseRef}
                    defaultValue={
                      phaseRef
                    }
                    onChange={(value: { value: string }) => {
                      setPhaseRef(value.value);
                      if (value.value !== "") {
                        setEmptyPhase(false);
                      } else {
                        setEmptyPhase(true);
                      }
                    }}
                    isFormType
                    namePath="phase"
                    triggerWarningMessage={emptyPhase}
                    warningMessage={translate('pages.regulatoryUpdates.toastEmpty')}
                    size="63px"
                  />
                ) : recordType === 2 ? (
                  <EditLegislationContainer>
                    {phaseRef}
                    <EditLegislationButton
                      onClick={() => setOpenModal(true)}
                    >
                      Edit <EditLegislationIco />
                    </EditLegislationButton>
                  </EditLegislationContainer>
                ) : null}
              </TopSubTwoCelOne>
            </TopSideTable>

            <BottomSideTable>
              <BottomTitleColumnOne>
                Severity on the business
              </BottomTitleColumnOne>
              <BottomTitleColumnTwo>Level of Control</BottomTitleColumnTwo>

              <BottomSubColumnOne>Application Area</BottomSubColumnOne>
              <BottomSubColumnThree>Hits</BottomSubColumnThree>
              <BottomSubColumnSites>Sites</BottomSubColumnSites>
              <BottomSubColumnFour>Resources Impact (C)</BottomSubColumnFour>
              <BottomSubColumnFive>Resources Impact (C) Comments</BottomSubColumnFive>
              <BottomSubColumnSix>Development (D)</BottomSubColumnSix>
              <BottomSubColumnSeven>Evaluation (E)</BottomSubColumnSeven>
              <BottomSubColumnComment>Development (D) and Evaluation (E) Comments</BottomSubColumnComment>

              <BottomSubOneCelOne>Articles (Parts / Vehicle)</BottomSubOneCelOne>
              <BottomSubThreeCelOne>
                {maxLengthHits[0] === true &&
                  <ValidationError bottom>
                    Maximum Length is 10
                  </ValidationError>
                }
                <Input
                  className="input-text"
                  type="number"
                  maxLength={10}
                  defaultText={hitsOneRef.current}
                  onChangeInput={value => {
                    hitsOneRef.current = value
                    if (hitsOneRef.current.length > 10) {
                      maxLengthHits[0] = true;
                      setMaxLengthHits([...maxLengthHits]);
                    } else if (maxLengthHits[0] === true) {
                      maxLengthHits[0] = false;
                      setMaxLengthHits([...maxLengthHits]);
                    }
                  }}
                  borderRadius="0px"
                  width="100%"
                  height="100%"
                  border="none"
                  fontFamily="'Roboto', sans-serif"
                  fontSize="14px"
                />
              </BottomSubThreeCelOne>
              <BottomSubSitesCelOne />
              <BottomSubFourCelOne>
                <Select
                  labelValue="resourcesOneRef"
                  values={levelRowOneRef.current === "0" ? dropOpts : dropOptsNoNN}
                  keyValue="id"
                  placeholder=" "
                  size="63px"
                  defaultValue={resourcesOneRef.current}
                  selectedValue={resourcesOneRef.current}
                  onChange={(value: { value: string }) => {
                    resourcesOneRef.current = value.value
                    if (developmentOneRef.current === 'NN' && (value.value !== "0" && levelRowOneRef.current !== "0")) { developmentOneRef.current = '' }
                    if (evaluationOneRef.current === 'NN' && (value.value !== "0" && levelRowOneRef.current !== "0")) { evaluationOneRef.current = '' }
                    setUpdated({ ...updated, resourcesOne: value.value });
                  }}
                />
              </BottomSubFourCelOne>
              <BottomSubFiveCelOne>
                {maxLengthCommentAnalysis[0] === true &&
                  <ValidationError>
                    Maximum Length is 30000
                  </ValidationError>
                }
                <Input
                  className="input-text"
                  type="textarea"
                  maxLength={30000}
                  defaultText={commentOneRef.current}
                  onChangeInput={value => {
                    commentOneRef.current = value
                    if (commentOneRef.current.length > 30000) {
                      maxLengthCommentAnalysis[0] = true;
                      setMaxLengthCommentAnalysis([...maxLengthCommentAnalysis]);
                    } else if (maxLengthCommentAnalysis[0] === true) {
                      maxLengthCommentAnalysis[0] = false;
                      setMaxLengthCommentAnalysis([...maxLengthCommentAnalysis]);
                    }
                  }}
                  borderRadius="0px"
                  fontFamily="'Roboto', sans-serif"
                  fontSize="14px"
                />
              </BottomSubFiveCelOne>
              <BottomSubSixCelOne>
                <Select
                  labelValue="developmentOneRef"
                  values={levelRowOneRef.current === "0" || resourcesOneRef.current === "0" ? dropOpts : dropOptsNoNN}
                  keyValue="id"
                  placeholder=" "
                  size="63px"
                  defaultValue={developmentOneRef.current}
                  selectedValue={developmentOneRef.current}
                  onChange={(value: { value: string }) => {
                    developmentOneRef.current = value.value
                    setUpdated({ ...updated, developmentOne: value.value });
                  }}
                />
              </BottomSubSixCelOne>
              <BottomSubSevenCelOne>
                <Select
                  labelValue="evaluationOneRef"
                  values={levelRowOneRef.current === "0" || resourcesOneRef.current === "0" ? dropOpts : dropOptsNoNN}
                  keyValue="id"
                  placeholder=" "
                  size="63px"
                  defaultValue={evaluationOneRef.current}
                  selectedValue={evaluationOneRef.current}
                  onChange={(value: { value: string }) => {
                    evaluationOneRef.current = value.value
                    setUpdated({ ...updated, evaluationOne: value.value });
                  }}
                />
              </BottomSubSevenCelOne>
              <BottomSubCommentCelOne>
                {maxLengthComment[0] === true &&
                  <ValidationError>
                    Maximum Length is 30000
                  </ValidationError>
                }
                <Input
                  className="input-text"
                  type="textarea"
                  maxLength={30000}
                  defaultText={generalCommentsOneRef.current}
                  onChangeInput={value => {
                    generalCommentsOneRef.current = value
                    if (generalCommentsOneRef.current.length > 30000) {
                      maxLengthComment[0] = true;
                      setMaxLengthComment([...maxLengthComment]);
                    } else if (maxLengthComment[0] === true) {
                      maxLengthComment[0] = false;
                      setMaxLengthComment([...maxLengthComment]);
                    }
                  }}
                  borderRadius="0px"
                  fontFamily="'Roboto', sans-serif"
                  fontSize="14px"
                />
              </BottomSubCommentCelOne>

              <BottomSubOneCelTwo>Operations - Direct</BottomSubOneCelTwo>
              <BottomSubThreeCelTwo>
                {maxLengthHits[1] === true &&
                  <ValidationError bottom>
                    Maximum Length is 10
                  </ValidationError>
                }
                <Input
                  className="input-text"
                  type="number"
                  maxLength={10}
                  defaultText={hitsTwoRef.current}
                  onChangeInput={value => {
                    hitsTwoRef.current = value
                    if (hitsTwoRef.current.length > 10) {
                      maxLengthHits[1] = true;
                      setMaxLengthHits([...maxLengthHits]);
                    } else if (maxLengthHits[1] === true) {
                      maxLengthHits[1] = false;
                      setMaxLengthHits([...maxLengthHits]);
                    }
                  }}
                  borderRadius="0px"
                  width="100%"
                  height="100%"
                  border="none"
                  fontFamily="'Roboto', sans-serif"
                  fontSize="14px"
                />
              </BottomSubThreeCelTwo>
              <BottomSubSitesCelTwo>
                {maxLengthSites[1] === true &&
                  <ValidationError bottom>
                    Maximum Length is 10
                  </ValidationError>
                }
                <Input
                  className="input-text"
                  type="number"
                  maxLength={10}
                  defaultText={sitesTwoRef.current}
                  onChangeInput={value => {
                    sitesTwoRef.current = value
                    if (sitesTwoRef.current.length > 10) {
                      maxLengthSites[1] = true;
                      setMaxLengthSites([...maxLengthSites]);
                    } else if (maxLengthSites[1] === true) {
                      maxLengthSites[1] = false;
                      setMaxLengthSites([...maxLengthSites]);
                    }
                  }}
                  borderRadius="0px"
                  width="100%"
                  height="100%"
                  border="none"
                  fontFamily="'Roboto', sans-serif"
                  fontSize="14px"
                />
              </BottomSubSitesCelTwo>
              <BottomSubFourCelTwo>
                <Select
                  labelValue="resourcesTwoRef"
                  values={levelRowTwoRef.current === "0" ? dropOpts : dropOptsNoNN}
                  keyValue="id"
                  placeholder=" "
                  size="63px"
                  defaultValue={resourcesTwoRef.current}
                  selectedValue={resourcesTwoRef.current}
                  onChange={(value: { value: string }) => {
                    resourcesTwoRef.current = value.value
                    if (developmentTwoRef.current === 'NN' && (value.value !== "0" && levelRowTwoRef.current !== "0")) { developmentTwoRef.current = '' }
                    if (evaluationTwoRef.current === 'NN' && (value.value !== "0" && levelRowOneRef.current !== "0")) { evaluationTwoRef.current = '' }
                    setUpdated({ ...updated, resourcesTwo: value.value });
                  }}
                />
              </BottomSubFourCelTwo>
              <BottomSubFiveCelTwo>
                {maxLengthCommentAnalysis[1] === true &&
                  <ValidationError>
                    Maximum Length is 30000
                  </ValidationError>
                }
                <Input
                  className="input-text"
                  type="textarea"
                  maxLength={30000}
                  defaultText={commentTwoRef.current}
                  onChangeInput={value => {
                    commentTwoRef.current = value
                    if (commentTwoRef.current.length > 30000) {
                      maxLengthCommentAnalysis[1] = true;
                      setMaxLengthCommentAnalysis([...maxLengthCommentAnalysis]);
                    } else if (maxLengthCommentAnalysis[1] === true) {
                      maxLengthCommentAnalysis[1] = false;
                      setMaxLengthCommentAnalysis([...maxLengthCommentAnalysis]);
                    }
                  }}
                  borderRadius="0px"
                />
              </BottomSubFiveCelTwo>
              <BottomSubSixCelTwo>
                <Select
                  labelValue="developmentTwoRef"
                  values={levelRowTwoRef.current === "0" || resourcesTwoRef.current === "0" ? dropOpts : dropOptsNoNN}
                  keyValue="id"
                  placeholder=" "
                  size="63px"
                  defaultValue={developmentTwoRef.current}
                  selectedValue={developmentTwoRef.current}
                  onChange={(value: { value: string }) => {
                    developmentTwoRef.current = value.value
                    setUpdated({ ...updated, developmentTwo: value.value });
                  }}
                />
              </BottomSubSixCelTwo>
              <BottomSubSevenCelTwo>
                <Select
                  labelValue="evaluationTwoRef"
                  values={levelRowTwoRef.current === "0" || resourcesTwoRef.current === "0" ? dropOpts : dropOptsNoNN}
                  keyValue="id"
                  placeholder=" "
                  size="63px"
                  defaultValue={evaluationTwoRef.current}
                  selectedValue={evaluationTwoRef.current}
                  onChange={(value: { value: string }) => {
                    evaluationTwoRef.current = value.value
                    setUpdated({ ...updated, evaluationTwo: value.value });
                  }}
                />
              </BottomSubSevenCelTwo>
              <BottomSubCommentCelTwo>
                {maxLengthComment[1] === true &&
                  <ValidationError>
                    Maximum Length is 30000
                  </ValidationError>
                }
                <Input
                  className="input-text"
                  type="textarea"
                  maxLength={30000}
                  defaultText={generalCommentsTwoRef.current}
                  onChangeInput={value => {
                    generalCommentsTwoRef.current = value
                    if (generalCommentsTwoRef.current.length > 30000) {
                      maxLengthComment[1] = true;
                      setMaxLengthComment([...maxLengthComment]);
                    } else if (maxLengthComment[1] === true) {
                      maxLengthComment[1] = false;
                      setMaxLengthComment([...maxLengthComment]);
                    }
                  }}
                  borderRadius="0px"
                  fontFamily="'Roboto', sans-serif"
                  fontSize="14px"
                />
              </BottomSubCommentCelTwo>

              <BottomSubOneCelThree>Operations - Indirect</BottomSubOneCelThree>
              <BottomSubThreeCelThree>
                {maxLengthHits[2] === true &&
                  <ValidationError bottom>
                    Maximum Length is 10
                  </ValidationError>
                }
                <Input
                  className="input-text"
                  type="number"
                  maxLength={10}
                  defaultText={hitsThreeRef.current}
                  onChangeInput={value => {
                    hitsThreeRef.current = value
                    if (hitsThreeRef.current.length > 10) {
                      maxLengthHits[2] = true;
                      setMaxLengthHits([...maxLengthHits]);
                    } else if (maxLengthHits[2] === true) {
                      maxLengthHits[2] = false;
                      setMaxLengthHits([...maxLengthHits]);
                    }
                  }}
                  borderRadius="0px"
                  width="100%"
                  height="100%"
                  border="none"
                  fontFamily="'Roboto', sans-serif"
                  fontSize="14px"
                />
              </BottomSubThreeCelThree>
              <BottomSubSitesCelThree>
                {maxLengthSites[2] === true &&
                  <ValidationError bottom>
                    Maximum Length is 10
                  </ValidationError>
                }
                <Input
                  className="input-text"
                  type="number"
                  maxLength={10}
                  defaultText={sitesThreeRef.current}
                  onChangeInput={value => {
                    sitesThreeRef.current = value
                    if (sitesThreeRef.current.length > 10) {
                      maxLengthSites[2] = true;
                      setMaxLengthSites([...maxLengthSites]);
                    } else if (maxLengthSites[2] === true) {
                      maxLengthSites[2] = false;
                      setMaxLengthSites([...maxLengthSites]);
                    }
                  }}
                  borderRadius="0px"
                  width="100%"
                  height="100%"
                  border="none"
                  fontFamily="'Roboto', sans-serif"
                  fontSize="14px"
                />
              </BottomSubSitesCelThree>
              <BottomSubFourCelThree>
                <Select
                  labelValue="resourcesThreeRef"
                  values={levelRowThreeRef.current === "0" ? dropOpts : dropOptsNoNN}
                  keyValue="id"
                  placeholder=" "
                  size="63px"
                  defaultValue={resourcesThreeRef.current}
                  selectedValue={resourcesThreeRef.current}
                  onChange={(value: { value: string }) => {
                    resourcesThreeRef.current = value.value
                    if (developmentThreeRef.current === 'NN' && (value.value !== "0" && levelRowThreeRef.current !== "0")) { developmentThreeRef.current = '' }
                    if (evaluationThreeRef.current === 'NN' && (value.value !== "0" && levelRowOneRef.current !== "0")) { evaluationThreeRef.current = '' }
                    setUpdated({ ...updated, resourcesThree: value.value });
                  }}
                />
              </BottomSubFourCelThree>
              <BottomSubFiveCelThree>
                {maxLengthCommentAnalysis[2] === true &&
                  <ValidationError>
                    Maximum Length is 30000
                  </ValidationError>
                }
                <Input
                  className="input-text"
                  type="textarea"
                  maxLength={30000}
                  defaultText={commentThreeRef.current}
                  onChangeInput={value => {
                    commentThreeRef.current = value
                    if (commentThreeRef.current.length > 30000) {
                      maxLengthCommentAnalysis[2] = true;
                      setMaxLengthCommentAnalysis([...maxLengthCommentAnalysis]);
                    } else if (maxLengthCommentAnalysis[2] === true) {
                      maxLengthCommentAnalysis[2] = false;
                      setMaxLengthCommentAnalysis([...maxLengthCommentAnalysis]);
                    }
                  }}
                  borderRadius="0px"
                  fontFamily="'Roboto', sans-serif"
                  fontSize="14px"
                />
              </BottomSubFiveCelThree>
              <BottomSubSixCelThree>
                <Select
                  labelValue="developmentThreeRef"
                  values={levelRowThreeRef.current === "0" || resourcesThreeRef.current === "0" ? dropOpts : dropOptsNoNN}
                  keyValue="id"
                  placeholder=" "
                  size="63px"
                  defaultValue={developmentThreeRef.current}
                  selectedValue={developmentThreeRef.current}
                  onChange={(value: { value: string }) => {
                    developmentThreeRef.current = value.value
                    setUpdated({ ...updated, developmentThree: value.value });
                  }}
                />
              </BottomSubSixCelThree>
              <BottomSubSevenCelThree>
                <Select
                  labelValue="evaluationThreeRef"
                  values={levelRowThreeRef.current === "0" || resourcesThreeRef.current === "0" ? dropOpts : dropOptsNoNN}
                  keyValue="id"
                  placeholder=" "
                  size="63px"
                  defaultValue={evaluationThreeRef.current}
                  selectedValue={evaluationThreeRef.current}
                  onChange={(value: { value: string }) => {
                    evaluationThreeRef.current = value.value
                    setUpdated({ ...updated, evaluationThree: value.value });
                  }}
                />
              </BottomSubSevenCelThree>
              <BottomSubCommentCelThree>
                {maxLengthComment[2] === true &&
                  <ValidationError>
                    Maximum Length is 30000
                  </ValidationError>
                }
                <Input
                  className="input-text"
                  type="textarea"
                  maxLength={30000}
                  defaultText={generalCommentsThreeRef.current}
                  onChangeInput={value => {
                    generalCommentsThreeRef.current = value
                    if (generalCommentsThreeRef.current.length > 30000) {
                      maxLengthComment[2] = true;
                      setMaxLengthComment([...maxLengthComment]);
                    } else if (maxLengthComment[2] === true) {
                      maxLengthComment[2] = false;
                      setMaxLengthComment([...maxLengthComment]);
                    }
                  }}
                  borderRadius="0px"
                  fontFamily="'Roboto', sans-serif"
                  fontSize="14px"
                />
              </BottomSubCommentCelThree>

              <BottomSubOneCelFour>Service Products</BottomSubOneCelFour>
              <BottomSubThreeCelFour>
                {maxLengthHits[3] === true &&
                  <ValidationError bottom>
                    Maximum Length is 10
                  </ValidationError>
                }
                <Input
                  className="input-text"
                  type="number"
                  maxLength={10}
                  defaultText={hitsFourRef.current}
                  onChangeInput={value => {
                    hitsFourRef.current = value
                    if (hitsFourRef.current.length > 10) {
                      maxLengthHits[3] = true;
                      setMaxLengthHits([...maxLengthHits]);
                    } else if (maxLengthHits[3] === true) {
                      maxLengthHits[3] = false;
                      setMaxLengthHits([...maxLengthHits]);
                    }
                  }}
                  borderRadius="0px"
                  width="100%"
                  height="100%"
                  border="none"
                  fontFamily="'Roboto', sans-serif"
                  fontSize="14px"
                />
              </BottomSubThreeCelFour>
              <BottomSubSitesCelFour />
              <BottomSubFourCelFour>
                <Select
                  labelValue="resourcesFourRef"
                  values={levelRowFourRef.current === "0" ? dropOpts : dropOptsNoNN}
                  keyValue="id"
                  placeholder=" "
                  size="63px"
                  defaultValue={resourcesFourRef.current}
                  selectedValue={resourcesFourRef.current}
                  onChange={(value: { value: string }) => {
                    resourcesFourRef.current = value.value
                    if (developmentFourRef.current === 'NN' && (value.value !== "0" && levelRowFourRef.current !== "0")) { developmentFourRef.current = '' }
                    if (evaluationFourRef.current === 'NN' && (value.value !== "0" && levelRowOneRef.current !== "0")) { evaluationFourRef.current = '' }
                    setUpdated({ ...updated, resourcesFour: value.value });
                  }}
                />
              </BottomSubFourCelFour>
              <BottomSubFiveCelFour>
                {maxLengthCommentAnalysis[3] === true &&
                  <ValidationError>
                    Maximum Length is 30000
                  </ValidationError>
                }
                <Input
                  className="input-text"
                  type="textarea"
                  maxLength={30000}
                  defaultText={commentFourRef.current}
                  onChangeInput={value => {
                    commentFourRef.current = value
                    if (commentFourRef.current.length > 30000) {
                      maxLengthCommentAnalysis[3] = true;
                      setMaxLengthCommentAnalysis([...maxLengthCommentAnalysis]);
                    } else if (maxLengthCommentAnalysis[3] === true) {
                      maxLengthCommentAnalysis[3] = false;
                      setMaxLengthCommentAnalysis([...maxLengthCommentAnalysis]);
                    }
                  }}
                  borderRadius="0px"
                  fontFamily="'Roboto', sans-serif"
                  fontSize="14px"
                />
              </BottomSubFiveCelFour>
              <BottomSubSixCelFour>
                <Select
                  labelValue="developmentFourRef"
                  values={levelRowFourRef.current === "0" || resourcesFourRef.current === "0" ? dropOpts : dropOptsNoNN}
                  keyValue="id"
                  placeholder=" "
                  size="63px"
                  defaultValue={developmentFourRef.current}
                  selectedValue={developmentFourRef.current}
                  onChange={(value: { value: string }) => {
                    developmentFourRef.current = value.value
                    setUpdated({ ...updated, developmentFour: value.value });
                  }}
                />
              </BottomSubSixCelFour>
              <BottomSubSevenCelFour>
                <Select
                  labelValue="evaluationFourRef"
                  values={levelRowFourRef.current === "0" || resourcesFourRef.current === "0" ? dropOpts : dropOptsNoNN}
                  keyValue="id"
                  placeholder=" "
                  size="63px"
                  defaultValue={evaluationFourRef.current}
                  selectedValue={evaluationFourRef.current}
                  onChange={(value: { value: string }) => {
                    evaluationFourRef.current = value.value
                    setUpdated({ ...updated, evaluationFour: value.value });
                  }}
                />
              </BottomSubSevenCelFour>
              <BottomSubCommentCelFour>
                {maxLengthComment[3] === true &&
                  <ValidationError>
                    Maximum Length is 30000
                  </ValidationError>
                }
                <Input
                  className="input-text"
                  type="textarea"
                  maxLength={30000}
                  defaultText={generalCommentsFourRef.current}
                  onChangeInput={value => {
                    generalCommentsFourRef.current = value
                    if (generalCommentsFourRef.current.length > 30000) {
                      maxLengthComment[3] = true;
                      setMaxLengthComment([...maxLengthComment]);
                    } else if (maxLengthComment[3] === true) {
                      maxLengthComment[3] = false;
                      setMaxLengthComment([...maxLengthComment]);
                    }
                  }}
                  borderRadius="0px"
                  fontFamily="'Roboto', sans-serif"
                  fontSize="14px"
                />
              </BottomSubCommentCelFour>
            </BottomSideTable>
          </ImpactAssessmentTable>
          <ButtonsGroup>
            <Button
              onClick={
                () => {
                  dispatch(clearImpactAssessmentData());
                  history.push(url)
                }
              }
              text="Cancel"
            />
            <Button
              type="primary"
              disabled={duplicatedByToyotaRegion}
              text="Save"
              onClick={() => {
                if (!regulationId && !regulation) {
                  setEmptyLegFramework(true);
                }
                if (!toyotaRegion && !resultValue?.region) {
                  setEmptyRegion(true);
                }
                if (!phaseRef || phaseRef === "" || phaseRef === null) {
                  setEmptyPhase(true);
                }
                handleCreateImpactAssessment();
              }}
            />
          </ButtonsGroup>
          <Footer />
        </Content>
      </Container>)
      : null
  );
};

export default NewRecord;
