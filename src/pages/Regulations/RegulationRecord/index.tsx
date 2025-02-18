import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';


import { Tooltip } from 'antd';
import parse from 'html-react-parser';

import Attachments from '../../../components/Attachments';
import Button from '../../../components/Button';
import ModalRegulationEdit from '../../../components/Modal/ModalRegulation';
import RegulatoryUpdates from '../../../components/RegulatoryUpdates';
import RelatedSubstances from '../../../components/RelatedSubstances';
import ScrollTopButton from '../../../components/ScrollTopButton';
import {
  selectors,
  getRegulationRecordRequest
} from '../../../store/modules/regulations/actions';
import handleDownloadPage from '../../../utils/download-page';
import loadUserDataOnStorage from '../../../utils/userData';
import LinkLegislation from '../../../components/LinkLegislation';
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
  GeneralSection,
  TextContainer,
  IcoFileDownload,
  ContainerMainSection,
  ContainerDownload,
  DisabledTextInfo,
  ContainerButton,
  Text,
  MultiLineDots,
  ButtonSpace
} from './styled';
import { LoadingIndicator } from '../../Legislations/LegislationRecord/styled';

const RegulationRecord: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [timeStamp, setTimeStamp] = useState(new Date().getTime());
  const path = window.location.pathname;
  const regulationId = Number(path.substring(path.lastIndexOf('/') + 1));
  const regulation = useSelector(selectors.regulationRecord);
  const userRole = localStorage.getItem('user.role');
  const dispatch = useDispatch();
  const location = useLocation();
  const resultValue: any = location.state;
  const [execReadMoreLess, setExecReadMoreLess] = useState<'Read less' | 'Read more'>('Read more');
  const [execLines, setExecLines] = useState(0);
  const history = useHistory();

  function handleListRegulationRecord() {
    dispatch(getRegulationRecordRequest({ id: regulationId }));
  }

  useEffect(() => {
    dispatch(getRegulationRecordRequest({ id: regulationId }));
  }, [dispatch, regulationId]);

  useEffect(() => {
    loadUserDataOnStorage();
    // move to table
    const tableSection = document.getElementById('group-table');

    if (tableSection && resultValue?.scrollToTable) {
      tableSection.scrollIntoView();
    }
  }, []);

  useEffect(() => {
    setTimeout(function xyz() {
      const lines1 = getLinesCount(document.getElementById('exec-summary'));
      setExecLines(lines1);
    }, 500);
  }, [regulation]);

  const removeTags = (tag: any) => {
    if (tag === null || tag === '' || tag === undefined) return '';
    tag = tag.toString();
    return parse(tag);
  };

  const getLinesCount = (element) => {
    if (element) {
      const prevLH = element.style.lineHeight;
      element.style.lineHeight = '1000px';

      const { height } = element.getBoundingClientRect();
      element.style.lineHeight = prevLH;

      return Math.floor(height / 1000);
    }
    return 0;
  }

  const executiveSummaryText = removeTags(regulation?.billEpaDocket) ?? '--';

  const regulationName = regulation?.nickname ? regulation.nickname.slice(0, 205) : regulation?.billTitle.slice(0, 205);
  const now = new Date();
  const date = now.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '');

  return (
    <Container>
      <ScrollTopButton
        notifyScroll={() => setTimeStamp(new Date().getTime())}
      />
      {openModal && (
        <ModalRegulationEdit
          open={openModal}
          close={() => setOpenModal(false)}
          modalTitle="Edit Regulation"
          editData={regulation}
          updateList={() => handleListRegulationRecord()}
        />
      )}
      <HeaderContainer>
        <BreadCrumbsWrapper>
          <BreadCrumbs href="/">Home</BreadCrumbs>
          <ArrowDown />
          <CurrentPage>
            <Tooltip title={regulation?.nickname}>
              {regulation?.nickname.length > 65
                ? `${regulation?.nickname.slice(0, 65)}...`
                : regulation?.nickname}
            </Tooltip>
          </CurrentPage>
        </BreadCrumbsWrapper>
        <ContainerDownload>
          <Button
            onClick={() => handleDownloadPage(`${regulationName}-${date}.pdf`)}
            text="Download Regulation"
          />
        </ContainerDownload>
      </HeaderContainer>
      <Content id="divIdToPrint">
        
        {regulation ? (
          <>
        <ContainerMainSection>
          <MainSection>
            <Wrapper>
              <ContentWrapper>
                <Label>Regulation Name</Label>
                <MainSectionText>
                  <Tooltip title={regulation?.billTitle}>
                    {regulation?.billTitle.length > 65
                      ? `${regulation?.billTitle.slice(0, 65)}...`
                      : regulation?.billTitle}
                  </Tooltip>
                </MainSectionText>
              </ContentWrapper>
              <ContentWrapper>
                <Label>Nickname</Label>
                <MainSectionText>{regulation?.nickname}</MainSectionText>
              </ContentWrapper>
            </Wrapper>
            <Wrapper>
              <ContentWrapper>
                <Label>Jurisdiction</Label>
                <MainSectionText>
                  {regulation?.Jurisdiction?.description}
                </MainSectionText>
              </ContentWrapper>
              <ContentWrapper>
                <Label>Regulatory Body</Label>
                <TextContainer>{regulation?.Agency?.description}</TextContainer>
              </ContentWrapper>
            </Wrapper>
          </MainSection>
          {userRole == null || userRole == 'Read-only' ? null : (
            <Wrapper>
              <ContentWrapper>
                <ContainerButton>
                  <Button
                    toolTip={
                      userRole == null || userRole == 'Read-only'
                        ? 'User role not authorized to open: Read-only'
                        : undefined
                    }
                    text="Edit"
                    onClick={() => setOpenModal(true)}
                    isDisabled={userRole == null || userRole == 'Read-only'}
                  />
                </ContainerButton>
              </ContentWrapper>
            </Wrapper>
          )}
        </ContainerMainSection>

        <GeneralSection>
          <Label>Executive Summary</Label>
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
          <MultiLineDots
            showLess={
              execReadMoreLess === 'Read more'
            }
          >
            {executiveSummaryText}
          </MultiLineDots>
          {execLines > 6
            && <ButtonSpace>
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
            </ButtonSpace>}
        </GeneralSection>
        </>

        ): (
          <div style={{margin: '1rem', height: '5rem'}}>
            <LoadingIndicator/>
          </div>
        )}

        <GeneralSection>
          {!!regulationId && (
            <LinkLegislation
            legislationId={regulationId}
          />
          )}
        </GeneralSection>

        <GeneralSection>
          <RegulatoryUpdates
            regulationId={regulationId}
            timeStamp={timeStamp}
          />
        </GeneralSection>
        <GeneralSection>
          <RelatedSubstances
            id="tableDiv"
            legislation={regulation}
            legislationId={regulationId}
            recType="regulation"
            recName={regulation?.billTitle}
            timeStamp={timeStamp}
          />
        </GeneralSection>
        <GeneralSection>
          <Attachments legislationId={regulationId} timeStamp={timeStamp} />
        </GeneralSection>
      </Content>
    </Container>
  );
};

export default RegulationRecord;
