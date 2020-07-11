import React from 'react';
import ReactDOM from 'react-dom';
import {
  Confirm,
  Button,
  TransitionablePortal,
} from 'semantic-ui-react';

const UserConfirmation = (message, open, setOpen, callback) => {
  const container = document.createElement('div');
  container.setAttribute('custom-confirmation-navigation', '');

  const { header, content } = JSON.parse(message);

  const handleConfirm = callbackState => {
    ReactDOM.unmountComponentAtNode(container);
    callback(callbackState);
    setOpen(false);
  };
  const handleCancel = () => {
    ReactDOM.unmountComponentAtNode(container);
    callback();
    setOpen(false);
  };

  document.body.appendChild(container);
  ReactDOM.render(
    <TransitionablePortal open={open} onClose={handleCancel}>
      <Confirm
        header={header}
        open={open}
        confirmButton={
          <Button positive>{global.translate('OK', 69)}</Button>
        }
        cancelButton={
          <Button basic color="red">
            {global.translate('Cancel', 86)}
          </Button>
        }
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        content={content}
        centered={false}
      />
    </TransitionablePortal>,

    container,
  );
};
export default UserConfirmation;
