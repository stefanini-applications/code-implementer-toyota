/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';

import _ from 'lodash';
import Moment from 'moment';
import { Table } from 'rsuite';
import { SortType } from 'rsuite-table';
// import { reactToString } from 'rsuite-utils/lib/utils';

import './styled.css';
import DatePicker from '../DatePicker';
import Input, { GetInput } from '../Input';
import PaginationAnt from '../Pagination';
import {
  Search,
  SearchIcon,
  InputContainer,
  SectionInput,
  TextArea,
  ContainerDate,
  SectionTextArea,
  SectionTextAreaView,
  ContainerPhase,
  SelectPhase,
  TextAreaClickable,
  ContainerSubstanceName,
  LinkSubstance,
  InputContainerAntd,
  Pagination,
  ContainerPagination,
  ContainerLoadingSearch
} from './styled';

const { Column, HeaderCell, Cell } = Table;

interface ITableTree {
  data: any;
  labelKey: any;
  childrenKey: any;
  columns: ITableColumn[];
  customColumns?: any;
  rowHeight?: any;
  linkSubstance?: any;
  onHandlePageChange?: any;
  onHandlePagination?: any;
  paginationInfo?: any;
  isGadslYn?: any;
  autoFocus?: any;
  userInputGadslYn?: any;
  handleUserSearchInputGadslYn?: any;
  gadslYnLoading?: any;
}
interface ITableColumn {
  header: any;
  headerSort?: boolean;
  sortKey?: string;
  dataKey: any;
  width?: any;
  flexGrow?: any;
  type?: any;
  idKey?: any;
  onChangeField?: any;
  onBlur?: any;
  onKeyUp?: any;
  fieldProps?: any;
  buttonView?: any;
  editable?: any;
  class?: any;
  formatData?: any;
  optionsSelect?: any;
  clickLink?: any;
}

