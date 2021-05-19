import React from 'react';
import { Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import InfoIcon from 'assets/images/info-icon.svg';
import './style.scss';

const InfoMessage = ({ description, actionHandler, actionLabel }) => {
  return (
    <div className="info-message">
      <Image src={InfoIcon} />
      <span>{description}</span>
      {actionLabel && (
        <Button basic onClick={actionHandler}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

InfoMessage.propTypes = {
  description: PropTypes.string,
  actionHandler: PropTypes.func,
  actionLabel: PropTypes.string,
};
InfoMessage.defaultProps = {
  description: '',
  actionHandler: () => {},
  actionLabel: '',
};

export default InfoMessage;
