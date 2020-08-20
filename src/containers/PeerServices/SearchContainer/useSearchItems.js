import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import countries from 'utils/countries';
import searchPeerServices from 'redux/actions/peerServices/searchPeerServices';
import useGeoLocation from 'hooks/useGeoLocation';
import { PAGINATION_ITEMS_PER_PAGE } from 'constants/general';

export default () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { longitude, latitude } = useGeoLocation();

  const params = queryString.parse(location.search);

  const { data, loading, error } = useSelector(
    state => state.peerServices.searchResults,
  );

  const { data: user } = useSelector(state => state.user.userData);

  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const getUserCountryCode = () => {
    if (params.countries) {
      const countryFilter = params.countries.split(',');
      const filteredByLength = countryFilter.filter(
        item => item.length < 3,
      );
      const fullCountryNames = countryFilter.filter(
        item => item.length > 2,
      );

      if (fullCountryNames[0] === localStorage.countryName) {
        filteredByLength.push(localStorage.countryCode);
      }
      return filteredByLength;
    }

    if (localStorage.countryCode) {
      return [localStorage.countryCode];
    }

    const country =
      data && countries.find(item => item.text === data.CountryName);

    if (country) {
      return [country.key];
    }
    return [];
  };

  const searchCategories =
    params.categories === 'all' ? [] : [params.categories];

  const freeText =
    params?.keyword
      ?.split(' ')
      ?.filter(item => item.match(/^[a-z0-9]+$/i)) || [];

  const proximity =
    parseInt(params.proximity, 10) > 0 ? params.proximity : '';

  const requestObj = {
    ServiceID: '',
    PID: '',
    FreeText: freeText,
    Categories: searchCategories,
    CountryCodes: getUserCountryCode(),
    Tags: [],
    DistanceKms: proximity,
    Longitude: longitude?.toString() || '',
    Latitude: latitude?.toString() || '',
    PageNumber: currentPage.toString(),
    UserReview: user?.PID,
    CommentCount: '10',
    RecordPerPage: PAGINATION_ITEMS_PER_PAGE.toString(),
    GettingRelated: 'NO',
  };

  useEffect(() => {
    searchPeerServices(requestObj, {
      clearPreviousSearchResults: true,
    })(dispatch);
  }, [location.search]);

  useEffect(() => {
    if (data.Meta) {
      const { CurrentPage, TotalPages } = data.Meta;

      setCurrentPage(Number(CurrentPage));

      if (Number(TotalPages) > Number(CurrentPage)) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    }
  }, [data]);

  const loadMoreItems = () => {
    if (!error) {
      searchPeerServices({
        ...requestObj,
        PageNumber: (currentPage + 1).toString(),
      })(dispatch);
    }
  };

  return { data, loading, error, loadMoreItems, hasMore };
};
