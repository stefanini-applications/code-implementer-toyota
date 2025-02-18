/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';

import defaultListsData from '../../mocks/listings-mock';
import Link from '../Link';
import {
  Container,
  SectionJurisdiction,
  ContainerJurisdiction,
  TitleJurisdiction,
  List,
  ContainerList,
  JurisdictionsContainer,
} from './styled';

export interface IListingLists {
  listData?: any;
}
const ListingLists: React.FC<IListingLists> = ({ listData }) => {
  const [listsData, setListsData] = useState<any>([]);
  useEffect(() => {
    if (listData) {
      setListsData(listData);
    } else {
      setListsData(defaultListsData);
    }
  }, [listData]);

  return listsData.length > 0 ? (
    <Container>
      <JurisdictionsContainer>
        {listsData.map(data => {
          return (
            <SectionJurisdiction key={data.name}>
              <ContainerJurisdiction>
                <TitleJurisdiction>{data.name}</TitleJurisdiction>
                <ContainerList>
                  {data.lists.map(list => {
                    return (
                      <List key={list.name}>
                        <Link
                          href={`/viewListing/${list.id}/${list.template}`}
                        >
                          {list.name}
                        </Link>
                      </List>
                    );
                  })}
                </ContainerList>
              </ContainerJurisdiction>
            </SectionJurisdiction>
          );
        })}
      </JurisdictionsContainer>
    </Container>
  ) : null;
};

export default ListingLists;
