import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import './style.scss';

const AttachOption = ({ icon, text }) => {
  return (
    <div className="attach-new-option">
      <Icon name={icon} className="icon" /> <span>{text}</span>
    </div>
  );
};

AttachOption.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default AttachOption;
