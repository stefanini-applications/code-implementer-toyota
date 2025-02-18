/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect } from 'react';
import CacheBuster from 'react-cache-buster';
import { Provider } from 'react-redux';
import { datadogRum } from '@datadog/browser-rum';
import { PersistGate } from 'redux-persist/integration/react';

import packageJson from '../package.json';
import { persistor, store } from './store';
import Wrapper from './Wrapper';

import {getEnv} from './utils/env-util'

let applicationId = process.env.REACT_APP_LOCAL_DATADOG_APP_ID;
let clientToken = process.env.REACT_APP_LOCAL_DATADOG_APP_TNK;
let service = 'griipslocal';
let env = 'local';

switch (getEnv()) {
  case 'development':
    applicationId = process.env.REACT_APP_DEV_DATADOG_APP_ID;
    clientToken = process.env.REACT_APP_DEV_DATADOG_APP_TNK;
    service = 'griipsdev';
    env = 'dev';
    break;
  case 'qa':
    applicationId = process.env.REACT_APP_QA_DATADOG_APP_ID;
    clientToken = process.env.REACT_APP_QA_DATADOG_APP_TNK;
    service = 'griipsqa';
    env = 'qa';
    break;
  case 'production':
    applicationId = process.env.REACT_APP_PROD_DATADOG_APP_ID;
    clientToken = process.env.REACT_APP_PROD_DATADOG_APP_TNK;
    service = 'griips';
    env = 'prod';
    break;
  default:
    break;
}

const intervalId = setInterval(() => {
  console.log('init datadog interval')
  const msalUserName = localStorage.getItem('msal.userName');
  const msalUserEmail = localStorage.getItem('msal.userEmail');
  if (msalUserName && msalUserEmail) {
    console.log('init datadog email and user found')
    clearInterval(intervalId); // Stop polling
    datadogRum.init({
      applicationId: applicationId!,
      clientToken: clientToken!,
      site: 'datadoghq.com',
      service,
      env,
      version: '3.0.0', 
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: 'allow',
      startSessionReplayRecordingManually: true,
    });
    datadogRum.setUser({
        id: msalUserEmail,
        name: msalUserName,
        email: msalUserEmail,
    })
    datadogRum.startSessionReplayRecording();
  }
}, 1000); // Check every 1000 milliseconds (1 second)


const App: React.FC = () => {
  const isProduction = process.env.NODE_ENV === 'production';

  useEffect(() => {
    window.addEventListener('error', e => {
      if (e.message === 'ResizeObserver loop limit exceeded' || e.message === 'ResizeObserver loop completed with undelivered notifications.') {
        const resizeObserverErrDiv = document.getElementById(
          'webpack-dev-server-client-overlay-div'
        );
        const resizeObserverErr = document.getElementById(
          'webpack-dev-server-client-overlay'
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute('style', 'display: none');
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute('style', 'display: none');
        }
      }
    });
  }, []);
  return (
    <CacheBuster
      currentVersion={packageJson.version}
      isEnabled={isProduction}
      isVerboseMode={false}
    >
      <Provider store={store}>
        {/* @ts-ignore */}
        <PersistGate persistor={persistor}>
          <Wrapper />
        </PersistGate>
      </Provider>
    </CacheBuster>
  );
};

export default App;
