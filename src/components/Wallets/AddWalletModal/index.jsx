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
import './AddWalletModal.scss';
/* import Thumbnail from 'components/common/Thumbnail'; */

const AddWalletModal = ({
  open,
  setOpenAddWalletModel,
  onChange,
  form,
  onSubmit,
  currencies,
  addWallet,
  getMyWalletsAction,
}) => {
  /*   const options =
    currencies &&
    currencies.map(el => {
      return {
        id: el.CurrencyCode,
        text: el.CurrencyCode,
        value: el.CurrencyCode,
        dp: el.Flag,

        content: (
          <div className="flag-wrapper" key={el.AccountName}>
            <Image src={el.Flag} width={30} />
            <h3 className="account">{el.CurrencyCode}</h3>
          </div>
        ),
      };
    }); */

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

  /* _.map(
      addressDefinitions.state,
      (state, index) => ({
        key: addressDefinitions.state_abbr[index],
        text: state,
        value: addressDefinitions.state_abbr[index],
      }),
    ); */

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
    getMyWalletsAction();
    setOpenAddWalletModel();
  };

  return (
    <Modal open={open} className="wallet_modal">
      <Modal.Header>
        <p className="center-align title">Add a new wallet</p>
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
              <span>Select a currency</span>
              <Dropdown
                fluid
                search
                selection
                options={options}
                name="Currency"
                value={form.Currency || ''}
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
          <Button className="cancel" onClick={setOpenAddWalletModel}>
            Cancel
          </Button>
          <Button
            className="add"
            onClick={onSubmit}
            loading={addWallet.loading}
          >
            Add
          </Button>
        </Modal.Actions>
      )}

      {addWallet.success && (
        <Modal.Actions>
          <Button className="add" onClick={onSuccess}>
            Done
          </Button>
        </Modal.Actions>
      )}
    </Modal>
  );
};
AddWalletModal.propTypes = {
  open: PropTypes.bool,
  currencies: PropTypes.arrayOf(PropTypes.any),
  setOpenAddWalletModel: PropTypes.func,
  walletList: PropTypes.arrayOf(PropTypes.any),
};

AddWalletModal.defaultProps = {
  open: false,
  setOpen: () => {},
  walletList: [],
};
export default AddWalletModal;
