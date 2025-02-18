/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-cond-assign */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

import { Input, List, Spin, Tree, Pagination, Empty } from 'antd';
import type { TransferDirection } from 'antd/es/transfer';
import type { DataNode } from 'antd/es/tree';


import Button from '../Button';
import Link from '../Link';
import {
  AntdList,
  Container,
  ContainerButtonTransfer,
  ContainerList,
  ContainerListRight,
  ContainerPagination,
  ContainerTree,
  ContainerTreeLeft,
  DeleteIcon,
  FlexColumns,
  LoadingIndicator,
  ContainerTreeList,
  AntEmpty,
  ContainerRemove,
  ContainerActionButtons
} from './styled';

const generateTree = (
  treeNodes: DataNode[] = [],
  checkedKeys: string[] = []
): any => {
  return treeNodes?.map(({ children, ...props }) => ({
    ...props,
    disabled: checkedKeys.includes(props.key as string),
    children: generateTree(children, checkedKeys)
  }));
};

const TransferTemplate: React.FC<ITransfer> = ({
  data,
  selectedSubstances,
  paginationInfo,
  onChangePage,
  loadingLeftTable,
  loadingRightTable,
  onSearch,
  onTransferChange,
  onDeleteSubstances,
  substanceTemplate = false
}) => {
  useState<DataNode[]>(data);
  const [checkedKeys, setCheckedKeys] = useState<any[]>([]);
  const [search, setSearch] = useState<any>('');
  const [disabledArrow, setDisabledArrow] = useState<any>(true);
  const [searched, setSearched] = useState(false);
  const { Search } = Input;
  const [checkSelect, setCheckSelect] = useState<'Unselect All' | 'Select All'>('Select All');
  const [checkedCasNumber, setCheckedCasNumber] = useState<any>([]);
  const [checkedData, setCheckedData] = useState<any>([]);
  const [selectedSubstancesSearchable, setSelectedSubstancesSearchable] = useState<any>(selectedSubstances);

  const substancesWithoutTemplates = data?.filter(x => x.type === 'Substance');
  const templates = data?.filter(x => x.type === 'GroupTemplate');
  const substancesInTemplates: any = [];

  templates?.forEach(template => {
    template?.children?.forEach(substance => {
      substancesInTemplates.push(substance)
    });
  });

  useEffect(() => {
    setSelectedSubstancesSearchable(selectedSubstances);
  }, [selectedSubstances]);

  useEffect(() => {
    if (data) {
      // check for checked nodes
      const newKeys: any = [];
      checkedCasNumber.forEach(casNumber => {
        newKeys.push(...substancesWithoutTemplates.filter(x => x.casNumber === casNumber).map(x => x.key))
        newKeys.push(...substancesInTemplates.filter(x => x.casNumber === casNumber).map(x => x.key))
      });
      setCheckedKeys(removeDuplicates(newKeys));

      // check for nodes already in the template
      resetDisabled()
      if (selectedSubstances.length > 0) {
        data = data.map(element => {
          if (element.type === 'Substance' && selectedSubstances.find(x => x.casNumber === element.casNumber)) {
            element.disabled = true
          } else if (element.type === 'GroupTemplate') {
            let allTemplateSelected = true;
            element?.children.map(substance => {
              if (selectedSubstances?.find(x => x.casNumber === substance.casNumber)) {
                substance.disabled = true
              } else {
                allTemplateSelected = false
              }
              return substance
            })
            element.disabled = allTemplateSelected
          }

          return element
        });
      }
    }
  }, [data, selectedSubstances]);

  const resetDisabled = () => {
    data = data.map(element => {
      if (element.type === 'GroupTemplate') {
        element.disabled = false
        element?.children.map(substance => {
          substance.disabled = false
          return substance
        })
      } else {
        element.disabled = false
      }
      return element
    });
  }

  const searchRight = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch('right', e.target.value);
  };

  const handleSearch = (dir: TransferDirection, value: string) => {
    if (dir === 'left') {
      console.log('')
    } else if (dir === 'right') {
      // setSearchTextRight(value)
      setSelectedSubstancesSearchable(
        selectedSubstances.filter(x =>
          x.title.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const onClickPage = (page: number) => {
    onChangePage && onChangePage(page)
  };

  useEffect(() => {
    if (searched) {
      const delayDebounceFn = setTimeout(() => {
        onSearch && onSearch(search);
        setSearched(false)
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }
    return undefined
  }, [search]);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setSearched(true)
  };

  const onCheck = (value, e) => {
    const keys = value
    const substKeys: any = []
    const casNumbers: any = []
    const chkData: any = []
    if (e.node.type === 'Substance') {
      casNumbers.push(e.node.casNumber)
      const subWithoutTemplate = substancesWithoutTemplates.filter(x => x.casNumber === e.node.casNumber)
      const subInTemplate = substancesInTemplates.filter(x => x.casNumber === e.node.casNumber)
      chkData.push(...subWithoutTemplate)
      chkData.push(...subInTemplate)
      substKeys.push(...subWithoutTemplate.map(x => x.key));
      substKeys.push(...subInTemplate.map(x => x.key));
    } else if (e.node.type === 'GroupTemplate') {
      e.node.children.forEach(element => {
        casNumbers.push(element.casNumber)
        const subWithoutTemplate = substancesWithoutTemplates.filter(x => x.casNumber === element.casNumber)
        const subInTemplate = substancesInTemplates.filter(x => x.casNumber === element.casNumber)
        chkData.push(...subWithoutTemplate)
        chkData.push(...subInTemplate)
        substKeys.push(...subWithoutTemplate.map(x => x.key));
        substKeys.push(...subInTemplate.map(x => x.key));
      });
    }

    if (e.checked) {
      keys.push(...substKeys)
      checkedCasNumber.push(...casNumbers)
      checkedData.push(...chkData)
    } else {
      substKeys.push(...keys)
      casNumbers.forEach(element => {
        checkedCasNumber.findIndex(x => x === element) > -1 && checkedCasNumber.splice(checkedCasNumber.findIndex(x => x === element), 1)
      });
      substKeys.forEach(element => {
        keys.findIndex(x => x === element) > -1 && keys.splice(keys.findIndex(x => x === element), 1)
      });
      chkData.forEach(element => {
        checkedData.findIndex(x => x === element) > -1 && checkedData.splice(checkedData.findIndex(x => x === element), 1)
      });
    }
    setCheckedCasNumber(removeDuplicates(checkedCasNumber))
    setCheckedData(removeDuplicatesObj(checkedData, 'casNumber'))
    setCheckedKeys(removeDuplicates(keys));
    setDisabledArrow(false);
  };
  interface IGroupTemplateEvent {
    node: {
      type: string,
      children: any[],
      key: string
    },
    checked: boolean
  }

  const handleSelectAll = () => {
    const cloneData = [...data];
    const keys: any = []
    const substanceEvent = {
      node: {
        type: 'Substance',
        casNumber: '',
        key: ''
      },
      checked: true
    }
    const groupTemplateEvent: IGroupTemplateEvent = {
      node: {
        type: 'GroupTemplate',
        children: [],
        key: ''
      },
      checked: true
    }
    cloneData.forEach(element => {
      keys.push(element.key)
      if (element.type === 'GroupTemplate') {
        groupTemplateEvent.node.key = element.key
        element?.children.forEach(substance => {
          keys.push(substance.key)
          groupTemplateEvent.node.children.push(substance)
        })
        onCheck(keys, groupTemplateEvent)
      } else {
        substanceEvent.node.casNumber = element.casNumber
        substanceEvent.node.key = element.key
        onCheck(keys, substanceEvent)
      }
    });
  }

  const removeDuplicates = (arr) => {
    return arr.filter((value, index) => arr.indexOf(value) === index);
  }
  const removeDuplicatesObj = (myArr, prop) => {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

  const handleClickSelect = (keys) => {
    setDisabledArrow(true);
    selectedSubstancesSearchable.push(...keys)
    onTransferChange && onTransferChange(keys);

    setCheckedCasNumber([])
    setCheckedData([])
    setCheckedKeys([]);
  };

  const handleDelete = items => {
    onDeleteSubstances && onDeleteSubstances(items);
  }

  const handleDeleteSingleSubstance = item => {
    const aux: any = []
    aux.push(item)
    handleDelete(aux);
  };

  const handleDeleteAllSubstances = () => {
    handleDelete(selectedSubstances);
  };

  return (
    <>
      <FlexColumns>
        <ContainerActionButtons>
          <Button
            // type="link"
            text={checkSelect}
            onClick={() => handleSelectAll()}
            isDisabled={search === ''}
          />
          <Link
            fakeLink
            onClick={handleDeleteAllSubstances}
          >
            Remove All
          </Link>
        </ContainerActionButtons>

        <Container>
          <ContainerTreeLeft>
            <ContainerTree>
              <Search
                placeholder="Search"
                onChange={onSearchChange}
              />
              {loadingLeftTable ? (
                <LoadingIndicator />
              ) : (
                data?.length == 0 ? (
                  <AntEmpty image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                      <>
                        <span>No substances{!substanceTemplate ? ' or templates' : null} were found</span>
                      </>
                    } />
                ) : (
                  <>
                    <ContainerTreeList>
                      <Tree
                        blockNode
                        checkable
                        multiple
                        selectable={false}
                        onCheck={onCheck}
                        checkedKeys={checkedKeys}
                        onSelect={onCheck}
                        treeData={data}
                        height={322}
                        virtual={false}

                      />
                    </ContainerTreeList>
                    <ContainerPagination>
                      <Pagination
                        current={paginationInfo.CurrentPage}
                        pageSize={10}
                        onChange={onClickPage}
                        total={paginationInfo.TotalPages}
                        showSizeChanger={false}
                      />
                    </ContainerPagination>
                  </>
                )
              )}
            </ContainerTree>

          </ContainerTreeLeft>
          <ContainerButtonTransfer>
            <Button
              isDisabled={checkedKeys.length == 0 || disabledArrow}
              icon={<MdOutlineArrowForwardIos />}
              type="primary"
              onClick={() => handleClickSelect(checkedData)}
            />
          </ContainerButtonTransfer>
          <ContainerListRight>
            <ContainerList>
              <Search
                placeholder="Search"
                onChange={searchRight}
              />
              <AntdList itemLayout="horizontal"
                bordered
                dataSource={selectedSubstancesSearchable}
                loading={loadingRightTable}
                locale={{
                  emptyText: <AntEmpty image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                      <span>No substances were found</span>
                    } />
                }}
                renderItem={(item: any) => (
                  <List.Item
                    key={item.key}
                    actions={[<DeleteIcon onClick={() => handleDeleteSingleSubstance(item)} />]}
                  >
                    {item.title}
                  </List.Item>
                )}
              />
            </ContainerList>
          </ContainerListRight>
        </Container>
      </FlexColumns>
    </>
  );
};

interface ITransfer {
  data: any[];
  selectedSubstances?: any;
  paginationInfo?: any;
  loadingLeftTable?: any;
  loadingRightTable?: any;
  onSearch?: any;
  onTransferChange?: any;
  onDeleteSubstances?: any;
  onChangePage?: any
  substanceTemplate?: boolean;
}

export default TransferTemplate;
