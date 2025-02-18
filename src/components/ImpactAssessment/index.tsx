import React, { useEffect, useState } from 'react';

import data from '../../mocks/impact-tabs';
import Button from '../Button';
import Checkbox from '../Checkbox';
import CollapsibleImpactAssessment from '../Collapsible/CollapsibleImpactAssessment';
import Tags from '../Tags';
import ModalContainer from './ModalContainer';
import {
  Container,
  TitleContainer,
  Title,
  HeaderContainer,
  SectionTitle,
  Touchable,
  CheckboxContainer,
  NewRecord,
  TabsWrapper,
  RecordsContainer
} from './styled';

interface IImpactAssessment {
  impactAssessment: Array<any>;
}

const ImpactAssessment: React.FC<IImpactAssessment> = ({
  impactAssessment
}) => {
  const [activeIndex] = useState(0);
  const [applicationArea1, setapplicationArea1] = useState(true);
  const [applicationArea2, setapplicationArea2] = useState(true);
  const [applicationArea3, setapplicationArea3] = useState(true);
  const [applicationArea4, setapplicationArea4] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [filteredImpactAssessment, setFilteredOptions] =
    useState<any>(impactAssessment);

  function handleOpenEditModal() {
    setOpenModal(true);
  }

  function handleCloseEditModal() {
    setOpenModal(false);
  }

  useEffect(() => {
    handleTabClick(1);
  }, [impactAssessment]);

  function handleTabClick(index: any) {
    const auxImpactAssessment = impactAssessment?.filter(
      x => x.Regulation.jurisdictionId === index.toString()
    );

    setFilteredOptions(auxImpactAssessment);
  }

  useEffect(() => {
    if (openModal) {
      document.body.classList.add("hide-overflow");
    } else {
      document.body.classList.remove("hide-overflow");
    }
  }, [openModal]);

  return (
    <Container>
      <TitleContainer>
        <Title>Impact Assessment</Title>
      </TitleContainer>
      <ModalContainer open={openModal} close={handleCloseEditModal} />
      <HeaderContainer>
        <SectionTitle>Application Area</SectionTitle>
        <Touchable onClick={handleOpenEditModal}>
          <Button text="New Impact Assessment" />
        </Touchable>
      </HeaderContainer>
      <CheckboxContainer>
        <Checkbox
          id={1}
          value="articles"
          label="Articles (Mass Production, Access and Srv parts)"
          defaultChecked
          onClick={(e: any) => {
            setapplicationArea1(e.target.checked);
          }}
        />
        <Checkbox
          id={2}
          value="direct"
          label="NON DIMENSIONALS - DIRECT"
          defaultChecked
          onClick={(e: any) => {
            setapplicationArea2(e.target.checked);
          }}
        />
        <Checkbox
          id={3}
          value="indirect"
          label="NON DIMENSIONALS - INDIRECT"
          defaultChecked
          onClick={(e: any) => {
            setapplicationArea3(e.target.checked);
          }}
        />
        <Checkbox
          id={4}
          value="chemicals"
          label="SVC CHEMICALS"
          defaultChecked
          onClick={(e: any) => {
            setapplicationArea4(e.target.checked);
          }}
        />
      </CheckboxContainer>
      <TabsWrapper>
        <Tags
          key={activeIndex}
          value={data}
          liveIndex={activeIndex}
          onTabClick={(id: any) => {
            handleTabClick(id);
          }}
          hasTagConnection
        />
      </TabsWrapper>
      <RecordsContainer>
        <CollapsibleImpactAssessment
          data={filteredImpactAssessment}
          showApplicationArea={[
            applicationArea1,
            applicationArea2,
            applicationArea3,
            applicationArea4
          ]}
        />
      </RecordsContainer>
    </Container>
  );
};

export default ImpactAssessment;
