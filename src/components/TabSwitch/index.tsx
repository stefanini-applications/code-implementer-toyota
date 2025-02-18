/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectors,
  getJurisdictionContentBySubstanceRequest
} from '../../store/modules/substances/actions';
import { Container, TabWithContent, TabWithNoContent } from './styled';

interface ITabs {
  onTabClick?: any;
  value?: any;
  liveIndex?: any;
  substanceId?: any;
  disableTags?: any;
}

const TabSwitch: React.FC<ITabs> = ({
  onTabClick,
  value,
  liveIndex,
  substanceId,
  disableTags = true
}) => {
  const [data] = useState(value);
  const [activeIndex, setActiveIndex] = useState(liveIndex || 0);
  const jurisdictionContentBySubstance = useSelector(
    selectors.jurisdictionContentBySubstance
  );
  const dispatch = useDispatch();

  const handleTabClick = (id: any, index: any) => {
    setActiveIndex(index);
    onTabClick && onTabClick(id, index);
  };

  useEffect(() => {
    if (substanceId) {
      if (disableTags) {
        dispatch(getJurisdictionContentBySubstanceRequest({ substanceId }));
      }
    }
  }, [substanceId]);

  return (
    <Container>
      {data?.map((item: any, index: any) => {
        return disableTags ? (
          item?.hasRecords ? (
            <TabWithContent
              type="button"
              className={`tab ${item.activeIndex ? 'active' : ''}`}
              onClick={() => handleTabClick(item.id, index)}
              key={item.id || index}
            >
              {item.tab}
            </TabWithContent>
          ) : (
            <TabWithNoContent
              type="button"
              className={`tab `}
              key={item.id || index}
            >
              {item.tab}
            </TabWithNoContent>
          )
        ) : (
          <TabWithContent
            type="button"
            className={`tab ${index === activeIndex ? 'active' : ''}`}
            onClick={() => handleTabClick(item.id, index)}
            key={item.id || index}
          >
            {item.tab}
          </TabWithContent>
        );
      })}
    </Container>
  );
};

export default TabSwitch;
