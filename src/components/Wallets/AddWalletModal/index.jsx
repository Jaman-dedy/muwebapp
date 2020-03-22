import React, { useEffect, useState } from 'react';
import {
  Modal,
  Form,
  Button,
  Dropdown,
  /* Image, */
  /*  Select,
  Loader,
  Message,
  Header, */
  Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

//import LoaderComponent from 'components/common/Loader';
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

  /* const [currency, setCurrency] = useState({});

  const Wallets = [];
 */
  /*  const renderLabel = label => {
    return {
      content: (
        <div className="flag-wrapper">
          <Image src={label.dp} width={30} />
          <h3 className="account">{label.Name}</h3>
        </div>
      ),
    };
  }; */

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

              <Dropdown
                fluid
                search
                selection
                multiple
                options={options}
                name="Currency"
                value={form.Currency || ''}
                onChange={onChange}
                placeholder="Select a currency"
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
  onChange: PropTypes.func,
  form: PropTypes.arrayOf(PropTypes.any),
  onSubmit: PropTypes.func,
  addWallet: PropTypes.func,
  getMyWalletsAction: PropTypes.func,
};

AddWalletModal.defaultProps = {
  open: false,
  setOpenAddWalletModel: () => {},
  currencies: [],
  onChange: () => {},
  form: PropTypes.arrayOf(PropTypes.any),
  onSubmit: () => {},
  addWallet: () => {},
  getMyWalletsAction: () => {},
};
export default AddWalletModal;
