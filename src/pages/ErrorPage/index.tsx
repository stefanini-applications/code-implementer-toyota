import React from 'react';

import Button from '../../components/Button';
import { Container, ContainerButtons, ContentContainer, DescriptionError, TitleError, WarnIcon } from './styled';

const ErrorPage: React.FC = () => {
  return (
    <Container>
      <ContentContainer>
        <TitleError><WarnIcon />Sorry, something went wrong</TitleError>
        <DescriptionError>Support will need to investigate to determine the exact cause.</DescriptionError>

        <ContainerButtons>
          <Button onClick={() => { history.back() }} type="primary" text='Go back to previous page' />
          <a href='https://tmna.service-now.com/1ts?id=1ts_cat_item&sys_id=bb6ff2551ba4081000802f876e4bcb65'>Contact support (using 1TS)</a>
        </ContainerButtons>
      </ContentContainer>
    </Container>
  );
};

export default ErrorPage;