import React, { useState } from 'react';

import Button from '../../components/Button';
import applicationTabs from '../../mocks/application-tabs';
import impactTabs from '../../mocks/impact-tabs';
import regionTabs from '../../mocks/region-tabs';
import {
  CheckboxInput,
  CheckboxLabel,
  Container,
  ContainerDownload,
  ContainerFilters,
  ContainerHorizontalItems,
  ContainerInput,
  ContainerItem,
  ContainerItems,
  ContainerLineHorizontalItems,
  ContainerLineItems,
  ContainerMultiSelect,
  ContainerTable,
  ContainerVerticalItems,
  HeaderContainer,
  HeaderItem,
  Item,
  Label,
  LineContainer,
  LineItem,
  LineItemPriority,
  IcoFileDownload,
  ContainerCheckbox,
  Table
} from './styled';

const SubstancePriority: React.FC = () => {
  const [jurisdictions, setJurisdictions] = useState(impactTabs);
  const [regions, setRegions] = useState(regionTabs);
  const [applications, setApplications] = useState(applicationTabs);

  const priorityRank = 'VH' as String;
  let colorLevel = '';

  return (
    <Container>
      <ContainerFilters>
        <ContainerMultiSelect>
          <Label>Jurisdiction</Label>
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
        </ContainerMultiSelect>

        <ContainerMultiSelect>
          <Label>Toyota Impacted Toyota Region</Label>
          <ContainerInput>
            {regions.map((item, index) => {
              return (
                <ContainerCheckbox>
                  <CheckboxInput
                    type="checkbox"
                    id={`custom-checkbox-region-${item.tab}`}
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
                  <CheckboxLabel htmlFor={`custom-checkbox-region-${item.tab}`}>
                    {item.tab}
                  </CheckboxLabel>
                </ContainerCheckbox>
              );
            })}
          </ContainerInput>
        </ContainerMultiSelect>

        <ContainerMultiSelect>
          <Label>Application Area</Label>
          <ContainerInput>
            {applications.map((item, index) => {
              return (
                <ContainerCheckbox>
                  <CheckboxInput
                    type="checkbox"
                    id={`custom-checkbox-area-${item.tab}`}
                    name={item.tab}
                    checked={item.checked}
                    value={item.tab}
                    onChange={() => {
                      const updatedCheckedState = applications.map((obj, i) =>
                        i === index ? { ...obj, checked: !obj.checked } : obj
                      );
                      setApplications(updatedCheckedState);
                    }}
                  />
                  <CheckboxLabel htmlFor={`custom-checkbox-area-${item.tab}`}>
                    {item.tab}
                  </CheckboxLabel>
                </ContainerCheckbox>
              );
            })}
          </ContainerInput>
        </ContainerMultiSelect>
      </ContainerFilters>

      <ContainerDownload>
        <Button text="Download" />
      </ContainerDownload>

      <ContainerTable>
        <Table>
          <HeaderContainer>
            <HeaderItem className="column-cas">
              <Item>CAS #</Item>
            </HeaderItem>

            <HeaderItem className="column-chem">
              <Item>Chemical Name</Item>
            </HeaderItem>

            <HeaderItem className="column-listing header-child">
              <ContainerItems>
                <Item>Listings</Item>
              </ContainerItems>
            </HeaderItem>

            <HeaderItem className="column-regleg-country">
              <Item>Legislation / Regulation</Item>
            </HeaderItem>

            <HeaderItem className="column-regleg-scope header-child">
              <ContainerItems>
                <Item>Leg / Reg Scope</Item>
                <ContainerHorizontalItems>
                  <ContainerItem className="column-application">
                    <Item>Application</Item>
                  </ContainerItem>
                  <ContainerItem className="column-phase">
                    <Item>Phase</Item>
                  </ContainerItem>
                  <ContainerItem className="column-level">
                    <Item>Level of Restriction</Item>
                  </ContainerItem>
                </ContainerHorizontalItems>
              </ContainerItems>
            </HeaderItem>

            <HeaderItem className="column-severity header-child">
              <ContainerItems>
                <Item>Severity</Item>
                <ContainerHorizontalItems>
                  <ContainerItem className="column-hits">
                    <Item>Hits</Item>
                  </ContainerItem>
                  <ContainerItem className="column-resource">
                    <Item>Resource Impact</Item>
                  </ContainerItem>
                </ContainerHorizontalItems>
              </ContainerItems>
            </HeaderItem>

            <HeaderItem className="column-level-control header-child">
              <ContainerItems>
                <Item>Level of Control</Item>
                <ContainerHorizontalItems>
                  <ContainerItem className="column-dev">
                    <Item>Dev.</Item>
                  </ContainerItem>

                  <ContainerItem className="column-eval">
                    <Item>Eval Time</Item>
                  </ContainerItem>
                </ContainerHorizontalItems>
              </ContainerItems>
            </HeaderItem>

            <HeaderItem className="column-priority">
              <Item>Priority Rank</Item>
            </HeaderItem>

            <HeaderItem className="column-regleg-updates header-child">
              <ContainerItems>
                <Item>Updates</Item>
              </ContainerItems>
            </HeaderItem>

            <HeaderItem className="column-date">
              <Item>Date</Item>
            </HeaderItem>

            <HeaderItem className="column-next">
              <Item>Next Steps</Item>
            </HeaderItem>
          </HeaderContainer>

          <LineContainer>
            <LineItem className="column-cas">
              <Item>50-0-0</Item>
            </LineItem>

            <LineItem className="column-chem">
              <Item>Formaldehyde</Item>
            </LineItem>

            <LineItem className="column-listing">
              <Item>GADSL</Item>
              <Item>TSZ0001G</Item>
              <Item>Policy Exists</Item>
            </LineItem>

            <LineItem className="header-child">
              <ContainerVerticalItems>
                <ContainerLineHorizontalItems>
                  <ContainerItem className="column-regleg-country title-regleg-country">
                    <Item>EPA · TSCA SEC. 6</Item>
                  </ContainerItem>
                  <LineItem className="column-regleg-scope header-child">
                    <ContainerVerticalItems className="column-application">
                      <Item>Articles (Parts / Vehicle)</Item>
                      <Item>Operations - Direct</Item>
                      <Item>Operations - Indirect</Item>
                      <Item>Service Products</Item>
                    </ContainerVerticalItems>
                  </LineItem>

                  <LineItem className="column-regleg-scope header-child">
                    <ContainerVerticalItems className="column-phase">
                      <Item>5</Item>
                      <Item>5</Item>
                      <Item>5</Item>
                      <Item>5</Item>
                    </ContainerVerticalItems>
                  </LineItem>

                  <LineItem className="column-regleg-scope header-child">
                    <ContainerVerticalItems className="column-level">
                      <Item>4</Item>
                      <Item>5</Item>
                      <Item>1</Item>
                      <Item>2</Item>
                    </ContainerVerticalItems>
                  </LineItem>

                  <LineItem className="column-severity header-child">
                    <ContainerVerticalItems className="column-hits">
                      <Item>10,000</Item>
                      <Item>17</Item>
                      <Item>150</Item>
                      <Item>31</Item>
                    </ContainerVerticalItems>
                  </LineItem>

                  <LineItem className="column-severity header-child">
                    <ContainerVerticalItems className="column-resource">
                      <Item>5</Item>
                      <Item>4</Item>
                      <Item>2</Item>
                      <Item>1</Item>
                    </ContainerVerticalItems>
                  </LineItem>

                  <LineItem className="column-level-control header-child">
                    <ContainerVerticalItems className="column-dev">
                      <Item>2</Item>
                      <Item>3</Item>
                      <Item>1</Item>
                      <Item>1</Item>
                    </ContainerVerticalItems>
                  </LineItem>

                  <LineItem className="column-level-control header-child">
                    <ContainerVerticalItems className="column-eval">
                      <Item>3</Item>
                      <Item>4</Item>
                      <Item>1</Item>
                      <Item>1</Item>
                    </ContainerVerticalItems>
                  </LineItem>
                  <>
                    {(() => {
                      switch (priorityRank) {
                        case 'L':
                          colorLevel = '#FFE6B3';
                          break;
                        case 'M':
                          colorLevel = '#FFCC99';
                          break;
                        case 'H':
                          colorLevel = '#FF9F8C';
                          break;
                        case 'VH':
                          colorLevel = '#FF8080';
                          break;
                        case 'NR':
                          colorLevel = '#DCEECF';
                          break;
                        default:
                          colorLevel = '#FFF';
                          break;
                      }
                    })()}
                  </>
                  <ContainerVerticalItems className="column-priority">
                    <LineItemPriority
                      backgroundColor={colorLevel}
                      className="column-priority header-child"
                    >
                      <Item>{priorityRank}</Item>
                    </LineItemPriority>

                    <LineItemPriority
                      backgroundColor={colorLevel}
                      className="column-priority header-child"
                    >
                      <Item>{priorityRank}</Item>
                    </LineItemPriority>

                    <LineItemPriority
                      backgroundColor={colorLevel}
                      className="column-priority header-child"
                    >
                      <Item>{priorityRank}</Item>
                    </LineItemPriority>

                    <LineItemPriority
                      backgroundColor={colorLevel}
                      className="column-priority header-child"
                    >
                      <Item>{priorityRank}</Item>
                    </LineItemPriority>
                  </ContainerVerticalItems>

                  <LineItem className="column-regleg-updates header-child">
                    <ContainerVerticalItems className="column-regleg-updates">
                      <Item>text will be displayed here...</Item>
                      <Item>text will be displayed here...</Item>
                      <Item>text will be displayed here...</Item>
                      <Item>text will be displayed here...</Item>
                    </ContainerVerticalItems>
                  </LineItem>

                  <LineItem className="column-date header-child">
                    <ContainerVerticalItems className="column-date">
                      <Item>Jun-10-2022</Item>
                      <Item>Jun-10-2022</Item>
                      <Item>Jun-10-2022</Item>
                      <Item>Jun-10-2022</Item>
                    </ContainerVerticalItems>
                  </LineItem>

                  <LineItem className="column-next header-child">
                    <Item>
                      text will be displayed here about the next steps...
                    </Item>
                  </LineItem>
                </ContainerLineHorizontalItems>

                <ContainerLineHorizontalItems>
                  <ContainerItem className="column-regleg-country title-regleg-country">
                    <Item>UN STOCKHOLM</Item>
                  </ContainerItem>
                  <LineItem className="column-regleg-scope header-child">
                    <ContainerVerticalItems className="column-application">
                      <Item>Articles (Parts / Vehicle)</Item>
                      <Item>Operations - Direct</Item>
                      <Item>Operations - Indirect</Item>
                      <Item>Service Products</Item>
                    </ContainerVerticalItems>
                  </LineItem>

                  <LineItem className="column-regleg-scope header-child">
                    <ContainerVerticalItems className="column-phase">
                      <Item>5</Item>
                      <Item>5</Item>
                      <Item>5</Item>
                      <Item>5</Item>
                    </ContainerVerticalItems>
                  </LineItem>

                  <LineItem className="column-regleg-scope header-child">
                    <ContainerVerticalItems className="column-level">
                      <Item>4</Item>
                      <Item>5</Item>
                      <Item>1</Item>
                      <Item>2</Item>
                    </ContainerVerticalItems>
                  </LineItem>

                  <LineItem className="column-severity header-child">
                    <ContainerVerticalItems className="column-hits">
                      <Item>10,000</Item>
                      <Item>17</Item>
                      <Item>150</Item>
                      <Item>31</Item>
                    </ContainerVerticalItems>
                  </LineItem>

                  <LineItem className="column-severity header-child">
                    <ContainerVerticalItems className="column-resource">
                      <Item>5</Item>
                      <Item>4</Item>
                      <Item>2</Item>
                      <Item>1</Item>
                    </ContainerVerticalItems>
                  </LineItem>

                  <LineItem className="column-level-control header-child">
                    <ContainerVerticalItems className="column-dev">
                      <Item>2</Item>
                      <Item>3</Item>
                      <Item>1</Item>
                      <Item>1</Item>
                    </ContainerVerticalItems>
                  </LineItem>

                  <LineItem className="column-level-control header-child">
                    <ContainerVerticalItems className="column-eval">
                      <Item>3</Item>
                      <Item>4</Item>
                      <Item>1</Item>
                      <Item>1</Item>
                    </ContainerVerticalItems>
                  </LineItem>
                  <>
                    {(() => {
                      switch (priorityRank) {
                        case 'L':
                          colorLevel = '#FFE6B3';
                          break;
                        case 'M':
                          colorLevel = '#FFCC99';
                          break;
                        case 'H':
                          colorLevel = '#FF9F8C';
                          break;
                        case 'VH':
                          colorLevel = '#FF8080';
                          break;
                        case 'NR':
                          colorLevel = '#DCEECF';
                          break;
                        default:
                          colorLevel = '#FFF';
                          break;
                      }
                    })()}
                  </>
                  <ContainerVerticalItems className="column-priority">
                    <LineItemPriority
                      backgroundColor={colorLevel}
                      className="column-priority header-child"
                    >
                      <Item>{priorityRank}</Item>
                    </LineItemPriority>

                    <LineItemPriority
                      backgroundColor={colorLevel}
                      className="column-priority header-child"
                    >
                      <Item>{priorityRank}</Item>
                    </LineItemPriority>

                    <LineItemPriority
                      backgroundColor={colorLevel}
                      className="column-priority header-child"
                    >
                      <Item>{priorityRank}</Item>
                    </LineItemPriority>

                    <LineItemPriority
                      backgroundColor={colorLevel}
                      className="column-priority header-child"
                    >
                      <Item>{priorityRank}</Item>
                    </LineItemPriority>
                  </ContainerVerticalItems>

                  <LineItem className="column-regleg-updates header-child">
                    <ContainerVerticalItems className="column-regleg-updates">
                      <Item>text will be displayed here...</Item>
                      <Item>text will be displayed here...</Item>
                      <Item>text will be displayed here...</Item>
                      <Item>text will be displayed here...</Item>
                    </ContainerVerticalItems>
                  </LineItem>

                  <LineItem className="column-date header-child">
                    <ContainerVerticalItems className="column-date">
                      <Item>Jun-10-2022</Item>
                      <Item>Jun-10-2022</Item>
                      <Item>Jun-10-2022</Item>
                      <Item>Jun-10-2022</Item>
                    </ContainerVerticalItems>
                  </LineItem>

                  <LineItem className="column-next header-child">
                    <Item>
                      text will be displayed here about the next steps...
                    </Item>
                  </LineItem>
                </ContainerLineHorizontalItems>
              </ContainerVerticalItems>
            </LineItem>
          </LineContainer>
        </Table>
      </ContainerTable>
    </Container>
  );
};

export default SubstancePriority;
