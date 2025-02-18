import React from 'react';
import { notification } from 'antd';

import styled from 'styled-components';

const ToastFont = styled('div').attrs(props => ({
  ...props,
  style: {
    fontFamily: 'Roboto, Sans Serif',
    fontSize: 16
  }
}))``;

const ContextApi = React.createContext<any>(null);
let apiapi:any = null;

export const Toast: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  return (
    <ContextApi.Provider value={api}>
      {contextHolder}
      <ContextApi.Consumer>
        {appContext => {
            apiapi = appContext;
            return null;
          }
        }
      </ContextApi.Consumer>
    </ContextApi.Provider>
  );
};

export async function ToastSuccess(content: any) {
  // display only for 5 seconds
  apiapi['success']({
    message:
      <ToastFont>
        {content}
      </ToastFont>,
    duration: 5,
    placement: 'top'
  });
}

export const ToastError = (content: any) => {
  // no progress bar
  apiapi['error']({
    message:
      <ToastFont>
        {content}
      </ToastFont>,
    duration: 0,
    placement: 'top'
  });
}


export async function ToastInfo(title: any, content: any) {
  apiapi['info']({
    message: title,
    description: content,
    duration: 0,
    placement: 'top'
  });
}