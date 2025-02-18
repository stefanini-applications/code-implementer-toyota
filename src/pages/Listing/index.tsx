import React from 'react';

import ListingLists from '../../components/ListingLists';
import { Container, Title, TitleContainer } from './styled';

const Listing: React.FC = () => {
  return (
    <Container>
      <TitleContainer>
        <Title>Listing</Title>
      </TitleContainer>
      <ListingLists />
    </Container>
  );
};

export default Listing;
