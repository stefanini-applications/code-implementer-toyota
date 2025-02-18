import React, { useEffect } from 'react';
import { ErrorBoundary } from "react-error-boundary";
import { Router } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import { ConfigProvider } from 'antd';

import Loading from './components/Loading';
import { Toast } from './components/Toast';
import Languages from './locales';
import Routes from './routes';
import history from './routes/history';
import GlobalStyle from './styles/global';
import light from './themes/light';
import {getEnv} from './utils/env-util'

const env = getEnv()

const Wrapper: React.FC = () => {
  const fallBackRender = () => {
    if (env !== 'local'){
      window.open('/error', '_self');
    }
  }

  function ScrollToTopOnMount() {
    useEffect(() => {
        const unlisten = history.listen(() => {
            window.scrollTo(0, 0);
        });
        return () => {
            unlisten();
        };
    }, [history]);

    return null;
}

  return (
    <ThemeProvider theme={light}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: light.palette.PRIMARY.MAIN,
            colorBgMask: "#00000026"
          },
        }}
      >
        <Router history={history}>
          <Toast />
          <Loading />
          <Languages />
          <ErrorBoundary fallback={<div />} onError={fallBackRender}>
            <ScrollToTopOnMount />
            <Routes />
          </ErrorBoundary >
          <GlobalStyle />
        </Router>
      </ConfigProvider>
    </ThemeProvider>

  );
};

export default Wrapper;
