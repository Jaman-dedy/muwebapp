import React from 'react';
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
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import LoaderComponent from 'components/common/Loader';
import './WalletOptionsModal.scss';
import Thumbnail from 'components/common/Thumbnail';

const AddWalletModal = ({
  open,
  setOpen,
  walletList,
  onChange,
  form,
  onSubmit,
  addNewUserData,
  onkeyUp,
}) => {
  const options =
    walletList &&
    walletList.map(el => {
      return {
        id: el.AccountNumber,
        text: el.AccountNumber,
        value: el.AccountNumber,
        dp: el.Flag,
        AccountName: el.AccountName,
        AccountNumber: el.AccountNumber,
        content: (
          <div className="flag-wrapper" key={el.AccountName}>
            <Image src={el.Flag} width={30} />
            <h3 className="account">
              {el.AccountName} ({el.AccountNumber})
            </h3>
          </div>
        ),
      };
    });

  const renderLabel = label => {
    return {
      content: (
        <div className="flag-wrapper">
          <Image src={label.dp} width={30} />
          <h3 className="account">
            {label.AccountName} ({label.AccountNumber})
          </h3>
        </div>
      ),
    };
  };

  return (
    <Modal trigger={<Button>Show Modal</Button>}>
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content image>
        <Image
          wrapped
          size="medium"
          src="/images/avatar/large/rachel.png"
        />
        <Modal.Description>
          <Header>Default Profile Image</Header>
          <p>
            We've found the following gravatar image associated with
            your e-mail address.
          </p>
          <p>Is it okay to use this photo?</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
    /* 
    <Modal size="small" open={open} onOpen={() => setOpen(!open)}>
      <Modal.Header className="modal-title">
        Add a new contact
      </Modal.Header>
      <Modal.Content className="modal-main">
        {addNewUserData.loading && (
          <LoaderComponent loaderContent="Adding contact,please wait" />
        )}
        {!addNewUserData.loading && (
          <Form
            onSubmit={onSubmit}
            autoComplete="off"
            className="form-information "
          >
            <Form.Input
              className="input"
              placeholder="Search for a  users personal ID"
              name="PID"
              iconPosition="left"
              value={form.PID || ''}
              onChange={onChange}
              onKeyUp={onkeyUp}
            />

            {loading && (
              <>
                <LoaderComponent
                  className="loading"
                  loaderContent={`Locating  ${form.PID}`}
                />
              </>
            )}

            {data &&
              data[0].Result === 'Success' &&
              !loading &&
              !error && (
                <div className="results">
                  <Thumbnail
                    name={data[0].FirstName}
                    secondName={data[0].LastName}
                    avatar={data[0].PicURL}
                    style={{ height: 95, width: 95 }}
                  />
                  <p className="firstLastName">
                    {`${data[0].FirstName}  ${data[0].LastName}`}
                  </p>
                  <p className="address">
                    {data[0].City} {data[0].Country}
                  </p>
                </div>
              )}
            {error && !data && !loading && (
              <Message
                error={false}
                content="No user matching the given Personal ID exists"
              />
            )}

            <p className="wallet-text">
              Select Wallets to be visible to your new contact
            </p>
            <Form.Input
              control={Select}
              multiple
              selection
              name="wallets"
              fluid
              className="input"
              options={options}
              value={form.wallets || []}
              onChange={onChange}
              placeholder="Select wallets"
              renderLabel={renderLabel}
            />
          </Form>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button
          labelPosition="right"
          onClick={() => setOpen(!open)}
          content="Cancel"
          style={{ paddingRight: 300 }}
        />
        <Button
          content="Add"
          disabled={loading || error || !data}
          onClick={onSubmit}
          style={{ paddingRight: 300 }}
          labelPosition="right"
        />
      </Modal.Actions>
    </Modal> */
  );
};
AddWalletModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  walletList: PropTypes.arrayOf(PropTypes.any),
};

AddWalletModal.defaultProps = {
  open: false,
  setOpen: () => {},
  walletList: [],
};
export default AddWalletModal;
