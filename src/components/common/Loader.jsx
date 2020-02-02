import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

const LoaderComponent = ({
  paddingTop,
  paddingBottom,
  loaderSize,
  loaderContent,
}) => (
  <div style={{ paddingTop, paddingBottom }}>
    <Segment vertical>
      <Dimmer active inverted>
        <Loader size={loaderSize} inverted content={loaderContent} />
      </Dimmer>
    </Segment>
  </div>
);

LoaderComponent.defaultProps = {
  paddingTop: '',
  paddingBottom: '',
  loaderSize: 'medium',
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
