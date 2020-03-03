import React, { useState } from 'react';
import './index.scss';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import PencilIcon from 'assets/images/pencil.png';
import CloseIcon from 'assets/images/close.png';

const StatusBar = ({ message }) => {
  const [isShowing, setShowing] = useState(true);

  return (
    <>
      {isShowing && (
        <div className="status-bar-container">
          <p>{global.translate(message)}</p>
          <Image
            name="pencil"
            width={17}
            src={PencilIcon}
            onClick={() => {
              alert('Handle Edit Profile');
            }}
          />
          <div className="section-icons">
            <Image
              src={CloseIcon}
              width={17}
              name="close"
              onClick={() => {
                setShowing(!isShowing);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

StatusBar.propTypes = {
  message: PropTypes.string.isRequired,
};

export default StatusBar;
