import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getCategories from 'redux/actions/peerServices/getCategories';

export default () => {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    state => state.peerServices.categories,
  );

  useEffect(() => {
    if (data.length === 0) {
      getCategories({
        Language: localStorage.language || 'en',
        CountryCodes: localStorage.countryCode
          ? [localStorage.countryCode]
          : [],
        DistanceKms: '',
        Longitude: '',
        Latitude: '',
      })(dispatch);
    }
  }, [data]);

  return { data, loading, error };
};
