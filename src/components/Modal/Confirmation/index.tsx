import React, { useEffect } from 'react';

import { Modal } from 'antd';

interface IConfirmation {
  titleModal?: string;
  bodyText?: string;
  open?: boolean;
  setOpen?: any;
  onClose?: any;
  okText?: string;
  cancelText?: string;
  centered?: any;
}

const App: React.FC<IConfirmation> = ({
  titleModal,
  bodyText,
  open,
  setOpen,
  onClose,
  okText,
  cancelText,
  centered
}) => {
  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    onClose('yes');
    setOpen(false);
    document.body.classList.remove("hide-overflow");
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    onClose('no');
    setOpen(false);
    document.body.classList.remove("hide-overflow");
  };

  useEffect(() => {
    if (open) {
      document.body.classList.add("hide-overflow");
    }
  }, [open]);

  return (
    <Modal
      title={titleModal}
      open={open}
      onOk={handleOk}
      centered={centered}
      onCancel={handleCancel}
      okButtonProps={{ danger: true }}
      cancelButtonProps={{ disabled: false }}
      okText={okText || 'Confirm'}
      cancelText={cancelText || 'Cancel'}
    >
      <p>{bodyText}</p>
    </Modal>
  );
};

export default App;
