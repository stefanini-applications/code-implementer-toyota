/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';

import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal, Tooltip } from 'antd';
import Moment from 'moment';

import history from '../../../routes/history';
import loadUserDataOnStorage from '../../../utils/userData';
import Button from '../../Button';
import Link from '../../Link';
import {
  ContainerClosed,
  CollapsibleClosed,
  InfoDateClosed,
  MiddleWrapperClosed,
  InfoDataClosed,
  ArrowDown,
  ContainerOpen,
  HeaderCollapsibleOpen,
  Touchable,
  ImpactAssessmentTable,
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
  SubEightCelOne,
  SubEightCelFour,
  SubEightCelThree,
  ContainerButton,
  InfoRegionClosed,
  LabelItem,
  ContainerHeaders,
  LeftHeaders,
  LabelHeader,
  RightHeaders,
  ArrowDownSort,
  ContainerCollapseInfo,
  CollapseInfoLeft,
  CollapseInfoRight,
  InfoGroup,
  ContainerContent,
  SubColumnEight,
  ArrowUpSort,
  ContainerBigCircle,
  ClosedLabel,
  SubEightCelTwo
} from './styled';

interface ICollapsibleImpactAssessment {
  data: any;
  onCollapsibleClick?: any;
  onEditRecordClick?: any;
  showApplicationArea: Array<any>;
  onSortDirection?: any;
  sortDirection?: any;
}

