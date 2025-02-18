/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';

import cuid from 'cuid';

import Button from '../../Button';
import {
  DateUpdate,
  ItemTitle,
  LabelTitle,
  TextTitle,
  LevelSection,
  BigCircle,
  BigCircleText,
  Touchable,
  Plus,
  ContainerClass,
  Class,
  ContainerLevels,
  ItemLevel,
  Minus,
  Substance,
  SubstanceTitle,
  TitleClass,
  SectionRelated,
  ContainerClassInside
} from './styled';

interface ICollapsibleRelatedSubstances {
  data: any;
  onCollapsibleClick?: any;
}

const CollapsibleRelatedSubstances: React.FC<ICollapsibleRelatedSubstances> = ({
  data,
  onCollapsibleClick
}) => {
  const [collapseIndex, setCollapseIndex] = useState(0);

  const handleIndexClick = (indexClick: any, collapsibleStatus: any) => {
    setCollapseIndex(indexClick);
    data[indexClick].open = collapsibleStatus === 'open';
    onCollapsibleClick &&
      onCollapsibleClick(collapsibleStatus, indexClick, collapseIndex);
  };

  useEffect(() => {
    data?.forEach((element: any) => {
      element.open = false;
    });
  }, [data]);

  return (
    <SectionRelated>
      {data?.map((item: any, index: any) => {
        return item.open ? (
          <ContainerClass key={cuid()}>
            <Touchable onClick={() => handleIndexClick(index, 'close')}>
              <Minus />
            </Touchable>
            <Class>
              <TitleClass>
                <ItemTitle>
                  <TextTitle>{item?.commonName}</TextTitle>
                </ItemTitle>
                <ItemTitle>
                  <ContainerLevels>
                    <ItemLevel>
                      <LabelTitle>Highest Phase:</LabelTitle>
                      <LevelSection>
                        <BigCircle>
                          <BigCircleText>{item?.phase}</BigCircleText>
                        </BigCircle>
                      </LevelSection>
                    </ItemLevel>
                    <ItemLevel>
                      <LabelTitle>Highest Level:</LabelTitle>
                      <LevelSection>{item?.level}</LevelSection>
                    </ItemLevel>
                  </ContainerLevels>
                </ItemTitle>
              </TitleClass>

              {item?.childs?.length > 0
                ? item?.childs?.map((value: any) => {
                    return value?.type === 'Substance' ? (
                      <Substance>
                        <DateUpdate>{value?.casNumber}</DateUpdate>
                        <TitleClass>
                          <SubstanceTitle>
                            <TextTitle>{value?.commonName}</TextTitle>
                            <Button text="View Impact Assessment" />
                          </SubstanceTitle>
                          <ItemTitle>
                            <ContainerLevels>
                              <ItemLevel>
                                <LabelTitle>Phase:</LabelTitle>
                                <LevelSection>
                                  <BigCircle>
                                    <BigCircleText>
                                      {value?.phase}
                                    </BigCircleText>
                                  </BigCircle>
                                </LevelSection>
                              </ItemLevel>
                              <ItemLevel>
                                <LabelTitle>Highest Level:</LabelTitle>
                                <LevelSection>{value?.level}</LevelSection>
                              </ItemLevel>
                            </ContainerLevels>
                          </ItemTitle>
                        </TitleClass>
                      </Substance>
                    ) : (
                      <ContainerClassInside>
                        {value?.childs ? <Plus /> : null}
                        <Class>
                          <TitleClass>
                            <ItemTitle>
                              <TextTitle>{value?.commonName}</TextTitle>
                            </ItemTitle>

                            <ItemTitle>
                              <ContainerLevels>
                                <ItemLevel>
                                  <LabelTitle>Highest Phase:</LabelTitle>
                                  <LevelSection>
                                    <BigCircle>
                                      <BigCircleText>
                                        {value?.phase}
                                      </BigCircleText>
                                    </BigCircle>
                                  </LevelSection>
                                </ItemLevel>

                                <ItemLevel>
                                  <LabelTitle>Highest Level:</LabelTitle>
                                  <LevelSection>{value?.level}</LevelSection>
                                </ItemLevel>
                              </ContainerLevels>
                            </ItemTitle>
                          </TitleClass>
                        </Class>
                      </ContainerClassInside>
                    );
                  })
                : null}
            </Class>
          </ContainerClass>
        ) : (
          <ContainerClass>
            {item?.childs?.length > 0 && (
              <Touchable onClick={() => handleIndexClick(index, 'open')}>
                <Plus />
              </Touchable>
            )}
            <Class>
              <TitleClass>
                <ItemTitle>
                  <TextTitle>{item?.commonName}</TextTitle>
                </ItemTitle>

                <ItemTitle>
                  <ContainerLevels>
                    <ItemLevel>
                      <LabelTitle>Highest Phase:</LabelTitle>
                      <LevelSection>
                        <BigCircle>
                          <BigCircleText>{item?.phase}</BigCircleText>
                        </BigCircle>
                      </LevelSection>
                    </ItemLevel>

                    <ItemLevel>
                      <LabelTitle>Highest Level:</LabelTitle>
                      <LevelSection>{item?.level}</LevelSection>
                    </ItemLevel>
                  </ContainerLevels>
                </ItemTitle>
              </TitleClass>
            </Class>
          </ContainerClass>
        );
      })}
    </SectionRelated>
  );
};

export default CollapsibleRelatedSubstances;
