import React, { useEffect, useState } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import { Tooltip } from 'antd';
import parse from 'html-react-parser';

import Button from '../../../components/Button';
import ListingLists from '../../../components/ListingLists';
import ModalSubstanceEdit from '../../../components/Modal/EditSubstance';
import ScrollTopButton from '../../../components/ScrollTopButton';
import MultiTabsRegion from '../../../components/Tags';
import { translate } from '../../../locales';
import impactTabs from '../../../mocks/impact-tabs';
import history from '../../../routes/history';
import { getRegulationsSubstanceRequest } from '../../../store/modules/dropdownValues/actions';
import {
  selectors as selectorsListings,
  getListingsSubstanceRequest
} from '../../../store/modules/listings/actions';
import {
  selectors,
  getSubstanceRecordRequest,
  clearSubstanceRecord
} from '../../../store/modules/substances/actions';
import handleDownloadPage from '../../../utils/download-page';
import loadUserDataOnStorage from '../../../utils/userData';
import ImpactAssessment from '../../ImpactAssessment';
import SubstanceAttachments from '../components/Attachments';
import SubstanceRegulatoryUpdates from '../components/RegulatoryUpdates';
import {
  Container,
  Content,
  HeaderContainer,
  BreadCrumbsWrapper,
  BreadCrumbs,
  CurrentPage,
  ArrowDown,
  MainSection,
  ContentWrapper,
  Wrapper,
  Label,
  MainSectionText,
  BigCircle,
  BigCircleText,
  GeneralSection,
  TextContainer,
  ContainerImpact,
  ContainerTabs,
  TitleContainer,
  Title,
  TextItem,
  ContainerDownload,
  Text,
  ButtonSpace,
  MultiLineDots,
  InfoSection,
  DescriptionSection
} from './styled';
import { LoadingIndicator } from '../../Legislations/LegislationRecord/styled';

