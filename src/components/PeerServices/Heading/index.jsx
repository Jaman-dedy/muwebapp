/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import {
  Container,
  Input,
  Button,
  Icon,
  Form,
  Select,
} from 'semantic-ui-react';
import queryString from 'query-string';
import './style.scss';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import useCurrentCountry from 'hooks/useCurrentCountry';
import useWindowSize from 'utils/useWindowSize';
import CountryFilter from '../FilterMenus';
import SearchView from '../Search';

const SearchInput = () => {
  const { data: categories } = useSelector(
    ({ peerServices: { categories } }) => categories,
  );

  const history = useHistory();
  const [form, setForm] = useState(
    global.translate('All Categories'),
  );
  const location = useLocation();

  const params = queryString.parse(location.search);

  const handleSearch = () => {
    history.replace({
      pathname: '/market-place/results',
      search: `?keyword=${form.keyword ||
        ''}&categories=${form.category ||
        'all'}&proximity=${params.proximity ||
        ''}&countries=${params.countries || ''}`,
    });
  };

  const options = [
    {
      key: 'all',
      value: 'all',
      text: `-${global.translate('All Categories')}-`,
    },
    ...categories.map(item => ({
      key: item?.Category,
      value: item?.Category,
      text: item?.CategoryName,
    })),
  ];

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    if (params.categories && Array.isArray(categories)) {
      setForm({
        ...form,
        category: options?.[Number(params.categories) + 1]?.value,
      });
    }
  }, [params.categories, categories]);

  useEffect(() => {
    if (params?.keyword?.length > 2) {
      setForm({
        ...form,
        keyword: params.keyword,
      });
    }
  }, []);

  return (
    <div id="search-input-wrapper">
      <Input
        placeholder={global.translate('Search here...')}
        name="keyword"
        value={form.keyword}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className="input"
      />

      <div className="category-search-btn">
        <Form.Input
          name="category"
          onChange={onChange}
          control={Select}
          value={form.category}
          search
          placeholder={global.translate('All Categories')}
          className="category-drop-down"
          id="category-drop-down"
          options={options}
        />

        <Button className="search-btn" icon onClick={handleSearch}>
          <Icon name="search" />
        </Button>
      </div>
    </div>
  );
};

const HomepageHeading = ({ disableSearch, title }) => {
  const { data: user } = useSelector(
    ({ user: { userData } }) => userData,
  );

  const { width } = useWindowSize();

  const [
    isSearchingInLocalCountry,
    setIsSearchingInLocalCountry,
  ] = useState(true);

  useCurrentCountry();

  const history = useHistory();

  const params = queryString.parse(history.location.search);

  const [currentFilter, setCurrentFilter] = useState(
    global.translate('Filter by proximity'),
  );

  const [isFilterActive, setIsFilterActive] = useState(false);

  const [
    countriesCurrentFilter,
    setCountriesCurrentFilter,
  ] = useState(
    localStorage.countryName || global.translate('Select Country'),
  );
  const filterOptions = [
    {
      key: '10',
      text: global.translate('Below 10 kilometers', 1863),
      value: '10',
    },
    {
      key: '25',
      text: global.translate('Below 25 kilometers', 1862),
      value: '25',
    },
    {
      key: '50',
      text: global.translate('Below 50 kilometers', 1861),
      value: '50',
    },
    {
      key: '500',
      text: global.translate('Above 50 kilometers'),
      value: '500',
    },
  ];

  useEffect(() => {
    if (params.proximity) {
      setIsFilterActive(true);
      setCurrentFilter(
        filterOptions.find(item => item?.value === params.proximity)
          ?.text || global.translate('Filter by proximity', 1860),
      );
    } else {
      setIsFilterActive(false);
    }
  }, [params.proximity]);

  const {
    supportedCountries: { data: appCountries },
  } = useSelector(({ countries }) => countries);

  const onProximitySet = values => {
    history.replace({
      pathname: '/market-place/results',
      search: `?keyword=${params.keyword ||
        ''}&categories=${params.categories ||
        'all'}&countries=${localStorage.countryName ||
        ''}&proximity=${Object.keys(values)[0]}`,
    });
  };

  useEffect(() => {
    if (params.countries) {
      if (
        params.countries === 'all' ||
        params.countries === localStorage.countryName
      ) {
        setIsFilterActive(false);
        setCountriesCurrentFilter(
          localStorage.countryName ||
            global.translate('Country', 275),
        );
      } else {
        setIsFilterActive(true);
        setCountriesCurrentFilter(params.countries);
      }
    }
  }, [params.countries]);

  useEffect(() => {
    if (params.countries) {
      if (
        params.countries === 'all' ||
        (params.countries?.split(',').length === 1 &&
          params.countries.length > 3)
      ) {
        setIsSearchingInLocalCountry(true);
        setIsFilterActive(false);
      } else if (
        params.countries?.split(',').length > 1 ||
        !params.countries
          ?.split(',')
          .includes(localStorage.countryCode)
      ) {
        setIsSearchingInLocalCountry(false);
        setIsFilterActive(true);
      } else {
        setIsSearchingInLocalCountry(true);
        setIsFilterActive(false);
      }
    }
  }, [params.countries]);

  const countriesSelected = values => {
    const countries = [];
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        if (values[key]) {
          countries.push(key);
        }
      }
    }

    history.replace({
      pathname: '/market-place/results',
      search: `?keyword=${params.keyword ||
        ''}&categories=${params.categories || 'all'}&countries=${
        countries.length > 0
          ? countries
              .filter(i => i.length < 3)
              .join(',')
              .toLowerCase()
          : 'all'
      }&proximity=${params.proximity || ''}`,
    });
  };

  const clearFilters = () => {
    setIsSearchingInLocalCountry(true);
    setIsFilterActive(false);
    history.replace({
      pathname: '/market-place/results',
      search: `?keyword=''&categories=all&countries=${localStorage.countryName ||
        'Current Country'}&proximity=''`,
    });
  };
  return (
    <Container text id="search-view-area">
      <SearchView hideSearch={disableSearch} title={title} />
      {!disableSearch && (
        <>
          {' '}
          <SearchInput />
          <div className="filters">
            <CountryFilter
              text={countriesCurrentFilter}
              icon="world"
              direction={width > 678 ? 'left' : 'right'}
              options={
                appCountries?.map(item => ({
                  key: item?.CountryCode,
                  text: item?.CountryName,
                  value: item?.CountryCode,
                  selected:
                    item?.CountryName?.toLowerCase() ===
                    user?.CountryName?.toLowerCase(),
                })) || []
              }
              many
              onSelectionDone={countriesSelected}
            />

            {isSearchingInLocalCountry && (
              <CountryFilter
                text={currentFilter}
                icon="gitter"
                direction="left"
                options={
                  filterOptions?.map(item => ({
                    key: item?.key,
                    text: item?.text,
                    value: item?.value,
                    selected: false,
                  })) || []
                }
                many={false}
                onSelectionDone={onProximitySet}
              />
            )}

            {isFilterActive && (
              <Icon
                className="cursor-pointer  clear-filter"
                name="filter"
                size="large"
                onClick={clearFilters}
                style={{
                  zIndex: 5,
                  color: 'white',
                  marginTop: '15px',
                  marginLeft: '10px',
                }}
              />
            )}
          </div>
        </>
      )}
    </Container>
  );
};

HomepageHeading.propTypes = {
  disableSearch: PropTypes.bool,
};

HomepageHeading.defaultProps = {
  disableSearch: false,
};
export default HomepageHeading;