const TableTree: React.FC<ITableTree> = ({
  data,
  labelKey,
  childrenKey,
  columns,
  customColumns,
  rowHeight,
  linkSubstance,
  onHandlePageChange,
  onHandlePagination,
  paginationInfo,
  isGadslYn,
  autoFocus,
  userInputGadslYn,
  handleUserSearchInputGadslYn,
  gadslYnLoading
}) => {
  const [treeData, setTreeData] = useState<any>([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = React.useState(false);
  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState<SortType>();
  const [emptyMesssage, setEmptyMessage] = React.useState('No data found');

  const setVisible = (nodes: any = [], input: any) => {
    const auxInput = input.toLowerCase();
    nodes.forEach((item: any) => {
      item.visible = shouldDisplay(item[labelKey], auxInput);
      if (_.isArray(item[childrenKey])) {
        setVisible(item[childrenKey] as any, auxInput);
        item[childrenKey].forEach((child: any) => {
          if (child.visible) {
            item.visible = child.visible;
          }
        });
      }
    });
  };

  const [inputSearchComponent] = useState(
    GetInput({
      className: "tree-search-component",
      type: "text",
      onChangeInput: handleUserSearchInput,
      prefixIcon: <SearchIcon />,
      placeholder: "Search here"
    })
  );

  useEffect(() => {
    if (gadslYnLoading != undefined) {
      setLoading(gadslYnLoading);
    }
  }, [gadslYnLoading]);

  useEffect(() => {
    // work around fix in order to update tree data
    setTreeData([]);
    setTimeout(() => {
      setTreeData(data);
    }, 100);
  }, [data]);

  useEffect(() => {
    if (data) {
      const aux = [...data];
      setVisible(aux, userInput);
      setTreeData(removeObjects(aux));
    }
  }, [userInput, data]);

  const shouldDisplay = (label: any, searchKeyword: string) => {
    if (!_.trim(searchKeyword)) {
      return true;
    }
    const keyword = searchKeyword.toLocaleLowerCase();
    if (typeof label === 'string') {
      return label.toLocaleLowerCase().indexOf(keyword) >= 0;
    }
    // if (React.isValidElement(label)) {
    //   const nodes = reactToString(label);
    //   return nodes.join('').toLocaleLowerCase().indexOf(keyword) >= 0;
    // }
    return false;
  };

  function removeObjects(content) {
    return content.reduce((arr, obj) => {
      if (!obj.visible) {
        return arr;
      }
      if (obj['children'] && obj['children'].length) {
        arr.push({ ...obj, children: removeObjects(obj['children']) });
        return arr;
      }
      arr.push(obj);
      return arr;
    }, []);
  }

  const addNodesFromChildren = obj => {
    if (obj) {
      let newObj = _.cloneDeep(obj);
      newObj = newObj.map(element => {
        element.nodes = addNodesFromChildren(element.children);
        return element;
      });
      return newObj;
    }
    return null;
  };

  function handleUserSearchInput(value) {
    setUserInput(value);
  }

  const handleSortColumn = (sortColumnUpdated, sortTypeUpdated) => {
    if (sortColumnUpdated && sortTypeUpdated) {
      setEmptyMessage('');
      setLoading(true);
      setSortColumn(sortColumnUpdated);
      setSortType(sortTypeUpdated);
      sortData(sortColumnUpdated, sortTypeUpdated);
    }
  };

  const sortData = (sortColumnUpdated, sortTypeUpdated) => {
    const sortedData = treeData.sort((a, b) => {
      let x = a[sortColumnUpdated];
      let y = b[sortColumnUpdated];

      if (sortColumnUpdated === 'phase' || sortColumnUpdated === 'commonName') {
        if (typeof x === 'string' && typeof y === 'string') {
          x = x.toUpperCase();
          y = y.toUpperCase();
        }
        if (sortTypeUpdated === 'asc') {
          if (x > y) {
            return 1;
          }
          return -1;
        }

        if (sortTypeUpdated === 'desc') {
          if (x < y) {
            return 1;
          }
          return -1;
        }
      }

      if (sortColumnUpdated === 'phaseOutDate') {
        // todo
        x = new Date(x).getTime();
        y = new Date(y).getTime();
        if (sortTypeUpdated === 'asc') {
          if (x > y) {
            return 1;
          }
          return -1;
        }

        if (sortTypeUpdated === 'desc') {
          if (x < y) {
            return 1;
          }
          return -1;
        }
      }
      return 1;
    });

    // work around fix in order to update tree data
    setTreeData([]);
    setTimeout(() => {
      setTreeData(sortedData);
      setEmptyMessage('No data found');
      setLoading(false);
    }, 100);
  };

  return (
    <div>
      {isGadslYn ?
        <ContainerPagination>
          <Search>
            <Input
              className="gadsl-yn-search-component"
              type="text"
              onChangeInput={handleUserSearchInputGadslYn}
              prefixIcon={<SearchIcon />}
              defaultText={userInputGadslYn}
              autoFocus={autoFocus}
              placeholder="Search here"
            />
          </Search>
          <Pagination>
            <PaginationAnt
              current={paginationInfo?.CurrentPage}
              totalPage={paginationInfo?.TotalCount}
              pageSizeTotal={paginationInfo?.PageSize}
              selectPageSize
              handleClick={onHandlePagination}
              handlePageChange={pageSize => {
                if (onHandlePageChange) {
                  onHandlePageChange(pageSize);
                }
              }}
            />
          </Pagination>
        </ContainerPagination> :
        <div className="search-container">
          <Search>
            {inputSearchComponent}
          </Search>
        </div>}

      <Table
        rowHeight={rowHeight}
        isTree
        defaultExpandAllRows
        bordered
        cellBordered
        rowKey="id"
        height={400}
        data={treeData}
        shouldUpdateScroll={false}
        renderTreeToggle={(icon, rowData) => {
          if (rowData?.children && rowData?.children.length === 0) {
            return icon;
          }
          return icon;
        }}
        onSortColumn={handleSortColumn}
        loading={loading}
        sortColumn={sortColumn}
        sortType={sortType}
        locale={{ emptyMessage: emptyMesssage }}
      >
        {customColumns && customColumns()}
        {columns.map(item => {
          switch (item.type) {
            case 'edit':
              return (
                <Column width={item.width}>
                  <HeaderCell>{item.header}</HeaderCell>
                  <Cell className={item.class}>
                    {rowData => {
                      return item.editable(rowData) ? (
                        <InputContainerAntd className="input-number">
                          <Input
                            className="input-casnum"
                            type="text"
                            onChangeInput={value =>
                              item.onChangeField &&
                              item.onChangeField(
                                rowData[item.idKey],
                                value,
                                item.dataKey,
                                rowData
                              )
                            }
                            onBlurInput={value =>
                              item.onBlur &&
                              item.onBlur(rowData[item.idKey], value)
                            }
                            onKeyUpInput={(e: any) =>
                              item.onKeyUp && item.onKeyUp(e)
                            }
                            defaultText={rowData[item.dataKey]}
                            {...item.fieldProps}
                            tabIndex={0}
                          />
                        </InputContainerAntd>
                      ) : (
                        <Cell dataKey={item.dataKey} />
                      );
                    }}
                  </Cell>
                </Column>
              );

            case 'editText':
              return (
                <Column width={item.width}>
                  <HeaderCell>{item.header}</HeaderCell>
                  <Cell className={item.class}>
                    {rowData => {
                      return item.editable(rowData) ? (
                        <InputContainerAntd>
                          <Input
                            className="input-text"
                            type="text"
                            onChangeInput={value =>
                              item.onChangeField &&
                              item.onChangeField(
                                rowData[item.idKey],
                                value,
                                item.dataKey,
                                rowData
                              )
                            }
                            onBlurInput={value =>
                              item.onBlur &&
                              item.onBlur(rowData[item.idKey], value)
                            }
                            onKeyUpInput={(e: any) =>
                              item.onKeyUp && item.onKeyUp(e)
                            }
                            defaultText={rowData[item.dataKey]}
                            {...item.fieldProps}
                            tabIndex={0}
                          />
                        </InputContainerAntd>
                      ) : (
                        <Cell dataKey={item.dataKey} />
                      );
                    }}
                  </Cell>
                </Column>
              );

            case 'editTextArea':
              return (
                <Column width={item.width}>
                  <HeaderCell>{item.header}</HeaderCell>
                  <Cell className={item.class} dataKey={item.dataKey}>
                    {rowData => {
                      return item.editable(rowData) ? (
                        <SectionTextArea>
                          <InputContainerAntd>
                            <Input
                              className="input-text"
                              type="textarea"
                              tabIndex={0}
                              defaultText={rowData[item.dataKey]}
                              onChangeInput={value => {
                                if (item.onChangeField) {
                                  item.onChangeField(
                                    rowData[item.idKey],
                                    value,
                                    item.dataKey,
                                    rowData
                                  );
                                }
                              }}
                              onBlurInput={value =>
                                item.onBlur &&
                                item.onBlur(
                                  rowData[item.idKey],
                                  value
                                )
                              }
                              onKeyUpInput={(e: any) =>
                                item.onKeyUp && item.onKeyUp(e)
                              }
                              {...item.fieldProps}
                              resize="none"
                              borderRadius="0px"
                            />
                          </InputContainerAntd>
                        </SectionTextArea>
                      ) : (
                        <SectionTextArea>
                          <InputContainer>
                            <TextArea
                              rows={1}
                              className="input-text"
                              tabIndex={-1}
                            />
                          </InputContainer>
                        </SectionTextArea>
                      );
                    }}
                  </Cell>
                </Column>
              );

            case 'editDate':
              return (
                <Column width={item.width}>
                  <HeaderCell>{item.header}</HeaderCell>
                  <Cell className={item.class} dataKey={item.dataKey}>
                    {rowData => {
                      return item.editable && item.editable(rowData) ? (
                        <SectionInput>
                          <ContainerDate>
                            <DatePicker
                              format={process.env.REACT_APP_DATE_FORMAT}
                              defaultValue={
                                rowData[item.dataKey] &&
                                Moment(rowData[item.dataKey]).toDate()
                              }
                              onChange={e =>
                                item.onChangeField &&
                                item.onChangeField(
                                  rowData[item.idKey],
                                  Moment.utc(Moment(e).utc()).format(),
                                  item.dataKey,
                                  rowData
                                )
                              }
                            />
                          </ContainerDate>
                        </SectionInput>
                      ) : null;
                    }}
                  </Cell>
                </Column>
              );

            case 'editPhase':
              return (
                <Column width={item.width}>
                  <HeaderCell>{item.header}</HeaderCell>
                  <Cell className={item.class} dataKey={item.dataKey}>
                    {rowData => {
                      return item.editable && item.editable(rowData) ? (
                        <SectionInput>
                          <ContainerPhase>
                            <SelectPhase
                              defaultValue={rowData[item.dataKey]}
                              onChange={e =>
                                item.onChangeField &&
                                item.onChangeField(
                                  rowData[item.idKey],
                                  e.target.value,
                                  item.dataKey,
                                  rowData
                                )
                              }
                            >
                              {item.optionsSelect?.map(x => {
                                return (
                                  <option value={x[item.idKey]}>
                                    {x[item.dataKey]}
                                  </option>
                                );
                              })}
                            </SelectPhase>
                          </ContainerPhase>
                        </SectionInput>
                      ) : null;
                    }}
                  </Cell>
                </Column>
              );

            case 'view-link':
              return (
                <Column
                  width={item.width}
                  sortable={
                    loading || treeData == null || treeData?.length === 0
                      ? false
                      : item.headerSort
                  }
                >
                  <HeaderCell>{item.header}</HeaderCell>
                  <Cell className={item.class} dataKey={item.sortKey}>
                    {rowData => {
                      if (rowData.type === 'Substance') {
                        linkSubstance = `/substance/${rowData.id}`;
                      }

                      return (
                        <SectionTextAreaView>
                          <InputContainer>
                            {rowData.type === 'Substance' ?
                              <ContainerSubstanceName>
                                <LinkSubstance href={linkSubstance}>
                                  <TextAreaClickable
                                    readOnly
                                    defaultValue={
                                      item.formatData
                                        ? item.formatData(rowData[item.dataKey])
                                        : rowData[item.dataKey]
                                    }
                                    rows={2}
                                    className="input-text"
                                    tabIndex={-1}
                                    onClick={() => {
                                      item.clickLink(
                                        rowData[item.idKey],
                                        rowData,
                                        event
                                      );
                                    }}
                                  />
                                </LinkSubstance>
                              </ContainerSubstanceName> :
                              <TextArea
                                readOnly
                                defaultValue={
                                  item.formatData
                                    ? item.formatData(rowData[item.dataKey])
                                    : rowData[item.dataKey]
                                }
                                rows={2}
                                className="input-text"
                                tabIndex={-1}
                              />}
                          </InputContainer>
                        </SectionTextAreaView>
                      );
                    }}
                  </Cell>
                </Column>
              );

            case 'view':
              return (
                <Column
                  width={item.width}
                  flexGrow={item.flexGrow}
                  sortable={
                    loading || treeData == null || treeData?.length === 0
                      ? false
                      : item.headerSort
                  }
                >
                  <HeaderCell>{item.header}</HeaderCell>
                  <Cell className={item.class} dataKey={item.sortKey}>
                    {rowData => {
                      return (
                        <SectionTextAreaView>
                          <InputContainer>
                            <TextArea
                              readOnly
                              defaultValue={
                                item.formatData
                                  ? item.formatData(rowData[item.dataKey])
                                  : rowData[item.dataKey]
                              }
                              rows={2}
                              className="input-text"
                              tabIndex={-1}
                            />
                          </InputContainer>
                        </SectionTextAreaView>
                      );
                    }}
                  </Cell>
                </Column>
              );

            case 'viewFlex':
              return (
                <Column
                  flexGrow={item.flexGrow}
                  sortable={
                    loading || treeData == null || treeData?.length === 0
                      ? false
                      : item.headerSort
                  }
                >
                  <HeaderCell>{item.header}</HeaderCell>
                  <Cell className={item.class} dataKey={item.sortKey}>
                    {rowData => {
                      return (
                        <SectionTextAreaView>
                          <InputContainer>
                            <TextArea
                              readOnly
                              defaultValue={
                                item.formatData
                                  ? item.formatData(rowData[item.dataKey])
                                  : rowData[item.dataKey]
                              }
                              rows={4}
                              className="input-text"
                              tabIndex={-1}
                            />
                          </InputContainer>
                        </SectionTextAreaView>
                      );
                    }}
                  </Cell>
                </Column>
              );

            case 'viewComments':
              return (
                <Column width={item.width} flexGrow={item.flexGrow}>
                  <HeaderCell>{item.header}</HeaderCell>
                  <Cell className={item.class}>
                    {rowData => {
                      return (
                        <SectionTextAreaView>
                          <InputContainer>
                            <TextArea
                              readOnly
                              defaultValue={
                                item.formatData
                                  ? item.formatData(rowData[item.dataKey])
                                  : rowData[item.dataKey]
                              }
                              rows={2}
                              className="input-text"
                              tabIndex={-1}
                            />
                          </InputContainer>
                        </SectionTextAreaView>
                      );
                    }}
                  </Cell>
                </Column>
              );

            default:
              return (
                <Column>
                  <HeaderCell> </HeaderCell>
                  <Cell />
                </Column>
              );
          }
        })}
      </Table>
    </div>
  );
};

export default TableTree;
