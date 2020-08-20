import React, { useState } from 'react';
import {
  Modal,
  Header,
  Label,
  Form,
  Button,
  Message,
} from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import myServices from 'containers/PeerServices/myServices';
import openDeleteServiceModal from 'redux/actions/peerServices/openDeleteServiceModal ';

const DeleteServiceModal = () => {
  const [deleteForm, setForm] = useState({});

  const dispatch = useDispatch();

  const { deleteService } = myServices();

  const { open, service } = useSelector(
    state => state.peerServices.deleteServiceModal,
  );
  const { loading, error } = useSelector(
    state => state.peerServices.deleteService,
  );
  const onChange = (e, { name, value }) => {
    setForm({ ...deleteForm, [name]: value });
  };

  const regex = / | + /gi;
  const formattedName = service?.Title.replace(
    regex,
    '',
  ).toLowerCase();

  const nameHasPassed = () =>
    deleteForm.confirmedName === formattedName;

  return (
    <Modal
      size="tiny"
      centered={false}
      closeIcon={!loading}
      open={open}
      closeOnDocumentClick={false}
      closeOnDimmerClick={false}
      closeOnEscape={!loading}
      onClose={() => {
        openDeleteServiceModal({ open: false, service: null })(
          dispatch,
        );
      }}
    >
      <Modal.Header>
        {global.translate(
          'Service deletion confirmation required.',
          1854,
        )}
      </Modal.Header>
      <Modal.Content>
        <Header
          color="red"
          content={`${global.translate(
            'Deleting this service will permanently remove it',
            1855,
          )} ${global.translate('Would you like to proceed?', 23)}`}
        />
        <p>
          {global.translate(
            'This action can lead to data loss. To prevent accidental actions we ask you to confirm your intention. Please type the following text to proceed.',
            1856,
          )}{' '}
          <span>
            <Label> {formattedName}</Label>
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
          loading={loading}
          disabled={!nameHasPassed() || loading}
          basic={!nameHasPassed()}
          negative={nameHasPassed()}
          onClick={() => deleteService(service)}
        >
          {loading
            ? global.translate('Please wait a moment.', 413)
            : global.translate('Confirm')}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteServiceModal;
