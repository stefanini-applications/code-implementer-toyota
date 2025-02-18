import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { translate } from '../../../locales';
import Button from '../../Button';
import {
  Container,
  Content,
  HeaderContainer,
  BreadCrumbsWrapper,
  BreadCrumbs,
  CurrentPage,
  ArrowDown,
  MainSection,
  ContentWrapper,
  Wrapper,
  Label,
  ButtonsContainer,
  Overlay,
  UpdateModal,
  TitleModal,
  XIcon,
  JurisdictionSection
} from './styled';

interface IModalUpdate {
  open?: boolean;
  title?: any;
  body?: any;
  handleClose?: any;
  containerClass?: any;
}

const ConfirmationModal: React.FC<IModalUpdate> = ({
  open,
  title,
  body,
  handleClose,
  containerClass
}) => {
  useEffect(() => {
    if (open) {
      document.body.classList.add("hide-overflow");
    }
  }, [open]);

  return open ? (
    <Container className="containerClass">
      <UpdateModal>
        <TitleModal>
          <p>{title}</p>
          <XIcon
            onClick={() => {
              handleClose('cancel');
              document.body.classList.remove("hide-overflow");
            }}
          />
        </TitleModal>
        <HeaderContainer>
          <BreadCrumbsWrapper>
            <CurrentPage>Edit Regulation</CurrentPage>
          </BreadCrumbsWrapper>
        </HeaderContainer>
        <Content>
          <MainSection>
            <Wrapper>{body}</Wrapper>
          </MainSection>
        </Content>
        <ButtonsContainer>
          <Button
            text="No"
            onClick={() => {
              handleClose('no');
              document.body.classList.remove("hide-overflow");
            }}
          />
          <Button
            type="primary"
            text="Yes"
            onClick={() => { handleClose('yes'); document.body.classList.remove("hide-overflow"); }}
          />
        </ButtonsContainer>
      </UpdateModal>
      <Overlay />
    </Container>
  ) : null;
};

export default ConfirmationModal;
