import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { motion, useDragControls } from 'framer-motion';

import {
  editListingsRequest,
  deleteListingsRequest
} from '../../../store/modules/listings/actions';
import Button from '../../Button';
import Confirmation from '../Confirmation';
import ConfirmationModal from '../ConfirmationModal';
import {
  CloseIcon,
  Container,
  ContainerButtons,
  ContainerClose,
  EditContainer,
  ItemDelete,
  SectionEdit,
  TextDelete
} from './styled';

interface IToastDelete {
  open?: boolean;
  itemToDelete?: any;
  type?: any;
  reference?: any;
  close?: any;
  typeDelete?: any;
}

const ConfirmationToast: React.FC<IToastDelete> = ({
  open,
  itemToDelete,
  type,
  reference,
  close,
  typeDelete
}) => {
  const dispatch = useDispatch();
  const [deleteSubstance, setDeleteSubstance] = React.useState(0);
  const [openDelete, setOpenDelete] = React.useState(false);
  const toyotaRegion = Number(localStorage.getItem('user.toyotaRegion'))

  const dragControls = useDragControls();

  const animationAddContainer = {
    hidden: { top: '-193px', opacity: 0 },
    visible: {
      opacity: 1,
      top: '0px',
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const handleDeleteRelatedSubstance = (
    regulation,
    substance,
    saveChildren
  ) => {
    dispatch(
      deleteListingsRequest({
        listId: regulation,
        type,
        reference: regulation,
        substance: Number(substance),
        saveChildren,
        toyotaRegion
      })
    );
    close();
  };

  const handleDeleteListingsSubstance = (referenceId, saveChildren) => {
    dispatch(
      deleteListingsRequest({
        listId: reference,
        type,
        reference: referenceId,
        substance: 0,
        saveChildren,
        toyotaRegion
      })
    );
    close();
  };

  const handleClose = action => {
    let saveChildren = false;

    if (action === 'yes') {
      saveChildren = true;
    }

    if (type === 'rs') {
      dispatch(
        deleteListingsRequest({
          listId: reference,
          type,
          reference,
          substance: Number(deleteSubstance),
          saveChildren,
          toyotaRegion
        })
      );
    } else {
      dispatch(
        deleteListingsRequest({
          listId: reference,
          type,
          reference: Number(deleteSubstance),
          substance: 0,
          saveChildren,
          toyotaRegion
        })
      );
    }
    setOpenDelete(false);
    document.body.classList.remove("hide-overflow");
    close();
  };

  useEffect(() => {
    if (open) {
      document.body.classList.add("hide-overflow");
    }
  }, [open]);

  return open ? (
    <Container>
      <SectionEdit>
        <motion.div
          style={{
            position: 'fixed',
            display: 'flex'
          }}
          drag
          dragMomentum={false}
          dragControls={dragControls}
          dragListener={false}
          onPointerDown={e => dragControls.start(e)}
          whileDrag={{ cursor: 'move' }}
          className="container"
          variants={animationAddContainer}
          initial="hidden"
          animate="visible"
        >
          <EditContainer>
            <ContainerClose>
              <CloseIcon onClick={close} />
            </ContainerClose>
            <TextDelete>
              {itemToDelete.type === 'Substance'
                ? 'Do you wish to delete this substance?'
                : 'Do you wish to delete this class?'}
            </TextDelete>
            <ItemDelete>{itemToDelete.commonName}</ItemDelete>

            <ContainerButtons>
              <Button
                type="primary"
                onClick={() => {
                  if (typeDelete == 1) {
                    if (itemToDelete.type === 'Substance') {
                      handleDeleteRelatedSubstance(
                        reference,
                        itemToDelete.id,
                        false
                      );
                    } else {
                      setDeleteSubstance(itemToDelete.id);
                      setOpenDelete(true);
                    }
                  } else if (typeDelete == 2) {
                    if (itemToDelete.type === 'Substance') {
                      handleDeleteListingsSubstance(
                        itemToDelete.gadslId,
                        false
                      );
                    } else {
                      setDeleteSubstance(itemToDelete.gadslId);
                      setOpenDelete(true);
                    }
                  } else if (typeDelete == 3) {
                    if (itemToDelete.type === 'Substance') {
                      handleDeleteListingsSubstance(
                        itemToDelete.ynListId,
                        false
                      );
                    } else {
                      setDeleteSubstance(itemToDelete.ynListId);
                      setOpenDelete(true);
                    }
                  }
                }}
                text="Delete"
              />
              <Confirmation
                open={openDelete}
                setOpen={setOpenDelete}
                titleModal="Keep Children"
                bodyText="Do you wish to keep the children?"
                onClose={handleClose}
                okText="Keep Children"
                cancelText="Don't Keep Children"
              />
              <Button onClick={() => { close(); document.body.classList.remove("hide-overflow"); }} text="Cancel" />
            </ContainerButtons>
          </EditContainer>
        </motion.div>
      </SectionEdit>
    </Container>
  ) : null;
};

export default ConfirmationToast;
