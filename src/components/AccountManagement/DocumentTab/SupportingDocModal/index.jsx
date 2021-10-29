/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { Modal, Button, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import UploadImgButton from 'components/common/UploadImgButton';
import './style.scss';
import ZoomDocIcon from 'assets/images/profile/zoom-doc.svg';
import EditDoc from 'assets/images/profile/edit-doc.svg';
import PreviewImgModal from 'components/common/PreviewImgModal';
import Img from 'components/common/Img';
import validateImg from 'helpers/image/validateImg';

const SupportingDocModal = ({
  open,
  setOpen,
  nameImgToUpload,
  supportingDocuments,
}) => {
  const [openPreview, setOpenPreview] = useState(false);
  const [validImage, setValidImage] = useState(false);
  const {
    onImageChange,
    handleSubmit,
    userIdUrlData,
    uploadingDoc,
    submittingDoc,
    setUserIdUrlData,
  } = supportingDocuments;
  useEffect(() => {
    if (userIdUrlData) {
      setUserIdUrlData(null);
    }
  }, []);
  useEffect(() => {
    if (userIdUrlData?.MediaSourceURL) {
      validateImg(userIdUrlData?.MediaSourceURL).then(
        function fulfilled(img) {
          setValidImage(true);
        },

        function rejected() {
          setValidImage(false);
        },
      );
    }
  }, [userIdUrlData]);
  return (
    <Modal onOpen={() => setOpen(true)} open={open} size="tiny">
      <div className="upload-other-docs">
        <h3>{global.translate('Supporting document')}</h3>

        <div className="doc-img-content">
          <div>{global.translate('Document')}</div>
          {userIdUrlData ? (
            <>
              <div className="id-copy">
                {validImage && (
                  <>
                    <div
                      className="images-doc-actions"
                      onClick={() => setOpenPreview(true)}
                    >
                      <Image src={ZoomDocIcon} />
                    </div>
                    <div className="edit-delete-doc">
                      <UploadImgButton
                        name={nameImgToUpload}
                        onChooseFile={onImageChange}
                        img
                        src={EditDoc}
                        loading={uploadingDoc}
                        uploadedImg={userIdUrlData?.MediaSourceURL}
                      />
                    </div>
                  </>
                )}
                <div className="overlay" />
                <Img
                  className="user-doc-img"
                  src={userIdUrlData?.MediaSourceURL}
                  compress
                  width={470}
                  height="217px"
                  format="png"
                  not_rounded
                />
              </div>
            </>
          ) : (
            <UploadImgButton
              name={nameImgToUpload}
              onChooseFile={onImageChange}
              title={global.translate('Browse document')}
              loading={uploadingDoc}
              uploadedImg={userIdUrlData?.MediaSourceURL}
            />
          )}
        </div>
        <div className="update-info-actions">
          <Button
            className="cancel-button"
            onClick={() => setOpen(false)}
          >
            {global.translate('Cancel')}
          </Button>
          <Button
            disabled={!userIdUrlData}
            className="change-button"
            loading={submittingDoc}
            onClick={handleSubmit}
          >
            {global.translate('upload')}
          </Button>
        </div>
      </div>
      <PreviewImgModal
        setOpen={setOpenPreview}
        open={openPreview}
        imgToPreview={userIdUrlData?.MediaSourceURL}
      />
    </Modal>
  );
};
SupportingDocModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  nameImgToUpload: PropTypes.string,
  supportingDocuments: PropTypes.objectOf(PropTypes.any),
};
SupportingDocModal.defaultProps = {
  open: false,
  setOpen: () => {},
  nameImgToUpload: '',
  supportingDocuments: {},
};

export default SupportingDocModal;
