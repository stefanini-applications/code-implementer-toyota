import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../components/Button';
import Tabs from '../../components/TabSwitch';
import impactTabs from '../../mocks/impact-tabs';
import regionTabs from '../../mocks/region-tabs';
import reportImpactTabs from '../../mocks/report-impact-tabs';
import selectPreferences from '../../mocks/select-preferences';
import history from '../../routes/history';
import {
  selectors,
  getUserPreferencesRequest,
  editUserPreferencesRequest
} from '../../store/modules/userPreferences/actions';
import {
  ArrowDown,
  BreadCrumbs,
  BreadCrumbsWrapper,
  Container,
  ContainerFilterPreferences,
  CurrentPage,
  HeaderContainer,
  Label,
  TabsWrapper,
  Title,
  TitleContainer,
  SubLabel,
  ContainerCheckbox,
  CheckboxInput,
  CheckboxLabel,
  ContainerInput,
  ContainerButtons
} from './styled';

const UserPreferences: React.FC = () => {
  const [activeIndex] = useState(0);
  const [switchTabs, setSwitchTabs] = useState(1);
  const [jurisdictions, setJurisdictions] = useState(impactTabs);
  const [jurisdictionsReport, setJurisdictionsReport] =
    useState(reportImpactTabs);
  const [regions, setRegions] = useState(regionTabs);
  const userPreferences: any = useSelector(selectors.userPreferences);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserPreferencesRequest());
  }, []);
  useEffect(() => {
    setJurisdictions(
      jurisdictions?.map(x => {
        if (userPreferences?.jurisdictions.find(y => y === x.id)) {
          x.checked = true;
        } else {
          x.checked = false;
        }
        return x;
      })
    );
    setRegions(
      regions?.map(x => {
        if (userPreferences?.toyotaRegions.find(y => y === x.id)) {
          x.checked = true;
        } else {
          x.checked = false;
        }
        return x;
      })
    );
    setJurisdictionsReport(
      jurisdictionsReport?.map(x => {
        if (userPreferences?.reportJurisdictions.find(y => y === x.id)) {
          x.checked = true;
        } else {
          x.checked = false;
        }
        return x;
      })
    );
  }, [userPreferences]);

  const handleSavePreferences = () => {
    const obj = {
      jurisdictions: jurisdictions
        .filter(x => x.checked)
        .map(y => {
          return y.id;
        }),
      reportJurisdictions: jurisdictionsReport
        .filter(x => x.checked)
        .map(y => {
          return y.id;
        }),
      toyotaRegions: regions
        .filter(x => x.checked)
        .map(y => {
          return y.id;
        })
    };
    dispatch(editUserPreferencesRequest(obj));
  };

  return (
    <Container>
      <HeaderContainer>
        <BreadCrumbsWrapper>
          <BreadCrumbs href="/">Home</BreadCrumbs>
          <ArrowDown />
          <CurrentPage>User Preferences</CurrentPage>
        </BreadCrumbsWrapper>
      </HeaderContainer>

      <TitleContainer>
        <Title>User Preferences</Title>
      </TitleContainer>

      <ContainerFilterPreferences>
        <Label>Jurisdiction</Label>
        <SubLabel>
          Set jurisdiction filter default values for your user:
        </SubLabel>

        <ContainerInput>
          {jurisdictions.map((item, index) => {
            return (
              <ContainerCheckbox>
                <CheckboxInput
                  type="checkbox"
                  id={`custom-checkbox-jurisdiction-${item.tab}`}
                  name={item.tab}
                  checked={item.checked}
                  value={item.tab}
                  onChange={() => {
                    const updatedCheckedState = jurisdictions.map((obj, i) =>
                      i === index ? { ...obj, checked: !obj.checked } : obj
                    );
                    setJurisdictions(updatedCheckedState);
                  }}
                />
                <CheckboxLabel
                  htmlFor={`custom-checkbox-jurisdiction-${item.tab}`}
                >
                  {item.tab}
                </CheckboxLabel>
              </ContainerCheckbox>
            );
          })}
        </ContainerInput>
      </ContainerFilterPreferences>

      <ContainerFilterPreferences>
        <Label> Impacted Toyota Region</Label>
        <SubLabel>
          Set  impacted Toyota region filter default values for your user:
        </SubLabel>

        <ContainerInput>
          {regions.map((item, index) => {
            return (
              <ContainerCheckbox>
                <CheckboxInput
                  type="checkbox"
                  id={`custom-checkbox-regions-${item.tab}`}
                  name={item.tab}
                  checked={item.checked}
                  value={item.tab}
                  onChange={() => {
                    const updatedCheckedState = regions.map((obj, i) =>
                      i === index ? { ...obj, checked: !obj.checked } : obj
                    );
                    setRegions(updatedCheckedState);
                  }}
                />
                <CheckboxLabel htmlFor={`custom-checkbox-regions-${item.tab}`}>
                  {item.tab}
                </CheckboxLabel>
              </ContainerCheckbox>
            );
          })}
        </ContainerInput>
      </ContainerFilterPreferences>

      <ContainerFilterPreferences>
        <Label>Regulation Report Jurisdiction</Label>
        <SubLabel>
          Set regulation report jurisdiction filter default values for your
          user:
        </SubLabel>

        <ContainerInput>
          {jurisdictionsReport.map((item, index) => {
            return (
              <ContainerCheckbox>
                <CheckboxInput
                  type="checkbox"
                  id={`custom-checkbox-report-${item.tab}`}
                  name={item.tab}
                  checked={item.checked}
                  value={item.tab}
                  onChange={() => {
                    const updatedCheckedState = jurisdictionsReport.map(
                      (obj, i) =>
                        i === index ? { ...obj, checked: !obj.checked } : obj
                    );
                    setJurisdictionsReport(updatedCheckedState);
                  }}
                />
                <CheckboxLabel htmlFor={`custom-checkbox-report-${item.tab}`}>
                  {item.tab}
                </CheckboxLabel>
              </ContainerCheckbox>
            );
          })}
        </ContainerInput>
      </ContainerFilterPreferences>

      <ContainerButtons>
        <Button type="primary" text="Save Preferences" onClick={handleSavePreferences} />
      </ContainerButtons>
    </Container>
  );
};

export default UserPreferences;
