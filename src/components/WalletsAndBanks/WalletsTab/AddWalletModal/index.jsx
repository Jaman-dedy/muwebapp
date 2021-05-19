import React, { useState, useEffect } from 'react';
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
  onSubmit,
  currencies,
  addWallet,
  userData,
  getMyWalletsFX,
  getMyCurrencies,
}) => {
  const [form, setForm] = useState([
    {
      Currency: '',
      Name: '',
    },
  ]);
  const onChange = (index, event) => {
    const values = [...form];
    if (event.target.name === 'Name') {
      values[index].Name = event.target.value;
    } else if (event.target.name === 'Currency') {
      values[index].Currency = event.target.value.toString();
    }

    setForm(values);
  };

  useEffect(() => {
    if (userData.data) {
      setForm([
        {
          Currency: userData.data.Currency,
          Name: '',
        },
      ]);
    }
  }, [userData?.data]);

  const options =
    currencies &&
    currencies.map(el => {
      return {
        id: el.Code,
        text: `${el.Name}`,
        value: el.Code,
        image: { avatar: false, src: el.Flag },
      };
    });

  const onSuccess = React.useCallback(() => {
    getMyWalletsFX();
    getMyCurrencies();
    setOpenAddWalletModel();
  }, [getMyCurrencies, getMyWalletsFX, setOpenAddWalletModel]);

  const toggleShowModal = () => {
    setForm([
      {
        Currency: '',
        Name: '',
      },
    ]);
    setOpenAddWalletModel();
  };

  React.useEffect(() => {
    if (addWallet.success) {
      toast.success(addWallet.message);
      onSuccess();
    }
  }, [addWallet, onSuccess]);

  const handleAddFields = () => {
    const values = [...form];
    values.push({
      Currency: userData.data?.Currency,
      Name: '',
    });
    setForm(values);
  };

  const handleRemoveFields = index => {
    const values = [...form];
    values.splice(index, 1);
    setForm(values);
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
        {!addWallet.success && (
          <>
            <Form className="wallet-form">
              {form.map((inputField, index) => (
                <span
                  className="wallet_input_row"
                  key={`${inputField}~${index}`}
                >
                  <Grid stackable columns={2} className="walletforms">
                    <Grid.Column>
                      <Form.Input
                        className="input"
                        placeholder={global.translate(
                          'Wallet name',
                          97,
                        )}
                        type="text"
                        id="Name"
                        name="Name"
                        maxLength="40"
                        onChange={event => {
                          event.persist();
                          onChange(index, event);
                        }}
                        value={inputField.Name}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Dropdown
                        fluid
                        search
                        selection
                        options={options && options}
                        name="Currency"
                        value={inputField.Currency}
                        onChange={(event, data) => {
                          event.persist();
                          onChange(index, {
                            target: {
                              name: 'Currency',
                              value: data.value,
                            },
                          });
                        }}
                        placeholder={global.translate(
                          'Select a currency',
                        )}
                      />

                      <span className="wallet-row-actions">
                        {index !== 0 && (
                          <Icon
                            name="times circle"
                            className="circle-remove cursor-pointer"
                            size="big"
                            onClick={() => handleRemoveFields(index)}
                          />
                        )}
                        {index === form.length - 1 && (
                          <Icon
                            name="add circle"
                            className="circle-add cursor-pointer"
                            size="big"
                            onClick={() => handleAddFields()}
                          />
                        )}
                      </span>
                    </Grid.Column>
                  </Grid>
                </span>
              ))}
            </Form>
          </>
        )}
      </Modal.Content>
      {!addWallet.success && (
        <Modal.Actions>
          <Button className="cancel" onClick={toggleShowModal}>
            {global.translate('Cancel', 86)}
          </Button>
          <Button
            positive
            className="add"
            onClick={() => {
              form.forEach((item, index) => {
                if (item.Name === '' || item.Currency === '') {
                  form.splice(index, form.length);
                }
              });
              onSubmit(form);
            }}
            loading={addWallet.loading}
            disabled={
              addWallet.loading ||
              form[0].Name.length < 1 ||
              form[0].Currency.length < 1
            }
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
  userData: PropTypes.arrayOf(PropTypes.any),
  setOpenAddWalletModel: PropTypes.func,
  onSubmit: PropTypes.func,
  addWallet: PropTypes.func,
  getMyWalletsFX: PropTypes.func,
  getMyCurrencies: PropTypes.func,
};

AddWalletModal.defaultProps = {
  open: false,
  setOpenAddWalletModel: () => {},
  currencies: [],
  userData: {},
  onSubmit: () => {},
  addWallet: () => {},
  getMyWalletsFX: () => {},
  getMyCurrencies: () => {},
};
export default AddWalletModal;
