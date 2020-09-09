import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Button, Modal } from 'semantic-ui-react';
import Img from 'components/common/Img';
import './previewProfile.scss';

const PreviewProfileImg = ({
  pictureURL,
  openPreviewImgModal,
  setOpenPreviewImgModal,
}) => {
  const [hasError, setHasError] = useState(false);
  return (
    <Modal
      className="profile-image-preview"
      basic
      open={openPreviewImgModal}
      size="big"
    >
      <Modal.Content>
        <Img
          hasError={hasError}
          setHasError={setHasError}
          src={pictureURL}
          compress
          format="jpg"
          width={700}
          not_rounded
        />
      </Modal.Content>
      <Button
        color="gray"
        onClick={() => setOpenPreviewImgModal(false)}
      >
        {' '}
        Close
      </Button>
    </Modal>
  );
};

PreviewProfileImg.propTypes = {
  openPreviewImgModal: propTypes.bool.isRequired,
  setOpenPreviewImgModal: propTypes.func.isRequired,
  pictureURL: propTypes.string.isRequired,
};

export default PreviewProfileImg;
