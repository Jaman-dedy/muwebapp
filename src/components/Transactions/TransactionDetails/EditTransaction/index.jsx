/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Message } from 'semantic-ui-react';
import PhoneInput from 'react-phone-input-2';
import PropTypes from 'prop-types';
import './style.scss';
import PinCodeForm from 'components/common/PinCodeForm';

function EditTransaction({
  open,
  setOpen,
  phoneValue,
  setPhoneValue,
  item,
  onOptionChange,
  form,
  modifyOneTransaction,
  updating,
  updatingError,
  updatingData,
}) {
  const [pinInput, setPinInput] = useState(false);
  const [disablePinInput, setDisablePinInput] = useState(false);
  useEffect(() => {
    if (updatingData) {
      setPinInput(false);
    }
  }, [updatingData]);
  useEffect(() => {
    if (item) {
      setPhoneValue(
        item?.PhoneNumber || item?.Recipient?.PhoneNumber,
      );
    }
  }, []);

  useEffect(() => {
    if (!pinInput) {
      setDisablePinInput(updating);
    }
  }, []);
  useEffect(() => {
    if (pinInput) {
      if (!form.digit3) {
        setDisablePinInput(true);
      } else {
        setDisablePinInput(false);
      }
    }
    if (!pinInput) {
      setDisablePinInput(false);
    }
  }, [pinInput, form]);

  return (
    <Modal onOpen={() => setOpen(true)} open={open} size="small">
      <Modal.Header style={{ textAlign: 'center' }}>
        {global.translate('Edit transaction')}
      </Modal.Header>
      <div className="form-content-data">
        <Modal.Content>
          {!pinInput && (
            <Form>
              <Form.Field>
                <label>{global.translate('First Name')}</label>
                <input
                  placeholder={global.translate('First Name')}
                  value={
                    form?.FirstName ||
                    item?.FirstName ||
                    item?.Recipient?.FirstName ||
                    ''
                  }
                  onChange={onOptionChange}
                  name="FirstName"
                />
              </Form.Field>
              <Form.Field>
                <label>{global.translate('Last Name')}</label>
                <input
                  placeholder={global.translate('Last Name')}
                  value={
                    form?.LastName ||
                    item?.LastName ||
                    item?.Recipient?.LastName ||
                    ''
                  }
                  onChange={onOptionChange}
                  name="LastName"
                />
              </Form.Field>
              <Form.Field>
                <label>{global.translate('Phone number')}</label>
                <PhoneInput
                  enableSearch
                  value={phoneValue}
                  onChange={phone => setPhoneValue(phone)}
                />
              </Form.Field>
            </Form>
          )}
          {pinInput && (
            <div className="pin-form-input">
              <PinCodeForm
                label={global.translate(
                  'Confirm  your PIN number',
                  941,
                )}
                onChange={onOptionChange}
              />
            </div>
          )}
        </Modal.Content>
        {updatingError && Object.keys(updatingError).length && (
          <Message error>{updatingError.Description}</Message>
        )}
      </div>

      <Modal.Actions>
        {pinInput && (
          <Button
            disabled={updating}
            onClick={() => setPinInput(false)}
            style={{ backgroundColor: '#e95927', color: '#ffff' }}
          >
            {global.translate('Back')}
          </Button>
        )}

        <Button
          disabled={updating}
          onClick={() => {
            setOpen(false);
            setPinInput(false);
          }}
          style={{ backgroundColor: '#e95927', color: '#ffff' }}
        >
          {global.translate('Cancel')}
        </Button>
        <Button
          content={global.translate('Edit')}
          onClick={() => {
            setPinInput(true);
            if (pinInput) {
              modifyOneTransaction();
            }
          }}
          positive
          loading={updating}
          disabled={disablePinInput}
        />
      </Modal.Actions>
    </Modal>
  );
}

EditTransaction.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  setPhoneValue: PropTypes.func,
  phoneValue: PropTypes.string,
  item: PropTypes.objectOf(PropTypes.any),
  onOptionChange: PropTypes.func,
  form: PropTypes.objectOf(),
  modifyOneTransaction: PropTypes.func,
  updating: PropTypes.bool,
  updatingError: PropTypes.objectOf(PropTypes.any),
  updatingData: PropTypes.objectOf(PropTypes.any),
};
EditTransaction.defaultProps = {
  open: false,
  setOpen: () => {},
  setPhoneValue: () => {},
  phoneValue: '',
  item: {},
  onOptionChange: () => {},
  form: {},
  modifyOneTransaction: () => {},
  updating: false,
  updatingError: {},
  updatingData: {},
};

export default EditTransaction;
