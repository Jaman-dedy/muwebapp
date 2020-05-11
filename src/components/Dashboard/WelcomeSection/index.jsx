import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import LoaderComponent from 'components/common/Loader';

const WelcomeBar = ({ loading, children, style }) => {
  return (
    <div
      className="white welcome flex flex-center  align-items-center large-text"
      style={style}
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
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.node,
  ]),
};
WelcomeBar.defaultProps = {
  loading: false,
  children: 'Welcome',
};
export default WelcomeBar;
