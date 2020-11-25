import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getServiceList from 'redux/actions/peerServices/getServiceList';
import getMyServices from 'redux/actions/peerServices/getMyServices';

import { PAGINATION_ITEMS_PER_PAGE } from 'constants/general';
import getBookmarkedServiceList from 'redux/actions/peerServices/getBookmarkedServiceList';

export default () => {
  const dispatch = useDispatch();

  const { data, error, loading } = useSelector(
    ({ peerServices: { servicesList } }) => servicesList,
  );
  const { data: user } = useSelector(
    ({ user: { userData } }) => userData,
  );
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    bookMarkedServices: {
      data: { Data },
    },
  } = useSelector(({ peerServices }) => peerServices);

  const loadMyServices = () => {
    getMyServices({
      ServiceID: '',
      PID: user.PID,
      Categories: [],
      CountryCodes: [],
      Tags: [],
      FreeText: [],
      DistanceKms: '',
      Longitude: '',
      Latitude: '',
      PageNumber: '1',
      RecordPerPage: '20',
      CommentCount: '10',
      GettingRelated: 'NO',
      UserReview: user.PID,
    })(dispatch);
  };

  useEffect(() => {
    if (user) {
      loadMyServices();
    }
  }, [user]);

  useEffect(() => {
    if (Data?.length < 1) {
      if (user) {
        getBookmarkedServiceList({
          PageNumber: '1',
          RecordPerPage: '20',
        })(dispatch);
      }
    }
  }, [user, Data]);

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
    getServiceList(requestObj)(dispatch);
  }, [user?.PID]);

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
