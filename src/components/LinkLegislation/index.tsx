import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Collapse, CollapseProps, Row } from 'antd';
import { FaEye, FaTrashAlt } from 'react-icons/fa';
import TableAnt from '../Table';
import PaginationSearch from '../PaginationSearch';
import AddLinkLegislationModal from '../Modal/AddLinkLegislation';
import {
  selectors,
  getLinkedLegislationsRequest,
  deleteLinkedLegislationsRequest
} from '../../store/modules/linkedLegislations/actions';
import ViewLinkLegislation from './ViewLinkLegislation';
import { getOneLegislationRecordRequest, selectors as legislationSelector } from '../../store/modules/legislations/actions';
import PopupModal from '../Modal/PopupModal';
import { ConfirmBoxText } from './styled';



export interface ILinkedLegislation {
  legislationId: any;
}
const LinkLegislation: React.FC<ILinkedLegislation> = ({ legislationId }) => {
  const [open, setOpen] = useState(false);
  const [viewLegislationModal, setViewLegislationModal] = useState(false);
  const [deleteLegislationModal, setDeleteLegislationModal] = useState(false);
  const [itemsPerPageCount, setItemsPerPageCount] = useState(10);
  const userInput: any = useRef('');
  const [searchTerm, setSearchTerm] = useState<any>();
  const [controlRun, setControlRun] = useState(0);
  const [autoFocus, setAutoFocus] = useState(false);
  const [sortOrderCol1, setSortOrderCol1] = useState<any>(null);
  const [sortOrderCol2, setSortOrderCol2] = useState<any>(null);
  const [sortOrderCol3, setSortOrderCol3] = useState<any>(null);
  const [sortOrderCol4, setSortOrderCol4] = useState<any>(null);
  const [sortKey, setSortKey] = useState<any>('');
  const [sortClicked, setSortClicked] = useState<any>(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false)
  const viewLegislationData = useSelector(legislationSelector.oneLegislationRecord);
  const [linkToDelete, setLinkToDelete] = useState<any>(null);
  const userRole = localStorage.getItem('user.role');
  const sortOrderLookup = {
    type: { ascend: 'ASC', descend: 'DESC' },
    billTitle: { ascend: 'ASC', descend: 'DESC' },
    nickname: { ascend: 'ASC', descend: 'DESC' },
    jurisdiction: { ascend: 'ASC', descend: 'DESC' },
  };

  const direction = sortOrderLookup[sortKey]?.[sortOrderCol1] ?? 
  sortOrderLookup[sortKey]?.[sortOrderCol2] ?? 
  sortOrderLookup[sortKey]?.[sortOrderCol3] ??
  sortOrderLookup[sortKey]?.[sortOrderCol4] ?? '';

  const paginationInfo = useSelector(selectors.linkedLegislationsPaginationInfo);
  const links = useSelector(selectors.linkedLegislations);
  const dispatch = useDispatch();

  useEffect(() => {
    setControlRun(controlRun + 1);
    if (controlRun === 1) {
      setLoadingTable(false);
    }
  }, [links]);

  useEffect(() => {
    if(legislationId){
      getData('', legislationId, 1, itemsPerPageCount, sortKey, direction);
    }
  }, [dispatch, legislationId, isDeleting]);

  useEffect(() => {
    if (sortClicked) {
      setSortClicked(false);
      getData(userInput.current, legislationId, 1, itemsPerPageCount, sortKey, direction);
    }    
  }, [sortClicked]);

  useEffect(() => {
    if (searchTerm !== null && searchTerm !== undefined && legislationId) {
      const delayDebounceFn = setTimeout(() => {
        getData(searchTerm, legislationId, 1, itemsPerPageCount, sortKey, direction);
        if (!autoFocus) {
        setAutoFocus(true);
      }
      }, 500);
      return () => {
        clearTimeout(delayDebounceFn);
        if (autoFocus && !searchTerm) {
          setAutoFocus(false);
        }
      };
    }
    return undefined;
  }, [searchTerm]);

  useEffect(() => {
    let lastScrollY = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) > 200) {
        setAutoFocus(false);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  function handleUserSearchInput(value) {
    setSearchTerm(value)
    userInput.current = value;
  }

  const handlePagination = (page, size) => {
    setItemsPerPageCount(size)
    getData(userInput.current, legislationId, page, size, sortKey, direction);
  };

  const getData = (search, legislation, pageNumber, pageSize, key, dir) => {
    setLoadingTable(true);
    setControlRun(1);
    dispatch(
      getLinkedLegislationsRequest({
        search,
        legislationId: legislation,
        pageNumber,
        pageSize,          
        sortKey: key,
        direction: dir
      })
    );
  }

  const removeLinkedLegislation = (record)=>{
    if(legislationId && record.regulationID){
      dispatch(deleteLinkedLegislationsRequest(
        { 
          "originRegulationID": Number(legislationId),
          "destRegulationID": Number(record.regulationID)
         }));
         setIsDeleting(true)
    }
    
  }
  
  
const columnsTable = [
  {
    title: 'Type',
    dataIndex: 'type',
    textWrap: 'word-break',
    ellipsis: true,
    sorter: (a, b) => {
      // do nothing
    }
  },
  {
    title: 'Legislation/Regulation Name',
    dataIndex: 'name',
    textWrap: 'word-break',
    ellipsis: true,
    render: (_text, record) => (
      <Link to={record.recordType === 1 ? `/regulation/${record.regulationID}` : `/legislation/${record.regulationID}`}>{record.name}</Link>
    ),
    sorter: (a, b) => {
      // do nothing
    },
    
  },
  {
    title: 'Nickname',
    dataIndex: 'nickname',
    textWrap: 'word-break',
    ellipsis: true,
    sorter: (a, b) => {
      // do nothing
    }
  },
  {
    title: 'Jurisdiction',
    dataIndex: 'jurisdiction',
    textWrap: 'word-break',
    ellipsis: true,
    sorter: (a, b) => {
      // do nothing
    }
  },
  {
    title: 'Action',
    textWrap: 'word-break',
    ellipsis: true,
    render: (record)=>{
        return(
            <>
            <Button onClick={ ()=> {
              setViewLegislationModal(true)
              dispatch(getOneLegislationRecordRequest({ id: record.regulationID }));
            } } style={{marginRight: '10px'}}> <FaEye/></Button>
            { userRole == null ||
                    userRole == 'Read-only' ? null :
            <Button onClick={()=>{
              setDeleteLegislationModal(true);
              setLinkToDelete(record);
            }}> <FaTrashAlt/></Button>
          }
            <ViewLinkLegislation 
            open={viewLegislationModal}
             handleCancel={ ()=> setViewLegislationModal(false)}
             legislationId={viewLegislationData?.id}
            legislationName={viewLegislationData?.billTitle}
            jurisdiction={viewLegislationData?.Jurisdiction?.description}
            phase={viewLegislationData?.phase}
            nickName={viewLegislationData?.nickname}
            subJurisdiction={viewLegislationData?.Agency?.description}
            status={viewLegislationData?.status}
            summary={viewLegislationData?.billEpaDocket}
            recordType={viewLegislationData?.recordType}
             />
             <PopupModal open={deleteLegislationModal} width={500} footer
              handleCancel={()=>setDeleteLegislationModal(false)}
              handleOk={()=> {
                setDeleteLegislationModal(false)
                removeLinkedLegislation(linkToDelete)
              }}
              okBtnText='Unlink'
              >
              <ConfirmBoxText>Are you sure you want to unlink this item?</ConfirmBoxText>
             </PopupModal>
        </>
        )
    },
  }
];

  const handleOnChange = (_pagination, _filters, sorter, _extra) => {
    switch (sorter.field) {
      case 'type':        
        setSortKey('type');
        setSortOrderCol1(sortOrderCol1 === 'ascend' || sortOrderCol1 === null ? 'descend' : 'ascend');
        setAutoFocus(false);
        setSortOrderCol2(null);
        setSortOrderCol3(null);
        setSortOrderCol4(null);
        break;
      case 'name':        
        setSortKey('name');
        setSortOrderCol2(sortOrderCol2 === 'ascend' || sortOrderCol2 === null ? 'descend' : 'ascend');
        setAutoFocus(false);
        setSortOrderCol1(null);
        setSortOrderCol3(null);
        setSortOrderCol4(null);
        break;
      case 'nickname':        
        setSortKey('nickname');
        setSortOrderCol3(sortOrderCol3 === 'ascend' || sortOrderCol3 === null ? 'descend' : 'ascend');
        setAutoFocus(false);
        setSortOrderCol1(null);
        setSortOrderCol2(null);
        setSortOrderCol4(null);
        break;
      case 'jurisdiction':        
        setSortKey('jurisdiction');
        setSortOrderCol3(sortOrderCol4 === 'ascend' || sortOrderCol4 === null ? 'descend' : 'ascend');
        setAutoFocus(false);
        setSortOrderCol1(null);
        setSortOrderCol2(null);
        setSortOrderCol3(null);
        break;
      default:
        break;
    }
    setSortClicked(true);        
  };

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Linked Legislations/Regulations',
      children: (
        <>
          <Row
            justify="end"
            style={{ marginTop: '10px', marginBottom: '10px' }}
          >
            { userRole == null ||
                    userRole == 'Read-only' ? null :
            <Col>
              <Button type="primary" onClick={() => setOpen(true)}>
                New Link
              </Button>
            </Col>
    }
          </Row>
          <Row justify="space-between">
            <Col span={24}>
              <PaginationSearch
                isSearchBar
                   onPaginationSearchChangeInput={handleUserSearchInput}
                   defaultPaginationSearchText={userInput?.current}
                   autoFocus={autoFocus}
                  current={paginationInfo?.CurrentPage}
                  totalPage={paginationInfo?.TotalCount}
                  pageSizeTotal={paginationInfo?.PageSize}
                  selectPageSize
                  handleClick={handlePagination}
                  handlePageChange={pageSize => {
                    setItemsPerPageCount(pageSize);
                  }}
              />
            </Col>
          </Row>
          <TableAnt
            rowKey="id"
            columnsTable={columnsTable}
            dataTable={links}
              loading={loadingTable}
              onChange={handleOnChange}
            locale={{
              triggerDesc: 'Click to sort descending',
              triggerAsc: 'Click to sort descending',
              cancelSort: 'Click to sort ascending'
            }}
          />
          <Row justify="space-between">
            <Col span={24}>
              <PaginationSearch
                   onPaginationSearchChangeInput={handleUserSearchInput}
                   defaultPaginationSearchText={userInput.current}
                   autoFocus={autoFocus}
                  current={paginationInfo?.CurrentPage}
                  totalPage={paginationInfo?.TotalCount}
                  pageSizeTotal={paginationInfo?.PageSize}
                  selectPageSize
                  handleClick={handlePagination}
                  handlePageChange={pageSize => {
                    setItemsPerPageCount(pageSize);
                  }}
              />
            </Col>
          </Row>
          <AddLinkLegislationModal
            open={open}
            title='Legislation Details'
            handleCancel={() => setOpen(false)}
            legislationId={legislationId}
          />
        </>
      )
    }
  ];

  return (
    <>
      <Collapse
        size="middle"
        items={items}
        // onChange={onChange}
      />
    </>
  );
};
export default LinkLegislation;
