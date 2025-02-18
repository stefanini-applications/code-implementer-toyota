import React from 'react';

import TableDropdown from '../../TableDropdown';
import {
  Container,
  Content,
  TitleContainer,
  Title,
  Footer,
  ButtonsGroup,
  Save,
  Cancel,
  Overlay,
  TextArea,
  ImpactAssessmentTable,
  TopSideTable,
  TopTitleRowColumn,
  TopSubColumnOne,
  TopSubColumnTwo,
  TopSubColumnThree,
  TopSubColumnFour,
  TopSubOneCelOne,
  TopSubOneCelTwo,
  TopSubOneCelThree,
  TopSubOneCelFour,
  TopSubTwoCelOne,
  TopSubThreeCelOne,
  TopSubThreeCelTwo,
  TopSubThreeCelThree,
  TopSubThreeCelFour,
  TopSubFourCelOne,
  TopSubFourCelTwo,
  TopSubFourCelThree,
  TopSubFourCelFour,
  BottomSideTable,
  BottomTitleColumnOne,
  BottomTitleColumnTwo,
  BottomSubColumnOne,
  BottomSubColumnTwo,
  BottomSubColumnThree,
  BottomSubColumnFour,
  BottomSubColumnFive,
  BottomSubColumnSix,
  BottomSubColumnSeven,
  BottomSubOneCelOne,
  BottomSubOneCelTwo,
  BottomSubOneCelThree,
  BottomSubOneCelFour,
  BottomSubTwoCelOne,
  BottomSubThreeCelOne,
  BottomSubThreeCelTwo,
  BottomSubThreeCelThree,
  BottomSubThreeCelFour,
  BottomSubFourCelOne,
  BottomSubFourCelTwo,
  BottomSubFourCelThree,
  BottomSubFourCelFour,
  BottomSubFiveCelOne,
  BottomSubFiveCelTwo,
  BottomSubFiveCelThree,
  BottomSubFiveCelFour,
  BottomSubSixCelOne,
  BottomSubSixCelTwo,
  BottomSubSixCelThree,
  BottomSubSixCelFour,
  BottomSubSevenCelOne,
  BottomSubSevenCelTwo,
  BottomSubSevenCelThree,
  BottomSubSevenCelFour
} from './styled';

interface IModalContainer {
  open: boolean;
  close?: any;
  save?: any;
}

