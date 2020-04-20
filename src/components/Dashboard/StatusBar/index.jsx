import React, { useState } from 'react';
import './index.scss';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import PencilIcon from 'assets/images/pencil.png';
import CloseIcon from 'assets/images/close.png';

const StatusBar = ({ message, onEdit }) => {
  const [isShowing, setShowing] = useState(true);

  return (
    <>
      {isShowing && (
        <div className="status-bar-container">
          <p>{global.translate(message)}</p>

          <div className="section-icons">
            <Image
              name="pencil"
              className="cursor-pointer"
              width={17}
              src={PencilIcon}
              onClick={onEdit}
            />
            <Image
              src={CloseIcon}
              width={17}
              name="close"
              className="cursor-pointer"
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
  onEdit: PropTypes.func.isRequired,
};

export default StatusBar;
