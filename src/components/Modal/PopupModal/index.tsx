import React from 'react';
import { Button, Modal } from 'antd';

interface PopupModalProps {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  handleOk?: () => void;
  handleCancel?: () => void;
  width?: number;
  footer?: boolean;
  okBtnText?: string;
  zIndex?: number;
}

const PopupModal: React.FC<PopupModalProps> = ({ open, title, children, handleOk, handleCancel, okBtnText = 'OK', width = 1000, footer=false, zIndex }) => {
  return (
    <Modal
      open={open}
      title={title}
      onOk={handleOk}
      onCancel={handleCancel}
      width={width}
      zIndex={zIndex}
      footer={footer && (
        [
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            {okBtnText}
          </Button>,
        ]
      )}
    >
      {children}
    </Modal>
  )
}

export default PopupModal;