/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import ZoomDocIcon from 'assets/images/profile/zoom-doc.svg';
import EditDoc from 'assets/images/profile/edit-doc.svg';
import PreviewImgModal from 'components/common/PreviewImgModal';
import UploadImgButton from 'components/common/UploadImgButton';
import './style.scss';

const DisplayDocument = ({
  supportingDocuments,
  imgSrc,
  nameImgToUpload,
}) => {
  const { onEditImage, uploadingDoc } = supportingDocuments;
  const [openPreview, setOpenPreview] = useState(false);

  return (
    <div className="images-container">
      <div className="images-doc-block">
        <div
          className="images-doc-actions"
          onClick={() => setOpenPreview(true)}
        >
          <Image src={ZoomDocIcon} />
        </div>
        <div className="edit-delete-doc">
          <UploadImgButton
            name={nameImgToUpload}
            onChooseFile={onEditImage}
            img
            src={EditDoc}
            loading={uploadingDoc}
          />
        </div>
        <div>
          <div className="doc-image">
            <div className="overlay" />
            <Image src={imgSrc} />
          </div>
          {/* <div className="doc-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
            aliquam
          </div> */}
        </div>
      </div>

      <PreviewImgModal
        setOpen={setOpenPreview}
        open={openPreview}
        imgToPreview={imgSrc}
      />
    </div>
  );
};

DisplayDocument.propTypes = {
  supportingDocuments: PropTypes.objectOf(PropTypes.any),
  imgSrc: PropTypes.string,
  nameImgToUpload: PropTypes.string,
};
DisplayDocument.defaultProps = {
  supportingDocuments: {},
  imgSrc: '',
  nameImgToUpload: '',
};

export default DisplayDocument;
