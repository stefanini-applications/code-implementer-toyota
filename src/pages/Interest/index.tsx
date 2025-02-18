import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { models } from 'powerbi-client';
import * as pbi from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';

import { getPowerBiTokenRequest, selectors } from '../../store/modules/powerbitoken/actions';
import {
  Container
} from './styled';

const Interest: React.FC = () => {
  const tokenResponse = useSelector(selectors.powerbitoken);
  const dispatch = useDispatch();
  const path = window.location.pathname;
  const casNumber = path.substring(path.lastIndexOf('/') + 1);
  
  useEffect(() => {
    dispatch(getPowerBiTokenRequest());
  }, [dispatch]);

  useEffect(() => {
    if (tokenResponse) {
      setTimeout(function() {
        const reportId = '0b045438-047d-4d3c-8a5b-be4e1a44fa66';
        const tenantId = '78f997db-be4e-44b8-b629-2219e941dcce';
        const datasetName = 'Tweet & News';
        const schema = "http://powerbi.com/product/schema#basic";
        const txtEmbedUrl = `https://app.powerbi.com/reportEmbed?reportId=${reportId}&ctid=${tenantId}`;
        const embedToken = tokenResponse.token
        const filter: pbi.models.IAdvancedFilter = {
          $schema: schema,
          target: {
              table: datasetName,
              column: "casrn"
          },
          logicalOperator: "And",
          conditions: [
              {
                  operator: "Contains",
                  value: casNumber
              },
              {
                  operator: "None",
                  value: "x"
              }
          ],
          filterType: 0,
          displaySettings: {
              isLockedInViewMode: true
          }
        };
        const config: pbi.IEmbedConfiguration = {
          type: 'report',
          tokenType: pbi.models.TokenType.Embed,
          accessToken: embedToken,
          filters: [filter],
          embedUrl: txtEmbedUrl,
          id: reportId,
          permissions: pbi.models.Permissions.Read,
          settings: {
              filterPaneEnabled: false,
              navContentPaneEnabled: false
          }
        }
        
        const embedContainer = document.getElementById('embedContainer')!;
        const service = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
        if(embedContainer) {
          const report = service.embed(embedContainer, config);
        }
      }, 2000);
    }
    
  }, [tokenResponse]);  

  return (
    <Container id="embedContainer">
      {/* <PowerBIEmbed
        embedConfig = {embedConfiguration}
      /> */}
    </Container>
  );
};


export default Interest;
