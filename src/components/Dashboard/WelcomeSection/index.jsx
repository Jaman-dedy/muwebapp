import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import LoaderComponent from 'components/common/Loader';

const WelcomeBar = ({ loading, children }) => {
  return (
    <div className="white welcome flex flex-center  align-items-center large-text">
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
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
};
WelcomeBar.defaultProps = {
  loading: false,
  children: 'Welcome to 2u',
};
export default WelcomeBar;
