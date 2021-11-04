import React from 'react';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import classes from './GoBack.module.scss';

const GoBack = ({ onClickHandler, style, authentication }) => (
  <div
    className={
      (style && classes.CustomStyle) ||
      (authentication && classes.Authentication) ||
      classes.GoBack
    }
  >
    <button
      className={classes.goBackButton}
      onClick={onClickHandler}
      type="button"
    >
      <Icon name="long arrow alternate left" />{' '}
      {global.translate('Back')}
    </button>
  </div>
);

GoBack.propTypes = {
  onClickHandler: PropTypes.func,
  style: PropTypes.bool,
  authentication: PropTypes.bool,
};

GoBack.defaultProps = {
  onClickHandler: () => {},
  style: false,
  authentication: false,
};

export default GoBack;
