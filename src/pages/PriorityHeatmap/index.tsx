import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as pbi from 'powerbi-client';
import {
  getHeatMapTokenRequest,
  selectors as heatmapselector
} from '../../store/modules/powerbitoken/actions';
import { getEnv } from '../../utils/env-util';
import { Heatmap } from '../Main/styled';
import { ContainerHeatmap, TitleContainer, Title } from './styled';

const PriorityHeatmap = () => {
  const heatMapToken: any = useSelector(heatmapselector.heatmapToken);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHeatMapTokenRequest());
  }, [dispatch]);
  useEffect(() => {
    if (heatMapToken) {
      setTimeout(function () {
        let reportId = process.env.REACT_APP_HEATMAP_REPORT_ID;
        let tenantId = process.env.REACT_APP_HEATMAP_WORKSPACE_ID;
        switch (getEnv()) {
          case 'local':
            reportId = process.env.REACT_APP_DEV_HEATMAP_REPORT_ID;
            tenantId = process.env.REACT_APP_DEV_HEATMAP_WORKSPACE_ID;
            break;
          case 'development':
            reportId = process.env.REACT_APP_DEV_HEATMAP_REPORT_ID;
            tenantId = process.env.REACT_APP_DEV_HEATMAP_WORKSPACE_ID;
            break;
          case 'qa':
            reportId = process.env.REACT_APP_QA_HEATMAP_REPORT_ID;
            tenantId = process.env.REACT_APP_QA_HEATMAP_WORKSPACE_ID;
            break;
          case 'production':
            reportId = process.env.REACT_APP_PROD_HEATMAP_REPORT_ID;
            tenantId = process.env.REACT_APP_PROD_HEATMAP_WORKSPACE_ID;
            break;
          default:
            break;
        }
        const txtEmbedUrl = `https://app.powerbi.com/reportEmbed?reportId=${reportId}&ctid=${tenantId}`;
        const embedToken = heatMapToken.token;
        const config: pbi.IEmbedConfiguration = {
          type: 'report',
          tokenType: pbi.models.TokenType.Embed,
          accessToken: embedToken,
          embedUrl: txtEmbedUrl,
          id: reportId,
          permissions: pbi.models.Permissions.Read,
          settings: {
            filterPaneEnabled: false,
            navContentPaneEnabled: false
          }
        };

        const embedContainer = document.getElementById('embedContainer')!;
        const service = new pbi.service.Service(
          pbi.factories.hpmFactory,
          pbi.factories.wpmpFactory,
          pbi.factories.routerFactory
        );
        if (embedContainer) {
          const report = service.embed(embedContainer, config);
        }
      }, 2000);
    }
  }, [heatMapToken]);
  return (
    <ContainerHeatmap>
      <TitleContainer>
        <Title>Priority Heatmap</Title>
      </TitleContainer>
      <Heatmap id="embedContainer" />
    </ContainerHeatmap>
  );
};

export default PriorityHeatmap;
