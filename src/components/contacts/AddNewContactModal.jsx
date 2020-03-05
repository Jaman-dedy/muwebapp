import React from 'react';
import {
  Modal,
  Form,
  Button,
  Image,
  Select,
  Message,
  Icon,
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
  clearSuccess,
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

  const showSuccess = () => (
    <div className="success-message">
      <Icon name="checkmark" color="green" size="massive" />
      <span className="successful">
        {global.translate('Successful')}
      </span>
      <span className="message">
        {global.translate('Your Contact has been added successfully')}
      </span>
    </div>
  );

  return (
    <Modal size="small" open={open} onOpen={() => setOpen(!open)}>
      <Modal.Header className="modal-title">
        {global.translate(' Add a new contact')}
      </Modal.Header>
      {addNewUserData.success && showSuccess()}
      {!addNewUserData.success && (
        <Modal.Content className="modal-main">
          {addNewUserData.success && showSuccess()}
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
                    'Provide the contacts personal ID',
                  )}
                  name="PID"
                  iconPosition="right"
                  value={form.PID || ''}
                  onChange={onChange}
                  icon={
                    <Icon name="search" link onClick={onSearchUser} />
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
                          'searching for user with Personal ID ',
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
                    'Select Wallets to be visible to your new contact',
                    632,
                  )}
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
                  placeholder={global.translate('Select wallets')}
                  renderLabel={renderLabel}
                />
              </Form>
            </div>
          )}
        </Modal.Content>
      )}

      <Modal.Actions>
        {addNewUserData.success ? (
          <Button onClick={clearSuccess} className="success-button">
            {global.translate('OK', 69)}
          </Button>
        ) : (
          <>
            <Button
              className="cancel-button"
              onClick={() => setOpen(!open)}
              disabled={addNewUserData.loading}
              content={global.translate('Cancel', 86)}
            >
              {global.translate('Cancel', 86)}
            </Button>
            <Button
              className="success-button"
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
        )}
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
  addNewUserData: PropTypes.func.isRequired,
  onSearchUser: PropTypes.func.isRequired,
  searchData: PropTypes.objectOf(PropTypes.any).isRequired,
  clearSuccess: PropTypes.func,
  localError: PropTypes.string,
};

AddNewContactModal.defaultProps = {
  open: false,
  localError: null,
  setOpen: () => {},
  clearSuccess: () => {},
  walletList: [],
};
export default AddNewContactModal;
