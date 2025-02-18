import React from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';

import { ContainerIconScroll, ContainerNameScroll, Container } from './styled';

interface Props {
  notifyScroll?: () => void;
}

const ScrollTopButton: React.FC<Props> = ({
  notifyScroll
}) => {
  const scrollButton = document.getElementById('scrollButton');

  window.onscroll = function () {
    scrollFunction();
    if (notifyScroll) {
      notifyScroll();
    }
  };

  const scrollFunction = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      if (scrollButton) {
        scrollButton!.style.display = 'flex';
      }
    } else if (scrollButton) {
      scrollButton!.style.display = 'none';
    }
  };

  const topFunction = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container id="scrollButton" onClick={() => topFunction()}>
      <ContainerNameScroll>Go to top</ContainerNameScroll>
      <ContainerIconScroll>
        <AiOutlineArrowUp />
      </ContainerIconScroll>
    </Container>
  );
};

export default ScrollTopButton;
