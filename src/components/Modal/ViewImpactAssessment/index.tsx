/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';

import Moment from 'moment';

import Button from '../../Button';
import {
  Container,
  Content,
  ButtonsContainer,
  Overlay,
  ImapctAssessmentModal,
  TitleModal,
  XIcon,
  InfoWrapperOpen,
  InfoTextOpen,
  InfoDataOpenName,
  InfoWrapperOpenDate,
  InfoDateOpen,
  ImpactAssessmentTable,
  TitleColumnOne,
  TitleColumnTwo,
  TitleColumnThree,
  SubColumnOne,
  SubColumnTwo,
  SubColumnThree,
  SubColumnFour,
  SubColumnFive,
  SubColumnSix,
  SubColumnSeven,
  SubOneCelOne,
  SubOneCelTwo,
  SubOneCelThree,
  SubOneCelFour,
  SubTwoCelOne,
  SubThreeCelOne,
  SubThreeCelTwo,
  SubThreeCelThree,
  SubThreeCelFour,
  SubFourCelOne,
  SubFourCelTwo,
  SubFourCelThree,
  SubFourCelFour,
  SubFiveCelOne,
  SubFiveCelTwo,
  SubFiveCelThree,
  SubFiveCelFour,
  SubSixCelOne,
  SubSixCelTwo,
  SubSixCelThree,
  SubSixCelFour,
  SubSevenCelOne,
  SubSevenCelTwo,
  SubSevenCelThree,
  SubSevenCelFour,
  SubEightCelOne,
  BigCircle,
  BigCircleText,
  SubEightCelFour,
  SubEightCelThree,
  SubEightCelTwo,
  MiddleWrapperOpen,
  SubColumnEight
} from './styled';

interface IModalUpdate {
  data?: any;
  modalTitle: any;
  onClose?: any;
  onEditRecordClick?: any;
}

