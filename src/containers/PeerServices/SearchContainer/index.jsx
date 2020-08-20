import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchResultsComponent from 'components/PeerServices/SearchResults';
import getSupportedCountries from 'redux/actions/countries/getSupportedCountries';
import useSearchItems from './useSearchItems';

const SearchContainer = () => {
  const searchResults = useSearchItems();
  const dispatch = useDispatch();

  const {
    supportedCountries: { data: appCountries },
  } = useSelector(({ countries }) => countries);

  useEffect(() => {
    if (!appCountries) {
      getSupportedCountries()(dispatch);
    }
  }, []);

  return <SearchResultsComponent searchResults={searchResults} />;
};

SearchContainer.propTypes = {};

export default SearchContainer;
