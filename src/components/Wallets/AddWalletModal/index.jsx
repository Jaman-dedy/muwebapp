/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import {
  Modal,
  Form,
  Button,
  Dropdown,
  Grid,
  Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './AddWalletModal.scss';
import { toast } from 'react-toastify';

const AddWalletModal = ({
  open,
  setOpenAddWalletModel,
  onChange,
  form,
  onSubmit,
  currencies,
  addWallet,
  getMyWalletsFX,
  getMyCurrencies,
}) => {
  const options =
    currencies &&
    currencies.map(el => {
      return {
        id: el.Code,
        text: `${el.Name} (${el.Code})`,
        value: el.Code,
        image: { avatar: false, src: el.Flag },
      };
    });

  const [walletsNumber, setWalletsNumber] = useState(1);
  const walletsForms = new Array(walletsNumber);

  const onSuccess = () => {
    getMyWalletsFX();
    getMyCurrencies();
    setOpenAddWalletModel();
  };

  const toggleShowModal = () => {
    setWalletsNumber(1);
    setOpenAddWalletModel();
  };
  React.useEffect(() => {
    if (addWallet.success) {
      toast.success(addWallet.message);
      onSuccess();
    }
  }, [addWallet]);

  const addWalletForm = () => {
    setWalletsNumber(walletsNumber + 1);
  };

  const removeWalletForm = () => {
    if (walletsNumber > 1) {
      setWalletsNumber(walletsNumber - 1);
    }
  };

  return (
    <Modal
      size="small"
      open={open}
      className="wallet_modal"
      onClose={() => toggleShowModal()}
    >
      <Modal.Header className="modal-title">
        {global.translate('Add wallets', 111)}
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {!addWallet.success && (
            <Form className="wallet-form">
              {walletsForms.fill().map((value, idx) => {
                return (
                  <span className="wallet_input_row" key={idx}>
                    <Grid
                      stackable
                      columns={2}
                      className="walletforms"
                    >
                      <Grid.Column>
                        <Form.Input
                          className="input"
                          placeholder={global.translate(
                            'Wallet name',
                          )}
                          name={`Name${idx}`}
                          value={form[`Name${idx}`] || ''}
                          onChange={onChange}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Dropdown
                          fluid
                          search
                          selection
                          options={options}
                          name={`Currency${idx}`}
                          value={form[`Currency${idx}`] || ''}
                          onChange={onChange}
                          placeholder={global.translate(
                            'Select a currency',
                          )}
                        />
                        <span className="wallet-row-actions">
                          {`Name${idx}` !== 'Name0' && (
                            <Icon
                              name="times circle"
                              className="circle-remove cursor-pointer"
                              size="big"
                              onClick={() => removeWalletForm(idx)}
                            />
                          )}
                          {idx === walletsForms.length - 1 && (
                            <Icon
                              name="add circle"
                              className="circle-add cursor-pointer"
                              size="big"
                              onClick={() => addWalletForm()}
                            />
                          )}
                          {idx !== walletsForms.length - 1 && (
                            <Icon
                              name="circle"
                              className="offIcon"
                              size="big"
                            />
                          )}
                        </span>
                      </Grid.Column>
                    </Grid>
                  </span>
                );
              })}
            </Form>
          )}
        </Modal.Description>
      </Modal.Content>
      {!addWallet.success && (
        <Modal.Actions>
          <Button className="cancel" onClick={toggleShowModal}>
            {global.translate('Cancel', 86)}
          </Button>
          <Button
            className="add"
            onClick={onSubmit}
            loading={addWallet.loading}
            disabled={!form.Name0}
          >
            {global.translate('Add', 112)}
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
  onChange: PropTypes.func,
  form: PropTypes.arrayOf(PropTypes.any),
  onSubmit: PropTypes.func,
  addWallet: PropTypes.func,
  getMyWalletsFX: PropTypes.func,
  getMyCurrencies: PropTypes.func,
};

AddWalletModal.defaultProps = {
  open: false,
  setOpenAddWalletModel: () => {},
  currencies: [],
  onChange: () => {},
  form: PropTypes.arrayOf(PropTypes.any),
  onSubmit: () => {},
  addWallet: () => {},
  getMyWalletsFX: () => {},
  getMyCurrencies: () => {},
};
export default AddWalletModal;
