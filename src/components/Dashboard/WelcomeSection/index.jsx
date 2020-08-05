/* eslint-disable */
import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';
import { closeProfileDropDown } from 'redux/actions/dashboard/dashboard';
import LoaderComponent from 'components/common/Loader';

const WelcomeBar = ({ loading, children, style }) => {
  const dispatch = useDispatch();
  const { open } = useSelector(
    ({ dashboard }) => dashboard.profileDropDown,
  );
  return isAppDisplayedInWebView() ? null : (
    <div
      onClick={() => {
        if (open) {
          closeProfileDropDown(dispatch);
        }
      }}
    >
      {!loading && children}
      {loading && (
        <LoaderComponent
          loaderContent={global.translate('Working...', 412)}
        />
      )}
    </div>
  );
};
WelcomeBar.propTypes = {
  loading: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.node,
  ]),
};
WelcomeBar.defaultProps = {
  loading: false,
  children: 'Welcome',
  style: {},
};
export default WelcomeBar;
