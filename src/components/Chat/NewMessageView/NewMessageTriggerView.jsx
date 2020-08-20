/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './triggerNewMessage.scss';

const NewMessageTriggerView = ({ onStartClick }) => {
  return (
    <div
      onClick={onStartClick}
      className="trigger-new-message-wrapper"
    >
      <div className="wrapper-inner">
        <h3 className="header">
          {global.translate(
            "You don't have any message selected",
            1655,
          )}
        </h3>
        <p className="sub-text">
          {global.translate(
            'Choose one from your existing messages, or start a new one.',
            1656,
          )}
        </p>

        <Button
          basic
          color="orange"
          content={global.translate('Start Chat', 1657)}
          onClick={onStartClick}
        />
      </div>
    </div>
  );
};
NewMessageTriggerView.propTypes = {
  onStartClick: PropTypes.func.isRequired,
};

export default NewMessageTriggerView;
