import React, { useEffect, useState } from 'react';
import {
  Modal,
  Form,
  Button,
  Dropdown,
  Image,
  Select,
  Loader,
  Message,
  Header,
  Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import LoaderComponent from 'components/common/Loader';
import './EditWalletModal.scss';
/* import Thumbnail from 'components/common/Thumbnail'; */

const EditWalletModal = ({
  open,
  openEdtWalletModalFx,
  onChange,
  form,
  onSubmit,
  currencies,
  addWallet,
  getMyWalletsFX,
}) => {
  const options =
    currencies &&
    currencies.map(el => {
      return {
        id: el.CurrencyCode,
        text: el.CurrencyCode,
        value: el.CurrencyCode,
        image: { avatar: false, src: el.Flag },
      };
    });

  const renderLabel = label => {
    return {
      content: (
        <div className="flag-wrapper">
          <Image src={label.dp} width={30} />
          <h3 className="account">{label.CurrencyCode}</h3>
        </div>
      ),
    };
  };

  const onSuccess = () => {
    getMyWalletsFX();
    openEdtWalletModalFx();
  };

  return (
    <Modal
      open={open}
      className="wallet_modal"
      onClose={() => openEdtWalletModalFx()}
    >
      <Modal.Header>
        <p className="center-align title">
          {global.translate('Edit wallet name', 88)}{' '}
          {form.AccountNumber}
        </p>
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {!addWallet.success && (
            <Form className="wallet-form">
              <Form.Input
                className="input"
                placeholder="Provide the wallet name"
                name="Name"
                value={form.Name || ''}
                onChange={onChange}
              />
            </Form>
          )}

          {!addWallet.loading && addWallet.success && (
            <div className="success-container">
              <span className="success-container">
                <p>
                  <Icon name="check" className="check-icon" />
                </p>
                <p className="success-txt">Successful</p>
                <p className="description-txt">{addWallet.message}</p>
              </span>
            </div>
          )}
        </Modal.Description>
      </Modal.Content>

      {!addWallet.success && (
        <Modal.Actions>
          <Button className="cancel" onClick={openEdtWalletModalFx}>
            {global.translate('Cancel', 86)}
          </Button>
          <Button
            className="add"
            onClick={onSubmit}
            loading={addWallet.loading}
          >
            {global.translate('Edit', 820)}
          </Button>
        </Modal.Actions>
      )}

      {addWallet.success && (
        <Modal.Actions>
          <Button className="add" onClick={onSuccess}>
            {global.translate('Done', 55)}
          </Button>
        </Modal.Actions>
      )}
    </Modal>
  );
};
EditWalletModal.propTypes = {
  open: PropTypes.bool,
  currencies: PropTypes.arrayOf(PropTypes.any),
  openEdtWalletModalFx: PropTypes.func,
  walletList: PropTypes.arrayOf(PropTypes.any),
};

EditWalletModal.defaultProps = {
  open: false,
  setOpen: () => {},
  walletList: [],
};
export default EditWalletModal;