const SubstanceRecord: React.FC = () => {
  // const jurisd = localStorage.getItem('user.jurisdictions');
  const [openModal, setOpenModal] = useState(false);
  const [timeStamp, setTimeStamp] = useState(new Date().getTime());
  const [jurisdictions, setJurisdictions] = useState<any>([]);
  const [activeIndex] = useState(0);
  const path = window.location.pathname;
  const substanceId = Number(path.substring(path.lastIndexOf('/') + 1));
  const substance = useSelector(selectors.substanceRecord);
  const listListings = useSelector(selectorsListings.listingsSubstance);
  const userRole = localStorage.getItem('user.role');
  // const jurisdictionsPreferences: any = [];

  const [regionsUpdates, setRegionsUpdates] = useState<any>([]);
  const [otherNamesReadMoreLess, setOtherNamesReadMoreLess] = useState<
    'Read less' | 'Read more'
  >('Read more');
  const [execReadMoreLess, setExecReadMoreLess] = useState<
    'Read less' | 'Read more'
  >('Read more');
  const [nextReadMoreLess, setNextReadMoreLess] = useState<
    'Read less' | 'Read more'
  >('Read more');
  const [otherNamesLines, setOtherNamesLines] = useState(0);
  const [execLines, setExecLines] = useState(0);
  const [nextLines, setNextLines] = useState(0);

  const dispatch = useDispatch();
  let colorLevel: any;

  useEffect(() => {
    dispatch(clearSubstanceRecord());
    dispatch(getRegulationsSubstanceRequest(substanceId));
    dispatch(getSubstanceRecordRequest(substanceId));
    dispatch(getListingsSubstanceRequest(substanceId));
  }, [dispatch, substanceId]);

  useEffect(() => {
    loadUserDataOnStorage();
  }, []);

  useEffect(() => {
    setTimeout(function xyz() {
      const lines1 = getLinesCount(document.getElementById('exec-summary'));
      const lines2 = getLinesCount(document.getElementById('next-steps'));
      const lines3 = getLinesCount(document.getElementById('other-names'));
      setExecLines(lines1);
      setNextLines(lines2);
      setOtherNamesLines(lines3);
    }, 500);
  }, [substance?.data?.message]);

  const removeTags = (tag: any) => {
    if (tag === null || tag === '' || tag === undefined) return '';
    tag = tag.toString();
    return parse(tag);
  };

  const executiveSummaryText =
    removeTags(substance?.data?.message?.execSummary) ?? '--';

  const nextStepsText =
    removeTags(substance?.data?.message?.nextAction) ?? '--';

  const otherNamesText =
    removeTags(substance?.data?.message?.otherNames) ?? '--';

  const scrollButton = document.getElementById('scrollButton');

  // Yordas parameters
  const summaryUses = substance?.data?.message?.summaryUses ?? '';
  const applicationYordas = substance?.data?.message?.applicationYordas ?? '';
  const groupingYordas = substance?.data?.message?.groupingYordas ?? '';
  const materialYordas = substance?.data?.message?.materialYordas ?? '';
  const techFunctionsYordas =
    substance?.data?.message?.techFunctionsYordas ?? '';

  window.onscroll = function () {
    scrollFunction();
  };

  const scrollFunction = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      scrollButton!.style.display = 'flex';
    } else {
      scrollButton!.style.display = 'none';
    }
  };

  const topFunction = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getLinesCount = element => {
    if (element) {
      const prevLH = element.style.lineHeight;
      element.style.lineHeight = '1000px';

      const { height } = element.getBoundingClientRect();
      element.style.lineHeight = prevLH;

      return Math.floor(height / 1000);
    }
    return 0;
  };

  const substanceName = substance?.data?.message?.commonName.slice(0, 205);
  const now = new Date();
  const date = now
    .toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    })
    .replace(/\//g, '');

  return (
    <Container>
      <ScrollTopButton
        notifyScroll={() => setTimeStamp(new Date().getTime())}
      />
      {openModal && (
        <ModalSubstanceEdit
          open={openModal}
          close={() => setOpenModal(false)}
          modalTitle="Edit Substance"
          editData={substance?.data?.message}
        />
      )}
      <HeaderContainer>
        <BreadCrumbsWrapper>
          <BreadCrumbs href="/">{translate('breadcrumbs.home')}</BreadCrumbs>
          <ArrowDown />
          <CurrentPage>
            {substance?.data?.message?.casNumber} •{' '}
            <Tooltip title={substance?.data?.message?.commonName}>
              {substance?.data?.message?.commonName.length > 65
                ? `${substance?.data?.message?.commonName.slice(0, 65)}...`
                : substance?.data?.message?.commonName}
            </Tooltip>
          </CurrentPage>
        </BreadCrumbsWrapper>
        <ContainerDownload>
          <Button
            onClick={() => handleDownloadPage(`${substanceName}-${date}.pdf`)}
            text="Download Substance"
          />
        </ContainerDownload>
      </HeaderContainer>
      <Content id="divIdToPrint">
        {substance?.data?.message ? (
          <InfoSection>
            <DescriptionSection>
              <GeneralSection>
                <Label>{translate('pages.substanceRecord.cas')}</Label>
                <MainSectionText>
                  {substance?.data?.message?.casNumber}
                </MainSectionText>
              </GeneralSection>
              <GeneralSection>
                <Label>
                  {translate('pages.substanceRecord.substanceName')}
                </Label>
                <MainSectionText>
                  <Tooltip title={substance?.data?.message?.commonName}>
                    {substance?.data?.message?.commonName.length > 165
                      ? `${substance?.data?.message?.commonName.slice(
                          0,
                          165
                        )}...`
                      : substance?.data?.message?.commonName}
                  </Tooltip>
                </MainSectionText>
              </GeneralSection>
              <GeneralSection>
                <Label>{translate('pages.substanceRecord.otherNames')}</Label>
                <MultiLineDots
                  id="other-names"
                  style={{
                    // opacity: 0
                    color: 'white',
                    position: 'absolute',
                    zIndex: -1,
                    userSelect: 'none'
                  }}
                >
                  {otherNamesText}
                </MultiLineDots>
                <MultiLineDots
                  showLess={otherNamesReadMoreLess === 'Read more'}
                >
                  {otherNamesText}
                </MultiLineDots>
                {otherNamesLines > 6 && (
                  <ButtonSpace>
                    <Button
                      text={otherNamesReadMoreLess}
                      onClick={() => {
                        // todo
                        if (otherNamesReadMoreLess === 'Read more') {
                          setOtherNamesReadMoreLess('Read less');
                        } else {
                          setOtherNamesReadMoreLess('Read more');
                        }
                      }}
                    />
                  </ButtonSpace>
                )}
              </GeneralSection>
              <GeneralSection>
                <Label>{translate('pages.substanceRecord.execSummary')}</Label>
                {/** dup conponent just to get number of lines */}
                <MultiLineDots
                  id="exec-summary"
                  style={{
                    // opacity: 0
                    color: 'white',
                    position: 'absolute',
                    zIndex: -1,
                    userSelect: 'none'
                  }}
                >
                  {executiveSummaryText}
                </MultiLineDots>
                <MultiLineDots showLess={execReadMoreLess === 'Read more'}>
                  {executiveSummaryText}
                </MultiLineDots>
                {execLines > 6 && (
                  <ButtonSpace>
                    <Button
                      text={execReadMoreLess}
                      onClick={() => {
                        // todo
                        if (execReadMoreLess === 'Read more') {
                          setExecReadMoreLess('Read less');
                        } else {
                          setExecReadMoreLess('Read more');
                        }
                      }}
                    />
                  </ButtonSpace>
                )}
              </GeneralSection>
              <GeneralSection>
                <Label>{translate('pages.substanceRecord.nextSteps')}</Label>
                {/** dup conponent just to get number of lines */}
                <MultiLineDots
                  id="next-steps"
                  style={{
                    // opacity: 0
                    color: 'white',
                    position: 'absolute',
                    zIndex: -1,
                    userSelect: 'none'
                  }}
                >
                  {nextStepsText}
                </MultiLineDots>
                <MultiLineDots showLess={nextReadMoreLess === 'Read more'}>
                  {nextStepsText}
                </MultiLineDots>
                {nextLines > 6 && (
                  <ButtonSpace>
                    <Button
                      text={nextReadMoreLess}
                      onClick={() => {
                        // todo
                        if (nextReadMoreLess === 'Read more') {
                          setNextReadMoreLess('Read less');
                        } else {
                          setNextReadMoreLess('Read more');
                        }
                      }}
                    />
                  </ButtonSpace>
                )}
              </GeneralSection>
              <GeneralSection>
                <Label>
                  {translate('pages.substanceRecord.substancesUses')}
                </Label>
                <TextContainer>
                  {substance?.data?.message?.SubstanceUses?.map(
                    (value: any) => {
                      return <TextItem>{value.description}</TextItem>;
                    }
                  )}
                </TextContainer>
              </GeneralSection>
              {summaryUses && (
                <GeneralSection>
                  <Label>
                    {translate('pages.substanceRecord.summaryUses')}
                  </Label>
                  <Text>{summaryUses}</Text>
                </GeneralSection>
              )}
              {applicationYordas && (
                <GeneralSection>
                  <Label>
                    {translate('pages.substanceRecord.applicationYordas')}
                  </Label>
                  <Text>{applicationYordas}</Text>
                </GeneralSection>
              )}
              {groupingYordas && (
                <GeneralSection>
                  <Label>
                    {translate('pages.substanceRecord.groupingYordas')}
                  </Label>
                  <Text>{groupingYordas}</Text>
                </GeneralSection>
              )}
              {materialYordas && (
                <GeneralSection>
                  <Label>
                    {translate('pages.substanceRecord.materialYordas')}
                  </Label>
                  <Text>{materialYordas}</Text>
                </GeneralSection>
              )}
              {techFunctionsYordas && (
                <GeneralSection>
                  <Label>
                    {translate('pages.substanceRecord.techFunctionsYordas')}
                  </Label>
                  <Text>{techFunctionsYordas}</Text>
                </GeneralSection>
              )}
              <GeneralSection>
                <Label>{translate('pages.substanceRecord.jurisdiction')}</Label>
                <ContainerTabs>
                  <MultiTabsRegion
                    key={activeIndex}
                    substanceId={substanceId}
                    value={impactTabs}
                    liveIndex={activeIndex}
                    selectedTabs={regionsUpdates}
                    // userPreferences={jurisdictionsPreferences}
                    onTabClick={(data: any) => {
                      const dataAux: any[] = [];
                      data.map(x => dataAux.push(x.id));
                      setJurisdictions(dataAux);
                      setRegionsUpdates(data);
                    }}
                  />
                </ContainerTabs>
              </GeneralSection>
            </DescriptionSection>
            <MainSection>
              <Wrapper>
                <ContentWrapper>
                  <Label>Priority Rank</Label>
                  <>
                    {(() => {
                      switch (substance?.data?.message?.priorityRank) {
                        case 'L':
                          colorLevel = '#FFE6B3';
                          break;
                        case 'M':
                          colorLevel = '#FFCC99';
                          break;
                        case 'H':
                          colorLevel = '#FF9F8C';
                          break;
                        case 'VH':
                          colorLevel = '#FF8080';
                          break;
                        case 'NR':
                          colorLevel = '#DCEECF';
                          break;
                        default:
                          colorLevel = '#f3f3f3';
                          break;
                      }
                    })()}
                  </>
                  <BigCircle backgroundColor={colorLevel}>
                    <BigCircleText>
                      {substance?.data?.message?.priorityRank
                        ? substance?.data?.message?.priorityRank
                        : '--'}
                    </BigCircleText>
                  </BigCircle>
                </ContentWrapper>
                {userRole == null || userRole == 'Read-only' ? null : (
                  <ContentWrapper>
                    <Button
                      toolTip={
                        userRole == null || userRole == 'Read-only'
                          ? 'User role not authorized to open: Read-only'
                          : undefined
                      }
                      text="Edit"
                      isDisabled={userRole == null || userRole == 'Read-only'}
                      onClick={() => setOpenModal(true)}
                    />
                  </ContentWrapper>
                )}
              </Wrapper>
            </MainSection>
          </InfoSection>
        ) : (
          <div style={{ margin: '1rem', height: '5rem' }}>
            <LoadingIndicator />
          </div>
        )}

        <ContainerImpact>
          <ImpactAssessment
            impactAssessment={substance?.data?.message?.ImpactAssessments}
            substanceData={substance?.data?.message}
            jurisdictions={jurisdictions}
          />
        </ContainerImpact>
        <GeneralSection>
          <SubstanceRegulatoryUpdates
            substanceId={substanceId}
            jurisdictions={jurisdictions}
            timeStamp={timeStamp}
          />
        </GeneralSection>
        {listListings && (
          <GeneralSection>
            <TitleContainer>
              <Title>Listings</Title>
            </TitleContainer>
            <ListingLists listData={listListings} />
          </GeneralSection>
        )}
        <GeneralSection>
          <SubstanceAttachments
            substanceId={substanceId}
            jurisdictions={jurisdictions}
            recordType={1}
            timeStamp={timeStamp}
          />
        </GeneralSection>
      </Content>
    </Container>
  );
};

export default SubstanceRecord;
