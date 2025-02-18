import React from 'react';

import {
  Container,
  PaginationInfo,
  WrapperRow,
  Touchable,
  PaginationGoBack,
  PaginationGoFoward
} from './styled';

interface IPaginationSystem {
  firstRecordIndex?: any;
  lastRecordIndex?: any;
  totalResults?: any;
  onClickPagination: (pageAction: any) => any;
}

const PaginationSystem: React.FC<IPaginationSystem> = ({
  firstRecordIndex,
  lastRecordIndex,
  totalResults,
  onClickPagination
}) => {
  return (
    <Container>
      <PaginationInfo>
        {firstRecordIndex || 0}-{lastRecordIndex || 0} from {totalResults || 0}
      </PaginationInfo>
      <WrapperRow>
        <Touchable onClick={() => onClickPagination('previous')}>
          <PaginationGoBack />
        </Touchable>
        <Touchable onClick={() => onClickPagination('next')}>
          <PaginationGoFoward />
        </Touchable>
      </WrapperRow>
    </Container>
  );
};

export default PaginationSystem;
