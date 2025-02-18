/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';

import Moment from 'moment';

import {
  ContainerClosed,
  CollapsibleClosed,
  InfoDateClosed,
  MiddleWrapperClosed,
  InfoPhaseClosed,
  InfoTextClosed,
  InfoDataClosed,
  ArrowDown,
  ContainerOpen,
  HeaderCollapsibleOpen,
  ArrowUp,
  MiddleWrapperOpen,
  InfoWrapperOpen,
  InfoTextOpen,
  InfoDataOpen,
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
  BigCircle,
  BigCircleText,
  LabelDateUpdate,
  SubEightCelOne,
  SubEightCelFour,
  SubEightCelThree,
  SubEightCelTwo
  // InvisibleColumn
} from './styled';

interface ICollapsibleImpactAssessment {
  data: any;
  open?: any;
  onCollapsibleClick: any;
  showApplicationArea: Array<any>;
}

const CollapsibleClassImpactAssessment: React.FC<
  ICollapsibleImpactAssessment
> = ({
  data,
  open,
  onCollapsibleClick,
  showApplicationArea
}) => {
  const [collapseIndex, setCollapseIndex] = useState(null);
  const handleIndexClick = (indexClick: any) => {
    setCollapseIndex(indexClick);
    onCollapsibleClick && onCollapsibleClick();
  };
  return (
    <>
      {data?.map((item: any, index: any) => {
        return open === true && collapseIndex === index ? (
          <ContainerOpen>
            <HeaderCollapsibleOpen>
              <ArrowUp onClick={() => handleIndexClick(index)} />
            </HeaderCollapsibleOpen>
            <MiddleWrapperOpen>
              <InfoWrapperOpen>
                <InfoTextOpen>Substance:</InfoTextOpen>
                <InfoDataOpen>{item.Substance.commonName}</InfoDataOpen>
              </InfoWrapperOpen>
              <InfoWrapperOpen>
                <InfoTextOpen>Regulatory Framework:</InfoTextOpen>
                <InfoDataOpen>{item.Regulation.nickname}</InfoDataOpen>
              </InfoWrapperOpen>
              <InfoWrapperOpen>
                <InfoTextOpen>Update on:</InfoTextOpen>
                <InfoDateOpen>
                  {Moment(item.updatedAt).format(
                    process.env.REACT_APP_DATE_FORMAT
                  )}
                </InfoDateOpen>
              </InfoWrapperOpen>
            </MiddleWrapperOpen>
            <ImpactAssessmentTable>
              <TitleColumnOne>Regulatory Scope</TitleColumnOne>
              <TitleColumnTwo>Severity</TitleColumnTwo>
              <TitleColumnThree>Level of Control</TitleColumnThree>
              <SubColumnOne>Application Area</SubColumnOne>
              <SubColumnTwo>Phase</SubColumnTwo>
              <SubColumnThree>Level of Restriction</SubColumnThree>
              <SubColumnFour>Hits</SubColumnFour>
              <SubColumnFive>Resources Impact</SubColumnFive>
              <SubColumnSix>Development</SubColumnSix>
              <SubColumnSeven>Evaluation</SubColumnSeven>
              {showApplicationArea[0] && (
                <>
                  <SubOneCelOne>
                    {item?.ImpactAssessmentRows[0]?.ApplicationArea?.descript}
                  </SubOneCelOne>
                  <SubThreeCelOne>
                    {item?.ImpactAssessmentRows[0]?.restrictionLevel}
                  </SubThreeCelOne>
                  <SubFourCelOne>
                    {item?.ImpactAssessmentRows[0]?.hits}
                  </SubFourCelOne>
                  <SubFiveCelOne>
                    {item?.ImpactAssessmentRows[0]?.resourcesImpact}
                  </SubFiveCelOne>
                  <SubSixCelOne>
                    {item?.ImpactAssessmentRows[0]?.dev}
                  </SubSixCelOne>
                  <SubSevenCelOne>
                    {item?.ImpactAssessmentRows[0]?.evalTime}
                  </SubSevenCelOne>
                  <SubEightCelOne>
                    <BigCircle>
                      <BigCircleText>
                        {item?.ImpactAssessmentRows[0]?.priorityRank}
                      </BigCircleText>
                    </BigCircle>
                  </SubEightCelOne>
                </>
              )}

              {showApplicationArea[1] && (
                <>
                  <SubOneCelTwo>
                    {item?.ImpactAssessmentRows[1]?.ApplicationArea?.descript}
                  </SubOneCelTwo>
                  <SubThreeCelTwo>
                    {item?.ImpactAssessmentRows[1]?.restrictionLevel}
                  </SubThreeCelTwo>
                  <SubFourCelTwo>
                    {item?.ImpactAssessmentRows[1]?.hits}
                  </SubFourCelTwo>
                  <SubFiveCelTwo>
                    {item?.ImpactAssessmentRows[1]?.resourcesImpact}
                  </SubFiveCelTwo>
                  <SubSixCelTwo>
                    {item?.ImpactAssessmentRows[1]?.dev}
                  </SubSixCelTwo>
                  <SubSevenCelTwo>
                    {item?.ImpactAssessmentRows[1]?.evalTime}
                  </SubSevenCelTwo>
                  <SubEightCelTwo>
                    <BigCircle>
                      <BigCircleText>
                        {item?.ImpactAssessmentRows[1]?.priorityRank}
                      </BigCircleText>
                    </BigCircle>
                  </SubEightCelTwo>
                </>
              )}

              {showApplicationArea[2] && (
                <>
                  <SubOneCelThree>
                    {item?.ImpactAssessmentRows[2]?.ApplicationArea?.descript}
                  </SubOneCelThree>
                  <SubThreeCelThree>
                    {item?.ImpactAssessmentRows[2]?.restrictionLevel}
                  </SubThreeCelThree>
                  <SubFourCelThree>
                    {item?.ImpactAssessmentRows[2]?.hits}
                  </SubFourCelThree>
                  <SubFiveCelThree>
                    {item?.ImpactAssessmentRows[2]?.resourcesImpact}
                  </SubFiveCelThree>
                  <SubSixCelThree>
                    {item?.ImpactAssessmentRows[2]?.dev}
                  </SubSixCelThree>
                  <SubSevenCelThree>
                    {item?.ImpactAssessmentRows[2]?.evalTime}
                  </SubSevenCelThree>
                  <SubEightCelThree>
                    <BigCircle>
                      <BigCircleText>
                        {item?.ImpactAssessmentRows[2]?.priorityRank}
                      </BigCircleText>
                    </BigCircle>
                  </SubEightCelThree>
                </>
              )}

              {showApplicationArea[3] && (
                <>
                  <SubOneCelFour>
                    {item?.ImpactAssessmentRows[3]?.ApplicationArea?.descript}
                  </SubOneCelFour>
                  <SubThreeCelFour>
                    {item?.ImpactAssessmentRows[3]?.restrictionLevel}
                  </SubThreeCelFour>
                  <SubFourCelFour>
                    {item?.ImpactAssessmentRows[3]?.hits}
                  </SubFourCelFour>
                  <SubFiveCelFour>
                    {item?.ImpactAssessmentRows[3]?.resourcesImpact}
                  </SubFiveCelFour>
                  <SubSixCelFour>
                    {item?.ImpactAssessmentRows[3]?.dev}
                  </SubSixCelFour>
                  <SubSevenCelFour>
                    {item?.ImpactAssessmentRows[3]?.evalTime}
                  </SubSevenCelFour>
                  <SubEightCelFour>
                    <BigCircle>
                      <BigCircleText>
                        {item?.ImpactAssessmentRows[3]?.priorityRank}
                      </BigCircleText>
                    </BigCircle>
                  </SubEightCelFour>
                </>
              )}

              <SubTwoCelOne>{item?.phase}</SubTwoCelOne>
            </ImpactAssessmentTable>
          </ContainerOpen>
        ) : (
          <ContainerClosed>
            <CollapsibleClosed>
              <BigCircle>
                <BigCircleText>{item?.priorityRank}</BigCircleText>
              </BigCircle>
              <MiddleWrapperClosed>
                <InfoPhaseClosed>{item?.phase}</InfoPhaseClosed>
                <InfoTextClosed>Substance:</InfoTextClosed>
                <InfoDataClosed>{item?.Substance?.commonName}</InfoDataClosed>
                <InfoTextClosed>Regulatory Framework:</InfoTextClosed>
                <InfoDataClosed>{item?.Regulation?.nickname}</InfoDataClosed>
              </MiddleWrapperClosed>
              <InfoDateClosed>
                <LabelDateUpdate>Updated on:</LabelDateUpdate>
                {Moment(item?.updatedAt)?.format(
                  process.env.REACT_APP_DATE_FORMAT
                )}
              </InfoDateClosed>
            </CollapsibleClosed>
            <ArrowDown onClick={() => handleIndexClick(index)} />
          </ContainerClosed>
        );
      })}
    </>
  );
};

export default CollapsibleClassImpactAssessment;
