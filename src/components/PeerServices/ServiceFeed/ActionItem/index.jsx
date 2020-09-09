/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import './style.scss';

const InlineActionItem = ({
  icon,
  text,
  onClick,
  style,
  iconClass,
}) => {
  return (
    <div
      className="action-item  cursor-pointer"
      onClick={onClick}
      style={style}
    >
      <Icon name={icon} className={iconClass || ''} />
      <span>{text}</span>
    </div>
  );
};
InlineActionItem.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.objectOf(PropTypes.any),
  iconClass: PropTypes.string,
};

InlineActionItem.defaultProps = {
  style: {},
  onClick: () => {},
  iconClass: '',
};
export default InlineActionItem;
