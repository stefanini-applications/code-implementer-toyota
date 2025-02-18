import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ScrollTopButton from '../../components/ScrollTopButton';
import Tabs from '../../components/Tabs';
import { ToastError } from '../../components/Toast/index';
import selectAdminTabs from '../../mocks/select-admin';
import history from '../../routes/history';
import {
  selectors as selectorsAdmin,
  setAdminTab
} from '../../store/modules/admin/actions';
import {
  getLegislationsPaginationInfo,
  selectors as selectorsLeg
} from '../../store/modules/legislations/actions';
import {
  getRegulationsPaginationInfo,
  selectors as selectorsReg
} from '../../store/modules/regulations/actions';
import {
  getSubstancesPaginationInfo,
  selectors as selectorsSubCls
} from '../../store/modules/substances/actions';
import loadUserDataOnStorage from '../../utils/userData';
import Activity from './components/activity';
import Legislation from './components/Legislation';
import Lists from './components/lists';
import Regulation from './components/regulation';
import RegulatoryBody from './components/regulatoryBody';
import SubJurisdiction from './components/subJurisdiction';
import Substance from './components/substance';
import SubstanceUse from './components/substanceUse';
import Templates from './components/Templates';
import Users from './components/users';
import {
  ArrowDown,
  BreadCrumbs,
  BreadCrumbsWrapper,
  Container,
  ContainerTable,
  CurrentPage,
  HeaderContainer,
  TabsWrapper,
  Title,
  TitleContainer
} from './styled';

const AdminPage: React.FC = () => {
  const [activeIndex] = useState(0);
  const isItemSelected = useRef(false);
  const tabInfo = useSelector(selectorsAdmin.tabInfo);
  const timeStampNav = parseInt(localStorage.getItem('admin.timestamp') || '0', 10);
  const [userRole, setUserRole] = useState(localStorage.getItem('user.role'));
  const [switchTabs, setSwitchTabs] = useState(Number(localStorage.getItem('admin.tabId')) || 1);
  const dispatch = useDispatch();

  const paginationInfoLeg = useSelector(selectorsLeg.legislationsPaginationInfo);
  const paginationInfoReg = useSelector(selectorsReg.regulationsPaginationInfo);
  const paginationInfoSub = useSelector(selectorsSubCls.substancesPaginationInfo);

  useEffect(() => {
    loadUserDataOnStorage().then(() => {
      if (localStorage.getItem('user.role') !== 'Admin') {
        history.push('/');
        ToastError('User not allowed to access this page.');
      }
    });

  }, []);

  const handleTabSwitch = (newActiveKey: string) => {
    // {"TotalCount":50,"PageSize":10,"CurrentPage":2,"TotalPages":5}
    dispatch(
      getSubstancesPaginationInfo({
        TotalCount: 1,
        PageSize: 10,
        CurrentPage: 1,
        TotalPages: paginationInfoSub.TotalPages
      })
    );
    dispatch(
      getRegulationsPaginationInfo({
        TotalCount: 1,
        PageSize: 10,
        CurrentPage: 1,
        TotalPages: paginationInfoReg.TotalPages
      })
    );
    dispatch(
      getLegislationsPaginationInfo({
        TotalCount: 1,
        PageSize: 10,
        CurrentPage: 1,
        TotalPages: paginationInfoLeg.TotalPages
      })
    );
    setSwitchTabs(Number(newActiveKey));
  };

  useEffect(() => {
    return () => {
      if (!isItemSelected.current) {
        dispatch(
          setAdminTab({
            tabId: switchTabs,
            timeStamp: new Date().valueOf()
          })
        );
      }
    };
  }, [isItemSelected.current]);

  const onItemSelected = () => {
    isItemSelected.current = true;
    localStorage.setItem('admin.tabId', switchTabs.toString());
    dispatch(
      setAdminTab({
        tabId: switchTabs,
        timeStamp: timeStampNav
      })
    );
  };

  return (
    <Container>
      <ScrollTopButton />
      <HeaderContainer>
        <BreadCrumbsWrapper>
          <BreadCrumbs href="/">Home</BreadCrumbs>
          <ArrowDown />
          <CurrentPage>Admin</CurrentPage>
        </BreadCrumbsWrapper>
      </HeaderContainer>

      <TitleContainer>
        <Title>Admin Page</Title>
      </TitleContainer>

      <Tabs type="card" activeKey={switchTabs.toString()} items={selectAdminTabs} onChange={handleTabSwitch} />

      <ContainerTable>
        {switchTabs === 1 ? (
          <Substance onItemSelected={onItemSelected} />
        ) : null}
        {switchTabs === 3 ? <SubstanceUse /> : null}
        {switchTabs === 4 ? (
          <Legislation onItemSelected={onItemSelected} />
        ) : null}
        {switchTabs === 5 ? <SubJurisdiction /> : null}
        {switchTabs === 6 ? (
          <Regulation onItemSelected={onItemSelected} />
        ) : null}
        {switchTabs === 7 ? <RegulatoryBody /> : null}
        {switchTabs === 8 ? <Templates onItemSelected={onItemSelected} /> : null}
        {switchTabs === 9 ? <Lists /> : null}
        {switchTabs === 10 ? <Users /> : null}
        {switchTabs === 11 ? <Activity /> : null}
      </ContainerTable>
    </Container>
  );
};

export default AdminPage;
