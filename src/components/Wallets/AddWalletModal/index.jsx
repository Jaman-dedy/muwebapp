import React, { useEffect, useState } from 'react';
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

const AddWalletModal = ({
  open,
  setOpenAddWalletModel,
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
    setOpenAddWalletModel();
  };

  const toggleShowModal = () => {
    setWalletsNumber(1);
    setOpenAddWalletModel();
  };

  const addWalletForm = () => {
    setWalletsNumber(walletsNumber + 1);
  };

  const removeWalletForm = i => {
    if (walletsNumber > 1) {
      setWalletsNumber(walletsNumber - 1);

      /*  walletsForms.splice(i, 1);
      console.log('my array', walletsForms);
      console.log('removing form :', i); */
    }
  };

  return (
    <Modal
      open={open}
      className="wallet_modal"
      onClose={() => toggleShowModal()}
    >
      <Modal.Header>
        <p className="center-align title">
          {global.translate('Add wallets', 111)}
        </p>
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
                          placeholder="Provide the wallet name"
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
                          placeholder="Select a currency"
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
  onChange: PropTypes.func,
  form: PropTypes.arrayOf(PropTypes.any),
  onSubmit: PropTypes.func,
  addWallet: PropTypes.func,
  getMyWalletsFX: PropTypes.func,
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
};
export default AddWalletModal;
