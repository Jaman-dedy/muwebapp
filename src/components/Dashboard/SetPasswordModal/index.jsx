import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import PasswordInput from 'components/common/PasswordInput';
import checkPassword from 'utils/checkPassword';
import './style.scss';

const SetPasswordModal = ({
  open,
  setOpen,
  onInputChange,
  form,
  handleSetPassword,
  loading,
}) => {
  const [disableButton, setDisableButton] = useState(false);
  const { password } = form;

  useEffect(() => {
    if (
      !checkPassword(password).number ||
      !checkPassword(password).uppercase ||
      !checkPassword(password).lowercase ||
      !checkPassword(password).specialCharacter ||
      !checkPassword(password).digit
    ) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [checkPassword(password)]);

  return (
    <Modal
      open={open}
      onOpen={() => setOpen(true)}
      className="set-pwd-container"
      size="mini"
    >
      <Form>
        <h3>{global.translate('Set your password')}</h3>
        <Form.Field>
          <div className="sub-title-username">
            {global.translate('Password')}
          </div>
          <PasswordInput
            placeholder={global.translate('Enter your password', 2)}
            name="password"
            type="password"
            value={password}
            onChange={e => {
              onInputChange(e);
            }}
          />
        </Form.Field>
        <div className="checklist">
          <div>
            {global.translate('The password must be at least')}{' '}
            <span
              className={
                checkPassword(password).number ? '' : 'invalid'
              }
            >
              {global.translate('8 characters long')}
            </span>
            , {global.translate('containing an')}{' '}
            <span
              className={
                checkPassword(password).uppercase ? '' : 'invalid'
              }
            >
              {global.translate('uppercase')}
            </span>
            , {global.translate('a')}&nbsp;
            <span
              className={
                checkPassword(password).lowercase ? '' : 'invalid'
              }
            >
              {global.translate('lowercase,')}
            </span>{' '}
            <span
              className={
                checkPassword(password).digit ? '' : 'invalid'
              }
            >
              {global.translate('digit')}
            </span>{' '}
            {global.translate('and at least')}{' '}
            <span
              className={
                checkPassword(password).specialCharacter
                  ? ''
                  : 'invalid'
              }
            >
              {global.translate('a special character(!@#$%^&*)')}
            </span>
          </div>
        </div>
        <div className="btn-set-pwd-actions">
          <Button
            className="btn--cancel"
            onClick={() => setOpen(false)}
          >
            {global.translate('Cancel')}
          </Button>
          <Button
            loading={loading}
            disabled={disableButton}
            className="btn--confirm"
            onClick={handleSetPassword}
          >
            {global.translate('Set password')}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

SetPasswordModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  onInputChange: PropTypes.func,
  form: PropTypes.objectOf(PropTypes.any),
  handleSetPassword: PropTypes.func,
  loading: PropTypes.bool,
};
SetPasswordModal.defaultProps = {
  open: false,
  setOpen: () => {},
  onInputChange: () => {},
  form: {},
  handleSetPassword: () => {},
  loading: false,
};

export default SetPasswordModal;
