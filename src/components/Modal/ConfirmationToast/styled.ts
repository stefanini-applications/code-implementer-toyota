import { IoMdClose } from 'react-icons/io';

import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  z-index: 200;
  top: 0;
`;

export const SectionEdit = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  position: relative;
  top: 0;
  left: 0;
  z-index: 100;

  #mydivheader {
    cursor: move;
  }
`;

export const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  background-color: ${props => props.theme.palette.GREYSCALE.GREY};
  box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.17), 0px 2px 4px rgba(0, 0, 0, 0.05);

  border-radius: 0 0 8px 8px;
  border: 1px solid ${props => props.theme.palette.GREYSCALE.GREY};
  font-size: 14px;
  position: sticky;
  top: 0;
`;

export const ContainerClose = styled.div`
  display: flex;
  justify-content: right;
`;

export const TextDelete = styled.p`
  margin-top: 10px;
`;

export const CloseIcon = styled(IoMdClose)`
  cursor: pointer;
  font-size: 20px;
  color: ${props => props.theme.palette.GREYSCALE.GREY_THREE};
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const ItemDelete = styled.p`
  color: ${props => props.theme.palette.PRIMARY.MAIN};
`;

export const ContainerButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
`;
