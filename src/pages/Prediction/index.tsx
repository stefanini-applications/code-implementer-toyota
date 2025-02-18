import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Empty } from 'antd';

import mlModel from '../../assets/ml-model.png';
import { translate } from '../../locales';
import history from '../../routes/history';
import { getPredictionsBySubstance } from '../../services/api';
import {
  ArrowDown,
  BreadCrumbs,
  BreadCrumbsWrapper,
  Container,
  ContainerDescription,
  ContainerTable,
  CurrentPage,
  HeaderContainer,
  NameRegLeg,
  NicknameRegLeg,
  SubtitleTable,
  TableBody,
  TableHead,
  TableHeadItem,
  TableItem,
  TableList,
  TableRow,
  Title,
  TitleContainer,
  TitleDescription,
  SubTitleDescription,
  TextDescription,
  ListDescription,
  ItemListDescription,
  ImageModel,
  ContainerEmpty
} from './styled';

const Prediction: React.FC = () => {
  const { id, title } = JSON.parse(JSON.stringify(localStorage));
  const [predictionBySub, setPredictionBySub] = useState<any>();
  const currentYear = new Date().getFullYear();
  const titleSpace = title?.split('•').join(' • ');

  useEffect(() => {
    asyncGetPredictionsBySubstance();
  }, []);

  const asyncGetPredictionsBySubstance = async () => {
    if (id) {
      const response = await getPredictionsBySubstance(Number(id));
      setPredictionBySub(response?.data?.message);
    }
  };

  return (
    <Container>
      <TitleContainer>
        <Title>{`Prediction for ${titleSpace}`}</Title>
      </TitleContainer>
      <HeaderContainer>
        <BreadCrumbsWrapper>
          <BreadCrumbs href="/admin">
            {translate('breadcrumbs.admin')}
          </BreadCrumbs>
          <ArrowDown />
          <CurrentPage>
            {`Risk Assessment of ${titleSpace} Prediction`}
          </CurrentPage>
        </BreadCrumbsWrapper>
      </HeaderContainer>

      <SubtitleTable>
        {`The table below predicts the likelihood of ${titleSpace}.`}
      </SubtitleTable>
      <ContainerTable>
        <TableList>
          <TableHead>
            <TableRow>
              <TableHeadItem>Time Period</TableHeadItem>
              <TableHeadItem>Month/Total</TableHeadItem>
              <TableHeadItem>Likelihood</TableHeadItem>
            </TableRow>
          </TableHead>
          <TableBody>
            {predictionBySub?.length > 0 ? (
              predictionBySub.map(pred => (
                <React.Fragment key={pred.year}>
                  <TableRow>
                    <TableItem
                      rowSpan={
                        currentYear == pred.year ? pred.monthly.length : 1
                      }
                    >
                      <NicknameRegLeg>{pred.year}</NicknameRegLeg>
                    </TableItem>
                    {currentYear == pred.year ? (
                      pred.monthly.map(
                        (mon, index) =>
                          index === 0 && (
                            <React.Fragment key={mon.monthName}>
                              <TableItem>{mon.monthName}</TableItem>
                              <TableItem>
                                {(Number(mon.percChance) * 100).toFixed(2)}%
                              </TableItem>
                            </React.Fragment>
                          )
                      )
                    ) : (
                      <React.Fragment key={pred.totalPercChance}>
                        <TableItem>Total</TableItem>
                        <TableItem>
                          {(Number(pred.totalPercChance) * 100).toFixed(2)}%
                        </TableItem>
                      </React.Fragment>
                    )}
                  </TableRow>
                  {currentYear == pred.year &&
                    pred.monthly.map(
                      (mon, index) =>
                        index > 0 && (
                          <TableRow key={mon.monthName}>
                            <TableItem>{mon.monthName}</TableItem>
                            <TableItem>
                              {(Number(mon.percChance) * 100).toFixed(2)}%
                            </TableItem>
                          </TableRow>
                        )
                    )}
                </React.Fragment>
              ))
            ) : (
              <ContainerEmpty>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </ContainerEmpty>
            )}
          </TableBody>
        </TableList>

        <ContainerDescription>
          <TitleDescription>What you need to know</TitleDescription>
          <SubTitleDescription>Accuracy</SubTitleDescription>
          <TextDescription>
            The Machine Learning (ML) model that made these predictions
            currently operates with an accuracy of 40%. This accuracy is
            expected to get better with time.
          </TextDescription>

          <SubTitleDescription>Forecast Reliability</SubTitleDescription>
          <TextDescription>
            The ML model considers multiple factors when making a prediction.
            For exemple, one of these factors is the interest shown in a
            particular substance, on Twitter. For each substance, the interest
            is forecasted and provided as an input to the ML model. As in the
            case of all forecasts (e.g. weather), these forecasts get less
            reliable as we get farther out in time. Using these forecasted
            values as inputs means that a prediction for{' '}
            <strong>
              a later date will always be less reliable than a prediction for an
              earlier date.
            </strong>
          </TextDescription>

          <SubTitleDescription>Current Inputs</SubTitleDescription>
          <TextDescription>
            As mentioned before, the ML model currently uses several inputs. The
            inputs are expected to change, in both number and in type, in the
            future. For now, the inputs are:
          </TextDescription>
          <ListDescription>
            <ItemListDescription>Today&rsquo;s date</ItemListDescription>
            <ItemListDescription>Mentions on Twitter</ItemListDescription>
            <ItemListDescription>Sentiment on Twitter</ItemListDescription>
            <ItemListDescription>Mentions in the news</ItemListDescription>
            <ItemListDescription>Sentiment in the news</ItemListDescription>
          </ListDescription>

          <TextDescription>In the future, we hope to include:</TextDescription>
          <ListDescription>
            <ItemListDescription>Substance Category</ItemListDescription>
            <ItemListDescription>
              Gut feeling based on inside information
            </ItemListDescription>
          </ListDescription>

          <ImageModel src={mlModel} />
        </ContainerDescription>
      </ContainerTable>
    </Container>
  );
};

export default Prediction;
