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
import Message from 'components/common/Message';

const StoreAvailabilitySettings = props => {
  const {
    currentPublicity,
    deleteCampaignData,
    deletePublicity,
  } = props;
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteForm, setForm] = useState({});

  const onChange = (e, { name, value }) => {
    setForm({ ...deleteForm, [name]: value });
  };
  const regex = / | + /gi;
  const formattedCampaign =
    currentPublicity &&
    currentPublicity.Title &&
    currentPublicity.Title.replace(regex, '').toLowerCase();

  const nameHasPassed = () =>
    deleteForm.confirmedName === formattedCampaign;

  const handleDeleteCampaign = () => {
    deletePublicity(currentPublicity.ID);
  };

  const { loading: deletCampaignLoading, error } = deleteCampaignData;
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
              'Campaign deletion confirmation required.',
              1574,
            )}
          </Modal.Header>
          <Modal.Content>
            <Header
              color="red"
              content={`${global.translate(
                'Deleting this campaign will permanently remove it.',
                776,
              )} ${global.translate(
                'Would you like to proceed?',
                23,
              )}`}
            />
            <p>
              {global.translate(
                'This action can lead to data loss. To prevent accidental actions we ask you to confirm your intention. Please type the following text to proceed.',
                778,
              )}{' '}
              <span>
                <Label> {formattedCampaign}</Label>
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
              loading={deletCampaignLoading}
              disabled={!nameHasPassed() || deletCampaignLoading}
              basic={!nameHasPassed()}
              negative={nameHasPassed()}
              onClick={handleDeleteCampaign}
            >
              {deletCampaignLoading
                ? global.translate('Please wait a moment.', 413)
                : global.translate('Confirm', 1750)}
            </Button>
          </Modal.Actions>
        </Modal>
        <div>
          <h2 className="account-availablity">
            {global.translate('Delete', 415)}{' '}
            {global.translate('Campaign', 1555)}
          </h2>

          <p className="_7Lpub53YC8">
            {global.translate(
              'When you delete this campaign, it will permanently be removed. This process is non reversible.',
              1573,
            )}
          </p>
          <div className="current-item">
            <Button
              basic
              content={global.translate('Delete', 415)}
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
  currentPublicity: PropTypes.objectOf(PropTypes.any),
  deletePublicity: PropTypes.func,
  deleteCampaignData: PropTypes.objectOf(PropTypes.any),
};

StoreAvailabilitySettings.defaultProps = {
  currentPublicity: {},
  deletePublicity: () => {},
  deleteCampaignData: {},
};

export default StoreAvailabilitySettings;
