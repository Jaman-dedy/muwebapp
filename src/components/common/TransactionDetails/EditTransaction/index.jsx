/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import PhoneInput from 'react-phone-input-2';
import PropTypes from 'prop-types';
import './style.scss';
import PINConfirmationModal from 'components/common/PINConfirmationModal';

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
  PIN,
  setPIN,
}) {
  const [step, setStep] = useState(1);
  const [showPINModal, setShowPINModal] = useState(step === 2);

  const closePinModal = () => {
    setStep(1);
    setShowPINModal(false);
  };

  useEffect(() => {
    if (updatingData) {
      closePinModal();
      setStep(1);
      setPIN('');
    }
  }, [updatingData]);

  useEffect(() => {
    if (item) {
      setPhoneValue(
        item?.PhoneNumber || item?.Recipient?.PhoneNumber,
      );
    }
  }, []);

  return (
    <>
      {step === 1 && (
        <Modal onOpen={() => setOpen(true)} open={open} size="small">
          <Modal.Header style={{ textAlign: 'center' }}>
            {global.translate('Edit transaction', 2035)}
          </Modal.Header>
          <div className="form-content-data">
            <Modal.Content>
              <Form>
                <Form.Field>
                  <label>{global.translate('First Name', 8)}</label>
                  <input
                    placeholder={global.translate('First Name', 8)}
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
                  <label>{global.translate('Last Name', 9)}</label>
                  <input
                    placeholder={global.translate('Last Name', 9)}
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
                  <label>
                    {global.translate('Phone number', 13)}
                  </label>
                  <PhoneInput
                    enableSearch
                    value={phoneValue}
                    onChange={phone => setPhoneValue(phone)}
                  />
                </Form.Field>
              </Form>
            </Modal.Content>
          </div>

          <Modal.Actions>
            <Button
              disabled={updating}
              onClick={() => {
                setOpen(false);
                setStep(1);
              }}
              className="btn--cancel"
            >
              {global.translate('Cancel', 86)}
            </Button>
            <Button
              content={global.translate('Edit', 820)}
              onClick={() => {
                setStep(step + 1);
                setOpen(false);
                setShowPINModal(true);
              }}
              className="btn--confirm"
            />
          </Modal.Actions>
        </Modal>
      )}

      {step === 2 && (
        <PINConfirmationModal
          open={showPINModal}
          setOpen={setShowPINModal}
          loading={updating}
          onPinConfirm={modifyOneTransaction}
          PIN={PIN}
          setPIN={setPIN}
          onClose={closePinModal}
        />
      )}
    </>
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
  PIN: PropTypes.string.isRequired,
  setPIN: PropTypes.func.isRequired,
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
