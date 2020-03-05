import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import './style.scss';

const LoaderComponent = ({
  paddingTop,
  paddingBottom,
  loaderSize,
  loaderContent,
  style,
}) => (
  <div
    style={{ paddingTop, paddingBottom, ...style }}
    className="appLoader"
  >
    <span className="loader-content">
      <span>{global.translate(loaderContent)} </span>{' '}
      <Loader
        size={loaderSize}
        active
        className="app-loading"
        inline="centered"
        style={{ marginLeft: '10px' }}
      />
    </span>
  </div>
);

LoaderComponent.defaultProps = {
  paddingTop: '',
  paddingBottom: '',
  style: {},
  loaderSize: 'small',
  loaderContent: '',
};

LoaderComponent.propTypes = {
  paddingTop: PropTypes.string,
  paddingBottom: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
  loaderSize: PropTypes.string,
  loaderContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.any,
  ]),
};

export default LoaderComponent;
