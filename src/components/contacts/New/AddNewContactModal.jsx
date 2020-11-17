import React, { useState } from 'react';
import {
  Modal,
  Form,
  Button,
  Image,
  Select,
  Message,
  Input,
  TransitionablePortal,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import LoaderComponent from 'components/common/Loader';
import './modal.scss';
import Thumbnail from 'components/common/Thumbnail';

import VerifiedIcon from 'assets/images/verified.png';
import SelectCountryCode from 'components/common/SelectCountryCode';

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
  contactType,
  country,
  setCountry,
  clearSuccess,
}) => {
  const [hasError, setHasError] = useState(false);
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

  const renderContent = () => {
    if (contactType === 'INTERNAL') {
      return (
        <>
          {!addNewUserData.success && (
            <Modal.Content className="modal-main">
              <div>
                <Form
                  onSubmit={onSearchUser}
                  autoComplete="off"
                  className="form-information top-form"
                >
                  <Form.Input
                    className="input"
                    placeholder={global.translate(
                      'Provide the contact`s username',
                      1702,
                    )}
                    disabled={addNewUserData.loading}
                    name="PID"
                    iconPosition="right"
                    value={form.PID || ''}
                    onChange={onChange}
                    icon={
                      <Button
                        content={global.translate('Search')}
                        positive
                        disabled={addNewUserData.loading}
                        name="search"
                        link
                        onClick={onSearchUser}
                        loading={loading}
                      />
                    }
                  />
                </Form>
                {loading && (
                  <div className="search-form-loading">
                    <>
                      <LoaderComponent
                        className="loading"
                        loaderContent={global.translate(
                          'Please wait a moment.',
                          413,
                        )}
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
                  loading={addNewUserData.loading}
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
                          hasError={hasError}
                          setHasError={setHasError}
                        />
                        <p className="firstLastName">
                          {`${data[0].FirstName}  ${data[0].LastName}`}
                          {data &&
                            data[0] &&
                            data[0].AccountVerified === 'YES' && (
                              <span>
                                <Image
                                  src={VerifiedIcon}
                                  height={15}
                                  style={{ display: 'inline' }}
                                  width={15}
                                  className="user-verified-icon"
                                />
                              </span>
                            )}
                        </p>
                        <p className="address">
                          {data[0].City} {data[0].Country}
                        </p>
                      </div>
                    )}
                  <br />
                  {!addNewUserData.loading && (
                    <div className="wallet-text">
                      {global.translate(
                        'Select Wallets to be visible to ',
                        632,
                      )}
                      {global
                        .translate('Your contact', 378)
                        .toLowerCase()}
                    </div>
                  )}
                  {!addNewUserData.loading && (
                    <div className="wrap-wallets">
                      <Form.Input
                        control={Select}
                        multiple
                        selection
                        name="wallets"
                        fluid
                        options={options}
                        value={form.wallets || []}
                        onChange={onChange}
                        placeholder={global.translate(
                          'Select wallets',
                          1696,
                        )}
                        renderLabel={renderLabel}
                      />
                    </div>
                  )}
                </Form>
              </div>
            </Modal.Content>
          )}
        </>
      );
    }

    return (
      <div className="confirm-form add-external-contact-form">
        <Input
          name="firstName"
          onChange={onChange}
          disabled={addNewUserData.loading}
          value={form.firstName || ''}
          placeholder={global.translate('First Name', 8)}
        />
        <Input
          name="lastName"
          onChange={onChange}
          disabled={addNewUserData.loading}
          value={form.lastName || ''}
          placeholder={global.translate('Last Name', 9)}
        />

        <div className="">
          <Input
            type="tel"
            pattern="[0-9]"
            disabled={addNewUserData.loading}
            name="phoneNumber"
            placeholder="Phone Number"
            value={form.phoneNumber || ''}
            onChange={onChange}
            className="phone-number-input"
            style={{ width: '100%' }}
            required
            label={
              <SelectCountryCode
                country={country}
                setCountry={setCountry}
                iconClass="inline-block small-h-margin dropdown-flag"
              >
                <span className="">{country && country.value}</span>
              </SelectCountryCode>
            }
            labelPosition="left"
          />
        </div>
      </div>
    );
  };

  return (
    <TransitionablePortal
      transition={{
        duration: 400,
        animation: 'fade',
      }}
      onClose={() => setOpen(false)}
      open={open}
      dimmerSettings={{ closable: false }}
    >
      <Modal
        size="small"
        open={open}
        onClose={() => setOpen(false)}
        closeOnDimmerClick={false}
      >
        {contactType === 'INTERNAL' && (
          <Modal.Header className="modal-title">
            {global.translate('Add Contact')}
          </Modal.Header>
        )}

        {contactType !== 'INTERNAL' && (
          <Modal.Header className="modal-title">
            {global.translate('Add External Contact')}
          </Modal.Header>
        )}

        {renderContent()}
        <Modal.Actions>
          <>
            <Button
              basic
              color="red"
              onClick={() => {
                setForm({});
                setLocalError(null);
                setOpen(!open);
                clearSuccess();
              }}
              disabled={addNewUserData.loading}
              content={global.translate('Cancel', 86)}
            >
              {global.translate('Cancel', 86)}
            </Button>

            {contactType === 'INTERNAL' && (
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
                {global.translate(
                  addNewUserData.loading
                    ? 'Please wait a moment.'
                    : 'Submit',
                )}
              </Button>
            )}
            {contactType === 'EXTERNAL' && (
              <Button
                positive
                disabled={
                  !form.firstName ||
                  !form.lastName ||
                  !form.phoneNumber ||
                  addNewUserData.loading
                }
                onClick={onSubmit}
                loading={addNewUserData.loading}
              >
                {global.translate(
                  addNewUserData.loading ? 'Please wait ' : 'Submit',
                )}
              </Button>
            )}
          </>
        </Modal.Actions>
      </Modal>
    </TransitionablePortal>
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
  contactType: PropTypes.string,
  clearSuccess: PropTypes.func,
};

AddNewContactModal.defaultProps = {
  open: false,
  localError: null,
  setOpen: () => {},
  walletList: [],
  setForm: () => {},
  contactType: 'INTERNAL',
  setLocalError: () => {},
  clearSuccess: () => {},
};
export default AddNewContactModal;
