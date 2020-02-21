import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import './style.scss';

const LoaderComponent = ({
  paddingTop,
  paddingBottom,
  loaderSize,
  loaderContent,
}) => (
  <div style={{ paddingTop, paddingBottom }}>
    <span className="loader-content">
      <span>{loaderContent} </span>{' '}
      <Loader
        size={loaderSize}
        active
        inline="centered"
        style={{ marginLeft: '10px' }}
      />
    </span>
  </div>
);

LoaderComponent.defaultProps = {
  paddingTop: '',
  paddingBottom: '',
  loaderSize: 'small',
  loaderContent: '',
};

LoaderComponent.propTypes = {
  paddingTop: PropTypes.string,
  paddingBottom: PropTypes.string,
  loaderSize: PropTypes.string,
  loaderContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.any,
  ]),
};

export default LoaderComponent;
