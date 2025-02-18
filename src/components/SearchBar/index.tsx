/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { BsFillDiamondFill } from 'react-icons/bs';
import { FaGavel } from 'react-icons/fa';
import { GoLaw } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { SearchOutlined } from '@ant-design/icons'

import history from '../../routes/history';
import {
  selectors,
  getSearchBarResultsRequest
} from '../../store/modules/searchBar/actions';
import useClickAway from '../../utils/useClickAway';
import {
  Container,
  AutocompleteGroup,
  NotFound,
  List,
  Item,
  Input,
  SearchSection,
  SectionTitle,
  SectionTitleWrapper,
  ContainerLoadingSearch,
  ContainerItemsList,
  LinkNav,
  FakeTabElement,
  SearchButton
} from './styled';

const SearchBar: React.FC = () => {
  const [filteredOptions, setFilteredOptions] = useState<any>([]);
  const [showOptions, setShowOptions] = useState(false);
  const listSearchBarResults = useSelector(selectors.searchBarResults);
  const suggestionsList: any = useRef();
  const fakeTab: any = useRef();
  const searchRef: any = useRef();
  const listRef: any = useRef([]);
  const [searchTerm, setSearchTerm] = useState<any>("");
  const dispatch = useDispatch();
  let optionsListComponent;

  useEffect(() => {
    setFilteredOptions(listSearchBarResults);
    onFilteredChange();
  }, [listSearchBarResults]);

  useClickAway(suggestionsList, () => {
    if (showOptions) setShowOptions(false);
  });


  useEffect(() => {
    if (searchTerm.length > 0) {
      const delayDebounceFn = setTimeout(() => {
        const doc = document.getElementById('loading-search-bar')
        if (doc) {
          document.getElementById('loading-search-bar')!.style.display = 'flex'
        }
        const input = searchTerm;
        dispatch(getSearchBarResultsRequest(input));
        const filtered = listSearchBarResults;
        setFilteredOptions(filtered);
        setShowOptions(true);
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }
    return undefined
  }, [searchTerm]);

  function handleUserInput(e: any) {
    setSearchTerm(e.target.value)
  }

  function handleEnterKeyDown() {
    setShowOptions(false);
    history.push(`/result?type=basic`, {
      text: searchTerm || '',
      timeStamp: new Date().valueOf(),
      startedSearch: true
    });
  }

  function handleControlEventKeyDown(event: any) {
    const tabElement = fakeTab.current as HTMLElement;
    const arrowElement = document.getElementsByClassName('handle-ref')[0] as HTMLElement;

    switch (event.key) {
      case 'Enter':
        handleEnterKeyDown();
        break;
      case 'Tab':
        currentTabIndex = 0;
        tabElement.focus();
        break;
      case 'ArrowDown':
        currentTabIndex = 0;
        event.preventDefault();
        arrowElement?.focus();
        break;
      default:
        break;
    }
  }

  let currentTabIndex = 0;

  const moveFocus = (up, flattenedFiltered) => {
    if (up) {
      currentTabIndex = currentTabIndex == 0 ? -1 : currentTabIndex - 1;
      searchRef.current.focus();
    } else {
      currentTabIndex = currentTabIndex == flattenedFiltered.length - 1 ? currentTabIndex : currentTabIndex + 1;
    }
    const elementController = flattenedFiltered[currentTabIndex];
    const listItem = listRef.current[elementController?.id];
    listItem?.focus();
  }

  function handleListKeyDown(event: any, flattenedFiltered: Array<Object>) {
    event.preventDefault();
    switch (event.key) {
      case 'Enter':
        event.target.click();
        setSearchTerm('');
        searchRef.current.value = '';
        break;
      case 'Tab':
        moveFocus(event.shiftKey, flattenedFiltered);
        break;
      case 'ArrowDown':
        moveFocus(false, flattenedFiltered);
        break;
      case 'ArrowUp':
        moveFocus(true, flattenedFiltered);
        break;
      default:
        break;
    }
  }

  const setListItemRef = (id) => {
    return function (el) {
      listRef.current[id] = el;
    }
  }

  const onFilteredChange = () => {
    const doc = document.getElementById('loading-search-bar')
    if (doc) {
      document.getElementById('loading-search-bar')!.style.display = 'none'
    }
  };

  if (showOptions && filteredOptions.length !== 0) {
    if (
      filteredOptions?.legislations?.length !== 0 ||
      filteredOptions?.regulations?.length !== 0 ||
      filteredOptions?.substances?.length !== 0
    ) {
      const arrayFiltered: Array<any> = Object.values(filteredOptions);
      const flattenedFiltered: Array<Object> = [].concat(...arrayFiltered);
      optionsListComponent =
        <List onKeyDown={() => { handleListKeyDown(event, flattenedFiltered) }}>
          <FakeTabElement href="/" ref={fakeTab} tabIndex={1}>
            <ContainerItemsList>
              {filteredOptions.regulations?.length !== 0 && (
                <SearchSection>
                  <SectionTitleWrapper>
                    <FaGavel />
                    <SectionTitle>Regulation</SectionTitle>
                  </SectionTitleWrapper>
                  {filteredOptions.regulations?.map((option: any) => {
                    return (
                      <LinkNav className='handle-ref' ref={setListItemRef(option.id)} tabIndex={flattenedFiltered.indexOf(option) + 1} to={`/regulation/${option.id}`}>
                        <Item
                          key={option.id}
                          value={option.billtitle}
                          onClick={() => {
                            setSearchTerm('');
                            searchRef.current.value = '';
                            history.push(`/regulation/${option.id}`);
                          }}
                        >
                          {option.billtitle}
                        </Item>
                      </LinkNav>
                    );
                  })}
                </SearchSection>
              )}
              {filteredOptions.legislations?.length !== 0 && (
                <SearchSection>
                  <SectionTitleWrapper>
                    <GoLaw />
                    <SectionTitle>Legislation</SectionTitle>
                  </SectionTitleWrapper>
                  {filteredOptions.legislations?.map((option: any) => {
                    return (
                      <LinkNav className='handle-ref' ref={setListItemRef(option.id)} tabIndex={flattenedFiltered.indexOf(option) + 1} to={`/legislation/${option.id}`}>
                        <Item
                          key={option.id}
                          value={`${option.billtitle} ${option.year}`}  // Concatenating year with title
                          onClick={() => {
                            setSearchTerm('');
                            searchRef.current.value = '';
                            history.push(`/legislation/${option.id}`);
                          }}
                        >
                         {option.billtitle} {option.year} {/* Displaying title with year */}
                        </Item>
                      </LinkNav>
                    );
                  })}
                </SearchSection>
              )}
              {filteredOptions.substances?.length !== 0 && (
                <SearchSection>
                  <SectionTitleWrapper>
                    <BsFillDiamondFill />
                    <SectionTitle>Substance</SectionTitle>
                  </SectionTitleWrapper>
                  {filteredOptions.substances?.map((option: any) => {
                    return (
                      <LinkNav className='handle-ref' ref={setListItemRef(option.id)} tabIndex={flattenedFiltered.indexOf(option) + 1} to={`/substance/${option.id}`}>
                        <Item
                          key={option.id}
                          value={option.commonname}
                          onClick={() => {
                            setSearchTerm('');
                            searchRef.current.value = '';
                            history.push(`/substance/${option.id}`);
                          }}
                        >
                          {option.casnumber} • {option.commonname}
                        </Item>
                      </LinkNav>
                    );
                  })}
                </SearchSection>
              )}
            </ContainerItemsList>
          </FakeTabElement>
          <ContainerLoadingSearch id="loading-search-bar">
            <AiOutlineLoading />
          </ContainerLoadingSearch>
        </List >

        ;
    } else {
      optionsListComponent = (
        <List>
          <NotFound>
            <li>No results found</li>
          </NotFound>
          <ContainerLoadingSearch id="loading-search-bar">
            <AiOutlineLoading />
          </ContainerLoadingSearch>
        </List>
      );
    }
  }

  return (
    <Container>
      <AutocompleteGroup ref={suggestionsList}>
        <Input
          type="text"
          placeholder="Search here..."
          onChange={handleUserInput}
          onKeyDown={e => handleControlEventKeyDown(e)}
          ref={searchRef}
        />
        <SearchButton disabled={searchTerm === ""} onClick={() => { handleEnterKeyDown() }}>
          <SearchOutlined />
        </SearchButton>
      </AutocompleteGroup>
      {optionsListComponent}
    </Container>
  );
};

export default SearchBar;