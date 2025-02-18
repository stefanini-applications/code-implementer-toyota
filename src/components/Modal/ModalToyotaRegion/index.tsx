/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Input, Modal, Radio, Space } from 'antd';
import type { RadioChangeEvent } from 'antd';

import regionTabs from '../../../mocks/region-tabs';
import {
  selectors,
  editUserToyotaRegionRequest
} from '../../../store/modules/userPreferences/actions';
import { Container, ContainerRadioGroup, InfoText, RadioRegionName } from './styled';


interface IModalUpdate {
  open?: boolean;
  onCancel?: any;
  onOk?: any;
  modalTitle: any;
  centered?: boolean;
  toyotaRegionId?: any;
}

const ModalToyotaRegion: React.FC<IModalUpdate> = ({
  open,
  toyotaRegionId = '1',
  centered,
  onCancel,
  modalTitle,
  onOk
}) => {
  const [value, setValue] = useState(Number(toyotaRegionId));
  
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const handleOk = () => {
    // setConfirmLoading(true);
    // dispatch(editUserToyotaRegionRequest(value.toString()))
    onOk(value.toString())
    onCancel();

    // setTimeout(() => {
    //   onCancel();
    //   setConfirmLoading(false);
    // }, 2000);
  };

  return (
    <Modal
      centered={centered}
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      title={modalTitle}
      okText="Change Region"
      // confirmLoading={confirmLoading}
      cancelText="Cancel"
      width={600}
    >
      <Container>
        <InfoText>
          Your selection will determine which region&apos;s information is accessed when creating, viewing or editing Impact Assessments using the buttons in the Related Substances table.
        </InfoText>
        <ContainerRadioGroup>
          <Radio.Group onChange={onChange} value={value}>
            <Space direction="horizontal">
              {regionTabs.map((tab) => {
                return (
                  <Radio value={tab.id}><RadioRegionName>{tab.tab === "SE ASIA" ? "SE Asia" : tab.tab.toLowerCase()}</RadioRegionName></Radio>
                )
              })}

            </Space>
          </Radio.Group>
        </ContainerRadioGroup>

      </Container>
    </Modal>
  )
};

export default ModalToyotaRegion;
