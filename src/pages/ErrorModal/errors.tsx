/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

import { Tooltip } from 'antd';

import {
  ContainerError,
  Content,
  UpdateModal,
  TitleModal,
  CloseIcon,
  Items,
  Scroll,
  ItemsWrap,
  Overlay,
  ContentNote,
  SheetName
} from './styled';

interface IListingsError {
  errorList?: any;
  close?: any;
  listingPage?: boolean;
}

const sheets = [{
  name: 'Edit Phase',
  correctName: 'Edit Phase'
}, {
  name: 'Article',
  correctName: 'Articles (Parts Or Vehicle)'
},{
  name: 'Direct',
  correctName: 'Operations - Direct'
},{
  name: 'Indirect',
  correctName: 'Operations - Indirect'
},{
  name: 'Service',
  correctName: 'Service Products'
}]

const ListingsError: React.FC<IListingsError> = ({
  errorList,
  close,
  listingPage
}) => {
  const heading = 'Some Impact Assessment information failed to upload due to invalid values'
  return (
    <ContainerError>
      <UpdateModal>
        <TitleModal>
          <p>{heading}</p>
          <CloseIcon onClick={close} />
        </TitleModal>
          <ContentNote>
            <p>Please correct the invalid values below and upload again</p>
            <p><b>Note:</b> If an invalid value was found for a substance in one Application Area sheet, values for that substance from the other Application Area sheets will not be uploaded, either.</p>
          </ContentNote>
        <Scroll>
          <Content>
            {
              sheets.map(sheet => {
                const filteredErrorList = errorList?.filter(x=> x.sheetName === sheet.name)
                if (filteredErrorList.length === 0) return null
                return (<>
                  <SheetName>
                    {sheet.correctName}
                  </SheetName>
                  {filteredErrorList?.map(error => (
                    <ItemsWrap key={error.sheetName + error.cell}>
                        <p>In cell <b>{error.cell}</b> for {error.name},</p>
                        <p>{error.message}</p>
                    </ItemsWrap>
                  ))}
                </>)
              })
            }
          </Content>
        </Scroll>
      </UpdateModal>
      <Overlay />
    </ContainerError>
  );
};

export default ListingsError;
