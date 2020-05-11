import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Tab,
  Button,
  Modal,
  Header,
  Label,
  Form,
} from 'semantic-ui-react';
import FormCheckBox from 'components/common/CheckBox';
import LoaderComponent from 'components/common/Loader';
import Message from 'components/common/Message';

const StoreAvailabilitySettings = props => {
  const {
    currentStore,
    form,
    onEditChange,
    setStoreStatus: { loading },
    deleteStore,
    deleteStoreData,
  } = props;

  const storeIsAsInactive = () => {
    if (!currentStore) {
      return false;
    }

    return currentStore.Status === '2' || currentStore.Status === '0';
  };
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteForm, setForm] = useState({});

  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };
  const regex = / | + /gi;
  const formattedStoreName =
    currentStore &&
    currentStore.StoreName &&
    currentStore.StoreName.replace(regex, '').toLowerCase();

  const nameHasPassed = () =>
    deleteForm.confirmedName === formattedStoreName;

  const handleDeleteStore = () => {
    deleteStore(currentStore.StoreID);
  };

  const { loading: deletStoreLoading, error } = deleteStoreData;
  return (
    <Tab.Pane>
      <div className="store-security">
        <Modal
          size="tiny"
          closeIcon
          open={deleteOpen}
          onClose={() => {
            setDeleteOpen(false);
          }}
        >
          <Modal.Header>
            {global.translate(
              'Store deletion confirmation required.',
              776,
            )}
          </Modal.Header>
          <Modal.Content>
            <Header
              color="red"
              content={`${global.translate(
                'Deleting this store will permanently remove it.',
                776,
              )} ${global.translate(
                'Would you like to proceed?',
                23,
              )}`}
            />
            <p>
              {global.translate(
                'This action can lead to data loss. To prevent accidental actions we ask you to confirm your intention. Please type the following text to proceed.',
              )}{' '}
              <span>
                <Label> {formattedStoreName}</Label>
              </span>
            </p>
            <Form>
              <Form.Field>
                <Form.Input
                  name="confirmedName"
                  onChange={onChange}
                  value={deleteForm.confirmedName || ''}
                />
              </Form.Field>
            </Form>
            {error && (
              <Message
                message={
                  error[0] && error[0].Description
                    ? global.translate(error[0].Description)
                    : global.translate(error.error)
                }
              />
            )}
          </Modal.Content>
          <Modal.Actions>
            <Button
              loading={deletStoreLoading}
              disabled={!nameHasPassed() || deletStoreLoading}
              basic={!nameHasPassed()}
              negative={nameHasPassed()}
              onClick={handleDeleteStore}
            >
              {deletStoreLoading
                ? global.translate('Please wait a moment.', 413)
                : global.translate('Confirm')}
            </Button>
          </Modal.Actions>
        </Modal>
        <div>
          <h2 className="account-availablity">
            {global.translate('Store availability')}
          </h2>
          <div className="current-item">
            <FormCheckBox
              checkLabel={global.translate('Temporarily unavailable')}
              value={form.storeAvailable || false}
              name="storeAvailable"
              defaultChecked={storeIsAsInactive()}
              disabled={loading}
              onChange={onEditChange}
            />
            {loading && <LoaderComponent />}
          </div>

          <p className="_7LpC8">
            {global.translate(
              'When your store is temporarily unavailable, it will not be accepting vouchers until you avail it again.',
              781,
            )}
          </p>
        </div>
        <hr className="app-hr" />
        <div>
          <h2 className="account-availablity">
            {global.translate('Delete', 415)}{' '}
            {global.translate('Store', 803)}
          </h2>

          <p className="_7LpC8">
            {global.translate(
              'When you delete this store, it will permanently be removed. This process is non reversible.',
              782,
            )}
          </p>
          <div className="current-item">
            <Button
              basic
              content={global.translate('Delete Store')}
              color="red"
              onClick={() => {
                setDeleteOpen(!deleteOpen);
              }}
            />
          </div>
        </div>
      </div>
    </Tab.Pane>
  );
};

StoreAvailabilitySettings.propTypes = {
  currentStore: {},
  form: PropTypes.objectOf(PropTypes.any),
  onEditChange: PropTypes.func,
  setStoreStatus: PropTypes.objectOf(PropTypes.any),
  deleteStore: PropTypes.func,
  deleteStoreData: PropTypes.objectOf(PropTypes.any),
};

StoreAvailabilitySettings.defaultProps = {
  currentStore: {},
  form: {},
  onEditChange: () => {},
  setStoreStatus: {},
  deleteStore: () => {},
  deleteStoreData: {},
};

export default StoreAvailabilitySettings;
