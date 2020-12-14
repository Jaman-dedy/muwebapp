/* eslint-disable */
import React, { useState } from 'react';
import './index.scss';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AlertImage from 'assets/images/notifications.svg';

const StatusBar = ({ message, onEdit, isShowing, setShowing }) => {
  return (
    <>
      {isShowing && (
        <div className="alert-bar-wrapper">
          <Image name="notification" width={17} src={AlertImage} />
          <div className="alert-message">
            {global.translate(message)}
          </div>
          <div className="wrap-buttons">
            <button
              type="button"
              className="btn-update"
              onClick={onEdit}
            >
              {global.translate('Update now', 1935)}
            </button>
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                setShowing(!isShowing);
              }}
            >
              {global.translate('Close', 186)}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

StatusBar.propTypes = {
  message: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  isShowing: PropTypes.bool,
  setShowing: PropTypes.func.isRequired,
};

StatusBar.defaultProps = {
  isShowing: true,
};

export default StatusBar;