const ImpactAssessmentModal: React.FC<IModalUpdate> = ({
  data,
  modalTitle,
  onClose,
  onEditRecordClick
}) => {
  const userRole = localStorage.getItem('user.role');

  useEffect(() => {
    // data
  }, [data]);

  useEffect(() => {
    // fetch data if any
  }, []);

  const handleClose = () => {
    document.body.classList.remove('hide-overflow');
    onClose();
  };

  const getPriorityRankShortValue = priorityRank => {
    switch (priorityRank) {
      case 'Low':
        return 'L';
      case 'Medium':
        return 'M';
      case 'High':
        return 'H';
      case 'Very High':
        return 'VH';
      case 'No Risk':
        return 'NR';
      default:
        return '';
    }
  };

  let colorLevel: any;

  return (
    <Container>
      <ImapctAssessmentModal>
        <TitleModal>
          <p>{modalTitle}</p>
          <XIcon onClick={() => handleClose()} />
        </TitleModal>
        <Content>
          <MiddleWrapperOpen>
            <InfoWrapperOpen>
              <InfoTextOpen>Regulatory Framework:</InfoTextOpen>
              <InfoDataOpenName>{data?.regulation?.nickname}</InfoDataOpenName>
            </InfoWrapperOpen>
            <InfoWrapperOpenDate>
              <InfoTextOpen>Update on:</InfoTextOpen>
              <InfoDateOpen>
                {Moment(data?.updatedAt).format(
                  process.env.REACT_APP_DATE_FORMAT
                )}
              </InfoDateOpen>
            </InfoWrapperOpenDate>
          </MiddleWrapperOpen>
          <ImpactAssessmentTable>
            <SubColumnOne>Application Area</SubColumnOne>
            <SubColumnTwo>Phase (A)</SubColumnTwo>
            <SubColumnThree>Level of Restriction (B)</SubColumnThree>
            <SubColumnFour>Hits</SubColumnFour>
            <SubColumnFive>Resources Impact (C)</SubColumnFive>
            <SubColumnSix>Development (D)</SubColumnSix>
            <SubColumnSeven>Evaluation (E)</SubColumnSeven>
            <SubColumnEight>Priority</SubColumnEight>
            <>
              <SubOneCelOne>{data?.rows[0]?.applicationArea}</SubOneCelOne>
              <SubThreeCelOne>{data?.rows[0]?.restrictionLevel}</SubThreeCelOne>
              <SubFourCelOne>{data?.rows[0]?.hits}</SubFourCelOne>
              <SubFiveCelOne>{data?.rows[0]?.resourcesImpact}</SubFiveCelOne>
              <SubSixCelOne>{data?.rows[0]?.dev}</SubSixCelOne>
              <SubSevenCelOne>{data?.rows[0]?.evalTime}</SubSevenCelOne>
              <SubEightCelOne>
                <>
                  {(() => {
                    switch (data?.rows[0]?.priorityRank) {
                      case 'Low':
                        colorLevel = '#FFE6B3';
                        break;
                      case 'Medium':
                        colorLevel = '#FFCC99';
                        break;
                      case 'High':
                        colorLevel = '#FF9F8C';
                        break;
                      case 'Very High':
                        colorLevel = '#FF8080';
                        break;
                      case 'No Risk':
                        colorLevel = '#DCEECF';
                        break;
                      default:
                        colorLevel = '#FFF';
                        break;
                    }
                  })()}
                </>
                <BigCircle backgroundColor={colorLevel}>
                  <BigCircleText>
                    {getPriorityRankShortValue(data?.rows[0]?.priorityRank)}
                  </BigCircleText>
                </BigCircle>
              </SubEightCelOne>
            </>

            <>
              <SubOneCelTwo>{data?.rows[1]?.applicationArea}</SubOneCelTwo>
              <SubThreeCelTwo>{data?.rows[1]?.restrictionLevel}</SubThreeCelTwo>
              <SubFourCelTwo>{data?.rows[1]?.hits}</SubFourCelTwo>
              <SubFiveCelTwo>{data?.rows[1]?.resourcesImpact}</SubFiveCelTwo>
              <SubSixCelTwo>{data?.rows[1]?.dev}</SubSixCelTwo>
              <SubSevenCelTwo>{data?.rows[1]?.evalTime}</SubSevenCelTwo>
              <SubEightCelTwo>
                <>
                  {(() => {
                    switch (data?.rows[1]?.priorityRank) {
                      case 'Low':
                        colorLevel = '#FFE6B3';
                        break;
                      case 'Medium':
                        colorLevel = '#FFCC99';
                        break;
                      case 'High':
                        colorLevel = '#FF9F8C';
                        break;
                      case 'Very High':
                        colorLevel = '#FF8080';
                        break;
                      case 'No Risk':
                        colorLevel = '#DCEECF';
                        break;
                      default:
                        break;
                    }
                  })()}
                </>
                <BigCircle backgroundColor={colorLevel}>
                  <BigCircleText>
                    {getPriorityRankShortValue(data?.rows[1]?.priorityRank)}
                  </BigCircleText>
                </BigCircle>
              </SubEightCelTwo>
            </>
            <>
              <SubOneCelThree>{data?.rows[2]?.applicationArea}</SubOneCelThree>
              <SubThreeCelThree>
                {data?.rows[2]?.restrictionLevel}
              </SubThreeCelThree>
              <SubFourCelThree>{data?.rows[2]?.hits}</SubFourCelThree>
              <SubFiveCelThree>
                {data?.rows[2]?.resourcesImpact}
              </SubFiveCelThree>
              <SubSixCelThree>{data?.rows[2]?.dev}</SubSixCelThree>
              <SubSevenCelThree>{data?.rows[2]?.evalTime}</SubSevenCelThree>
              <SubEightCelThree>
                <>
                  {(() => {
                    switch (data?.rows[2]?.priorityRank) {
                      case 'Low':
                        colorLevel = '#FFE6B3';
                        break;
                      case 'Medium':
                        colorLevel = '#FFCC99';
                        break;
                      case 'High':
                        colorLevel = '#FF9F8C';
                        break;
                      case 'Very High':
                        colorLevel = '#FF8080';
                        break;
                      case 'No Risk':
                        colorLevel = '#DCEECF';
                        break;
                      default:
                        break;
                    }
                  })()}
                </>
                <BigCircle backgroundColor={colorLevel}>
                  <BigCircleText>
                    {getPriorityRankShortValue(data?.rows[2]?.priorityRank)}
                  </BigCircleText>
                </BigCircle>
              </SubEightCelThree>
            </>

            <>
              <SubOneCelFour>{data?.rows[3]?.applicationArea}</SubOneCelFour>
              <SubThreeCelFour>
                {data?.rows[3]?.restrictionLevel}
              </SubThreeCelFour>
              <SubFourCelFour>{data?.rows[3]?.hits}</SubFourCelFour>
              <SubFiveCelFour>{data?.rows[3]?.resourcesImpact}</SubFiveCelFour>
              <SubSixCelFour>{data?.rows[3]?.dev}</SubSixCelFour>
              <SubSevenCelFour>{data?.rows[3]?.evalTime}</SubSevenCelFour>
              <SubEightCelFour>
                <>
                  {(() => {
                    switch (data?.rows[3]?.priorityRank) {
                      case 'Low':
                        colorLevel = '#FFE6B3';
                        break;
                      case 'Medium':
                        colorLevel = '#FFCC99';
                        break;
                      case 'High':
                        colorLevel = '#FF9F8C';
                        break;
                      case 'Very High':
                        colorLevel = '#FF8080';
                        break;
                      case 'No Risk':
                        colorLevel = '#DCEECF';
                        break;
                      default:
                        break;
                    }
                  })()}
                </>
                <BigCircle backgroundColor={colorLevel}>
                  <BigCircleText>
                    {getPriorityRankShortValue(data?.rows[3]?.priorityRank)}
                  </BigCircleText>
                </BigCircle>
              </SubEightCelFour>
            </>
            <SubTwoCelOne>{data?.phase}</SubTwoCelOne>
          </ImpactAssessmentTable>
        </Content>
        <ButtonsContainer>
          <Button text="Close" onClick={() => handleClose()} />
          <Button
            toolTip={
              userRole == null || userRole == 'Read-only'
                ? 'User role not authorized to open: Read-only'
                : undefined
            }
            isDisabled={userRole == null || userRole == 'Read-only'}
            text="Edit"
            onClick={() => onEditRecordClick && onEditRecordClick()}
            type="primary"
          />
        </ButtonsContainer>
      </ImapctAssessmentModal>
      <Overlay />
    </Container>
  );
};

export default ImpactAssessmentModal;
