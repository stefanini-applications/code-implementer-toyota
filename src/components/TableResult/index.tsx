/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { BsFillDiamondFill } from 'react-icons/bs';
import { FaGavel } from 'react-icons/fa';
import { GoLaw } from 'react-icons/go';

import { Spin } from 'antd';
import Moment from 'moment';

import { translate } from '../../locales';
import history from '../../routes/history';
import Link from '../Link';
import {
  Container,
  Row,
  ResultItem,
  LeftSideContainer,
  MiddleSideContainer,
  MiddleSideTitle,
  MiddleSideInfoContainer,
  MiddleSideInfo,
  MiddleSideSubinfo,
  MiddleSideText,
  ContainerRelated,
  Related,
  EmptyResultsContainer,
  EmptyResultsText,
  SubUses
} from './styled';

interface ITableResult {
  searchResultData?: any;
  onItemSelected: () => void;
}

const TableResult: React.FC<ITableResult> = ({
  searchResultData,
  onItemSelected
}) => {
  const [filteredSearch, setFilteredSearch] = useState<any>([]);
  const [loadingStatus, setLoadingStatus] = useState<any>(true);

  useEffect(() => {
    setLoadingStatus(true);
  }, []);

  useEffect(() => {
    // Define valid statuses that we want to filter
    const validStatuses = ['active', 'inactive', 'passed'];
    console.log( );
    // Filter results to include only legislation with specific statuses (single or array)
    const filteredData = searchResultData?.filter((value: any) => {
      // Always include non-legislation types
      if (value.type !== 'Legislation') {
        return true;
      }
  
      // If status is an array, check if any of the statuses match valid ones
      if (Array.isArray(value.status)) {
        return value.status.some((status: string) =>
          validStatuses.includes(status.toLowerCase())
        );
      }
  
      // If status is a string, directly compare it with valid statuses
      return validStatuses.includes(value.status?.toLowerCase());
    });
  
    setFilteredSearch(filteredData);
    setLoadingStatus(false);
  }, [searchResultData]);

  const handleLinkClick = (type, id, event) => {
    event.preventDefault();
    if (event.button === 0 && !event.ctrlKey) {
      onItemSelected();
      history.push(`/${type.toLowerCase()}/${id}`);
    }

    if (event.ctrlKey || event.metaKey || event.button === 1) {
      window.open(`/${type.toLowerCase()}/${id}`, '_blank');
    }
  };

  // Helper function to convert camel case to readable format
  const toCamelCaseStatus = (status) => {
    // Convert the status to a string if it's not null or undefined, otherwise return fallback
    const statusStr = status != null ? String(status) : '';
  
    return statusStr
      .toLowerCase()
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toUpperCase() : word.toLowerCase()
      )
      .replace(/\s+/g, '') || '--'; // Return '--' if statusStr is empty
  };

  return (
    <>
      <Container>
        <>
          {loadingStatus ? (<Spin />) : null}
          {filteredSearch?.length === 0 && !loadingStatus ? (
            <EmptyResultsContainer>
              <EmptyResultsText>
                There are no results available for this search
              </EmptyResultsText>
            </EmptyResultsContainer>
          ) : (
            filteredSearch?.map((value: any) => {
              return (
                <ResultItem key={value.title}>
                  <LeftSideContainer>
                    {value.type == 'Substance' ? (
                      <BsFillDiamondFill />
                    ) : value.type == 'Regulation' ? (
                      <FaGavel />
                    ) : value.type == 'Legislation' ? (
                      <GoLaw />
                    ) : null}
                  </LeftSideContainer>
                  <MiddleSideContainer>
                    <Link onClick={() =>
                      handleLinkClick(value.type, value.id, event)
                    } fakeLink>
                      <MiddleSideTitle>
                        {value.title.split('•').join(' • ')}
                      </MiddleSideTitle>
                    </Link>
                    <MiddleSideInfoContainer>
                      {value.type != 'Substance' ? (
                        <Row>
                          <MiddleSideInfo>
                            {translate('components.searchResult.jurisdiction')}
                            <MiddleSideSubinfo>
                              {value?.jurisdiction || '--'}
                            </MiddleSideSubinfo>
                          </MiddleSideInfo>
                          <MiddleSideInfo>
                            {value.type == 'Legislation' ? (
                              <p>Sub-Jurisdiction:</p>
                            ) : value.type == 'Regulation' ? (
                              <p>Regulatory Body:</p>
                            ) : (
                              translate('components.searchResult.regulation')
                            )}

                            <MiddleSideSubinfo>
                              {value?.regulation || '--'}
                            </MiddleSideSubinfo>
                          </MiddleSideInfo>

                          {/* Status */}
                          {value.type === 'Legislation' ? (
                            <MiddleSideInfo>
                              <p>Status:</p>
                              <MiddleSideSubinfo>
                              {toCamelCaseStatus(value.status)}
                              </MiddleSideSubinfo>
                            </MiddleSideInfo>
                          ) : null}
                        </Row>
                      ) : (
                        <Row>
                          <MiddleSideInfo>
                            <MiddleSideSubinfo />
                          </MiddleSideInfo>
                        </Row>
                      )}

                      <Row>
                        <MiddleSideInfo>
                          <MiddleSideSubinfo>
                            {Moment(value.latestUpdate).format(
                              process.env.REACT_APP_DATE_FORMAT
                            )}
                          </MiddleSideSubinfo>
                        </MiddleSideInfo>
                        <MiddleSideInfo>
                          <MiddleSideSubinfo>
                            {value?.userAction || '--'}
                          </MiddleSideSubinfo>
                        </MiddleSideInfo>
                      </Row>
                    </MiddleSideInfoContainer>
                    <MiddleSideText>
                      {value?.text || 'No description available'}
                    </MiddleSideText>
                    {(value.type == 'Substance') && (
                      <ContainerRelated>
                        <p>Related Legislation / Regulation:</p>
                        {value?.relatedRegulations?.length !== 0 ? (
                          <Related>
                            {value?.relatedRegulations?.map((item: any) => {
                              return <li>{item?.billtitle}</li>;
                            })}
                          </Related>
                        ) : (
                          '--'
                        )}
                      </ContainerRelated>
                    )}
                    {(value.type == 'Substance') && (
                      <ContainerRelated>
                        <p>Substance Uses:</p>
                        {value?.subUses?.length !== 0 ? (
                          <SubUses>
                            {value?.subUses?.map((item: any, index) => {
                              return <>{item}{index < value?.subUses?.length - 1 ? ", " : ""}</>;
                            })}
                          </SubUses>
                        ) : (
                          '--'
                        )}
                      </ContainerRelated>
                    )}
                  </MiddleSideContainer>
                </ResultItem>
              );
            })
          )}
        </>
      </Container>
    </>
  );
};

export default TableResult;
