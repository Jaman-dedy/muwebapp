/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Modal,
  Button,
  Image,
  TransitionablePortal,
} from 'semantic-ui-react';
import Thumbnail from 'components/common/Thumbnail';
import FlatInput from 'components/common/TextField/FlatInput';
import PhoneNumberInput from 'components/common/TextField/PhoneNumber';
import Message from 'components/common/Message';
import './style.scss';
import cameraIcon from 'assets/images/camera-icon.png';
import uploadFile from 'helpers/uploadImages/uploadFile';
import updateContactPicture from 'redux/actions/contacts/updateContactPicture';

const EditContactContents = ({
  contact,
  onEditChange,
  editErrors,
  setEditErrors,
  open,
  setOpen,
  loading,
  handleEditInfo,
  editForm,
  country,
  setCountry,
  dispatch,
  setisEdit,
  isEdit,
}) => {
  const [newContactPicture, setNewContactPicture] = useState(
    contact && contact.PictureURL,
  );
  const inputRef = React.useRef();
  const [isUploading, setIsUploading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const onImagePicked = async e => {
    e.persist();
    const file = e.target.files;

    if (file) {
      setIsUploading(true);
      const bodyFormData = new FormData();
      bodyFormData.append('file1', file);
      const { data } = await uploadFile({ file1: file[0] });
      if (data && data[0]) {
        setIsUploading(false);
        setNewContactPicture(data[0].url);
        contact.PictureURL = data[0].url;
        updateContactPicture(contact)(dispatch);
      }
    }
  };

  useEffect(() => {
    if (newContactPicture) {
      setNewContactPicture(newContactPicture);
    }
  }, [newContactPicture]);

  return (
    <TransitionablePortal
      transition={{
        duration: 400,
        animation: 'fade',
      }}
      onClose={() => setOpen(false)}
      open={open}
    >
      <Modal open={open} onClose={() => setOpen(false)}>
        <Modal.Header className="modal-title">
          {global.translate(`Edit Contact`)}
        </Modal.Header>
        <div className="contents-inner">
          <div className="avatar-user-image ">
            <input
              ref={inputRef}
              name="files"
              onChange={onImagePicked}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
            />

            <Thumbnail
              name={contact.FirstName}
              secondName={contact.LastName}
              avatar={newContactPicture}
              size="medium"
              style={{
                height: '75px',
                width: '75px',
                marginRight: 0,
                objectFit: 'cover',
              }}
              hasError={hasError}
              setHasError={setHasError}
            />

            <Image
              src={cameraIcon}
              width={18}
              className="camera-input"
              disabled={isUploading}
              onClick={() =>
                inputRef.current && inputRef.current.click()
              }
            />
            {isUploading && (
              <small>{global.translate('Working...', 412)}</small>
            )}
          </div>

          <div className="inner-edit-content">
            <div className="thumb">
              <div className="first-name">
                <FlatInput
                  name="firstName"
                  id="firstName"
                  value={editForm.firstName}
                  placeholder={global.translate('First Name', 8)}
                  onChange={onEditChange}
                />
              </div>
            </div>
            <div className="last-name">
              <FlatInput
                name="lastName"
                placeholder={global.translate('Last Name', 9)}
                value={editForm.lastName}
                onChange={onEditChange}
              />
            </div>
          </div>
          <div className="phone-section">
            <div className="area">
              <PhoneNumberInput
                disabled
                name="phoneNumber"
                value={contact.Phone}
                placeholder={global.translate('Phone number', 13)}
                country={country}
                setCountry={setCountry}
                onChange={onEditChange}
              />
            </div>
          </div>
          {editErrors && <Message error message={editErrors} />}
        </div>
        <Modal.Actions>
          <Button
            disabled={loading}
            basic
            color="red"
            onClick={() => {
              setIsUploading(false);
              setEditErrors(null);
              setisEdit(!isEdit);
              setNewContactPicture('');
            }}
          >
            {global.translate('Cancel', 1602)}
          </Button>
          <Button
            disabled={loading}
            loading={loading}
            onClick={() => {
              handleEditInfo('external', contact);
            }}
            positive
          >
            {global.translate('Save', 614)}
          </Button>
        </Modal.Actions>
      </Modal>
    </TransitionablePortal>
  );
};

export default EditContactContents;
