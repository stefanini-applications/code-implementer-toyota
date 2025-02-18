/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Tag } from 'antd';
import { cloneDeep } from 'lodash';
import { ThemeContext } from "styled-components";

import {
  selectors as selector,
  updatesRegulationRequest,
  updatesSubstanceRequest
} from '../../store/modules/homePage/actions';
import {
  selectors,
  getJurisdictionContentBySubstanceRequest
} from '../../store/modules/substances/actions';
import { Container, CheckableTagWrapper } from './styled';

const { CheckableTag } = Tag;

interface ITabs {
  onTabClick?: any;
  value?: any;
  liveIndex?: any;
  substanceId?: any;
  disableTags?: any;
  selectedTabs?: any;
  userPreferences?: any;
  hasTagConnection?: boolean;
  useDesc?: boolean;
  tabsWithContent?: any;
}

const ChildTags: React.FC<ITabs> = ({
  onTabClick,
  value,
  liveIndex,
  disableTags = true,
  selectedTabs,
  tabsWithContent,
  hasTagConnection,
  substanceId,
  userPreferences,
  useDesc
}) => {
  const themeContext = useContext(ThemeContext);
  const [data] = useState(value);
  const [isDataFilled, setIsDataFilled] = useState(false);

  const handleTabClick = (index: any) => {
    data[index].activeIndex = !data[index].activeIndex;
    onTabClick && onTabClick(data.filter(x => x.activeIndex));
  };

  useEffect(() => {
    data.forEach(element => {
      element.activeIndex = false;
    });
  }, []);

  useEffect(() => {
    if (data && selectedTabs && !isDataFilled) {
      data.map(x => {
        if (selectedTabs.find(y => Number(y.id) === x.id)) {
          x.activeIndex = true;
        }

        return x;
      });
      setIsDataFilled(true);
    }
  }, [selectedTabs]);

  return (
    <Container>
      {data?.map((item: any, index: any) => (
        <CheckableTagWrapper
          key={item.tab}
          onMouseEnter={(e) => {
            if (
              (disableTags && item?.hasRecords) ||
              !disableTags
            ) {
              data?.map(x => {
                if (x.tab === item.tab) {
                  x.color = 'unset';
                }
                return x;
              })
            }
          }}
          onMouseLeave={(e) => {
            if (
              (disableTags && item?.hasRecords) ||
              !disableTags
            ) {
              data?.map(x => {
                if (x.tab === item.tab) {
                  x.color = undefined;
                }
                return x;
              })
            }
          }}
        >
          <CheckableTag
            key={item.tab}
            checked={item?.activeIndex || false}
            onChange={(checked) => {
              if (
                (disableTags && item?.hasRecords) ||
                !disableTags
              ) {
                handleTabClick(index);
              }
            }}
            style={{
              backgroundColor:
                (disableTags && item?.hasRecords && item?.activeIndex) ||
                  (!disableTags && item?.activeIndex) ?
                  undefined :
                  (disableTags && item?.hasRecords) ?
                    undefined :
                    themeContext.palette.BACKGROUND.PROFILE,
              fontSize: '14px',
              fontFamily: `'Roboto', sans-serif`,
              fontWeight: 700,
              cursor: (disableTags && item?.hasRecords) ? 'pointer' : 'default',
              color:
                (disableTags && item?.hasRecords && item?.activeIndex) ||
                  (!disableTags && (
                    item?.color === 'unset' ||
                    item?.activeIndex
                  )) ?
                  undefined :
                  (disableTags && item?.hasRecords) ?
                    themeContext.palette.PRIMARY.MAIN :
                    themeContext.palette.GREYSCALE.GREY_THREE,
              border:
                (disableTags && item?.hasRecords) ?
                  `1px solid ${themeContext.palette.PRIMARY.MAIN}` : undefined
            }}
          >
            {item.tab}
          </CheckableTag>
        </CheckableTagWrapper>
      ))}
    </Container>
  );
};