const CollapsibleImpactAssessment: React.FC<ICollapsibleImpactAssessment> = ({
  data,
  onCollapsibleClick,
  onEditRecordClick,
  showApplicationArea,
  onSortDirection,
  sortDirection
}) => {
  const userRole = localStorage.getItem('user.role');
  const handleIndexClick = (indexClick: any, action: any) => {
    data[indexClick].open = action;
    onCollapsibleClick && onCollapsibleClick();
  };

  useEffect(() => {
    data.forEach(element => {
      element.open = false;
    });
  }, [data]);
  let colorLevel: any;

  useEffect(() => {
    if (!userRole) {
      loadUserDataOnStorage();
    }
  }, [userRole]);

  const applicationArea1Only =
    showApplicationArea[0] === false &&
    showApplicationArea[1] === true &&
    showApplicationArea[2] === false &&
    showApplicationArea[3] === false;

  const applicationArea2Only =
    showApplicationArea[0] === false &&
    showApplicationArea[1] === false &&
    showApplicationArea[2] === true &&
    showApplicationArea[3] === false;

  const applicationArea3Only =
    showApplicationArea[0] === false &&
    showApplicationArea[1] === false &&
    showApplicationArea[2] === false &&
    showApplicationArea[3] === true;

  const { confirm } = Modal;

  const showConfirm = item => {
    const regulationId = item.regulation.id;
    confirm({
      title: 'Edit Impact Assessment for Group',
      icon: <ExclamationCircleFilled />,
      content: `Changes to this Impact Assessment must be made via Excel (where you can view this substance within its group). This can be done within the Related Substances table on the ${
        item?.regulation?.recordType === 1 ? 'Regulation' : 'Legislation'
      } Page`,
      okText: `Go to ${
        item.regulation.recordType === 1 ? 'Regulation' : 'Legislation'
      }`,
      cancelText: 'Cancel',
      onOk() {
        history.push(
          `/${
            item.regulation.recordType === 1 ? 'regulation' : 'legislation'
          }/${regulationId}#group-table`
        );
      }
    });
  };

  const priorityRankShorter = [
    {
      fullName: 'No Risk',
      shortName: 'NR'
    },
    {
      fullName: 'Low',
      shortName: 'L'
    },
    {
      fullName: 'Medium',
      shortName: 'M'
    },
    {
      fullName: 'High',
      shortName: 'H'
    },
    {
      fullName: 'Very High',
      shortName: 'VH'
    }
  ];

  const getToyotaRegionId = region => {
    switch (region) {
      case 'Americas':
        return 1;
      case 'Europe':
        return 2;
      case 'SE Asia':
        return 3;
      case 'China':
        return 4;
      case 'Japan':
        return 5;
      default:
        return 0;
    }
  };

  const checkAndRetrieveShortName = value => {
    const foundObject = priorityRankShorter.find(obj => obj.fullName === value);

    if (foundObject) {
      return foundObject.shortName;
    }

    return '';
  };

  const handleViewIAPage = (item: any) => {
    const finalParam = {
      substanceId: item.id,
      regulationId: item.regulation.id,
      toyotaRegionId: item.toyotaRegion
    };
    history.push('/view-substance-impact-assessment', {
      state: { finalParam }
    });
  };

  return (
    <>
      <ContainerHeaders>
        <LeftHeaders>
          <LabelHeader>Legislation / Regulation</LabelHeader>
          <LabelHeader>Group</LabelHeader>
        </LeftHeaders>

        <RightHeaders>
          <InfoRegionClosed>
            <LabelHeader>Impacted Toyota Region</LabelHeader>
          </InfoRegionClosed>
          <InfoDateClosed>
            <LabelHeader>Updated on</LabelHeader>
          </InfoDateClosed>
          <LabelHeader>Priority</LabelHeader>
        </RightHeaders>
      </ContainerHeaders>

      {data?.map((item: any, index: any) => {
        return (
          <>
            <ContainerContent open={item.open}>
              <ContainerClosed
                onClick={() => handleIndexClick(index, !item.open)}
              >
                <CollapsibleClosed>
                  <>
                    {(() => {
                      switch (checkAndRetrieveShortName(item?.priorityRank)) {
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
                          colorLevel = '#FFFFFF';
                          break;
                      }
                    })()}
                  </>
                  <ContainerCollapseInfo>
                    <CollapseInfoLeft>
                      <MiddleWrapperClosed>
                        <ArrowDown open={item.open} />
                        <InfoDataClosed>
                          <LabelItem>
                            {item.open ? (
                              <Link
                                href={`/${
                                  item?.regulation.recordType === 1
                                    ? 'regulation'
                                    : 'legislation'
                                }/${item?.regulation.id}`}
                              >
                                {item?.regulation.nickname ||
                                  item?.regulation?.billTitle}
                              </Link>
                            ) : (
                              <Tooltip
                                title={
                                  item?.regulation.nickname ||
                                  item?.regulation?.billTitle
                                }
                              >
                                <ClosedLabel>
                                  {item?.regulation.nickname ||
                                    item?.regulation?.billTitle}
                                </ClosedLabel>
                              </Tooltip>
                            )}
                          </LabelItem>
                        </InfoDataClosed>
                      </MiddleWrapperClosed>
                      <InfoGroup>
                        <LabelItem>
                          {item.open ? (
                            <Link
                              href={`/view-impact-assessment-group/${
                                item?.regulationGroupId
                              }/${getToyotaRegionId(item?.toyotaRegion)}`}
                            >
                              {item?.regulationGroup}
                            </Link>
                          ) : (
                            <Tooltip title={item?.regulationGroup}>
                              <ClosedLabel>{item?.regulationGroup}</ClosedLabel>
                            </Tooltip>
                          )}
                        </LabelItem>
                      </InfoGroup>
                    </CollapseInfoLeft>

                    <CollapseInfoRight>
                      <InfoRegionClosed>
                        <LabelItem>{item?.toyotaRegion}</LabelItem>
                      </InfoRegionClosed>

                      <InfoDateClosed>
                        <LabelItem>
                          {Moment(item.updatedAt).format(
                            process.env.REACT_APP_DATE_FORMAT
                          )}
                        </LabelItem>
                      </InfoDateClosed>
                      <ContainerBigCircle>
                        <BigCircle backgroundColor={colorLevel}>
                          <BigCircleText>
                            {checkAndRetrieveShortName(item?.priorityRank)}
                          </BigCircleText>
                        </BigCircle>
                      </ContainerBigCircle>
                    </CollapseInfoRight>
                  </ContainerCollapseInfo>
                </CollapsibleClosed>
              </ContainerClosed>

              <ContainerOpen>
                <ImpactAssessmentTable
                  selectedArea={
                    showApplicationArea.filter(value => value === true)
                      .length === 1
                  }
                >
                  <SubColumnOne>Application Area</SubColumnOne>
                  <SubColumnTwo>Phase (A)</SubColumnTwo>
                  <SubColumnThree>Level of Restriction (B)</SubColumnThree>
                  <SubColumnFour>Hits</SubColumnFour>
                  <SubColumnFive>Resources Impact (C)</SubColumnFive>
                  <SubColumnSix>Development (D)</SubColumnSix>
                  <SubColumnSeven>Evaluation (E)</SubColumnSeven>
                  <SubColumnEight>Priority</SubColumnEight>
                  {showApplicationArea[0] && (
                    <>
                      <SubOneCelOne>
                        {item?.rows[0]?.applicationArea}
                      </SubOneCelOne>
                      <SubThreeCelOne>
                        {item?.rows[0]?.restrictionLevel}
                      </SubThreeCelOne>
                      <SubFourCelOne>{item?.rows[0]?.hits}</SubFourCelOne>
                      <SubFiveCelOne>
                        {item?.rows[0]?.resourcesImpact}
                      </SubFiveCelOne>
                      <SubSixCelOne>{item?.rows[0]?.dev}</SubSixCelOne>
                      <SubSevenCelOne>{item?.rows[0]?.evalTime}</SubSevenCelOne>
                      <SubEightCelOne>
                        <>
                          {(() => {
                            switch (
                              checkAndRetrieveShortName(
                                item?.rows[0]?.priorityRank
                              )
                            ) {
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
                                colorLevel = '#FFF';
                                break;
                            }
                          })()}
                        </>
                        <BigCircle backgroundColor={colorLevel}>
                          <BigCircleText>
                            {checkAndRetrieveShortName(
                              item?.rows[0]?.priorityRank
                            )}
                          </BigCircleText>
                        </BigCircle>
                      </SubEightCelOne>
                    </>
                  )}

                  {showApplicationArea[1] && (
                    <>
                      <SubOneCelTwo selectedArea={applicationArea1Only}>
                        {item?.rows[1]?.applicationArea}
                      </SubOneCelTwo>
                      <SubThreeCelTwo selectedArea={applicationArea1Only}>
                        {item?.rows[1]?.restrictionLevel}
                      </SubThreeCelTwo>
                      <SubFourCelTwo selectedArea={applicationArea1Only}>
                        {item?.rows[1]?.hits}
                      </SubFourCelTwo>
                      <SubFiveCelTwo selectedArea={applicationArea1Only}>
                        {item?.rows[1]?.resourcesImpact}
                      </SubFiveCelTwo>
                      <SubSixCelTwo selectedArea={applicationArea1Only}>
                        {item?.rows[1]?.dev}
                      </SubSixCelTwo>
                      <SubSevenCelTwo selectedArea={applicationArea1Only}>
                        {item?.rows[1]?.evalTime}
                      </SubSevenCelTwo>
                      <SubEightCelTwo selectedArea={applicationArea1Only}>
                        <>
                          {(() => {
                            switch (
                              checkAndRetrieveShortName(
                                item?.rows[1]?.priorityRank
                              )
                            ) {
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
                                colorLevel = '#FFFFFF';
                                break;
                            }
                          })()}
                        </>
                        <BigCircle backgroundColor={colorLevel}>
                          <BigCircleText>
                            {checkAndRetrieveShortName(
                              item?.rows[1]?.priorityRank
                            )}
                          </BigCircleText>
                        </BigCircle>
                      </SubEightCelTwo>
                    </>
                  )}

                  {showApplicationArea[2] && (
                    <>
                      <SubOneCelThree selectedArea={applicationArea2Only}>
                        {item?.rows[2]?.applicationArea}
                      </SubOneCelThree>
                      <SubThreeCelThree selectedArea={applicationArea2Only}>
                        {item?.rows[2]?.restrictionLevel}
                      </SubThreeCelThree>
                      <SubFourCelThree selectedArea={applicationArea2Only}>
                        {item?.rows[2]?.hits}
                      </SubFourCelThree>
                      <SubFiveCelThree selectedArea={applicationArea2Only}>
                        {item?.rows[2]?.resourcesImpact}
                      </SubFiveCelThree>
                      <SubSixCelThree selectedArea={applicationArea2Only}>
                        {item?.rows[2]?.dev}
                      </SubSixCelThree>
                      <SubSevenCelThree selectedArea={applicationArea2Only}>
                        {item?.rows[2]?.evalTime}
                      </SubSevenCelThree>
                      <SubEightCelThree selectedArea={applicationArea2Only}>
                        <>
                          {(() => {
                            switch (
                              checkAndRetrieveShortName(
                                item?.rows[2]?.priorityRank
                              )
                            ) {
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
                                colorLevel = '#FFFFFF';
                                break;
                            }
                          })()}
                        </>
                        <BigCircle backgroundColor={colorLevel}>
                          <BigCircleText>
                            {checkAndRetrieveShortName(
                              item?.rows[2]?.priorityRank
                            )}
                          </BigCircleText>
                        </BigCircle>
                      </SubEightCelThree>
                    </>
                  )}

                  {showApplicationArea[3] && (
                    <>
                      <SubOneCelFour selectedArea={applicationArea3Only}>
                        {item?.rows[3]?.applicationArea}
                      </SubOneCelFour>
                      <SubThreeCelFour selectedArea={applicationArea3Only}>
                        {item?.rows[3]?.restrictionLevel}
                      </SubThreeCelFour>
                      <SubFourCelFour selectedArea={applicationArea3Only}>
                        {item?.rows[3]?.hits}
                      </SubFourCelFour>
                      <SubFiveCelFour selectedArea={applicationArea3Only}>
                        {item?.rows[3]?.resourcesImpact}
                      </SubFiveCelFour>
                      <SubSixCelFour selectedArea={applicationArea3Only}>
                        {item?.rows[3]?.dev}
                      </SubSixCelFour>
                      <SubSevenCelFour selectedArea={applicationArea3Only}>
                        {item?.rows[3]?.evalTime}
                      </SubSevenCelFour>
                      <SubEightCelFour selectedArea={applicationArea3Only}>
                        <>
                          {(() => {
                            switch (
                              checkAndRetrieveShortName(
                                item?.rows[3]?.priorityRank
                              )
                            ) {
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
                                colorLevel = '#FFFFFF';
                                break;
                            }
                          })()}
                        </>
                        <BigCircle backgroundColor={colorLevel}>
                          <BigCircleText>
                            {checkAndRetrieveShortName(
                              item?.rows[3]?.priorityRank
                            )}
                          </BigCircleText>
                        </BigCircle>
                      </SubEightCelFour>
                    </>
                  )}

                  <SubTwoCelOne>{item?.phase}</SubTwoCelOne>
                </ImpactAssessmentTable>
                <HeaderCollapsibleOpen>
                  <ContainerButton>
                    {userRole === null || userRole === 'Read-only' ? null : (
                      <Touchable>
                        {item.regulationGroup ? (
                          <Link onClick={() => showConfirm(item)}>
                            Edit for group
                          </Link>
                        ) : (
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-around',
                              width: '150px'
                            }}
                          >
                            <Button
                              text="View"
                              onClick={() => handleViewIAPage(item)}
                            />
                            <Button
                              toolTip={
                                userRole === null || userRole === 'Read-only'
                                  ? 'User role not authorized to open: Read-only'
                                  : undefined
                              }
                              isDisabled={
                                userRole === null || userRole === 'Read-only'
                              }
                              text="Edit"
                              onClick={() =>
                                !item.groupImpactAssessment
                                  ? onEditRecordClick &&
                                    onEditRecordClick(index, item)
                                  : showConfirm(item)
                              }
                            />
                          </div>
                        )}
                      </Touchable>
                    )}
                  </ContainerButton>
                </HeaderCollapsibleOpen>
              </ContainerOpen>
            </ContainerContent>
          </>
        );
      })}
    </>
  );
};

export default CollapsibleImpactAssessment;
