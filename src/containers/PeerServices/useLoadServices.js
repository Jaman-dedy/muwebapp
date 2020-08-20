import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getServiceList from 'redux/actions/peerServices/getServiceList';

import { PAGINATION_ITEMS_PER_PAGE } from 'constants/general';
import isAuth from 'utils/isAuth';

export default () => {
  const dispatch = useDispatch();

  const { data, error, loading } = useSelector(
    ({ peerServices: { servicesList } }) => servicesList,
  );
  const { data: user, loading: loadingUser } = useSelector(
    ({ user: { userData } }) => userData,
  );
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const requestObj = {
    ServiceID: '',
    PID: '',
    UserReview: user?.PID,
    Categories: [],
    CountryCodes: localStorage.countryCode
      ? [localStorage.countryCode]
      : [],
    Tags: [],
    DistanceKms: '',
    Longitude: '',
    Latitude: '',
    PageNumber: currentPage.toString(),
    RecordPerPage: PAGINATION_ITEMS_PER_PAGE.toString(),
    FreeText: [],
    CommentCount: '10',
    GettingRelated: 'NO',
  };

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

  useEffect(() => {
    if (isAuth()) {
      if (!error && user) {
        getServiceList(requestObj)(dispatch);
      }
    } else {
      getServiceList(requestObj)(dispatch);
    }
  }, [loadingUser, user]);

  const loadMoreItems = useCallback(() => {
    if (!error) {
      getServiceList({
        ...requestObj,
        PageNumber: (currentPage + 1).toString(),
      })(dispatch);
    }
  }, []);

  return { data, loading, error, loadMoreItems, hasMore };
};
