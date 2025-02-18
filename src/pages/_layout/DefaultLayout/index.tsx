import React, { ReactNode } from 'react';

import NavBar from '../../../components/NavigationBar';
import { Container } from './styled';

interface DefaultLayoutProps {
  children: ReactNode; // Add this to accept children
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <Container>
      <NavBar />
      {children}
    </Container>
  );
};

export default DefaultLayout;
