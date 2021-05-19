/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './EditWalletModal.scss';
import { toast } from 'react-toastify';

const EditWalletModal = ({
  open,
  openEdtWalletModalFx,
  onChange,
  form,
  onSubmit,
  addWallet,
  getMyWalletsFX,
}) => {
  const onSuccess = () => {
    getMyWalletsFX();
    openEdtWalletModalFx();
  };

  React.useEffect(() => {
    if (addWallet.success) {
      toast.success(addWallet.message);
      onSuccess();
    }
  }, [addWallet]);
  return (
    <Modal
      open={open}
      size="small"
      className="wallet_modal"
      onClose={() => openEdtWalletModalFx()}
    >
      <Modal.Header className="modal-title">
        {global.translate('Edit wallet name', 88)}{' '}
        {form?.AccountNumber}
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {!addWallet?.success && (
            <Form className="wallet-form">
              <Form.Input
                className="input"
                placeholder={global.translate('Wallet name', 97)}
                name="Name"
                value={form?.Name || ''}
                onChange={onChange}
              />
            </Form>
          )}
        </Modal.Description>
      </Modal.Content>

      {!addWallet.success && (
        <Modal.Actions>
          <Button className="cancel" onClick={openEdtWalletModalFx}>
            {global.translate('Cancel', 86)}
          </Button>
          <Button
            disabled={!form?.Name || form?.Name?.length < 4}
            positive
            className="add"
            onClick={onSubmit}
            loading={addWallet.loading}
          >
            {global.translate('Edit', 820)}
          </Button>
        </Modal.Actions>
      )}
    </Modal>
  );
};
EditWalletModal.propTypes = {
  open: PropTypes.bool,
  openEdtWalletModalFx: PropTypes.func,
  onChange: PropTypes.func,
  form: PropTypes.objectOf(PropTypes.any),
  onSubmit: PropTypes.func,
  addWallet: PropTypes.objectOf(PropTypes.any),
  getMyWalletsFX: PropTypes.func,
};

EditWalletModal.defaultProps = {
  open: false,
  openEdtWalletModalFx: () => {},
  onChange: () => {},
  form: null,
  onSubmit: () => {},
  addWallet: null,
  getMyWalletsFX: () => {},
};
export default EditWalletModal;
