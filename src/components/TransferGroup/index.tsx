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
import Confirmation from '../Modal/Confirmation';
import {
  AntdList,
  Container,
  ContainerButtonTransfer,
  ContainerList,
  ContainerListRight,
  ContainerLoading,
  ContainerPagination,
  ContainerTree,
  ContainerTreeLeft,
  DeleteIcon,
  FlexColumns,
  LoadingIndicator,
  ContainerTreeList,
  ContainerNoData,
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

const TransferGroup: React.FC<ITransfer> = ({
  data,
  selectedSubstances,
  paginationInfo,
  onChangePage,
  loadingLeftTable,
  loadingRightTable,
  onSearch,
  onTransferChange,
  onDeleteSubstances,
  groupTaggedToImpAssessment,
  recordType,
  listRegulatoryUpdates,
  groupId
}) => {
  useState<DataNode[]>(data);
  const [checkedKeys, setCheckedKeys] = useState<any[]>([]);
  const [search, setSearch] = useState<any>('');
  const [disabledArrow, setDisabledArrow] = useState<any>(true);
  const [searched, setSearched] = useState(false);
  const { Search } = Input;
  const [checkSelect, setCheckSelect] = useState<'Unselect All' | 'Select All'>('Select All');
  const [open, setOpen] = useState(false);
  const [titleText, setTitleText] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [itemForDelete, setItemForDelete] = useState<any>();
  const [checkedCasNumber, setCheckedCasNumber] = useState<any>([]);
  const [checkedData, setCheckedData] = useState<any>([]);
  const [deleteType, setDeleteType] = useState<any>();
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

      // check for nodes already in the group
      resetDisabled()
      if (selectedSubstances.length > 0) {
        data = data.map(element => {
          if (element.type === 'Substance' && selectedSubstances.find(x => x.casNumber === element.casNumber)) {
            element.disabled = true
          } else if (element.type === 'GroupTemplate') {
            let allGroupSelected = true;
            element?.children.map(substance => {
              if (selectedSubstances?.find(x => x.casNumber === substance.casNumber)) {
                substance.disabled = true
              } else {
                allGroupSelected = false
              }
              return substance
            })
            element.disabled = allGroupSelected
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

  const handleClose = action => {
    if (action === 'yes') {
      if (deleteType === 'single') {
        handleDelete(itemForDelete);
      }
      if (deleteType === 'all') {
        handleDelete(selectedSubstances);
      }
    } else {
      setItemForDelete(null);
    }
    setOpen(false);
  };

  const handleDelete = items => {
    onDeleteSubstances && onDeleteSubstances(items);
  }

  const handleDeleteSingleSubstance = item => {
    let allUpdates;
    let upd;
    const impAssessLen = groupTaggedToImpAssessment ? 1 : 0;
    let type;
    let thoseOrThat;
    const aux: any = []
    aux.push(item)

    if (recordType !== 'listing') {
      allUpdates = listRegulatoryUpdates?.map(regUp =>
        regUp?.RegulationGroups?.filter(grp => grp.id === groupId?.toString())
      ).flat();
      upd = allUpdates?.length > 1 ? "updates" : "update";
      thoseOrThat = allUpdates?.length > 1 ? "those" : "that";
      type = recordType === 'regulation' ? 'regulatory' : 'legislative';
    }

    if (impAssessLen === 0 && (allUpdates == null || allUpdates?.length === 0)) {
      handleDelete(aux);
      return;
    }

    setDeleteType('single');
    setTitleText(
      `Remove substance from group?`
    );
    setBodyText(
      allUpdates?.length > 0 && impAssessLen > 0
        ? `This group is tagged in ${allUpdates?.length} ${type} ${upd}
        and an Impact Assessment has been created for it. This substance will be removed
        from ${thoseOrThat} ${type} ${upd}, and its Impact Assessment information
        will be deleted from the Impact Assessment for the group.
        (Changes won't be saved until you 'Save Group' on previous screen)`
        : allUpdates?.length > 0
          ? `This group is tagged in ${allUpdates?.length} ${type} ${upd}. 
          This substance will be removed from ${thoseOrThat} ${type} ${upd}.
          (Changes won't be saved until you 'Save Group' on previous screen)`
          : impAssessLen > 0
            ? `An Impact Assessment exists for this group and the substances
            within it, in this ${recordType}. This Impact Assessment infomation will be deleted.
            (Changes won't be saved until you 'Save Group' on previous screen)`
            : ``
    );
    setOpen(true);
    setItemForDelete(aux);
  };

  const handleDeleteAllSubstances = () => {
    let allUpdates;
    let upd;
    const impAssessLen = groupTaggedToImpAssessment ? 1 : 0;
    let type;
    let thoseOrThat;

    if (recordType !== 'listing') {
      allUpdates = listRegulatoryUpdates?.map(regUp =>
        regUp?.RegulationGroups?.filter(grp => grp.id === groupId?.toString())
      ).flat();
      upd = allUpdates?.length > 1 ? "updates" : "update";
      thoseOrThat = allUpdates?.length > 1 ? "those" : "that";
      type = recordType === 'regulation' ? 'regulatory' : 'legislative';
    }

    setDeleteType('all');
    setTitleText(
      `Remove all substances from group?`
    );
    setBodyText(
      allUpdates?.length > 0 && impAssessLen > 0
        ? `This group is tagged in ${allUpdates?.length} ${type} ${upd}
        and an Impact Assessment has been created for it. All the substances will be removed
        from ${thoseOrThat} ${type} ${upd}, and their Impact Assessment information
        will be deleted.
        (Changes won't be saved until you 'Save Group' on previous screen)`
        : allUpdates?.length > 0
          ? `This group is tagged in ${allUpdates?.length} ${type} ${upd}. 
          All these substances will be removed from ${thoseOrThat} ${type} ${upd}.
          (Changes won't be saved until you 'Save Group' on previous screen)`
          : impAssessLen > 0
            ? `The Impact Assessment information for this group and substances
            within it will be deleted.
            (Changes won't be saved until you 'Save Group' on previous screen)`
            : `(Changes won't be saved until you 'Save Group' on previous screen)`
    );
    setOpen(true);
  };

  return (
    <>
      <Confirmation
        open={open}
        setOpen={setOpen}
        titleModal={titleText}
        bodyText={bodyText}
        onClose={handleClose}
        okText='Mark for removal'
        cancelText="Cancel"
      />
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
                      <span>No substances or templates were found</span>
                    } />
                ) : (
                  <>
                    <ContainerTreeList>
                      <Tree
                        virtual={false}
                        blockNode
                        checkable
                        multiple
                        selectable={false}
                        onCheck={onCheck}
                        checkedKeys={checkedKeys}
                        onSelect={onCheck}
                        treeData={data}
                        height={322}
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
                locale={{
                  emptyText: <AntEmpty image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                      <span>No substances were found</span>
                    } />
                }}
                dataSource={selectedSubstancesSearchable}
                loading={loadingRightTable}
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
  groupTaggedToImpAssessment?: any;
  recordType?: any;
  listRegulatoryUpdates?: any;
  groupId?: any;
  onChangePage?: any
}

export default TransferGroup;
