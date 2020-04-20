import React from 'react';
import {
  Modal,
  Form,
  Button,
  Image,
  Select,
  Message,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import LoaderComponent from 'components/common/Loader';
import './modal.scss';
import Thumbnail from 'components/common/Thumbnail';

const AddNewContactModal = ({
  open,
  setOpen,
  walletList,
  onChange,
  form,
  onSubmit,
  addNewUserData,
  localError,
  onSearchUser,
  searchData: { error, data, loading },
  setForm,
  setLocalError,
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
    <Modal size="small" open={open} onOpen={() => setOpen(!open)}>
      <Modal.Header className="modal-title">
        {global.translate(' Add a new contact')}
      </Modal.Header>
      {!addNewUserData.success && (
        <Modal.Content className="modal-main">
          {addNewUserData.loading && (
            <LoaderComponent
              loaderContent={global.translate('Working…', 412)}
              style={{ marginLeft: -40 }}
            />
          )}

          {!addNewUserData.loading && (
            <div>
              <Form
                onSubmit={onSearchUser}
                autoComplete="off"
                className="form-information top-form"
              >
                <Form.Input
                  className="input"
                  placeholder={global.translate(
                    'Provide the contact`s personal ID',
                  )}
                  name="PID"
                  iconPosition="right"
                  value={form.PID || ''}
                  onChange={onChange}
                  icon={
                    <Button
                      content={global.translate('Search')}
                      positive
                      name="search"
                      link
                      onClick={onSearchUser}
                    />
                  }
                />
              </Form>
              {loading && (
                <div className="search-form-loading">
                  <>
                    <LoaderComponent
                      className="loading"
                      loaderContent={
                        global.translate(
                          'searching for user with PID ',
                        ) + form.PID
                      }
                    />
                  </>
                </div>
              )}
              {localError && !data && !loading && (
                <Message error content={localError} />
              )}
              <Form
                onSubmit={onSubmit}
                autoComplete="off"
                className="form-information "
              >
                {data &&
                  data[0].Result === 'Success' &&
                  !loading &&
                  !error &&
                  !localError &&
                  form.PID &&
                  form.PID !== '' && (
                    <div className="results">
                      <Thumbnail
                        name={data[0].FirstName}
                        secondName={data[0].LastName}
                        avatar={data[0].PictureURL}
                        style={{
                          height: 95,
                          width: 95,
                          marginRight: -2,
                        }}
                      />
                      <p className="firstLastName">
                        {`${data[0].FirstName}  ${data[0].LastName}`}
                      </p>
                      <p className="address">
                        {data[0].City} {data[0].Country}
                      </p>
                    </div>
                  )}

                <p className="wallet-text">
                  {global.translate(
                    'Select Wallets to be visible to ',
                    632,
                  )}
                  {global.translate('Your contact').toLowerCase()}
                </p>
                <Form.Input
                  control={Select}
                  multiple
                  selection
                  name="wallets"
                  search
                  fluid
                  className="input"
                  options={options}
                  value={form.wallets || []}
                  onChange={onChange}
                  placeholder={global.translate('Select wallets')}
                  renderLabel={renderLabel}
                />
              </Form>
            </div>
          )}
        </Modal.Content>
      )}

      <Modal.Actions>
        <>
          <Button
            negative
            onClick={() => {
              setForm({});
              setLocalError(null);
              setOpen(!open);
            }}
            disabled={addNewUserData.loading}
            content={global.translate('Cancel', 86)}
          >
            {global.translate('Cancel', 86)}
          </Button>
          <Button
            positive
            disabled={
              loading ||
              error ||
              !data ||
              addNewUserData.loading ||
              !form.wallets ||
              form.wallets === [] ||
              !form.PID ||
              form.PID === ''
            }
            onClick={onSubmit}
          >
            {global.translate('Add', 112)}
          </Button>
        </>
      </Modal.Actions>
    </Modal>
  );
};
AddNewContactModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  walletList: PropTypes.arrayOf(PropTypes.any),
  onChange: PropTypes.func.isRequired,
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  onSubmit: PropTypes.func.isRequired,
  addNewUserData: PropTypes.objectOf(PropTypes.any).isRequired,
  onSearchUser: PropTypes.func.isRequired,
  searchData: PropTypes.objectOf(PropTypes.any).isRequired,
  localError: PropTypes.string,
  setForm: PropTypes.func,
  setLocalError: PropTypes.func,
};

AddNewContactModal.defaultProps = {
  open: false,
  localError: null,
  setOpen: () => {},
  walletList: [],
  setForm: () => {},
  setLocalError: () => {},
};
export default AddNewContactModal;
