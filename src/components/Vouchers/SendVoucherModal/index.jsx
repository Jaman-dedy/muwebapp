import React from 'react';
import {
  Modal,
  Button,
  Grid,
  Image,
  Dropdown,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './SendVoucherModal.scss';

const SendVoucherModal = ({
  open,
  setOpen,
  form,
  onChange,
  walletList,
  countries,
  stores,
}) => {
  const options =
    walletList &&
    walletList.map(el => {
      return {
        id: el.AccountNumber,
        text: `${el.AccountName} (${el.AccountNumber})`,
        value: el.AccountNumber,
        image: { avatar: false, src: el.Flag },
      };
    });
  const onSuccess = () => {};

  const getwallets = () => {};
  return (
    <Modal
      open={open}
      className="voucher_modal"
      onClose={() => setOpen()}
    >
      <Modal.Header>
        <p className="center-align title">Send Voucher</p>
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Grid divided="vertically">
            <Grid.Row columns={2}>
              <Grid.Column>
                {/* <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" /> */}

                <div>
                  <span>
                    <Dropdown
                      fluid
                      selection
                      search
                      options={options}
                      name="Wallet"
                      value={form.Wallet || ''}
                      onChange={onChange}
                      placeholder="Select a wallet"
                    />
                    <div className="wallet-details">amount</div>
                  </span>
                </div>
              </Grid.Column>
              <Grid.Column>
                <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button className="add" onClick={onSuccess}>
          Next
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default SendVoucherModal;