const ParentTags: React.FC<ITabs> = ({
  onTabClick,
  value,
  liveIndex,
  substanceId,
  disableTags = true,
  selectedTabs,
  userPreferences,
  tabsWithContent,
  hasTagConnection,
  useDesc,
}) => {
  const themeContext = useContext(ThemeContext);
  const [data, setData] = useState(value);
  const jurisdictionContentBySubstance = useSelector(
    selectors.jurisdictionContentBySubstance
  );
  const dispatch = useDispatch();

  const handleTabClick = (index: any) => {
    const dataCopy = cloneDeep(data);
    dataCopy[index].activeIndex = !dataCopy[index]?.activeIndex;
    onTabClick && onTabClick(dataCopy.filter(x => x.activeIndex));
  };

  useEffect(() => {
    data?.forEach(element => {
      element.activeIndex = false;
    });
  }, []);

  useEffect(() => {
    if (disableTags && substanceId) {
      dispatch(getJurisdictionContentBySubstanceRequest({ substanceId }));
    }
  }, [dispatch, substanceId, disableTags]);

  useEffect(() => {
    if (data && selectedTabs) {
      const dataCopy = cloneDeep(data);
      dataCopy.map(x => {
        if (selectedTabs.find(y => Number(y.id) === x.id)) {
          x.activeIndex = true;
        } else {
          x.activeIndex = false;
        }

        return x;
      });
      setData(dataCopy);
    }
  }, [selectedTabs]);

  useEffect(() => {
    if (data && userPreferences) {
      const dataCopy = cloneDeep(data);
      dataCopy.map(x => {
        if (userPreferences.find(y => Number(y.id) === x.id)) {
          x.activeIndex = true;
        } else {
          x.activeIndex = false;
        }

        return x;
      });
      setData(dataCopy);
    }
  }, []);

  return (
    <Container>
      {data?.map((item: any, index: any) => (
        <CheckableTagWrapper
          key={item.tab}
          onMouseEnter={(e) => {
            if (
              (item?.alwaysHasRecords) ||
              (disableTags
                && jurisdictionContentBySubstance
                && jurisdictionContentBySubstance[item?.id - 1]?.hasRecords) ||
              (disableTags && item?.hasRecords) ||
              !disableTags
            ) {
              const dataDup = cloneDeep(data?.map(x => {
                if (x.tab === item.tab) {
                  x.color = 'unset';
                }
                return x;
              }));
              setData(dataDup);
            }
          }}
          onMouseLeave={(e) => {
            if (
              (item?.alwaysHasRecords) ||
              (disableTags
                && jurisdictionContentBySubstance
                && jurisdictionContentBySubstance[item?.id - 1]?.hasRecords) ||
              !disableTags
            ) {
              const dataDup = cloneDeep(data?.map(x => {
                if (x.tab === item.tab) {
                  x.color = undefined;
                }
                return x;
              }));
              setData(dataDup);
            }
          }}
        >
          <CheckableTag
            key={item.tab}
            checked={item?.activeIndex || false}
            onChange={(checked) => {
              if (
                (item?.alwaysHasRecords) ||
                (disableTags
                  && jurisdictionContentBySubstance
                  && jurisdictionContentBySubstance[item?.id - 1]?.hasRecords) ||
                !disableTags
              ) {
                handleTabClick(index);
              }
            }}
            style={{
              backgroundColor:
                (item?.alwaysHasRecords && item?.activeIndex) ||
                (disableTags
                  && jurisdictionContentBySubstance
                  && jurisdictionContentBySubstance[item?.id - 1]?.hasRecords
                  && item?.activeIndex) ||
                  (!disableTags && item?.activeIndex) ?
                  undefined :
                  (item?.alwaysHasRecords) ||
                  (disableTags
                    && jurisdictionContentBySubstance
                    && jurisdictionContentBySubstance[item?.id - 1]?.hasRecords || data[0].tab === "ARTICLES") || tabsWithContent?.includes(item.id) ?
                    undefined :
                    themeContext.palette.BACKGROUND.PROFILE,
              fontSize: '14px',
              fontFamily: `'Roboto', sans-serif`,
              fontWeight: 700,
              pointerEvents: (disableTags
                && jurisdictionContentBySubstance
                && jurisdictionContentBySubstance[item?.id - 1]?.hasRecords || data[0].tab === "ARTICLES") || tabsWithContent?.includes(item.id) ? 'auto' : 'none',
              cursor: (disableTags
                && jurisdictionContentBySubstance
                && jurisdictionContentBySubstance[item?.id - 1]?.hasRecords || data[0].tab === "ARTICLES") || tabsWithContent?.includes(item.id) ? 'pointer' : 'default',
              color:
                (item?.alwaysHasRecords && item?.activeIndex) ||
                (disableTags
                  && jurisdictionContentBySubstance
                  && jurisdictionContentBySubstance[item?.id - 1]?.hasRecords
                  && item?.activeIndex) ||
                  (!disableTags && (
                    item?.activeIndex
                  )) ?
                  undefined :
                  (item?.alwaysHasRecords) ||
                  (disableTags
                    && jurisdictionContentBySubstance
                    && jurisdictionContentBySubstance[item?.id - 1]?.hasRecords || data[0].tab === "ARTICLES") || tabsWithContent?.includes(item.id) ?
                    themeContext.palette.PRIMARY.MAIN :
                    themeContext.palette.GREYSCALE.GREY_THREE,
              border:
                (item?.alwaysHasRecords) ||
                (disableTags
                  && jurisdictionContentBySubstance
                  && jurisdictionContentBySubstance[item?.id - 1]?.hasRecords || data[0].tab === "ARTICLES") || tabsWithContent?.includes(item.id) ?
                  `1px solid ${themeContext.palette.PRIMARY.MAIN}` : undefined
            }}
          >
            {useDesc ? item.description : item.tab}
          </CheckableTag>
        </CheckableTagWrapper>
      ))}
    </Container>
  );
};

const Tags: React.FC<ITabs> = ({
  onTabClick,
  value,
  liveIndex,
  substanceId,
  disableTags = true,
  selectedTabs,
  userPreferences,
  hasTagConnection,
  tabsWithContent,
  useDesc,
}) => {
  return (
    <>
      {hasTagConnection ?
        <ChildTags
          onTabClick={onTabClick}
          value={value}
          liveIndex={liveIndex}
          disableTags={disableTags}
          selectedTabs={selectedTabs}
          useDesc={useDesc}
        /> :
        <ParentTags
          onTabClick={onTabClick}
          value={value}
          liveIndex={liveIndex}
          disableTags={disableTags}
          tabsWithContent={tabsWithContent}
          selectedTabs={selectedTabs}
          substanceId={substanceId}
          userPreferences={userPreferences}
          useDesc={useDesc}
        />}
    </>
  );
}
export default Tags;
