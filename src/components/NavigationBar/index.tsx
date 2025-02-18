import React, { useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsFillDiamondFill } from 'react-icons/bs';
import { CgFileDocument } from 'react-icons/cg';
import { FaGavel } from 'react-icons/fa';
import { GoLaw } from 'react-icons/go';
import { HiOutlineTable, HiCog } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

import type { MenuProps } from 'antd';
import { Menu as AntdMenu } from 'antd';

import logo from '../../assets/logo.png';
import { translate } from '../../locales';
import history from '../../routes/history';
import loadUserDataOnStorage from '../../utils/userData';
import AdvancedSearch from '../AdvancedSearch';
import Menu from '../Menu';
import ModalSubstance from '../Modal/EditSubstance';
import ModalLegislation from '../Modal/ModalLegislation';
import ModalRegulation from '../Modal/ModalRegulation';
import SearchBar from '../SearchBar';
import {
  Container,
  Logo,
  SearchContainer,
  AdvancedLink,
  ButtonContainer,
  ClosableTouchable,
  TextButton,
  GroupNav,
  ContainerButton,
  Link,
  ContainerItems,
  ArrowDown,
  ArrowUp,
  LinkNav,
  ArrowDownReport,
  SubMenu
} from './styled';

const NavBar: React.FC = () => {
  const [openSubstanceModal, setOpenSubstanceModal] = useState(false);
  const [openRegulationModal, setOpenRegulationModal] = useState(false);
  const [openLegislationModal, setOpenLegislationModal] = useState(false);
  const [openNewButtons, setopenNewButtons] = useState(false);
  const [openAdvanced, setOpenAdvanced] = useState(false);
  const [userRole, setUserRole] = useState(localStorage.getItem('user.role'));
  const [iconMenu, setIconMenu] = useState(<ArrowDown />);
  const [menuKey, setMenuKey] = useState<any>();

  const onClick: MenuProps['onClick'] = async (e: any) => {
    const ctrl = e.domEvent.ctrlKey;
    switch (e?.key) {
      case '1.1':
        if (ctrl) {
          setMenuKey(e?.key);
          window.open('/report', '_blank');
          setTimeout(() => {
            setMenuKey('');
          }, 1000);
        } else {
          history.push('/report');
        }
        break;

      case '1.2':
        if (ctrl) {
          setMenuKey(e?.key);
          window.open('/priority-report', '_blank');
          setTimeout(() => {
            setMenuKey('');
          }, 1000);
        } else {
          history.push('/priority-report');
        }
        break;

      case '2':
        if (ctrl) {
          setMenuKey(e?.key);
          window.open('/changelog', '_blank');
          setTimeout(() => {
            setMenuKey('');
          }, 1000);
        } else {
          history.push('/changelog');
        }
        break;

      case '3':
        if (ctrl) {
          setMenuKey(e?.key);
          window.open('/listing', '_blank');
          setTimeout(() => {
            setMenuKey('');
          }, 1000);
        } else {
          history.push('/listing');
        }
        break;

      case '4':
        if (ctrl) {
          setMenuKey(e?.key);
          localStorage.setItem('admin.timestamp', `${new Date().valueOf()}`);
          localStorage.setItem('admin.tabId', '1');
          window.open('/admin', '_blank');
          setTimeout(() => {
            setMenuKey('');
          }, 1000);
        } else {
          localStorage.setItem('admin.tabId', '1');
          localStorage.setItem('admin.timestamp', `${new Date().valueOf()}`);
          history.push('/admin');
        }
        break;
      case '5':
        if (ctrl) {
          setMenuKey(e?.key);
          window.open('/priority-heatmap', '_blank');
          setTimeout(() => {
            setMenuKey('');
          }, 1000);
        } else {
          history.push('/priority-heatmap');
        }
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    loadUserDataOnStorage().then(() => {
      setUserRole(localStorage.getItem('user.role'));
    });
  }, []);

  function handleCloseAdvancedSearch() {
    setOpenAdvanced(false);
    document.body.classList.remove('hide-overflow');
  }

  function handleCloseOpenNew() {
    setopenNewButtons(!openNewButtons);
    const closableNew = document.getElementById('close-new');
    // eslint-disable-next-line no-unused-expressions
    openNewButtons == false
      ? (closableNew!.style.display = 'inherit')
      : (closableNew!.style.display = 'none');
  }

  const handleClickMenu = e => {
    if (e.length > 0) {
      setIconMenu(<ArrowUp />);
    } else {
      setIconMenu(<ArrowDown />);
    }
  };

  const handleClickItem = e => {
    switch (e.key) {
      case 'substance':
        setOpenSubstanceModal(true);
        break;

      case 'regulation':
        setOpenRegulationModal(true);
        break;

      case 'legislation':
        setOpenLegislationModal(true);
        break;

      default:
        break;
    }
  };

  const selectedMenuKey =
    history.location.pathname === '/report'
      ? '1.1'
      : history.location.pathname === '/priority-report'
      ? '1.2'
      : history.location.pathname === '/changelog'
      ? '2'
      : history.location.pathname === '/listing' ||
        history.location.pathname.includes('viewListing')
      ? '3'
      : history.location.pathname === '/admin'
      ? '4'
      : history.location.pathname === '/priority-heatmap'
      ? '5'
      : 'none';

  return (
    <>
      {/* <ContainerBackground /> */}

      <Container>
        <ContainerItems>
          {openSubstanceModal && (
            <ModalSubstance
              open={openSubstanceModal}
              close={() => setOpenSubstanceModal(false)}
              modalTitle={translate('header.newSubstance')}
            />
          )}
          {openRegulationModal && (
            <ModalRegulation
              open={openRegulationModal}
              close={() => setOpenRegulationModal(false)}
              modalTitle={translate('pages.regulations.newRegulation')}
            />
          )}
          {openLegislationModal && (
            <ModalLegislation
              open={openLegislationModal}
              close={() => setOpenLegislationModal(false)}
              modalTitle={translate('pages.legislations.newLegislation')}
            />
          )}

          <GroupNav>
            <Link href="/">
              <Logo src={logo} alt="logo" />
            </Link>
            <AntdMenu
              onClick={onClick}
              mode="horizontal"
              selectedKeys={[selectedMenuKey]}
              style={{
                background: '#FAFAFA',
                border: 'none',
                flex: '1 1 0',
                minWidth: '354px'
              }}
            >
              <SubMenu
                key={menuKey === '1' ? '1none' : '1'}
                title={<TextButton>Reports</TextButton>}
                icon={<ArrowDownReport />}
              >
                <AntdMenu.Item key={menuKey === '1.1' ? '1.1none' : '1.1'}>
                  <TextButton>Legislation / Regulation Report</TextButton>
                </AntdMenu.Item>
                <AntdMenu.Item key={menuKey === '1.2' ? '1.2none' : '1.2'}>
                  <TextButton>Priority Report</TextButton>
                </AntdMenu.Item>
              </SubMenu>
              <AntdMenu.Item key={menuKey === '5' ? '5none' : '5'}>
                <TextButton>Priority Heatmap</TextButton>
              </AntdMenu.Item>

              <AntdMenu.Item key={menuKey === '3' ? '3none' : '3'}>
                <TextButton>Listings</TextButton>
              </AntdMenu.Item>
              <AntdMenu.Item key={menuKey === '2' ? '2none' : '2'}>
                <TextButton>Changelog</TextButton>
              </AntdMenu.Item>
              {userRole == 'Admin' && (
                <AntdMenu.Item key={menuKey === '4' ? '4none' : '4'}>
                  <TextButton>Admin</TextButton>
                </AntdMenu.Item>
              )}
            </AntdMenu>
          </GroupNav>

          <SearchContainer>
            <SearchBar />
            <AdvancedLink
              type="button"
              onClick={() => {
                setOpenAdvanced(true);
                document.body.classList.add('hide-overflow');
              }}
            >
              {translate('components.searchBar.advancedSearch')}
            </AdvancedLink>
            {openAdvanced && (
              <AdvancedSearch close={handleCloseAdvancedSearch} />
            )}
          </SearchContainer>

          <ButtonContainer>
            <ClosableTouchable
              id="close-new"
              onClick={() => handleCloseOpenNew()}
            />
            {userRole == null || userRole == 'Read-only' ? null : (
              <ContainerButton>
                <Menu
                  tooltip={
                    userRole == null || userRole == 'Read-only'
                      ? `User role not authorized to open: Read-only`
                      : undefined
                  }
                  styling="button"
                  onClickItem={handleClickItem}
                  onClickMenu={handleClickMenu}
                  disabled={userRole == null || userRole == 'Read-only'}
                  items={[
                    {
                      label: 'New',
                      key: 'SubMenu',
                      icon: iconMenu,
                      children: [
                        {
                          label: 'Substance',
                          key: 'substance',
                          icon: <BsFillDiamondFill />
                        },
                        {
                          label: 'Regulation',
                          key: 'regulation',
                          icon: <FaGavel />
                        },
                        {
                          label: 'Legislation',
                          key: 'legislation',
                          icon: <GoLaw />
                        }
                      ]
                    }
                  ]}
                />
              </ContainerButton>
            )}
          </ButtonContainer>
        </ContainerItems>
      </Container>
    </>
  );
};

export default NavBar;
