/* eslint-disable react/prop-types */
import './style.scss';

import React, { useEffect, useState } from 'react';
import {
  Button,
  Image,
  Modal,
  TransitionablePortal,
} from 'semantic-ui-react';
import cameraIcon from 'assets/images/camera-icon.png';
import Message from 'components/common/Message';
import FlatInput from 'components/common/TextField/FlatInput';
import PhoneNumberInput from 'components/common/TextField/PhoneNumber';
import Thumbnail from 'components/common/Thumbnail';
import uploadFile from 'helpers/uploadImages/uploadFile';
import updateContactPicture from 'redux/actions/contacts/updateContactPicture';
import ImageCropper from 'components/common/ImageCroper/CropImage';

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
  const [openCropper, setOpenCropper] = useState(false);
  const [fileToCrop, setFileToCrop] = useState(false);
  const [newContactPicture, setNewContactPicture] = useState(
    contact && contact.PictureURL,
  );
  const inputRef = React.useRef();
  const [isUploading, setIsUploading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const onImagePicked = async e => {
    const { files } = e.target;
    setFileToCrop(files[0]);
    setOpen(false);
    setOpenCropper(true);
  };

  const uploadImage = async file => {
    setIsUploading(true);
    setOpenCropper(false);

    const { data } = await uploadFile({ file1: file });
    if (data && data[0]) {
      setNewContactPicture(data[0].url);
      contact.PictureURL = data[0].url;
      const {
        PictureURL,
        CountryCode,
        FirstName,
        LastName,
        PhoneNumber,
      } = contact;

      updateContactPicture({
        PictureURL,
        CountryCode,
        FirstName,
        LastName,
        DestPhoneNum: PhoneNumber,
      })(dispatch);

      setOpen(true);
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (newContactPicture) {
      setNewContactPicture(newContactPicture);
    }
  }, [newContactPicture]);

  return (
    <>
      <ImageCropper
        open={openCropper}
        setOpen={setOpenCropper}
        loading={isUploading}
        file={fileToCrop}
        uploadImage={uploadImage}
      />

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
            {global.translate(`Edit Contact`, 1958)}
          </Modal.Header>
          <div className="contents-inner">
            <div className="avatar-user-image ">
              <input
                ref={inputRef}
                name="files"
                onChange={onImagePicked}
                type="file"
                accept="image/jpeg, image/png"
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
              <div className="phone-section">
                <div className="area">
                  <PhoneNumberInput
                    name="phoneNumber"
                    value={editForm.phoneNumber}
                    placeholder={global.translate('Phone number', 13)}
                    country={country}
                    setCountry={setCountry}
                    onChange={onEditChange}
                  />
                </div>
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
    </>
  );
};

export default EditContactContents;
