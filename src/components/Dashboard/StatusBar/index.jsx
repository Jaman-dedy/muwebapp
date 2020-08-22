/* eslint-disable */
import React, { useState } from 'react';
import './index.scss';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AlertImage from 'assets/images/notifications.svg';

const StatusBar = ({ message, onEdit }) => {
  const [isShowing, setShowing] = useState(true);

  return (
    <>
      {isShowing && (
        <div className="status-bar-container white">
          <Image name="notification" width={17} src={AlertImage} />
          <div className="alert__message">
            <div>{global.translate('Alert', 1934)}</div>
            <h3>{global.translate(message)}</h3>
            <button
              type="button"
              name="pencil"
              className="cursor-pointer"
              onClick={onEdit}
            >
              {global.translate('Update now', 1935)}
            </button>
          </div>

          <button
            type="button"
            name="close"
            className="close cursor-pointer"
            onClick={() => {
              setShowing(!isShowing);
            }}
          >
            {global.translate('Close', 186)}
          </button>
        </div>
      )}
    </>
  );
};

StatusBar.propTypes = {
  message: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default StatusBar;