const ModalContainer: React.FC<IModalContainer> = ({
  open,
  close,
  save,
  ...rest
}) => {
  const opt = [
    {
      id: 1,
      number: 0
    },
    {
      id: 2,
      number: 1
    },
    {
      id: 3,
      number: 2
    },
    {
      id: 4,
      number: 3
    },
    {
      id: 5,
      number: 4
    }
  ];
  return open ? (
    <Container {...rest}>
      <Content>
        <TitleContainer>
          <Title>Impact Assessment</Title>
        </TitleContainer>
        {/* <Wrapper>
          <Label>Jurisdiction:</Label>
          <Input
            type="select"
            options={data}
            appearence="name"
            send="id"
            placeholder="Selecione"
          />
          <Label>Regulatory Framework:</Label>
          <Input
            type="select"
            options={data}
            appearence="name"
            send="id"
            placeholder="Selecione"
          />
        </Wrapper> */}
        <ImpactAssessmentTable>
          <TopSideTable>
            <TopTitleRowColumn>Regulatory Scope</TopTitleRowColumn>

            <TopSubColumnOne>Application Area</TopSubColumnOne>
            <TopSubColumnTwo className="t1-phase">Phase (A)</TopSubColumnTwo>
            <TopSubColumnThree className="t1-scope-comments">
              Target Use / Scope Comments
            </TopSubColumnThree>
            <TopSubColumnFour>Level of Restriction (B)</TopSubColumnFour>

            <TopSubOneCelOne>Articles (Parts / Vehicle)</TopSubOneCelOne>
            <TopSubThreeCelOne className="t1-scope-comments">
              <TextArea />
            </TopSubThreeCelOne>
            <TopSubFourCelOne>
              <TableDropdown options={opt} appearence="number" send="id" />
            </TopSubFourCelOne>

            <TopSubOneCelTwo>Operations - Direct</TopSubOneCelTwo>
            <TopSubThreeCelTwo className="t1-scope-comments">
              <TextArea />
            </TopSubThreeCelTwo>
            <TopSubFourCelTwo>
              <TableDropdown options={opt} appearence="number" send="id" />
            </TopSubFourCelTwo>

            <TopSubOneCelThree>Operations - Indirect</TopSubOneCelThree>
            <TopSubThreeCelThree className="t1-scope-comments">
              <TextArea />
            </TopSubThreeCelThree>
            <TopSubFourCelThree>
              <TableDropdown options={opt} appearence="number" send="id" />
            </TopSubFourCelThree>

            <TopSubOneCelFour>Svc Chemicals</TopSubOneCelFour>
            <TopSubThreeCelFour className="t1-scope-comments">
              <TextArea />
            </TopSubThreeCelFour>
            <TopSubFourCelFour>
              <TableDropdown options={opt} appearence="number" send="id" />
            </TopSubFourCelFour>

            <TopSubTwoCelOne className="t1-phase">
              <TableDropdown options={opt} appearence="number" send="id" />
            </TopSubTwoCelOne>
          </TopSideTable>

          <BottomSideTable>
            <BottomTitleColumnOne>
              Severity on the business
            </BottomTitleColumnOne>
            <BottomTitleColumnTwo>Level of Control</BottomTitleColumnTwo>

            <BottomSubColumnOne>Application Area</BottomSubColumnOne>
            <BottomSubColumnTwo className="t1-phase">Phase (A)</BottomSubColumnTwo>
            <BottomSubColumnThree>Hits</BottomSubColumnThree>
            <BottomSubColumnFour>Comments</BottomSubColumnFour>
            <BottomSubColumnFive>Resources Impact</BottomSubColumnFive>
            <BottomSubColumnSix>Development</BottomSubColumnSix>
            <BottomSubColumnSeven>Evaluation</BottomSubColumnSeven>

            <BottomSubOneCelOne>Articles (Parts / Vehicle)</BottomSubOneCelOne>
            <BottomSubThreeCelOne>
              <TextArea />
            </BottomSubThreeCelOne>
            <BottomSubFourCelOne>
              <TextArea />
            </BottomSubFourCelOne>
            <BottomSubFiveCelOne>
              <TableDropdown options={opt} appearence="number" send="id" />
            </BottomSubFiveCelOne>
            <BottomSubSixCelOne>
              <TableDropdown options={opt} appearence="number" send="id" />
            </BottomSubSixCelOne>
            <BottomSubSevenCelOne>
              <TableDropdown options={opt} appearence="number" send="id" />
            </BottomSubSevenCelOne>

            <BottomSubOneCelTwo>Operations - Direct</BottomSubOneCelTwo>
            <BottomSubThreeCelTwo>
              <TextArea />
            </BottomSubThreeCelTwo>
            <BottomSubFourCelTwo>
              <TextArea />
            </BottomSubFourCelTwo>
            <BottomSubFiveCelTwo>
              <TableDropdown options={opt} appearence="number" send="id" />
            </BottomSubFiveCelTwo>
            <BottomSubSixCelTwo>
              <TableDropdown options={opt} appearence="number" send="id" />
            </BottomSubSixCelTwo>
            <BottomSubSevenCelTwo>
              <TableDropdown options={opt} appearence="number" send="id" />
            </BottomSubSevenCelTwo>

            <BottomSubOneCelThree>Operations - Indirect</BottomSubOneCelThree>
            <BottomSubThreeCelThree>
              <TextArea />
            </BottomSubThreeCelThree>
            <BottomSubFourCelThree>
              <TextArea />
            </BottomSubFourCelThree>
            <BottomSubFiveCelThree>
              <TableDropdown options={opt} appearence="number" send="id" />
            </BottomSubFiveCelThree>
            <BottomSubSixCelThree>
              <TableDropdown options={opt} appearence="number" send="id" />
            </BottomSubSixCelThree>
            <BottomSubSevenCelThree>
              <TableDropdown options={opt} appearence="number" send="id" />
            </BottomSubSevenCelThree>

            <BottomSubOneCelFour>Svc Chemicals</BottomSubOneCelFour>
            <BottomSubThreeCelFour>
              <TextArea />
            </BottomSubThreeCelFour>
            <BottomSubFourCelFour>
              <TextArea />
            </BottomSubFourCelFour>
            <BottomSubFiveCelFour>
              <TableDropdown options={opt} appearence="number" send="id" />
            </BottomSubFiveCelFour>
            <BottomSubSixCelFour>
              <TableDropdown options={opt} appearence="number" send="id" />
            </BottomSubSixCelFour>
            <BottomSubSevenCelFour>
              <TableDropdown options={opt} appearence="number" send="id" />
            </BottomSubSevenCelFour>

            <BottomSubTwoCelOne>
              <TableDropdown options={opt} appearence="number" send="id" />
            </BottomSubTwoCelOne>
          </BottomSideTable>
        </ImpactAssessmentTable>
        <ButtonsGroup>
          <Cancel onClick={close}>Cancel</Cancel>
          <Save onClick={save}>Save</Save>
        </ButtonsGroup>
        <Footer />
      </Content>
      <Overlay onClick={close} />
    </Container>
  ) : null;
};

export default ModalContainer;
