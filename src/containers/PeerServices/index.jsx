import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HomepageLayout from 'components/PeerServices';
import getSupportedCountries from 'redux/actions/countries/getSupportedCountries';

const PeerServiceLandingPageContainer = () => {
  const dispatch = useDispatch();
  const {
    supportedCountries: { data: appCountries },
  } = useSelector(({ countries }) => countries);

  useEffect(() => {
    if (!appCountries) {
      getSupportedCountries()(dispatch);
    }
  }, [appCountries]);

  return <HomepageLayout />;
};

export default PeerServiceLandingPageContainer;
