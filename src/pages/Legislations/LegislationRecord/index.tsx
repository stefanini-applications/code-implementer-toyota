import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import parse from 'html-react-parser';
import { Col, Row } from 'antd';
import Attachments from '../../../components/Attachments';
import Button from '../../../components/Button';
import ModalLegislationEdit from '../../../components/Modal/ModalLegislation';
import RegulatoryUpdates from '../../../components/RegulatoryUpdates';
import RelatedSubstances from '../../../components/RelatedSubstances';
import ScrollTopButton from '../../../components/ScrollTopButton';
import {
  selectors,
  getLegislationRecordRequest
} from '../../../store/modules/legislations/actions';
import handleDownloadPage from '../../../utils/download-page';
import loadUserDataOnStorage from '../../../utils/userData';
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
  WrapperFirstDetails,
  ContainerDownload,
  ContainerButton,
  ContentPhaseWrapper,
  MultiLineDots,
  ButtonSpace,
  LoadingIndicator
} from './styled';
import LinkLegislation from '../../../components/LinkLegislation';
import Loading from '../../../components/Loading';


const LegislationRecord: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [timeStamp, setTimeStamp] = useState(new Date().getTime());
  const path = window.location.pathname;
  const legislationId = Number(path.substring(path.lastIndexOf('/') + 1));
  const legislation = useSelector(selectors.legislationRecord);
  const userRole = localStorage.getItem('user.role');
  const location = useLocation();
  const resultValue: any = location.state;
  const dispatch = useDispatch();
  const [execReadMoreLess, setExecReadMoreLess] = useState<
    'Read less' | 'Read more'
  >('Read more');
  const [execLines, setExecLines] = useState(0);

  function handleListLegislationRecord() {
    dispatch(getLegislationRecordRequest({ id: legislationId }));
  }

  useEffect(() => {
    dispatch(getLegislationRecordRequest({ id: legislationId }));
  }, [dispatch, legislationId]);

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
  }, [legislation]);

  const removeTags = (tag: any) => {
    if (tag === null || tag === '' || tag === undefined) return '';
    tag = tag.toString();
    return parse(tag);
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

  const executiveSummaryText = removeTags(legislation?.billEpaDocket) ?? '--';

  const legislationName = legislation?.nickname
    ? legislation?.nickname.slice(0, 205)
    : legislation?.billTitle.slice(0, 205);
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
        <ModalLegislationEdit
          open={openModal}
          close={() => setOpenModal(false)}
          modalTitle="Edit Legislation"
          editData={legislation}
          updateList={() => handleListLegislationRecord()}
        />
      )}
      <HeaderContainer>
        <BreadCrumbsWrapper>
          <BreadCrumbs href="/">Home</BreadCrumbs>
          <ArrowDown />
          <CurrentPage>{legislation?.nickname}</CurrentPage>
        </BreadCrumbsWrapper>
        <ContainerDownload>
          <Button
            onClick={() => handleDownloadPage(`${legislationName}-${date}.pdf`)}
            text="Download Legislation"
          />
        </ContainerDownload>
      </HeaderContainer>
      <Content id="divIdToPrint">

        {legislation ? (
          <>
          <Row justify='end' style={{marginTop: '30px', padding: '10px'}}>
            <Col span={16}>
            <Label>Legislation Name</Label>
            <MainSectionText>{legislation?.billTitle}</MainSectionText>

            <Label>Nickname</Label>
                  <MainSectionText>{legislation?.nickname}</MainSectionText>
            </Col>

            <Col span={4}>
            <Row justify='space-between' gutter={16}>
              <Col span={12}>
              <Label>Sub-Jurisdiction</Label>
                  <MainSectionText>
                    {legislation?.Agency?.description}
                  </MainSectionText>
              </Col>
              <Col span={12}>
              <Label>Legislation Status</Label>
              <MainSectionText>{legislation?.status}</MainSectionText>
              </Col>
            </Row>

            <Row justify='space-between' gutter={16}>
              <Col span={12}>
              <Label>Jurisdiction</Label>
                  <MainSectionText>
                    {legislation?.Jurisdiction?.description}
                  </MainSectionText>
              </Col>
              <Col span={12}>
              <Label> Year</Label>
                <MainSectionText>{legislation?.year}</MainSectionText>
              </Col>
            </Row>
            </Col>
            <Col span={4}>
            <Wrapper>
                <ContentPhaseWrapper>
                  <Label>Phase</Label>
                  <BigCircle>
                    <BigCircleText>{legislation?.phase ?? 0}</BigCircleText>
                  </BigCircle>
                </ContentPhaseWrapper>
                {userRole == null || userRole == 'Read-only' ? null : (
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
                )}
              </Wrapper>
            </Col>

          </Row>

            <GeneralSection>
              <Label>Executive Summary</Label>
              {/** dup conponent just to get number of lines */}
              <MultiLineDots
                id="exec-summary"
                style={{
                  // opacity: 0
                  color: 'white',
                  position: 'absolute',
                  zIndex: -1
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
          </>
        ) : (
          <div style={{margin: '1rem', height: '5rem'}}>
            <LoadingIndicator/>
          </div>
        )}
        <div>
          {!!legislationId && <LinkLegislation legislationId={legislationId} />}
        </div>
        <GeneralSection>
          <RegulatoryUpdates
            regulationId={legislationId}
            timeStamp={timeStamp}
          />
        </GeneralSection>
        <GeneralSection>
          <RelatedSubstances
            legislation={legislation}
            legislationId={legislationId}
            recType="legislation"
            recName={legislation?.billTitle}
          />
        </GeneralSection>
        <GeneralSection>
          <Attachments legislationId={legislationId} timeStamp={timeStamp} />
        </GeneralSection>
      </Content>
    </Container>
  );
};

export default LegislationRecord;
