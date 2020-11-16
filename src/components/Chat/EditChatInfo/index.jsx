import React, { useState, useRef } from 'react';
import { Modal, Image, Form } from 'semantic-ui-react';
import './index.scss';
import PropTypes from 'prop-types';
import Thumbnail from 'components/common/Thumbnail';
import cameraIcon from 'assets/images/camera-icon.png';
import ModalHeader from '../ModalHeader';

const EditChatModal = ({
  editOpen,
  setEditOpen,
  onSetNewDetails,
}) => {
  const [hasError, setHasError] = useState(false);
  const [form, setForm] = useState({});
  const imageInputRef = useRef(null);

  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const onSubmit = () => {
    onSetNewDetails(form);
  };
  return (
    <Modal
      open={editOpen}
      size="mini"
      onClose={() => {
        setEditOpen(false);
      }}
      className="chooser-modal"
    >
      <ModalHeader
        setOpen={() => setEditOpen(false)}
        title={global.translate('Edit', 820)}
        confirmContent={global.translate('Save', 614)}
        onConfirmClick={() => {
          onSubmit();
          setEditOpen(false);
        }}
      />
      <Modal.Content>
        <div className="avatar-image">
          <Thumbnail
            avatar="data:image/jpeg;base64,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"
            size="medium"
            name="A"
            secondName="A"
            circular
            className="header_2u_avatar"
            style={{
              height: '95px',
              width: '95px',
              margin: 'auto',
              objectFit: 'cover',
            }}
            hasError={hasError}
            setHasError={setHasError}
          />
          <div className="camera-input">
            <input
              type="file"
              accept="image/jpeg, image/png"
              ref={imageInputRef}
              onChange={onChange}
              style={{ display: 'none' }}
            />
            <Image
              src={cameraIcon}
              width={18}
              onClick={() => imageInputRef.current.click()}
            />
          </div>
        </div>

        <Form size="tiny">
          <Form.Group widths="equal">
            <Form.Input
              name="GroupName"
              onChange={onChange}
              label={global.translate('Group Name', 1654)}
              control="input"
              placeholder={global.translate('Group Name', 1654)}
            />
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

EditChatModal.propTypes = {
  editOpen: PropTypes.bool,
  setEditOpen: PropTypes.func,
  onSetNewDetails: PropTypes.func,
};

EditChatModal.defaultProps = {
  editOpen: false,
  setEditOpen: () => {},
  onSetNewDetails: () => {},
};

export default EditChatModal;
