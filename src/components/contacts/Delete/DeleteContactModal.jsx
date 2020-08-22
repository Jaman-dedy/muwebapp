/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import LoaderComponent from 'components/common/Loader';
import Message from 'components/common/Message';

const DeleteContactModal = ({
  open,
  setOpen,
  contact,
  deleteContact,
  clearDeleteContact,
  deleteContactData: { error, data, loading },
  setDetailsOpen,
  detailsOpen,
}) => {
  useEffect(() => {
    if (data?.[0]?.Description) {
      toast.success(global.translate(data?.[0]?.Description));
      setOpen(false);
      clearDeleteContact();
    }
    if (data && detailsOpen) {
      setDetailsOpen(false);
    }
  }, [data]);

  return (
    <Modal size="tiny" open={open} onOpen={() => setOpen(!open)}>
      <Modal.Header className="modal-title">
        {global.translate(`Delete`, 415)} {contact && contact.FirstName}{' '}
      </Modal.Header>
      <Modal.Content>
        {loading && !error && (
          <LoaderComponent
            loaderContent={global.translate('Working...', 412)}
          />
        )}
        {!loading && !error && (
          <div className="sub-title">
            <strong>
              {contact && contact.FirstName}{' '}
              {contact && contact.LastName}{' '}
            </strong>{' '}
            <span>
              {global.translate(
                'will be removed from your contacts.',
                441,
              )}
            </span>{' '}
          </div>
        )}
        {error && (
          <Message
            message={
              error[0]
                ? global.translate(error[0].Description)
                : global.translate(error.error)
            }
          />
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button
          basic
          color="red"
          disabled={loading}
          onClick={() => {
            clearDeleteContact();
            setOpen(!open);
          }}
        >
          {global.translate('Cancel', 86)}
        </Button>

        <Button
          className="success-button"
          disabled={loading}
          onClick={() => {
            if (!data) {
              deleteContact(contact);
            } else {
              setOpen(false);
              clearDeleteContact();
            }
          }}
        >
          {error && global.translate('Retry', 1952)}
          {!data && !error && global.translate('ok', 69)}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

DeleteContactModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  loading: PropTypes.bool,
  contact: PropTypes.objectOf(PropTypes.string),
  deleteContact: PropTypes.func,
  clearDeleteContact: PropTypes.func,
  deleteContactData: PropTypes.objectOf(PropTypes.string),
  setDetailsOpen: PropTypes.func,
  detailsOpen: PropTypes.bool,
};

DeleteContactModal.defaultProps = {
  loading: false,
  setOpen: () => {},
  open: false,
  contact: null,
  deleteContact: () => null,
  clearDeleteContact: () => null,
  deleteContactData: null,
  setDetailsOpen: () => null,
  detailsOpen: PropTypes.bool,
};
export default DeleteContactModal;
