import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

import { Container, LoadingText } from './styled';


const Loading: React.FC = () => {
  return (
    <Container id="loading-screen">
        <AiOutlineLoading />
        <LoadingText>
            Loading
        </LoadingText>
    </Container>
    );
}

export default Loading;